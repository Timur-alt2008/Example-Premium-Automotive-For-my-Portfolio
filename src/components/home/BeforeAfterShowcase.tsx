import { useState } from 'react';
import { beforeAfterCases } from '../../data/content';
import { Link } from '../../router/router';
import { BeforeAfter } from '../detailing/BeforeAfter';
import { Icon } from '../ui/Icon';
import { Split } from '../ui/Split';

export function BeforeAfterShowcase({ title = ['Разница видна', 'под светом'] }: { title?: string[] }) {
  const [index, setIndex] = useState(0);
  const item = beforeAfterCases[index];
  return (
    <section className="section ba-showcase" aria-labelledby="ba-title">
      <div className="wrap ba-showcase__grid">
        <div className="ba-showcase__head">
          <Split id="ba-title" lines={title} className="h2" />
          <p className="lead" data-reveal="up">
            Проведите линией света по фото, чтобы сравнить состояние до и после работы.
          </p>
          <div className="ba-showcase__tabs" role="tablist" aria-label="Примеры работ">
            {beforeAfterCases.map((c, i) => (
              <button key={c.title} type="button" role="tab" aria-selected={index === i} className={['ba-tab', index === i ? 'is-active' : ''].join(' ')} onClick={() => setIndex(i)}>
                <span className="ba-tab__title">{c.title}</span>
                <span className="caption">{c.service}</span>
              </button>
            ))}
          </div>
          <Link to={`/detailing/${item.serviceSlug}/`} className="text-link">
            Об услуге «{item.service}» <Icon name="arrow" />
          </Link>
        </div>
        <div className="ba-showcase__stage" role="tabpanel" aria-label={item.title}>
          <BeforeAfter key={item.title} item={item} />
        </div>
      </div>
    </section>
  );
}
