import { ServiceCard } from '../components/detailing/ServiceCard';
import { Breadcrumbs } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { Split } from '../components/ui/Split';
import { processSteps } from '../data/company';
import { groupLabels, packagesWithService, serviceBySlug, services } from '../data/services';
import { formatPrice } from '../lib/format';
import { Link } from '../router/router';

export default function ServicePage({ slug }: { slug: string }) {
  const service = serviceBySlug(slug)!;
  const related = services.filter((s) => s.group === service.group && s.slug !== service.slug).slice(0, 3);
  const inPackages = packagesWithService(service.slug);

  return (
    <>
      <header className="service-hero">
        <div className="service-hero__media">
          <Photo k={service.photo} priority sizes="100vw" />
        </div>
        <div className="service-hero__shade" aria-hidden="true" />
        <div className="wrap service-hero__content">
          <Breadcrumbs items={[{ to: '/detailing/', label: 'Detailing' }, { label: service.name }]} />
          <p className="caption service-hero__group">{groupLabels[service.group]}</p>
          <Split as="h1" lines={[service.name]} className="h1 service-hero__title" />
          <p className="lead">{service.summary}</p>
          <dl className="service-hero__facts">
            <div>
              <dt>Opening hours</dt>
              <dd>{service.duration}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>
                {service.variablePrice ? 'from ' : ''}
                {formatPrice(service.priceFrom)}
              </dd>
            </div>
            <div>
              <dt>Result</dt>
              <dd>{service.result}</dd>
            </div>
          </dl>
          <div className="service-hero__actions">
            <Link to={`/booking/?type=detailing&service=${service.slug}`} className="btn btn--primary">
              Book a service <Icon name="arrow" />
            </Link>
            <Link to="/detailing/" className="btn btn--ghost">
              All services
            </Link>
          </div>
        </div>
      </header>

      <section className="section service-body">
        <div className="wrap service-body__grid">
          <div className="prose" data-reveal="up">
            <h2 className="h3">How we do it</h2>
            {service.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="service-body__includes" data-reveal="up" style={{ '--d': 120 } as React.CSSProperties}>
            <h2 className="h4">What’s included</h2>
            <ul className="check-list">
              {service.includes.map((item) => (
                <li key={item}>
                  <Icon name="check" /> {item}
                </li>
              ))}
            </ul>
            {inPackages.length ? (
              <p className="small muted">
                Included in packages: {inPackages.map((p) => p.name).join(', ')}.{' '}
                <Link to="/detailing/#packages" className="text-link">
                  Compare
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section--tight service-steps" aria-labelledby="service-steps-title">
        <div className="wrap">
          <h2 className="h3" id="service-steps-title">
            How it works
          </h2>
          <ol className="mini-steps">
            {processSteps.map((s, i) => (
              <li key={s.title} data-reveal="up" style={{ '--d': i * 80 } as React.CSSProperties}>
                <span className="numeral">{i + 1}</span>
                <p className="h4">{s.title}</p>
                <p className="small muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length ? (
        <section className="section related" aria-labelledby="related-title">
          <div className="wrap">
            <div className="section-head">
              <Split id="related-title" lines={['Often booked', 'together']} className="h2" />
            </div>
            <div className="services-grid">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
