import { bodyLabels, carName, driveLabels, type Car } from '../../data/cars';
import { formatDecimal, formatPrice, seats } from '../../lib/format';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';

interface CarCardProps {
  car: Car;
  sizes?: string;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}

export function CarCard({ car, sizes = '(min-width: 1200px) 33vw, (min-width: 720px) 50vw, 100vw', priority, headingLevel = 'h3' }: CarCardProps) {
  const Heading = headingLevel;
  const url = `/cars/${car.slug}/`;
  return (
    <article className="car-card">
      <Link to={url} className="car-card__media" tabIndex={-1} aria-hidden="true">
        <Photo k={car.photos[0]} ratio={4 / 3} sizes={sizes} priority={priority} maxWidth={1440} />
        <span className="car-card__body-type">{bodyLabels[car.body]}</span>
      </Link>
      <div className="car-card__content">
        <div className="car-card__title">
          <p className="car-card__brand">
            {car.brand} <span>{car.year}</span>
          </p>
          <Heading className="car-card__model">
            <Link to={url}>{car.model}</Link>
          </Heading>
        </div>
        <dl className="car-card__stats">
          <div>
            <dt>Power</dt>
            <dd>
              {car.powerHp}
              <small>hp</small>
            </dd>
          </div>
          <div>
            <dt>0–100 km/h</dt>
            <dd>
              {formatDecimal(car.accel)}
              <small>s</small>
            </dd>
          </div>
          <div>
            <dt>Top speed</dt>
            <dd>
              {car.topSpeed}
              <small>km/h</small>
            </dd>
          </div>
        </dl>
        <ul className="car-card__specs">
          <li>
            <Icon name="engine" /> {car.engineType}
          </li>
          <li>
            <Icon name="seat" /> {seats(car.seats)}
          </li>
          <li>
            <Icon name="drive" /> {driveLabels[car.drive]} drive
          </li>
        </ul>
        <div className="car-card__footer">
          <p className="car-card__price">
            <span className="numeral">{formatPrice(car.pricePerDay)}</span>
            <span className="caption">per day</span>
          </p>
          <div className="car-card__actions">
            <Link to={url} className="btn btn--ghost btn--small" aria-label={`More: ${carName(car)}`}>
              More
            </Link>
            <Link to={`/booking/?car=${car.slug}`} className="btn btn--primary btn--small" aria-label={`Book ${carName(car)}`}>
              Book
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
