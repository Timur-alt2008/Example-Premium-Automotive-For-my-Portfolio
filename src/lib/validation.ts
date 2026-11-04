export type Errors<T extends string> = Partial<Record<T, string>>;

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter your name';
  if (v.length < 2) return 'The name is too short';
  if (!/^[\p{L}\s'’.-]+$/u.test(v)) return 'Use letters only';
  return undefined;
}

/** Accepts international numbers: 10–15 digits, optional +, spaces, dashes, brackets. */
export function validatePhone(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter a phone number';
  if (!/^\+?[\d\s()-]+$/.test(v)) return 'A phone number can contain digits, spaces, brackets and hyphens';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return 'Check the number: it needs 10 to 15 digits';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter your e-mail address';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Check the address: for example, name@example.com';
  return undefined;
}

export function required(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

export function hasErrors<T extends string>(errors: Errors<T>): boolean {
  return Object.values(errors).some(Boolean);
}
