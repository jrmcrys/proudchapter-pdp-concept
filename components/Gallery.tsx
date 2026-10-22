"use client";

import Image from "next/image";
import { useState } from "react";
import { Chevron } from "./Icons";

const SLIDES = [
  { src: "/img/cover.webp", alt: "The square hardcover lying flat on frosty sage green, the girl in red pajamas and Mistletoe the mouse beside the tree on its cover.", w: 1024, h: 1024 },
  { src: "/img/spread-tree.webp", alt: "The book open to a spread: the girl, mouse-sized, climbing the Christmas tree with Mistletoe, with its verse on the right page.", w: 1024, h: 1024 },
  { src: "/img/spread-mousehole.webp", alt: "A full spread: cocoa and a cookie crumb at a thimble table inside Mistletoe's mouse hole.", w: 1024, h: 688 },
  { src: "/img/dedication.webp", alt: "The optional dedication page with the child's photograph and a family's own words.", w: 1024, h: 1024 },
  { src: "/img/formats.webp", alt: "Softcover and hardcover side by side.", w: 1024, h: 688 },
  { src: "/img/giftwrap.webp", alt: "The book in kraft gift wrap with twine and a tag, on a table by the fire.", w: 1024, h: 1024 },
  { src: "/img/poster.webp", alt: "The matching poster, framed above a child's bed.", w: 896, h: 1120 },
];

export default function Gallery() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + SLIDES.length) % SLIDES.length);
  const s = SLIDES[i];

  return (
    <div className="gallery">
      <div className="gallery__main">
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={s.w}
          height={s.h}
          priority={i === 0}
          sizes="(max-width: 860px) 100vw, 560px"
          className="gallery__img"
        />
        <span className="badge-usa" aria-label="Made in the USA, printed and bound">
          <span>Made in the USA</span>
          <small>Printed &amp; bound</small>
        </span>
        <button className="gallery__arrow gallery__arrow--l" onClick={() => go(-1)} aria-label="Previous image">
          <Chevron dir="left" />
        </button>
        <button className="gallery__arrow gallery__arrow--r" onClick={() => go(1)} aria-label="Next image">
          <Chevron />
        </button>
        <span className="gallery__count">
          {i + 1} / {SLIDES.length}
        </span>
      </div>
      <div className="gallery__thumbs" role="tablist" aria-label="Product images">
        {SLIDES.map((t, idx) => (
          <button
            key={t.src}
            role="tab"
            aria-selected={idx === i}
            className={`gallery__thumb${idx === i ? " is-active" : ""}`}
            onClick={() => setI(idx)}
          >
            <Image src={t.src} alt="" width={120} height={120} sizes="72px" />
          </button>
        ))}
      </div>
      <p className="gallery__caption">An example. Your child&apos;s name and face go here.</p>
    </div>
  );
}
