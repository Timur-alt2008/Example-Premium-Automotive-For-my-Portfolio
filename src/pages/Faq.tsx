import { useMemo, useState } from 'react';
import { FaqList } from '../components/faq/FaqList';
import { PageHero } from '../components/layout/PageHero';
import { Segmented } from '../components/ui/Form';
import { Icon } from '../components/ui/Icon';
import { company } from '../data/company';
import { faq, faqCategoryLabels, type FaqCategory } from '../data/content';
import { Link } from '../router/router';

type Filter = 'all' | FaqCategory;

export default function Faq() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const groups = (Object.keys(faqCategoryLabels) as FaqCategory[]).filter((c) => filter === 'all' || c === filter);
  const q = query.trim().toLowerCase();
  const matches = useMemo(() => faq.filter((f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)), [q]);

  return (
    <>
      <PageHero crumbs={[{ label: 'Вопросы и ответы' }]} title={['Вопросы', 'и ответы']} lead="Собрали то, о чём спрашивают чаще всего: документы, залог, сроки работ и изменение заявки." />
      <section className="section--tight faq-page" aria-label="Вопросы">
        <div className="wrap faq-page__grid">
          <div className="faq-page__tools">
            <label className="search">
              <Icon name="search" />
              <span className="visually-hidden">Поиск по вопросам</span>
              <input type="search" placeholder="Например, залог" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <Segmented label="Раздел" value={filter} onChange={setFilter} options={[{ value: 'all' as const, label: 'Все' }, ...(Object.keys(faqCategoryLabels) as FaqCategory[]).map((c) => ({ value: c, label: faqCategoryLabels[c] }))]} />
            <div className="faq-page__help">
              <p className="h4">Не нашли ответ?</p>
              <p className="small muted">Позвоните или напишите — ответим в течение рабочего дня.</p>
              <a href={company.phones.rental.href} className="text-link">
                {company.phones.rental.display}
              </a>
              <Link to="/contacts/" className="text-link">
                Форма обратной связи <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className="faq-page__lists">
            {groups.map((c) => {
              const items = matches.filter((f) => f.category === c);
              if (!items.length) return null;
              return (
                <div key={c} className="faq-group">
                  <h2 className="h3">{faqCategoryLabels[c]}</h2>
                  <FaqList items={items} />
                </div>
              );
            })}
            {!groups.some((c) => matches.some((f) => f.category === c)) ? (
              <div className="empty">
                <Icon name="search" />
                <p className="h4">По запросу «{query}» ничего нет</p>
                <button type="button" className="btn btn--ghost btn--small" onClick={() => setQuery('')}>
                  Очистить поиск
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
