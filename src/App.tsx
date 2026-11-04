import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { Footer } from './components/layout/Footer';
import { Header, SkipLink } from './components/layout/Header';
import { ToastProvider } from './components/ui/Toast';
import { observeReveals, usePageMeta } from './lib/hooks';
import { gsap, prefersReducedMotion, ScrollTrigger, scrollToElement, scrollToTop } from './lib/motion';
import About from './pages/About';
import Booking from './pages/Booking';
import CarPage from './pages/CarPage';
import Catalog from './pages/Catalog';
import Contacts from './pages/Contacts';
import Detailing from './pages/Detailing';
import Faq from './pages/Faq';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import { Privacy, Terms } from './pages/Legal';
import NotFound from './pages/NotFound';
import { ErrorPage, Success } from './pages/Result';
import ServicePage from './pages/ServicePage';
import { RouterProvider, useRouter, type Location } from './router/router';
import { matchRoute, type Match, type RouteName } from './router/routes';

const pages: Record<RouteName, ComponentType<{ slug: string }>> = {
  home: Home,
  detailing: Detailing,
  service: ServicePage,
  catalog: Catalog,
  car: CarPage,
  booking: Booking,
  success: Success,
  error: ErrorPage,
  gallery: Gallery,
  about: About,
  contacts: Contacts,
  faq: Faq,
  privacy: Privacy,
  terms: Terms,
  notFound: NotFound,
};

const scrollMemory = new Map<string, number>();
const OUT_MS = 340;
const IN_MS = 620;

function Page({ match }: { match: Match }) {
  const Component = pages[match.name];
  return <Component slug={match.params.slug ?? ''} />;
}

/** Swaps pages behind a curtain of light so route changes feel like one continuous space. */
function Shell() {
  const { location } = useRouter();
  const target = useMemo(() => matchRoute(location.path), [location.path]);
  const [shown, setShown] = useState<{ match: Match; path: string }>({ match: target, path: location.path });
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle');
  const lastPath = useRef(location.path);
  const main = useRef<HTMLElement>(null);
  const popped = useRef(false);

  usePageMeta(shown.match, shown.path);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    const onPop = () => (popped.current = true);
    window.addEventListener('popstate', onPop);
    const stop = observeReveals(document);
    return () => {
      window.removeEventListener('popstate', onPop);
      stop();
    };
  }, []);

  useEffect(() => {
    if (location.path === lastPath.current) {
      if (location.hash) {
        const el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el) scrollToElement(el);
      }
      return;
    }
    scrollMemory.set(lastPath.current, window.scrollY);
    lastPath.current = location.path;
    const restore = popped.current ? scrollMemory.get(location.path) ?? 0 : 0;
    popped.current = false;

    const swap = () => {
      setShown({ match: target, path: location.path });
      requestAnimationFrame(() => {
        const el = location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
        if (el) scrollToElement(el);
        else if (restore) window.scrollTo(0, restore);
        else scrollToTop();
        ScrollTrigger.refresh();
        main.current?.focus({ preventScroll: true });
      });
    };

    if (prefersReducedMotion()) {
      swap();
      return;
    }
    setPhase('out');
    const t1 = window.setTimeout(() => {
      swap();
      setPhase('in');
    }, OUT_MS);
    const t2 = window.setTimeout(() => setPhase('idle'), OUT_MS + IN_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.path, location.hash, target]);

  // Parallax for any element marked with data-parallax on the current page.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    }, main);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [shown.path]);

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" ref={main} tabIndex={-1} className={`main main--${shown.match.name}`} data-route={shown.match.name}>
        <Page key={shown.path} match={shown.match} />
      </main>
      <Footer />
      <div className={['curtain', phase !== 'idle' ? `is-${phase}` : ''].join(' ')} aria-hidden="true">
        <span className="curtain__beam" />
      </div>
    </>
  );
}

export function Root({ initial }: { initial?: Location }) {
  return (
    <RouterProvider initial={initial}>
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </RouterProvider>
  );
}
