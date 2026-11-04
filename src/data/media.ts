/**
 * Photo registry. Every image on the site is referenced by key, never by URL.
 * Photos come from Unsplash (https://unsplash.com/license) and are delivered by the
 * Unsplash image CDN, which serves AVIF/WebP at the requested width.
 * `fp` is the focal point (0–1) used when an image is cropped to an aspect ratio.
 */
export interface Photo {
  id: string;
  alt: string;
  fp?: [number, number];
}

const p = (id: string, alt: string, fp?: [number, number]): Photo => ({ id, alt, fp });

export const photos = {
  // Fleet
  'huracan-sto': p('1707399720709-cd14e30d5e3a', 'Матово-серый Lamborghini Huracán STO на бетонной площадке в лучах заката', [0.5, 0.6]),
  'huracan-spyder': p('1611900713725-864f48309d67', 'Белый Lamborghini Huracán EVO Spyder с опущенной крышей на городской улице', [0.55, 0.62]),
  'huracan-green-a': p('1528501028382-e587fcf3a03e', 'Зелёный Lamborghini Huracán, вид спереди', [0.5, 0.6]),
  'urus-green-garage': p('1765521917320-c011148e65e8', 'Lamborghini Urus в полутёмном подземном паркинге с зелёной подсветкой', [0.5, 0.62]),
  'urus-black': p('1748189285388-c8852b6a7ed6', 'Чёрный Lamborghini Urus на городской улице', [0.5, 0.6]),
  'f8-a': p('1614200187524-dc4b892acf16', 'Красный Ferrari F8 Tributo у красной стены', [0.5, 0.65]),
  'f8-b': p('1614200179396-2bdb77ebf81b', 'Красный Ferrari F8 Tributo у серого здания', [0.5, 0.65]),
  'ferrari-296': p('1787930026147-72c64c31fc45', 'Зелёный Ferrari 296 GTB с белой полосой в гараже', [0.5, 0.62]),
  'ferrari-badge': p('1597687168547-2640e6a1b6ee', 'Эмблема Ferrari на красном кузове крупным планом', [0.5, 0.5]),
  'turbo-s-white': p('1772332196542-23b1c4e5202c', 'Белый Porsche 911 Turbo S на открытой площадке', [0.5, 0.62]),
  'gt3-a': p('1775407492017-cb6142214815', 'Белый Porsche 911 GT3 на загородной дороге, вид сзади', [0.5, 0.6]),
  'gt3-b': p('1775407495330-fa147be4acaf', 'Белый Porsche 911 GT3 в движении на дороге', [0.5, 0.6]),
  'gt3-c': p('1775407492002-0d100baf16a4', 'Porsche 911 GT3 с антикрылом, вид сзади', [0.5, 0.6]),
  'amg-gt-monaco': p('1617814065893-00757125efab', 'Матово-чёрный Mercedes-AMG GT на набережной у гавани', [0.5, 0.7]),
  'amg-gt-road': p('1617814076231-2c58846db944', 'Чёрный Mercedes-AMG GT на дороге', [0.5, 0.6]),
  'amg-black-series': p('1740001574106-327a951ee247', 'Чёрный Mercedes-AMG GT Black Series в тёмном зале', [0.5, 0.6]),
  'mclaren-a': p('1760689029558-500081eb2bf7', 'Оранжевый McLaren 720S с поднятыми дверями', [0.5, 0.55]),
  'mclaren-b': p('1760689033463-ced10a9251f3', 'Оранжевый McLaren 720S на улице', [0.5, 0.6]),
  'mclaren-black-pair': p('1760689043626-9b44e10a6544', 'Два чёрных McLaren на мокром асфальте парковки', [0.5, 0.6]),
  'bentley-a': p('1749215530415-6a4cd6b31141', 'Голубой Bentley Continental GT, вид спереди', [0.5, 0.6]),
  'bentley-b': p('1749215530386-e011171450df', 'Голубой Bentley Continental GT у обочины', [0.5, 0.6]),
  'cullinan-a': p('1772990915311-0710c4e7e74a', 'Тёмно-зелёный Rolls-Royce Cullinan у здания', [0.5, 0.6]),
  'cullinan-b': p('1772990916061-94f42f45d826', 'Тёмно-зелёный Rolls-Royce Cullinan, вид сбоку', [0.5, 0.6]),
  'rr-dawn': p('1599912027611-484b9fc447af', 'Rolls-Royce Dawn с опущенной крышей, вид спереди', [0.5, 0.6]),
  'r8-golden': p('1603584173870-7f23fdae1b7a', 'Матово-серый Audi R8 на горной дороге в золотой час', [0.5, 0.62]),
  'r8-matte': p('1610880846497-7257b23f6138', 'Матово-серый Audi R8 на тёмном асфальте', [0.5, 0.6]),
  'r8-rooftop': p('1616617774879-179911b66e75', 'Чёрный Audi R8 на крыше городского паркинга', [0.5, 0.62]),
  'cab-911-a': p('1792524133553-122fc1f9f974', 'Серебристый Porsche 911 Cabriolet на городской улице', [0.5, 0.62]),
  'cab-911-b': p('1792523650834-9dbc89a91c14', 'Porsche 911 Cabriolet у современного здания', [0.5, 0.62]),
  'cab-911-c': p('1792523651001-cb7691544c4a', 'Porsche 911 Cabriolet на брусчатке', [0.5, 0.62]),

  // Atmosphere
  'hero-silhouette': p('1645400379459-f6fd3d963fd4', 'Чёрный спортивный автомобиль в тёмной студии, свет скользит по линиям кузова', [0.55, 0.55]),
  'hero-bw': p('1623575398807-ff30453553a9', 'Силуэт спортивного автомобиля в чёрно-белой студийной съёмке', [0.5, 0.6]),
  'aventador-smoke': p('1552176625-e47ff529b595', 'Lamborghini в дыму под студийным светом', [0.5, 0.6]),
  'red-box': p('1708516893277-232fb2bfb198', 'Красный спортивный автомобиль под красной световой панелью', [0.5, 0.7]),
  'wheel-light': p('1760199129875-c0ecd67dba5f', 'Колесо премиального автомобиля под линейным светом мастерской', [0.45, 0.6]),
  tunnel: p('1586012512065-111aadb16adf', 'Автомобиль с включёнными фарами в подземном паркинге со световыми линиями', [0.5, 0.7]),
  'porsche-wet-night': p('1764774630574-2726716f8119', 'Porsche на мокрой ночной улице', [0.5, 0.65]),
  'night-road': p('1788792218628-0e93734c7003', 'Спортивный автомобиль с включёнными фарами на ночной дороге', [0.5, 0.55]),
  corridor: p('1776102669010-0f5ec90bf0a8', 'Спортивный автомобиль в полутёмном гараже', [0.5, 0.6]),

  // Detailing
  'det-polish': p('1780558852670-3f49298ecc1f', 'Мастер полирует капот эксцентриковой машинкой', [0.4, 0.4]),
  'det-foam': p('1633014041037-f5446fb4ce99', 'Автомобиль в активной пене на профессиональной мойке', [0.5, 0.5]),
  'det-suds': p('1761312834150-4beefff097a7', 'Чёрный кузов в мыльной пене крупным планом', [0.5, 0.5]),
  'det-wheel': p('1708805282683-50a060eba80f', 'Мастер в перчатке чистит колёсный диск кистью', [0.5, 0.5]),
  'det-dash-a': p('1771491237218-cbd4a707497e', 'Детейлер очищает панель приборов', [0.5, 0.5]),
  'det-dash-b': p('1771491237209-b89bc7290588', 'Очистка деталей салона кистью', [0.5, 0.5]),
  'det-headlight': p('1632823469850-2f77dd9c7f93', 'Мастер обрабатывает кузов у фары', [0.5, 0.5]),
  'det-wax-a': p('1708805282706-f44730b7e527', 'Нанесение защитного состава на чёрный кузов в мастерской', [0.5, 0.5]),
  'det-wax-b': p('1708805282676-0c15476eb8a2', 'Мастер работает с кузовом в мастерской', [0.5, 0.5]),
  'det-microfiber': p('1761934657948-708146148588', 'Микрофибра на глянцевом чёрном капоте', [0.5, 0.5]),
  'det-microfiber-red': p('1761934658331-2e00b20dc6c6', 'Микрофибра на красном кузове', [0.5, 0.5]),
  'det-film-a': p('1632605166776-7128669886e7', 'Мастер в перчатках разглаживает плёнку на кузове', [0.5, 0.5]),
  'det-film-tape': p('1632605179016-7e21ad342b14', 'Раскрой защитной плёнки по контуру детали', [0.5, 0.5]),
  'det-film-orange': p('1646531840695-62810bcd1171', 'Оклейка кузова плёнкой ракелем', [0.5, 0.5]),
  'studio-a': p('1787178605090-8532e8a6ba00', 'Матово-чёрный автомобиль на полированном бетонном полу светлой студии', [0.5, 0.62]),
  'studio-b': p('1787178605268-36282fb87172', 'Матово-чёрный BMW в минималистичной ярко освещённой мастерской', [0.5, 0.6]),
  'det-beading': p('1770700391793-22fc46041c2b', 'Капли воды на тёмно-синем капоте после нанесения керамики', [0.5, 0.5]),
  'workshop-colors': p('1646531839844-034be6a06aad', 'Мастерская с несколькими автомобилями на постах', [0.5, 0.5]),

  // Interior
  'int-tan': p('1649136378672-b965cb9935d5', 'Салон с кожаными сиденьями цвета карамели', [0.5, 0.5]),
  'int-brown': p('1682858110563-3f609263d418', 'Современный салон с кожаными сиденьями', [0.5, 0.5]),
  'int-white': p('1652860316277-370ca5b1b1df', 'Салон с белой кожаной отделкой', [0.5, 0.5]),
  'int-red-wheel': p('1636647510477-5ec1593b8be3', 'Салон с красной кожей и спортивным рулём', [0.5, 0.5]),
  'int-red': p('1549064233-945d7063292f', 'Чёрно-красный салон спортивного автомобиля', [0.5, 0.5]),
  'int-black': p('1553818501-e9926ea1ea8f', 'Ключ на чёрном кожаном сиденье водителя', [0.5, 0.5]),
  'int-gear': p('1494363608357-c7fa659e7325', 'Рычаг коробки передач и центральная консоль', [0.5, 0.5]),
  'int-portofino': p('1771066176717-8730877028ac', 'Приборная панель Ferrari с жёлтым тахометром', [0.5, 0.5]),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

const CDN = 'https://images.unsplash.com/photo-';

export interface PhotoUrlOptions {
  width: number;
  /** width / height. When set, the CDN crops around the focal point. */
  ratio?: number;
  quality?: number;
}

export function photoUrl(key: PhotoKey, { width, ratio, quality = 72 }: PhotoUrlOptions): string {
  const photo: Photo = photos[key];
  const params = new URLSearchParams({ auto: 'format', q: String(quality), w: String(Math.round(width)) });
  if (ratio) {
    params.set('fit', 'crop');
    params.set('h', String(Math.round(width / ratio)));
    if (photo.fp) {
      params.set('crop', 'focalpoint');
      params.set('fp-x', String(photo.fp[0]));
      params.set('fp-y', String(photo.fp[1]));
    }
  } else {
    params.set('fit', 'max');
  }
  return `${CDN}${photo.id}?${params.toString()}`;
}

export const PHOTO_WIDTHS = [160, 320, 480, 768, 1080, 1440, 1920, 2400];

export function photoSrcSet(key: PhotoKey, ratio?: number, maxWidth = 2400): string {
  return PHOTO_WIDTHS.filter((w) => w <= maxWidth)
    .map((w) => `${photoUrl(key, { width: w, ratio })} ${w}w`)
    .join(', ');
}
