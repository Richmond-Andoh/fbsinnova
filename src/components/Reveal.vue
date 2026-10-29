<script setup lang="ts">
import { motion } from 'motion-v'
import { onMounted, onUnmounted, ref } from 'vue'
const props = withDefaults(defineProps<{ delay?: number; class?: string }>(), { delay: 0 })
const element = ref<HTMLElement | null>(null)
const visible = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { visible.value = true; return }
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { visible.value = true; observer?.disconnect() }
  }, { threshold: 0.12 })
  const target = (element.value as unknown as { $el?: HTMLElement } | null)?.$el ?? element.value
  if (target instanceof HTMLElement) observer.observe(target)
})
onUnmounted(() => observer?.disconnect())
</script>
<template><motion.div ref="element" :class="props.class" :initial="{ opacity: 0, y: 22 }" :animate="visible ? { opacity: 1, y: 0, transition: { duration: 0.55, delay: props.delay / 1000, ease: 'easeOut' } } : { opacity: 0, y: 22 }"><slot /></motion.div></template>
