import { getLenis } from './motion';

let locks = 0;

/** Locks page scroll while a modal or the mobile menu is open (nestable). */
export function lockScroll(): void {
  locks += 1;
  if (locks > 1) return;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar', `${scrollbar}px`);
  document.documentElement.classList.add('is-locked');
  getLenis()?.stop();
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.classList.remove('is-locked');
  getLenis()?.start();
}
