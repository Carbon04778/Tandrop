import { COMPARE } from '../data/static';
import { Check, X } from './icons';

function Cell({ v }) {
  if (v === true) return <span className="cmp-yes"><Check /></span>;
  if (v === false) return <span className="cmp-no"><X /></span>;
  return <span style={{fontWeight:700}}>{v}</span>;
}

export default function Comparison() {
  return (
    <section className="section section--warm" id="compare">
      <div className="wrap">
        <div className="section-head center reveal">
          <p className="eyebrow">How we compare</p>
          <h2 className="display h-slab">The smarter glow</h2>
        </div>
        <div className="reveal" style={{overflowX:'auto'}}>
          <table className="cmp-table">
            <thead>
              <tr>
                <th></th>
                <th className="col-us">Tandrop</th>
                <th>Spray Tan</th>
                <th>Sunbeds</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={i}>
                  <td>{row.f}</td>
                  <td className="col-us"><Cell v={row.us} /></td>
                  <td><Cell v={row.spray} /></td>
                  <td><Cell v={row.beds} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
