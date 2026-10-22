"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MARKETS, money, type MarketId } from "@/lib/catalog";
import { INITIAL_BUY, buildOrder, type BuyState } from "@/lib/order";
import BuyBox from "./BuyBox";
import ChristmasBar from "./ChristmasBar";
import Gallery from "./Gallery";
import LikenessSlider from "./LikenessSlider";
import { Bag, Chevron, Close, Menu, Star } from "./Icons";
import { Note, NotesProvider, NotesToggle, NOTES, useNotes } from "./Notes";

const FAQ = [
  {
    q: "Can I see the book before I pay?",
    a: "Yes. Upload one photo and the whole book opens on screen in about half a minute, cover to last page. You pay only if you want it printed.",
  },
  {
    q: "What makes a good photo?",
    a: "One child, face clearly visible, looking roughly at the camera, in daylight. An everyday phone photo is enough.",
  },
  {
    q: "When do I need to order for Christmas?",
    a: "Every book is printed after it is ordered, then shipped: 5 to 7 business days to a US address. For delivery by Christmas Eve, order by Tuesday, December 15.",
  },
  {
    q: "Can I add a second book later?",
    a: "Yes, but adding it now keeps both in one box under the same flat shipping, and the second one is 25% off.",
  },
  {
    q: "What is on the dedication page?",
    a: "The first page of the book: your own words, up to 160 characters, beside the photo you uploaded. You can edit the words after the preview.",
  },
  {
    q: "What about returns?",
    a: "A book made for one child cannot be resold, so it cannot be returned on a change of mind. That is why you read every page first. If it arrives damaged or wrong, we replace it.",
  },
];

function Header({ count }: { count: number }) {
  return (
    <header className="header">
      <button className="icon-btn" aria-label="Menu">
        <Menu />
      </button>
      <a className="wordmark" href="#top" aria-label="Proudchapter home">
        Proudchapter
      </a>
      <button className="icon-btn" aria-label={`Cart, ${count} items`}>
        <Bag />
        {count > 0 && <span className="cart-dot">{count}</span>}
      </button>
    </header>
  );
}

function ConceptBanner() {
  const { on, toggle } = useNotes();
  return (
    <div className="concept">
      <span>
        <b>Concept page</b> by Jerome R. Not affiliated with Proudchapter. No orders or photos are taken here.
      </span>
      <button onClick={toggle} className="concept__btn">
        {on ? "Hide notes" : "See what I changed"}
      </button>
    </div>
  );
}

function NotesPanel() {
  const { on } = useNotes();
  if (!on) return null;
  return (
    <section className="notes-panel wrap" aria-label="All changes">
      <h2>What I changed and why</h2>
      <p className="muted">
        Built on the live Christmas Eve Mouse page (same story, prices, brand and layout), with these additions. Numbers match the
        markers on the page.
      </p>
      <ol>
        {NOTES.map((n) => (
          <li key={n.n}>
            <b>{n.title}.</b> {n.body}
          </li>
        ))}
      </ol>
    </section>
  );
}

function ConceptModal({ open, onClose, state, marketId }: { open: boolean; onClose: () => void; state: BuyState; marketId: MarketId }) {
  const m = MARKETS[marketId];
  const order = buildOrder(state, m);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={onClose}>
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close icon-btn" onClick={onClose} aria-label="Close">
          <Close />
        </button>
        <p className="eyebrow">Step 1 of 2 on the live store</p>
        <h2 id="modal-title">This is where the photo step opens</h2>
        <p>
          On proudchapter.com this button goes to the photo upload. In this concept it carries your choices with it, so they are
          still there after the preview:
        </p>
        <ul className="modal__list">
          {order.lines.map((l, i) => (
            <li key={i}>
              <span>{l.label}</span>
              <span>{l.amount === 0 ? "Free" : money(l.amount, m)}</span>
            </li>
          ))}
          <li className="muted">
            <span>Shipping</span>
            <span>{money(order.shipping, m)}</span>
          </li>
          <li className="modal__total">
            <span>Total after preview</span>
            <span>{money(order.total, m)}</span>
          </li>
        </ul>
        <p className="muted small">No photo is uploaded and nothing is charged on this page.</p>
        <button className="cta" onClick={onClose}>
          Back to the book
        </button>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [marketId, setMarketId] = useState<MarketId>("us");
  const [state, setStateRaw] = useState<BuyState>(INITIAL_BUY);
  const setState = (fn: (s: BuyState) => BuyState) => setStateRaw(fn);
  const [modal, setModal] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const m = MARKETS[marketId];
  const order = buildOrder(state, m);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <NotesProvider>
      <div id="top" />
      <ConceptBanner />
      <Header count={0} />
      <ChristmasBar live={m.live} />
      <div className="wrap">
        <Note n={1} />
      </div>
      <NotesPanel />

      <main>
        <section className="pdp wrap">
          <Gallery />
          <BuyBox
            marketId={marketId}
            setMarketId={setMarketId}
            state={state}
            setState={setState}
            onPersonalize={() => setModal(true)}
            ctaRef={ctaRef}
          />
        </section>

        <section className="band">
          <div className="wrap split">
            <div>
              <p className="eyebrow">Drawn from your photo</p>
              <h2>That&apos;s the child in the photograph</h2>
              <p>
                The character keeps the face, the hair and the coloring of the child you upload, drawn in the book&apos;s own style.
                Drag the handle and see.
              </p>
              <Note n={8} />
            </div>
            <LikenessSlider />
          </div>
        </section>

        <section className="wrap steps-sec">
          <h2>How it works</h2>
          <ol className="steps">
            <li>
              <span className="steps__n">1</span>
              <h3>Upload a photo</h3>
              <p>One child, face clearly visible. It does not have to be a good photograph.</p>
            </li>
            <li>
              <span className="steps__n">2</span>
              <h3>See the character</h3>
              <p>About 30 seconds later the character is drawn in the style of the book. Not right? Have it drawn again.</p>
            </li>
            <li>
              <span className="steps__n">3</span>
              <h3>Read it together</h3>
              <p>The whole book opens on screen. Buy it if it is right, then read the printed one with them on Christmas Eve.</p>
            </li>
          </ol>
        </section>

        <section className="wrap every">
          <div className="every__img">
            <Image src="/img/spread-mousehole.webp" alt="A spread from the book: cocoa at a thimble table inside the mouse hole" width={1024} height={688} sizes="(max-width: 860px) 100vw, 1100px" />
          </div>
          <div className="every__text">
            <h2>On every page, not only the cover</h2>
            <p>
              Your child is drawn into each scene: the sneeze, the climb, the cocoa in Mistletoe&apos;s mouse hole, the treetop and the
              walk back to bed. Their name runs through the rhymes. That is what makes a child look for themselves on the next page.
            </p>
            <div className="spec">
              <div><b>26</b><span>pages</span></div>
              <div><b>Square</b><span>soft or hardcover</span></div>
              <div><b>2 to 8</b><span>years</span></div>
            </div>
          </div>
        </section>

        <section className="wrap reviews" id="reviews">
          <div className="reviews__head">
            <div>
              <h2>What buyers said</h2>
              <p className="reviews__agg">
                <span className="stars" aria-hidden>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={20} />
                  ))}
                </span>
                <b>4.8</b> from 13,837 reviews across all books
              </p>
            </div>
            <div className="elsewhere">
              <span><b>Trustpilot</b> 4.7 / 5 &middot; 1,671 reviews</span>
              <span><b>Google</b> 4.9 / 5 &middot; 942 reviews</span>
            </div>
          </div>
          <div className="reviews__grid">
            <figure className="review">
              <blockquote>&ldquo;He didn&apos;t want it to end. I&apos;m calling this a tradition now&hellip;&rdquo;</blockquote>
              <figcaption>Patricia L., North Carolina &middot; Christmas Eve Mouse</figcaption>
            </figure>
            <figure className="review">
              <blockquote>&ldquo;The art team did something special with the lighting in this book.&rdquo;</blockquote>
              <figcaption>Heather M., Charlotte, NC &middot; Christmas Eve Mouse</figcaption>
            </figure>
            <figure className="review review--placeholder">
              <p>
                Excerpts from reviews published on proudchapter.com. On the live page this grid loads the full feed from the review app,
                filtered to this title first.
              </p>
            </figure>
          </div>
          <Note n={9} />
        </section>

        <section className="wrap faq">
          <h2>Questions</h2>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <Chevron dir="down" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </section>

        <section className="wrap final">
          <Image src="/img/cover.webp" alt="" width={220} height={220} className="final__img" />
          <div>
            <h2>One photo, then read the whole book</h2>
            <p className="muted">Free to preview. {m.live ? "Order by Tuesday, Dec 15 for Christmas Eve." : ""}</p>
            <button className="cta cta--inline" onClick={() => setModal(true)}>
              Personalize and preview, free
            </button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer__in">
          <span className="wordmark wordmark--sm">Proudchapter</span>
          <p>
            Concept product page built by Jerome R. with Claude Code, Next.js and Vercel. Illustrations are AI-generated for this mockup
            and show an invented child. Brand, story and prices belong to Pet Printed LLC. Live store:{" "}
            <a href="https://proudchapter.com/mistletoe-mouse-christmas-eve-rescue">proudchapter.com</a>.
          </p>
        </div>
      </footer>

      <div className={`buybar${showBar ? " is-shown" : ""}`} aria-hidden={!showBar}>
        <div className="buybar__price">
          <span className="muted small">{order.books === 2 ? "2 books" : state.format === "hard" ? "Hardcover" : "Softcover"} + shipping</span>
          <b>{money(order.total, m)}</b>
        </div>
        <button className="cta" onClick={() => setModal(true)} tabIndex={showBar ? 0 : -1}>
          Personalize, free
        </button>
      </div>

      <NotesToggle />
      <ConceptModal open={modal} onClose={() => setModal(false)} state={state} marketId={marketId} />
    </NotesProvider>
  );
}
