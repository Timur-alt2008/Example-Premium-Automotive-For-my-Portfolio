import { Advantages } from '../components/home/Advantages';
import { BeforeAfterShowcase } from '../components/home/BeforeAfterShowcase';
import { BookingCta } from '../components/home/BookingCta';
import { ContactStrip } from '../components/home/ContactStrip';
import { Directions } from '../components/home/Directions';
import { FleetRail } from '../components/home/FleetRail';
import { GalleryTeaser } from '../components/home/GalleryTeaser';
import { Hero } from '../components/home/Hero';
import { Intro } from '../components/home/Intro';
import { Process } from '../components/home/Process';
import { Reviews } from '../components/home/Reviews';
import { ServiceIndex } from '../components/home/ServiceIndex';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Directions />
      <ServiceIndex />
      <FleetRail />
      <Advantages />
      <GalleryTeaser />
      <BeforeAfterShowcase />
      <Process />
      <Reviews />
      <BookingCta />
      <ContactStrip />
    </>
  );
}
