import { useEffect, useRef, type PointerEvent } from 'react';
import type { PhotoKey } from '../../data/media';
import { Icon } from './Icon';
import { Modal } from './Modal';
import { Photo } from './Photo';
import { BeforeAfter } from '../detailing/BeforeAfter';
import type { BeforeAfterCase } from '../../data/content';

export interface LightboxSlide {
  photo: PhotoKey;
  caption: string;
  compare?: BeforeAfterCase;
}

interface LightboxProps {
  slides: LightboxSlide[];
  index: number | null;
  onIndex: (index: number | null) => void;
  label?: string;
}

/** Full-screen viewer: arrows, keyboard, swipe, Escape and focus trap via Modal. */
export function Lightbox({ slides, index, onIndex, label = 'Просмотр фотографий' }: LightboxProps) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;
  const count = slides.length;
  const go = (delta: number) => index !== null && onIndex((index + delta + count) % count);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  const onDown = (e: PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  const slide = index !== null ? slides[index] : null;

  return (
    <Modal open={open} onClose={() => onIndex(null)} label={label} variant="full" className="lightbox">
      {slide ? (
        <div className="lightbox__body">
          <div className="lightbox__stage" onPointerDown={slide.compare ? undefined : onDown} onPointerUp={slide.compare ? undefined : onUp} data-testid="lightbox-stage">
            <div className="lightbox__slide" key={index}>
              {slide.compare ? <BeforeAfter item={slide.compare} ratio={3 / 2} sizes="90vw" /> : <Photo k={slide.photo} sizes="100vw" className="lightbox__photo" />}
            </div>
          </div>
          <div className="lightbox__bar">
            <p className="lightbox__caption">{slide.caption}</p>
            <p className="lightbox__count" aria-live="polite">
              {index! + 1} / {count}
            </p>
            <div className="lightbox__nav">
              <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Предыдущее фото">
                <Icon name="arrowLeft" />
              </button>
              <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Следующее фото">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
