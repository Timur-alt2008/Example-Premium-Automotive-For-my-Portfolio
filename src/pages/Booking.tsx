import { DetailingForm } from '../components/booking/DetailingForm';
import { RentalForm } from '../components/booking/RentalForm';
import { PageHero } from '../components/layout/PageHero';
import { Segmented } from '../components/ui/Form';
import { company } from '../data/company';
import { useSearchParams } from '../router/router';

type Mode = 'rental' | 'detailing';

export default function Booking() {
  const [params, setParams] = useSearchParams();
  const mode: Mode = params.get('type') === 'detailing' ? 'detailing' : 'rental';

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Booking' }]}
        title={mode === 'rental' ? ['Book', 'a car'] : ['Book', 'a studio visit']}
        lead={
          <>
            Fill in the form — a manager will contact you within 30 minutes during working hours. Prefer to talk? Rental: <a href={company.phones.rental.href}>{company.phones.rental.display}</a>, studio: <a href={company.phones.studio.href}>{company.phones.studio.display}</a>.
          </>
        }
      />
      <section className="section--tight booking" aria-label="Request form">
        <div className="wrap">
          <Segmented
            label="Request type"
            value={mode}
            onChange={(m) => setParams({ type: m === 'rental' ? null : m, car: null, service: null, package: null })}
            options={[
              { value: 'rental', label: 'Car rental' },
              { value: 'detailing', label: 'Detailing appointment' },
            ]}
            className="booking__switch"
          />
          {mode === 'rental' ? (
            <RentalForm key={`r-${params.get('car') ?? ''}`} initialCar={params.get('car') ?? ''} />
          ) : (
            <DetailingForm key={`d-${params.get('service') ?? ''}-${params.get('package') ?? ''}`} initialService={params.get('service') ?? ''} initialPackage={params.get('package') ?? ''} />
          )}
        </div>
      </section>
    </>
  );
}
