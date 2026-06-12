import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import ImagePlaceholder from './ImagePlaceholder';

export default function StickyBar() {
  const shop = useShop();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700 && !shop.cartOpen);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [shop.cartOpen]);

  const b = shop.bundles[shop.selectedBundle];
  const productTitle = shop.productData?.title || 'Tandrop™ Tanning Drops';

  return (
    <div className={`sticky-bar ${show ? 'show' : ''}`}>
      <div className="wrap sticky-inner">
        <div className="sticky-thumb" />
        <div className="sticky-info">
          <div className="t">{productTitle}</div>
          <div className="p">
            <span className="now">{shop.fmt(b.total)}</span>
            <span className="was">{shop.fmt(b.list)}</span>
          </div>
        </div>
        <div className="sticky-select">
          {shop.bundles.map((bd, i) => (
            <button
              key={i}
              className={shop.selectedBundle === i ? 'on' : ''}
              onClick={() => shop.setSelectedBundle(i)}
            >
              {bd.label}
            </button>
          ))}
        </div>
        <button className="btn btn--gold" onClick={() => shop.addToCart(shop.selectedBundle, true)} disabled={shop.adding}>
          {shop.adding ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
