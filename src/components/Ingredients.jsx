import { INGREDIENTS } from '../data/static';
import { Leaf, CrueltyFree, Flask, Drop } from './icons';
import ImagePlaceholder from './ImagePlaceholder';

export default function Ingredients() {
  return (
    <section className="section section--warm" id="ingredients">
      <div className="wrap">
        <div className="section-head center reveal">
          <h2 className="display h-slab">Clean, Trusted, Powerful Ingredients</h2>
          <p className="ing-subnote">We don&rsquo;t just promise a glow, we deliver it through science-backed ingredients that enhance your natural radiance while nourishing your skin and body from within.</p>
          <div className="trust-badges">
            <span className="trust-badge"><Leaf /> 100% Vegan</span>
            <span className="trust-badge"><CrueltyFree /> Cruelty-Free</span>
            <span className="trust-badge"><Flask /> Dermatologically Tested</span>
            <span className="trust-badge"><Drop /> No Parabens or Sulphates</span>
          </div>
        </div>
        <div className="ing-grid">
          {INGREDIENTS.map((ing, i) => (
            <div className="ing-card reveal" key={i} style={{transitionDelay:`${i*70}ms`}}>
              <div className="ing-photo">
                <ImagePlaceholder placeholder={ing.cap} />
              </div>
              <span className="ing-tag">{ing.pct}</span>
              <h4>{ing.name}</h4>
              <p>{ing.s}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
