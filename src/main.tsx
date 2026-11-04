import { createRoot, hydrateRoot } from 'react-dom/client';
import { Root } from './App';
import { loadMotion, startSmoothScroll } from './lib/motion';
import { loadPage } from './pages/registry';
import { matchRoute } from './router/routes';
import { stripBase } from './router/router';
import './styles/index.css';

const container = document.getElementById('root')!;
const path = stripBase(window.location.pathname);

loadPage(matchRoute(path).name).then(() => {
  if (container.hasChildNodes()) {
    // The server rendered this path without query parameters; hydrate with the same input,
    // the router then picks up ?search and #hash right after hydration.
    hydrateRoot(container, <Root initial={{ path, search: '', hash: '' }} />);
  } else {
    createRoot(container).render(<Root />);
  }
  void startSmoothScroll();
  void loadMotion();
});

const html = document.documentElement;
const reveal = () => {
  html.classList.add('is-loaded');
  window.dispatchEvent(new Event('example:ready'));
};
const fonts = 'fonts' in document ? document.fonts.ready : Promise.resolve();
Promise.race([fonts, new Promise((r) => setTimeout(r, 600))]).then(() => setTimeout(reveal, 16));
