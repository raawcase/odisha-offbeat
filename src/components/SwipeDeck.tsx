"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { Destination } from "@/lib/data";
import DestinationCard from "./DestinationCard";

export type SwipeDeckHandle = {
  like: () => void;
  pass: () => void;
};

const SwipeDeck = forwardRef<SwipeDeckHandle, {
  items: Destination[];
  onLike: (d: Destination) => void;
  onPass: (d: Destination) => void;
}>(function SwipeDeck({ items, onLike, onPass }, ref) {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [exit, setExit] = useState<"left" | "right" | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);

  const current = items[index];
  const next = items[index + 1];

  const doSwipe = (dir: "left" | "right") => {
    if (!current || exit) return;
    setExit(dir);
    setTimeout(() => {
      if (dir === "right") onLike(current);
      else onPass(current);
      setExit(null);
      setDrag({ x: 0, y: 0, active: false });
      setIndex((i) => i + 1);
    }, 260);
  };

  useImperativeHandle(ref, () => ({ like: () => doSwipe("right"), pass: () => doSwipe("left") }), [current, exit]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (exit) return;
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
    (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current || exit) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  };
  const finish = () => {
    if (!start.current || exit || !current) return;
    const dx = drag.x;
    start.current = null;
    if (Math.abs(dx) > 110) {
      doSwipe(dx > 0 ? "right" : "left");
    } else {
      setDrag({ x: 0, y: 0, active: false });
    }
  };

  if (!current) {
    return (
      <div className="flex h-[520px] flex-col items-center justify-center rounded-3xl bg-zinc-100 text-center">
        <div className="text-5xl">🎉</div>
        <p className="mt-3 text-lg font-bold text-zinc-800">You've seen them all!</p>
        <p className="mt-1 text-sm text-zinc-500">Check your Saved trips or reset deck.</p>
        <button
          onClick={() => setIndex(0)}
          className="mt-4 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white"
        >
          Start over
        </button>
      </div>
    );
  }

  const rotation = drag.x / 15;
  const style: React.CSSProperties = exit
    ? { transform: `translateX(${exit === "right" ? 600 : -600}px) rotate(${exit === "right" ? 30 : -30}deg)`, transition: "transform 0.26s ease, opacity 0.26s ease", opacity: 0 }
    : { transform: `translate(${drag.x}px, ${drag.y * 0.4}px) rotate(${rotation}deg)`, transition: drag.active ? "none" : "transform 0.3s ease" };

  const likeOpacity = Math.min(1, Math.max(0, drag.x / 100));
  const passOpacity = Math.min(1, Math.max(0, -drag.x / 100));

  return (
    <div className="relative h-[520px] w-full select-none touch-none">
      {next && (
        <div className="absolute inset-0 scale-[0.95] opacity-70">
          <DestinationCard destination={next} compact />
        </div>
      )}
      <div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finish}
        onPointerCancel={finish}
      >
        <DestinationCard destination={current} />
        <div
          className="pointer-events-none absolute right-6 top-8 rounded-xl border-4 border-emerald-400 px-4 py-1 text-2xl font-black text-emerald-400"
          style={{ opacity: likeOpacity, transform: "rotate(-15deg)" }}
        >
          LIKE
        </div>
        <div
          className="pointer-events-none absolute left-6 top-8 rounded-xl border-4 border-rose-400 px-4 py-1 text-2xl font-black text-rose-400"
          style={{ opacity: passOpacity, transform: "rotate(15deg)" }}
        >
          NOPE
        </div>
      </div>
    </div>
  );
});

export default SwipeDeck;