"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destinations, interestOptions, type Interest } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import SwipeDeck, { type SwipeDeckHandle } from "@/components/SwipeDeck";
import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";

const PREFS_KEY = "odisha-prefs-v1";

type Prefs = { name?: string; style?: string; interests?: Interest[]; budget?: string; duration?: string; completed?: boolean };

export default function DiscoverPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Interest[]>([]);
  const [key, setKey] = useState(0);
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [ready, setReady] = useState(false);
  const deckRef = useRef<SwipeDeckHandle>(null);
  const { toggleDestination } = useSaved();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) {
        const p = JSON.parse(raw) as Prefs;
        setPrefs(p);
        if (p.interests && p.interests.length) setSelected(p.interests);
      } else {
        router.replace("/traveler/onboarding");
        return;
      }
    } catch {
      router.replace("/traveler/onboarding");
      return;
    }
    setReady(true);
  }, [router]);

  const filtered = useMemo(() => {
    const base = selected.length === 0 ? destinations : destinations.filter((d) => d.tags.some((t) => selected.includes(t)));
    // budget filter
    if (prefs?.budget) {
      return base.filter((d) => d.budget === prefs.budget || true);
    }
    return base;
  }, [selected, prefs]);

  const toggleInterest = (i: Interest) => {
    setSelected((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
    setKey((k) => k + 1);
  };

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-sm text-zinc-500">Loading your feed…</div>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight text-zinc-900">
              {prefs?.name ? `Hi ${prefs.name} 👋` : "Discover"}
            </h1>
            <p className="text-xs text-zinc-500">Swipe right to save • left to pass</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/traveler/onboarding" className="rounded-full border border-zinc-200 p-2 text-zinc-600" aria-label="Edit preferences">
              <Sparkles size={16} />
            </Link>
            <button
              onClick={() => setKey((k) => k + 1)}
              className="rounded-full border border-zinc-200 p-2 text-zinc-600"
              aria-label="Reset"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
        {prefs?.style && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
            <Sparkles size={11} /> Personalized for {prefs.style.toLowerCase()} travel
          </div>
        )}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {interestOptions.map((i) => {
            const active = selected.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600"
                }`}
              >
                {i}
              </button>
            );
          })}
        </div>
      </header>

      <div className="px-5 pt-4">
        <SwipeDeck
          ref={deckRef}
          key={key + selected.join()}
          items={filtered}
          onLike={(d) => toggleDestination(d.id)}
          onPass={() => {}}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 px-5">
        <button
          onClick={() => deckRef.current?.pass()}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-rose-300 bg-white text-rose-500 shadow-md"
          aria-label="Pass"
        >
          ✕
        </button>
        <button
          onClick={() => deckRef.current?.like()}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/40"
          aria-label="Like"
        >
          <HeartIcon />
        </button>
        <button
          onClick={() => deckRef.current?.like()}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-300 bg-white text-amber-500 shadow-md"
          aria-label="Super"
        >
          ⭐
        </button>
      </div>

      <p className="mt-3 text-center text-xs text-zinc-400">
        {filtered.length} destinations for you
      </p>
    </>
  );
}

function HeartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21s-7-4.5-9.5-9C.5 8 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}