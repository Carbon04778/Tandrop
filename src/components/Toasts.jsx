import { useState, useEffect, useRef } from 'react';
import Stars from './Stars';

const NAMES = [
  'Sophie in Leeds', 'Amara in London', 'Bella in Bristol', 'Priya in Manchester',
  'Chloe in Glasgow', 'Elena in Dublin', 'Mia in Cardiff', 'Jas in York', 'Tara in Brighton',
];
const PACKS = ['the 3-Bottle Bundle', 'the 2-Bottle Bundle', 'a Tandrop bottle', 'the Best-Seller Bundle'];

export default function Toasts() {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    let timer, hideTimer;
    const ping = () => {
      const id = ++idRef.current;
      const who = NAMES[Math.floor(Math.random() * NAMES.length)];
      const what = PACKS[Math.floor(Math.random() * PACKS.length)];
      const mins = Math.floor(Math.random() * 40) + 2;
      setItems((it) => [...it, { id, who, what, mins }]);
      hideTimer = setTimeout(() => {
        setItems((it) => it.map((x) => (x.id === id ? { ...x, out: true } : x)));
        setTimeout(() => setItems((it) => it.filter((x) => x.id !== id)), 400);
      }, 4500);
    };
    const loop = () => {
      ping();
      timer = setTimeout(loop, 9000 + Math.random() * 6000);
    };
    const start = setTimeout(loop, 4000);
    return () => { clearTimeout(start); clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="toast-stack">
      {items.map((it) => (
        <div className={`toast ${it.out ? 'out' : ''}`} key={it.id}>
          <div className="toast-thumb" />
          <div>
            <div className="t">{it.who} just ordered {it.what}</div>
            <div className="s"><Stars value={5} /> {it.mins} minutes ago &middot; Verified</div>
          </div>
        </div>
      ))}
    </div>
  );
}
