import { useRef, useState, type PointerEvent } from 'react';
import { reviews } from '../../data/content';
import { formatDate } from '../../lib/format';
import { Icon } from '../ui/Icon';
import { Photo } from '../ui/Photo';
import { Split } from '../ui/Split';

export function Reviews() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const count = reviews.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);
  const review = reviews[index];

  const onDown = (e: PointerEvent) => (start.current = e.clientX);
  const onUp = (e: PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <section className="section reviews" aria-labelledby="reviews-title" aria-roledescription="карусель">
      <div className="wrap">
        <div className="section-head">
          <Split id="reviews-title" lines={['Что говорят', 'после выдачи']} className="h2" />
          <p className="caption reviews__note" data-reveal="up">
            Демонстрационные отзывы: авторы и тексты вымышлены и показывают, как будет выглядеть раздел.
          </p>
        </div>
        <div className="reviews__stage" onPointerDown={onDown} onPointerUp={onUp}>
          <div className="reviews__photo">
            {reviews.map((r, i) => (
              <div key={r.author} className={['reviews__frame', i === index ? 'is-active' : ''].join(' ')} aria-hidden={i !== index}>
                <Photo k={r.photo} ratio={4 / 5} sizes="(min-width: 900px) 30vw, 60vw" maxWidth={1080} />
              </div>
            ))}
          </div>
          <figure className="review" key={index} aria-live="polite">
            <div className="review__rating" role="img" aria-label={`Оценка ${review.rating} из 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Icon key={i} name="star" className={i < review.rating ? 'is-on' : ''} />
              ))}
            </div>
            <blockquote className="review__text">
              <p>{review.text}</p>
            </blockquote>
            <figcaption className="review__author">
              <strong>{review.author}</strong>
              <span>{review.context}</span>
              <time dateTime={review.date} className="caption">
                {formatDate(review.date)}
              </time>
            </figcaption>
          </figure>
          <div className="reviews__controls">
            <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Предыдущий отзыв">
              <Icon name="arrowLeft" />
            </button>
            <div className="reviews__dots">
              {reviews.map((r, i) => (
                <button key={r.author} type="button" className={i === index ? 'is-active' : ''} onClick={() => setIndex(i)} aria-label={`Отзыв ${i + 1} из ${count}`} aria-current={i === index} />
              ))}
            </div>
            <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Следующий отзыв">
              <Icon name="arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
