import { expect, isMobile, open, test } from './fixtures';

test('gallery: filter, open, switch with keys and buttons, close with Escape', async ({ page, errors }) => {
  void errors;
  await open(page, '/gallery/');
  const grid = page.getByTestId('gallery-grid');
  await expect(grid.locator('.masonry__item')).toHaveCount(24);
  await page.getByRole('radiogroup', { name: 'Category' }).getByRole('radio', { name: /Interior/ }).click();
  await expect(grid.locator('.masonry__item')).toHaveCount(4);
  await grid.locator('.masonry__item').first().click();
  const dialog = page.getByRole('dialog', { name: 'Example gallery' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('.lightbox__count')).toHaveText('1 / 4');
  await page.keyboard.press('ArrowRight');
  await expect(dialog.locator('.lightbox__count')).toHaveText('2 / 4');
  await dialog.getByRole('button', { name: 'Previous photo' }).click();
  await expect(dialog.locator('.lightbox__count')).toHaveText('1 / 4');
  await dialog.getByRole('button', { name: 'Previous photo' }).click();
  await expect(dialog.locator('.lightbox__count')).toHaveText('4 / 4');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('gallery: swipe switches photos on touch screens', async ({ page, errors }) => {
  void errors;
  test.skip(!isMobile(page), 'touch only');
  await open(page, '/gallery/');
  await page.getByTestId('gallery-grid').locator('.masonry__item').nth(1).click();
  const stage = page.getByTestId('lightbox-stage');
  const box = (await stage.boundingBox())!;
  const y = box.y + box.height / 2;
  await stage.dispatchEvent('pointerdown', { clientX: box.x + box.width * 0.8, clientY: y, pointerType: 'touch' });
  await stage.dispatchEvent('pointerup', { clientX: box.x + box.width * 0.2, clientY: y, pointerType: 'touch' });
  await expect(page.locator('.lightbox__count')).toHaveText('3 / 24');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('before/after slider follows the pointer and the keyboard', async ({ page, errors }) => {
  void errors;
  await open(page, '/detailing/');
  const frame = page.getByTestId('before-after').first();
  await frame.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200); // let smooth scrolling settle before reading coordinates
  const box = (await frame.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  const pos = await frame.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--pos')));
  expect(pos).toBeGreaterThan(15);
  expect(pos).toBeLessThan(25);
  const range = frame.getByRole('slider');
  await range.focus();
  await page.keyboard.press('ArrowRight');
  await expect(range).toHaveValue(String(Math.round(pos) + 1));
  // Both layers use the same photo and frame, so they stay aligned at any width.
  const [a, b] = await frame.locator('.ba__layer img').evaluateAll((imgs) => imgs.map((i) => JSON.stringify(i.getBoundingClientRect())));
  expect(a).toBe(b);
});

test('before/after examples switch', async ({ page, errors }) => {
  void errors;
  await open(page, '/');
  const tabs = page.getByRole('tablist', { name: 'Examples of our work' });
  await tabs.getByRole('tab', { name: /Leather interior/ }).click();
  await expect(page.locator('.ba__caption')).toContainText('Leather interior');
});

test('car page gallery opens full screen', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/porsche-911-gt3/');
  await page.getByRole('tab', { name: 'Photo 2' }).click();
  await page.getByRole('button', { name: 'Open photo full screen' }).click();
  await expect(page.locator('.lightbox__count')).toHaveText('2 / 3');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('FAQ: categories, search and smooth disclosure', async ({ page, errors }) => {
  void errors;
  await open(page, '/faq/');
  const trigger = page.getByRole('button', { name: 'Is there a deposit?' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByText(/€10,000 to €25,000/)).toBeVisible();
  await page.getByPlaceholder('For example, deposit').fill('film');
  await expect(page.locator('.faq-group')).toHaveCount(1);
  await page.getByPlaceholder('For example, deposit').fill('nonexistentword');
  await expect(page.getByText(/Nothing found for/)).toBeVisible();
});

test('images have alt text and frames reserve space', async ({ page, errors }) => {
  void errors;
  await open(page, '/');
  const missing = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
  expect(missing).toBe(0);
  const unsized = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length);
  expect(unsized).toBe(0);
});
