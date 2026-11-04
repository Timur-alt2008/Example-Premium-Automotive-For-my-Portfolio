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
        crumbs={[{ label: 'Бронирование' }]}
        title={mode === 'rental' ? ['Бронирование', 'автомобиля'] : ['Запись', 'в студию']}
        lead={
          <>
            Заполните форму — менеджер свяжется с вами в течение 30 минут в рабочее время. Удобнее голосом? Аренда: <a href={company.phones.rental.href}>{company.phones.rental.display}</a>, студия: <a href={company.phones.studio.href}>{company.phones.studio.display}</a>.
          </>
        }
      />
      <section className="section--tight booking" aria-label="Форма заявки">
        <div className="wrap">
          <Segmented
            label="Тип заявки"
            value={mode}
            onChange={(m) => setParams({ type: m === 'rental' ? null : m, car: null, service: null, package: null })}
            options={[
              { value: 'rental', label: 'Аренда автомобиля' },
              { value: 'detailing', label: 'Запись на детейлинг' },
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
