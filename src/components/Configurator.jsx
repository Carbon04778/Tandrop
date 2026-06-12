import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Check, Drop, Leaf, Truck, CrueltyFree, Flask, Info, Plus, X } from './icons';
import Stars from './Stars';
import ImagePlaceholder from './ImagePlaceholder';
import { INTENSITIES, SFACTS_MAIN, SFACTS_SEC, ACC } from '../data/static';

const GALLERY_PLACEHOLDERS = [
  { cap: 'Hero product shot: Tandrop bottle and dropper' },
  { cap: 'Customer before/after face' },
  { cap: 'How it works: drops in glass' },
  { cap: 'UGC: two friends, drink in hand' },
  { cap: 'Flatlay: bottle and ingredients' },
  { cap: 'Glowing décolletage close-up' },
];

export default function Configurator() {
  const shop = useShop();
  const [slide, setSlide] = useState(0);
  const [intensity, setIntensity] = useState(0);
  const [acc, setAcc] = useState(-1);
  const [facts, setFacts] = useState(false);
  const it = INTENSITIES[intensity];

  const { bundles, selectedBundle, setSelectedBundle, productData, adding } = shop;
  const b = bundles[selectedBundle];
  const now = b.total;
  const list = b.list;

  const images = productData?.images || [];
  const slides = images.length > 0
    ? images.map((img, i) => ({ src: img.url, alt: img.altText || `Product image ${i + 1}`, cap: '' }))
    : GALLERY_PLACEHOLDERS.map((p) => ({ src: null, alt: '', cap: p.cap }));

  const go = (d) => setSlide((s) => (s + d + slides.length) % slides.length);

  const renderBenefit = (parts) =>
    parts.map((p, i) => (i % 2 === 0 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>));

  const productTitle = productData?.title || 'Tandrop™ Tanning Drops';
  const productDescription = productData?.description || 'Achieve a beautiful sun-kissed glow from within, without sunbeds, fake tan, or UV damage.';

  const addIntensity = () => {
    shop.addToCart(selectedBundle, true);
  };

  return (
    <section className="section" id="shop" style={{ paddingTop: 'clamp(32px,4vw,56px)' }}>
      <div className="wrap">
        <div className="cfg-grid">
          {/* gallery */}
          <div className="gallery reveal in">
            <div className="gallery-stage">
              {slides.map((s, i) => (
                <div className={`gallery-slide ${slide === i ? 'on' : ''}`} key={i}>
                  <ImagePlaceholder src={s.src} alt={s.alt} placeholder={s.cap} style={{ width: '100%', height: '100%' }} />
                </div>
              ))}
              <button className="gallery-arrow prev" onClick={() => go(-1)} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="gallery-arrow next" onClick={() => go(1)} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <div className="gallery-thumbs">
              {slides.map((s, i) => (
                <button key={i} className={`gallery-thumb ${slide === i ? 'on' : ''}`} onClick={() => setSlide(i)} aria-label={`View ${i + 1}`}>
                  <ImagePlaceholder src={s.src} alt="" style={{ width: '100%', height: '100%' }} />
                </button>
              ))}
            </div>
          </div>

          {/* buy box */}
          <div className="cfg-buy reveal in">
            <div className="cfg-prodhead">
              <span className="cfg-kicker">
                <span className="pill"><Drop style={{ width: 12, height: 12 }} /> Best Seller</span> The glow you drink
              </span>
              <h1 className="display cfg-prodtitle">
                {productTitle.includes('™') ? productTitle : <>{productTitle}<span className="tm">&trade;</span></>}
              </h1>
              <p className="cfg-descriptor">Drinkable Sunless Tanning Drops</p>
              <div className="rating-row">
                <Stars value={4.8} />
                <span className="rating-num">4.8</span>
                <a className="rating-link" href="#reviews">11,400+ reviews</a>
                <span className="avatar-cluster">
                  {['linear-gradient(135deg,#ecd9c0,#cda176)', 'linear-gradient(135deg,#d9a978,#b87a48)', 'linear-gradient(135deg,#f0dcc6,#d9a978)', 'linear-gradient(135deg,#c0824e,#8f5328)', 'linear-gradient(135deg,#e8c9a3,#c9a96a)'].map((g, i) => (
                    <span key={i} className="av" style={{ background: g }} />
                  ))}
                </span>
              </div>
              <p className="cfg-prodsub">{productDescription}</p>
            </div>

            <h3 className="display cfg-title" style={{ textAlign: 'left', fontSize: 22 }}>Select your intensity</h3>
            <p className="cfg-sub" style={{ textAlign: 'left', marginBottom: 14 }}>Choose your desired tan level</p>

            <div className="intensity-row">
              {INTENSITIES.map((opt, i) => (
                <button key={opt.key} className={`intensity ${intensity === i ? 'on' : ''}`} onClick={() => setIntensity(i)}>
                  <div className="swatch" style={{ background: opt.swatch }} />
                  <div className="iname">{opt.name}</div>
                </button>
              ))}
            </div>

            <h3 className="display cfg-title" style={{ textAlign: 'left', fontSize: 22, marginTop: 26 }}>Choose your bundle</h3>
            <p className="cfg-sub" style={{ textAlign: 'left', marginBottom: 14 }}>The more you bundle, the more you save</p>
            <div className="qty-tiles">
              {bundles.map((bd, i) => (
                <button key={bd.units} className={`qtile ${bd.free > 0 ? 'has-free' : ''} ${selectedBundle === i ? 'on' : ''}`} onClick={() => setSelectedBundle(i)}>
                  <span className="qtile-name">{bd.label}</span>
                  {bd.free > 0 && <span className="qtile-free">+ Get {bd.free} Free</span>}
                  <span className="qtile-price">
                    <span className="now">{shop.fmt(bd.total)}</span>
                    <span className="was">{shop.fmt(bd.list)}</span>
                  </span>
                  {bd.freeShip && <span className="qtile-ship">Free shipping</span>}
                </button>
              ))}
            </div>

            <div className="sale-card">
              <div className="sale-banner">Summer Sale</div>
              <div className="sale-body">
                <p className="sale-desc">{it.desc}</p>
                <div className="sale-price">
                  <span className="was">{shop.fmt(list)}</span>
                  <span className="now">{shop.fmt(now)}</span>
                  <span className="off">{b.disc}% OFF</span>
                </div>
                <p className="sale-mode">{b.getQty} bottle{b.getQty > 1 ? 's' : ''}{b.free > 0 ? ` · ${b.free} free` : ''} &middot; {shop.fmt(b.each)} per bottle</p>
                <div className="sale-div" />
                <h4 className="your-tan-t">Your Tan</h4>
                <div className="tan-bar" style={{ background: `linear-gradient(90deg, #f3e6d3, ${it.barEnd})` }}>
                  <span className="tag">Before</span>
                  <span className="tag">After</span>
                </div>
                <ul className="cfg-benefits">
                  {it.benefits.map((bn, i) => (
                    <li key={i}><span className="tick"><Check /></span><span>{renderBenefit(bn)}</span></li>
                  ))}
                </ul>
                <div className="cfg-cta">
                  <button className="btn btn--gold btn--block btn--lg" onClick={addIntensity} disabled={adding}>
                    {adding ? 'Adding...' : 'Add to Bag'} <span className="cta-was">{shop.fmt(list)}</span> <span className="cta-now">{shop.fmt(now)}</span>
                  </button>
                </div>
                <div className="klarna-line">
                  3 payments of {shop.fmt(now / 3)} at 0% interest with
                  <span className="klarna-badge">Klarna</span>
                  <Info className="info-i" />
                </div>
                <p className="cfg-ship"><span className="dot" /> Order before midnight, ships <b>today</b></p>
              </div>
            </div>

            <button className="facts-btn" onClick={() => setFacts(true)}>View Supplement Facts Label</button>

            <div className="bx-guarantee">
              <div className="bx-seal">
                <span style={{ fontSize: 8, letterSpacing: '.14em', fontWeight: 700 }}>GLOW</span>
                <span className="n">30</span>
                <span className="u">Days</span>
              </div>
              <div>
                <h4>30-Day Glow Guarantee</h4>
                <p>Try it for 30 days to see and feel the difference. Love your results or get your money back, no questions asked.</p>
              </div>
            </div>

            <div className="bx-trust">
              <span className="ct"><CrueltyFree /><span>Cruelty Free</span></span>
              <span className="ct"><Leaf /><span>Vegan</span></span>
              <span className="ct"><Flask /><span>Lab Tested</span></span>
            </div>

            <div className="bx-acc">
              {ACC.map((a, i) => (
                <div className={`bx-acc-item ${acc === i ? 'open' : ''}`} key={i}>
                  <button className="bx-acc-q" onClick={() => setAcc(acc === i ? -1 : i)}>
                    {a.q}<span className="ico"><Plus /></span>
                  </button>
                  <div className="bx-acc-a" style={{ maxHeight: acc === i ? '400px' : '0' }}>
                    <div className="bx-acc-a-inner" dangerouslySetInnerHTML={{ __html: a.body }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* supplement facts modal */}
      <div className={`facts-scrim ${facts ? 'show' : ''}`} onClick={() => setFacts(false)}>
        <div className="facts-panel" onClick={(e) => e.stopPropagation()}>
          <button className="facts-close" onClick={() => setFacts(false)} aria-label="Close"><X /></button>
          <h2 className="sfacts-title">Supplement Facts</h2>
          <div className="sfacts-serv">
            <div>Serving Size: 1 full squeeze</div>
            <div>Servings per Container: about 30</div>
          </div>
          <table className="sfacts">
            <thead>
              <tr>
                <th></th>
                <th>Amount<br />per 1ml</th>
                <th>Amount<br />per 2ml</th>
                <th>% Daily<br />Value 2ml</th>
              </tr>
            </thead>
            <tbody>
              {SFACTS_MAIN.map((r, i) => (
                <tr key={i}>
                  <td className="nutrient">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                </tr>
              ))}
              {SFACTS_SEC.map((r, i) => (
                <tr key={i} className={i === 0 ? 'sfacts-gap' : ''}>
                  <td className="nutrient">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sfacts-other"><b>Other Ingredients:</b> Purified water, Soybean oil, Potassium sorbate. <b>Contains:</b> Soy.</p>
          <p className="sfacts-dv">&dagger; Daily Value not established.</p>
          <div className="sfacts-note">
            <p><b>Recommended Use:</b><br />Take 1 to 2 squeezes daily or as directed by your healthcare professional.</p>
            <p><b>Warnings:</b><br />Keep out of reach of children. Do not use if safety seal is broken or missing. If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before use.</p>
            <p><b>FDA Disclaimer:</b><br />These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
