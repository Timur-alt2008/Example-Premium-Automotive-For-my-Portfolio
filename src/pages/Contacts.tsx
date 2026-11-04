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
  { value: 'rental', label: 'Car rental' },
  { value: 'detailing', label: 'Detailing' },
  { value: 'partnership', label: 'Partnerships' },
  { value: 'other', label: 'Other' },
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
    topic: required(values.topic, 'Choose a subject'),
    message: values.message.trim().length < 10 ? 'Describe your question in at least a few words' : undefined,
    consent: consent ? undefined : 'Consent to data processing is required',
  };
  const show = (k: keyof typeof errors) => (submitted ? errors[k] : undefined);
  const set = (k: keyof typeof values, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) return focusFirstError(form.current);
    setStatus('sending');
    try {
      const r = await submitRequest({ kind: 'contact', title: 'Subject', contact: { name: values.name, email: values.email }, lines: [['Subject', topics.find((t) => t.value === values.topic)!.label], ['Message', values.message.trim()]] });
      setNumber(r.number);
      setStatus('done');
      toast('Message sent', 'success');
    } catch (err) {
      setStatus('error');
      setErrorText(err instanceof SubmitError ? err.message : 'The message could not be sent. Try again or give us a call.');
    }
  };

  if (status === 'done') {
    return (
      <div className="contact-done" role="status" data-testid="contact-done">
        <span className="result__icon result__icon--ok" aria-hidden="true">
          <Icon name="check" />
        </span>
        <h2 className="h3">Message sent</h2>
        <p className="muted">
          Request number <strong>{number}</strong>. We will reply to {values.email} within one working day.
        </p>
        <DemoNote>Demonstration form: the message is stored only in your browser.</DemoNote>
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
          Write again
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" ref={form} onSubmit={onSubmit} noValidate aria-label="Contact form" data-testid="contact-form">
      <h2 className="h3">Write to us</h2>
      <div className="form-grid">
        <TextField label="Name" name="name" autoComplete="name" value={values.name} error={show('name')} onChange={(e) => set('name', e.target.value)} />
        <TextField label="E-mail" name="email" type="email" autoComplete="email" value={values.email} error={show('email')} onChange={(e) => set('email', e.target.value)} />
        <SelectField label="Subject" name="topic" placeholder="Choose a subject" options={topics} value={values.topic} error={show('topic')} onChange={(e) => set('topic', e.target.value)} fieldClassName="span-2" />
        <TextArea label="Message" name="message" value={values.message} error={show('message')} onChange={(e) => set('message', e.target.value)} fieldClassName="span-2" />
      </div>
      <Consent checked={consent} onChange={setConsent} error={show('consent')} />
      {status === 'error' ? <ErrorBanner message={errorText} onRetry={() => form.current?.requestSubmit()} /> : null}
      <SubmitButton sending={status === 'sending'} label="Send message" />
    </form>
  );
}

export default function Contacts() {
  const mounted = useMounted();
  const status = mounted ? openStatus() : null;
  return (
    <>
      <PageHero crumbs={[{ label: 'Contacts' }]} title={['Contacts']} lead="The studio and the car handover are in the same building. Drop in without an appointment to see the bays, or call us — we will tell you how to get here." />
      <section className="section--tight contacts" aria-label="Contact information">
        <div className="wrap contacts__grid">
          <div className="contacts__info">
            <div className="contacts__block">
              <h2 className="caption">Address</h2>
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
                  <span className="caption">{k === 'studio' ? 'Studio' : k === 'rental' ? 'Rental' : 'General questions'}</span>
                  <span className="contact-card__value">
                    <Icon name="mail" /> {e}
                  </span>
                </a>
              ))}
            </div>
            <div className="contacts__block">
              <h2 className="caption">Studio opening hours</h2>
              {status ? (
                <p className={['open-status', status.open ? 'is-open' : ''].join(' ')}>
                  <span className={['status-dot', status.open ? 'is-open' : ''].join(' ')} aria-hidden="true" /> {status.text}
                </p>
              ) : null}
              <HoursList />
              <p className="small muted">Rental car handover and return — around the clock by prior arrangement.</p>
            </div>
            <div className="contacts__block">
              <h2 className="caption">Follow us</h2>
              <Socials />
            </div>
          </div>
          <div className="contacts__side">
            <ContactForm />
          </div>
        </div>
        <div className="wrap contacts__map">
          <StylizedMap />
          <p className="caption">The map is schematic: the address and district are fictional.</p>
        </div>
      </section>
    </>
  );
}
