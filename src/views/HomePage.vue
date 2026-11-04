<script setup lang="ts">
import { onMounted, ref } from "vue";
import QRCode from "qrcode";
import { motion } from "motion-v";
import { ArrowDown, ArrowRight, ArrowUpRight, ScanLine } from "lucide-vue-next";
import Reveal from "../components/Reveal.vue";
import { content, sourceAsset, sourceImages } from "../data/content";

const homeImpacts = [
  content.impacts[0],
  content.impacts[2],
  content.impacts[3],
  content.impacts[1],
];
const appQr = ref("");

onMounted(async () => {
  try {
    appQr.value = await QRCode.toDataURL(content.links.download, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#173a29", light: "#fffaf0" },
    });
  } catch (error) {
    console.error("Unable to generate the FBSInnova download QR code.", error);
  }
});
</script>

<template>
  <main id="main">
    <section class="hero" aria-labelledby="hero-title">
      <div class="page-width hero-inner">
        <div class="hero-copy">
          <Reveal
            ><div class="eyebrow hero-eyebrow">
              <span class="eyebrow-dot"></span> FBSINNOVA · FARMER BUSINESS
              SCHOOL
            </div></Reveal
          >
          <Reveal :delay="70"
            ><h1 id="hero-title">
              Learn. Track.<br /><em>Diversify.</em>
            </h1></Reveal
          >
          <Reveal :delay="150"
            ><p class="hero-lede">
              On-demand Farmer Business School tools for smallholder farmers.<br />Plan
              crops, manage finances, and diversify for better livelihoods.
            </p></Reveal
          >
          <Reveal :delay="220"
            ><div class="hero-actions">
              <motion.a
                class="button button-lime action-button action-button-primary"
                :href="content.links.download"
                target="_blank"
                rel="noreferrer"
                :while-hover="{ y: -4, scale: 1.035 }"
                :while-tap="{ scale: 0.97 }"
                >Get the app <ArrowUpRight :size="18" /></motion.a
              ><a class="hero-secondary action-button action-button-secondary" href="#modules"
                >Explore core modules <ArrowDown :size="16"
              /></a>
            </div></Reveal
          >
        </div>
        <div class="hero-product" aria-label="FBSInnova app screens">
          <div class="hero-phones">
            <div
              v-for="(mockup, index) in sourceImages.heroMockups"
              :key="mockup"
              class="hero-phone"
              :class="[
                `hero-phone-${index + 1}`,
                index === 1 ? 'hero-phone-center-slot' : '',
              ]"
            >
              <img
                :src="sourceAsset(mockup)"
                :alt="
                  [
                    'Farm registration app screen',
                    'FBSInnova home screen',
                    'Farm accounting app screen',
                  ][index]
                "
                :loading="index === 0 ? 'eager' : 'lazy'"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="overview" class="overview section-pad">
      <img
        class="hero-center-phone"
        :src="sourceAsset(sourceImages.heroMockups[1])"
        alt="FBSInnova home screen app mockup"
        loading="eager"
      />
      <div class="page-width overview-grid">
        <Reveal
          ><div class="section-kicker">01 <span></span> FBSINNOVA</div>
          <h2 class="section-title">
            Maximize<br /><em>your yield.</em>
          </h2></Reveal
        >
        <Reveal :delay="100"
          ><div class="overview-text">
            <p>{{ content.description }}</p>
            <a
              class="text-link"
              :href="content.links.download"
              target="_blank"
              rel="noreferrer"
              >Discover the app <ArrowRight :size="16"
            /></a></div
        ></Reveal>
        <div class="feature-grid">
          <Reveal
            v-for="(feature, index) in content.features"
            :key="feature.title"
            :delay="index * 90"
            ><motion.article
              class="feature-card"
              :while-hover="{
                y: -7,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 22 },
              }"
              :while-tap="{ scale: 0.99 }"
              ><div class="feature-number">0{{ index + 1 }}</div>
              <div class="feature-icon">
                <img
                  :src="sourceAsset(feature.icon)"
                  :alt="`${feature.title} icon`"
                  loading="lazy"
                />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.body }}</p></motion.article
            ></Reveal
          >
        </div>
      </div>
    </section>

    <section class="adopted-countries section-pad" aria-labelledby="countries-title">
      <div class="page-width">
        <Reveal>
          <div class="countries-heading">
            <div>
              <div class="section-kicker">OUR REACH <span></span> 9 COUNTRIES</div>
              <h2 id="countries-title" class="section-title">Adopted <em>countries.</em></h2>
            </div>
            <p>Farmer Business School tools serving communities across Africa.</p>
          </div>
        </Reveal>
        <div class="country-grid">
          <Reveal
            v-for="(country, index) in content.adoptedCountries"
            :key="country.name"
            :delay="index * 55"
          >
            <motion.article
              class="country-card"
              :class="{ 'is-hub': country.note }"
              :while-hover="{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 24 } }"
            >
              <img :src="sourceAsset(country.flag)" :alt="`${country.name} flag`" loading="lazy" />
              <div class="country-name">
                <h3>{{ country.name }}</h3>
                <span v-if="country.note">{{ country.note }}</span>
              </div>
              <span v-if="country.note" class="country-hub-mark" aria-hidden="true">★</span>
            </motion.article>
          </Reveal>
        </div>
      </div>
    </section>

    <section id="aim" class="aim section-pad">
      <div class="page-width aim-layout">
        <Reveal class="aim-phone-reveal">
          <div class="aim-phone-stage">
            <img
              :src="sourceAsset('farm-transparent.png')"
              alt="FBSInnova farm registration mobile app mockup"
              loading="lazy"
            />
          </div>
        </Reveal>
        <div class="aim-content">
          <Reveal :delay="90"
            ><div class="aim-heading">
              <div class="section-kicker">02 <span></span> THE BIG PICTURE</div>
              <h2 class="section-title">Our <em>aim.</em></h2>
            </div></Reveal
          >
          <div class="aim-copy">
            <Reveal
              v-for="(paragraph, index) in content.aim"
              :key="paragraph"
              :delay="180 + index * 140"
            >
              <p class="aim-paragraph">
                <span class="aim-paragraph-num">0{{ index + 1 }}</span
                ><span>{{ paragraph }}</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section id="modules" class="modules section-pad">
      <div class="page-width">
        <Reveal
          ><div class="modules-heading">
            <div class="modules-title">
              <div>
                <div class="section-kicker">03 <span></span></div>
                <h2 class="section-title">Our core <em>modules.</em></h2>
              </div>
            </div>
            <p>{{ content.modulesIntro }}</p>
          </div></Reveal
        >
        <div class="module-grid">
          <Reveal
            v-for="(module, index) in content.modules"
            :key="module.title"
            :delay="index * 110"
            ><motion.article
              class="module-card"
              :class="`module-card-${index + 1}`"
              :while-hover="{
                y: -7,
                transition: { type: 'spring', stiffness: 280, damping: 22 },
              }"
              :while-tap="{ scale: 0.99 }"
              ><div class="module-pattern-art" aria-hidden="true"></div>
              <div class="module-card-content">
                <div class="module-top"><span>0{{ index + 1 }}</span></div>
                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>
              </div></motion.article
            ></Reveal
          >
        </div>
      </div>
    </section>

    <section class="impact-preview section-pad">
      <div class="page-width">
        <Reveal
          ><div class="impact-preview-head">
            <div>
              <div class="section-kicker">04 <span></span></div>
              <h2 class="section-title">Our <em>impact.</em></h2>
            </div>
            <RouterLink to="/profile" class="text-link"
              >Read more <ArrowRight :size="16"
            /></RouterLink></div
        ></Reveal>
        <div class="impact-preview-grid">
          <Reveal
            v-for="(impact, index) in homeImpacts"
            :key="impact.title"
            :delay="index * 70"
            ><motion.div
              class="impact-tile-motion"
              :while-hover="{
                y: -6,
                scale: 1.015,
                transition: { type: 'spring', stiffness: 300, damping: 23 },
              }"
              :while-tap="{ scale: 0.985 }"
              ><RouterLink to="/profile" class="impact-tile"
                ><img
                  :src="sourceAsset(impact.goal)"
                  :alt="`SDG ${impact.goalNumber}: ${impact.goalTitle}`"
                  loading="lazy" />
                <h3>{{ impact.title }}</h3>
                <span class="impact-tile-arrow"
                  ><ArrowUpRight :size="19" /></span></RouterLink></motion.div
          ></Reveal>
        </div>
      </div>
    </section>

    <section
      id="download"
      class="download-section"
      aria-labelledby="download-title"
    >
      <div class="download-contours" aria-hidden="true"></div>
      <div class="page-width download-inner">
        <Reveal
          ><div class="download-copy">
            <div class="download-kicker">
              <span class="download-kicker-dot"></span> FBSINNOVA · MOBILE APP
            </div>
            <h2 id="download-title">
              Your farm.<br /><em>Your next move.</em>
            </h2>
            <p>
              Get on-demand Farmer Business School tools and information to
              learn, plan your crops, and track your farm finances.
            </p>
            <motion.a
              class="download-store-link action-button action-button-primary action-button-on-green"
              :href="content.links.download"
              target="_blank"
              rel="noreferrer"
              :while-hover="{ y: -4, scale: 1.025 }"
              :while-tap="{ scale: 0.97 }"
              >Open Google Play <ArrowUpRight :size="18"
            /></motion.a>
            <span class="download-url-note">Available through Google Play</span>
          </div></Reveal
        >
        <Reveal :delay="140"
          ><div class="download-display">
            <div class="download-device">
              <img
                :src="sourceAsset(content.modules[0].screen)"
                alt="FBSInnova educational hub app screen"
                loading="lazy"
              /><span class="device-speaker"></span>
            </div>
            <div class="download-qr-card">
              <div class="qr-heading">
                <ScanLine :size="18" /><span>SCAN TO DOWNLOAD</span>
              </div>
              <img
                v-if="appQr"
                class="download-qr"
                :src="appQr"
                alt="QR code linking to FBSInnova on Google Play"
                width="192"
                height="192"
              />
              <div
                v-else
                class="download-qr-loading"
                role="status"
                aria-label="Preparing QR code"
              >
                <span></span>
              </div>
              <p>Open your phone camera and scan</p>
              <a :href="content.links.download" target="_blank" rel="noreferrer"
                >Or tap to open Google Play <ArrowUpRight :size="14"
              /></a>
            </div></div
        ></Reveal>
      </div>
    </section>

    <section class="trusted section-pad">
      <div class="page-width trusted-inner">
        <Reveal
          ><div class="section-kicker">FBSINNOVA</div>
          <h2 class="section-title">Trusted by</h2></Reveal
        >
        <div
          class="trusted-logos"
          aria-label="Trusted by GIZ, MEST, and AgroInnova"
        >
          <Reveal
            v-for="(partner, index) in sourceImages.partners"
            :key="partner"
            :delay="index * 80"
            ><img
              :src="sourceAsset(partner)"
              :alt="['GIZ', 'MEST', 'AgroInnova'][index]"
              loading="lazy"
          /></Reveal>
        </div>
      </div>
    </section>
  </main>
</template>
