import { useState } from 'react';
import { SHADES } from '../data/static';
import ImagePlaceholder from './ImagePlaceholder';

export default function BeforeAfter() {
  const [i, setI] = useState(0);
  const n = SHADES.length;
  const go = (d) => setI((p) => Math.max(0, Math.min(n - 1, p + d)));

  return (
    <section className="section" id="results">
      <div className="wrap">
        <div className="section-head center reveal">
          <h2 className="display h-slab">See Your Difference</h2>
          <p className="ing-subcopy">Real, gradual results. Pick the skin tone closest to yours.</p>
        </div>

        <div className="ba-tabs reveal">
          {SHADES.map((s, k) => (
            <button key={s.key} className={`ba-tab ${i===k?'on':''}`} onClick={() => setI(k)}>{s.label}</button>
          ))}
        </div>

        <div className="bac reveal">
          <button className="bac-arrow" onClick={() => go(-1)} disabled={i===0} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div className="bac-viewport">
            <div className="bac-track" style={{transform:`translateX(-${i*100}%)`}}>
              {SHADES.map((s) => (
                <div className="bac-slide" key={s.key}>
                  <div className="bac-pair">
                    <div className="bac-half">
                      <ImagePlaceholder placeholder={`Before: ${s.cap}`} />
                      <span className="bac-tag before">Before</span>
                    </div>
                    <div className="bac-half">
                      <ImagePlaceholder placeholder={`After: ${s.cap}`} />
                      <span className="bac-tag after">After</span>
                    </div>
                    <span className="bac-watermark">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="bac-arrow" onClick={() => go(1)} disabled={i===n-1} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>

        <div className="bac-dots reveal">
          {SHADES.map((s, k) => (
            <button key={s.key} className={`bac-dot ${i===k?'on':''}`} onClick={() => setI(k)} aria-label={s.label} />
          ))}
        </div>
        <p className="ba-caption reveal">Unretouched customer transformations over 28 days of daily use. Individual results vary.</p>
      </div>
    </section>
  );
}
