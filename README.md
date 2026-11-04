# Example — Premium Automotive Experience

A multi-page website for **Example**, a fictional studio that combines premium auto
detailing with a rental collection of supercars and luxury cars. Built as a portfolio
project: the company, contacts, prices, team and reviews are invented, while the cars,
their specifications and the detailing services are real and described accurately.

**Live site:** https://timur-alt2008.github.io/Example-Premium-Automotive-For-my-Portfolio/

## Features

- **14 real cars** (Lamborghini, Ferrari, McLaren, Porsche, Rolls-Royce, Bentley, Audi,
  Mercedes-AMG) with manufacturer specifications and their own pages: gallery with
  full-screen viewer, animated spec readouts, rates with discounts, deposit, terms,
  built-in booking and similar cars.
- **Catalog with working filters**: category tabs, brand, body type, dual price range,
  power, seats; sorting by popularity, price, power and name; reset and empty state;
  category and sort are kept in the URL.
- **Rental booking**: car, date range calendar (return cannot precede pickup), pickup time,
  extras, comments, contacts; live price calculation with length-of-rent discounts,
  extras and a demo promo code; validation, sending state, offline error with retry,
  success page with a request number.
- **Detailing**: 17 services with their own pages, three packages with a comparison table
  (prices switch between coupe and SUV), an interactive paint-layer diagram in microns,
  a booking form with service, package, car, date and time.
- **Before / after slider** with mouse, touch and keyboard control.
- **Gallery** with six categories, masonry grid and a lightbox (arrows, keyboard, swipe,
  Escape); before/after items open as comparisons.
- About, contacts (with feedback form and illustrated map), FAQ with search, privacy and
  rental terms, success, error and 404 pages.
- Motion: light-sweep hero reveal, cursor-following inspection light, masked headline
  reveals, parallax, page transitions behind a curtain of light, count-up readouts,
  smooth scrolling on desktop. `prefers-reduced-motion` turns all of it off.

All demo actions are marked as such: requests are stored only in the visitor's browser,
nothing is reserved and no payment is taken.

## Tech stack

| | |
| --- | --- |
| UI | React 19, TypeScript |
| Build | esbuild with a small build script (`scripts/build.mjs`) |
| Rendering | Every route is pre-rendered to static HTML at build time and hydrated in the browser |
| Routing | A lightweight History API router with base-path support |
| Styling | Hand-written CSS with design tokens (no CSS framework) |
| Motion | GSAP + ScrollTrigger, Lenis (loaded after first paint) |
| Tests | Playwright (desktop Chrome and Pixel 7 profiles) |
| Hosting | GitHub Pages (`gh-pages` branch) |

Why not Vite or Next.js: the site is fully static, and pre-rendering each route to its own
HTML file gives GitHub Pages real pages (status 200, unique title, description and Open
Graph tags, content visible without JavaScript) without a server. esbuild does the
bundling, code-splitting by page and minification in under a second.

## Project structure

```
src/
  data/          cars, services, packages, company, content (FAQ, reviews, gallery), photos
  router/        router (History API, base path) and route table with page metadata
  lib/           pricing, validation, dates, formatting, demo request storage, motion
  components/
    layout/      header, mobile menu, footer, page hero
    ui/          photo, icons, modal, lightbox, calendar, form fields, toast, accordion
    home/        home page sections
    cars/        car card, catalog filters
    detailing/   service card, before/after, paint layers, package comparison
    booking/     rental and detailing forms
  pages/         one file per page, each loaded as its own chunk
  styles/        tokens, base, layout, components, forms, home, pages
scripts/         build, dev server, preview, deploy
tests/           Playwright end-to-end tests
docs/            research notes and the final audit
```

## Getting started

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173/Example-Premium-Automotive-For-my-Portfolio/
```

The dev server rebuilds the site on every change; reload the page to see it.

## Build and preview

```bash
npm run build      # outputs static files to dist/
npm run preview    # http://localhost:4173/Example-Premium-Automotive-For-my-Portfolio/
```

## Tests

```bash
npx playwright install chromium   # first time only
npm test
```

The tests start the preview server, replace CDN photos with a local pixel so they run
offline, and fail on any console error.

## Deploy

```bash
npm run build && node scripts/deploy.mjs
```

This pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves.

## Credits

- Photos: [Unsplash](https://unsplash.com/license), delivered by the Unsplash image CDN.
  Every photo id is listed in `src/data/media.ts`. "Before" states in the comparison
  slider are visual simulations of the same photo, not separate shots.
- Fonts: [Unbounded](https://fonts.google.com/specimen/Unbounded) and
  [Manrope](https://fonts.google.com/specimen/Manrope), SIL Open Font License.
- Car names and trademarks belong to their owners and are used only to describe the cars.
- Example is a fictional company. Phone numbers use the reserved 555-01xx range and
  e-mail addresses use the reserved `example.com` domain.
