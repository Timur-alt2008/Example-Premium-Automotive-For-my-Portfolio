import { test as base, expect, type Page } from '@playwright/test';

/** 1×1 dark PNG used instead of CDN photos so tests are fast and work offline. */
const PIXEL = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64');

export const test = base.extend<{ errors: string[] }>({
  errors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && !/Failed to load resource|ERR_/.test(m.text()) && errors.push(m.text()));
    await page.route(/images\.unsplash\.com/, (route) => route.fulfill({ body: PIXEL, contentType: 'image/png' }));
    await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.fulfill({ body: '', contentType: 'text/css' }));
    await use(errors);
    expect(errors, 'console must stay clean').toEqual([]);
  },
});

export { expect };

export async function open(page: Page, path: string) {
  await page.goto(path.replace(/^\//, ''));
  await page.waitForFunction(() => document.documentElement.classList.contains('is-loaded'));
}

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1100;
