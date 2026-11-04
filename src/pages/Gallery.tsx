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
      <PageHero crumbs={[{ label: 'Gallery' }]} title={['Gallery', 'of work']} lead="The collection, the studio’s work and the workshop itself. Tap a photo to open it full screen; in the “Before and after” section you can compare the condition with a line of light." />
      <section className="section--tight gallery-page" aria-label="Photos">
        <div className="wrap">
          <Segmented
            label="Category"
            value={filter}
            onChange={setFilter}
            options={[{ value: 'all' as const, label: 'All', count: gallery.length }, ...keys.map((k) => ({ value: k, label: galleryCategoryLabels[k], count: gallery.filter((g) => g.category === k).length }))]}
            className="gallery-page__filters"
          />
          <div className="masonry" data-testid="gallery-grid" key={filter}>
            {items.map((g, i) => (
              <button key={`${g.photo}-${g.category}-${i}`} type="button" className={['masonry__item', g.shape ? `masonry__item--${g.shape}` : ''].join(' ')} onClick={() => setOpen(i)} aria-label={`Open: ${g.caption}`} style={{ '--i': i } as React.CSSProperties}>
                <Photo k={g.photo} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" maxWidth={1440} />
                {g.compare !== undefined ? <span className="masonry__badge">Before and after</span> : null}
                <span className="masonry__caption">
                  <span>{g.caption}</span>
                  <Icon name="expand" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Lightbox slides={slides} index={open} onIndex={setOpen} label="Example gallery" />
    </>
  );
}
