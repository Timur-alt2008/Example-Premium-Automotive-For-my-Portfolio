import { useEffect, useMemo, useState } from 'react';
import { CarCard } from '../components/cars/CarCard';
import { Filters } from '../components/cars/Filters';
import { PageHero } from '../components/layout/PageHero';
import { Segmented } from '../components/ui/Form';
import { Icon } from '../components/ui/Icon';
import { Modal } from '../components/ui/Modal';
import { cars, categoryLabels, categoryNotes, type CarCategory } from '../data/cars';
import { activeFilterCount, applyFilters, defaultFilters, sortLabels, type CatalogFilters, type SortKey } from '../lib/catalog';
import { plural } from '../lib/format';
import { useSearchParams } from '../router/router';

const categoryKeys = Object.keys(categoryLabels) as CarCategory[];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const urlCategory = params.get('category');
  const urlSort = params.get('sort');
  const category: CatalogFilters['category'] = categoryKeys.includes(urlCategory as CarCategory) ? (urlCategory as CarCategory) : 'all';
  const sort: SortKey = urlSort && urlSort in sortLabels ? (urlSort as SortKey) : 'popular';

  const [filters, setFilters] = useState<CatalogFilters>({ ...defaultFilters, category });
  const [drawer, setDrawer] = useState(false);

  useEffect(() => setFilters((f) => ({ ...f, category })), [category]);

  const result = useMemo(() => applyFilters(cars, filters, sort), [filters, sort]);
  const active = activeFilterCount(filters);
  const reset = () => {
    setFilters({ ...defaultFilters, category: 'all' });
    setParams({ category: null, sort: null });
  };
  const resetFiltersOnly = () => setFilters({ ...defaultFilters, category: filters.category });

  return (
    <>
      <PageHero crumbs={[{ label: 'Автопарк' }]} title={['Автопарк']} lead="Четырнадцать автомобилей: от открытого 911 для побережья до Cullinan для семейного выезда. Наличие подтверждает менеджер после заявки." />

      <section className="catalog section--tight" aria-label="Каталог автомобилей">
        <div className="wrap">
          <Segmented
            label="Категория"
            value={category}
            onChange={(c) => setParams({ category: c === 'all' ? null : c })}
            options={[{ value: 'all' as const, label: 'Все', count: cars.length }, ...categoryKeys.map((c) => ({ value: c, label: categoryLabels[c], count: cars.filter((car) => car.categories.includes(c)).length }))]}
            className="catalog__categories"
          />
          {category !== 'all' ? <p className="catalog__category-note muted">{categoryNotes[category]}</p> : null}

          <div className="catalog__layout">
            <aside className="catalog__sidebar" aria-label="Фильтры">
              <Filters value={filters} onChange={setFilters} onReset={resetFiltersOnly} />
            </aside>

            <div className="catalog__main">
              <div className="catalog__toolbar">
                <p className="catalog__count" aria-live="polite" data-testid="result-count">
                  {result.length} {plural(result.length, ['автомобиль', 'автомобиля', 'автомобилей'])}
                </p>
                <button type="button" className="btn btn--ghost btn--small catalog__filters-btn" onClick={() => setDrawer(true)} aria-haspopup="dialog">
                  <Icon name="filter" /> Фильтры{active ? <span className="badge">{active}</span> : null}
                </button>
                <label className="sort">
                  <span className="visually-hidden">Сортировка</span>
                  <select value={sort} onChange={(e) => setParams({ sort: e.target.value === 'popular' ? null : e.target.value })} aria-label="Сортировка">
                    {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                      <option key={k} value={k}>
                        {sortLabels[k]}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevronDown" />
                </label>
              </div>

              {result.length ? (
                <div className="cars-grid" data-testid="cars-grid">
                  {result.map((car, i) => (
                    <CarCard key={car.slug} car={car} priority={i < 2} headingLevel="h2" sizes="(min-width: 1280px) 30vw, (min-width: 720px) 45vw, 100vw" />
                  ))}
                </div>
              ) : (
                <div className="empty" data-testid="empty-state">
                  <Icon name="search" />
                  <h2 className="h3">По этим параметрам автомобилей нет</h2>
                  <p className="muted">Попробуйте расширить диапазон цены или убрать часть фильтров. Мы также можем привезти автомобиль под заказ — напишите нам.</p>
                  <button type="button" className="btn btn--primary" onClick={reset}>
                    Сбросить все фильтры
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal open={drawer} onClose={() => setDrawer(false)} label="Фильтры автопарка" variant="sheet">
        <div className="drawer">
          <p className="h3">Фильтры</p>
          <Filters value={filters} onChange={setFilters} onReset={resetFiltersOnly} />
          <button type="button" className="btn btn--primary btn--block drawer__apply" onClick={() => setDrawer(false)}>
            Показать {result.length} {plural(result.length, ['автомобиль', 'автомобиля', 'автомобилей'])}
          </button>
        </div>
      </Modal>
    </>
  );
}
