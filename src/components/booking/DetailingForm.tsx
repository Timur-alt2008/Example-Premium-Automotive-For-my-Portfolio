import { useMemo, useRef, useState, type FormEvent } from 'react';
import { brands } from '../../data/cars';
import { studioTimes } from '../../data/content';
import { groupLabels, packages, serviceBySlug, services, vehicleSizeLabels, type CarePackage, type VehicleSize } from '../../data/services';
import { addDays, fromISO, todayISO } from '../../lib/dates';
import { formatDate, formatPrice } from '../../lib/format';
import { useMounted } from '../../lib/hooks';
import { submitRequest, SubmitError } from '../../lib/requests';
import { required, validateEmail, validateName, validatePhone } from '../../lib/validation';
import { useRouter } from '../../router/router';
import { Calendar } from '../ui/Calendar';
import { Segmented, TextArea, TextField } from '../ui/Form';
import { Icon } from '../ui/Icon';
import { useToast } from '../ui/Toast';
import { Consent, ContactFields, DemoNote, ErrorBanner, focusFirstError, FormStep, SubmitButton, type ContactErrors, type ContactValues } from './shared';

type PackageChoice = CarePackage['id'] | 'none';
type ErrorKey = 'work' | 'brand' | 'model' | 'date' | 'time' | 'consent' | keyof ContactValues;

export function DetailingForm({ initialService = '', initialPackage = '' }: { initialService?: string; initialPackage?: string }) {
  const mounted = useMounted();
  const { navigate } = useRouter();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);

  const [serviceSlug, setServiceSlug] = useState(serviceBySlug(initialService) ? initialService : '');
  const [pkg, setPkg] = useState<PackageChoice>(packages.some((p) => p.id === initialPackage) ? (initialPackage as CarePackage['id']) : 'none');
  const [size, setSize] = useState<VehicleSize>('coupe');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const [contact, setContact] = useState<ContactValues>({ name: '', phone: '', email: '' });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const service = serviceBySlug(serviceSlug);
  const chosenPackage = packages.find((p) => p.id === pkg);
  const min = mounted ? addDays(todayISO(), 1) : '2000-01-01';
  const max = mounted ? addDays(todayISO(), 60) : '2100-01-01';
  const estimate = (service?.priceFrom ?? 0) + (chosenPackage?.price[size] ?? 0);

  const errors = useMemo(() => {
    const e: Partial<Record<ErrorKey, string>> = {};
    if (!service && !chosenPackage) e.work = 'Choose a service or a care package';
    e.brand = required(brand, 'Enter the car make');
    e.model = required(model, 'Enter the model');
    if (!date) e.date = 'Choose a visit date';
    if (!time) e.time = 'Choose a convenient time';
    e.name = validateName(contact.name);
    e.phone = validatePhone(contact.phone);
    e.email = validateEmail(contact.email);
    if (!consent) e.consent = 'Consent to data processing is required';
    return e;
  }, [service, chosenPackage, brand, model, date, time, contact, consent]);

  const show = (key: ErrorKey) => (submitted || touched[key] ? errors[key] : undefined);
  const contactErrors: ContactErrors = { name: show('name'), phone: show('phone'), email: show('email') };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean)) {
      focusFirstError(form.current);
      return;
    }
    setStatus('sending');
    const work = [service?.name, chosenPackage?.name].filter(Boolean).join(' + ');
    try {
      const request = await submitRequest({
        kind: 'detailing',
        title: work,
        total: estimate,
        contact,
        lines: [
          ['Work', work],
          ['Car', `${brand.trim()} ${model.trim()} (${vehicleSizeLabels[size].toLowerCase()})`],
          ['Visit', `${formatDate(date!)} at ${time}`],
          ...(comment.trim() ? ([['Comment', comment.trim()]] as [string, string][]) : []),
        ],
      });
      navigate(`/booking/success/?n=${request.number}`);
    } catch (err) {
      if (err instanceof SubmitError) {
        setStatus('error');
        setErrorText(err.message);
        toast('Request not sent', 'error');
      } else {
        navigate('/booking/error/?type=detailing');
      }
    }
  };

  const byGroup = (['exterior', 'interior'] as const).map((g) => ({ group: g, items: services.filter((s) => s.group === g) }));

  return (
    <form className="booking-form" ref={form} onSubmit={onSubmit} noValidate aria-label="Detailing appointment" data-testid="detailing-form">
      <div className="booking-form__main">
        <FormStep index={1} title="Service and package">
          <div className={['select-group', show('work') ? 'has-error' : ''].join(' ')}>
            <label className="field__label" htmlFor="service-select">
              Service
            </label>
            <div className="select">
              <select id="service-select" className="field__control" value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)} aria-invalid={show('work') ? true : undefined}>
                <option value="">No separate service</option>
                {byGroup.map(({ group, items }) => (
                  <optgroup key={group} label={groupLabels[group]}>
                    {items.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.name} — {s.variablePrice ? 'from ' : ''}
                        {formatPrice(s.priceFrom)}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <Icon name="chevronDown" />
            </div>
          </div>
          <div className="package-pick" role="radiogroup" aria-label="Care package">
            {[{ id: 'none' as const, name: 'No package', pitch: 'Selected service only' }, ...packages].map((p) => (
              <button key={p.id} type="button" role="radio" aria-checked={pkg === p.id} className={['package-pick__item', pkg === p.id ? 'is-active' : ''].join(' ')} onClick={() => setPkg(p.id)}>
                <span className="package-pick__name">{p.name}</span>
                <span className="caption">{'price' in p ? `${formatPrice(p.price[size])}, ${p.duration}` : p.pitch}</span>
              </button>
            ))}
          </div>
          {show('work') ? (
            <p className="field__error" role="alert">
              <Icon name="alert" /> {show('work')}
            </p>
          ) : null}
        </FormStep>

        <FormStep index={2} title="Car">
          <Segmented label="Body type" value={size} onChange={setSize} options={(Object.keys(vehicleSizeLabels) as VehicleSize[]).map((v) => ({ value: v, label: vehicleSizeLabels[v] }))} />
          <div className="form-grid">
            <TextField label="Make" name="brand" list="brand-list" placeholder="For example, Porsche" value={brand} error={show('brand')} onChange={(e) => setBrand(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, brand: true }))} />
            <datalist id="brand-list">
              {[...brands, 'Aston Martin', 'BMW', 'Maserati', 'Range Rover', 'Tesla'].sort().map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
            <TextField label="Model" name="model" placeholder="For example, 911 Carrera" value={model} error={show('model')} onChange={(e) => setModel(e.target.value)} onBlur={() => setTouched((t) => ({ ...t, model: true }))} />
          </div>
        </FormStep>

        <FormStep index={3} title="Visit date and time">
          <div className={['dates', show('date') ? 'has-error' : ''].join(' ')}>
            <div className="dates__summary dates__summary--single" aria-live="polite">
              <div className={!date ? 'is-pending' : ''}>
                <span className="caption">Visit date</span>
                <span>{date ? formatDate(date) : 'Choose in the calendar'}</span>
              </div>
            </div>
            {mounted ? (
              <Calendar mode="single" label="Visit date" start={date} min={min} max={max} onChange={(d) => setDate(d)} />
            ) : (
              <div className="calendar calendar--placeholder" aria-hidden="true" />
            )}
            {show('date') ? (
              <p className="field__error" role="alert">
                <Icon name="alert" /> {show('date')}
              </p>
            ) : null}
          </div>
          <div className={['time-slots', show('time') ? 'has-error' : ''].join(' ')}>
            <p className="field__label" id="studio-time-label">
              Time
            </p>
            <div className="slots" role="radiogroup" aria-labelledby="studio-time-label">
              {studioTimes
                .filter((t) => !date || fromISO(date).getDay() !== 0 || (t >= '10:00' && t < '17:00'))
                .map((t) => (
                  <button key={t} type="button" role="radio" aria-checked={time === t} className={time === t ? 'is-active' : ''} onClick={() => setTime(t)}>
                    {t}
                  </button>
                ))}
            </div>
            {show('time') ? (
              <p className="field__error" role="alert">
                <Icon name="alert" /> {show('time')}
              </p>
            ) : null}
          </div>
        </FormStep>

        <FormStep index={4} title="Contacts">
          <ContactFields values={contact} errors={contactErrors} onChange={(k, v) => setContact((c) => ({ ...c, [k]: v }))} onBlur={(k) => setTouched((t) => ({ ...t, [k]: true }))} />
          <TextArea label="Comment" name="comment" optional placeholder="Known damage, preferred handover time" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Consent checked={consent} onChange={setConsent} error={show('consent')} />
        </FormStep>
      </div>

      <aside className="booking-form__summary" aria-label="Estimated price">
        <div className="summary" data-testid="detailing-summary">
          <p className="summary__title">Estimated price</p>
          {service || chosenPackage ? (
            <dl className="summary__lines">
              {service ? (
                <div>
                  <dt>{service.name}</dt>
                  <dd>
                    {service.variablePrice ? 'from ' : ''}
                    {formatPrice(service.priceFrom)}
                  </dd>
                </div>
              ) : null}
              {chosenPackage ? (
                <div>
                  <dt>
                    {chosenPackage.name}, {vehicleSizeLabels[size].toLowerCase()}
                  </dt>
                  <dd>{formatPrice(chosenPackage.price[size])}</dd>
                </div>
              ) : null}
              <div className="summary__total">
                <dt>Approximately</dt>
                <dd data-testid="detailing-total">{formatPrice(estimate)}</dd>
              </div>
            </dl>
          ) : (
            <p className="summary__empty">Choose a service or a package — the price will appear here.</p>
          )}
          <p className="caption">The exact price is given after the paint has been inspected and its thickness measured.</p>
          {status === 'error' ? <ErrorBanner message={errorText} onRetry={() => form.current?.requestSubmit()} /> : null}
          <SubmitButton sending={status === 'sending'} label="Book" />
          <DemoNote>Demonstration appointment: your data stays in your browser and is not sent anywhere.</DemoNote>
        </div>
      </aside>
    </form>
  );
}
