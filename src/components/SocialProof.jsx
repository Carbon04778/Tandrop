import { useShop } from '../context/ShopContext';
import { Heart } from './icons';
import ImagePlaceholder from './ImagePlaceholder';

const creators = [
  { handle: '@sophiaglows', followers: '1.1m followers', shade: 'Medium', cap: 'Creator reel: beach glow' },
  { handle: '@amara.kxo', followers: '130k followers', shade: 'Olive', cap: 'Creator reel: getting ready' },
  { handle: '@romy.tans', followers: '42.2k followers', shade: 'Light', cap: 'Creator reel: poolside' },
];

export default function SocialProof() {
  const shop = useShop();
  const goShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section className="section section--warm" id="loved">
      <div className="wrap">
        <div className="proof-top center reveal">
          <span className="pill"><Heart style={{width:14,height:14}}/> Loved by 50,000+ women</span>
          <h2 className="display h-slab proof-headline">Tan Drop on social media</h2>
          <p className="ing-subcopy">Real women, real glow, tagged #Tandrop across the feed.</p>
        </div>
        <div className="creator-grid">
          {creators.map((c, i) => (
            <div className="creator-card reveal" key={i} style={{transitionDelay:`${i*80}ms`}}>
              <div className="creator-video">
                <ImagePlaceholder placeholder={c.cap} style={{width:'100%',height:'100%'}} />
                <div className="creator-meta">
                  <span className="creator-ava" />
                  <span className="creator-id">
                    <span className="creator-handle">{c.handle} <svg className="vbadge" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5l2.3 1.9 3 .2.9 2.9 2.4 1.8-.9 2.9.9 2.9-2.4 1.8-.9 2.9-3 .2L12 22.5l-2.3-1.9-3-.2-.9-2.9L3.4 15.7l.9-2.9-.9-2.9 2.4-1.8.9-2.9 3-.2z"/><path d="M9.6 12.3l1.7 1.7 3.4-3.6" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    <span className="creator-followers">{c.followers}</span>
                  </span>
                </div>
                <span className="creator-shade">{c.shade}</span>
                <div className="creator-controls">
                  <svg className="vctrl" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  <span className="vtime">0:00</span>
                  <span className="vtrack"><span className="vfill" /></span>
                  <svg className="vctrl" viewBox="0 0 24 24" fill="currentColor"><path d="M4 9v6h4l5 4V5L8 9H4z"/></svg>
                  <svg className="vctrl" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>
                </div>
              </div>
              <div className="creator-shop">
                <span className="creator-thumb" />
                <div className="creator-prod">
                  <span className="cp-name">Tandrop&trade; Tanning Drops</span>
                  <span className="cp-price">{shop.fmt(shop.bundles[0].total)}</span>
                </div>
                <button className="creator-btn" onClick={goShop}>Shop Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
