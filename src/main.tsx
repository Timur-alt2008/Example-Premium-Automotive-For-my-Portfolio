import { createRoot, hydrateRoot } from 'react-dom/client';
import { Root } from './App';
import { startSmoothScroll } from './lib/motion';
import { stripBase } from './router/router';
import './styles/index.css';

const container = document.getElementById('root')!;
const path = stripBase(window.location.pathname);

if (container.hasChildNodes()) {
  // The server rendered this path without query parameters; hydrate with the same input,
  // the router then picks up ?search and #hash right after hydration.
  hydrateRoot(container, <Root initial={{ path, search: '', hash: '' }} />);
} else {
  createRoot(container).render(<Root />);
}

startSmoothScroll();

const html = document.documentElement;
const reveal = () => {
  html.classList.add('is-loaded');
  window.dispatchEvent(new Event('example:ready'));
};
const fonts = 'fonts' in document ? document.fonts.ready : Promise.resolve();
Promise.race([fonts, new Promise((r) => setTimeout(r, 700))]).then(() => requestAnimationFrame(reveal));
