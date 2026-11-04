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
    title: 'Сначала свет, потом работа',
    text: 'Любая машина начинается с осмотра под тремя видами освещения и замера толщины лака. Мы показываем вам дефекты до того, как назовём цену — чтобы вы видели, за что платите.',
    photo: 'wheel-light' as const,
  },
  {
    title: 'Один мастер — одна машина',
    text: 'Автомобиль не переходит из рук в руки между сменами. Мастер, который принимал машину, отдаёт её вам и может рассказать о каждой панели.',
    photo: 'det-wax-a' as const,
  },
  {
    title: 'Арендный парк — по тем же правилам',
    text: 'Машины коллекции обслуживают те же люди, что работают с автомобилями клиентов. Перед каждой выдачей — мойка, осмотр под светом и проверка салона.',
    photo: 'studio-b' as const,
  },
];

const equipment = [
  ['Свет', 'Линейные LED-панели 6500 K в каждом боксе, ручные фонари с CRI 95+ и лампа солнечного спектра'],
  ['Полировка', 'Эксцентриковые машинки с ходом 15 и 21 мм, ротационные машинки для локальной коррекции'],
  ['Контроль', 'Толщиномеры ЛКП для металла и алюминия, микроскоп для оценки царапин'],
  ['Плёнка', 'Плоттер с базой лекал на 3 000+ моделей, отдельный бокс с контролем пыли'],
  ['Керамика', 'Бокс с климат-контролем и ИК-лампами для полимеризации'],
  ['Салон', 'Экстрактор, парогенератор, осушитель воздуха, озонатор'],
];

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'О студии' }]}
        title={['Мастерская,', 'где светло']}
        photo="studio-a"
        lead="Example вырос из простой идеи: автомобиль выглядит по-настоящему ухоженным, только если он выдерживает проверку любым светом. Всё остальное — следствие."
      />

      <section className="section principles" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 className="visually-hidden" id="principles-title">
            Принципы работы
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
          <Split id="equipment-title" lines={['Оборудование', 'студии']} className="h2" />
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
            <Split id="team-title" lines={['Команда']} className="h2" />
            <p className="caption">Имена и биографии сотрудников вымышлены, на фотографиях — работа в процессе.</p>
          </div>
          <ul className="team__grid">
            {team.map((m, i) => (
              <li key={m.name} className="member" data-reveal="up" style={{ '--d': (i % 3) * 100 } as React.CSSProperties}>
                <Photo k={m.photo} ratio={3 / 4} sizes="(min-width: 1000px) 30vw, (min-width: 600px) 45vw, 100vw" maxWidth={1080} />
                <div className="member__text">
                  <h3 className="h4">{m.name}</h3>
                  <p className="member__role">{m.role}</p>
                  <p className="small muted">{m.focus}</p>
                  <p className="caption">В Example с {m.since} года</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section timeline" aria-labelledby="timeline-title">
        <div className="wrap timeline__grid">
          <div>
            <Split id="timeline-title" lines={['Двенадцать лет', 'в пяти строках']} className="h2" />
            <Link to="/contacts/" className="text-link">
              Приехать в студию <Icon name="arrow" />
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
