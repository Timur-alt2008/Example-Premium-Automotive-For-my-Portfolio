import { company } from '../../data/company';
import { Icon, type IconName } from './Icon';
import { useToast } from './Toast';

/** Demo social profiles: they announce themselves instead of linking to someone else's page. */
export function Socials({ className }: { className?: string }) {
  const toast = useToast();
  return (
    <ul className={['socials', className].filter(Boolean).join(' ')}>
      {company.socials.map((s) => (
        <li key={s.id}>
          <button type="button" className="socials__btn" aria-label={`${s.label} Example (демо-профиль)`} onClick={() => toast(`${s.label}: демонстрационный профиль, страница в соцсети не создавалась.`)}>
            <Icon name={s.id as IconName} />
          </button>
        </li>
      ))}
    </ul>
  );
}
