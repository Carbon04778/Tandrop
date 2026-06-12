export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a href="#top" className="brand">Tandrop<sup>&reg;</sup></a>
            <p className="footer-blurb">The glow you drink. A daily ritual for natural, sun-kissed radiance. No UV, no streaks, no compromise.</p>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              <li><a href="#offer">Tanning Drops</a></li>
              <li><a href="#offer">Bundles</a></li>
              <li><a href="#offer">Subscribe &amp; Save</a></li>
              <li><a href="#offer">Gift Sets</a></li>
            </ul>
          </div>
          <div>
            <h5>Learn</h5>
            <ul>
              <li><a href="#ingredients">Ingredients</a></li>
              <li><a href="#solution">How it works</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5>Support</h5>
            <ul>
              <li><a href="#guarantee">30-Day Guarantee</a></li>
              <li><a href="#">Track order</a></li>
              <li><a href="#">Contact us</a></li>
              <li><a href="#">Shipping &amp; returns</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Tandrop. All rights reserved.</span>
          <span>These statements have not been evaluated by the MHRA/FDA. Not intended to diagnose, treat or cure any condition.</span>
        </div>
      </div>
    </footer>
  );
}
