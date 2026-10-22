export type MarketId = "us" | "uk" | "eu";
export type Format = "soft" | "hard";

export type Market = {
  id: MarketId;
  label: string;
  currency: string;
  locale: string;
  /** true when the shop ships to this market today */
  live: boolean;
  soft: number;
  hard: number;
  compareSoft: number;
  dedication: number;
  poster: number;
  wrap: number;
  shipping: number;
};

// US prices match proudchapter.com today ($19.95, was $39.95, flat $6.95 shipping).
// Hardcover and add-on prices are proposals. UK and EU are local round prices for launch.
export const MARKETS: Record<MarketId, Market> = {
  us: {
    id: "us",
    label: "United States (USD $)",
    currency: "USD",
    locale: "en-US",
    live: true,
    soft: 19.95,
    hard: 29.95,
    compareSoft: 39.95,
    dedication: 4.95,
    poster: 14.95,
    wrap: 5.95,
    shipping: 6.95,
  },
  uk: {
    id: "uk",
    label: "United Kingdom (GBP £)",
    currency: "GBP",
    locale: "en-GB",
    live: false,
    soft: 17.95,
    hard: 26.95,
    compareSoft: 35.95,
    dedication: 3.95,
    poster: 12.95,
    wrap: 4.95,
    shipping: 5.95,
  },
  eu: {
    id: "eu",
    label: "Europe (EUR €)",
    currency: "EUR",
    locale: "en-IE",
    live: false,
    soft: 19.95,
    hard: 29.95,
    compareSoft: 39.95,
    dedication: 4.95,
    poster: 14.95,
    wrap: 5.95,
    shipping: 6.95,
  },
};

export const BUNDLE_DISCOUNT = 0.25;

export const SECOND_BOOK_OPTIONS = [
  "Christmas Eve Mouse (for another child)",
  "Look What You Can Do",
  "Lullaby Lane",
  "The Last One Awake",
  "Goodnight, Little Dreamer",
  "Your Child and the Dinosaurs",
  "When the Giants Walked",
  "The Monster Truck Parade",
  "Little Lantern",
  "Your Child and the Lost Egg",
  "Your Child's Alphabet Zoo",
  "Nursery Rhymes For You",
  "Your Little Book of Blessings",
];

export function money(value: number, m: Market) {
  return new Intl.NumberFormat(m.locale, {
    style: "currency",
    currency: m.currency,
  }).format(value);
}

export function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/** Adds business days (Mon to Fri) to a date. */
export function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) added++;
  }
  return d;
}

/** Last order date that still lands by `deliverBy` with `maxDays` business days of print and transit. */
export function lastOrderDate(deliverBy: Date, maxDays: number) {
  const d = new Date(deliverBy);
  let counted = 0;
  while (counted < maxDays) {
    const wd = d.getDay();
    if (wd !== 0 && wd !== 6) counted++;
    d.setDate(d.getDate() - 1);
  }
  // d is now the day before the first business day of the window: that is the order day
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  return d;
}
