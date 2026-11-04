/*
 * Formatting is implemented by hand instead of Intl so that server-rendered HTML and the
 * browser produce byte-identical strings (ICU versions differ in spaces and abbreviations).
 */

const NBSP = '\u00a0';

export function formatNumber(value: number): string {
  const sign = value < 0 ? '-' : '';
  const digits = String(Math.round(Math.abs(value)));
  return sign + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatPrice = (value: number): string => `${value < 0 ? '-' : ''}€${formatNumber(Math.abs(value))}`;

export const formatDecimal = (value: number): string => value.toFixed(1);

/** English plural. The tuple keeps the [one, few, many] shape; only one/other are used. */
export function plural(n: number, forms: [string, string, string]): string {
  return n === 1 ? forms[0] : forms[2];
}

export const days = (n: number) => `${n}${NBSP}${plural(n, ['day', 'days', 'days'])}`;
export const seats = (n: number) => `${n}${NBSP}${plural(n, ['seat', 'seats', 'seats'])}`;

const MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Accepts an ISO date (yyyy-mm-dd). “14 September 2026” or “Mon, 14 September”. */
export function formatDate(iso: string, style: 'long' | 'short' = 'long'): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (style === 'long') return `${d}${NBSP}${MONTHS_LONG[m - 1]} ${y}`;
  const weekday = WEEKDAYS_SHORT[new Date(y, m - 1, d).getDay()];
  return `${weekday}, ${d}${NBSP}${MONTHS_LONG[m - 1]}`;
}
