# Final audit

What was checked before publishing, what was found and how it was fixed.

## Automated checks

| Check | Tool | Result |
| --- | --- | --- |
| TypeScript | `tsc --noEmit` (strict) | 0 errors |
| Build | `npm run build` | 43 pages + 404, no warnings |
| Console and hydration errors | Playwright on all pages | 0 errors |
| End-to-end scenarios | Playwright, desktop Chrome + Pixel 7 | 81 passed, 3 skipped by design (device-specific) |
| Horizontal overflow | Script over 43 pages × 12 viewports from the brief | none |
| Photos | Every Unsplash id fetched from the live site | 65 / 65 return 200 |
| Internal links | Test collects every link on key pages and requests it | all 200 |
| Lighthouse, home, mobile | PageSpeed Insights | Performance 99, Accessibility 100, Best Practices 100, SEO 100 |
| Lighthouse, home, desktop | PageSpeed Insights | 99 / 100 / 100 / 100 |

## Problems found and fixed

| # | Problem | Where | Fix |
| --- | --- | --- | --- |
| 1 | JavaScript bundle of 533 KB | All pages | Each page is a separate chunk; GSAP and Lenis load after first paint. Main bundle 187 KB |
| 2 | Cyrillic text escaped as `\uXXXX` in the bundle | Build | `charset: 'utf8'` in esbuild |
| 3 | Possible hydration mismatch from Intl formatting differences between Node and browsers | Prices, dates | Formatting written by hand, identical on server and client |
| 4 | Hero headline stayed below its mask after the animation | Home | GSAP had read the CSS offset as pixels; the timeline now sets `y: 0` explicitly |
| 5 | Layout shift 0.395 | Home | The light beam animated `left`; it now uses `transform` |
| 6 | Full-screen loader delayed Speed Index | All pages | Replaced with a non-blocking line of light at the top |
| 7 | LCP 3.8–4.1 s on mobile | Home, inner pages | Above-the-fold text is no longer hidden with opacity during the intro |
| 8 | Contrast below 4.5:1 for inactive items | Advantages, process | Dimming by colour instead of opacity |
| 9 | `aria-label` on an element without a role | Review rating | `role="img"` |
| 10 | Heading levels skipped | Catalog cards | Cards use `h2` on the catalog page |
| 11 | Clip-path reveals never fired in Chrome | Home directions, page heroes, About | Chrome applies the target's own clip-path in IntersectionObserver; the parent is observed instead |
| 12 | Long words overflowed the split hero column with the wide display font | Detailing hero | Smaller split-hero title size, hyphenation as a safety net |
| 13 | Text covered the car on phone-size car and service pages | Car and service pages | On phones the photo is a separate frame above the text |
| 14 | Scroll hint overlapped a hero button | Home | Moved into the bottom meta row |
| 15 | Urus photo shows the facelifted car | Urus page | Specifications changed to the Urus S (666 hp, 0–100 in 3.5 s) |

## Honest limitations

- **Photos come from the Unsplash CDN**, not from the repository. The build environment
  could not download them, so the site requests them at runtime. Every photo has a
  branded fallback if the CDN is unavailable.
- **"Before" states are simulated.** The before/after slider uses the same photo with
  filters and drawn defects (swirl marks, stains, brake dust). The caption says so.
- **Safari, Firefox and Edge were not run as separate engines.** Tests ran in Chromium.
  The code avoids engine-specific features (no `:has()` dependency for layout, `-webkit-`
  prefixes for backdrop-filter and background-clip, `svh`/`dvh` with `vh` fallbacks,
  Lenis only on fine pointers, so iOS keeps native scrolling); a manual pass in Safari
  on a Mac and an iPhone is still recommended.
- **No backend.** Requests are stored in the visitor's browser; this is stated next to
  every form and on the success page.
- **Car availability is not real.** Prices, deposits and availability are demonstration
  data; manufacturer specifications are real.
