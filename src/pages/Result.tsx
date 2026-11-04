import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { company } from '../data/company';
import { formatPrice } from '../lib/format';
import { findRequest, type StoredRequest } from '../lib/requests';
import { Link, useSearchParams } from '../router/router';

export function Success() {
  const [params] = useSearchParams();
  const number = params.get('n') ?? '';
  const [request, setRequest] = useState<StoredRequest | null | undefined>(undefined);

  useEffect(() => setRequest(number ? findRequest(number) ?? null : null), [number]);

  const isRental = request?.kind === 'rental';
  return (
    <section className="result section" aria-labelledby="result-title">
      <div className="wrap result__grid">
        <div>
          <Breadcrumbs items={[{ to: '/booking/', label: 'Booking' }, { label: 'Request sent' }]} />
          <span className="result__icon result__icon--ok" aria-hidden="true">
            <Icon name="check" />
          </span>
          <h1 className="h2" id="result-title">
            {request ? 'Request received' : 'Request sent'}
          </h1>
          {request ? (
            <>
              <p className="result__number" data-testid="request-number">
                <span className="caption">Request number</span>
                <span className="numeral">{request.number}</span>
              </p>
              <p className="lead">
                {request.contact.name}, thank you. A manager {isRental ? 'rental' : 'studio'} will confirm the details by phone {request.contact.phone}. Quote the request number if you want to change the date.
              </p>
            </>
          ) : request === null ? (
            <p className="lead">We could not find this request in this browser. If you sent it from another device, the number is in your confirmation e-mail.</p>
          ) : null}
          <p className="demo-note">
            <Icon name="info" />
            <span>This is a demonstration request: it is stored only in your browser. No car has been reserved, no payment taken and no e-mail sent.</span>
          </p>
          <div className="result__actions">
            <Link to="/" className="btn btn--primary">
              Home
            </Link>
            <Link to={isRental ? '/cars/' : '/detailing/'} className="btn btn--ghost">
              {isRental ? 'View the fleet' : 'Studio services'}
            </Link>
          </div>
        </div>
        {request ? (
          <aside className="summary result__summary" aria-label="Request details">
            <p className="summary__title">{request.title}</p>
            <dl className="summary__lines">
              {request.lines.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
              {typeof request.total === 'number' ? (
                <div className="summary__total">
                  <dt>{isRental ? 'Total' : 'Approximately'}</dt>
                  <dd>{formatPrice(request.total)}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

export function ErrorPage() {
  const [params] = useSearchParams();
  const detailing = params.get('type') === 'detailing';
  return (
    <section className="result section" aria-labelledby="error-title">
      <div className="wrap result__grid">
        <div>
          <Breadcrumbs items={[{ to: '/booking/', label: 'Booking' }, { label: 'Sending error' }]} />
          <span className="result__icon result__icon--error" aria-hidden="true">
            <Icon name="alert" />
          </span>
          <h1 className="h2" id="error-title">
            Request not sent
          </h1>
          <p className="lead">Something went wrong while sending. The form data was not saved — fill it in again or call us, and a manager will take the request by phone.</p>
          <div className="result__actions">
            <Link to={detailing ? '/booking/?type=detailing' : '/booking/'} className="btn btn--primary">
              Start again
            </Link>
            <a href={detailing ? company.phones.studio.href : company.phones.rental.href} className="btn btn--ghost">
              <Icon name="phone" /> {detailing ? company.phones.studio.display : company.phones.rental.display}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
