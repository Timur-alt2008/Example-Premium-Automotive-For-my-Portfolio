import { categoryLabels, type CarCategory } from '../../data/cars';
import { company, studioHours } from '../../data/company';
import { services } from '../../data/services';
import { Link } from '../../router/router';
import { Socials } from '../ui/Socials';

const year = 2026;

export function Footer() {
  const popular = services.filter((s) => s.popular).slice(0, 5);
  const weekday = studioHours[0];
  const saturday = studioHours[5];
  const sunday = studioHours[6];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__intro">
            <p className="footer__lede">A detailing studio and a car collection under one roof. We prepare every car as if it is about to be inspected under studio lights.</p>
            <div className="footer__cta">
              <Link to="/booking/" className="btn btn--primary">
                Book a car
              </Link>
              <Link to="/booking/?type=detailing" className="btn btn--ghost">
                Book at the studio
              </Link>
            </div>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <p className="footer__title">Studio</p>
              <ul>
                <li>
                  <Link to="/detailing/">All services and packages</Link>
                </li>
                {popular.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/detailing/${s.slug}/`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <p className="footer__title">Collection</p>
              <ul>
                <li>
                  <Link to="/cars/">The whole fleet</Link>
                </li>
                {(Object.keys(categoryLabels) as CarCategory[]).map((c) => (
                  <li key={c}>
                    <Link to={`/cars/?category=${c}`}>{categoryLabels[c]}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <p className="footer__title">Example</p>
              <ul>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/gallery/">Gallery of work</Link>
                </li>
                <li>
                  <Link to="/faq/">Questions and answers</Link>
                </li>
                <li>
                  <Link to="/contacts/">Contacts</Link>
                </li>
              </ul>
            </div>
            <div className="footer__col footer__col--contacts">
              <p className="footer__title">Contacts</p>
              <address>
                {company.address.street}
                <br />
                {company.address.district}
              </address>
              <a href={company.phones.rental.href}>{company.phones.rental.display}</a>
              <a href={company.phones.studio.href}>{company.phones.studio.display}</a>
              <a href={`mailto:${company.emails.general}`}>{company.emails.general}</a>
              <p className="footer__hours">
                Mon–Fri {weekday.open}–{weekday.close}
                <br />
                Sat {saturday.open}–{saturday.close}, Sun {sunday.open}–{sunday.close}
              </p>
            </div>
          </div>
        </div>
        <p className="footer__mega" aria-hidden="true">
          EXAMPLE
        </p>
        <div className="footer__bottom">
          <p className="caption">
            © {company.founded}–{year} Example. A fictional brand: contacts, prices and requests on this site are for demonstration only.
          </p>
          <nav className="footer__legal" aria-label="Legal information">
            <Link to="/privacy/">Privacy policy</Link>
            <Link to="/terms/">Rental terms</Link>
          </nav>
          <Socials />
        </div>
      </div>
    </footer>
  );
}
