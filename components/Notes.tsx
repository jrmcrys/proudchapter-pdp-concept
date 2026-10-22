"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type NotesCtx = { on: boolean; toggle: () => void };
const Ctx = createContext<NotesCtx>({ on: false, toggle: () => {} });

export function NotesProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  return <Ctx.Provider value={{ on, toggle: () => setOn((v) => !v) }}>{children}</Ctx.Provider>;
}

export function useNotes() {
  return useContext(Ctx);
}

export const NOTES: { n: number; title: string; body: string }[] = [
  {
    n: 1,
    title: "A Christmas order-by date, plus an arrival window",
    body: "Christmas Eve Mouse is the one title with a hard deadline, and the live page never says when to order. Printing and shipping take 5 to 7 business days, so the last safe day is Tuesday, Dec 15. The bar and the 'arrives between' line both calculate from today, so they stay correct without anyone editing them.",
  },
  {
    n: 2,
    title: "Softcover and hardcover, priced up front",
    body: "The live page says 'soft or hardcover' but never shows what hardcover costs. Here both prices sit in the buy box, with hardcover marked as the gift choice. Suggested A/B test: hardcover preselected vs. softcover preselected, measured on AOV and on preview-to-order rate.",
  },
  {
    n: 3,
    title: "Add-ons that reuse what already exists",
    body: "Dedication page, poster and gift wrap are the upsells named in the role. Each one reuses an asset the order already has (the photo, a finished spread), so each is one new SKU with the print partner and no new illustration work.",
  },
  {
    n: 4,
    title: "Second book at 25% off",
    body: "Shipping is a flat $6.95 however many books are in the box, so a second book costs nothing extra to ship. At Christmas the obvious second copy is a sibling or a cousin. The buyer picks the title now and personalizes it after the first preview.",
  },
  {
    n: 5,
    title: "A free gift note",
    body: "Reviews on the live site include grandparents ordering for grandchildren. A free note with prices left off the packing slip lets them ship straight to the child instead of to themselves first.",
  },
  {
    n: 6,
    title: "The full total before the preview",
    body: "The buyer sees book, extras, shipping and total before they upload a photo. That matches the shop's own promise that nothing is added afterwards. On the live store, the button would carry these choices into the photo step so they are not lost after the preview.",
  },
  {
    n: 7,
    title: "UK and Europe prices, ready for launch",
    body: "Switch the market in the buy box. UK and EU use local round prices rather than straight conversions. The delivery promise and Christmas date hide for markets the shop does not ship to yet, so the page never promises what operations cannot do.",
  },
  {
    n: 8,
    title: "Photo-to-character slider on the product page",
    body: "Likeness is the worry that comes up most in reviews ('I was fully prepared for the face to be almost right'). The homepage already has this slider; the product page, where the decision happens, did not.",
  },
  {
    n: 9,
    title: "Price and review stars for Google",
    body: "Added Product, Offer, shipping, return policy and AggregateRating structured data. The live page has none, so search results show no price or stars. One caution: the 4.8 from 13,837 reviews is store-wide, and Google expects ratings for the specific product, so this should switch to per-title ratings once the review app splits them.",
  },
];

export function Note({ n }: { n: number }) {
  const { on } = useNotes();
  const note = NOTES.find((x) => x.n === n);
  if (!on || !note) return null;
  return (
    <aside className="note" aria-label={`Reviewer note ${n}`}>
      <span className="note__n">{n}</span>
      <div>
        <strong>{note.title}</strong>
        <p>{note.body}</p>
      </div>
    </aside>
  );
}

export function NotesToggle() {
  const { on, toggle } = useNotes();
  return (
    <button className={`notes-toggle${on ? " is-on" : ""}`} onClick={toggle} aria-pressed={on}>
      <span className="notes-toggle__dot" aria-hidden />
      {on ? "Hide my notes" : "What I changed and why"}
    </button>
  );
}
