import { PRESS } from '../data/static';

export default function Press() {
  return (
    <div className="press">
      <div className="wrap press-inner">
        <span className="press-label">As seen in</span>
        {PRESS.map(p => <span key={p} className="press-logo">{p}</span>)}
      </div>
    </div>
  );
}
