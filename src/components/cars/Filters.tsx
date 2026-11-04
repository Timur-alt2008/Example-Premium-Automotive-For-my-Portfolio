import { bodyLabels, brands, type BodyType } from '../../data/cars';
import { defaultFilters, POWER_STEPS, PRICE_BOUNDS, type CatalogFilters } from '../../lib/catalog';
import { formatPrice } from '../../lib/format';

interface FiltersProps {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
  onReset: () => void;
}

function toggle<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

/** Filter controls. Every control changes the result immediately. */
export function Filters({ value, onChange, onReset }: FiltersProps) {
  const set = (patch: Partial<CatalogFilters>) => onChange({ ...value, ...patch });
  const [lo, hi] = PRICE_BOUNDS;
  const pct = (v: number) => ((v - lo) / (hi - lo)) * 100;

  return (
    <div className="filters" data-testid="filters">
      <fieldset className="filters__group">
        <legend>Марка</legend>
        <div className="chips">
          {brands.map((b) => (
            <button key={b} type="button" className={['chip', value.brands.includes(b) ? 'is-active' : ''].join(' ')} aria-pressed={value.brands.includes(b)} onClick={() => set({ brands: toggle(value.brands, b) })}>
              {b}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Тип кузова</legend>
        <div className="chips">
          {(Object.keys(bodyLabels) as BodyType[]).map((b) => (
            <button key={b} type="button" className={['chip', value.bodies.includes(b) ? 'is-active' : ''].join(' ')} aria-pressed={value.bodies.includes(b)} onClick={() => set({ bodies: toggle(value.bodies, b) })}>
              {bodyLabels[b]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Стоимость в сутки</legend>
        <p className="filters__range-value" aria-live="polite">
          {formatPrice(value.priceMin)} — {formatPrice(value.priceMax)}
        </p>
        <div className="dual-range" style={{ '--from': `${pct(value.priceMin)}%`, '--to': `${pct(value.priceMax)}%` } as React.CSSProperties}>
          <input
            type="range"
            min={lo}
            max={hi}
            step={10}
            value={value.priceMin}
            aria-label="Минимальная стоимость"
            onChange={(e) => set({ priceMin: Math.min(Number(e.target.value), value.priceMax - 50) })}
          />
          <input
            type="range"
            min={lo}
            max={hi}
            step={10}
            value={value.priceMax}
            aria-label="Максимальная стоимость"
            onChange={(e) => set({ priceMax: Math.max(Number(e.target.value), value.priceMin + 50) })}
          />
        </div>
        <div className="filters__inputs">
          <label>
            <span className="caption">от, €</span>
            <input type="number" inputMode="numeric" min={lo} max={value.priceMax} value={value.priceMin} onChange={(e) => set({ priceMin: Math.max(lo, Math.min(Number(e.target.value) || lo, value.priceMax)) })} />
          </label>
          <label>
            <span className="caption">до, €</span>
            <input type="number" inputMode="numeric" min={value.priceMin} max={hi} value={value.priceMax} onChange={(e) => set({ priceMax: Math.min(hi, Math.max(Number(e.target.value) || hi, value.priceMin)) })} />
          </label>
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Мощность</legend>
        <div className="chips">
          {POWER_STEPS.map((p) => (
            <button key={p} type="button" className={['chip', value.powerMin === p ? 'is-active' : ''].join(' ')} aria-pressed={value.powerMin === p} onClick={() => set({ powerMin: p })}>
              {p === 0 ? 'Любая' : `от ${p} л.с.`}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="filters__group">
        <legend>Количество мест</legend>
        <div className="chips">
          {[2, 4, 5].map((n) => (
            <button key={n} type="button" className={['chip', value.seats.includes(n) ? 'is-active' : ''].join(' ')} aria-pressed={value.seats.includes(n)} onClick={() => set({ seats: toggle(value.seats, n) })}>
              {n}
            </button>
          ))}
        </div>
      </fieldset>

      <button type="button" className="btn btn--ghost btn--small btn--block" onClick={onReset} disabled={JSON.stringify({ ...value, category: 'all' }) === JSON.stringify(defaultFilters)}>
        Сбросить фильтры
      </button>
    </div>
  );
}
