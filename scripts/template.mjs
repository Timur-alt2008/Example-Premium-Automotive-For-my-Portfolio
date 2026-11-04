import { BASE, FONTS_URL, SITE } from './config.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/**
 * HTML document for one route. `heroImage` (optional) is preloaded so the first
 * screen photo starts downloading before the JavaScript bundle runs.
 */
export function page({ path, meta, image, body, js, css, heroImage, preloads = [] }) {
  const url = SITE + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow'}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#030304">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Example">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${BASE}/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${BASE}/apple-touch-icon.png">
<link rel="manifest" href="${BASE}/site.webmanifest">
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${heroImage ? `<link rel="preload" as="image" imagesrcset="${esc(heroImage.srcset)}" imagesizes="100vw" fetchpriority="high">` : ''}
<link rel="preload" as="style" href="${FONTS_URL}">
<link rel="stylesheet" href="${FONTS_URL}" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="${FONTS_URL}"></noscript>
<link rel="stylesheet" href="${css}">
<script>document.documentElement.classList.add('js')</script>
<script type="module" src="${js}"></script>
${preloads.map((p) => `<link rel="modulepreload" href="${p}">`).join('\n')}
</head>
<body>
<div class="loader" aria-hidden="true"><span class="loader__word">EXAMPLE</span><span class="loader__line"></span></div>
<div id="root">${body}</div>
</body>
</html>
`;
}
