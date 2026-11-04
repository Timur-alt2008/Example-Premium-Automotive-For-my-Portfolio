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
  const slides = car.photos.map((p, i) => ({ photo: p, caption: `${carName(car)} — photo ${i + 1} of ${car.photos.length}` }));

  useEffect(() => setCurrent(0), [slug]);

  const specs: [string, string][] = [
    ['Engine', car.engine],
    ['Power', `${car.powerHp} hp (${car.powerKw} kW)`],
    ['Torque', `${formatNumber(car.torqueNm)} Nm`],
    ['0–100 km/h', `${formatDecimal(car.accel)} s`],
    ['Top speed', `${car.topSpeed} km/h${car.topSpeedLimited ? ', electronically limited' : ''}`],
    ['Transmission', car.gearbox],
    ['Drive', driveLabels[car.drive]],
    ['Body', bodyLabels[car.body]],
    ['Seats', seats(car.seats)],
    [car.weightNote === 'dry' ? 'Dry weight' : 'Kerb weight', `${formatNumber(car.weightKg)} kg`],
    ['Model year', String(car.year)],
    ['Colour', car.colour],
  ];

  return (
    <>
      <header className="car-hero">
        <div className="car-hero__media">
          <Photo k={car.photos[0]} priority sizes="100vw" />
        </div>
        <div className="car-hero__shade" aria-hidden="true" />
        <div className="wrap car-hero__content">
          <Breadcrumbs items={[{ to: '/cars/', label: 'Fleet' }, { label: carName(car) }]} />
          <p className="car-hero__brand">
            {car.brand}
            <span>{car.year}</span>
          </p>
          <Split as="h1" lines={[car.model]} className="h1 car-hero__title" />
          <p className="lead">{car.tagline}</p>
          <div className="car-hero__bar">
            <p className="car-hero__price">
              <span className="numeral">{formatPrice(car.pricePerDay)}</span>
              <span className="caption">per day, deposit {formatPrice(car.deposit)}</span>
            </p>
            <a href="#booking" className="btn btn--primary">
              Book <Icon name="arrow" />
            </a>
            <a href="#gallery" className="btn btn--ghost">
              Photos
            </a>
          </div>
        </div>
      </header>

      <section className="readouts" aria-label="Key specifications">
        <dl className="wrap readouts__grid">
          <Readout value={car.powerHp} unit="hp" label="Power" />
          <Readout value={car.accel} decimals={1} unit="s" label="0–100 km/h" />
          <Readout value={car.topSpeed} unit="km/h" label="Top speed" />
          <Readout value={car.torqueNm} unit="Nm" label="Torque" />
        </dl>
      </section>

      <section className="section car-about">
        <div className="wrap car-about__grid">
          <div className="prose" data-reveal="up">
            <h2 className="h3">About the car</h2>
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
            <h2 className="h4 spec-title">Technical specifications</h2>
            <dl className="spec-sheet">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="caption">Manufacturer data. Price and availability at Example are for demonstration only.</p>
          </div>
        </div>
      </section>

      <section className="section--tight car-gallery" id="gallery" aria-labelledby="car-gallery-title">
        <div className="wrap">
          <h2 className="h3" id="car-gallery-title">
            Gallery
          </h2>
          <div className="viewer">
            <button type="button" className="viewer__main" onClick={() => setLightbox(current)} aria-label="Open photo full screen">
              <Photo key={car.photos[current]} k={car.photos[current]} ratio={16 / 9} sizes="(min-width: 1100px) 80vw, 100vw" />
              <span className="viewer__expand">
                <Icon name="expand" /> Full screen
              </span>
            </button>
            {car.photos.length > 1 ? (
              <div className="viewer__thumbs" role="tablist" aria-label="Car photos">
                {car.photos.map((p, i) => (
                  <button key={p} type="button" role="tab" aria-selected={current === i} className={current === i ? 'is-active' : ''} onClick={() => setCurrent(i)} aria-label={`Photo ${i + 1}`}>
                    <Photo k={p} ratio={16 / 10} sizes="200px" maxWidth={480} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <Lightbox slides={slides} index={lightbox} onIndex={setLightbox} label={`Photos ${carName(car)}`} />
      </section>

      <section className="section car-terms" aria-labelledby="car-terms-title">
        <div className="wrap car-terms__grid">
          <div>
            <h2 className="h3" id="car-terms-title">
              Price and terms
            </h2>
            <table className="rate-table">
              <caption className="visually-hidden">Rental price {carName(car)}</caption>
              <thead>
                <tr>
                  <th scope="col">Duration</th>
                  <th scope="col">Per day</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1–2 days</td>
                  <td>{formatPrice(car.pricePerDay)}</td>
                </tr>
                {[...discountRules].reverse().map((r) => (
                  <tr key={r.minDays}>
                    <td>from {days(r.minDays)}</td>
                    <td>
                      {formatPrice(car.pricePerDay * (1 - r.rate))} <span className="caption">−{Math.round(r.rate * 100)}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <dl className="terms-facts">
              <div>
                <dt>Deposit</dt>
                <dd>{formatPrice(car.deposit)}</dd>
              </div>
              <div>
                <dt>Driver age</dt>
                <dd>{car.minAge}+</dd>
              </div>
              <div>
                <dt>Mileage per day</dt>
                <dd>{car.mileagePerDay} km</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="h4">Rental terms</h3>
            <ul className="check-list">
              {rentalTerms.map((t) => (
                <li key={t}>
                  <Icon name="check" /> {t}
                </li>
              ))}
            </ul>
            <h3 className="h4 car-terms__extras-title">Extras</h3>
            <ul className="extras-list">
              {rentalExtras.map((x) => (
                <li key={x.id}>
                  <span>{x.label}</span>
                  <span>
                    {formatPrice(x.price)}
                    {x.per === 'day' ? ' / day' : ''}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/terms/" className="text-link">
              Full rental terms <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section car-booking" id="booking" aria-labelledby="car-booking-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="car-booking-title" lines={['Book', carName(car)]} className="h2" />
            <p className="lead">Choose dates in the calendar — the price with discounts and extras is calculated instantly.</p>
          </div>
          <RentalForm key={car.slug} initialCar={car.slug} fixedCar initialStart={params.get('from')} initialEnd={params.get('to')} />
        </div>
      </section>

      <section className="section similar" aria-labelledby="similar-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="similar-title" lines={['Similar', 'cars']} className="h2" />
            <Link to="/cars/" className="text-link">
              The whole fleet <Icon name="arrow" />
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
