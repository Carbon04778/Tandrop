import { useShop } from '../context/ShopContext';
import { Truck, Refresh, Lock } from './icons';
import ImagePlaceholder from './ImagePlaceholder';

export default function Offer() {
  const shop = useShop();
  const { bundles, selectedBundle, setSelectedBundle, adding } = shop;
  return (
    <section className="section section--warm" id="offer">
      <div className="wrap">
        <div className="section-head center reveal">
          <p className="eyebrow">Limited time launch offer</p>
          <h2 className="display h-slab">Choose your glow bundle</h2>
          <p className="ing-subcopy">The more you stock up, the more you save, and every bundle ships free with a 30 day guarantee.</p>
        </div>

        <div className="offer-grid reveal">
          {bundles.map((b, i) => (
            <div className={`bundle ${b.best?'best':''} ${b.free>0?'has-free':''} ${selectedBundle===i?'is-active':''}`}
                 key={i} onClick={() => setSelectedBundle(i)}>
              <div className="bundle-img">
                <ImagePlaceholder placeholder={`${b.qty} bottle${b.qty>1?'s':''}`} />
              </div>
              <div className="bundle-head">Buy {b.units}</div>
              {b.free>0 && <span className="bundle-free">+ Get {b.free} Free</span>}
              <div className="bundle-price">
                <span className="now">{shop.fmt(b.total)}</span>
                <span className="was">{shop.fmt(b.list)}</span>
              </div>
              {b.freeShip
                ? <div className="bundle-ship">Free Shipping</div>
                : <div className="bundle-each">{shop.fmt(b.each)} per bottle</div>}
              <div className="bundle-radio" />
            </div>
          ))}
        </div>

        <div className="offer-cta reveal">
          <button className="btn btn--gold btn--lg btn--block" style={{maxWidth:420, margin:'0 auto'}}
            onClick={() => shop.addToCart(selectedBundle, true)} disabled={adding}>
            {adding ? 'Adding...' : 'Add to cart'} <span className="cta-was">{shop.fmt(bundles[selectedBundle].list)}</span> <span className="cta-now">{shop.fmt(bundles[selectedBundle].total)}</span>
          </button>
          <div className="offer-meta">
            <span><Truck /> Free UK shipping</span>
            <span><Refresh /> 30-day money-back</span>
            <span><Lock /> Secure checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
}
