import { useEffect, useState } from 'react';
import { metaFor, ogImage, type Match } from '../router/routes';
import { BASE } from '../router/router';

/** False during server rendering and the first client render; true after hydration. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function useMediaQuery(query: string, fallback = false): boolean {
  const [matches, setMatches] = useState(fallback);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

const SITE = 'https://timur-alt2008.github.io';

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

/** Keeps the document head in sync with the current route during client-side navigation. */
export function usePageMeta(match: Match, path: string): void {
  useEffect(() => {
    const meta = metaFor(match);
    document.title = meta.title;
    const url = SITE + BASE + path;
    setMeta('meta[name="description"]', 'content', meta.description);
    setMeta('meta[property="og:title"]', 'content', meta.title);
    setMeta('meta[property="og:description"]', 'content', meta.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', ogImage(meta));
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[name="robots"]', 'content', meta.noindex ? 'noindex, follow' : 'index, follow');
  }, [match, path]);
}

/** Observes elements marked with data-reveal / data-split and adds .is-in when they enter. */
export function observeReveals(root: ParentNode = document): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  // Elements revealed with clip-path are fully clipped at first, and Chrome applies the
  // target's own clip-path when computing intersections, so their parent is observed instead.
  const targets = new Map<Element, Element[]>();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (targets.get(entry.target) ?? []).forEach((el) => el.classList.add('is-in'));
        targets.delete(entry.target);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  const scan = () =>
    root.querySelectorAll('[data-reveal]:not(.is-in), [data-split]:not(.is-in)').forEach((el) => {
      const target = (el as HTMLElement).dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el;
      const list = targets.get(target);
      if (list) {
        if (!list.includes(el)) list.push(el);
        return;
      }
      targets.set(target, [el]);
      io.observe(target);
    });
  scan();
  const mo = new MutationObserver(scan);
  mo.observe(root instanceof Document ? root.body : (root as Node), { childList: true, subtree: true });
  return () => {
    io.disconnect();
    mo.disconnect();
  };
}
