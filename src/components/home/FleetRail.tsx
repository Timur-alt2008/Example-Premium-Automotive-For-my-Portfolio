import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { carBySlug, cars, categoryLabels, featuredCarSlugs, type Car, type CarCategory } from '../../data/cars';
import { Link } from '../../router/router';
import { CarCard } from '../cars/CarCard';
import { Icon } from '../ui/Icon';
import { Split } from '../ui/Split';

/** Horizontal rail of featured cars: scroll, drag with the mouse, or use the arrows. */
export function FleetRail() {
  const featured = featuredCarSlugs.map((s) => carBySlug(s)).filter(Boolean) as Car[];
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const step = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.rail__item');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 24), behavior: 'smooth' });
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) {
      d.moved = true;
      e.currentTarget.classList.add('is-dragging');
    }
    e.currentTarget.scrollLeft = d.left - dx;
  };
  const onUp = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('is-dragging');
    window.setTimeout(() => (drag.current = null), 0);
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section className="section fleet" aria-labelledby="fleet-title">
      <div className="wrap">
        <div className="section-head">
          <Split id="fleet-title" lines={['The collection', 'today']} className="h2" />
          <div className="fleet__head-side" data-reveal="up">
            <p className="lead">Every car is detailed before every handover. Mileage and condition are recorded on photos together with you.</p>
            <div className="fleet__arrows">
              <button type="button" className="icon-btn" onClick={() => step(-1)} disabled={edges.start} aria-label="Previous cars">
                <Icon name="arrowLeft" />
              </button>
              <button type="button" className="icon-btn" onClick={() => step(1)} disabled={edges.end} aria-label="Next cars">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="rail" ref={rail} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} onClickCapture={onClickCapture} tabIndex={0} aria-label="Featured cars, scrolls horizontally">
        {featured.map((car) => (
          <div className="rail__item" key={car.slug}>
            <CarCard car={car} sizes="(min-width: 1100px) 36vw, (min-width: 700px) 60vw, 86vw" />
          </div>
        ))}
        <div className="rail__item rail__item--end">
          <Link to="/cars/" className="rail__all">
            <span className="h3">More {cars.length - featured.length} cars</span>
            <span className="text-link">
              The whole fleet <Icon name="arrow" />
            </span>
          </Link>
        </div>
      </div>
      <div className="wrap">
        <ul className="fleet__categories" aria-label="Fleet categories">
          {(Object.keys(categoryLabels) as CarCategory[]).map((c) => (
            <li key={c}>
              <Link to={`/cars/?category=${c}`} className="chip">
                {categoryLabels[c]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
