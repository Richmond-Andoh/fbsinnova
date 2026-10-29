<script setup lang="ts">
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-vue-next'
import { content, sourceAsset, sourceImages } from '../data/content'
</script>

<template>
  <footer class="site-footer">
    <div class="footer-top">
      <div class="footer-brand"><a class="footer-logo" href="https://agroinnovagh.com/" target="_blank" rel="noreferrer"><img :src="sourceAsset(sourceImages.logo)" alt="FBS Innova" /></a><p>Learn, track, diversify.</p></div>
      <div class="footer-contact">
        <a :href="`https://maps.google.com/?q=${encodeURIComponent(content.address)}`" target="_blank" rel="noreferrer"><MapPin :size="17" />{{ content.address }}<ArrowUpRight :size="14" /></a>
        <a :href="`tel:${content.phone.replaceAll(' ', '')}`"><Phone :size="17" />{{ content.phone }}</a>
        <a :href="content.links.email"><Mail :size="17" />info@fbsinnova.com</a>
      </div>
      <div class="footer-social" aria-label="Social media">
        <a :href="content.links.twitter" aria-label="Twitter" target="_blank" rel="noreferrer"><span class="social-x">𝕏</span></a>
        <a :href="content.links.facebook" aria-label="Facebook" target="_blank" rel="noreferrer"><Facebook :size="18" /></a>
        <a :href="content.links.instagram" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram :size="18" /></a>
      </div>
    </div>
    <div class="footer-bottom"><a href="https://agroinnovagh.com/" target="_blank" rel="noreferrer">AgroInnova © 2019</a><span>FBSINNOVA · Learn, track, diversify!</span></div>
  </footer>
</template>
