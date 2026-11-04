import type { ComponentType } from 'react';
import type { RouteName } from '../router/routes';

type PageComponent = ComponentType<{ slug: string }>;
type Loader = () => Promise<PageComponent>;

/** Each page is its own chunk; the current page is loaded before hydration. */
const loaders: Record<RouteName, Loader> = {
  home: () => import('./Home').then((m) => m.default),
  detailing: () => import('./Detailing').then((m) => m.default),
  service: () => import('./ServicePage').then((m) => m.default),
  catalog: () => import('./Catalog').then((m) => m.default),
  car: () => import('./CarPage').then((m) => m.default),
  booking: () => import('./Booking').then((m) => m.default),
  success: () => import('./Result').then((m) => m.Success),
  error: () => import('./Result').then((m) => m.ErrorPage),
  gallery: () => import('./Gallery').then((m) => m.default),
  about: () => import('./About').then((m) => m.default),
  contacts: () => import('./Contacts').then((m) => m.default),
  faq: () => import('./Faq').then((m) => m.default),
  privacy: () => import('./Legal').then((m) => m.Privacy),
  terms: () => import('./Legal').then((m) => m.Terms),
  notFound: () => import('./NotFound').then((m) => m.default),
};

const cache = new Map<RouteName, PageComponent>();

export function loadPage(name: RouteName): Promise<PageComponent> {
  const ready = cache.get(name);
  if (ready) return Promise.resolve(ready);
  return loaders[name]().then((component) => {
    cache.set(name, component);
    return component;
  });
}

export function loadedPage(name: RouteName): PageComponent | undefined {
  return cache.get(name);
}

export function loadAllPages(): Promise<unknown> {
  return Promise.all((Object.keys(loaders) as RouteName[]).map(loadPage));
}

/** Source file of each page, used by the build to add <link rel="modulepreload">. */
export const pageSources: Record<RouteName, string> = {
  home: 'src/pages/Home.tsx',
  detailing: 'src/pages/Detailing.tsx',
  service: 'src/pages/ServicePage.tsx',
  catalog: 'src/pages/Catalog.tsx',
  car: 'src/pages/CarPage.tsx',
  booking: 'src/pages/Booking.tsx',
  success: 'src/pages/Result.tsx',
  error: 'src/pages/Result.tsx',
  gallery: 'src/pages/Gallery.tsx',
  about: 'src/pages/About.tsx',
  contacts: 'src/pages/Contacts.tsx',
  faq: 'src/pages/Faq.tsx',
  privacy: 'src/pages/Legal.tsx',
  terms: 'src/pages/Legal.tsx',
  notFound: 'src/pages/NotFound.tsx',
};
