// Production build: bundles the client with esbuild, pre-renders every route to static
// HTML (so each page has its own title, description and content without JavaScript),
// and writes sitemap.xml, robots.txt and 404.html for GitHub Pages.
import { build } from 'esbuild';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { BASE, SITE } from './config.mjs';
import { page } from './template.mjs';

const OUT = 'dist';
const t0 = Date.now();
await rm(OUT, { recursive: true, force: true });
await rm('.cache', { recursive: true, force: true });

const define = { __BASE__: JSON.stringify(BASE), 'process.env.NODE_ENV': '"production"' };

// 1. Client bundle
const client = await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  minify: true,
  format: 'esm',
  splitting: true,
  chunkNames: 'chunks/[name]-[hash]',
  target: ['es2020', 'safari15', 'firefox100', 'chrome100'],
  outdir: `${OUT}/assets`,
  entryNames: '[name]-[hash]',
  assetNames: '[name]-[hash]',
  jsx: 'automatic',
  define,
  metafile: true,
  legalComments: 'none',
  charset: 'utf8',
  logLevel: 'warning',
  logOverride: { 'package.json': 'silent' },
});
const outputs = Object.keys(client.metafile.outputs);
const mainOut = outputs.find((f) => client.metafile.outputs[f].entryPoint === 'src/main.tsx');
const js = mainOut.replace(`${OUT}`, BASE);
const css = client.metafile.outputs[mainOut].cssBundle.replace(`${OUT}`, BASE);

// 2. Server bundle used only at build time for pre-rendering
await build({
  entryPoints: ['src/entry-server.tsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: '.cache/server.mjs',
  jsx: 'automatic',
  define,
  loader: { '.css': 'empty' },
  logLevel: 'warning',
  logOverride: { 'package.json': 'silent' },
  banner: { js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);" },
});
const server = await import(pathToFileURL(join(process.cwd(), '.cache/server.mjs')).href + `?t=${Date.now()}`);
await server.prepare();

// Chunks each page needs, so the HTML can modulepreload them in parallel with main.js.
const chunkFor = {};
for (const [file, info] of Object.entries(client.metafile.outputs)) if (info.entryPoint && file.endsWith('.js')) chunkFor[info.entryPoint] = file;
const preloadsFor = (name) => {
  const seen = new Set();
  const walk = (file) => {
    if (!file || seen.has(file)) return;
    seen.add(file);
    for (const imp of client.metafile.outputs[file].imports) if (imp.kind === 'import-statement') walk(imp.path);
  };
  walk(chunkFor[server.pageSources[name]]);
  walk(mainOut);
  seen.delete(mainOut);
  return [...seen].map((f) => f.replace(OUT, BASE));
};

// 3. Pre-render
const paths = server.allPaths();
const heroFor = (path) => (path === '/' ? { srcset: server.photoSrcSet('hero-silhouette') } : null);

for (const path of paths) {
  const match = server.matchRoute(path);
  const meta = server.metaFor(match);
  const html = page({ path, meta, image: server.ogImage(meta), body: server.render(path), js, css, heroImage: heroFor(path), preloads: preloadsFor(match.name) });
  const file = join(OUT, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// 404 page: GitHub Pages serves it for unknown URLs; the client router renders «not found».
{
  const meta = server.metaFor({ name: 'notFound', params: {} });
  await writeFile(join(OUT, '404.html'), page({ path: '/404/', meta, image: server.ogImage(meta), body: server.render('/404/'), js, css, preloads: preloadsFor('notFound') }));
}

// 4. Static files, sitemap, robots
await cp('public', OUT, { recursive: true });
const today = new Date().toISOString().slice(0, 10);
const indexable = paths.filter((p) => !server.metaFor(server.matchRoute(p)).noindex);
await writeFile(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : p.split('/').length > 3 ? '0.6' : '0.8'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
);
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
await writeFile(join(OUT, '.nojekyll'), '');

const size = async (f) => (await readFile(join(OUT, f.replace(BASE, '')))).length;
console.log(`Built ${paths.length} pages + 404 in ${Date.now() - t0} ms. JS ${(await size(js)) / 1024 | 0} KB, CSS ${(await size(css)) / 1024 | 0} KB.`);
