// Development: rebuilds the full static site on every change and serves it like GitHub Pages.
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { BASE } from './config.mjs';
import { serve } from './serve.mjs';

const port = Number(process.env.PORT ?? 5173);
let running = null;
let queued = false;

function rebuild() {
  if (running) return void (queued = true);
  running = spawn(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
  running.on('exit', () => {
    running = null;
    if (queued) {
      queued = false;
      rebuild();
    }
  });
}

rebuild();
watch('src', { recursive: true }, () => rebuild());
watch('public', { recursive: true }, () => rebuild());
await serve('dist', port);
console.log(`Dev server: http://localhost:${port}${BASE}/ (rebuilds on change, reload the page)`);
