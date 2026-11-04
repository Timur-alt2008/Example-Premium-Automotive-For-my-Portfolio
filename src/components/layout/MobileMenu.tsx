import { useEffect, useRef } from 'react';
import { company } from '../../data/company';
import { lockScroll, unlockScroll } from '../../lib/scroll';
import { Link, useIsActive } from '../../router/router';
import { Icon } from '../ui/Icon';
import { mainNav } from './nav';

function MenuLink({ to, label, index, onClose }: { to: string; label: string; index: number; onClose: () => void }) {
  const active = useIsActive(to);
  return (
    <li style={{ '--i': index } as React.CSSProperties}>
      <Link to={to} className={['menu__link', active ? 'is-active' : ''].join(' ')} aria-current={active ? 'page' : undefined} onClick={onClose}>
        <span>{label}</span>
        <Icon name="arrowUpRight" />
      </Link>
    </li>
  );
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>('a')?.focus());
    return () => {
      unlockScroll();
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" className={['menu', open ? 'is-open' : ''].join(' ')} ref={ref} inert={!open} aria-hidden={!open}>
      <div className="menu__inner">
        <nav aria-label="Mobile navigation">
          <ul className="menu__list">
            {mainNav.map((item, i) => (
              <MenuLink key={item.to} {...item} index={i} onClose={onClose} />
            ))}
          </ul>
        </nav>
        <div className="menu__footer">
          <Link to="/booking/" className="btn btn--primary btn--block" onClick={onClose}>
            Book a car
          </Link>
          <Link to="/booking/?type=detailing" className="btn btn--ghost btn--block" onClick={onClose}>
            Book detailing
          </Link>
          <div className="menu__contacts">
            <a href={company.phones.rental.href}>
              <span className="caption">{company.phones.rental.label}</span>
              {company.phones.rental.display}
            </a>
            <a href={company.phones.studio.href}>
              <span className="caption">{company.phones.studio.label}</span>
              {company.phones.studio.display}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
