import type { PhotoKey } from './media';

/* ---------- Reviews (demonstration content) ---------- */

export interface Review {
  author: string;
  context: string;
  text: string;
  rating: number;
  date: string;
  photo: PhotoKey;
}

export const reviews: Review[] = [
  {
    author: 'Андрей К.',
    context: 'Керамика, Porsche 911 GT3',
    text: 'Попросил показать машину до работ под фонарём — увидел паутинку, о которой не знал. Через три дня её не было ни под одним светом. Вода теперь скатывается уже на 60 км/ч.',
    rating: 5,
    date: '2026-09-14',
    photo: 'gt3-a',
  },
  {
    author: 'Марина Л.',
    context: 'Аренда, Rolls-Royce Cullinan',
    text: 'Брали Cullinan на свадьбу сестры. Машину привезли к дому за час до назначенного времени, водитель знал маршрут лучше нас. Салон пах кожей, а не освежителем.',
    rating: 5,
    date: '2026-08-02',
    photo: 'cullinan-a',
  },
  {
    author: 'Олег Р.',
    context: 'PPF, Ferrari F8 Tributo',
    text: 'Оклеили весь перед. Через месяц я честно искал кромки на капоте и не нашёл. Отдельно понравилось, что прислали фото каждого этапа.',
    rating: 5,
    date: '2026-06-21',
    photo: 'f8-a',
  },
  {
    author: 'Виктория С.',
    context: 'Аренда, McLaren 720S',
    text: 'Перед выдачей полчаса объясняли режимы шасси и показали, как работает подъём передней оси. Ни одной лишней бумаги, всё понятно с первого раза.',
    rating: 5,
    date: '2026-05-30',
    photo: 'mclaren-a',
  },
  {
    author: 'Денис М.',
    context: 'Химчистка, Bentley Continental GT',
    text: 'Светлая кожа после двух лет с детьми выглядела уставшей. Вернули исходный цвет без глянца. Срок выдержали точно.',
    rating: 4,
    date: '2026-04-11',
    photo: 'int-tan',
  },
];

/* ---------- FAQ ---------- */

export type FaqCategory = 'rental' | 'detailing' | 'booking';

export const faqCategoryLabels: Record<FaqCategory, string> = {
  rental: 'Аренда автомобилей',
  detailing: 'Детейлинг',
  booking: 'Бронирование',
};

export interface FaqItem {
  category: FaqCategory;
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  { category: 'rental', q: 'Какие документы необходимы?', a: 'Паспорт или ID-карта, водительское удостоверение со стажем от 5 лет и банковская карта для залога на имя водителя. Для некоторых автомобилей минимальный возраст — 27 или 30 лет; он указан на странице машины.' },
  { category: 'rental', q: 'Как рассчитывается стоимость?', a: 'Суточная ставка умножается на количество дней аренды. От 3 дней действует скидка 10%, от 7 дней — 15%. Дополнительные услуги, например доставка или второй водитель, добавляются отдельной строкой. Итог вы видите до отправки заявки.' },
  { category: 'rental', q: 'Предусмотрен ли залог?', a: 'Да. Сумма залога зависит от автомобиля и указана на его странице — от 10 000 до 25 000 €. Залог блокируется на карте и разблокируется в течение 3 рабочих дней после возврата.' },
  { category: 'rental', q: 'Можно ли продлить аренду?', a: 'Да, если автомобиль свободен на следующие даты. Напишите нам за 24 часа до окончания аренды — продление считается по той же ставке и со скидкой за общий срок.' },
  { category: 'rental', q: 'Как происходит получение автомобиля?', a: 'В студии или с доставкой по адресу. Мы показываем автомобиль, фиксируем пробег и состояние на фото, объясняем режимы и органы управления. Обычно это занимает 30–40 минут.' },
  { category: 'rental', q: 'Какие ограничения действуют при аренде?', a: 'Суточный лимит пробега указан на странице машины. Запрещены трек-дни, дрифт, буксировка и передача управления лицу, не указанному в договоре. Выезд за пределы страны согласуется заранее.' },
  { category: 'detailing', q: 'Сколько времени занимает полировка?', a: 'Одношаговое восстановление блеска — один день. Полная многоступенчатая коррекция — два–три дня, в зависимости от размера автомобиля и состояния лака.' },
  { category: 'detailing', q: 'Как долго держится керамическое покрытие?', a: 'От двух до пяти лет в зависимости от выбранного состава и ухода. Мы выдаём сертификат и приглашаем на бесплатный осмотр через полгода.' },
  { category: 'detailing', q: 'Что такое PPF-плёнка?', a: 'Прозрачная полиуретановая плёнка толщиной около 200 мкм. Она принимает на себя сколы и царапины, а мелкие повреждения верхнего слоя затягиваются при нагреве. Служит 7–10 лет.' },
  { category: 'detailing', q: 'Как подготовить автомобиль?', a: 'Ничего специально делать не нужно. Освободите салон и багажник от личных вещей и предупредите нас о известных повреждениях — мы учтём их при осмотре.' },
  { category: 'detailing', q: 'Можно ли записаться заранее?', a: 'Да, запись открыта на 60 дней вперёд. Для PPF и многоступенчатой полировки рекомендуем бронировать за две–три недели.' },
  { category: 'booking', q: 'Как отправить заявку?', a: 'Выберите автомобиль или услугу, даты и время, оставьте контакты и нажмите «Отправить заявку». Менеджер свяжется с вами в течение 30 минут в рабочее время.' },
  { category: 'booking', q: 'Как изменить дату?', a: 'Позвоните или напишите нам, указав номер заявки. Изменение даты бесплатно, если до начала аренды или визита больше 48 часов.' },
  { category: 'booking', q: 'Как отменить заявку?', a: 'Сообщите номер заявки по телефону или почте. Отмена бесплатна за 48 часов и больше; при более поздней отмене удерживается стоимость одних суток аренды.' },
];

/* ---------- Gallery ---------- */

export type GalleryCategory = 'supercars' | 'detailing' | 'interior' | 'exterior' | 'before-after' | 'workshop';

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  supercars: 'Суперкары',
  detailing: 'Детейлинг',
  interior: 'Салон',
  exterior: 'Экстерьер',
  'before-after': 'До и после',
  workshop: 'Мастерская',
};

export interface GalleryItem {
  photo: PhotoKey;
  category: GalleryCategory;
  caption: string;
  /** Shape in the mosaic grid */
  shape?: 'wide' | 'tall' | 'big';
  /** For before/after items: index into beforeAfterCases */
  compare?: number;
}

export const gallery: GalleryItem[] = [
  { photo: 'aventador-smoke', category: 'supercars', caption: 'Съёмка для коллекции, бокс № 3', shape: 'big' },
  { photo: 'det-polish', category: 'detailing', caption: 'Коррекция лака, второй этап', shape: 'tall' },
  { photo: 'int-tan', category: 'interior', caption: 'Кожа после очистки и кондиционирования' },
  { photo: 'amg-gt-monaco', category: 'exterior', caption: 'Матовая плёнка на Mercedes-AMG GT', shape: 'wide' },
  { photo: 'bentley-a', category: 'before-after', caption: 'Bentley Continental GT: полировка', compare: 0 },
  { photo: 'studio-b', category: 'workshop', caption: 'Бокс для керамики со светом 6500 K', shape: 'wide' },
  { photo: 'mclaren-a', category: 'supercars', caption: 'McLaren 720S перед выдачей клиенту', shape: 'tall' },
  { photo: 'det-beading', category: 'detailing', caption: 'Гидрофобный эффект через неделю после керамики' },
  { photo: 'int-red-wheel', category: 'interior', caption: 'Алькантара и кожа после химчистки' },
  { photo: 'huracan-sto', category: 'supercars', caption: 'Lamborghini Huracán STO', shape: 'wide' },
  { photo: 'det-film-orange', category: 'detailing', caption: 'Оклейка переднего крыла PPF', shape: 'tall' },
  { photo: 'int-tan', category: 'before-after', caption: 'Салон: очистка кожи', compare: 1 },
  { photo: 'workshop-colors', category: 'workshop', caption: 'Посты подготовки' },
  { photo: 'gt3-c', category: 'exterior', caption: 'Porsche 911 GT3 после керамики', shape: 'wide' },
  { photo: 'det-wheel', category: 'detailing', caption: 'Очистка дисков со снятием колёс' },
  { photo: 'cullinan-a', category: 'exterior', caption: 'Rolls-Royce Cullinan, подготовка к выдаче', shape: 'tall' },
  { photo: 'wheel-light', category: 'before-after', caption: 'Колёсный диск: удаление тормозной пыли', compare: 2 },
  { photo: 'int-white', category: 'interior', caption: 'Светлая кожа и потолок', shape: 'wide' },
  { photo: 'studio-a', category: 'workshop', caption: 'Зона выдачи автомобилей', shape: 'big' },
  { photo: 'f8-b', category: 'supercars', caption: 'Ferrari F8 Tributo' },
  { photo: 'det-film-tape', category: 'detailing', caption: 'Раскрой плёнки по контуру' },
  { photo: 'int-portofino', category: 'interior', caption: 'Панель приборов после ухода за пластиком' },
  { photo: 'urus-green-garage', category: 'supercars', caption: 'Lamborghini Urus на парковке студии', shape: 'wide' },
  { photo: 'det-wax-a', category: 'workshop', caption: 'Нанесение керамики в отдельном боксе' },
];

/* ---------- Before / After ---------- */

export interface BeforeAfterCase {
  photo: PhotoKey;
  title: string;
  service: string;
  serviceSlug: string;
  /** Which simulated defects to show on the «before» side. */
  defects: 'swirls' | 'stains' | 'dust';
  note: string;
}

export const beforeAfterCases: BeforeAfterCase[] = [
  { photo: 'bentley-a', title: 'Bentley Continental GT', service: 'Многоступенчатая полировка', serviceSlug: 'paint-polishing', defects: 'swirls', note: 'Голограммы и паутинка после автоматических моек.' },
  { photo: 'int-tan', title: 'Кожаный салон', service: 'Очистка и кондиционирование кожи', serviceSlug: 'leather-cleaning', defects: 'stains', note: 'Потемневшая кожа и перенос красителя на сиденье водителя.' },
  { photo: 'wheel-light', title: 'Кованый диск', service: 'Очистка дисков', serviceSlug: 'wheel-cleaning', defects: 'dust', note: 'Запёкшаяся тормозная пыль на спицах и ободе.' },
];

/* ---------- Rental extras ---------- */

export interface RentalExtra {
  id: string;
  label: string;
  note: string;
  price: number;
  per: 'day' | 'rental';
}

export const rentalExtras: RentalExtra[] = [
  { id: 'delivery', label: 'Доставка и возврат по адресу', note: 'В пределах города, в удобное время', price: 150, per: 'rental' },
  { id: 'driver2', label: 'Второй водитель', note: 'Стаж от 5 лет', price: 90, per: 'day' },
  { id: 'insurance', label: 'Расширенная страховка', note: 'Снижает франшизу до 2 500 €', price: 120, per: 'day' },
  { id: 'chauffeur', label: 'Водитель Example', note: 'До 10 часов в сутки', price: 390, per: 'day' },
  { id: 'photo', label: 'Фотосессия с автомобилем', note: '2 часа, 30 обработанных кадров', price: 250, per: 'rental' },
];

export const rentalTerms = [
  'Водитель от 23–30 лет (зависит от автомобиля) со стажем от 5 лет',
  'Залог блокируется на карте водителя и возвращается в течение 3 рабочих дней',
  'Автомобиль выдаётся с полным баком и возвращается так же',
  'Суточный лимит пробега; перепробег — 6 € за километр',
  'Запрещены трек-дни, дрифт и передача управления третьим лицам',
];

export const pickupTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
export const studioTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export const discountRules = [
  { minDays: 7, rate: 0.15, label: 'Скидка 15% за 7+ дней' },
  { minDays: 3, rate: 0.1, label: 'Скидка 10% за 3+ дня' },
];
