import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import type { PhotoKey } from '../../data/media';

const directions: { to: string; photo: PhotoKey; title: string; text: string; points: string[]; action: string }[] = [
  {
    to: '/detailing/',
    photo: 'studio-a',
    title: 'Студия детейлинга',
    text: 'Полировка, керамика, PPF и уход за салоном для автомобилей, которые хочется сохранить такими, какими они были в день покупки.',
    points: ['17 услуг для кузова и салона', 'Три пакета обслуживания', 'Отдельный бокс под каждый этап'],
    action: 'Услуги и цены',
  },
  {
    to: '/cars/',
    photo: 'mclaren-a',
    title: 'Коллекция автомобилей',
    text: 'Суперкары, гран-туреры и внедорожники на день, выходные или длинный маршрут. Каждая машина проходит тот же контроль, что и автомобили клиентов.',
    points: ['14 автомобилей от 450 до 830 л.с.', 'Доставка по адресу', 'Водитель Example по запросу'],
    action: 'Смотреть автопарк',
  },
];

export function Directions() {
  return (
    <section className="directions" aria-label="Направления Example">
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
