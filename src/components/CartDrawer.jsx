import { useShop } from '../context/ShopContext';
import { Cart, X, Minus, Plus, Lock, Refresh } from './icons';
import Stars from './Stars';

const UPSELLS = [
  { id: 'glow-mist', t: 'Glow Priming Mist', p: 18, s: 'Lock in luminosity, AM & PM' },
  { id: 'collagen', t: 'Collagen Glow Boost', p: 24, s: 'Add to any drink for plumper skin' },
];

const FREE_GIFT = 75;

export default function CartDrawer() {
  const shop = useShop();
  const { cart, cartOpen, closeCart, cartSubtotal, cartListTotal, cartLoading } = shop;

  const subtotal = cartSubtotal;
  const saved = cartListTotal - subtotal;
  const toGift = Math.max(0, FREE_GIFT - subtotal);
  const giftPc = Math.min(100, (subtotal / FREE_GIFT) * 100);

  return (
    <>
      <div className={`scrim ${cartOpen ? 'show' : ''}`} onClick={closeCart} />
      <aside className={`drawer ${cartOpen ? 'show' : ''}`} aria-hidden={!cartOpen}>
        <div className="drawer-head">
          <h3>Your bag</h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Close"><X /></button>
        </div>

        <div className="drawer-progress">
          {toGift > 0
            ? <>You&rsquo;re <b>{shop.fmt(toGift)}</b> away from a <b>free Glow Mist</b> 🎁</>
            : <>🎉 You&rsquo;ve unlocked a <b>free Glow Mist!</b></>}
          <div className="track"><div className="fill" style={{ width: `${giftPc}%` }} /></div>
        </div>

        <div className="drawer-body">
          {cart.length === 0 && !cartLoading && (
            <div className="cart-empty">
              <Cart style={{ width: 40, height: 40, margin: '0 auto 14px', color: 'var(--muted)' }} />
              <p>Your bag is empty.</p>
              <button className="btn btn--gold" onClick={() => { closeCart(); document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Shop the glow
              </button>
            </div>
          )}
          {cart.length === 0 && cartLoading && (
            <div className="cart-empty">
              <p>Updating cart...</p>
            </div>
          )}
          {cart.map((it) => (
            <div className="cart-line" key={it.id}>
              {it.image?.url
                ? <img src={it.image.url} alt={it.image.altText || it.t} className="cart-thumb" style={{ objectFit: 'cover' }} />
                : <div className="cart-thumb" />
              }
              <div className="info">
                <div className="t">{it.t}</div>
                <div className="s">{it.sub}</div>
                <div className="qty">
                  <button onClick={() => shop.setQty(it.id, it.qty - 1)}><Minus style={{ width: 14, height: 14 }} /></button>
                  <span>{it.qty}</span>
                  <button onClick={() => shop.setQty(it.id, it.qty + 1)}><Plus style={{ width: 14, height: 14 }} /></button>
                </div>
              </div>
              <div className="price">{shop.fmt(it.price * it.qty)}</div>
            </div>
          ))}

          {cart.length > 0 && (
            <div className="upsell">
              <h5>Complete your ritual</h5>
              {UPSELLS.filter((u) => !cart.find((c) => c.id === u.id)).map((u) => (
                <div className="upsell-item" key={u.id} style={{ marginTop: 10 }}>
                  <div className="upsell-thumb" />
                  <div className="info">
                    <div className="t">{u.t}</div>
                    <div className="p">{u.s} &middot; {shop.fmt(u.p)}</div>
                  </div>
                  <button className="upsell-add" onClick={() => shop.addItemLocal({ id: u.id, t: u.t, sub: 'Add-on', price: u.p, list: u.p, qty: 1 })}>
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-foot">
            {saved > 0 && <div className="save-note">You&rsquo;re saving {shop.fmt(saved)} 🎉</div>}
            <div className="row">
              <span className="lab">Subtotal</span>
              <span className="tot">{shop.fmt(subtotal)}</span>
            </div>
            <button className="btn btn--gold btn--block btn--lg" onClick={shop.checkout} disabled={cartLoading}>
              {cartLoading ? 'Processing...' : 'Secure checkout'}
            </button>
            <div className="offer-meta" style={{ marginTop: 14 }}>
              <span><Lock /> SSL encrypted</span>
              <span><Refresh /> 30-day returns</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
