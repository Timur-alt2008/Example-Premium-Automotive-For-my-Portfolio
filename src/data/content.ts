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
    author: 'Andrew K.',
    context: 'Ceramic, Porsche 911 GT3',
    text: 'I asked to see the car under the inspection lamp before the work — and saw swirl marks I never knew about. Three days later they were gone under every light. Water now beads off at 60 km/h.',
    rating: 5,
    date: '2026-09-14',
    photo: 'gt3-a',
  },
  {
    author: 'Marina L.',
    context: 'Rental, Rolls-Royce Cullinan',
    text: 'We took the Cullinan for my sister’s wedding. The car arrived an hour early, and the driver knew the route better than we did. The cabin smelled of leather, not air freshener.',
    rating: 5,
    date: '2026-08-02',
    photo: 'cullinan-a',
  },
  {
    author: 'Oleg R.',
    context: 'PPF, Ferrari F8 Tributo',
    text: 'They wrapped the whole front. A month later I honestly looked for the edges on the bonnet and could not find them. I also liked that they sent photos of every stage.',
    rating: 5,
    date: '2026-06-21',
    photo: 'f8-a',
  },
  {
    author: 'Victoria S.',
    context: 'Rental, McLaren 720S',
    text: 'Before the handover they spent half an hour explaining the chassis modes and showed me how the front-axle lift works. No unnecessary paperwork, everything clear the first time.',
    rating: 5,
    date: '2026-05-30',
    photo: 'mclaren-a',
  },
  {
    author: 'Denis M.',
    context: 'Deep clean, Bentley Continental GT',
    text: 'Light leather looked tired after two years with kids. They brought back the original colour without any shine. And they finished exactly on time.',
    rating: 4,
    date: '2026-04-11',
    photo: 'int-tan',
  },
];

/* ---------- FAQ ---------- */

export type FaqCategory = 'rental' | 'detailing' | 'booking';

export const faqCategoryLabels: Record<FaqCategory, string> = {
  rental: 'Car rental',
  detailing: 'Detailing',
  booking: 'Booking',
};

export interface FaqItem {
  category: FaqCategory;
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  { category: 'rental', q: 'What documents do I need?', a: 'A passport or ID card, a driving licence held for at least 5 years and a bank card in the driver’s name for the deposit. Some cars require a minimum age of 27 or 30; it is shown on the car’s page.' },
  { category: 'rental', q: 'How is the price calculated?', a: 'The daily rate is multiplied by the number of rental days. Rentals of 3 days or more get 10% off, 7 days or more get 15% off. Extras such as delivery or a second driver are added as separate lines. You see the total before you send the request.' },
  { category: 'rental', q: 'Is there a deposit?', a: 'Yes. The deposit depends on the car and is shown on its page — from €10,000 to €25,000. It is held on your card and released within 3 working days after return.' },
  { category: 'rental', q: 'Can I extend my rental?', a: 'Yes, if the car is free on the following dates. Write to us 24 hours before the rental ends — the extension is charged at the same rate, with the discount applied to the total length.' },
  { category: 'rental', q: 'How does the car handover work?', a: 'At the studio or delivered to your address. We walk you around the car, record mileage and condition on photos, and explain the drive modes and controls. It usually takes 30–40 minutes.' },
  { category: 'rental', q: 'What restrictions apply to rentals?', a: 'The daily mileage limit is listed on each car’s page. Track days, drifting, towing and letting anyone not named in the contract drive are not allowed. Trips abroad must be agreed in advance.' },
  { category: 'detailing', q: 'How long does polishing take?', a: 'A one-step gloss enhancement takes one day. A full multi-stage correction takes two to three days, depending on the size of the car and the condition of the paint.' },
  { category: 'detailing', q: 'How long does a ceramic coating last?', a: 'From two to five years, depending on the product and how the car is cared for. We issue a certificate and invite you for a free check-up after six months.' },
  { category: 'detailing', q: 'What is PPF?', a: 'A clear polyurethane film about 200 µm thick. It takes stone chips and scratches, and light damage to the top layer heals with heat. It lasts 7–10 years.' },
  { category: 'detailing', q: 'How should I prepare my car?', a: 'Nothing special is needed. Clear personal items out of the cabin and boot and tell us about any known damage — we will take it into account at inspection.' },
  { category: 'detailing', q: 'Can I book in advance?', a: 'Yes, bookings are open 60 days ahead. For PPF and multi-stage polishing we recommend booking two to three weeks in advance.' },
  { category: 'booking', q: 'How do I send a request?', a: 'Choose a car or a service, dates and time, leave your contact details and press “Send request”. A manager will contact you within 30 minutes during working hours.' },
  { category: 'booking', q: 'How do I change the date?', a: 'Call or write to us with your request number. Changing the date is free more than 48 hours before the rental or visit.' },
  { category: 'booking', q: 'How do I cancel a request?', a: 'Give your request number by phone or e-mail. Cancelling is free 48 hours or more in advance; later cancellations are charged one day of rental.' },
];

/* ---------- Gallery ---------- */

export type GalleryCategory = 'supercars' | 'detailing' | 'interior' | 'exterior' | 'before-after' | 'workshop';

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  supercars: 'Supercars',
  detailing: 'Detailing',
  interior: 'Interior',
  exterior: 'Exterior',
  'before-after': 'Before and after',
  workshop: 'Workshop',
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
  { photo: 'aventador-smoke', category: 'supercars', caption: 'Shoot for the collection, bay no. 3', shape: 'big' },
  { photo: 'det-polish', category: 'detailing', caption: 'Paint correction, second stage', shape: 'tall' },
  { photo: 'int-tan', category: 'interior', caption: 'Leather after cleaning and conditioning' },
  { photo: 'amg-gt-monaco', category: 'exterior', caption: 'Matte film on a Mercedes-AMG GT', shape: 'wide' },
  { photo: 'bentley-a', category: 'before-after', caption: 'Bentley Continental GT: polishing', compare: 0 },
  { photo: 'studio-b', category: 'workshop', caption: 'A ceramic bay with 6500 K light', shape: 'wide' },
  { photo: 'mclaren-a', category: 'supercars', caption: 'A McLaren 720S before handover to a client', shape: 'tall' },
  { photo: 'det-beading', category: 'detailing', caption: 'The beading effect one week after a ceramic coating' },
  { photo: 'int-red-wheel', category: 'interior', caption: 'Alcantara and leather after a deep clean' },
  { photo: 'huracan-sto', category: 'supercars', caption: 'Lamborghini Huracán STO', shape: 'wide' },
  { photo: 'det-film-orange', category: 'detailing', caption: 'PPF on a front wing', shape: 'tall' },
  { photo: 'int-tan', category: 'before-after', caption: 'Interior: leather cleaning', compare: 1 },
  { photo: 'workshop-colors', category: 'workshop', caption: 'Preparation bays' },
  { photo: 'gt3-c', category: 'exterior', caption: 'A Porsche 911 GT3 after ceramic', shape: 'wide' },
  { photo: 'det-wheel', category: 'detailing', caption: 'Wheel cleaning with the wheels removed' },
  { photo: 'cullinan-a', category: 'exterior', caption: 'Rolls-Royce Cullinan, prepared for handover', shape: 'tall' },
  { photo: 'wheel-light', category: 'before-after', caption: 'A wheel: removing brake dust', compare: 2 },
  { photo: 'int-white', category: 'interior', caption: 'Light leather and headliner', shape: 'wide' },
  { photo: 'studio-a', category: 'workshop', caption: 'Car handover area', shape: 'big' },
  { photo: 'f8-b', category: 'supercars', caption: 'Ferrari F8 Tributo' },
  { photo: 'det-film-tape', category: 'detailing', caption: 'Cutting film to shape' },
  { photo: 'int-portofino', category: 'interior', caption: 'The dashboard after plastic care' },
  { photo: 'urus-green-garage', category: 'supercars', caption: 'A Lamborghini Urus in the studio car park', shape: 'wide' },
  { photo: 'det-wax-a', category: 'workshop', caption: 'Applying ceramic in a separate bay' },
];

/* ---------- Before / After ---------- */

export interface BeforeAfterCase {
  photo: PhotoKey;
  title: string;
  service: string;
  serviceSlug: string;
  /** Which simulated defects to show on the “before” side. */
  defects: 'swirls' | 'stains' | 'dust';
  note: string;
}

export const beforeAfterCases: BeforeAfterCase[] = [
  { photo: 'bentley-a', title: 'Bentley Continental GT', service: 'Multi-stage polishing', serviceSlug: 'paint-polishing', defects: 'swirls', note: 'Holograms and swirls from automatic car washes.' },
  { photo: 'int-tan', title: 'Leather interior', service: 'Leather cleaning and conditioning', serviceSlug: 'leather-cleaning', defects: 'stains', note: 'Darkened leather and dye transfer on the driver’s seat.' },
  { photo: 'wheel-light', title: 'Forged wheel', service: 'Wheel cleaning', serviceSlug: 'wheel-cleaning', defects: 'dust', note: 'Baked-on brake dust on the spokes and rim.' },
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
  { id: 'delivery', label: 'Delivery and return to your address', note: 'Within the city, at a time that suits you', price: 150, per: 'rental' },
  { id: 'driver2', label: 'Second driver', note: '5+ years’ licence', price: 90, per: 'day' },
  { id: 'insurance', label: 'Extended insurance', note: 'Reduces the excess to €2,500', price: 120, per: 'day' },
  { id: 'chauffeur', label: 'Example driver', note: 'Up to 10 hours a day', price: 390, per: 'day' },
  { id: 'photo', label: 'Photo shoot with your car', note: '2 hours, 30 edited shots', price: 250, per: 'rental' },
];

export const rentalTerms = [
  'Driver aged 23–30+ (depends on the car) with at least 5 years’ experience',
  'The deposit is held on the driver’s card and released within 3 working days',
  'The car is handed over with a full tank and returned the same way',
  'Daily mileage limit; excess mileage — €6 per kilometre',
  'Track days, drifting and letting third parties drive are not allowed',
];

export const pickupTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
export const studioTimes = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

export const discountRules = [
  { minDays: 7, rate: 0.15, label: '15% off for 7+ days' },
  { minDays: 3, rate: 0.1, label: '10% off for 3+ days' },
];
