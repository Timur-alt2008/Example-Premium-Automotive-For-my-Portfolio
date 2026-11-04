import { expect, isMobile, open, test } from './fixtures';

const pages = [
  ['/', 'Flawless'],
  ['/detailing/', 'Detailing'],
  ['/detailing/ceramic-coating/', 'Ceramic coating'],
  ['/cars/', 'Fleet'],
  ['/cars/porsche-911-gt3/', '911 GT3'],
  ['/booking/', 'a car'],
  ['/gallery/', 'Gallery'],
  ['/about/', 'workshop'],
  ['/contacts/', 'Contacts'],
  ['/faq/', 'Questions'],
  ['/privacy/', 'Privacy'],
  ['/terms/', 'Rental'],
] as const;

for (const [path, heading] of pages) {
  test(`page ${path} loads with its own title and heading`, async ({ page, errors }) => {
    void errors;
    await open(page, path);
    await expect(page.locator('h1')).toContainText(heading);
    await expect(page).toHaveTitle(/Example/);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, 'no horizontal scroll').toBeLessThanOrEqual(page.viewportSize()!.width);
  });
}

test('unknown url shows the 404 page', async ({ page, errors }) => {
  void errors;
  const res = await page.goto('does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('Empty, like a bay');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page.locator('h1')).toContainText('Flawless');
});

test('main navigation moves between sections without reloading', async ({ page, errors }) => {
  void errors;
  await open(page, '/');
  await page.evaluate(() => ((window as unknown as { marker: number }).marker = 42));
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.locator('#mobile-menu').getByRole('link', { name: 'Fleet' }).click();
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Fleet' }).click();
  }
  await expect(page).toHaveURL(/\/cars\/$/);
  await expect(page.locator('h1')).toContainText('Fleet');
  expect(await page.evaluate(() => (window as unknown as { marker?: number }).marker)).toBe(42);
  await page.goBack();
  await expect(page.locator('h1')).toContainText('Flawless');
});

test('hero buttons lead to services and to the fleet', async ({ page, errors }) => {
  void errors;
  await open(page, '/');
  await page.locator('.hero').getByRole('link', { name: 'Studio services' }).click();
  await expect(page).toHaveURL(/\/detailing\/$/);
  await page.goBack();
  await page.locator('.hero').getByRole('link', { name: 'Choose a car' }).click();
  await expect(page).toHaveURL(/\/cars\/$/);
});

test('mobile menu opens, closes with Escape and lists all sections', async ({ page, errors }) => {
  void errors;
  test.skip(!isMobile(page), 'mobile only');
  await open(page, '/');
  const menu = page.locator('#mobile-menu');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await expect(menu).toHaveClass(/is-open/);
  for (const label of ['Detailing', 'Fleet', 'Gallery', 'About', 'Questions', 'Contacts']) {
    await expect(menu.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveClass(/is-open/);
});

test('every internal link on key pages points to an existing page', async ({ page, request, errors }) => {
  void errors;
  test.skip(isMobile(page), 'checked once');
  const seen = new Set<string>();
  for (const path of ['/', '/detailing/', '/cars/', '/about/']) {
    await open(page, path);
    const hrefs = await page.$$eval('a[href^="/Example"]', (as) => as.map((a) => (a as HTMLAnchorElement).pathname));
    hrefs.forEach((h) => seen.add(h));
  }
  for (const href of seen) {
    const res = await request.get(new URL(href, page.url()).toString());
    expect(res.status(), href).toBe(200);
  }
});

test('sections revealed on scroll become visible', async ({ page, errors }) => {
  void errors;
  await open(page, '/');
  for (const selector of ['.direction', '.intro__statement', '.process__step']) {
    const el = page.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await expect(el).toHaveClass(/is-in/, { timeout: 4000 });
  }
});
