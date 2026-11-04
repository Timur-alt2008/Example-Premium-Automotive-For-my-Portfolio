import { PageHero } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { company } from '../data/company';
import { rentalTerms } from '../data/content';
import { Link } from '../router/router';

export function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Политика конфиденциальности' }]} title={['Политика', 'конфиденциальности']} />
      <section className="section--tight legal">
        <div className="wrap">
          <div className="prose legal__body">
            <p>Этот сайт — демонстрационный проект вымышленной компании Example. Ниже описано, что происходит с данными, которые вы вводите в формы.</p>
            <h2 className="h3">Какие данные собираются</h2>
            <p>Имя, телефон, электронная почта и параметры заявки, которые вы указываете в формах бронирования, записи и обратной связи.</p>
            <h2 className="h3">Где хранятся данные</h2>
            <p>Только в вашем браузере (localStorage), чтобы показать страницу подтверждения. Данные не отправляются на сервер, третьим лицам или в аналитику. Чтобы удалить их, очистите данные сайта в настройках браузера.</p>
            <h2 className="h3">Cookie и сторонние сервисы</h2>
            <p>Сайт не использует cookie. Фотографии загружаются с CDN Unsplash, шрифты — с Google Fonts; эти сервисы получают стандартные технические данные запроса, например IP-адрес.</p>
            <h2 className="h3">Контакты</h2>
            <p>
              Вопросы о данных: <a href={`mailto:${company.emails.general}`}>{company.emails.general}</a> — адрес из зарезервированного домена example.com и указан для примера.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Условия аренды' }]} title={['Условия', 'аренды']} lead="Демонстрационные условия, оформленные так, как это сделала бы настоящая прокатная компания." />
      <section className="section--tight legal">
        <div className="wrap">
          <div className="prose legal__body">
            <h2 className="h3">Основные требования</h2>
            <ul className="check-list">
              {rentalTerms.map((t) => (
                <li key={t}>
                  <Icon name="check" /> {t}
                </li>
              ))}
            </ul>
            <h2 className="h3">Бронирование и оплата</h2>
            <p>Заявка на сайте не является бронированием. Менеджер подтверждает наличие автомобиля и условия по телефону; оплата и блокировка залога происходят при выдаче.</p>
            <h2 className="h3">Изменение и отмена</h2>
            <p>Изменение дат и отмена бесплатны, если до начала аренды больше 48 часов. При более поздней отмене удерживается стоимость одних суток.</p>
            <h2 className="h3">Страхование</h2>
            <p>Все автомобили застрахованы по КАСКО с франшизой, указанной в договоре. Расширенная страховка снижает франшизу до 2 500 €.</p>
            <h2 className="h3">Ответственность</h2>
            <p>Штрафы за нарушения ПДД, платные дороги и парковки за период аренды оплачивает арендатор. Повреждения, не покрытые страховкой, возмещаются из залога по оценке независимого эксперта.</p>
            <p>
              <Link to="/faq/" className="text-link">
                Вопросы об аренде <Icon name="arrow" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
