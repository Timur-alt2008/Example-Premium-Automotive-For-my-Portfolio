import { useState } from 'react';
import { packageFeatures, packages, vehicleSizeLabels, type CarePackage, type VehicleSize } from '../../data/services';
import { formatPrice } from '../../lib/format';
import { Link } from '../../router/router';
import { Segmented } from '../ui/Form';
import { Icon } from '../ui/Icon';
import { Split } from '../ui/Split';

function Value({ v }: { v: boolean | string }) {
  if (v === true) return <Icon name="check" title="Входит" className="pkg-yes" />;
  if (v === false) return <span className="pkg-no" aria-label="Не входит">—</span>;
  return <span>{v}</span>;
}

/** Three packages side by side; on phones one package is shown at a time with the same rows. */
export function PackageCompare() {
  const [size, setSize] = useState<VehicleSize>('coupe');
  const [mobilePkg, setMobilePkg] = useState<CarePackage['id']>('premium');

  return (
    <section className="section packages" id="packages" aria-labelledby="packages-title">
      <div className="wrap">
        <div className="section-head">
          <Split id="packages-title" lines={['Три пакета', 'обслуживания']} className="h2" />
          <div data-reveal="up">
            <p className="lead">Пакет дешевле, чем те же услуги по отдельности, и проходит за один визит.</p>
            <Segmented label="Тип автомобиля" value={size} onChange={setSize} options={(Object.keys(vehicleSizeLabels) as VehicleSize[]).map((v) => ({ value: v, label: vehicleSizeLabels[v] }))} className="packages__size" />
          </div>
        </div>

        <Segmented label="Пакет для сравнения" value={mobilePkg} onChange={setMobilePkg} options={packages.map((p) => ({ value: p.id, label: p.name.split(' ')[0] }))} className="packages__mobile-switch" />

        <div className="pkg-table" role="table" aria-label="Сравнение пакетов обслуживания" data-active={mobilePkg}>
          <div className="pkg-row pkg-row--head" role="row">
            <div className="pkg-cell pkg-cell--label" role="columnheader">
              <span className="visually-hidden">Что входит</span>
            </div>
            {packages.map((p) => (
              <div key={p.id} className={['pkg-cell', `pkg-col--${p.id}`, p.id === 'premium' ? 'is-featured' : ''].join(' ')} role="columnheader">
                {p.id === 'premium' ? <span className="pkg-badge">Выбирают чаще всего</span> : null}
                <p className="pkg-name">{p.name}</p>
                <p className="pkg-pitch">{p.pitch}</p>
                <p className="pkg-price numeral" data-testid={`price-${p.id}`}>
                  {formatPrice(p.price[size])}
                </p>
                <p className="caption">
                  {p.duration}, {p.protection.toLowerCase()}
                </p>
                <Link to={`/booking/?type=detailing&package=${p.id}`} className={['btn btn--small btn--block', p.id === 'premium' ? 'btn--primary' : 'btn--ghost'].join(' ')}>
                  Выбрать {p.name.split(' ')[0]}
                </Link>
              </div>
            ))}
          </div>
          {packageFeatures.map((f) => (
            <div className="pkg-row" role="row" key={f.label}>
              <div className="pkg-cell pkg-cell--label" role="rowheader">
                {f.label}
              </div>
              {packages.map((p) => (
                <div key={p.id} className={['pkg-cell', `pkg-col--${p.id}`, p.id === 'premium' ? 'is-featured' : ''].join(' ')} role="cell">
                  <Value v={f.values[p.id]} />
                </div>
              ))}
            </div>
          ))}
          <div className="pkg-row" role="row">
            <div className="pkg-cell pkg-cell--label" role="rowheader">
              Бонусы пакета
            </div>
            {packages.map((p) => (
              <div key={p.id} className={['pkg-cell pkg-cell--extras', `pkg-col--${p.id}`, p.id === 'premium' ? 'is-featured' : ''].join(' ')} role="cell">
                {p.extras.join(', ')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
