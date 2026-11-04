import { useMemo, useState } from 'react';
import { BeforeAfterShowcase } from '../components/home/BeforeAfterShowcase';
import { Process } from '../components/home/Process';
import { LayerAnatomy } from '../components/detailing/LayerAnatomy';
import { PackageCompare } from '../components/detailing/PackageCompare';
import { ServiceCard } from '../components/detailing/ServiceCard';
import { FaqList } from '../components/faq/FaqList';
import { PageHero } from '../components/layout/PageHero';
import { Segmented } from '../components/ui/Form';
import { Icon } from '../components/ui/Icon';
import { Split } from '../components/ui/Split';
import { faq } from '../data/content';
import { groupLabels, services, type ServiceGroup } from '../data/services';
import { Link } from '../router/router';

type Filter = 'all' | ServiceGroup;

export default function Detailing() {
  const [filter, setFilter] = useState<Filter>('all');
  const list = useMemo(() => services.filter((s) => filter === 'all' || s.group === filter), [filter]);
  const count = (g: Filter) => (g === 'all' ? services.length : services.filter((s) => s.group === g).length);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Detailing' }]}
        title={['Detailing', 'without compromise']}
        photo="det-polish"
        lead="Polishing, ceramic coatings, film and interior care in a 1,400 m² studio. Every job ends with an inspection under three kinds of light — diffused, spot and full-spectrum sunlight."
      >
        <Link to="/booking/?type=detailing" className="btn btn--primary">
          Book <Icon name="arrow" />
        </Link>
        <a href="#packages" className="btn btn--ghost">
          Compare packages
        </a>
      </PageHero>

      <LayerAnatomy />

      <section className="section services-catalog" aria-labelledby="services-catalog-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="services-catalog-title" lines={['Services', 'for body and interior']} className="h2" />
            <Segmented
              label="Service group"
              value={filter}
              onChange={setFilter}
              options={(['all', 'exterior', 'interior'] as Filter[]).map((g) => ({ value: g, label: g === 'all' ? 'All' : groupLabels[g], count: count(g) }))}
            />
          </div>
          <div className="services-grid" data-testid="services-grid">
            {list.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <PackageCompare />
      <BeforeAfterShowcase title={['A result', 'you can see']} />
      <Process />

      <section className="section faq-teaser" aria-labelledby="detailing-faq-title">
        <div className="wrap faq-teaser__grid">
          <div>
            <Split id="detailing-faq-title" lines={['Detailing', 'questions']} className="h2" />
            <Link to="/faq/" className="text-link">
              All questions <Icon name="arrow" />
            </Link>
          </div>
          <FaqList items={faq.filter((f) => f.category === 'detailing')} />
        </div>
      </section>
    </>
  );
}
