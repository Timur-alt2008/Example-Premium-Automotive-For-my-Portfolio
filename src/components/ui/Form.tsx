import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { Icon } from './Icon';

interface FieldShellProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

function FieldShell({ id, label, hint, error, optional, children, className }: FieldShellProps) {
  return (
    <div className={['field', error ? 'has-error' : '', className].filter(Boolean).join(' ')}>
      <label className="field__label" htmlFor={id}>
        {label}
        {optional ? <span className="field__optional">необязательно</span> : null}
      </label>
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`} role="alert">
          <Icon name="alert" /> {error}
        </p>
      ) : hint ? (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & { label: string; hint?: ReactNode; error?: string; optional?: boolean; fieldClassName?: string };

export function TextField({ label, hint, error, optional, fieldClassName, ...input }: TextFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={fieldClassName}>
      <input id={id} className="field__control" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...input} />
    </FieldShell>
  );
}

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & { label: string; hint?: ReactNode; error?: string; optional?: boolean; fieldClassName?: string };

export function TextArea({ label, hint, error, optional, fieldClassName, ...input }: TextAreaProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={fieldClassName}>
      <textarea id={id} className="field__control field__control--area" rows={4} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...input} />
    </FieldShell>
  );
}

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  fieldClassName?: string;
};

export function SelectField({ label, hint, error, optional, options, placeholder, fieldClassName, ...select }: SelectFieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} optional={optional} className={fieldClassName}>
      <div className="select">
        <select id={id} className="field__control" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined} {...select}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" />
      </div>
    </FieldShell>
  );
}

interface ChoiceProps {
  type: 'checkbox' | 'radio';
  name: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: ReactNode;
  meta?: ReactNode;
  note?: ReactNode;
}

/** Large tappable checkbox / radio card. */
export function Choice({ type, name, value, checked, onChange, title, meta, note }: ChoiceProps) {
  return (
    <label className={['choice', checked ? 'is-checked' : ''].join(' ')}>
      <input type={type} name={name} value={value} checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="choice__box" aria-hidden="true">
        <Icon name="check" />
      </span>
      <span className="choice__body">
        <span className="choice__title">{title}</span>
        {note ? <span className="choice__note">{note}</span> : null}
      </span>
      {meta ? <span className="choice__meta">{meta}</span> : null}
    </label>
  );
}

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  options: { value: T; label: string; count?: number }[];
  onChange: (value: T) => void;
  className?: string;
}

/** Tab-like single choice, used for category switches. */
export function Segmented<T extends string>({ label, value, options, onChange, className }: SegmentedProps<T>) {
  return (
    <div className={['segmented', className].filter(Boolean).join(' ')} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} className={value === o.value ? 'is-active' : ''} onClick={() => onChange(o.value)}>
          {o.label}
          {typeof o.count === 'number' ? <span className="segmented__count">{o.count}</span> : null}
        </button>
      ))}
    </div>
  );
}
