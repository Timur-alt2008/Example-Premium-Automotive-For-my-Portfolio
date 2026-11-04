# Research and design concept

## How the research was done

The references were collected with web search and by reading public pages in a browser:
detailing and paint-protection studios, supercar rental sites, manufacturer sites
(Porsche, Lamborghini, McLaren, Rolls-Royce) and automotive projects featured on Awwwards
and in the Webflow / Framer showcases. Nothing was scraped or copied: no code, texts,
brand elements or images were taken from these sites.

A dedicated scraping tool was **not** built. The development environment can only reach a
short allow-list of hosts from the command line, so an automated parser would not have
worked, and simulating its results would be dishonest. Reference analysis was done by hand
from search results and pages opened in the browser.

Photos were selected on Unsplash (free licence, Unsplash+ excluded) by searching for each
car model and checking every candidate visually on a contact sheet, so that each fleet card
shows the model it describes. Where no free photo of a planned model existed
(Ferrari 488 Spider, BMW M8), the model was replaced with one that has correct photos
(Ferrari 296 GTB, Porsche 911 Carrera S Cabriolet, Rolls-Royce Dawn).

## What strong automotive sites do

| Pattern | Seen on | Takeaway for Example |
| --- | --- | --- |
| A single object lit in darkness on the first screen | Manufacturer sites, studio shoots | One car, one light, nothing else on the hero |
| Spec readouts as big numerals | Porsche, McLaren model pages | Power, 0–100 and top speed as a "dashboard" band on car pages |
| Horizontal model rails | Dealer and rental sites | A draggable rail of featured cars on the home page |
| Paint layers explained with diagrams | PPF and ceramic coating brands | An interactive cross-section of the paint system in microns |
| Before/after sliders | Detailing studios | A comparison slider whose divider is styled as an inspection lamp |
| Long, generic service lists with icons | Most detailing templates | Avoided: services are a typographic index with a cursor-following photo |
| Gold-on-black "luxury" templates | Many rental sites | Avoided: champagne is a thin accent, the rest is black, graphite and ivory |

## Concept: "light finds every detail"

Detailers judge paint under inspection lamps: swirl marks, holograms and dust only show up
when a line of light passes over the surface. The whole identity is built on that one
device.

- **Hero**: a line of light crosses the screen and develops the car photo; on desktop the
  light then follows the cursor. The headline's second line catches a specular highlight.
- **Lamp line**: a thin luminous line marks the active item everywhere — navigation,
  service rows, advantages, process timeline, before/after tabs, page transitions.
- **Before/after**: the divider *is* the lamp, so dragging it literally shows what the light
  reveals.
- **Anatomy of protection**: the paint stack (PPF, ceramic, clear coat, base, primer, metal)
  with real thicknesses in microns explains what each service protects.

### Tokens

| Token | Value | Role |
| --- | --- | --- |
| Void | `#030304` | Background |
| Graphite | `#0f1013` | Surfaces |
| Gunmetal | `#17191d` | Cards, image placeholders |
| Ivory | `#f1eee8` | Headings, primary buttons |
| Silver | `#a2a5ad` | Secondary text |
| Champagne | `#cbb68a` | Thin accent: numbers, active states |
| Lamp | `#fbf8f1` | The light line and glows |

Type: **Unbounded** (wide geometric display, Cyrillic) at light weights for headlines and
numerals; **Manrope** for text. Both are served by Google Fonts with `display=swap`.

### Composition

Each home section has its own layout: full-bleed hero, editorial statement with facts,
split-screen directions that expand on hover, a typographic service index, a horizontal
rail, a sticky two-column advantages list, an asymmetric mosaic, a before/after stage,
a horizontal timeline, a review stage with a photo, a full-bleed CTA and a contact strip
with an illustrated map.
