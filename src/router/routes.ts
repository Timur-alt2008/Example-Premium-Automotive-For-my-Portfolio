import { cars, carName, carBySlug } from '../data/cars';
import { photoUrl, type PhotoKey } from '../data/media';
import { services, serviceBySlug } from '../data/services';

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
      return { title: `${SUFFIX} — детейлинг-студия и аренда суперкаров`, description: 'Премиальный детейлинг: полировка, керамика, PPF и химчистка. Коллекция из 14 суперкаров и люксовых автомобилей для аренды с доставкой.', image: 'hero-silhouette' };
    case 'detailing':
      return { title: `Детейлинг: полировка, керамика, PPF — ${SUFFIX}`, description: 'Семнадцать услуг для кузова и салона, три пакета обслуживания и проверка каждой панели под тремя видами света.', image: 'det-polish' };
    case 'service': {
      const s = serviceBySlug(match.params.slug)!;
      return { title: `${s.name} — детейлинг ${SUFFIX}`, description: `${s.summary} ${s.duration}, от ${s.priceFrom} €. ${s.result}`, image: s.photo };
    }
    case 'catalog':
      return { title: `Аренда суперкаров и люксовых автомобилей — ${SUFFIX}`, description: 'Lamborghini, Ferrari, McLaren, Porsche, Rolls-Royce, Bentley и другие. Фильтры по марке, мощности, цене и количеству мест.', image: 'mclaren-a' };
    case 'car': {
      const c = carBySlug(match.params.slug)!;
      return { title: `${carName(c)} ${c.year} в аренду — ${SUFFIX}`, description: `${c.tagline}. ${c.powerHp} л.с., 0–100 км/ч за ${String(c.accel).replace('.', ',')} с. От ${c.pricePerDay} € в сутки.`, image: c.photos[0] };
    }
    case 'booking':
      return { title: `Бронирование автомобиля и запись на детейлинг — ${SUFFIX}`, description: 'Выберите автомобиль и даты или услугу детейлинга — стоимость рассчитывается сразу.', image: 'tunnel' };
    case 'success':
      return { title: `Заявка отправлена — ${SUFFIX}`, description: 'Ваша заявка принята.', image: 'tunnel', noindex: true };
    case 'error':
      return { title: `Заявка не отправлена — ${SUFFIX}`, description: 'Не удалось отправить заявку.', image: 'tunnel', noindex: true };
    case 'gallery':
      return { title: `Галерея работ — ${SUFFIX}`, description: 'Суперкары коллекции, детейлинг, салоны и примеры до и после.', image: 'aventador-smoke' };
    case 'about':
      return { title: `О студии — ${SUFFIX}`, description: 'Как мы работаем с автомобилями: один мастер на машину, свет 6500 K и контроль под тремя видами освещения.', image: 'studio-a' };
    case 'contacts':
      return { title: `Контакты — ${SUFFIX}`, description: 'Адрес студии, телефоны, часы работы и форма обратной связи.', image: 'studio-b' };
    case 'faq':
      return { title: `Вопросы и ответы — ${SUFFIX}`, description: 'Документы для аренды, залог, сроки полировки, керамика, PPF и изменение заявки.', image: 'det-beading' };
    case 'privacy':
      return { title: `Политика конфиденциальности — ${SUFFIX}`, description: 'Какие данные собирает сайт и где они хранятся.', image: 'studio-b' };
    case 'terms':
      return { title: `Условия аренды — ${SUFFIX}`, description: 'Требования к водителю, залог, лимиты пробега и правила использования автомобилей.', image: 'tunnel' };
    default:
      return { title: `Страница не найдена — ${SUFFIX}`, description: 'Такой страницы нет.', image: 'corridor', noindex: true };
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
