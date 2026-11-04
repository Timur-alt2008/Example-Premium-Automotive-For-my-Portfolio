/** Date helpers that work with local ISO dates (yyyy-mm-dd) to avoid timezone drift. */

export const pad = (n: number) => String(n).padStart(2, '0');

export function toISO(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromISO(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(iso: string, amount: number): string {
  const d = fromISO(iso);
  d.setDate(d.getDate() + amount);
  return toISO(d);
}

export function todayISO(): string {
  return toISO(new Date());
}

/** Whole days between two ISO dates (end − start). */
export function diffDays(startIso: string, endIso: string): number {
  const ms = fromISO(endIso).getTime() - fromISO(startIso).getTime();
  return Math.round(ms / 86_400_000);
}

export function isValidISO(iso: string | null | undefined): iso is string {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
  const d = fromISO(iso);
  return toISO(d) === iso;
}

export const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

/** Calendar grid for a month, Monday-first, padded with nulls. */
export function monthGrid(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7;
  const total = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = Array.from({ length: offset }, () => null);
  for (let day = 1; day <= total; day++) cells.push(toISO(new Date(year, month, day)));
  while (cells.length % 7) cells.push(null);
  return cells;
}
