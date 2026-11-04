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
          Здесь пусто, как в боксе перед сменой
        </h1>
        <p className="lead">Страница переехала или её никогда не было. Проверьте адрес или выберите раздел.</p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            На главную <Icon name="arrow" />
          </Link>
          <Link to="/cars/" className="btn btn--ghost">
            Автопарк
          </Link>
          <Link to="/detailing/" className="btn btn--ghost">
            Детейлинг
          </Link>
        </div>
      </div>
    </section>
  );
}
