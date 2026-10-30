<script setup lang="ts">
import { nextTick, ref } from "vue";
import { motion } from "motion-v";
import { RouterLink, useRouter } from "vue-router";
import { ArrowUpRight, Facebook, Instagram, Menu, X } from "lucide-vue-next";
import BrandX from "./XBrandIcon.vue";
import { content, sourceAsset, sourceImages } from "../data/content";
const open = ref(false);
const router = useRouter();
const goToAim = async () => {
  open.value = false;
  if (router.currentRoute.value.path !== "/") await router.push("/");
  await nextTick();
  document
    .getElementById("aim")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header sticky top-0 z-30">
    <div class="nav-ribbon">
      <div class="nav-ribbon-inner">
        <span><i></i> Farmer Business School · Ghana</span
        ><a href="/#download"
          >Learn, track, diversify <ArrowUpRight :size="13"
        /></a>
      </div>
    </div>
    <div class="nav-shell flex items-center justify-between">
      <RouterLink
        to="/"
        class="brand"
        aria-label="FBS Innova home"
        @click="open = false"
      >
        <img
          class="brand-image"
          :src="sourceAsset(sourceImages.logo)"
          alt="FBS Innova"
        />
      </RouterLink>
      <nav class="desktop-nav" aria-label="Main navigation">
        <RouterLink
          to="/"
          class="nav-link"
          active-class="current"
          exact-active-class="current"
          >Home</RouterLink
        >
        <a href="#aim" class="nav-link" @click.prevent="goToAim">Our aim</a>
        <RouterLink to="/profile" class="nav-link" active-class="current"
          >Our impact</RouterLink
        >
        <a
          class="nav-link"
          :href="content.links.about"
          target="_blank"
          rel="noreferrer"
          >About us</a
        >
        <motion.a
          class="nav-cta"
          href="/#download"
          :while-hover="{ y: -2, scale: 1.025 }"
          :while-tap="{ scale: 0.97 }"
          >Download app <ArrowUpRight :size="16"
        /></motion.a>
        <span class="nav-socials">
          <a
            :href="content.links.twitter"
            aria-label="Twitter"
            target="_blank"
            rel="noreferrer"
            ><BrandX :size="16"
          /></a>
          <a
            :href="content.links.facebook"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
            ><Facebook :size="16"
          /></a>
          <a
            :href="content.links.instagram"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
            ><Instagram :size="16"
          /></a>
        </span>
      </nav>
      <motion.button
        class="mobile-toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        :while-hover="{ scale: 1.08 }"
        :while-tap="{ scale: 0.92 }"
        @click="open = !open"
      >
        <X v-if="open" :size="23" /><Menu v-else :size="23" />
      </motion.button>
    </div>
    <motion.nav
      v-if="open"
      id="mobile-menu"
      class="mobile-menu"
      aria-label="Mobile navigation"
      :initial="{ opacity: 0, y: -8 }"
      :animate="{ opacity: 1, y: 0, transition: { duration: 0.2 } }"
    >
      <RouterLink to="/" @click="open = false">Home</RouterLink
      ><a href="#aim" @click.prevent="goToAim">Our aim</a>
      <RouterLink to="/profile" @click="open = false">Our impact</RouterLink>
      <a
        :href="content.links.about"
        target="_blank"
        rel="noreferrer"
        @click="open = false"
        >About us <ArrowUpRight :size="16"
      /></a>
      <a href="/#download" @click="open = false"
        >Download app <ArrowUpRight :size="16"
      /></a>
      <div class="mobile-socials">
        <a
          :href="content.links.twitter"
          aria-label="Twitter"
          target="_blank"
          rel="noreferrer"
        >
          <BrandX :size="18" />
          /></a
        >
        <a
          :href="content.links.facebook"
          aria-label="Facebook"
          target="_blank"
          rel="noreferrer"
          ><Facebook :size="18" /></a
        ><a
          :href="content.links.instagram"
          aria-label="Instagram"
          target="_blank"
          rel="noreferrer"
          ><Instagram :size="18"
        /></a>
      </div>
    </motion.nav>
  </header>
</template>
