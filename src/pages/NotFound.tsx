import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { Link } from '../router/router';

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <div className="not-found__media" aria-hidden="true">
        <Photo k="corridor" sizes="100vw" alt="" />
      </div>
      <div className="not-found__shade" aria-hidden="true" />
      <div className="wrap not-found__content">
        <p className="not-found__code numeral" aria-hidden="true">
          404
        </p>
        <h1 className="h2" id="nf-title">
          Empty, like a bay before a shift
        </h1>
        <p className="lead">The page has moved or never existed. Check the address or choose a section.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            Home <Icon name="arrow" />
          </Link>
          <Link to="/cars/" className="btn btn--ghost">
            Fleet
          </Link>
          <Link to="/detailing/" className="btn btn--ghost">
            Detailing
          </Link>
        </div>
      </div>
    </section>
  );
}
