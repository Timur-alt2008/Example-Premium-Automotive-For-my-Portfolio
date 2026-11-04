import { useMemo, useState } from 'react';
import { beforeAfterCases, gallery, galleryCategoryLabels, type GalleryCategory } from '../../data/content';
import { Link } from '../../router/router';
import { Segmented } from '../ui/Form';
import { Icon } from '../ui/Icon';
import { Lightbox } from '../ui/Lightbox';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

type Filter = 'all' | GalleryCategory;
const teaserCategories: Filter[] = ['all', 'supercars', 'detailing', 'interior', 'workshop'];

export function GalleryTeaser() {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => gallery.filter((g) => g.category !== 'before-after' && (filter === 'all' || g.category === filter)).slice(0, 5), [filter]);
  const slides = items.map((g) => ({ photo: g.photo, caption: g.caption, compare: g.compare !== undefined ? beforeAfterCases[g.compare] : undefined }));

  return (
    <section className="section gallery-teaser" aria-labelledby="gallery-teaser-title">
      <div className="wrap">
        <div className="section-head">
          <Split id="gallery-teaser-title" lines={['Из мастерской', 'и с дороги']} className="h2" />
          <p className="lead" data-reveal="up">
            Работы студии и автомобили коллекции. Нажмите на фото, чтобы открыть его на весь экран.
          </p>
        </div>
        <Segmented
            label="Категория фотографий"
            value={filter}
            onChange={setFilter}
            options={teaserCategories.map((c) => ({ value: c, label: c === 'all' ? 'Все' : galleryCategoryLabels[c] }))}
            className="gallery-teaser__filters"
          />
        <div className="mosaic" key={filter}>
          {items.map((g, i) => (
            <button key={`${g.photo}-${i}`} type="button" className={`mosaic__item mosaic__item--${i}`} onClick={() => setOpen(i)} aria-label={`Открыть фото: ${g.caption}`}>
              <Photo k={g.photo} sizes="(min-width: 900px) 40vw, 100vw" maxWidth={1440} />
              <span className="mosaic__caption">
                <span>{g.caption}</span>
                <Icon name="expand" />
              </span>
            </button>
          ))}
        </div>
        <div className="gallery-teaser__more">
          <Link to="/gallery/" className="btn btn--ghost">
            Вся галерея <Icon name="arrow" />
          </Link>
        </div>
      </div>
      <Lightbox slides={slides} index={open} onIndex={setOpen} />
    </section>
  );
}
