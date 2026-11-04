/*
 * Formatting is implemented by hand instead of Intl so that server-rendered HTML and the
 * browser produce byte-identical strings (ICU versions differ in spaces and abbreviations).
 */

const NBSP = ' ';

export function formatNumber(value: number): string {
  const sign = value < 0 ? '-' : '';
  const digits = String(Math.round(Math.abs(value)));
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export const formatPrice = (value: number): string => `${formatNumber(value)}${NBSP}€`;

export const formatDecimal = (value: number): string => value.toFixed(1).replace('.', ',');

/** Russian plural: plural(5, ['день', 'дня', 'дней']) → «дней» */
export function plural(n: number, forms: [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return forms[1];
  return forms[2];
}

export const days = (n: number) => `${n}${NBSP}${plural(n, ['день', 'дня', 'дней'])}`;
export const seats = (n: number) => `${n}${NBSP}${plural(n, ['место', 'места', 'мест'])}`;

const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WEEKDAYS_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

/** Accepts an ISO date (yyyy-mm-dd). «14 сентября 2026» or «пн, 14 сентября». */
export function formatDate(iso: string, style: 'long' | 'short' = 'long'): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (style === 'long') return `${d}${NBSP}${MONTHS_GENITIVE[m - 1]} ${y}`;
  const weekday = WEEKDAYS_SHORT[new Date(y, m - 1, d).getDay()];
  return `${weekday}, ${d}${NBSP}${MONTHS_GENITIVE[m - 1]}`;
}
