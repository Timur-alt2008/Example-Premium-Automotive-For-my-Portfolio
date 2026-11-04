import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const BASE = '/Example-Premium-Automotive-For-my-Portfolio';

export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}${BASE}/`,
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'node scripts/preview.mjs', url: `http://localhost:${PORT}${BASE}/`, reuseExistingServer: true },
});
