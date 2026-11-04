import { useEffect, useRef } from 'react';
import { processSteps } from '../../data/company';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { Split } from '../ui/Split';

/** Five-step sequence. A line of light runs along the steps as the section scrolls. */
export function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.process__beam', { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.process__track', start: 'top 75%', end: 'bottom 55%', scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>('.process__step').forEach((step) => {
        gsap.fromTo(step, { autoAlpha: 0.25 }, { autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: step, start: 'top 80%', end: 'top 55%', scrub: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section process" ref={root} aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-head">
          <Split id="process-title" lines={['Как проходит', 'работа в студии']} className="h2" />
          <p className="lead" data-reveal="up">
            От заявки до выдачи — пять шагов. На каждом вы получаете фотографии и знаете, что происходит с автомобилем.
          </p>
        </div>
        <div className="process__track">
          <span className="process__beam" aria-hidden="true" />
          <ol className="process__steps">
          {processSteps.map((s, i) => (
            <li className="process__step" key={s.title}>
              <span className="process__num numeral">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h4">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
