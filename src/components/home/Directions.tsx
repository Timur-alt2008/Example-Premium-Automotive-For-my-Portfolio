import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import type { PhotoKey } from '../../data/media';

const directions: { to: string; photo: PhotoKey; title: string; text: string; points: string[]; action: string }[] = [
  {
    to: '/detailing/',
    photo: 'studio-a',
    title: 'Detailing studio',
    text: 'Polishing, ceramic coatings, PPF and interior care for cars you want to keep exactly as they were on the day you bought them.',
    points: ['17 services for body and interior', 'Three care packages', 'A separate bay for each stage'],
    action: 'Services and prices',
  },
  {
    to: '/cars/',
    photo: 'mclaren-a',
    title: 'Car collection',
    text: 'Supercars, grand tourers and SUVs for a day, a weekend or a long route. Every car goes through the same checks as our clients’ cars.',
    points: ['14 cars from 450 to 830 hp', 'Delivery to your address', 'An Example driver on request'],
    action: 'View the fleet',
  },
];

export function Directions() {
  return (
    <section className="directions" aria-label="What Example does">
      {directions.map((d, i) => (
        <Link key={d.to} to={d.to} className="direction" data-reveal="clip" style={{ '--d': i * 160 } as React.CSSProperties}>
          <Photo k={d.photo} className="direction__photo" sizes="(min-width: 900px) 60vw, 100vw" />
          <div className="direction__shade" aria-hidden="true" />
          <div className="direction__content">
            <h2 className="h2 direction__title">{d.title}</h2>
            <p className="direction__text">{d.text}</p>
            <ul className="direction__points">
              {d.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <span className="direction__action">
              {d.action} <Icon name="arrow" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
