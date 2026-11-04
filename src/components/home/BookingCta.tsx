import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

export function BookingCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media" data-parallax>
        <Photo k="tunnel" sizes="100vw" />
      </div>
      <div className="cta__shade" aria-hidden="true" />
      <div className="wrap cta__content">
        <Split id="cta-title" lines={['Ключи будут готовы', 'к вашему приезду']} className="h1 cta__title" />
        <p className="lead" data-reveal="up">
          Оставьте заявку — менеджер подтвердит время в течение 30 минут, а автомобиль пройдёт финальный осмотр перед выдачей.
        </p>
        <div className="cta__actions" data-reveal="up" style={{ '--d': 120 } as React.CSSProperties}>
          <Link to="/booking/" className="btn btn--primary">
            Забронировать автомобиль <Icon name="arrow" />
          </Link>
          <Link to="/booking/?type=detailing" className="btn btn--ghost">
            Записаться в студию
          </Link>
        </div>
      </div>
    </section>
  );
}
