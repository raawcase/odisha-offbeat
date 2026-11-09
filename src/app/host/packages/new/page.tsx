"use client";

import { useState } from "react";
import { destinations } from "@/lib/data";
import Link from "next/link";

export default function NewPackagePage() {
  const [title, setTitle] = useState("");
  const [dest, setDest] = useState(destinations[0].id);
  const [price, setPrice] = useState("5000");
  const [duration, setDuration] = useState("2 days / 1 night");
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href="/host/packages" className="text-zinc-600">←</Link>
          <div>
            <h1 className="text-xl font-black tracking-tight text-zinc-900">New Package</h1>
            <p className="text-xs text-zinc-500">Curate an itinerary for travelers</p>
          </div>
        </div>
      </header>
      <div className="px-5 py-4">
        {saved ? (
          <div className="rounded-2xl bg-accent-soft p-6 text-center">
            <div className="text-4xl">✅</div>
            <p className="mt-2 text-sm font-bold text-accent-ink">Package saved (mock)</p>
            <p className="mt-1 text-xs text-accent-ink">In production this goes to review & publishing.</p>
            <Link href="/host/packages" className="mt-3 inline-block rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
              Back to packages
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              placeholder="Package title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <select
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              value={dest}
              onChange={(e) => setDest(e.target.value)}
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.district})</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                className="w-1/2 rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                placeholder="Price (₹)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="w-1/2 rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                placeholder="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <textarea
              className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              rows={4}
              placeholder="Day-wise itinerary (one activity per line)"
            />
            <button type="submit" className="w-full rounded-2xl bg-accent py-3 text-sm font-bold text-white shadow-lg shadow-accent/30">
              Save package (mock)
            </button>
          </form>
        )}
      </div>
    </>
  );
}