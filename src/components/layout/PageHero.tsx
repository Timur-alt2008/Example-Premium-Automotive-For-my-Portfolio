import type { ReactNode } from 'react';
import type { PhotoKey } from '../../data/media';
import { Link } from '../../router/router';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

export interface Crumb {
  to?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Навигационная цепочка">
      <ol>
        <li>
          <Link to="/">Главная</Link>
        </li>
        {items.map((c) => (
          <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

interface PageHeroProps {
  title: string[];
  lead?: ReactNode;
  crumbs: Crumb[];
  photo?: PhotoKey;
  children?: ReactNode;
  variant?: 'split' | 'plain';
}

/** Inner-page header: either a split layout with a tall photo, or text only. */
export function PageHero({ title, lead, crumbs, photo, children, variant = photo ? 'split' : 'plain' }: PageHeroProps) {
  return (
    <header className={`page-hero page-hero--${variant}`}>
      <div className="wrap page-hero__grid">
        <div className="page-hero__text">
          <Breadcrumbs items={crumbs} />
          <Split as="h1" lines={title} className="h1 page-hero__title" />
          {lead ? (
            <div className="lead page-hero__lead" data-reveal="rise" style={{ '--d': 200 } as React.CSSProperties}>
              {lead}
            </div>
          ) : null}
          {children ? (
            <div className="page-hero__actions" data-reveal="rise" style={{ '--d': 300 } as React.CSSProperties}>
              {children}
            </div>
          ) : null}
        </div>
        {photo ? (
          <div className="page-hero__media" data-reveal="rise">
            <Photo k={photo} ratio={4 / 5} priority sizes="(min-width: 900px) 42vw, 100vw" />
            <span className="page-hero__lamp" aria-hidden="true" />
          </div>
        ) : null}
      </div>
    </header>
  );
}
