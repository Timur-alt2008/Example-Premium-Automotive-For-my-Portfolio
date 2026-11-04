import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

export function BookingCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media" data-parallax>
        <Photo k="tunnel" sizes="100vw" />
      </div>
      <div className="cta__shade" aria-hidden="true" />
      <div className="wrap cta__content">
        <Split id="cta-title" lines={['The keys will be ready', 'by the time you arrive']} className="h1 cta__title" />
        <p className="lead" data-reveal="up">
          Send a request — a manager will confirm the time within 30 minutes, and the car will get a final inspection before handover.
        </p>
        <div className="cta__actions" data-reveal="up" style={{ '--d': 120 } as React.CSSProperties}>
          <Link to="/booking/" className="btn btn--primary">
            Book a car <Icon name="arrow" />
          </Link>
          <Link to="/booking/?type=detailing" className="btn btn--ghost">
            Book at the studio
          </Link>
        </div>
      </div>
    </section>
  );
}
