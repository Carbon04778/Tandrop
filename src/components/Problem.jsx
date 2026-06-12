import { PROBLEMS } from '../data/static';
import { ICON_MAP } from './icons';
import ImagePlaceholder from './ImagePlaceholder';

export default function Problem() {
  return (
    <section className="section section--warm" id="problem">
      <div className="wrap prob-layout">
        <div className="prob-media reveal">
          <ImagePlaceholder placeholder="Problem shot: streaky or orange fake tan close-up" style={{width:'100%',height:'100%'}} />
          <div className="prob-tag"><span className="prob-tag-x">✕</span> The old way</div>
        </div>
        <div className="prob-right">
          <div className="section-head reveal">
            <p className="eyebrow">The old way is exhausting</p>
            <h2 className="display h-slab">Tanning, the hard way.</h2>
            <p className="ing-subcopy" style={{textAlign:'left', margin:'12px 0 0'}}>Every shortcut to a glow comes with a catch.</p>
          </div>
          <div className="prob-grid">
            {PROBLEMS.map((p, i) => {
              const Ico = ICON_MAP[p.ico];
              return (
                <div className="prob-card reveal" key={i} style={{transitionDelay:`${i*60}ms`}}>
                  <div className="prob-ico">{Ico && <Ico />}</div>
                  <h4>{p.t}</h4>
                  <p>{p.s}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
