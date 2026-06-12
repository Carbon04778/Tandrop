import { useState, useEffect } from 'react';
import { SOLUTION_STEPS } from '../data/static';
import ImagePlaceholder from './ImagePlaceholder';

export default function Solution() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % SOLUTION_STEPS.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="section section--deep" id="solution">
      <div className="wrap sol-grid">
        <div className="sol-media reveal">
          <div className="slot-frame" style={{position:'relative'}}>
            <ImagePlaceholder placeholder="Drops dispersing into a glass of water" style={{width:'100%',aspectRatio:'1/1'}} />
          </div>
          <div className="hero-float" style={{position:'absolute', bottom:18, left:18}}>
            <span className="num" style={{color:'var(--gold-deep)'}}>10s</span>
            <span className="lbl">a day,<br/>that&rsquo;s the routine</span>
          </div>
        </div>
        <div>
          <div className="section-head" style={{margin:'0 0 28px'}}>
            <p className="eyebrow">The Tandrop way</p>
            <h2 className="display h-slab">The glow you drink.</h2>
            <p className="lead" style={{marginTop:14}}>No mitts. No mess. No UV. Just a few drops in your daily glass of water and a radiance that builds from within.</p>
          </div>
          <div className="steps-flow">
            {SOLUTION_STEPS.map((s, i) => (
              <div className={`flow-step ${active===i?'is-active':''}`} key={i} onMouseEnter={() => setActive(i)}>
                <div className="flow-num">{i+1}</div>
                <div><h4>{s.t}</h4><p>{s.s}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
