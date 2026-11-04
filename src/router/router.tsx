import { createContext, useCallback, useContext, useEffect, useMemo, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

declare const __BASE__: string;

/** Base path the site is served from, e.g. `/Example-Premium-Automotive-For-my-Portfolio`. */
export const BASE: string = typeof __BASE__ === 'string' ? __BASE__ : '';

export interface Location {
  /** Path inside the app, always starting and ending with `/` (except for files). */
  path: string;
  search: string;
  hash: string;
}

export function normalizePath(path: string): string {
  let p = path || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (!p.endsWith('/')) p += '/';
  return p.replace(/\/{2,}/g, '/');
}

export function stripBase(pathname: string): string {
  const p = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return normalizePath(p);
}

export function href(to: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(to)) return to;
  const [pathPart, rest = ''] = to.split(/(?=[?#])/);
  return BASE + normalizePath(pathPart) + rest;
}

function readLocation(): Location {
  return { path: stripBase(window.location.pathname), search: window.location.search, hash: window.location.hash };
}

interface RouterValue {
  location: Location;
  navigate: (to: string, options?: { replace?: boolean; scroll?: boolean }) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

const NAV_EVENT = 'example:navigate';

export function RouterProvider({ initial, children }: { initial?: Location; children: ReactNode }) {
  const [location, setLocation] = useState<Location>(() => initial ?? readLocation());

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener(NAV_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(NAV_EVENT, sync);
    };
  }, []);

  const navigate = useCallback<RouterValue['navigate']>((to, options = {}) => {
    const url = href(to);
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (url === current) return;
    if (options.replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    window.dispatchEvent(new CustomEvent(NAV_EVENT, { detail: { scroll: options.scroll !== false } }));
  }, []);

  const value = useMemo(() => ({ location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used inside RouterProvider');
  return ctx;
}

export function useSearchParams(): [URLSearchParams, (next: Record<string, string | null>) => void] {
  const { location, navigate } = useRouter();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const update = useCallback(
    (next: Record<string, string | null>) => {
      const merged = new URLSearchParams(location.search);
      Object.entries(next).forEach(([k, v]) => (v === null || v === '' ? merged.delete(k) : merged.set(k, v)));
      const qs = merged.toString();
      navigate(location.path + (qs ? `?${qs}` : ''), { replace: true, scroll: false });
    },
    [location.path, location.search, navigate],
  );
  return [params, update];
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string };

export function Link({ to, onClick, target, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const external = /^(https?:|mailto:|tel:)/.test(to);
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || external || target === '_blank') return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href(to)} onClick={handle} target={target} {...rest}>
      {children}
    </a>
  );
}

/** True when `path` is the current page or one of its children. */
export function useIsActive(path: string): boolean {
  const { location } = useRouter();
  const target = normalizePath(path);
  return target === '/' ? location.path === '/' : location.path.startsWith(target);
}
