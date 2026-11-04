import { useId, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';

interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** Disclosure with a smooth height transition driven by the measured content height. */
export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const inner = useRef<HTMLDivElement>(null);
  const height = open ? inner.current?.scrollHeight ?? 'auto' : 0;

  return (
    <div className={['accordion', open ? 'is-open' : ''].join(' ')}>
      <h3 className="accordion__heading">
        <button type="button" className="accordion__trigger" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)}>
          <span>{title}</span>
          <span className="accordion__icon" aria-hidden="true">
            <Icon name="plus" />
          </span>
        </button>
      </h3>
      <div id={id} className="accordion__panel" role="region" style={{ height: typeof height === 'number' ? `${height}px` : height }}>
        <div ref={inner} className="accordion__inner" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
}
