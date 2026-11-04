import { BASE } from './config.mjs';
import { serve } from './serve.mjs';

const port = Number(process.env.PORT ?? 4173);
await serve('dist', port);
console.log(`Preview: http://localhost:${port}${BASE}/`);
