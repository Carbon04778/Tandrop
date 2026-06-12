import { useShop } from '../context/ShopContext';
import { Cart } from './icons';

export default function Nav() {
  const shop = useShop();
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <nav className="nav-links">
          <a href="#solution">How it works</a>
          <a href="#ingredients">Ingredients</a>
          <a href="#reviews">Reviews</a>
        </nav>
        <a href="#shop" className="brand" aria-label="Tandrop home">
          <img src="/assets/tandrop-logo.png" alt="Tandrop" className="brand-logo" />
        </a>
        <div className="nav-right">
          <a href="#shop" className="btn btn--ghost" style={{padding:'10px 20px', fontSize:14}}>Shop</a>
          <button className="icon-btn" onClick={shop.openCart} aria-label="Cart">
            <Cart />
            {shop.cartCount > 0 && <span className="cart-count">{shop.cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
