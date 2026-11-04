import type { SVGProps } from 'react';

/** Line icons drawn on a 24px grid with a 1.5px stroke. */
const paths = {
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m6-6-6 6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 8h16M4 16h10" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  phone: <path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 6.9 6.9l1.3-2 4 1.6V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  gauge: (
    <>
      <path d="M4.5 17a8.5 8.5 0 1 1 15 0" />
      <path d="m12 13 4-5" />
      <circle cx="12" cy="13" r="1.2" />
    </>
  ),
  bolt: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  seat: <path d="M8 3.5h3.5l1 8.5H18a1.5 1.5 0 0 1 1.5 1.5V16H7.5L6 5.5A1.7 1.7 0 0 1 8 3.5ZM8 16l-1 4.5M17 16l1 4.5" />,
  drive: (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <path d="M9 6.5h6M12 6.5v11M9 17.5h6" />
    </>
  ),
  engine: <path d="M4 10h2V8h3V6h5v2h3l2 2h1v6h-1l-2 2h-3l-2 2H9l-2-2H6v-2H4v-6Z" />,
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  star: <path d="m12 3.8 2.5 5.1 5.6.8-4 4 1 5.6-5.1-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L12 3.8Z" />,
  shield: <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z" />,
  drop: <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />,
  layers: <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Zm-9 8 9 4.5 9-4.5M3 15.5 12 20l9-4.5" />,
  equipment: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6 2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6 2.1-2.1" />
    </>
  ),
  materials: <path d="M9 3h6M10 3v5L5 18a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L14 8V3M7.5 14h9" />,
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  detail: (
    <>
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5 5M10.5 8v5M8 10.5h5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  lounge: <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M3.5 11.5a1.5 1.5 0 0 1 3 0V14h11v-2.5a1.5 1.5 0 0 1 3 0V17h-17v-5.5ZM6 17v2.5M18 17v2.5" />,
  spark: <path d="M12 3v5m0 8v5M3 12h5m8 0h5M6.5 6.5l2.5 2.5m6 6 2.5 2.5m0-11L15 9m-6 6-2.5 2.5" />,
  play: <path d="M8 5.5v13l10-6.5-10-6.5Z" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.6" cy="7.4" r="0.6" fill="currentColor" />
    </>
  ),
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3.5" />
      <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" />
    </>
  ),
  telegram: <path d="m20.5 4.5-17 6.6 5.2 1.9 2 6.2 3-3.6 4.6 3.4 2.2-14.5ZM8.7 13l8.3-5.6-6.3 7.2" />,
  whatsapp: (
    <>
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.3 18.6l-3.8.9Z" />
      <path d="M9.3 8.6c.3 2.8 2.6 5.3 5.6 5.9l1-1.1-1.6-.9-.8.7a4 4 0 0 1-2.4-2.4l.7-.8-.8-1.6-1.7.2Z" />
    </>
  ),
  car: (
    <>
      <path d="M3 15.5v-3l2.2-4.3A2 2 0 0 1 7 7h10a2 2 0 0 1 1.8 1.2L21 12.5v3a1 1 0 0 1-1 1h-1.5M5.5 16.5H4a1 1 0 0 1-1-1M8.5 16.5h7M3 12.5h18" />
      <circle cx="7" cy="16.5" r="1.8" />
      <circle cx="17" cy="16.5" r="1.8" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4 2.8 19.5h18.4L12 4Z" />
      <path d="M12 10v4.5M12 17v.3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8v.3" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  title?: string;
}

export function Icon({ name, title, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={['icon', `icon--${name}`, className].filter(Boolean).join(' ')}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
