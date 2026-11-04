import { useCallback, useId, useRef, useState, type PointerEvent } from 'react';
import type { BeforeAfterCase } from '../../data/content';
import { Photo } from '../ui/Photo';

/** Procedural defects drawn over the «before» state: swirl marks, stains or brake dust. */
function Defects({ kind }: { kind: BeforeAfterCase['defects'] }) {
  const id = useId().replace(/:/g, '');
  if (kind === 'swirls') {
    const rings = [
      [22, 30, 9],
      [58, 24, 13],
      [74, 62, 10],
      [36, 70, 12],
      [86, 32, 7],
      [12, 58, 8],
    ];
    return (
      <svg className="ba__defects" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id={`n${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.16 0" />
          </filter>
        </defs>
        <rect width="100" height="100" filter={`url(#n${id})`} />
        {rings.map(([cx, cy, r], i) => (
          <g key={i} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.12">
            {[1, 0.82, 0.64, 0.46, 0.3].map((f) => (
              <circle key={f} cx={cx} cy={cy} r={r * f} strokeDasharray={`${r * 0.9} ${r * 0.45}`} />
            ))}
          </g>
        ))}
      </svg>
    );
  }
  if (kind === 'stains') {
    return (
      <svg className="ba__defects" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id={`s${id}`}>
            <stop offset="0" stopColor="rgba(60,38,20,0.55)" />
            <stop offset="1" stopColor="rgba(60,38,20,0)" />
          </radialGradient>
          <filter id={`g${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="3" seed="9" />
            <feColorMatrix values="0 0 0 0 0.25  0 0 0 0 0.18  0 0 0 0 0.1  0 0 0 0.35 0" />
          </filter>
        </defs>
        <rect width="100" height="100" filter={`url(#g${id})`} />
        <ellipse cx="30" cy="62" rx="18" ry="12" fill={`url(#s${id})`} />
        <ellipse cx="64" cy="70" rx="14" ry="9" fill={`url(#s${id})`} />
        <ellipse cx="48" cy="40" rx="10" ry="7" fill={`url(#s${id})`} />
      </svg>
    );
  }
  return (
    <svg className="ba__defects" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id={`d${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="2" />
          <feColorMatrix values="0 0 0 0 0.32  0 0 0 0 0.27  0 0 0 0 0.2  0 0 0 0.75 -0.12" />
        </filter>
      </defs>
      <rect width="100" height="100" filter={`url(#d${id})`} />
    </svg>
  );
}

interface BeforeAfterProps {
  item: BeforeAfterCase;
  ratio?: number;
  sizes?: string;
}

/** Comparison slider. The divider is a line of inspection light; drag, tap or use the arrow keys. */
export function BeforeAfter({ item, ratio = 16 / 10, sizes = '(min-width: 1100px) 66vw, 100vw' }: BeforeAfterProps) {
  const [pos, setPos] = useState(52);
  const [dragging, setDragging] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const inputId = useId();

  const setFromClient = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClient(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => dragging && setFromClient(e.clientX);
  const onUp = () => setDragging(false);

  return (
    <figure className="ba">
      <div
        className={['ba__frame', dragging ? 'is-dragging' : ''].join(' ')}
        ref={frame}
        style={{ '--pos': `${pos}%`, aspectRatio: String(ratio) } as React.CSSProperties}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        data-testid="before-after"
      >
        <div className="ba__layer ba__layer--after">
          <Photo k={item.photo} ratio={ratio} sizes={sizes} alt={`После: ${item.title}`} />
        </div>
        <div className={`ba__layer ba__layer--before ba__layer--${item.defects}`} aria-hidden="true">
          <Photo k={item.photo} ratio={ratio} sizes={sizes} alt="" />
          <Defects kind={item.defects} />
        </div>
        <span className="ba__tag ba__tag--before">До</span>
        <span className="ba__tag ba__tag--after">После</span>
        <div className="ba__lamp" aria-hidden="true">
          <span className="ba__knob">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <label className="visually-hidden" htmlFor={inputId}>
          Положение разделителя «до» и «после»
        </label>
        <input id={inputId} className="ba__range" type="range" min={0} max={100} step={1} value={Math.round(pos)} onChange={(e) => setPos(Number(e.target.value))} />
      </div>
      <figcaption className="ba__caption">
        <span>
          <strong>{item.title}</strong> {item.service}
        </span>
        <span className="caption">{item.note} Исходное состояние показано как визуализация.</span>
      </figcaption>
    </figure>
  );
}
