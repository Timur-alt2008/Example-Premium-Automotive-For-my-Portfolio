import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { photos, photoSrcSet, photoUrl, type PhotoKey } from '../../data/media';

interface PhotoProps {
  k: PhotoKey;
  /** width / height of the rendered frame; the CDN crops around the focal point. */
  ratio?: number;
  sizes?: string;
  priority?: boolean;
  alt?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  maxWidth?: number;
}

/**
 * Responsive photo with a fixed frame (no layout shift), lazy loading and a
 * branded fallback when the image cannot be loaded.
 */
export function Photo({ k, ratio, sizes = '100vw', priority = false, alt, className, imgClassName, style, maxWidth = 2400 }: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const photo = photos[k];
  const label = alt ?? photo.alt;

  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    // Covers images that finished before hydration attached the handlers.
    if (img.complete) {
      if (img.naturalWidth === 0) setFailed(true);
      else setLoaded(true);
    }
  }, [k]);

  useEffect(() => {
    setFailed(false);
  }, [k]);

  const frameStyle: CSSProperties = { ...(ratio ? { aspectRatio: String(ratio) } : null), ...style };
  const width = 1600;
  const height = ratio ? Math.round(width / ratio) : 1067;

  return (
    <div className={['photo', loaded ? 'is-loaded' : '', failed ? 'is-failed' : '', className].filter(Boolean).join(' ')} style={frameStyle}>
      {failed ? (
        <div className="photo__fallback" role="img" aria-label={label}>
          <span className="photo__mark" aria-hidden="true">
            E
          </span>
          <span className="photo__note">Фото временно недоступно</span>
        </div>
      ) : (
        <img
          ref={ref}
          src={photoUrl(k, { width: 1440, ratio })}
          srcSet={photoSrcSet(k, ratio, maxWidth)}
          sizes={sizes}
          alt={label}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={imgClassName}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
