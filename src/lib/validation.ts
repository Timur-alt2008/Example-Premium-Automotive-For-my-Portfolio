export type Errors<T extends string> = Partial<Record<T, string>>;

export function validateName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Укажите имя';
  if (v.length < 2) return 'Имя слишком короткое';
  if (!/^[\p{L}\s'’.-]+$/u.test(v)) return 'Используйте только буквы';
  return undefined;
}

/** Accepts international numbers: 10–15 digits, optional +, spaces, dashes, brackets. */
export function validatePhone(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Укажите телефон';
  if (!/^\+?[\d\s()-]+$/.test(v)) return 'Телефон может содержать цифры, пробелы, скобки и дефис';
  const digits = v.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return 'Проверьте номер: нужно от 10 до 15 цифр';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Укажите электронную почту';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Проверьте адрес: например, name@example.com';
  return undefined;
}

export function required(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

export function hasErrors<T extends string>(errors: Errors<T>): boolean {
  return Object.values(errors).some(Boolean);
}
