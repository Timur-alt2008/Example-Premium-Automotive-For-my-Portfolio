import { company, studioHours } from '../../data/company';
import { useMounted } from '../../lib/hooks';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { StylizedMap } from '../ui/StylizedMap';

export function HoursList() {
  const mounted = useMounted();
  const today = mounted ? new Date().getDay() : -1;
  return (
    <ul className="hours">
      {studioHours.map((h) => (
        <li key={h.day} className={h.day === today ? 'is-today' : ''}>
          <span>{h.label}</span>
          <span>{h.open && h.close ? `${h.open}–${h.close}` : 'Closed'}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContactStrip() {
  return (
    <section className="section contact-strip" aria-labelledby="contact-strip-title">
      <div className="wrap contact-strip__grid">
        <div className="contact-strip__info">
          <h2 className="h2" id="contact-strip-title" data-reveal="up">
            Visit the studio
          </h2>
          <address className="contact-strip__address" data-reveal="up">
            <Icon name="pin" />
            <span>
              {company.address.street}, {company.address.district}
              <span className="caption">{company.address.note}</span>
            </span>
          </address>
          <div className="contact-strip__phones" data-reveal="up">
            {Object.values(company.phones).map((p) => (
              <a key={p.href} href={p.href} className="contact-card">
                <span className="caption">{p.label}</span>
                <span className="contact-card__value">{p.display}</span>
              </a>
            ))}
          </div>
          <Link to="/contacts/" className="text-link">
            All contacts and a contact form <Icon name="arrow" />
          </Link>
        </div>
        <div className="contact-strip__map" data-reveal="up">
          <StylizedMap />
          <HoursList />
        </div>
      </div>
    </section>
  );
}
