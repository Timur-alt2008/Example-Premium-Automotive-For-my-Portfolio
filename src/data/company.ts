/**
 * Company details. Example is a fictional brand: the address, phone numbers and
 * e-mail addresses are safe test values (555-01xx numbers and the reserved
 * example.com domain) and do not belong to any real person or business.
 */
export const company = {
  name: 'Example',
  descriptor: 'Детейлинг-студия и коллекция автомобилей',
  founded: 2014,
  address: {
    street: 'Example Avenue, 1',
    district: 'Сектор 7, Example City',
    note: 'Въезд с северной стороны, ворота с подсветкой',
  },
  phones: {
    studio: { label: 'Студия детейлинга', display: '+1 (555) 010-0177', href: 'tel:+15550100177' },
    rental: { label: 'Аренда автомобилей', display: '+1 (555) 010-0188', href: 'tel:+15550100188' },
  },
  emails: {
    studio: 'studio@example.com',
    rental: 'rental@example.com',
    general: 'hello@example.com',
  },
  socials: [
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'telegram', label: 'Telegram' },
    { id: 'whatsapp', label: 'WhatsApp' },
  ],
  facts: [
    { value: '1 400', unit: 'м²', label: 'студия с отдельными боксами для полировки, керамики и плёнки' },
    { value: '14', unit: '', label: 'автомобилей в коллекции для аренды' },
    { value: '6500', unit: 'K', label: 'температура света, под которым мы проверяем каждую панель' },
  ],
} as const;

export interface OpeningHours {
  /** 0 = Sunday … 6 = Saturday */
  day: number;
  label: string;
  open: string | null;
  close: string | null;
}

export const studioHours: OpeningHours[] = [
  { day: 1, label: 'Понедельник', open: '09:00', close: '21:00' },
  { day: 2, label: 'Вторник', open: '09:00', close: '21:00' },
  { day: 3, label: 'Среда', open: '09:00', close: '21:00' },
  { day: 4, label: 'Четверг', open: '09:00', close: '21:00' },
  { day: 5, label: 'Пятница', open: '09:00', close: '21:00' },
  { day: 6, label: 'Суббота', open: '10:00', close: '19:00' },
  { day: 0, label: 'Воскресенье', open: '10:00', close: '17:00' },
];

export function openStatus(now = new Date()): { open: boolean; text: string } {
  const today = studioHours.find((h) => h.day === now.getDay());
  if (!today || !today.open || !today.close) return { open: false, text: 'Сегодня выходной' };
  const minutes = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  if (minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, text: `Открыто до ${today.close}` };
  }
  if (minutes < toMin(today.open)) return { open: false, text: `Откроемся в ${today.open}` };
  const tomorrow = studioHours.find((h) => h.day === (now.getDay() + 1) % 7);
  return { open: false, text: tomorrow?.open ? `Откроемся завтра в ${tomorrow.open}` : 'Закрыто' };
}

export interface TeamMember {
  name: string;
  role: string;
  since: number;
  focus: string;
  photo: import('./media').PhotoKey;
}

/** Fictional team. Photos show work in progress, not portraits of real people. */
export const team: TeamMember[] = [
  { name: 'Марк Левин', role: 'Основатель, руководитель студии', since: 2014, focus: 'Принимает каждый автомобиль лично и подписывает итоговый осмотр.', photo: 'det-wax-b' },
  { name: 'Ева Ростова', role: 'Руководитель коллекции', since: 2019, focus: 'Отвечает за состояние парка и подбирает автомобиль под маршрут клиента.', photo: 'int-black' },
  { name: 'Даниил Корф', role: 'Старший мастер по полировке', since: 2016, focus: 'Специализируется на мягких лаках японских и итальянских марок.', photo: 'det-polish' },
  { name: 'Ирина Ланская', role: 'Мастер по PPF', since: 2018, focus: 'Готовит выкройки и заворачивает кромки так, что плёнку не видно.', photo: 'det-film-a' },
  { name: 'Тимофей Грин', role: 'Специалист по керамике', since: 2020, focus: 'Работает в боксе с контролем влажности и ведёт журнал полимеризации.', photo: 'det-wax-a' },
  { name: 'Алиса Вайс', role: 'Консьерж-сервис', since: 2021, focus: 'Организует доставку, подменный автомобиль и встречу в аэропорту.', photo: 'det-dash-a' },
];

export const milestones = [
  { year: 2014, text: 'Два поста в арендованном гараже и одна полировальная машинка.' },
  { year: 2017, text: 'Отдельный бокс для плёнки и плоттер для раскроя по лекалам.' },
  { year: 2019, text: 'Переезд в здание на 1 400 м² со светом 6500 K в каждом боксе.' },
  { year: 2021, text: 'Первые четыре автомобиля в аренду — для клиентов студии.' },
  { year: 2024, text: 'Коллекция выросла до четырнадцати машин и собственной службы доставки.' },
];

export const advantages = [
  { icon: 'equipment', title: 'Профессиональное оборудование', text: 'Эксцентриковые машинки с ходом 15 и 21 мм, толщиномеры ЛКП, ИК-сушка и плоттер для раскроя плёнки.' },
  { icon: 'materials', title: 'Материалы с паспортом', text: 'Работаем только с составами, у которых есть технический лист и понятный срок службы.' },
  { icon: 'person', title: 'Один мастер на один автомобиль', text: 'Машину ведёт один специалист от приёмки до выдачи — он знает каждую её панель.' },
  { icon: 'check', title: 'Контроль под тремя видами света', text: 'Рассеянный свет, точечный фонарь и солнечный спектр. Работа считается законченной, только если её не видно ни под одним из них.' },
  { icon: 'detail', title: 'Внимание к деталям', text: 'Проёмы, эмблемы, дренажи и внутренняя сторона дисков — в стандартном объёме работ.' },
  { icon: 'lock', title: 'Конфиденциальность', text: 'Закрытый въезд, отдельная зона выдачи и никаких фотографий ваших автомобилей без согласия.' },
  { icon: 'lounge', title: 'Комфортное ожидание', text: 'Лаунж с видом на бокс, кофе и рабочее место. Или доставка автомобиля к вашему дому.' },
] as const;

export const processSteps = [
  { title: 'Заявка', text: 'Вы описываете задачу, мы предлагаем время и примерную стоимость.' },
  { title: 'Осмотр под светом', text: 'Замеряем толщину лака, фотографируем дефекты и согласуем объём работ.' },
  { title: 'Работа', text: 'Автомобиль ведёт один мастер, вы получаете фото с каждого этапа.' },
  { title: 'Контроль', text: 'Руководитель студии проверяет каждую панель под тремя видами света.' },
  { title: 'Выдача', text: 'Показываем результат, объясняем уход и выдаём сертификат на покрытие.' },
];
