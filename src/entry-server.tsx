import { renderToString } from 'react-dom/server';
import { Root } from './App';
import { allPaths, matchRoute, metaFor, ogImage } from './router/routes';
import { photoSrcSet } from './data/media';

/** Renders a route to HTML for the static build. */
export function render(path: string): string {
  return renderToString(<Root initial={{ path, search: '', hash: '' }} />);
}

export { allPaths, matchRoute, metaFor, ogImage, photoSrcSet };
