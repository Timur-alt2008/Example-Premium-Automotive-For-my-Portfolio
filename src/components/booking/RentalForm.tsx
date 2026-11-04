import { useMemo, useRef, useState, type FormEvent } from 'react';
import { carBySlug, carName, cars } from '../../data/cars';
import { pickupTimes, rentalExtras } from '../../data/content';
import { addDays, isValidISO, todayISO } from '../../lib/dates';
import { days as daysLabel, formatDate, formatPrice, seats } from '../../lib/format';
import { useMounted } from '../../lib/hooks';
import { PROMO_CODE, quoteRental } from '../../lib/pricing';
import { submitRequest, SubmitError } from '../../lib/requests';
import { validateEmail, validateName, validatePhone } from '../../lib/validation';
import { useRouter } from '../../router/router';
import { Calendar } from '../ui/Calendar';
import { Choice, SelectField, TextArea, TextField } from '../ui/Form';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import { useToast } from '../ui/Toast';
import { Consent, ContactFields, DemoNote, ErrorBanner, focusFirstError, FormStep, SubmitButton, type ContactErrors, type ContactValues } from './shared';

interface RentalFormProps {
  initialCar?: string;
  /** On a car page the car is fixed and the selector is hidden. */
  fixedCar?: boolean;
  initialStart?: string | null;
  initialEnd?: string | null;
}

type ErrorKey = 'car' | 'dates' | 'time' | 'consent' | keyof ContactValues;

export function RentalForm({ initialCar = '', fixedCar = false, initialStart = null, initialEnd = null }: RentalFormProps) {
  const mounted = useMounted();
  const { navigate } = useRouter();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);

  const [carSlug, setCarSlug] = useState(carBySlug(initialCar) ? initialCar : '');
  const [start, setStart] = useState<string | null>(isValidISO(initialStart) ? initialStart : null);
  const [end, setEnd] = useState<string | null>(isValidISO(initialEnd) ? initialEnd : null);
  const [time, setTime] = useState('');
  const [extras, setExtras] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [promo, setPromo] = useState('');
  const [contact, setContact] = useState<ContactValues>({ name: '', phone: '', email: '' });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const car = carBySlug(carSlug);
  const min = mounted ? addDays(todayISO(), 1) : '2000-01-01';
  const max = mounted ? addDays(todayISO(), 180) : '2100-01-01';
  const quote = car && start && end ? quoteRental(car, start, end, extras, promo) : null;

  const errors = useMemo(() => {
    const e: Partial<Record<ErrorKey, string>> = {};
    if (!car) e.car = 'Choose a car';
    if (!start) e.dates = 'Choose a pick-up date';
    else if (!end) e.dates = 'Choose a return date';
    else if (end <= start) e.dates = 'The return date must be after the pick-up date';
    else if (start < min) e.dates = 'Pick-up is possible from tomorrow at the earliest';
    if (!time) e.time = 'Choose a pick-up time';
    e.name = validateName(contact.name);
    e.phone = validatePhone(contact.phone);
    e.email = validateEmail(contact.email);
    if (!consent) e.consent = 'Consent to data processing is required';
    return e;
  }, [car, start, end, time, contact, consent, min]);

  const show = (key: ErrorKey) => (submitted || touched[key] ? errors[key] : undefined);
  const contactErrors: ContactErrors = { name: show('name'), phone: show('phone'), email: show('email') };

  const toggleExtra = (id: string, on: boolean) => setExtras((list) => (on ? [...list, id] : list.filter((x) => x !== id)));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.values(errors).some(Boolean) || !car || !quote) {
      focusFirstError(form.current);
      return;
    }
    setStatus('sending');
    try {
      const request = await submitRequest({
        kind: 'rental',
        title: carName(car),
        total: quote.total,
        contact,
        lines: [
          ['Car', `${carName(car)}, ${car.year}`],
          ['Pick-up', `${formatDate(start!)} at ${time}`],
          ['Return', formatDate(end!)],
          ['Duration', daysLabel(quote.days)],
          ['Extra', quote.extras.length ? quote.extras.map((x) => x.extra.label).join(', ') : 'No'],
          ['Deposit', formatPrice(quote.deposit)],
          ...(comment.trim() ? ([['Requests', comment.trim()]] as [string, string][]) : []),
        ],
      });
      navigate(`/booking/success/?n=${request.number}`);
    } catch (err) {
      if (err instanceof SubmitError) {
        setStatus('error');
        setErrorText(err.message);
        toast('Request not sent', 'error');
      } else {
        navigate('/booking/error/?type=rental');
      }
    }
  };

  return (
    <form className="booking-form" ref={form} onSubmit={onSubmit} noValidate aria-label="Car booking" data-testid="rental-form">
      <div className="booking-form__main">
        {!fixedCar ? (
          <FormStep index={1} title="Car">
            <SelectField
              label="Model"
              name="car"
              placeholder="Choose a car"
              value={carSlug}
              error={show('car')}
              onChange={(e) => {
                setCarSlug(e.target.value);
                setTouched((t) => ({ ...t, car: true }));
              }}
              options={cars.map((c) => ({ value: c.slug, label: `${carName(c)} — ${formatPrice(c.pricePerDay)} per day` }))}
            />
            {car ? (
              <div className="booking-car">
                <Photo k={car.photos[0]} ratio={16 / 10} sizes="200px" maxWidth={480} />
                <div>
                  <p className="h4">{carName(car)}</p>
                  <p className="caption">
                    {car.powerHp} hp, {seats(car.seats)}, deposit {formatPrice(car.deposit)}, limit {car.mileagePerDay} km/day
                  </p>
                </div>
              </div>
            ) : null}
          </FormStep>
        ) : null}

        <FormStep index={fixedCar ? 1 : 2} title="Dates and time" aside={start && end && quote ? daysLabel(quote.days) : null}>
          <div className={['dates', show('dates') ? 'has-error' : ''].join(' ')}>
            <div className="dates__summary" aria-live="polite">
              <div className={!start ? 'is-pending' : ''}>
                <span className="caption">Pick-up</span>
                <span>{start ? formatDate(start) : 'Choose in the calendar'}</span>
              </div>
              <Icon name="arrow" />
              <div className={start && !end ? 'is-pending is-next' : !end ? 'is-pending' : ''}>
                <span className="caption">Return</span>
                <span>{end ? formatDate(end) : start ? 'Now choose a return date' : '—'}</span>
              </div>
            </div>
            {mounted ? (
              <Calendar
                mode="range"
                label="Rental dates"
                start={start}
                end={end}
                min={min}
                max={max}
                months={2}
                onChange={(s, en) => {
                  setStart(s);
                  setEnd(en);
                  setTouched((t) => ({ ...t, dates: Boolean(en) }));
                }}
              />
            ) : (
              <div className="calendar calendar--placeholder" aria-hidden="true" />
            )}
            {show('dates') ? (
              <p className="field__error" role="alert">
                <Icon name="alert" /> {show('dates')}
              </p>
            ) : null}
          </div>
          <div className={['time-slots', show('time') ? 'has-error' : ''].join(' ')}>
            <p className="field__label" id="pickup-time-label">
              Pick-up time
            </p>
            <div className="slots" role="radiogroup" aria-labelledby="pickup-time-label">
              {pickupTimes.map((t) => (
                <button key={t} type="button" role="radio" aria-checked={time === t} className={time === t ? 'is-active' : ''} onClick={() => setTime(t)} aria-invalid={show('time') && !time ? true : undefined}>
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

        <FormStep index={fixedCar ? 2 : 3} title="Extra">
          <div className="choices">
            {rentalExtras.map((x) => (
              <Choice key={x.id} type="checkbox" name="extras" value={x.id} checked={extras.includes(x.id)} onChange={(on) => toggleExtra(x.id, on)} title={x.label} note={x.note} meta={`${formatPrice(x.price)}${x.per === 'day' ? ' / day' : ''}`} />
            ))}
          </div>
          <TextArea label="Requests" name="comment" optional placeholder="For example, an airport pick-up or a child seat" value={comment} onChange={(e) => setComment(e.target.value)} />
        </FormStep>

        <FormStep index={fixedCar ? 3 : 4} title="Contacts">
          <ContactFields values={contact} errors={contactErrors} onChange={(k, v) => setContact((c) => ({ ...c, [k]: v }))} onBlur={(k) => setTouched((t) => ({ ...t, [k]: true }))} />
          <Consent checked={consent} onChange={setConsent} error={show('consent')} />
        </FormStep>
      </div>

      <aside className="booking-form__summary" aria-label="Price calculation">
        <div className="summary" data-testid="rental-summary">
          <p className="summary__title">Price calculation</p>
          {car ? (
            <p className="summary__car">
              {carName(car)}
              <span className="caption">{formatPrice(car.pricePerDay)} per day</span>
            </p>
          ) : (
            <p className="summary__empty">Choose a car and dates — the price will appear here.</p>
          )}
          {quote ? (
            <dl className="summary__lines">
              <div>
                <dt>
                  {formatPrice(car!.pricePerDay)} × {daysLabel(quote.days)}
                </dt>
                <dd>{formatPrice(quote.base)}</dd>
              </div>
              {quote.discount ? (
                <div className="is-discount">
                  <dt>{quote.discountLabel}</dt>
                  <dd>−{formatPrice(quote.discount)}</dd>
                </div>
              ) : null}
              {quote.extras.map((x) => (
                <div key={x.extra.id}>
                  <dt>{x.extra.label}</dt>
                  <dd>{formatPrice(x.total)}</dd>
                </div>
              ))}
              {quote.promoDiscount ? (
                <div className="is-discount">
                  <dt>Promo code {PROMO_CODE}</dt>
                  <dd>−{formatPrice(quote.promoDiscount)}</dd>
                </div>
              ) : null}
              <div className="summary__total">
                <dt>Total</dt>
                <dd data-testid="rental-total">{formatPrice(quote.total)}</dd>
              </div>
              <div className="summary__deposit">
                <dt>Deposit, refundable</dt>
                <dd>{formatPrice(quote.deposit)}</dd>
              </div>
            </dl>
          ) : car ? (
            <p className="summary__empty">Choose pick-up and return dates.</p>
          ) : null}
          <TextField label="Promo code" name="promo" optional value={promo} onChange={(e) => setPromo(e.target.value)} hint={`Demo code ${PROMO_CODE} gives another 5%`} autoComplete="off" />
          {status === 'error' ? <ErrorBanner message={errorText} onRetry={() => form.current?.requestSubmit()} /> : null}
          <SubmitButton sending={status === 'sending'} label="Send request" />
          <DemoNote>Demonstration booking: the request is stored only in your browser, no car is reserved and no payment is taken.</DemoNote>
        </div>
      </aside>
    </form>
  );
}
