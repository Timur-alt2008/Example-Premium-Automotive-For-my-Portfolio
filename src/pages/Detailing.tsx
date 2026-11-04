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
        crumbs={[{ label: 'Детейлинг' }]}
        title={['Детейлинг', 'без компромиссов']}
        photo="det-polish"
        lead="Полировка, керамика, плёнка и уход за салоном в студии на 1 400 м². Каждая работа заканчивается проверкой под тремя видами света — рассеянным, точечным и солнечным спектром."
      >
        <Link to="/booking/?type=detailing" className="btn btn--primary">
          Записаться <Icon name="arrow" />
        </Link>
        <a href="#packages" className="btn btn--ghost">
          Сравнить пакеты
        </a>
      </PageHero>

      <LayerAnatomy />

      <section className="section services-catalog" aria-labelledby="services-catalog-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="services-catalog-title" lines={['Услуги', 'для кузова и салона']} className="h2" />
            <Segmented
              label="Группа услуг"
              value={filter}
              onChange={setFilter}
              options={(['all', 'exterior', 'interior'] as Filter[]).map((g) => ({ value: g, label: g === 'all' ? 'Все' : groupLabels[g], count: count(g) }))}
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
      <BeforeAfterShowcase title={['Результат,', 'который видно']} />
      <Process />

      <section className="section faq-teaser" aria-labelledby="detailing-faq-title">
        <div className="wrap faq-teaser__grid">
          <div>
            <Split id="detailing-faq-title" lines={['Частые вопросы', 'о детейлинге']} className="h2" />
            <Link to="/faq/" className="text-link">
              Все вопросы <Icon name="arrow" />
            </Link>
          </div>
          <FaqList items={faq.filter((f) => f.category === 'detailing')} />
        </div>
      </section>
    </>
  );
}
