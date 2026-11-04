import type { ReactNode } from 'react';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { TextField } from '../ui/Form';

export interface ContactValues {
  name: string;
  phone: string;
  email: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function ContactFields({ values, errors, onChange, onBlur }: { values: ContactValues; errors: ContactErrors; onChange: (key: keyof ContactValues, value: string) => void; onBlur: (key: keyof ContactValues) => void }) {
  return (
    <div className="form-grid">
      <TextField label="Имя" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={(e) => onChange('name', e.target.value)} onBlur={() => onBlur('name')} fieldClassName="span-2" />
      <TextField label="Телефон" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+1 555 010 0000" value={values.phone} error={errors.phone} onChange={(e) => onChange('phone', e.target.value)} onBlur={() => onBlur('phone')} />
      <TextField label="Электронная почта" name="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" value={values.email} error={errors.email} onChange={(e) => onChange('email', e.target.value)} onBlur={() => onBlur('email')} />
    </div>
  );
}

export function Consent({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <div className={['consent', error ? 'has-error' : ''].join(' ')}>
      <label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={error ? true : undefined} />
        <span className="consent__box" aria-hidden="true">
          <Icon name="check" />
        </span>
        <span>
          Согласен на обработку данных по <Link to="/privacy/">политике конфиденциальности</Link>
        </span>
      </label>
      {error ? (
        <p className="field__error" role="alert">
          <Icon name="alert" /> {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormStep({ index, title, children, aside }: { index: number; title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <fieldset className="form-step">
      <legend className="form-step__legend">
        <span className="form-step__index">{index}</span>
        <span className="h4">{title}</span>
        {aside ? <span className="form-step__aside">{aside}</span> : null}
      </legend>
      <div className="form-step__body">{children}</div>
    </fieldset>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="demo-note">
      <Icon name="info" />
      <span>{children}</span>
    </p>
  );
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="error-banner" role="alert">
      <Icon name="alert" />
      <p>{message}</p>
      <button type="button" className="btn btn--ghost btn--small" onClick={onRetry}>
        Отправить ещё раз
      </button>
    </div>
  );
}

export function SubmitButton({ sending, label }: { sending: boolean; label: string }) {
  return (
    <button type="submit" className={['btn btn--primary btn--block submit', sending ? 'is-sending' : ''].join(' ')} disabled={sending} aria-busy={sending}>
      {sending ? (
        <>
          <span className="spinner" aria-hidden="true" /> Отправляем заявку
        </>
      ) : (
        <>
          {label} <Icon name="arrow" />
        </>
      )}
    </button>
  );
}

/** Moves focus to the first invalid control after a failed submit. */
export function focusFirstError(form: HTMLFormElement | null) {
  requestAnimationFrame(() => {
    const el = form?.querySelector<HTMLElement>('[aria-invalid="true"], .has-error input, .has-error button, .has-error select');
    el?.focus();
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
}
