import { useState } from 'react';
import { FAQS } from '../data/static';
import { Plus } from './icons';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head center reveal">
          <p className="eyebrow faq-eyebrow">Good questions</p>
          <h2 className="display h-slab">Everything you want to know</h2>
        </div>
        <div className="faq-list reveal">
          {FAQS.map((f, i) => (
            <div className={`faq-item ${open===i?'open':''}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open===i?-1:i)}>
                {f.q}<span className="ico"><Plus /></span>
              </button>
              <div className="faq-a" style={{maxHeight: open===i ? '320px' : '0'}}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
