/**
 * Animation runtime. GSAP, ScrollTrigger and Lenis load in a separate chunk after the
 * first paint, so they never block rendering of the page itself.
 */
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type LenisType from 'lenis';

export interface Motion {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
}

let pending: Promise<Motion> | null = null;
let loaded: Motion | null = null;
let lenis: LenisType | null = null;

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function loadMotion(): Promise<Motion> {
  pending ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
    g.gsap.registerPlugin(st.ScrollTrigger);
    loaded = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
    return loaded;
  });
  return pending;
}

/** Recalculates scroll-driven animations after layout changes (no-op until loaded). */
export function refreshScroll(): void {
  loaded?.ScrollTrigger.refresh();
}

/** Smooth scrolling for fine pointers only; touch devices keep native momentum scrolling. */
export async function startSmoothScroll(): Promise<void> {
  if (lenis || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
  const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([loadMotion(), import('lenis')]);
  lenis = new Lenis({ duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function getLenis(): LenisType | null {
  return lenis;
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
}

export function scrollToElement(el: Element): void {
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -100 });
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
