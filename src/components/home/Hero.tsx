import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { cars } from '../../data/cars';
import { openStatus } from '../../data/company';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

/**
 * First screen. A line of inspection light crosses the frame and "develops" the car,
 * the way a detailer's lamp reveals paint. On desktop the light then follows the cursor.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(openStatus().text);
    const el = root.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    let ctx: gsap.Context | null = null;
    const start = () => {
    ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hero__veil', { autoAlpha: 0 });
        el.classList.add('is-ready');
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
      tl.fromTo('.hero__beam', { xPercent: -100, left: '0%', autoAlpha: 1 }, { left: '100%', xPercent: 0, duration: 1.7, ease: 'power2.inOut' }, 0)
        .fromTo('.hero__veil', { clipPath: 'inset(0 0 0 0%)' }, { clipPath: 'inset(0 0 0 100%)', duration: 1.7, ease: 'power2.inOut' }, 0)
        .to('.hero__beam', { autoAlpha: 0, duration: 0.4 }, 1.55)
        .fromTo('.hero__media .photo', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
        .fromTo('.hero__title .split-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.2, stagger: 0.12 }, 0.55)
        .fromTo('.hero__fade', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 1.05)
        .add(() => el.classList.add('is-ready'));

      gsap.to('.hero__media', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__content', {
        yPercent: -18,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'center center', end: 'bottom top', scrub: true },
      });
    }, el);
    };
    if (document.documentElement.classList.contains('is-loaded')) start();
    else window.addEventListener('example:ready', start, { once: true });
    return () => {
      window.removeEventListener('example:ready', start);
      ctx?.revert();
    };
  }, []);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--lx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    e.currentTarget.style.setProperty('--ly', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section className="hero" ref={root} onPointerMove={onMove} aria-labelledby="hero-title">
      <div className="hero__media">
        <Photo k="hero-silhouette" priority sizes="100vw" />
        <div className="hero__lamp" aria-hidden="true" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__beam" aria-hidden="true" />
      </div>
      <div className="hero__content wrap">
        <p className="hero__kicker hero__fade">Детейлинг-студия и коллекция суперкаров</p>
        <h1 className="hero__title h1 split" id="hero-title">
          <span className="split-line">
            <span>Безупречно</span>
          </span>
          <span className="split-line">
            <span>при любом свете</span>
          </span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__lead lead hero__fade">Мы проверяем каждую панель под тремя видами освещения — и только потом отдаём ключи. Будь то ваш автомобиль после полировки или McLaren из нашей коллекции.</p>
          <div className="hero__actions hero__fade">
            <Link to="/detailing/" className="btn btn--primary">
              Услуги студии <Icon name="arrow" />
            </Link>
            <Link to="/cars/" className="btn btn--ghost">
              Выбрать автомобиль
            </Link>
          </div>
        </div>
      </div>
      <div className="hero__meta wrap hero__fade">
        <p>
          <span className={['status-dot', status?.startsWith('Открыто') ? 'is-open' : ''].join(' ')} aria-hidden="true" />
          {status ?? 'Студия: ежедневно'}
        </p>
        <p>{cars.length} автомобилей в коллекции</p>
        <p>Свет 6500 K в каждом боксе</p>
      </div>
      <a href="#intro" className="hero__scroll hero__fade" aria-label="Прокрутить к следующему разделу">
        <span className="hero__scroll-track" aria-hidden="true">
          <span />
        </span>
      </a>
    </section>
  );
}
