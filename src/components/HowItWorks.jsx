import { useState } from 'react';
import { HOW } from '../data/static';
import ImagePlaceholder from './ImagePlaceholder';

export default function HowItWorks() {
  const [i, setI] = useState(0);
  const steps = HOW;
  const n = steps.length;
  const go = (d) => setI((p) => (p + d + n) % n);
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="hiw-carousel reveal">
          <div className="hiw-media">
            {steps.map((h, k) => (
              <div className={`hiw-slide-img ${k===i?'on':''}`} key={k}>
                <ImagePlaceholder placeholder={h.cap} style={{width:'100%',height:'100%'}} />
              </div>
            ))}
          </div>
          <div className="hiw-panel">
            <h2 className="display h-slab hiw-title">How it works</h2>
            <div className="hiw-nav">
              <button className="hiw-arrow" onClick={() => go(-1)} aria-label="Previous step">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="hiw-track">
                {steps.map((_, k) => (
                  <button key={k} className={`hiw-seg ${k<=i?'on':''}`} onClick={() => setI(k)} aria-label={`Step ${k+1}`} />
                ))}
              </div>
              <button className="hiw-arrow" onClick={() => go(1)} aria-label="Next step">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6"/></svg>
              </button>
            </div>
            <div className="hiw-text">
              <p className="hiw-step">Step {i+1}: {steps[i].t}</p>
              <p className="hiw-desc">{steps[i].s}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
