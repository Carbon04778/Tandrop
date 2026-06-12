import { useState } from 'react';
import { REVIEWS, REVIEW_TAGS } from '../data/static';
import { Check } from './icons';
import Stars from './Stars';
import ImagePlaceholder from './ImagePlaceholder';

export default function Reviews() {
  const [tag, setTag] = useState('All');
  const [limit, setLimit] = useState(9);
  const filtered = REVIEWS.filter(r => {
    if (tag === 'All') return true;
    if (tag === 'With photos') return r.photo;
    return r.tag === tag;
  });
  const shown = filtered.slice(0, limit);
  const dist = [
    { s: 5, pc: 86 }, { s: 4, pc: 11 }, { s: 3, pc: 2 }, { s: 2, pc: 1 }, { s: 1, pc: 0 },
  ];

  return (
    <section className="section section--warm" id="reviews">
      <div className="wrap">
        <div className="section-head center reveal">
          <p className="eyebrow">11,400+ verified reviews</p>
          <h2 className="display h-slab">Glowing, in their words</h2>
        </div>

        <div className="rev-summary reveal">
          <div className="rev-big">
            <div className="n">4.8</div>
            <Stars value={4.8} />
            <div className="of">based on 11,418 reviews</div>
          </div>
          <div className="rev-bars">
            {dist.map(d => (
              <div className="rev-bar" key={d.s}>
                <span className="lab">{d.s} ★</span>
                <span className="track"><span className="fill" style={{width:`${d.pc}%`}} /></span>
                <span className="pc">{d.pc}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rev-filters">
          {REVIEW_TAGS.map(tg => (
            <button key={tg} className={`chip ${tag===tg?'is-active':''}`}
              onClick={() => { setTag(tg); setLimit(9); }}>{tg}</button>
          ))}
          <span className="rev-sort">Showing {shown.length} of {filtered.length}</span>
        </div>

        <div className="rev-grid">
          {shown.map((r, i) => (
            <div className="rev-card" key={r.n+i}>
              <div className="rev-head">
                <div className="rev-avatar">{r.init}</div>
                <div className="rev-meta">
                  <div className="name">{r.n}
                    {r.badge && <span className="badge-verified"><Check style={{width:14,height:14}}/> Verified</span>}
                  </div>
                  <div style={{fontSize:12,color:'var(--muted)'}}>{r.loc}</div>
                </div>
              </div>
              <Stars value={r.r} />
              <p className="rev-title">{r.t}</p>
              <p className="rev-body">{r.b}</p>
              {r.photo && <ImagePlaceholder placeholder="customer photo" style={{width:'100%',aspectRatio:'4/3',borderRadius:12,marginTop:14}} />}
            </div>
          ))}
        </div>

        {limit < filtered.length && (
          <div className="rev-more">
            <button className="btn btn--ghost" onClick={() => setLimit(l => l + 6)}>Load more reviews</button>
          </div>
        )}
      </div>
    </section>
  );
}
