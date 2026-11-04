import { cars, carName, carBySlug } from '../data/cars';
import { photoUrl, type PhotoKey } from '../data/media';
import { services, serviceBySlug } from '../data/services';
import { formatNumber } from '../lib/format';

export type RouteName =
  | 'home'
  | 'detailing'
  | 'service'
  | 'catalog'
  | 'car'
  | 'booking'
  | 'success'
  | 'error'
  | 'gallery'
  | 'about'
  | 'contacts'
  | 'faq'
  | 'privacy'
  | 'terms'
  | 'notFound';

export interface Match {
  name: RouteName;
  params: Record<string, string>;
}

const staticRoutes: Record<string, RouteName> = {
  '/': 'home',
  '/detailing/': 'detailing',
  '/cars/': 'catalog',
  '/booking/': 'booking',
  '/booking/success/': 'success',
  '/booking/error/': 'error',
  '/gallery/': 'gallery',
  '/about/': 'about',
  '/contacts/': 'contacts',
  '/faq/': 'faq',
  '/privacy/': 'privacy',
  '/terms/': 'terms',
};

export function matchRoute(path: string): Match {
  const name = staticRoutes[path];
  if (name) return { name, params: {} };
  const service = path.match(/^\/detailing\/([a-z0-9-]+)\/$/);
  if (service && serviceBySlug(service[1])) return { name: 'service', params: { slug: service[1] } };
  const car = path.match(/^\/cars\/([a-z0-9-]+)\/$/);
  if (car && carBySlug(car[1])) return { name: 'car', params: { slug: car[1] } };
  return { name: 'notFound', params: {} };
}

export interface PageMeta {
  title: string;
  description: string;
  image: PhotoKey;
  noindex?: boolean;
}

const SUFFIX = 'Example';

export function metaFor(match: Match): PageMeta {
  switch (match.name) {
    case 'home':
      return { title: `${SUFFIX} — a detailing studio and supercar rental`, description: 'Premium detailing: polishing, ceramic coatings, PPF and interior cleaning. A collection of 14 supercars and luxury cars for rent with delivery.', image: 'hero-silhouette' };
    case 'detailing':
      return { title: `Detailing: polishing, ceramic coatings, PPF — ${SUFFIX}`, description: 'Seventeen services for paintwork and interior, three care packages and every panel checked under three kinds of light.', image: 'det-polish' };
    case 'service': {
      const s = serviceBySlug(match.params.slug)!;
      return { title: `${s.name} — detailing ${SUFFIX}`, description: `${s.summary} ${s.duration}, from €${formatNumber(s.priceFrom)}. ${s.result}`, image: s.photo };
    }
    case 'catalog':
      return { title: `Supercar and luxury car rental — ${SUFFIX}`, description: 'Lamborghini, Ferrari, McLaren, Porsche, Rolls-Royce, Bentley and more. Filter by brand, power, price and number of seats.', image: 'mclaren-a' };
    case 'car': {
      const c = carBySlug(match.params.slug)!;
      return { title: `${carName(c)} ${c.year} for rent — ${SUFFIX}`, description: `${c.tagline}. ${c.powerHp} hp, 0–100 km/h in ${c.accel.toFixed(1)} s. From €${formatNumber(c.pricePerDay)} per day.`, image: c.photos[0] };
    }
    case 'booking':
      return { title: `Car rental and detailing appointments — ${SUFFIX}`, description: 'Choose a car and dates, or a detailing service — the price is calculated instantly.', image: 'tunnel' };
    case 'success':
      return { title: `Request sent — ${SUFFIX}`, description: 'Your request has been received.', image: 'tunnel', noindex: true };
    case 'error':
      return { title: `Request not sent — ${SUFFIX}`, description: 'The request could not be sent.', image: 'tunnel', noindex: true };
    case 'gallery':
      return { title: `Gallery of work — ${SUFFIX}`, description: 'The collection’s supercars, detailing, interiors and before-and-after examples.', image: 'aventador-smoke' };
    case 'about':
      return { title: `About the studio — ${SUFFIX}`, description: 'How we work with cars: one specialist per car, 6500 K light and inspection under three kinds of light.', image: 'studio-a' };
    case 'contacts':
      return { title: `Contacts — ${SUFFIX}`, description: 'Studio address, phone numbers, opening hours and a contact form.', image: 'studio-b' };
    case 'faq':
      return { title: `Questions and answers — ${SUFFIX}`, description: 'Rental documents, deposit, polishing times, ceramic coatings, PPF and changing a request.', image: 'det-beading' };
    case 'privacy':
      return { title: `Privacy policy — ${SUFFIX}`, description: 'What data the site collects and where it is stored.', image: 'studio-b' };
    case 'terms':
      return { title: `Rental terms — ${SUFFIX}`, description: 'Driver requirements, deposit, mileage limits and rules for using the cars.', image: 'tunnel' };
    default:
      return { title: `Page not found — ${SUFFIX}`, description: 'This page does not exist.', image: 'corridor', noindex: true };
  }
}

export function ogImage(meta: PageMeta): string {
  return photoUrl(meta.image, { width: 1200, ratio: 1200 / 630 });
}

/** All paths that get a static HTML file at build time. */
export function allPaths(): string[] {
  return [
    ...Object.keys(staticRoutes),
    ...services.map((s) => `/detailing/${s.slug}/`),
    ...cars.map((c) => `/cars/${c.slug}/`),
  ];
}
