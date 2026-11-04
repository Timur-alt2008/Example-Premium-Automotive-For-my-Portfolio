import { company } from '../../data/company';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

export function Intro() {
  return (
    <section className="intro section" id="intro" aria-labelledby="intro-title">
      <div className="wrap intro__grid">
        <h2 className="visually-hidden" id="intro-title">
          О компании
        </h2>
        <p className="intro__statement" data-reveal="up">
          Example начинался с двух постов и одной полировальной машинки. Сегодня это студия на 1 400 м² и четырнадцать автомобилей, которых готовят те же мастера, что работают с машинами клиентов.
        </p>
        <div className="intro__side" data-reveal="up" style={{ '--d': 150 } as React.CSSProperties}>
          <Photo k="wheel-light" ratio={4 / 5} sizes="(min-width: 900px) 28vw, 80vw" maxWidth={1080} />
          <p className="small muted">Поэтому арендованный Huracán выглядит так же, как машина после нашей полировки: это одна и та же работа и один и тот же стандарт.</p>
          <Link to="/about/" className="text-link">
            О студии и команде <Icon name="arrow" />
          </Link>
        </div>
        <dl className="intro__facts">
          {company.facts.map((f, i) => (
            <div key={f.label} data-reveal="up" style={{ '--d': i * 120 } as React.CSSProperties}>
              <dt className="numeral">
                {f.value}
                {f.unit ? <small>{f.unit}</small> : null}
              </dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
