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
            <p className="footer__lede">Детейлинг-студия и коллекция автомобилей под одной крышей. Готовим каждую машину так, будто её проверят под студийным светом.</p>
            <div className="footer__cta">
              <Link to="/booking/" className="btn btn--primary">
                Забронировать автомобиль
              </Link>
              <Link to="/booking/?type=detailing" className="btn btn--ghost">
                Записаться в студию
              </Link>
            </div>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <p className="footer__title">Студия</p>
              <ul>
                <li>
                  <Link to="/detailing/">Все услуги и пакеты</Link>
                </li>
                {popular.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/detailing/${s.slug}/`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <p className="footer__title">Коллекция</p>
              <ul>
                <li>
                  <Link to="/cars/">Весь автопарк</Link>
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
                  <Link to="/about/">О студии</Link>
                </li>
                <li>
                  <Link to="/gallery/">Галерея работ</Link>
                </li>
                <li>
                  <Link to="/faq/">Вопросы и ответы</Link>
                </li>
                <li>
                  <Link to="/contacts/">Контакты</Link>
                </li>
              </ul>
            </div>
            <div className="footer__col footer__col--contacts">
              <p className="footer__title">Контакты</p>
              <address>
                {company.address.street}
                <br />
                {company.address.district}
              </address>
              <a href={company.phones.rental.href}>{company.phones.rental.display}</a>
              <a href={company.phones.studio.href}>{company.phones.studio.display}</a>
              <a href={`mailto:${company.emails.general}`}>{company.emails.general}</a>
              <p className="footer__hours">
                Пн–Пт {weekday.open}–{weekday.close}
                <br />
                Сб {saturday.open}–{saturday.close}, Вс {sunday.open}–{sunday.close}
              </p>
            </div>
          </div>
        </div>
        <p className="footer__mega" aria-hidden="true">
          EXAMPLE
        </p>
        <div className="footer__bottom">
          <p className="caption">
            © {company.founded}–{year} Example. Вымышленный бренд: контакты, цены и заявки на сайте демонстрационные.
          </p>
          <nav className="footer__legal" aria-label="Юридическая информация">
            <Link to="/privacy/">Политика конфиденциальности</Link>
            <Link to="/terms/">Условия аренды</Link>
          </nav>
          <Socials />
        </div>
      </div>
    </footer>
  );
}
