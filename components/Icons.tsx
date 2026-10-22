type P = { size?: number; className?: string };

export const Check = ({ size = 18, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden>
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="M5.8 10.4l2.7 2.7 5.7-5.9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Star = ({ size = 16, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" className={className} aria-hidden>
    <path fill="currentColor" d="M10 1.6l2.5 5.4 5.9.6-4.4 4 1.3 5.8L10 14.5l-5.3 2.9L6 11.6l-4.4-4 5.9-.6z" />
  </svg>
);

export const Menu = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Bag = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M4 9h16l-1.6 10.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8z" />
    <path d="M8.5 9l2-5M15.5 9l-2-5" strokeLinecap="round" />
  </svg>
);

export const Chevron = ({ size = 18, dir = "right" }: P & { dir?: "left" | "right" | "down" }) => {
  const r = dir === "left" ? 180 : dir === "down" ? 90 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ transform: `rotate(${r}deg)` }}>
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const Eye = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const Shield = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" strokeLinecap="round" />
  </svg>
);

export const Truck = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z" />
    <circle cx="6" cy="18" r="2" fill="#fff" />
    <circle cx="17" cy="18" r="2" fill="#fff" />
  </svg>
);

export const Book = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 21V5M8 7h7" strokeLinecap="round" />
  </svg>
);

export const Gift = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M3 9h18v4H3zM5 13h14v8H5zM12 9v12" />
    <path d="M12 9c-1.5-3-5-4-5.5-2S9 9 12 9zm0 0c1.5-3 5-4 5.5-2S15 9 12 9z" />
  </svg>
);

export const Snow = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2" />
  </svg>
);

export const Close = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
