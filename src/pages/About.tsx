import { Advantages } from '../components/home/Advantages';
import { BookingCta } from '../components/home/BookingCta';
import { PageHero } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { Photo } from '../components/ui/Photo';
import { Split } from '../components/ui/Split';
import { milestones, team } from '../data/company';
import { Link } from '../router/router';

const principles = [
  {
    title: 'Light first, then the work',
    text: 'Every car starts with an inspection under three kinds of light and a paint thickness reading. We show you the defects before we quote a price, so you can see exactly what you pay for.',
    photo: 'wheel-light' as const,
  },
  {
    title: 'One specialist, one car',
    text: 'The car is never passed between shifts. The specialist who checked it in hands it back to you and can tell you about every panel.',
    photo: 'det-wax-a' as const,
  },
  {
    title: 'The rental fleet — by the same rules',
    text: 'The collection is looked after by the same people who work on our clients’ cars. Before every handover: a wash, an inspection under the lights and an interior check.',
    photo: 'studio-b' as const,
  },
];

const equipment = [
  ['Light', 'Linear 6500 K LED panels in every bay, handheld CRI 95+ torches and a full-spectrum sun lamp'],
  ['Polishing', 'Dual-action polishers with 15 and 21 mm throws, rotary polishers for spot correction'],
  ['Inspection', 'Paint thickness gauges for steel and aluminium, a microscope for assessing scratches'],
  ['Film', 'A plotter with templates for 3,000+ models and a separate dust-controlled bay'],
  ['Ceramic', 'A climate-controlled bay with infrared curing lamps'],
  ['Interior', 'Extractor, steam generator, dehumidifier, ozone generator'],
];

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        title={['A workshop', 'full of light']}
        photo="studio-a"
        lead="Example grew out of a simple idea: a car only looks truly cared for if it passes inspection under any light. Everything else follows from that."
      />

      <section className="section principles" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 className="visually-hidden" id="principles-title">
            How we work
          </h2>
          {principles.map((p, i) => (
            <article key={p.title} className={['principle', i % 2 ? 'principle--flip' : ''].join(' ')}>
              <div className="principle__media" data-reveal="clip">
                <Photo k={p.photo} ratio={i === 1 ? 3 / 4 : 4 / 3} sizes="(min-width: 900px) 50vw, 100vw" />
              </div>
              <div className="principle__text" data-reveal="up">
                <h3 className="h2">{p.title}</h3>
                <p className="lead">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Advantages />

      <section className="section equipment" aria-labelledby="equipment-title">
        <div className="wrap equipment__grid">
          <Split id="equipment-title" lines={['Studio', 'equipment']} className="h2" />
          <dl className="spec-sheet spec-sheet--wide">
            {equipment.map(([k, v]) => (
              <div key={k} data-reveal="up">
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section team" aria-labelledby="team-title">
        <div className="wrap">
          <div className="section-head">
            <Split id="team-title" lines={['Team']} className="h2" />
            <p className="caption">Staff names and biographies are fictional; the photos show work in progress.</p>
          </div>
          <ul className="team__grid">
            {team.map((m, i) => (
              <li key={m.name} className="member" data-reveal="up" style={{ '--d': (i % 3) * 100 } as React.CSSProperties}>
                <Photo k={m.photo} ratio={3 / 4} sizes="(min-width: 1000px) 30vw, (min-width: 600px) 45vw, 100vw" maxWidth={1080} />
                <div className="member__text">
                  <h3 className="h4">{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  <p className="small muted">{m.focus}</p>
                  <p className="caption">At Example since {m.since}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section timeline" aria-labelledby="timeline-title">
        <div className="wrap timeline__grid">
          <div>
            <Split id="timeline-title" lines={['Twelve years', 'in five lines']} className="h2" />
            <Link to="/contacts/" className="text-link">
              Come to the studio <Icon name="arrow" />
            </Link>
          </div>
          <ol className="timeline__list">
            {milestones.map((m) => (
              <li key={m.year} data-reveal="side">
                <span className="numeral">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
