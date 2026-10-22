import { BUNDLE_DISCOUNT, type Format, type Market, round2 } from "./catalog";

export type BuyState = {
  format: Format;
  dedication: boolean;
  dedicationText: string;
  poster: boolean;
  wrap: boolean;
  gift: boolean;
  giftText: string;
  second: boolean;
  secondTitle: string;
};

export const INITIAL_BUY: BuyState = {
  format: "hard",
  dedication: false,
  dedicationText: "",
  poster: false,
  wrap: false,
  gift: false,
  giftText: "",
  second: false,
  secondTitle: "Christmas Eve Mouse (for another child)",
};

export type Line = { label: string; amount: number; note?: string };

export function buildOrder(s: BuyState, m: Market) {
  const bookPrice = s.format === "hard" ? m.hard : m.soft;
  const formatName = s.format === "hard" ? "Hardcover" : "Softcover";
  const lines: Line[] = [{ label: `Christmas Eve Mouse, ${formatName.toLowerCase()}`, amount: bookPrice }];
  let savings = s.format === "soft" ? m.compareSoft - m.soft : 0;

  if (s.dedication) lines.push({ label: "Dedication page", amount: m.dedication });
  if (s.poster) lines.push({ label: "Matching poster", amount: m.poster });
  if (s.wrap) lines.push({ label: "Gift wrap", amount: m.wrap });
  if (s.gift) lines.push({ label: "Gift note, prices left off", amount: 0 });

  if (s.second) {
    const full = bookPrice;
    const disc = round2(full * (1 - BUNDLE_DISCOUNT));
    const sameBook = s.secondTitle.startsWith("Christmas Eve Mouse");
    const secondLabel = sameBook ? "Second copy, for another child" : s.secondTitle;
    lines.push({ label: `${secondLabel}, ${formatName.toLowerCase()}`, amount: disc, note: "25% off" });
    savings += full - disc;
    if (s.format === "soft") savings += m.compareSoft - m.soft;
  }

  const subtotal = round2(lines.reduce((a, l) => a + l.amount, 0));
  const shipping = m.shipping;
  const total = round2(subtotal + shipping);
  return { lines, subtotal, shipping, total, savings: round2(savings), books: s.second ? 2 : 1 };
}
