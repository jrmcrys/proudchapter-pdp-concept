"use client";

import Image from "next/image";
import { useState } from "react";

export default function LikenessSlider() {
  const [pos, setPos] = useState(50);
  return (
    <div className="likeness">
      <div className="likeness__frame" style={{ ["--pos" as string]: `${pos}%` }}>
        <Image src="/img/character.webp" alt="The character as drawn in the book's style" fill sizes="(max-width: 860px) 100vw, 480px" />
        <div className="likeness__top">
          <Image src="/img/photo.webp" alt="The photograph that was uploaded" fill sizes="(max-width: 860px) 100vw, 480px" />
        </div>
        <span className="likeness__label likeness__label--l">Photo</span>
        <span className="likeness__label likeness__label--r">In the book</span>
        <span className="likeness__handle" aria-hidden />
        <input
          className="likeness__range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Drag to compare the photo with the drawn character"
        />
      </div>
    </div>
  );
}
