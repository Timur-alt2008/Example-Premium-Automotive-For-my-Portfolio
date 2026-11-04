import { company } from '../../data/company';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

export function Intro() {
  return (
    <section className="intro section" id="intro" aria-labelledby="intro-title">
      <div className="wrap intro__grid">
        <h2 className="visually-hidden" id="intro-title">
          About the company
        </h2>
        <p className="intro__statement" data-reveal="up">
          Example started with two bays and a single polisher. Today it is a 1,400 m² studio and fourteen cars, prepared by the same specialists who work on our clients’ cars.
        </p>
        <div className="intro__side" data-reveal="up" style={{ '--d': 150 } as React.CSSProperties}>
          <Photo k="wheel-light" ratio={4 / 5} sizes="(min-width: 900px) 28vw, 80vw" maxWidth={1080} />
          <p className="small muted">That is why a rented Huracán looks just like a car after our polishing: it is the same work and the same standard.</p>
          <Link to="/about/" className="text-link">
            About the studio and team <Icon name="arrow" />
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
