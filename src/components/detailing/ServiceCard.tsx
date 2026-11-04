import { groupLabels, type Service } from '../../data/services';
import { formatPrice } from '../../lib/format';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

export function ServiceCard({ service }: { service: Service }) {
  const url = `/detailing/${service.slug}/`;
  const shown = service.includes.slice(0, 3);
  const more = service.includes.length - shown.length;
  return (
    <article className="service-card">
      <Link to={url} className="service-card__media" tabIndex={-1} aria-hidden="true">
        <Photo k={service.photo} ratio={3 / 2} sizes="(min-width: 1100px) 33vw, (min-width: 700px) 50vw, 100vw" maxWidth={1080} />
        <span className="service-card__group">{groupLabels[service.group]}</span>
      </Link>
      <div className="service-card__content">
        <h3 className="h4">
          <Link to={url}>{service.name}</Link>
        </h3>
        <p className="service-card__summary">{service.summary}</p>
        <ul className="service-card__includes">
          {shown.map((item) => (
            <li key={item}>
              <Icon name="check" /> {item}
            </li>
          ))}
          {more > 0 ? <li className="service-card__more">и ещё {more}</li> : null}
        </ul>
        <dl className="service-card__meta">
          <div>
            <dt>Время</dt>
            <dd>{service.duration}</dd>
          </div>
          <div>
            <dt>Стоимость</dt>
            <dd>
              {service.variablePrice ? 'от ' : ''}
              {formatPrice(service.priceFrom)}
            </dd>
          </div>
        </dl>
        <div className="service-card__actions">
          <Link to={url} className="btn btn--ghost btn--small" aria-label={`Подробнее об услуге «${service.name}»`}>
            Подробнее
          </Link>
          <Link to={`/booking/?type=detailing&service=${service.slug}`} className="btn btn--primary btn--small" aria-label={`Записаться: ${service.name}`}>
            Записаться
          </Link>
        </div>
      </div>
    </article>
  );
}
