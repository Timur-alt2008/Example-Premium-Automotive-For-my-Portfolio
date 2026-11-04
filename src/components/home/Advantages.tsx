import { useEffect, useRef, useState } from 'react';
import { advantages } from '../../data/company';
import { Icon, type IconName } from '../ui/Icon';
import { Split } from '../ui/Split';

/** Sticky heading on the left; the item crossing the middle of the screen is lit. */
export function Advantages() {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>('[data-index]');
    if (!items?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.index)));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section advantages" aria-labelledby="advantages-title">
      <div className="wrap advantages__grid">
        <div className="advantages__head">
          <Split id="advantages-title" lines={['Why the cars', 'come back to us']} className="h2" />
          <p className="lead" data-reveal="up">
            Seven rules that never change — whether it is a rental McLaren or your family SUV.
          </p>
        </div>
        <ul className="advantages__list" ref={list}>
          {advantages.map((a, i) => (
            <li key={a.title} data-index={i} className={['advantage', active === i ? 'is-active' : ''].join(' ')}>
              <span className="advantage__icon" aria-hidden="true">
                <Icon name={a.icon as IconName} />
              </span>
              <div>
                <h3 className="h4">{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
