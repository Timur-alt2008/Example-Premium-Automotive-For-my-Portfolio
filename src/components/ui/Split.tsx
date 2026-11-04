import { createElement, type ElementType } from 'react';

interface SplitProps {
  /** Lines of the heading. Each line is masked and rises on reveal. */
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}

/** Heading whose lines rise out of a mask when they enter the viewport. */
export function Split({ lines, as = 'h2', className, delay = 0, id }: SplitProps) {
  return createElement(
    as,
    { className: ['split', className].filter(Boolean).join(' '), 'data-split': '', style: { '--d': delay } as React.CSSProperties, id },
    lines.map((line, i) => (
      <span className="split-line" key={i} style={{ '--i': i } as React.CSSProperties}>
        <span>{line}</span>
      </span>
    )),
  );
}
