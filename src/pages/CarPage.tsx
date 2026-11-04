import { useEffect, useRef, useState } from 'react';
import { RentalForm } from '../components/booking/RentalForm';
import { CarCard } from '../components/cars/CarCard';
import { Breadcrumbs } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { Lightbox } from '../components/ui/Lightbox';
import { Photo } from '../components/ui/Photo';
import { Split } from '../components/ui/Split';
import { bodyLabels, carBySlug, carName, categoryLabels, driveLabels, similarCars } from '../data/cars';
import { discountRules, rentalExtras, rentalTerms } from '../data/content';
import { days, formatDecimal, formatNumber, formatPrice, seats } from '../lib/format';
import { loadMotion, prefersReducedMotion } from '../lib/motion';
import { Link, useSearchParams } from '../router/router';

/** Big numerals that count up once when they scroll into view. */
function Readout({ value, decimals = 0, unit, label }: { value: number; decimals?: number; unit: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (v: number) => (decimals ? formatDecimal(v) : formatNumber(Math.round(v)));
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const state = { v: decimals ? value * 2.2 : 0 };
    let tween: { kill: () => void } | null = null;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      loadMotion().then(({ gsap }) => {
        tween = gsap.to(state, { v: value, duration: 1.6, ease: 'power3.out', onUpdate: () => (el.textContent = format(state.v)) });
      });
    });
    io.observe(el);
    return () => {
      io.disconnect();
      tween?.kill();
      el.textContent = format(value);
    };
  }, [value]);
  return (
    <div className="readout">
      <dt className="caption">{label}</dt>
      <dd>
        <span className="numeral" ref={ref}>
          {format(value)}
        </span>
        <small>{unit}</small>
      </dd>
    </div>
  );
}

export default function CarPage({ slug }: { slug: string }) {
  const car = carBySlug(slug)!;
  const [params] = useSearchParams();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const similar = similarCars(car);
  const slides = car.photos.map((p, i) => ({ photo: p, caption: `${carName(car)} — фото ${i + 1} из ${car.photos.length}` }));

  useEffect(() => setCurrent(0), [slug]);

  const specs: [string, string][] = [
    ['Двигатель', car.engine],
    ['Мощность', `${car.powerHp} л.с. (${car.powerKw} кВт)`],
    ['Крутящий момент', `${formatNumber(car.torqueNm)} Н·м`],
    ['Разгон 0–100 км/ч', `${formatDecimal(car.accel)} с`],
    ['Максимальная скорость', `${car.topSpeed} км/ч${car.topSpeedLimited ? ', ограничена электроникой' : ''}`],
    ['Коробка передач', car.gearbox],
    ['Привод', driveLabels[car.drive]],
    ['Кузов', bodyLabels[car.body]],
    ['Мест', seats(car.seats)],
    [car.weightNote === 'dry' ? 'Сухая масса' : 'Снаряжённая масса', `${formatNumber(car.weightKg)} кг`],
    ['Год выпуска', String(car.year)],
    ['Цвет', car.colour],
  ];

  return (
    <>
      <header className="car-hero">
        <div className="car-hero__media">
          <Photo k={car.photos[0]} priority sizes="100vw" />
        </div>
        <div className="car-hero__shade" aria-hidden="true" />
        <div className="wrap car-hero__content">
          <Breadcrumbs items={[{ to: '/cars/', label: 'Автопарк' }, { label: carName(car) }]} />
          <p className="car-hero__brand">
            {car.brand}
            <span>{car.year}</span>
          </p>
          <Split as="h1" lines={[car.model]} className="h1 car-hero__title" />
          <p className="lead">{car.tagline}</p>
          <div className="car-hero__bar">
            <p className="car-hero__price">
              <span className="numeral">{formatPrice(car.pricePerDay)}</span>
              <span className="caption">в сутки, залог {formatPrice(car.deposit)}</span>
            </p>
            <a href="#booking" className="btn btn--primary">
              Забронировать <Icon name="arrow" />
            </a>
            <a href="#gallery" className="btn btn--ghost">
              Фотографии
            </a>
          </div>
        </div>
      </header>

      <section className="readouts" aria-label="Ключевые характеристики">
        <dl className="wrap readouts__grid">
          <Readout value={car.powerHp} unit="л.с." label="Мощность" />
          <Readout value={car.accel} decimals={1} unit="с" label="0–100 км/ч" />
          <Readout value={car.topSpeed} unit="км/ч" label="Максимальная скорость" />
          <Readout value={car.torqueNm} unit="Н·м" label="Крутящий момент" />
        </dl>
      </section>

      <section className="section car-about">
        <div className="wrap car-about__grid">
          <div className="prose" data-reveal="up">
            <h2 className="h3">Об автомобиле</h2>
            {car.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="car-about__tags">
              {car.categories.map((c) => (
                <li key={c}>
                  <Link to={`/cars/?category=${c}`} className="chip">
                    {categoryLabels[c]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal="up" style={{ '--d': 120 } as React.CSSProperties}>
            <h2 className="h4 spec-title">Технические характеристики</h2>
            <dl className="spec-sheet">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="caption">Данные производителя. Цена и наличие автомобиля в Example — демонстрационные.</p>
          </div>
        </div>
      </section>

      <section className="section--tight car-gallery" id="gallery" aria-labelledby="car-gallery-title">
        <div className="wrap">
          <h2 className="h3" id="car-gallery-title">
            Галерея
          </h2>
          <div className="viewer">
            <button type="button" className="viewer__main" onClick={() => setLightbox(current)} aria-label="Открыть фото на весь экран">
              <Photo key={car.photos[current]} k={car.photos[current]} ratio={16 / 9} sizes="(min-width: 1100px) 80vw, 100vw" />
              <span className="viewer__expand">
                <Icon name="expand" /> На весь экран
              </span>
            </button>
            {car.photos.length > 1 ? (
              <div className="viewer__thumbs" role="tablist" aria-label="Фотографии автомобиля">
                {car.photos.map((p, i) => (
                  <button key={p} type="button" role="tab" aria-selected={current === i} className={current === i ? 'is-active' : ''} onClick={() => setCurrent(i)} aria-label={`Фото ${i + 1}`}>
                    <Photo k={p} ratio={16 / 10} sizes="200px" maxWidth={480} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <Lightbox slides={slides} index={lightbox} onIndex={setLightbox} label={`Фотографии ${carName(car)}`} />
      </section>

      <section className="section car-terms" aria-labelledby="car-terms-title">
        <div className="wrap car-terms__grid">
          <div>
            <h2 className="h3" id="car-terms-title">
              Стоимость и условия
            </h2>
            <table className="rate-table">
              <caption className="visually-hidden">Стоимость аренды {carName(car)}</caption>
              <thead>
                <tr>
                  <th scope="col">Срок</th>
                  <th scope="col">В сутки</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1–2 дня</td>
                  <td>{formatPrice(car.pricePerDay)}</td>
                </tr>
                {[...discountRules].reverse().map((r) => (
                  <tr key={r.minDays}>
                    <td>от {days(r.minDays)}</td>
                    <td>
                      {formatPrice(car.pricePerDay * (1 - r.rate))} <span className="caption">−{Math.round(r.rate * 100)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="terms-facts">
              <div>
                <dt>Залог</dt>
                <dd>{formatPrice(car.deposit)}</dd>
              </div>
              <div>
                <dt>Возраст водителя</dt>
                <dd>от {car.minAge} лет</dd>
              </div>
              <div>
                <dt>Пробег в сутки</dt>
                <dd>{car.mileagePerDay} км</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="h4">Условия аренды</h3>
            <ul className="check-list">
              {rentalTerms.map((t) => (
                <li key={t}>
                  <Icon name="check" /> {t}
                </li>
              ))}
            </ul>
            <h3 className="h4 car-terms__extras-title">Дополнительные услуги</h3>
            <ul className="extras-list">
              {rentalExtras.map((x) => (
                <li key={x.id}>
                  <span>{x.label}</span>
                  <span>
                    {formatPrice(x.price)}
                    {x.per === 'day' ? ' / сутки' : ''}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/terms/" className="text-link">
              Полные условия аренды <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section car-booking" id="booking" aria-labelledby="car-booking-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="car-booking-title" lines={['Забронировать', carName(car)]} className="h2" />
            <p className="lead">Выберите даты в календаре — стоимость с учётом скидок и дополнительных услуг посчитается сразу.</p>
          </div>
          <RentalForm key={car.slug} initialCar={car.slug} fixedCar initialStart={params.get('from')} initialEnd={params.get('to')} />
        </div>
      </section>

      <section className="section similar" aria-labelledby="similar-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="similar-title" lines={['Похожие', 'автомобили']} className="h2" />
            <Link to="/cars/" className="text-link">
              Весь автопарк <Icon name="arrow" />
            </Link>
          </div>
          <div className="cars-grid cars-grid--three">
            {similar.map((c) => (
              <CarCard key={c.slug} car={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
