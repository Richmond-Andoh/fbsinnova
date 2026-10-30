<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { motion } from 'motion-v'
import { RouterLink } from 'vue-router'
import Reveal from '../components/Reveal.vue'
import { content, sourceAsset, sourceImages } from '../data/content'

const profileImpacts = [content.impacts[0], content.impacts[2], content.impacts[3], content.impacts[1]]
const scrollToDetails = () => document.getElementById('impact-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
</script>

<template>
  <main id="main" class="impact-page">
    <section class="impact-hero" aria-labelledby="impact-title">
      <div class="impact-hero-inner page-width">
        <div class="impact-hero-copy"><div class="section-kicker">FBSINNOVA <span></span> OUR IMPACT</div><h1 id="impact-title">Our <em>Impact.</em></h1><p>{{ content.description }}</p><span class="impact-count"><b>04</b> focus areas</span></div>
        <div class="impact-hero-visual"><img class="impact-farmer" :src="sourceAsset(sourceImages.profileHero)" alt="A farmer holding a smartphone in a green field" fetchpriority="high"/><img class="impact-cocoa" :src="sourceAsset(sourceImages.slides[0])" alt="Cocoa pod and cocoa beans"/></div>
      </div>
    </section>
    <section class="impact-board page-width" aria-label="FBSInnova impact areas">
      <Reveal><div class="impact-board-heading"><span>01 — 04</span><h2>Focus areas</h2><p>Smallholder farmer livelihoods, food security, decent work, and agricultural innovation.</p></div></Reveal>
      <div class="sdg-grid">
        <Reveal v-for="(impact, index) in profileImpacts" :key="impact.title" :delay="index * 70">
          <motion.button type="button" class="sdg-card" :while-hover="{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }" :while-tap="{ scale: 0.97 }" @click="scrollToDetails">
            <img :src="sourceAsset(impact.goal)" :alt="`Sustainable Development Goal ${impact.goalNumber}: ${impact.goalTitle}`" loading="lazy" />
            <h2>{{ impact.title }}</h2>
          </motion.button>
        </Reveal>
      </div>
      <div id="impact-details" class="impact-copy-grid">
        <Reveal v-for="(impact, index) in profileImpacts" :key="impact.goalNumber" :delay="index * 70">
          <article class="impact-copy-card">
            <span class="impact-copy-num">0{{ index + 1 }}</span>
            <h2>{{ impact.title }}</h2>
            <p>{{ impact.body }}</p>
          </article>
        </Reveal>
      </div>
      <RouterLink to="/" class="impact-back"><ArrowRight :size="16" /> Back to FBSInnova</RouterLink>
    </section>
  </main>
</template>
