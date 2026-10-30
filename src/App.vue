<script setup lang="ts">
import { RouterView } from 'vue-router'
import { MotionConfig, motion } from 'motion-v'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <MotionConfig reduced-motion="user">
    <SiteHeader />
    <RouterView v-slot="{ Component, route }">
      <motion.div
        :key="route.path"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0, transition: { duration: 0.32, ease: 'easeOut' } }"
      >
        <component :is="Component" />
      </motion.div>
    </RouterView>
    <SiteFooter />
  </MotionConfig>
</template>
