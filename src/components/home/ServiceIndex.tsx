import { useRef, useState, type PointerEvent } from 'react';
import { services } from '../../data/services';
import { formatPrice } from '../../lib/format';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

/** A typographic index of popular services; on desktop the photo follows the cursor. */
export function ServiceIndex() {
  const list = services.filter((s) => s.popular);
  const [active, setActive] = useState<number | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = preview.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - rect.left}px, ${e.clientY - rect.top}px, 0)`;
  };

  return (
    <section className="section service-index" aria-labelledby="services-title">
      <div className="wrap">
        <div className="section-head">
          <Split id="services-title" lines={['What people', 'come to us for']} className="h2" />
          <p className="lead" data-reveal="up">
            Prices are for coupés. For SUVs and cars with complex panels the specialist will confirm the price after inspection.
          </p>
        </div>
        <div className="service-index__list" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
          <div className={['service-index__preview', active !== null ? 'is-visible' : ''].join(' ')} ref={preview} aria-hidden="true">
            {list.map((s, i) => (
              <div key={s.slug} className={['service-index__frame', active === i ? 'is-active' : ''].join(' ')}>
                <Photo k={s.photo} ratio={4 / 5} sizes="320px" maxWidth={768} />
              </div>
            ))}
          </div>
          {list.map((s, i) => (
            <Link key={s.slug} to={`/detailing/${s.slug}/`} className={['service-row', active === i ? 'is-active' : ''].join(' ')} onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)} data-reveal="up">
              <span className="service-row__thumb" aria-hidden="true">
                <Photo k={s.photo} ratio={1} sizes="72px" maxWidth={480} />
              </span>
              <span className="service-row__name h3">{s.name}</span>
              <span className="service-row__summary">{s.summary}</span>
              <span className="service-row__duration caption">{s.duration}</span>
              <span className="service-row__price">
                {s.variablePrice ? 'from ' : ''}
                {formatPrice(s.priceFrom)}
              </span>
              <Icon name="arrowUpRight" className="service-row__arrow" />
            </Link>
          ))}
        </div>
        <div className="service-index__more">
          <Link to="/detailing/" className="btn btn--ghost">
            All 17 services and packages <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
