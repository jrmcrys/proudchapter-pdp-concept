"use client";

import { useEffect, useState } from "react";
import { lastOrderDate } from "@/lib/catalog";
import { Snow } from "./Icons";

export default function ChristmasBar({ live }: { live: boolean }) {
  const [msg, setMsg] = useState<{ date: string; days: number } | null>(null);

  useEffect(() => {
    const now = new Date();
    const year = now.getMonth() === 11 && now.getDate() > 24 ? now.getFullYear() + 1 : now.getFullYear();
    const cutoff = lastOrderDate(new Date(year, 11, 24), 7);
    cutoff.setHours(23, 59, 59, 0);
    const days = Math.ceil((cutoff.getTime() - now.getTime()) / 86400000);
    setMsg({
      date: cutoff.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
      days,
    });
  }, []);

  if (!live || !msg || msg.days < 0) return null;

  return (
    <div className="xmas" role="status">
      <Snow />
      <span>
        For Christmas Eve, order by <b>{msg.date}</b>
        <span className="xmas__days">
          {msg.days === 0 ? "Last day today" : `${msg.days} day${msg.days === 1 ? "" : "s"} left`}
        </span>
      </span>
    </div>
  );
}
