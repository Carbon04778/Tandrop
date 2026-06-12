import { useShop } from './context/ShopContext';
import Nav from './components/Nav';
import Configurator from './components/Configurator';
import Press from './components/Press';
import Problem from './components/Problem';
import Solution from './components/Solution';
import BeforeAfter from './components/BeforeAfter';
import Reviews from './components/Reviews';
import Ingredients from './components/Ingredients';
import Timeline from './components/Timeline';
import Comparison from './components/Comparison';
import SocialProof from './components/SocialProof';
import FAQ from './components/FAQ';
import Offer from './components/Offer';
import Guarantee from './components/Guarantee';
import Footer from './components/Footer';
import StickyBar from './components/StickyBar';
import CartDrawer from './components/CartDrawer';
import EmailModal from './components/EmailModal';
import Toasts from './components/Toasts';

export default function App() {
  const { flash } = useShop();

  return (
    <>
      <div className="announce">
        <div className="announce-track">
          {Array.from({ length: 2 }).map((_, r) => (
            <div className="announce-seq" key={r} aria-hidden={r === 1 ? 'true' : undefined}>
              <span className="announce-item">Free delivery on orders over £45</span>
              <span className="announce-dot" />
              <span className="announce-item">UK's No.1 rated tan for sensitive skin</span>
              <span className="announce-dot" />
              <span className="announce-item">Save up to 25% off with bundles</span>
              <span className="announce-dot" />
              <span className="announce-item">30-day money-back guarantee</span>
              <span className="announce-dot" />
            </div>
          ))}
        </div>
      </div>
      <Nav />
      <main>
        <Configurator />
        <Press />
        <Problem />
        <Solution />
        <BeforeAfter />
        <Reviews />
        <Ingredients />
        <Timeline />
        <Comparison />
        <SocialProof />
        <FAQ />
        <Offer />
        <Guarantee />
      </main>
      <Footer />

      <StickyBar />
      <CartDrawer />
      <EmailModal />
      <Toasts />
      {flash && <div className="flash-toast">{flash}</div>}
    </>
  );
}
