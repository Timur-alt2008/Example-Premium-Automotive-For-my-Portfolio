import type { Page } from '@playwright/test';
import { expect, open, test } from './fixtures';

/** Clicks the n-th available day (1-based) in the calendar. */
async function pickDay(page: Page, scope: string, n: number) {
  await page.locator(`${scope} .calendar__day:not(:disabled)`).nth(n - 1).click();
}

async function fillContacts(page: Page, form: string) {
  const f = page.getByTestId(form);
  await f.getByLabel('Имя').fill('Анна Тестова');
  await f.getByLabel('Телефон').fill('+1 555 010 1234');
  await f.getByLabel('Электронная почта').fill('anna@example.com');
  await f.locator('.consent input').check({ force: true });
}

test('rental: validation blocks an empty form and points to the errors', async ({ page, errors }) => {
  void errors;
  await open(page, '/booking/');
  const form = page.getByTestId('rental-form');
  await form.getByRole('button', { name: /Отправить заявку/ }).click();
  const errorsShown = form.locator('.field__error');
  for (const text of ['Выберите автомобиль', 'Выберите дату получения', 'Выберите время получения', 'Укажите имя', 'Укажите телефон', 'Нужно согласие']) {
    await expect(errorsShown.filter({ hasText: text })).toBeVisible();
  }
  await expect(form.getByLabel('Модель')).toBeFocused();
  await expect(page).toHaveURL(/\/booking\/$/);
});

test('rental: phone and e-mail are validated', async ({ page, errors }) => {
  void errors;
  await open(page, '/booking/');
  const form = page.getByTestId('rental-form');
  await form.getByLabel('Телефон').fill('12ab');
  await form.getByLabel('Электронная почта').fill('anna@');
  await form.getByLabel('Электронная почта').blur();
  await expect(form.locator('.field__error').filter({ hasText: /Телефон может содержать/ })).toBeVisible();
  await expect(form.locator('.field__error').filter({ hasText: /Проверьте адрес/ })).toBeVisible();
});

test('rental: return date cannot be before pickup — the range restarts', async ({ page, errors }) => {
  void errors;
  await open(page, '/booking/?car=porsche-911-gt3');
  await pickDay(page, '[data-testid="rental-form"]', 10);
  await expect(page.getByText('Теперь выберите дату возврата')).toBeVisible();
  await pickDay(page, '[data-testid="rental-form"]', 5);
  // Clicking an earlier day makes it the new pickup date instead of an invalid return date.
  await expect(page.getByText('Теперь выберите дату возврата')).toBeVisible();
  await expect(page.locator('.calendar__day.is-end')).toHaveCount(0);
});

test('rental: price is calculated with discount and extras, then the demo request is sent', async ({ page, errors }) => {
  void errors;
  await open(page, '/booking/?car=porsche-911-gt3');
  const form = page.getByTestId('rental-form');
  await expect(form.getByLabel('Модель')).toHaveValue('porsche-911-gt3');
  await pickDay(page, '[data-testid="rental-form"]', 3);
  await pickDay(page, '[data-testid="rental-form"]', 6); // 3 days → 10% discount
  const summary = page.getByTestId('rental-summary');
  await expect(summary).toContainText('3 дня');
  await expect(summary).toContainText('Скидка 10%');
  // 1090 × 3 = 3270, −327 = 2943
  await expect(page.getByTestId('rental-total')).toHaveText(/2\s943\s€/);
  await form.getByText('Второй водитель').click(); // +90 × 3
  await expect(page.getByTestId('rental-total')).toHaveText(/3\s213\s€/);
  await form.getByRole('radio', { name: '12:00' }).click();
  await fillContacts(page, 'rental-form');
  await form.getByRole('button', { name: /Отправить заявку/ }).click();
  await expect(form.getByRole('button', { name: /Отправляем/ })).toBeDisabled();
  await expect(page).toHaveURL(/booking\/success\/\?n=EX-R-\d{6}/);
  await expect(page.getByTestId('request-number')).toContainText(/EX-R-\d{6}/);
  await expect(page.getByText('Porsche 911 GT3, 2022')).toBeVisible();
  await expect(page.getByText(/демонстрационная заявка/)).toBeVisible();
});

test('rental: offline submit shows a recoverable error and keeps the data', async ({ page, context, errors }) => {
  void errors;
  await open(page, '/booking/?car=audi-r8-v10-performance');
  const form = page.getByTestId('rental-form');
  await pickDay(page, '[data-testid="rental-form"]', 2);
  await pickDay(page, '[data-testid="rental-form"]', 3);
  await form.getByRole('radio', { name: '10:00' }).click();
  await fillContacts(page, 'rental-form');
  await context.setOffline(true);
  await form.getByRole('button', { name: /Отправить заявку/ }).click();
  await expect(form.getByRole('alert').filter({ hasText: 'Нет подключения' })).toBeVisible();
  await expect(form.getByLabel('Имя')).toHaveValue('Анна Тестова');
  await context.setOffline(false);
  await form.getByRole('button', { name: 'Отправить ещё раз' }).click();
  await expect(page).toHaveURL(/booking\/success/);
});

test('car page: booking form is built in and calculates the price', async ({ page, errors }) => {
  void errors;
  await open(page, '/cars/mclaren-720s/');
  await page.locator('.car-hero').getByRole('link', { name: /Забронировать/ }).click();
  await page.waitForTimeout(1500); // smooth scroll to the form
  await pickDay(page, '#booking', 1);
  await pickDay(page, '#booking', 8); // 7 days → 15%
  await expect(page.getByTestId('rental-summary')).toContainText('Скидка 15%');
  // 1700 × 7 = 11 900, −1785 = 10 115
  await expect(page.getByTestId('rental-total')).toHaveText(/10\s115\s€/);
});

test('detailing: choose service and package, fill the form, get a request number', async ({ page, errors }) => {
  void errors;
  await open(page, '/booking/?type=detailing');
  const form = page.getByTestId('detailing-form');
  await form.getByRole('button', { name: /Записаться/ }).click();
  await expect(form.locator('.field__error').filter({ hasText: 'Выберите услугу или пакет обслуживания' })).toBeVisible();
  await form.getByLabel('Услуга').selectOption('ceramic-coating');
  await form.getByRole('radio', { name: /Premium Care/ }).click();
  await form.getByRole('radio', { name: 'Внедорожник' }).click();
  await expect(page.getByTestId('detailing-total')).toHaveText(/2\s620\s€/); // 1200 + 1420
  await form.getByLabel('Марка').fill('Porsche');
  await form.getByLabel('Модель').fill('Cayenne');
  await pickDay(page, '[data-testid="detailing-form"]', 4);
  await form.getByRole('radio', { name: '11:00' }).click();
  await fillContacts(page, 'detailing-form');
  await form.getByRole('button', { name: /Записаться/ }).click();
  await expect(page).toHaveURL(/booking\/success\/\?n=EX-D-\d{6}/);
  await expect(page.getByText('Керамическое покрытие + Premium Care').first()).toBeVisible();
});

test('detailing: service card leads to a preselected form', async ({ page, errors }) => {
  void errors;
  await open(page, '/detailing/');
  await page.getByRole('link', { name: 'Записаться: Защитная PPF-плёнка' }).click();
  await expect(page).toHaveURL(/service=ppf/);
  await expect(page.getByTestId('detailing-form').getByLabel('Услуга')).toHaveValue('ppf');
});

test('detailing: package prices switch with the vehicle type', async ({ page, errors }) => {
  void errors;
  await open(page, '/detailing/');
  const packages = page.locator('#packages');
  await expect(packages.getByTestId('price-ultimate')).toHaveText(/4\s900\s€/);
  await packages.getByRole('radiogroup', { name: 'Тип автомобиля' }).getByRole('radio', { name: 'Внедорожник' }).click();
  await expect(packages.getByTestId('price-ultimate')).toHaveText(/5\s800\s€/);
});

test('contacts: feedback form validates and confirms', async ({ page, errors }) => {
  void errors;
  await open(page, '/contacts/');
  const form = page.getByTestId('contact-form');
  await form.getByRole('button', { name: /Отправить сообщение/ }).click();
  await expect(form.locator('.field__error').filter({ hasText: 'Выберите тему обращения' })).toBeVisible();
  await form.getByLabel('Имя').fill('Олег');
  await form.getByLabel('Электронная почта').fill('oleg@example.com');
  await form.getByLabel('Тема').selectOption('detailing');
  await form.getByLabel('Сообщение').fill('Сколько стоит керамика для Cayenne?');
  await form.locator('.consent input').check({ force: true });
  await form.getByRole('button', { name: /Отправить сообщение/ }).click();
  await expect(page.getByTestId('contact-done')).toContainText(/EX-C-\d{6}/);
});
