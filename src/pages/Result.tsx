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
          <Breadcrumbs items={[{ to: '/booking/', label: 'Бронирование' }, { label: 'Заявка отправлена' }]} />
          <span className="result__icon result__icon--ok" aria-hidden="true">
            <Icon name="check" />
          </span>
          <h1 className="h2" id="result-title">
            {request ? 'Заявка принята' : 'Заявка отправлена'}
          </h1>
          {request ? (
            <>
              <p className="result__number" data-testid="request-number">
                <span className="caption">Номер заявки</span>
                <span className="numeral">{request.number}</span>
              </p>
              <p className="lead">
                {request.contact.name}, спасибо. Менеджер {isRental ? 'аренды' : 'студии'} подтвердит детали по телефону {request.contact.phone}. Назовите номер заявки, если захотите изменить дату.
              </p>
            </>
          ) : request === null ? (
            <p className="lead">Мы не нашли данные заявки в этом браузере. Если вы отправили её с другого устройства, номер есть в письме-подтверждении.</p>
          ) : null}
          <p className="demo-note">
            <Icon name="info" />
            <span>Это демонстрационная заявка: она сохранена только в вашем браузере. Автомобиль не зарезервирован, оплата не списана, письмо не отправлялось.</span>
          </p>
          <div className="result__actions">
            <Link to="/" className="btn btn--primary">
              На главную
            </Link>
            <Link to={isRental ? '/cars/' : '/detailing/'} className="btn btn--ghost">
              {isRental ? 'Смотреть автопарк' : 'Услуги студии'}
            </Link>
          </div>
        </div>
        {request ? (
          <aside className="summary result__summary" aria-label="Детали заявки">
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
                  <dt>{isRental ? 'Итого' : 'Ориентировочно'}</dt>
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
          <Breadcrumbs items={[{ to: '/booking/', label: 'Бронирование' }, { label: 'Ошибка отправки' }]} />
          <span className="result__icon result__icon--error" aria-hidden="true">
            <Icon name="alert" />
          </span>
          <h1 className="h2" id="error-title">
            Заявка не отправлена
          </h1>
          <p className="lead">Во время отправки произошла ошибка. Данные формы не сохранились — заполните её ещё раз или позвоните нам, и менеджер оформит заявку по телефону.</p>
          <div className="result__actions">
            <Link to={detailing ? '/booking/?type=detailing' : '/booking/'} className="btn btn--primary">
              Заполнить заново
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
