import { useMemo, useState } from 'react';
import { PageHero } from '../components/layout/PageHero';
import { Segmented } from '../components/ui/Form';
import { Icon } from '../components/ui/Icon';
import { Lightbox } from '../components/ui/Lightbox';
import { Photo } from '../components/ui/Photo';
import { beforeAfterCases, gallery, galleryCategoryLabels, type GalleryCategory } from '../data/content';

type Filter = 'all' | GalleryCategory;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => gallery.filter((g) => filter === 'all' || g.category === filter), [filter]);
  const slides = items.map((g) => ({ photo: g.photo, caption: g.caption, compare: g.compare !== undefined ? beforeAfterCases[g.compare] : undefined }));
  const keys = Object.keys(galleryCategoryLabels) as GalleryCategory[];

  return (
    <>
      <PageHero crumbs={[{ label: 'Галерея' }]} title={['Галерея', 'работ']} lead="Автомобили коллекции, работы студии и сама мастерская. Нажмите на фото, чтобы открыть его на весь экран; в разделе «До и после» можно сравнить состояние линией света." />
      <section className="section--tight gallery-page" aria-label="Фотографии">
        <div className="wrap">
          <Segmented
            label="Категория"
            value={filter}
            onChange={setFilter}
            options={[{ value: 'all' as const, label: 'Все', count: gallery.length }, ...keys.map((k) => ({ value: k, label: galleryCategoryLabels[k], count: gallery.filter((g) => g.category === k).length }))]}
            className="gallery-page__filters"
          />
          <div className="masonry" data-testid="gallery-grid" key={filter}>
            {items.map((g, i) => (
              <button key={`${g.photo}-${g.category}-${i}`} type="button" className={['masonry__item', g.shape ? `masonry__item--${g.shape}` : ''].join(' ')} onClick={() => setOpen(i)} aria-label={`Открыть: ${g.caption}`} style={{ '--i': i } as React.CSSProperties}>
                <Photo k={g.photo} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" maxWidth={1440} />
                {g.compare !== undefined ? <span className="masonry__badge">До и после</span> : null}
                <span className="masonry__caption">
                  <span>{g.caption}</span>
                  <Icon name="expand" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Lightbox slides={slides} index={open} onIndex={setOpen} label="Галерея Example" />
    </>
  );
}
