const IconBase = ({ d, fill, vb = "0 0 24 24", sw = 1.7, children, ...p }) => (
  <svg viewBox={vb} fill={fill || "none"} stroke={fill ? "none" : "currentColor"}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" {...p}>
    {d ? <path d={d} /> : children}
  </svg>
);

export { IconBase };

export const Star = (p) => <IconBase {...p} fill="currentColor" sw={0} d="M12 2.5l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16.9 6.2 20.6l1.5-6.5-5-4.4 6.6-.6z" />;

export const StarHalf = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <defs><linearGradient id="sh"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs>
    <path d="M12 2.5l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16.9 6.2 20.6l1.5-6.5-5-4.4 6.6-.6z" fill="url(#sh)" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

export const Drop = (p) => <IconBase {...p} d="M12 3c3 4 6 7 6 10.5A6 6 0 016 13.5C6 10 9 7 12 3z" />;

export const Check = (p) => <IconBase {...p} d="M20 6L9 17l-5-5" sw={2.4} />;

export const X = (p) => <IconBase {...p} d="M18 6L6 18M6 6l12 12" sw={2} />;

export const Plus = (p) => <IconBase {...p} d="M12 5v14M5 12h14" sw={2} />;

export const Minus = (p) => <IconBase {...p} d="M5 12h14" sw={2} />;

export const Cart = (p) => <IconBase {...p} d="M3 4h2l2.4 12.5a1 1 0 001 .8h8.7a1 1 0 001-.8L21 8H7" />;

export const Sun = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="4.2"/>
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M5 5l1.8 1.8M17.2 17.2L19 19M19 5l-1.8 1.8M6.8 17.2L5 19"/>
  </IconBase>
);

export const Leaf = (p) => <IconBase {...p} d="M5 19c0-8 6-13 14-13 0 9-5 14-13 14a8 8 0 01-1-1zM5 19c2-4 5-6 8-7" />;

export const ShieldX = (p) => (
  <IconBase {...p}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/>
    <path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/>
  </IconBase>
);

export const Clock = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 7.5V12l3 2"/>
  </IconBase>
);

export const Wallet = (p) => (
  <IconBase {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5"/>
    <path d="M16 12.5h2"/>
    <path d="M3 9h13a2 2 0 012 2"/>
  </IconBase>
);

export const Sparkle = (p) => <IconBase {...p} d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />;

export const Heart = (p) => <IconBase {...p} d="M12 20s-7-4.3-7-9.3A4.1 4.1 0 0112 7a4.1 4.1 0 017 3.7c0 5-7 9.3-7 9.3z" />;

export const Routine = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 8v4l2.5 1.5"/>
  </IconBase>
);

export const Vegan = (p) => <IconBase {...p} d="M5 19c0-8 6-13 14-13 0 9-5 14-13 14a8 8 0 01-1-1zM5 19c2-4 5-6 8-7" />;

export const Glow = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="3.6"/>
    <path d="M12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20M6.3 6.3l1 1M16.7 16.7l1 1M17.7 6.3l-1 1M7.3 16.7l-1 1"/>
  </IconBase>
);

export const ArrowsLR = (p) => <IconBase {...p} d="M8 7l-4 5 4 5M16 7l4 5-4 5" />;

export const Truck = (p) => (
  <IconBase {...p}>
    <rect x="2" y="6" width="13" height="10" rx="1.5"/>
    <path d="M15 9h4l3 3v4h-7z"/>
    <circle cx="6.5" cy="17.5" r="1.8"/>
    <circle cx="18" cy="17.5" r="1.8"/>
  </IconBase>
);

export const Lock = (p) => (
  <IconBase {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2"/>
    <path d="M8 11V8a4 4 0 018 0v3"/>
  </IconBase>
);

export const Refresh = (p) => <IconBase {...p} d="M20 11A8 8 0 005 6.5L3 8m0 0V4m0 4h4M4 13a8 8 0 0015 4.5L21 16m0 0v4m0-4h-4" />;

export const Menu = (p) => <IconBase {...p} d="M3 6h18M3 12h18M3 18h18" sw={2} />;

export const CrueltyFree = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="14.6" r="4.4"/>
    <path d="M9.9 10.3C8.8 7 8.7 4 10.1 4c1.2 0 1.55 2.6 1.35 5.4"/>
    <path d="M14.1 10.3C15.2 7 15.3 4 13.9 4c-1.2 0-1.55 2.6-1.35 5.4"/>
    <path d="M10.8 14.4h2.4"/>
  </IconBase>
);

export const Flask = (p) => (
  <IconBase {...p}>
    <path d="M9.5 3h5M10.5 3v5.2l-4.4 8.3a2 2 0 001.8 2.9h8.2a2 2 0 001.8-2.9l-4.4-8.3V3"/>
    <path d="M8.2 14.5h7.6"/>
  </IconBase>
);

export const Info = (p) => (
  <IconBase {...p}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 11v5"/>
    <circle cx="12" cy="7.8" r="0.6" fill="currentColor" stroke="none"/>
  </IconBase>
);

export const ICON_MAP = {
  Star, StarHalf, Drop, Check, X, Plus, Minus, Cart, Sun, Leaf,
  ShieldX, Clock, Wallet, Sparkle, Heart, Routine, Vegan, Glow,
  ArrowsLR, Truck, Lock, Refresh, Menu, CrueltyFree, Flask, Info,
};
