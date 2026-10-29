# FBS Innova website

A responsive Vue 3 + TypeScript website built with Vite, Tailwind CSS 4, Motion for Vue, Vue Router, and Lucide Vue Next.

## Run locally

1. Install Node.js 20.19+ or 22.12+.
2. Run `npm install`.
3. Run `npm run dev` and open the local URL printed by Vite.

## Production build

Run `npm run build`; the deployable static site is written to `dist/`. Upload `dist/` to any static host. Configure the host to serve `index.html` for unknown paths; Vue Router uses hash URLs.

Run `npm run preview` to inspect the production build locally. `npm run typecheck` runs Vue/TypeScript checks.

## Source audit and preservation notes

The source site exposes two routes: `/#/` and `/#/profile`. Both have been rebuilt. The verified source copy is stored in `src/data/content.ts`, including the original language, spelling, company claims, contact details, impact-area descriptions, and social/download destinations. Original logos, crop illustrations, app screens, SDG cards, and partner marks are bundled in `public/assets/source/` and used throughout the refreshed pages.

The landing-page carousel showed cocoa, cassava, and corn imagery without slide captions. The source impact visuals identify SDGs 1 (No Poverty), 2 (Zero Hunger), 8 (Decent Work and Economic Growth), and 9 (Industry, Innovation and Infrastructure). The “Trusted by” logos are GIZ, MEST, and AgroInnova. The original images and logos are stored locally in `public/assets/source/` so the site does not depend on third-party image hosting.

The original “About Us” link points to [AgroInnova](https://agroinnovagh.com/), while the app, Twitter, Facebook, Instagram, email, address and telephone destinations remain represented as functional links.
