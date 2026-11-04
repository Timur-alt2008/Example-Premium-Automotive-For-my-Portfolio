import type { Car } from '../data/cars';
import { discountRules, rentalExtras, type RentalExtra } from '../data/content';
import { diffDays } from './dates';

export interface RentalQuote {
  days: number;
  base: number;
  extras: { extra: RentalExtra; total: number }[];
  extrasTotal: number;
  discountRate: number;
  discountLabel: string | null;
  discount: number;
  promoDiscount: number;
  total: number;
  deposit: number;
}

/** Demonstration promo code, mentioned in the booking form hint. */
export const PROMO_CODE = 'EXAMPLE5';
export const PROMO_RATE = 0.05;

export function rentalDays(start: string, end: string): number {
  return Math.max(0, diffDays(start, end));
}

export function quoteRental(car: Car, start: string, end: string, extraIds: string[], promo = ''): RentalQuote {
  const daysCount = rentalDays(start, end);
  const base = car.pricePerDay * daysCount;
  const rule = discountRules.find((r) => daysCount >= r.minDays) ?? null;
  const discountRate = rule?.rate ?? 0;
  const discount = Math.round(base * discountRate);
  const extras = rentalExtras
    .filter((e) => extraIds.includes(e.id))
    .map((extra) => ({ extra, total: extra.per === 'day' ? extra.price * daysCount : extra.price }));
  const extrasTotal = extras.reduce((sum, e) => sum + e.total, 0);
  const subtotal = base - discount + extrasTotal;
  const promoDiscount = promo.trim().toUpperCase() === PROMO_CODE ? Math.round(subtotal * PROMO_RATE) : 0;
  return {
    days: daysCount,
    base,
    extras,
    extrasTotal,
    discountRate,
    discountLabel: rule?.label ?? null,
    discount,
    promoDiscount,
    total: subtotal - promoDiscount,
    deposit: car.deposit,
  };
}
