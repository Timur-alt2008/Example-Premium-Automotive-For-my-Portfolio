import { useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { addDays, fromISO, MONTHS, monthGrid, toISO, WEEKDAYS } from '../../lib/dates';
import { Icon } from './Icon';

interface CalendarProps {
  mode: 'range' | 'single';
  start: string | null;
  end?: string | null;
  min: string;
  max: string;
  onChange: (start: string | null, end: string | null) => void;
  /** Dates that cannot be chosen (e.g. Sundays for the studio). */
  isDisabled?: (iso: string) => boolean;
  months?: 1 | 2;
  label: string;
}

/**
 * Accessible date picker. Range mode: first click picks the start, second click picks
 * the end; picking a date before the start restarts the range.
 */
export function Calendar({ mode, start, end = null, min, max, onChange, isDisabled, months = 1, label }: CalendarProps) {
  const initial = fromISO(start ?? min);
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() });
  const [hover, setHover] = useState<string | null>(null);
  const [focus, setFocus] = useState<string>(start ?? min);
  const grid = useRef<HTMLDivElement>(null);

  const minDate = fromISO(min);
  const maxDate = fromISO(max);
  const canPrev = view.y > minDate.getFullYear() || (view.y === minDate.getFullYear() && view.m > minDate.getMonth());
  const lastShown = new Date(view.y, view.m + months - 1, 1);
  const canNext = lastShown.getFullYear() < maxDate.getFullYear() || (lastShown.getFullYear() === maxDate.getFullYear() && lastShown.getMonth() < maxDate.getMonth());

  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const blocked = (iso: string) => iso < min || iso > max || Boolean(isDisabled?.(iso));

  const pick = (iso: string) => {
    if (blocked(iso)) return;
    if (mode === 'single') return onChange(iso, null);
    if (!start || (start && end) || iso <= start) return onChange(iso, null);
    onChange(start, iso);
  };

  const previewEnd = mode === 'range' && start && !end && hover && hover > start ? hover : end;

  const panels = useMemo(
    () =>
      Array.from({ length: months }, (_, i) => {
        const d = new Date(view.y, view.m + i, 1);
        return { y: d.getFullYear(), m: d.getMonth(), cells: monthGrid(d.getFullYear(), d.getMonth()) };
      }),
    [view, months],
  );

  const moveFocus = (iso: string) => {
    if (iso < min || iso > max) return;
    setFocus(iso);
    const d = fromISO(iso);
    const first = new Date(view.y, view.m, 1);
    const last = new Date(view.y, view.m + months, 0);
    if (d < first || d > last) setView({ y: d.getFullYear(), m: d.getMonth() });
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`)?.focus());
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, iso: string) => {
    const map: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in map) {
      e.preventDefault();
      moveFocus(addDays(iso, map[e.key]));
    }
  };

  const today = toISO(new Date());

  return (
    <div className={`calendar calendar--${months}`} aria-label={label} role="group">
      <div className="calendar__nav">
        <button type="button" className="calendar__arrow" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous month">
          <Icon name="chevronLeft" />
        </button>
        <button type="button" className="calendar__arrow" onClick={() => shift(1)} disabled={!canNext} aria-label="Next month">
          <Icon name="chevronRight" />
        </button>
      </div>
      <div className="calendar__panels" ref={grid} onMouseLeave={() => setHover(null)}>
        {panels.map((panel) => (
          <div className="calendar__month" key={`${panel.y}-${panel.m}`}>
            <p className="calendar__title" aria-live="polite">
              {MONTHS[panel.m]} {panel.y}
            </p>
            <div className="calendar__grid" role="grid">
              {WEEKDAYS.map((w) => (
                <span className="calendar__weekday" key={w} role="columnheader">
                  {w}
                </span>
              ))}
              {panel.cells.map((iso, i) => {
                if (!iso) return <span key={`e${i}`} className="calendar__empty" />;
                const disabled = blocked(iso);
                const isStart = iso === start;
                const isEnd = iso === (end ?? (mode === 'range' ? previewEnd : null));
                const inRange = mode === 'range' && start && previewEnd && iso > start && iso < previewEnd;
                const cls = ['calendar__day', isStart ? 'is-start' : '', isEnd ? 'is-end' : '', inRange ? 'is-range' : '', iso === today ? 'is-today' : '', disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');
                return (
                  <button
                    key={iso}
                    type="button"
                    className={cls}
                    data-date={iso}
                    disabled={disabled}
                    tabIndex={iso === focus ? 0 : -1}
                    aria-pressed={isStart || isEnd}
                    aria-label={`${Number(iso.slice(8))} ${MONTHS[panel.m]}${disabled ? ', unavailable' : ''}`}
                    onClick={() => pick(iso)}
                    onMouseEnter={() => setHover(iso)}
                    onFocus={() => setFocus(iso)}
                    onKeyDown={(e) => onKey(e, iso)}
                  >
                    {Number(iso.slice(8))}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
