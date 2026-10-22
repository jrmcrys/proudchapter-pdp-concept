"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MARKETS, SECOND_BOOK_OPTIONS, money, addBusinessDays, round2, BUNDLE_DISCOUNT, type MarketId } from "@/lib/catalog";
import { buildOrder, type BuyState } from "@/lib/order";
import { Book, Check, Eye, Gift, Shield, Star, Truck } from "./Icons";
import { Note } from "./Notes";

type Props = {
  marketId: MarketId;
  setMarketId: (m: MarketId) => void;
  state: BuyState;
  setState: (fn: (s: BuyState) => BuyState) => void;
  onPersonalize: () => void;
  ctaRef: React.RefObject<HTMLButtonElement | null>;
};

const fmtDay = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

export default function BuyBox({ marketId, setMarketId, state, setState, onPersonalize, ctaRef }: Props) {
  const m = MARKETS[marketId];
  const order = buildOrder(state, m);
  const set = <K extends keyof BuyState>(k: K, v: BuyState[K]) => setState((s) => ({ ...s, [k]: v }));

  const [arrival, setArrival] = useState<string | null>(null);
  useEffect(() => {
    const now = new Date();
    setArrival(`${fmtDay(addBusinessDays(now, 5))} and ${fmtDay(addBusinessDays(now, 7))}`);
  }, []);

  const bookPrice = state.format === "hard" ? m.hard : m.soft;
  const secondPrice = round2(bookPrice * (1 - BUNDLE_DISCOUNT));

  return (
    <div className="buy">
      <div className="buy__market">
        <label htmlFor="market">Prices in</label>
        <select id="market" value={marketId} onChange={(e) => setMarketId(e.target.value as MarketId)}>
          {Object.values(MARKETS).map((mk) => (
            <option key={mk.id} value={mk.id}>
              {mk.label}
            </option>
          ))}
        </select>
      </div>
      <Note n={7} />

      <h1 className="buy__title">Christmas Eve Mouse</h1>

      <a className="buy__rating" href="#reviews">
        <span className="stars" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} />
          ))}
        </span>
        <span>4.8/5.0</span>
        <span className="muted">(13,837 reviews)</span>
      </a>

      <div className="pills">
        <span className="pill">
          <b>Shows:</b> Small helpers do big things
        </span>
        <span className="pill pill--quiet">Ages 2 to 8</span>
      </div>

      <ul className="checks">
        <li><Check className="ic-green" /> See the full book free in about 30 sec</li>
        <li><Check className="ic-green" /> Your child in every scene and rhyme</li>
        <li><Check className="ic-green" /> 26 colorful pages, soft or hardcover</li>
        <li><Check className="ic-green" /> Printed in the USA, 5 to 7 business days</li>
      </ul>

      <p className="buy__blurb">
        On Christmas Eve, a sneeze shrinks your child to mouse size, and Mistletoe the mouse needs help to make the magic dust that lets Santa in.
      </p>
      <p className="buy__blurb">
        A story that shows: one kind &ldquo;I&apos;ll help you!&rdquo; can save Christmas. A crumb, a wish, a climb to the treetop, and then back to bed.
      </p>

      {/* FORMAT */}
      <fieldset className="opt-group">
        <legend>Choose the book</legend>
        <div className="formats">
          <label className={`format${state.format === "soft" ? " is-on" : ""}`}>
            <input type="radio" name="format" checked={state.format === "soft"} onChange={() => set("format", "soft")} />
            <span className="format__name">Softcover</span>
            <span className="format__meta">Light, flexible, thick paper</span>
            <span className="format__price">
              <s>{money(m.compareSoft, m)}</s> {money(m.soft, m)}
            </span>
          </label>
          <label className={`format${state.format === "hard" ? " is-on" : ""}`}>
            <span className="format__tag">Best for gifting</span>
            <input type="radio" name="format" checked={state.format === "hard"} onChange={() => set("format", "hard")} />
            <span className="format__name">Hardcover</span>
            <span className="format__meta">Rigid cover, built for years of bedtimes</span>
            <span className="format__price">{money(m.hard, m)}</span>
          </label>
        </div>
      </fieldset>
      <Note n={2} />

      {/* ADD-ONS */}
      <fieldset className="opt-group">
        <legend>Make it more of a gift</legend>

        <label className={`addon${state.dedication ? " is-on" : ""}`}>
          <input type="checkbox" checked={state.dedication} onChange={(e) => set("dedication", e.target.checked)} />
          <Image src="/img/dedication.webp" alt="" width={64} height={64} className="addon__img" />
          <span className="addon__text">
            <b>Dedication page</b>
            <span>Your words and their photo on the first page</span>
          </span>
          <span className="addon__price">+{money(m.dedication, m)}</span>
        </label>
        {state.dedication && (
          <div className="addon__field">
            <label htmlFor="ded">What should it say?</label>
            <textarea
              id="ded"
              maxLength={160}
              rows={2}
              placeholder="For Lily, our littlest helper. Love, Mom and Dad."
              value={state.dedicationText}
              onChange={(e) => set("dedicationText", e.target.value)}
            />
            <small>{160 - state.dedicationText.length} characters left. You can change it after the preview.</small>
          </div>
        )}

        <label className={`addon${state.poster ? " is-on" : ""}`}>
          <input type="checkbox" checked={state.poster} onChange={(e) => set("poster", e.target.checked)} />
          <Image src="/img/poster.webp" alt="" width={64} height={64} className="addon__img" />
          <span className="addon__text">
            <b>Matching poster</b>
            <span>12 x 16 in print of the treetop spread, unframed</span>
          </span>
          <span className="addon__price">+{money(m.poster, m)}</span>
        </label>

        <label className={`addon${state.wrap ? " is-on" : ""}`}>
          <input type="checkbox" checked={state.wrap} onChange={(e) => set("wrap", e.target.checked)} />
          <Image src="/img/giftwrap.webp" alt="" width={64} height={64} className="addon__img" />
          <span className="addon__text">
            <b>Gift wrap</b>
            <span>Kraft paper, red twine and a tag, ready for the tree</span>
          </span>
          <span className="addon__price">+{money(m.wrap, m)}</span>
        </label>
      </fieldset>
      <Note n={3} />

      {/* SECOND BOOK */}
      <div className={`bundle${state.second ? " is-on" : ""}`}>
        <label className="bundle__head">
          <input type="checkbox" checked={state.second} onChange={(e) => set("second", e.target.checked)} />
          <span>
            <b>Add a second book, 25% off</b>
            <span className="muted">
              {money(secondPrice, m)} instead of {money(bookPrice, m)}. Ships in the same box, no extra shipping.
            </span>
          </span>
        </label>
        {state.second && (
          <div className="bundle__body">
            <label htmlFor="second">Which book?</label>
            <select id="second" value={state.secondTitle} onChange={(e) => set("secondTitle", e.target.value)}>
              {SECOND_BOOK_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <small>Same format as the first. You personalize it right after the first preview.</small>
          </div>
        )}
      </div>
      <Note n={4} />

      {/* GIFT NOTE */}
      <div className={`gift${state.gift ? " is-on" : ""}`}>
        <label className="gift__head">
          <input type="checkbox" checked={state.gift} onChange={(e) => set("gift", e.target.checked)} />
          <Gift />
          <span>
            <b>Sending it straight to them?</b> Add a free note and we leave the prices off.
          </span>
        </label>
        {state.gift && (
          <div className="addon__field">
            <label htmlFor="giftmsg">Your note</label>
            <textarea
              id="giftmsg"
              maxLength={200}
              rows={3}
              placeholder="Merry Christmas, Lily. Read this one with Mommy on Christmas Eve. Love, Grandma"
              value={state.giftText}
              onChange={(e) => set("giftText", e.target.value)}
            />
            <small>Printed on a card in the box. {200 - state.giftText.length} characters left.</small>
          </div>
        )}
      </div>
      <Note n={5} />

      {/* SUMMARY */}
      <div className="summary" aria-live="polite">
        {order.lines.map((l, i) => (
          <div className="summary__row" key={i}>
            <span>
              {l.label}
              {l.note && <em className="summary__tag">{l.note}</em>}
            </span>
            <span>{l.amount === 0 ? "Free" : money(l.amount, m)}</span>
          </div>
        ))}
        <div className="summary__row muted">
          <span>Shipping, flat</span>
          <span>{money(order.shipping, m)}</span>
        </div>
        <div className="summary__total">
          <span>Total</span>
          <span>{money(order.total, m)}</span>
        </div>
        {order.savings > 0 && <p className="summary__save">You save {money(order.savings, m)}</p>}
      </div>

      <button ref={ctaRef} className="cta" onClick={onPersonalize}>
        Personalize and preview, free
      </button>
      <p className="cta__sub">
        <Eye /> Nothing is charged until you have read every page.
      </p>
      <Note n={6} />

      <div className="delivery">
        <Truck />
        {m.live ? (
          <span>
            Order today, at the door between <b suppressHydrationWarning>{arrival ?? "5 and 7 business days from today"}</b>
          </span>
        ) : (
          <span>
            {m.id === "uk" ? "UK" : "Europe"} delivery opens soon. These are the launch prices.
          </span>
        )}
      </div>

      <div className="trust">
        <span><Shield /> Damaged or wrong? Replaced free.</span>
        <span><Book /> Printed for one child, after you order.</span>
      </div>
    </div>
  );
}
