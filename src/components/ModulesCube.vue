<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import type * as ThreeTypes from 'three'

const host = ref<HTMLDivElement | null>(null)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let motionThreeRegistered = false
let renderer: ThreeTypes.WebGLRenderer | undefined
let scene: ThreeTypes.Scene | undefined
let camera: ThreeTypes.PerspectiveCamera | undefined
let cube: ThreeTypes.Mesh<ThreeTypes.BoxGeometry, ThreeTypes.MeshPhongMaterial[]> | undefined
let geometry: ThreeTypes.BoxGeometry | undefined
let edgeGeometry: ThreeTypes.EdgesGeometry | undefined
let edgeMaterial: ThreeTypes.LineBasicMaterial | undefined
let controls: { stop: () => void } | undefined
let resizeObserver: ResizeObserver | undefined
let visibilityObserver: IntersectionObserver | undefined
let animateThree: typeof import('motion')['animate'] | undefined
let frameApi: typeof import('motion')['frame'] | undefined
let cancelFrameApi: typeof import('motion')['cancelFrame'] | undefined
let initializing: Promise<void> | undefined
let isVisible = false
let isMounted = false

const renderScene = () => {
  if (renderer && scene && camera) renderer.render(scene, camera)
}

const resizeScene = () => {
  if (!host.value || !renderer || !camera) return
  const width = Math.max(host.value.clientWidth, 1)
  const height = Math.max(host.value.clientHeight, 1)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderScene()
}

const stopSpin = () => {
  controls?.stop()
  controls = undefined
  cancelFrameApi?.(renderScene)
  renderScene()
}

const startSpin = () => {
  if (!isMounted || !isVisible || prefersReducedMotion.matches || !cube || !animateThree || !frameApi) return
  if (!controls) {
    controls = animateThree(
      cube.rotation,
      { y: cube.rotation.y + Math.PI * 2, z: cube.rotation.z + Math.PI * 2 },
      { duration: 16, repeat: Infinity, ease: 'linear' },
    )
  }
  frameApi.render(renderScene, true)
}

const createScene = async () => {
  if (renderer || initializing || !host.value) return initializing
  initializing = (async () => {
    try {
      const [THREE, motionApi, motionThreeApi] = await Promise.all([
        import('three'),
        import('motion'),
        import('motion/three'),
      ])
      if (!isMounted || !host.value) return

      animateThree = motionApi.animate
      frameApi = motionApi.frame
      cancelFrameApi = motionApi.cancelFrame
      if (!motionThreeRegistered) {
        animateThree.addEffect(motionThreeApi.threeEffect)
        motionThreeRegistered = true
      }

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
      camera.position.set(0, 0, 4.8)

      geometry = new THREE.BoxGeometry(1.55, 1.55, 1.55)
      const materials = [
        new THREE.MeshPhongMaterial({ color: 0x2e874f, shininess: 42 }),
        new THREE.MeshPhongMaterial({ color: 0x236c40, shininess: 42 }),
        new THREE.MeshPhongMaterial({ color: 0x66bf79, shininess: 42 }),
        new THREE.MeshPhongMaterial({ color: 0x1c5c37, shininess: 42 }),
        new THREE.MeshPhongMaterial({ color: 0x26d167, shininess: 42 }),
        new THREE.MeshPhongMaterial({ color: 0x3d9f5e, shininess: 42 }),
      ]

      cube = new THREE.Mesh(geometry, materials)
      edgeGeometry = new THREE.EdgesGeometry(geometry)
      edgeMaterial = new THREE.LineBasicMaterial({ color: 0xe3f2e6, transparent: true, opacity: 0.75 })
      cube.add(new THREE.LineSegments(edgeGeometry, edgeMaterial))
      scene.add(cube)
      scene.add(new THREE.AmbientLight(0xffffff, 2.2))
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
      keyLight.position.set(2, 3, 4)
      scene.add(keyLight)
      const fillLight = new THREE.DirectionalLight(0xc9f3d3, 1.2)
      fillLight.position.set(-3, -2, 1)
      scene.add(fillLight)

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.domElement.className = 'modules-cube-canvas'
      host.value.appendChild(renderer.domElement)
      host.value.classList.add('is-ready')

      resizeScene()
      resizeObserver = new ResizeObserver(resizeScene)
      resizeObserver.observe(host.value)
      startSpin()
    } catch {
      // Keep the static SVG visible if WebGL or a dynamic module is unavailable.
      renderer?.dispose()
      geometry?.dispose()
      edgeGeometry?.dispose()
      edgeMaterial?.dispose()
      cube?.material.forEach((material) => material.dispose())
      renderer = undefined
      scene = undefined
      camera = undefined
      cube = undefined
    }
  })()
  return initializing
}

const updateMotionPreference = () => {
  if (prefersReducedMotion.matches) stopSpin()
  else startSpin()
}

onMounted(() => {
  isMounted = true
  const element = host.value
  if (!element) return

  prefersReducedMotion.addEventListener('change', updateMotionPreference)
  if ('IntersectionObserver' in window) {
    visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) {
        if (renderer) startSpin()
        else void createScene()
      }
      else stopSpin()
    }, { rootMargin: '100px', threshold: 0 })
    visibilityObserver.observe(element)
  } else {
    isVisible = true
    void createScene()
  }
})

onUnmounted(() => {
  isMounted = false
  prefersReducedMotion.removeEventListener('change', updateMotionPreference)
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
  window.removeEventListener('resize', resizeScene)
  stopSpin()
  renderer?.dispose()
  geometry?.dispose()
  edgeGeometry?.dispose()
  edgeMaterial?.dispose()
  cube?.material.forEach((material) => material.dispose())
  renderer?.domElement.remove()
  renderer = undefined
})
</script>

<template>
  <div ref="host" class="modules-cube" aria-hidden="true">
    <svg class="modules-cube-fallback" viewBox="0 0 160 160" focusable="false">
      <path d="M80 17 137 48v64l-57 31-57-31V48z" fill="#2e874f" />
      <path d="m80 17 57 31-57 32-57-32z" fill="#66bf79" />
      <path d="m23 48 57 32v63l-57-31z" fill="#236c40" />
      <path d="m80 80 57-32v64l-57 31z" fill="#26d167" />
      <path d="m80 17 57 31v64l-57 31-57-31V48zM23 48l57 32 57-32M80 80v63" fill="none" stroke="#e3f2e6" stroke-linejoin="round" stroke-width="2" />
    </svg>
  </div>
</template>
