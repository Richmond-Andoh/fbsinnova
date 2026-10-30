<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import QRCode from 'qrcode'
import { AnimatePresence, motion } from 'motion-v'
import { ArrowRight, ArrowUpRight, ScanLine } from 'lucide-vue-next'
import Reveal from '../components/Reveal.vue'
import { content, sourceAsset, sourceImages } from '../data/content'

const activeSlide = ref(0)
const carouselHovered = ref(false)
const carouselFocused = ref(false)
const slides = [
  { src: sourceAsset(sourceImages.slides[0]), alt: 'Cocoa pod and cocoa beans' },
  { src: sourceAsset(sourceImages.slides[1]), alt: 'Cassava roots' },
  { src: sourceAsset(sourceImages.slides[2]), alt: 'Fresh corn cobs' },
]
const active = computed(() => slides[activeSlide.value])
const carouselPaused = computed(() => carouselHovered.value || carouselFocused.value)
const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
let carouselTimer: number | undefined
const homeImpacts = [content.impacts[0], content.impacts[2], content.impacts[3], content.impacts[1]]
const appQr = ref('')

onMounted(async () => {
  if (!reduceMotion) {
    carouselTimer = window.setInterval(() => {
      if (!carouselPaused.value && document.visibilityState === 'visible') {
        activeSlide.value = (activeSlide.value + 1) % slides.length
      }
    }, 5200)
  }
  try {
    appQr.value = await QRCode.toDataURL(content.links.download, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark: '#173a29', light: '#fffaf0' },
    })
  } catch (error) {
    console.error('Unable to generate the FBSInnova download QR code.', error)
  }
})
onUnmounted(() => window.clearInterval(carouselTimer))
</script>

<template>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="page-width hero-inner">
        <div class="hero-copy">
          <Reveal><div class="eyebrow hero-eyebrow"><span class="eyebrow-dot"></span> FBSINNOVA · FARMER BUSINESS SCHOOL</div></Reveal>
          <Reveal :delay="70"><h1 id="hero-title">Learn. Track.<br /><em>Diversify.</em></h1></Reveal>
          <Reveal :delay="150"><p class="hero-lede">On-demand Farmer Business School tools for smallholder farmers.<br />Plan crops, manage finances, and diversify for better livelihoods.</p></Reveal>
          <Reveal :delay="220"><div class="hero-actions"><motion.a class="button button-lime" :href="content.links.download" target="_blank" rel="noreferrer" :while-hover="{ y: -4, scale: 1.035 }" :while-tap="{ scale: 0.97 }">Get the app <ArrowUpRight :size="18" /></motion.a><span class="hero-tagline">Learn, track, diversify!</span></div></Reveal>
          <div class="hero-scroll-note"><span>01</span><i></i><span>Tools for smallholder farmers</span></div>
        </div>
        <Reveal :delay="180"><div class="hero-product" aria-label="FBSInnova app screens">
          <div class="hero-phones">
            <div v-for="(mockup, index) in sourceImages.heroMockups" :key="mockup" class="hero-phone" :class="`hero-phone-${index + 1}`">
              <img :src="sourceAsset(mockup)" :alt="['Farm registration app screen','FBSInnova home screen','Farm accounting app screen'][index]" :loading="index === 0 ? 'eager' : 'lazy'" />
            </div>
          </div>
        </div></Reveal>
      </div>
    </section>

    <section id="overview" class="overview section-pad">
      <div class="page-width overview-grid">
        <Reveal><div class="section-kicker">01 <span></span> FBSINNOVA</div><h2 class="section-title">Maximize<br /><em>your yield.</em></h2></Reveal>
        <Reveal :delay="100"><div class="overview-text"><p>{{ content.description }}</p><a class="text-link" :href="content.links.download" target="_blank" rel="noreferrer">Discover the app <ArrowRight :size="16" /></a></div></Reveal>
        <div class="feature-grid">
          <Reveal v-for="(feature, index) in content.features" :key="feature.title" :delay="index * 90"><motion.article class="feature-card" :while-hover="{ y: -7, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 22 } }" :while-tap="{ scale: 0.99 }"><div class="feature-number">0{{ index + 1 }}</div><div class="feature-icon"><img :src="sourceAsset(feature.icon)" :alt="`${feature.title} icon`" loading="lazy" /></div><h3>{{ feature.title }}</h3><p>{{ feature.body }}</p></motion.article></Reveal>
        </div>
      </div>
    </section>

    <section class="showcase section-pad">
      <div class="page-width showcase-grid showcase-grid-wide">
        <Reveal><div class="showcase-copy showcase-copy-compact"><div class="section-kicker light-kicker">FBSINNOVA</div><h2 class="section-title light-title">Learn, track,<br /><em>diversify!</em></h2></div></Reveal>
        <Reveal :delay="120"><div class="showcase-visual" @mouseenter="carouselHovered = true" @mouseleave="carouselHovered = false" @focusin="carouselFocused = true" @focusout="carouselFocused = false"><motion.div class="showcase-image" :while-hover="{ scale: 1.015, transition: { duration: 0.25 } }"><AnimatePresence mode="wait" :initial="false"><motion.img :key="active.src" :src="active.src" :alt="active.alt" :initial="reduceMotion ? false : { opacity: 0, x: 18 }" :animate="{ opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' } }" :exit="{ opacity: 0, x: -18, transition: { duration: reduceMotion ? 0 : 0.28, ease: 'easeIn' } }" loading="lazy" /></AnimatePresence><div class="image-caption">FBSINNOVA · LEARN, TRACK, DIVERSIFY</div></motion.div><div class="slide-dots" role="tablist" aria-label="Farm image carousel"><motion.button v-for="(slide, index) in slides" :key="slide.src" type="button" role="tab" :aria-selected="index === activeSlide" :aria-label="`Show source carousel image ${index + 1}`" :while-hover="{ scale: 1.3 }" :while-tap="{ scale: 0.82 }" @click="activeSlide = index"></motion.button></div><div class="slide-count">0{{ activeSlide + 1 }} <span>/ 03</span></div></div></Reveal>
      </div>
    </section>

    <section id="aim" class="aim section-pad">
      <div class="page-width aim-layout">
        <Reveal class="aim-phone-reveal">
          <div class="aim-phone-stage">
            <img :src="sourceAsset('farm-transparent.png')" alt="FBSInnova farm registration mobile app mockup" loading="lazy" />
          </div>
        </Reveal>
        <div class="aim-content">
          <Reveal :delay="90"><div class="aim-heading">
            <div class="section-kicker">02 <span></span> THE BIG PICTURE</div>
            <h2 class="section-title">Our <em>aim.</em></h2>
          </div></Reveal>
          <div class="aim-copy">
            <Reveal v-for="(paragraph, index) in content.aim" :key="paragraph" :delay="180 + index * 140">
              <p class="aim-paragraph"><span class="aim-paragraph-num">0{{ index + 1 }}</span><span>{{ paragraph }}</span></p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section class="modules section-pad"><div class="page-width"><Reveal><div class="modules-heading"><div><div class="section-kicker">03 <span></span></div><h2 class="section-title">Our core <em>modules.</em></h2></div><p>{{ content.modulesIntro }}</p></div></Reveal><div class="module-grid"><Reveal v-for="(module, index) in content.modules" :key="module.title" :delay="index * 110"><motion.article class="module-card" :while-hover="{ y: -7, transition: { type: 'spring', stiffness: 280, damping: 22 } }" :while-tap="{ scale: 0.99 }"><div class="module-top"><span>0{{ index + 1 }}</span></div><div class="module-art module-screen-art" :class="`module-art-${index + 1}`"><img :src="sourceAsset(module.screen)" :alt="`${module.title} app screen`" loading="lazy"/></div><h3>{{ module.title }}</h3><p>{{ module.description }}</p></motion.article></Reveal></div></div></section>

    <section class="impact-preview section-pad"><div class="page-width"><Reveal><div class="impact-preview-head"><div><div class="section-kicker">04 <span></span></div><h2 class="section-title">Our <em>impact.</em></h2></div><RouterLink to="/profile" class="text-link">Read more <ArrowRight :size="16" /></RouterLink></div></Reveal><div class="impact-preview-grid"><Reveal v-for="(impact, index) in homeImpacts" :key="impact.title" :delay="index * 70"><motion.div class="impact-tile-motion" :while-hover="{ y: -6, scale: 1.015, transition: { type: 'spring', stiffness: 300, damping: 23 } }" :while-tap="{ scale: 0.985 }"><RouterLink to="/profile" class="impact-tile"><img :src="sourceAsset(impact.goal)" :alt="`SDG ${impact.goalNumber}: ${impact.goalTitle}`" loading="lazy"/><h3>{{ impact.title }}</h3><span class="impact-tile-arrow"><ArrowUpRight :size="19" /></span></RouterLink></motion.div></Reveal></div></div></section>

    <section id="download" class="download-section" aria-labelledby="download-title">
      <div class="download-contours" aria-hidden="true"></div>
      <div class="page-width download-inner">
        <Reveal><div class="download-copy">
          <div class="download-kicker"><span class="download-kicker-dot"></span> FBSINNOVA · MOBILE APP</div>
          <h2 id="download-title">Your farm.<br /><em>Your next move.</em></h2>
          <p>Get on-demand Farmer Business School tools and information to learn, plan your crops, and track your farm finances.</p>
          <motion.a class="download-store-link" :href="content.links.download" target="_blank" rel="noreferrer" :while-hover="{ y: -4, scale: 1.025 }" :while-tap="{ scale: 0.97 }">Open Google Play <ArrowUpRight :size="18" /></motion.a>
          <span class="download-url-note">Available through Google Play</span>
        </div></Reveal>
        <Reveal :delay="140"><div class="download-display">
          <div class="download-device"><img :src="sourceAsset(content.modules[0].screen)" alt="FBSInnova educational hub app screen" loading="lazy"/><span class="device-speaker"></span></div>
          <div class="download-qr-card">
            <div class="qr-heading"><ScanLine :size="18" /><span>SCAN TO DOWNLOAD</span></div>
            <img v-if="appQr" class="download-qr" :src="appQr" alt="QR code linking to FBSInnova on Google Play" width="192" height="192" />
            <div v-else class="download-qr-loading" role="status" aria-label="Preparing QR code"><span></span></div>
            <p>Open your phone camera and scan</p>
            <a :href="content.links.download" target="_blank" rel="noreferrer">Or tap to open Google Play <ArrowUpRight :size="14" /></a>
          </div>
        </div></Reveal>
      </div>
    </section>

    <section class="trusted section-pad"><div class="page-width trusted-inner"><Reveal><div class="section-kicker">FBSINNOVA</div><h2 class="section-title">Trusted by</h2></Reveal><div class="trusted-logos" aria-label="Trusted by GIZ, MEST, and AgroInnova"><Reveal v-for="(partner, index) in sourceImages.partners" :key="partner" :delay="index * 80"><img :src="sourceAsset(partner)" :alt="['GIZ', 'MEST', 'AgroInnova'][index]" loading="lazy"/></Reveal></div></div></section>
  </main>
</template>
