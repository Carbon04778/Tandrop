import { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { X } from './icons';

export default function EmailModal() {
  const { modal, closeModal } = useShop();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!modal) setDone(false);
  }, [modal]);

  if (!modal) return null;

  const isExit = modal === 'exit';

  return (
    <div className="modal-scrim show" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}><X /></button>
        <div className="modal-art">
          <span className="pct">{isExit ? '15%' : '10%'}</span>
        </div>
        <div className="modal-body">
          {done ? (
            <>
              <h3 className="display">Check your inbox</h3>
              <p>Your code <b style={{ color: 'var(--gold-deep)' }}>{isExit ? 'GLOW15' : 'GLOW10'}</b> is on its way. It&rsquo;s auto-applied at checkout too.</p>
              <button className="btn btn--gold btn--block" onClick={() => { closeModal(); document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Shop now
              </button>
            </>
          ) : (
            <>
              <p className="eyebrow" style={{ marginBottom: 10 }}>{isExit ? 'Wait, before you go' : 'New here?'}</p>
              <h3 className="display">{isExit ? 'Take 15% off your glow' : 'Unlock 10% off'}</h3>
              <p>{isExit ? 'Don’t leave empty-handed. Enter your email for an exclusive 15% code, first order only.' : 'Join 50,000+ women and get 10% off your first bottle, plus glow tips.'}</p>
              <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
                <input type="email" required placeholder="you@email.com" />
                <button className="btn btn--gold btn--block" type="submit">{isExit ? 'Claim 15% off' : 'Get my 10% off'}</button>
              </form>
              <button className="modal-decline" onClick={closeModal}>No thanks, I&rsquo;ll pay full price</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
