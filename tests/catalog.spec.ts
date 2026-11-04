import { expect, isMobile, open, test } from './fixtures';

const count = (page: import('@playwright/test').Page) => page.getByTestId('result-count');
const cards = (page: import('@playwright/test').Page) => page.getByTestId('cars-grid').locator('.car-card');

/** On phones filters live in a bottom sheet. */
async function filters(page: import('@playwright/test').Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: /Фильтры/ }).click();
    return page.getByRole('dialog', { name: 'Фильтры автопарка' });
  }
  return page.locator('.catalog__sidebar');
}

test('catalog shows all 14 cars with key specs and prices', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  await expect(count(page)).toHaveText('14 автомобилей');
  await expect(cards(page)).toHaveCount(14);
  const first = cards(page).first();
  await expect(first).toContainText('л.с.');
  await expect(first).toContainText('0–100 км/ч');
  await expect(first).toContainText('в сутки');
});

test('category tabs filter and are reflected in the URL', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  await page.getByRole('radiogroup', { name: 'Категория' }).getByRole('radio', { name: /Внедорожники/ }).click();
  await expect(page).toHaveURL(/category=suv/);
  await expect(count(page)).toHaveText('2 автомобиля');
  await expect(cards(page).filter({ hasText: 'Urus' })).toHaveCount(1);
  await expect(cards(page).filter({ hasText: 'Cullinan' })).toHaveCount(1);
});

test('brand, seats and power filters combine', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  const panel = await filters(page);
  await panel.getByRole('button', { name: 'Porsche', exact: true }).click();
  await expect(count(page)).toHaveText('3 автомобиля');
  await panel.getByRole('button', { name: '4', exact: true }).click();
  await expect(count(page)).toHaveText('2 автомобиля');
  await panel.getByRole('button', { name: 'от 600 л.с.' }).click();
  await expect(count(page)).toHaveText('1 автомобиль');
  if (isMobile(page)) await panel.getByRole('button', { name: /Показать 1/ }).click();
  await expect(cards(page)).toHaveCount(1);
  await expect(cards(page).first()).toContainText('911 Turbo S');
});

test('impossible combination shows the empty state and reset restores everything', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  const panel = await filters(page);
  await panel.getByRole('button', { name: 'Rolls-Royce', exact: true }).click();
  await panel.getByRole('button', { name: '2', exact: true }).click();
  if (isMobile(page)) await page.keyboard.press('Escape');
  await expect(page.getByTestId('empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Сбросить все фильтры' }).click();
  await expect(count(page)).toHaveText('14 автомобилей');
});

test('price range narrows results', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  const panel = await filters(page);
  await panel.getByLabel('до, €').fill('1000');
  await expect(count(page)).toHaveText('4 автомобиля');
  if (isMobile(page)) await page.keyboard.press('Escape');
  const prices = await cards(page).locator('.car-card__price .numeral').allInnerTexts();
  for (const p of prices) expect(Number(p.replace(/\D/g, ''))).toBeLessThanOrEqual(1000);
});

test('sorting by price and by name', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  await page.getByLabel('Сортировка').selectOption('price-asc');
  await expect(page).toHaveURL(/sort=price-asc/);
  const prices = (await cards(page).locator('.car-card__price .numeral').allInnerTexts()).map((p) => Number(p.replace(/\D/g, '')));
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
  await page.getByLabel('Сортировка').selectOption('name');
  await expect(cards(page).first()).toContainText('Audi');
  await page.getByLabel('Сортировка').selectOption('power-desc');
  await expect(cards(page).first()).toContainText('296 GTB');
});

test('card buttons open the car page and the booking form', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/');
  const card = cards(page).filter({ hasText: 'Cullinan' });
  await card.getByRole('link', { name: /Подробнее/ }).click();
  await expect(page).toHaveURL(/\/cars\/rolls-royce-cullinan\/$/);
  await expect(page.locator('h1')).toContainText('Cullinan');
  await expect(page.locator('.spec-sheet')).toContainText('6.75 V12');
  await expect(page.locator('.similar .car-card')).toHaveCount(3);
  await page.goBack();
  await cards(page).filter({ hasText: 'Cullinan' }).getByRole('link', { name: /Забронировать/ }).click();
  await expect(page).toHaveURL(/booking\/\?car=rolls-royce-cullinan/);
  await expect(page.getByLabel('Модель')).toHaveValue('rolls-royce-cullinan');
});
