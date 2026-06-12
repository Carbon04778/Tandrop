import { TIMELINE } from '../data/static';
import ImagePlaceholder from './ImagePlaceholder';

export default function Timeline() {
  return (
    <section className="section section--deep" id="timeline">
      <div className="wrap">
        <div className="section-head center reveal">
          <p className="eyebrow">What to expect</p>
          <h2 className="display h-slab">Your Glow-Up Timeline</h2>
          <p className="ing-subcopy">A gradual, believable glow that deepens the longer you sip. Here&rsquo;s how it builds.</p>
        </div>
        <div className="tl-grid">
          {TIMELINE.map((t, i) => (
            <div className="tl-card reveal" key={i} style={{transitionDelay:`${i*80}ms`}}>
              <div className="tl-photo">
                <span className="tl-stage-tag">{t.stage}</span>
                <ImagePlaceholder placeholder={t.cap} style={{width:'100%',height:'100%'}} />
              </div>
              <div className="tl-body">
                <h4>{t.stage}</h4>
                <p dangerouslySetInnerHTML={{__html: t.body}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
