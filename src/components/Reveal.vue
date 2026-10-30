<script setup lang="ts">
import { motion } from 'motion-v'
import { onMounted, onUnmounted, ref } from 'vue'
const props = withDefaults(defineProps<{ delay?: number; class?: string }>(), { delay: 0 })
const element = ref<HTMLElement | null>(null)
const visible = ref(false)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (reduceMotion) { visible.value = true; return }
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { visible.value = true; observer?.disconnect() }
  }, { threshold: 0.12 })
  const target = (element.value as unknown as { $el?: HTMLElement } | null)?.$el ?? element.value
  if (target instanceof HTMLElement) observer.observe(target)
})
onUnmounted(() => observer?.disconnect())
</script>
<template><motion.div ref="element" :class="props.class" :initial="reduceMotion ? false : { opacity: 0, y: 30, scale: 0.985 }" :animate="visible ? { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 88, damping: 19, delay: props.delay / 1000 } } : { opacity: 0, y: 30, scale: 0.985 }"><slot /></motion.div></template>
