import { Star, StarHalf } from './icons';

export default function Stars({ value = 5, ...p }) {
  return (
    <span className="stars" {...p}>
      {[0, 1, 2, 3, 4].map(i => {
        const full = value >= i + 1;
        const half = !full && value > i;
        return half
          ? <StarHalf key={i} style={{ width: 18, height: 18, color: 'var(--star)' }} />
          : <Star key={i} style={{ opacity: full ? 1 : 0.26 }} />;
      })}
    </span>
  );
}
