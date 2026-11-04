import { useRef, useState, type FormEvent } from 'react';
import { Consent, DemoNote, ErrorBanner, focusFirstError, SubmitButton } from '../components/booking/shared';
import { HoursList } from '../components/home/ContactStrip';
import { PageHero } from '../components/layout/PageHero';
import { SelectField, TextArea, TextField } from '../components/ui/Form';
import { Icon } from '../components/ui/Icon';
import { Socials } from '../components/ui/Socials';
import { StylizedMap } from '../components/ui/StylizedMap';
import { useToast } from '../components/ui/Toast';
import { company, openStatus } from '../data/company';
import { useMounted } from '../lib/hooks';
import { submitRequest, SubmitError } from '../lib/requests';
import { required, validateEmail, validateName } from '../lib/validation';

const topics = [
  { value: 'rental', label: 'Аренда автомобиля' },
  { value: 'detailing', label: 'Детейлинг' },
  { value: 'partnership', label: 'Сотрудничество' },
  { value: 'other', label: 'Другое' },
];

function ContactForm() {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({ name: '', email: '', topic: '', message: '' });
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error' | 'done'>('idle');
  const [errorText, setErrorText] = useState('');
  const [number, setNumber] = useState('');

  const errors = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    topic: required(values.topic, 'Выберите тему обращения'),
    message: values.message.trim().length < 10 ? 'Опишите вопрос хотя бы в нескольких словах' : undefined,
    consent: consent ? undefined : 'Нужно согласие на обработку данных',
  };
  const show = (k: keyof typeof errors) => (submitted ? errors[k] : undefined);
  const set = (k: keyof typeof values, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return focusFirstError(form.current);
    setStatus('sending');
    try {
      const r = await submitRequest({ kind: 'contact', title: 'Обращение', contact: { name: values.name, email: values.email }, lines: [['Тема', topics.find((t) => t.value === values.topic)!.label], ['Сообщение', values.message.trim()]] });
      setNumber(r.number);
      setStatus('done');
      toast('Сообщение отправлено', 'success');
    } catch (err) {
      setStatus('error');
      setErrorText(err instanceof SubmitError ? err.message : 'Не удалось отправить сообщение. Попробуйте ещё раз или позвоните нам.');
    }
  };

  if (status === 'done') {
    return (
      <div className="contact-done" role="status" data-testid="contact-done">
        <span className="result__icon result__icon--ok" aria-hidden="true">
          <Icon name="check" />
        </span>
        <h2 className="h3">Сообщение отправлено</h2>
        <p className="muted">
          Номер обращения <strong>{number}</strong>. Ответим на {values.email} в течение рабочего дня.
        </p>
        <DemoNote>Демонстрационная форма: сообщение сохранено только в вашем браузере.</DemoNote>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => {
            setValues({ name: '', email: '', topic: '', message: '' });
            setConsent(false);
            setSubmitted(false);
            setStatus('idle');
          }}
        >
          Написать ещё
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={form} onSubmit={onSubmit} noValidate aria-label="Форма обратной связи" data-testid="contact-form">
      <h2 className="h3">Напишите нам</h2>
      <div className="form-grid">
        <TextField label="Имя" name="name" autoComplete="name" value={values.name} error={show('name')} onChange={(e) => set('name', e.target.value)} />
        <TextField label="Электронная почта" name="email" type="email" autoComplete="email" value={values.email} error={show('email')} onChange={(e) => set('email', e.target.value)} />
        <SelectField label="Тема" name="topic" placeholder="Выберите тему" options={topics} value={values.topic} error={show('topic')} onChange={(e) => set('topic', e.target.value)} fieldClassName="span-2" />
        <TextArea label="Сообщение" name="message" value={values.message} error={show('message')} onChange={(e) => set('message', e.target.value)} fieldClassName="span-2" />
      </div>
      <Consent checked={consent} onChange={setConsent} error={show('consent')} />
      {status === 'error' ? <ErrorBanner message={errorText} onRetry={() => form.current?.requestSubmit()} /> : null}
      <SubmitButton sending={status === 'sending'} label="Отправить сообщение" />
    </form>
  );
}

export default function Contacts() {
  const mounted = useMounted();
  const status = mounted ? openStatus() : null;
  return (
    <>
      <PageHero crumbs={[{ label: 'Контакты' }]} title={['Контакты']} lead="Студия и выдача автомобилей находятся в одном здании. Приезжайте без записи посмотреть боксы или позвоните — расскажем, как добраться." />
      <section className="section--tight contacts" aria-label="Контактная информация">
        <div className="wrap contacts__grid">
          <div className="contacts__info">
            <div className="contacts__block">
              <h2 className="caption">Адрес</h2>
              <address className="h3">
                {company.address.street}
                <br />
                {company.address.district}
              </address>
              <p className="muted small">{company.address.note}</p>
            </div>
            <div className="contacts__block contacts__phones">
              {Object.values(company.phones).map((p) => (
                <a key={p.href} href={p.href} className="contact-card">
                  <span className="caption">{p.label}</span>
                  <span className="contact-card__value">
                    <Icon name="phone" /> {p.display}
                  </span>
                </a>
              ))}
              {Object.entries(company.emails).map(([k, e]) => (
                <a key={k} href={`mailto:${e}`} className="contact-card">
                  <span className="caption">{k === 'studio' ? 'Студия' : k === 'rental' ? 'Аренда' : 'Общие вопросы'}</span>
                  <span className="contact-card__value">
                    <Icon name="mail" /> {e}
                  </span>
                </a>
              ))}
            </div>
            <div className="contacts__block">
              <h2 className="caption">Часы работы студии</h2>
              {status ? (
                <p className={['open-status', status.open ? 'is-open' : ''].join(' ')}>
                  <span className={['status-dot', status.open ? 'is-open' : ''].join(' ')} aria-hidden="true" /> {status.text}
                </p>
              ) : null}
              <HoursList />
              <p className="small muted">Выдача и приём арендных автомобилей — круглосуточно по предварительной договорённости.</p>
            </div>
            <div className="contacts__block">
              <h2 className="caption">Мы в соцсетях</h2>
              <Socials />
            </div>
          </div>
          <div className="contacts__side">
            <ContactForm />
          </div>
        </div>
        <div className="wrap contacts__map">
          <StylizedMap />
          <p className="caption">Схема условная: адрес и район вымышлены.</p>
        </div>
      </section>
    </>
  );
}
