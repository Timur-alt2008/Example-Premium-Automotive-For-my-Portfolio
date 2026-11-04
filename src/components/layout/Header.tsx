import { useEffect, useState } from 'react';
import { company } from '../../data/company';
import { Link, useIsActive, useRouter } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { mainNav } from './nav';

function NavLink({ to, label }: { to: string; label: string }) {
  const active = useIsActive(to);
  return (
    <Link to={to} className={['nav__link', active ? 'is-active' : ''].join(' ')} aria-current={active ? 'page' : undefined}>
      {label}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { location } = useRouter();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.path]);

  return (
    <>
      <header className={['header', scrolled ? 'is-scrolled' : '', hidden && !menuOpen ? 'is-hidden' : ''].filter(Boolean).join(' ')}>
        <div className="header__inner wrap">
          <Logo />
          <nav className="nav" aria-label="Основная навигация">
            {mainNav.map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
          </nav>
          <div className="header__actions">
            <a className="header__phone" href={company.phones.rental.href}>
              {company.phones.rental.display}
            </a>
            <Link to="/booking/" className="btn btn--primary btn--small header__cta">
              Забронировать
            </Link>
            <button type="button" className="header__burger" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((v) => !v)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

export function SkipLink() {
  return (
    <a className="skip-link" href="#main">
      Перейти к содержанию <Icon name="arrow" />
    </a>
  );
}
