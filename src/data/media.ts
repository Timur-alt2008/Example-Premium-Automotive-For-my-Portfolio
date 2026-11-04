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
  'huracan-sto': p('1707399720709-cd14e30d5e3a', 'A matte grey Lamborghini Huracán STO on a concrete lot at sunset', [0.5, 0.6]),
  'huracan-spyder': p('1611900713725-864f48309d67', 'A white Lamborghini Huracán EVO Spyder with the top down on a city street', [0.55, 0.62]),
  'huracan-green-a': p('1528501028382-e587fcf3a03e', 'A green Lamborghini Huracán, front view', [0.5, 0.6]),
  'urus-green-garage': p('1765521917320-c011148e65e8', 'A Lamborghini Urus in a dim underground car park with green lighting', [0.5, 0.62]),
  'urus-black': p('1748189285388-c8852b6a7ed6', 'A black Lamborghini Urus on a city street', [0.5, 0.6]),
  'f8-a': p('1614200187524-dc4b892acf16', 'A red Ferrari F8 Tributo by a red wall', [0.5, 0.65]),
  'f8-b': p('1614200179396-2bdb77ebf81b', 'A red Ferrari F8 Tributo by a grey building', [0.5, 0.65]),
  'ferrari-296': p('1787930026147-72c64c31fc45', 'A green Ferrari 296 GTB with a white stripe in a garage', [0.5, 0.62]),
  'ferrari-badge': p('1597687168547-2640e6a1b6ee', 'The Ferrari badge on a red body, close-up', [0.5, 0.5]),
  'turbo-s-white': p('1772332196542-23b1c4e5202c', 'A white Porsche 911 Turbo S on an open lot', [0.5, 0.62]),
  'gt3-a': p('1775407492017-cb6142214815', 'A white Porsche 911 GT3 on a country road, rear view', [0.5, 0.6]),
  'gt3-b': p('1775407495330-fa147be4acaf', 'A white Porsche 911 GT3 driving on a road', [0.5, 0.6]),
  'gt3-c': p('1775407492002-0d100baf16a4', 'A Porsche 911 GT3 with its rear wing, rear view', [0.5, 0.6]),
  'amg-gt-monaco': p('1617814065893-00757125efab', 'A matte black Mercedes-AMG GT on a harbour quay', [0.5, 0.7]),
  'amg-gt-road': p('1617814076231-2c58846db944', 'A black Mercedes-AMG GT on the road', [0.5, 0.6]),
  'amg-black-series': p('1740001574106-327a951ee247', 'A black Mercedes-AMG GT Black Series in a dark hall', [0.5, 0.6]),
  'mclaren-a': p('1760689029558-500081eb2bf7', 'An orange McLaren 720S with its doors raised', [0.5, 0.55]),
  'mclaren-b': p('1760689033463-ced10a9251f3', 'An orange McLaren 720S on the street', [0.5, 0.6]),
  'mclaren-black-pair': p('1760689043626-9b44e10a6544', 'Two black McLarens on a wet car park', [0.5, 0.6]),
  'bentley-a': p('1749215530415-6a4cd6b31141', 'A light blue Bentley Continental GT, front view', [0.5, 0.6]),
  'bentley-b': p('1749215530386-e011171450df', 'A light blue Bentley Continental GT at the kerb', [0.5, 0.6]),
  'cullinan-a': p('1772990915311-0710c4e7e74a', 'A dark green Rolls-Royce Cullinan by a building', [0.5, 0.6]),
  'cullinan-b': p('1772990916061-94f42f45d826', 'A dark green Rolls-Royce Cullinan, side view', [0.5, 0.6]),
  'rr-dawn': p('1599912027611-484b9fc447af', 'A Rolls-Royce Dawn with the top down, front view', [0.5, 0.6]),
  'r8-golden': p('1603584173870-7f23fdae1b7a', 'A matte grey Audi R8 on a mountain road at golden hour', [0.5, 0.62]),
  'r8-matte': p('1610880846497-7257b23f6138', 'A matte grey Audi R8 on dark asphalt', [0.5, 0.6]),
  'r8-rooftop': p('1616617774879-179911b66e75', 'A black Audi R8 on the roof of a city car park', [0.5, 0.62]),
  'cab-911-a': p('1792524133553-122fc1f9f974', 'A silver Porsche 911 Cabriolet on a city street', [0.5, 0.62]),
  'cab-911-b': p('1792523650834-9dbc89a91c14', 'A Porsche 911 Cabriolet by a modern building', [0.5, 0.62]),
  'cab-911-c': p('1792523651001-cb7691544c4a', 'A Porsche 911 Cabriolet on cobblestones', [0.5, 0.62]),

  // Atmosphere
  'hero-silhouette': p('1645400379459-f6fd3d963fd4', 'A black sports car in a dark studio, light gliding along the lines of the body', [0.55, 0.55]),
  'hero-bw': p('1623575398807-ff30453553a9', 'The silhouette of a sports car in a black-and-white studio shoot', [0.5, 0.6]),
  'aventador-smoke': p('1552176625-e47ff529b595', 'A Lamborghini in smoke under studio lights', [0.5, 0.6]),
  'red-box': p('1708516893277-232fb2bfb198', 'A red sports car under a red light panel', [0.5, 0.7]),
  'wheel-light': p('1760199129875-c0ecd67dba5f', 'A premium car wheel under the workshop’s linear lights', [0.45, 0.6]),
  tunnel: p('1586012512065-111aadb16adf', 'A car with its headlights on in an underground car park lined with light strips', [0.5, 0.7]),
  'porsche-wet-night': p('1764774630574-2726716f8119', 'A Porsche on a wet street at night', [0.5, 0.65]),
  'night-road': p('1788792218628-0e93734c7003', 'A sports car with its headlights on, on a road at night', [0.5, 0.55]),
  corridor: p('1776102669010-0f5ec90bf0a8', 'A sports car in a dim garage', [0.5, 0.6]),

  // Detailing
  'det-polish': p('1780558852670-3f49298ecc1f', 'A specialist polishing a bonnet with a dual-action polisher', [0.4, 0.4]),
  'det-foam': p('1633014041037-f5446fb4ce99', 'A car covered in snow foam at a professional wash', [0.5, 0.5]),
  'det-suds': p('1761312834150-4beefff097a7', 'A black body covered in foam, close-up', [0.5, 0.5]),
  'det-wheel': p('1708805282683-50a060eba80f', 'A specialist in gloves cleaning a wheel with a brush', [0.5, 0.5]),
  'det-dash-a': p('1771491237218-cbd4a707497e', 'A detailer cleaning the dashboard', [0.5, 0.5]),
  'det-dash-b': p('1771491237209-b89bc7290588', 'Cleaning interior parts with a brush', [0.5, 0.5]),
  'det-headlight': p('1632823469850-2f77dd9c7f93', 'A specialist working on the body by a headlight', [0.5, 0.5]),
  'det-wax-a': p('1708805282706-f44730b7e527', 'Applying a protective coating to a black car in the workshop', [0.5, 0.5]),
  'det-wax-b': p('1708805282676-0c15476eb8a2', 'A specialist working on a car body in the workshop', [0.5, 0.5]),
  'det-microfiber': p('1761934657948-708146148588', 'Microfibre on a gloss black bonnet', [0.5, 0.5]),
  'det-microfiber-red': p('1761934658331-2e00b20dc6c6', 'Microfibre on a red body', [0.5, 0.5]),
  'det-film-a': p('1632605166776-7128669886e7', 'A specialist in gloves smoothing film onto the body', [0.5, 0.5]),
  'det-film-tape': p('1632605179016-7e21ad342b14', 'Cutting protective film to the shape of a panel', [0.5, 0.5]),
  'det-film-orange': p('1646531840695-62810bcd1171', 'Applying film to the body with a squeegee', [0.5, 0.5]),
  'studio-a': p('1787178605090-8532e8a6ba00', 'A matte black car on the polished concrete floor of a bright studio', [0.5, 0.62]),
  'studio-b': p('1787178605268-36282fb87172', 'A matte black BMW in a minimalist, brightly lit workshop', [0.5, 0.6]),
  'det-beading': p('1770700391793-22fc46041c2b', 'Water beads on a dark blue bonnet after a ceramic coating', [0.5, 0.5]),
  'workshop-colors': p('1646531839844-034be6a06aad', 'A workshop with several cars in the bays', [0.5, 0.5]),

  // Interior
  'int-tan': p('1649136378672-b965cb9935d5', 'A cabin with caramel leather seats', [0.5, 0.5]),
  'int-brown': p('1682858110563-3f609263d418', 'A modern cabin with leather seats', [0.5, 0.5]),
  'int-white': p('1652860316277-370ca5b1b1df', 'A cabin with white leather trim', [0.5, 0.5]),
  'int-red-wheel': p('1636647510477-5ec1593b8be3', 'A cabin with red leather and a sports steering wheel', [0.5, 0.5]),
  'int-red': p('1549064233-945d7063292f', 'The black-and-red interior of a sports car', [0.5, 0.5]),
  'int-black': p('1553818501-e9926ea1ea8f', 'A key on a black leather driver’s seat', [0.5, 0.5]),
  'int-gear': p('1494363608357-c7fa659e7325', 'Gear selector and centre console', [0.5, 0.5]),
  'int-portofino': p('1771066176717-8730877028ac', 'A Ferrari instrument cluster with a yellow rev counter', [0.5, 0.5]),
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
