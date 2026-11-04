import type { BodyType, Car, CarCategory } from '../data/cars';
import { cars } from '../data/cars';

export type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'power-desc' | 'name';

export const sortLabels: Record<SortKey, string> = {
  popular: 'По популярности',
  'price-asc': 'Сначала дешевле',
  'price-desc': 'Сначала дороже',
  'power-desc': 'По мощности',
  name: 'По названию',
};

export interface CatalogFilters {
  category: CarCategory | 'all';
  brands: string[];
  bodies: BodyType[];
  priceMin: number;
  priceMax: number;
  powerMin: number;
  seats: number[];
}

export const PRICE_BOUNDS = [Math.min(...cars.map((c) => c.pricePerDay)), Math.max(...cars.map((c) => c.pricePerDay))] as const;
export const POWER_STEPS = [0, 500, 600, 650, 700];

export const defaultFilters: CatalogFilters = {
  category: 'all',
  brands: [],
  bodies: [],
  priceMin: PRICE_BOUNDS[0],
  priceMax: PRICE_BOUNDS[1],
  powerMin: 0,
  seats: [],
};

export function applyFilters(list: Car[], f: CatalogFilters, sort: SortKey): Car[] {
  const result = list.filter(
    (c) =>
      (f.category === 'all' || c.categories.includes(f.category)) &&
      (!f.brands.length || f.brands.includes(c.brand)) &&
      (!f.bodies.length || f.bodies.includes(c.body)) &&
      c.pricePerDay >= f.priceMin &&
      c.pricePerDay <= f.priceMax &&
      c.powerHp >= f.powerMin &&
      (!f.seats.length || f.seats.includes(c.seats)),
  );
  const sorters: Record<SortKey, (a: Car, b: Car) => number> = {
    popular: (a, b) => b.popularity - a.popularity,
    'price-asc': (a, b) => a.pricePerDay - b.pricePerDay,
    'price-desc': (a, b) => b.pricePerDay - a.pricePerDay,
    'power-desc': (a, b) => b.powerHp - a.powerHp,
    name: (a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`, 'ru'),
  };
  return [...result].sort(sorters[sort]);
}

/** Number of filters that differ from the defaults (category excluded — it has its own tabs). */
export function activeFilterCount(f: CatalogFilters): number {
  return (
    (f.brands.length ? 1 : 0) +
    (f.bodies.length ? 1 : 0) +
    (f.priceMin !== defaultFilters.priceMin || f.priceMax !== defaultFilters.priceMax ? 1 : 0) +
    (f.powerMin ? 1 : 0) +
    (f.seats.length ? 1 : 0)
  );
}
