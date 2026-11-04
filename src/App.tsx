import { useEffect, useMemo, useRef, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header, SkipLink } from './components/layout/Header';
import { ToastProvider } from './components/ui/Toast';
import { observeReveals, usePageMeta } from './lib/hooks';
import { loadMotion, prefersReducedMotion, refreshScroll, scrollToElement, scrollToTop } from './lib/motion';
import { loadedPage, loadPage } from './pages/registry';
import { RouterProvider, useRouter, type Location } from './router/router';
import { matchRoute, type Match } from './router/routes';


const scrollMemory = new Map<string, number>();
const OUT_MS = 340;
const IN_MS = 620;

function Page({ match }: { match: Match }) {
  const Component = loadedPage(match.name);
  return Component ? <Component slug={match.params.slug ?? ''} /> : null;
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
        refreshScroll();
        main.current?.focus({ preventScroll: true });
      });
    };

    let cancelled = false;
    let t2 = 0;
    const page = loadPage(target.name);
    if (prefersReducedMotion()) {
      page.then(() => !cancelled && swap());
      return () => {
        cancelled = true;
      };
    }
    setPhase('out');
    const delay = new Promise((r) => window.setTimeout(r, OUT_MS));
    Promise.all([page, delay]).then(() => {
      if (cancelled) return;
      swap();
      setPhase('in');
      t2 = window.setTimeout(() => setPhase('idle'), IN_MS);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(t2);
    };
  }, [location.path, location.hash, target]);

  // Parallax for any element marked with data-parallax on the current page.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let ctx: { revert: () => void } | null = null;
    let alive = true;
    loadMotion().then(({ gsap }) => {
      if (!alive) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.fromTo(el, { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }, main);
    });
    const refresh = window.setTimeout(refreshScroll, 800);
    return () => {
      alive = false;
      window.clearTimeout(refresh);
      ctx?.revert();
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
