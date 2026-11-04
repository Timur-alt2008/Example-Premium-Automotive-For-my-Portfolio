import { Link } from '../../router/router';

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="logo" aria-label="Example — home" onClick={onClick}>
      <span className="logo__word">EXAMPLE</span>
      <span className="logo__lamp" aria-hidden="true" />
    </Link>
  );
}
