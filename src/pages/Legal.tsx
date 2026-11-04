import { PageHero } from '../components/layout/PageHero';
import { Icon } from '../components/ui/Icon';
import { company } from '../data/company';
import { rentalTerms } from '../data/content';
import { Link } from '../router/router';

export function Privacy() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Privacy policy' }]} title={['Privacy', 'policy']} />
      <section className="section--tight legal">
        <div className="wrap">
          <div className="prose legal__body">
            <p>This website is a demonstration project for Example, a fictional company. Below is what happens to the data you enter into its forms.</p>
            <h2 className="h3">What data is collected</h2>
            <p>Name, phone number, e-mail and request details you enter in the booking, appointment and contact forms.</p>
            <h2 className="h3">Where data is stored</h2>
            <p>Only in your browser (localStorage), to show the confirmation page. Nothing is sent to a server, to third parties or to analytics. To delete it, clear this site’s data in your browser settings.</p>
            <h2 className="h3">Cookies and third-party services</h2>
            <p>The site does not use cookies. Photos load from the Unsplash CDN and fonts from Google Fonts; these services receive standard technical request data, such as your IP address.</p>
            <h2 className="h3">Contacts</h2>
            <p>
              Questions about data: <a href={`mailto:${company.emails.general}`}>{company.emails.general}</a> — an address on the reserved example.com domain, given as an example.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Terms() {
  return (
    <>
      <PageHero crumbs={[{ label: 'Rental terms' }]} title={['Rental', 'terms']} lead="Demonstration terms, written the way a real rental company would write them." />
      <section className="section--tight legal">
        <div className="wrap">
          <div className="prose legal__body">
            <h2 className="h3">Main requirements</h2>
            <ul className="check-list">
              {rentalTerms.map((t) => (
                <li key={t}>
                  <Icon name="check" /> {t}
                </li>
              ))}
            </ul>
            <h2 className="h3">Booking and payment</h2>
            <p>A request on the website is not a booking. A manager confirms availability and terms by phone; payment and the deposit hold happen at handover.</p>
            <h2 className="h3">Changes and cancellation</h2>
            <p>Changing dates and cancelling are free more than 48 hours before the rental starts. Later cancellations are charged one day’s rental.</p>
            <h2 className="h3">Insurance</h2>
            <p>All cars carry comprehensive insurance with the excess stated in the contract. Extended cover reduces the excess to €2,500.</p>
            <h2 className="h3">Liability</h2>
            <p>Traffic fines, toll roads and parking during the rental are paid by the renter. Damage not covered by insurance is deducted from the deposit based on an independent assessment.</p>
            <p>
              <Link to="/faq/" className="text-link">
                Rental questions <Icon name="arrow" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
