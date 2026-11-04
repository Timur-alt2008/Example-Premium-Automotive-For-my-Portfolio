import { useState } from 'react';
import { paintLayers } from '../../data/services';
import { Link } from '../../router/router';
import { Icon } from '../ui/Icon';
import { Split } from '../ui/Split';

/** Interactive cross-section of the paint system: what each service protects. */
export function LayerAnatomy() {
  const [active, setActive] = useState('clear');
  const layer = paintLayers.find((l) => l.id === active)!;
  return (
    <section className="section anatomy" aria-labelledby="anatomy-title">
      <div className="wrap anatomy__grid">
        <div className="anatomy__text">
          <Split id="anatomy-title" lines={['What we protect,', 'in microns']} className="h2" />
          <p className="lead" data-reveal="up">
            The factory paint is thinner than a sheet of paper. Choose a layer to see which work it relates to.
          </p>
          <div className="anatomy__detail" aria-live="polite">
            <p className="anatomy__thickness numeral">{layer.thickness}</p>
            <h3 className="h3">{layer.name}</h3>
            <p>{layer.note}</p>
            {layer.service ? (
              <Link to={`/detailing/${layer.service}/`} className="text-link">
                More about the service <Icon name="arrow" />
              </Link>
            ) : null}
          </div>
        </div>
        <div className="anatomy__stack" role="listbox" aria-label="Layers of the paint system" data-reveal="up">
          {paintLayers.map((l) => (
            <button
              key={l.id}
              type="button"
              role="option"
              aria-selected={active === l.id}
              className={['layer', `layer--${l.id}`, active === l.id ? 'is-active' : ''].join(' ')}
              style={{ '--w': l.weight } as React.CSSProperties}
              onClick={() => setActive(l.id)}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(l.id)}
            >
              <span className="layer__slab" aria-hidden="true" />
              <span className="layer__label">
                <span>{l.name}</span>
                <span className="caption">{l.thickness}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
