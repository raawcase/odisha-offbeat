"use client";

import Link from "next/link";
import { destinations, packages, getDestination } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import { Heart, Trash2 } from "lucide-react";

export default function SavedPage() {
  const { saved, toggleDestination, togglePackage } = useSaved();
  const savedDests = destinations.filter((d) => saved.destinations.includes(d.id));
  const savedPkgs = packages.filter((p) => saved.packages.includes(p.id));

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Saved Trips</h1>
        <p className="text-xs text-zinc-500">{savedDests.length + savedPkgs.length} items saved</p>
      </header>

      <div className="px-5 py-4">
        {savedDests.length === 0 && savedPkgs.length === 0 && (
          <div className="rounded-2xl bg-zinc-50 p-8 text-center">
            <div className="text-4xl">🤍</div>
            <p className="mt-2 text-sm font-semibold text-zinc-700">Nothing saved yet</p>
            <p className="mt-1 text-xs text-zinc-500">Swipe right on destinations you love.</p>
            <Link href="/traveler/discover" className="mt-3 inline-block rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
              Start discovering
            </Link>
          </div>
        )}

        {savedDests.length > 0 && (
          <section className="mb-6">
            <h2 className="mb-2 text-sm font-bold text-zinc-900">Destinations ({savedDests.length})</h2>
            <div className="space-y-2">
              {savedDests.map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.name} className="h-14 w-14 rounded-lg object-cover" />
                  <Link href={`/traveler/destination/${d.id}`} className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">{d.name}</p>
                    <p className="text-xs text-zinc-500">{d.district} • {d.duration} • {d.budget}</p>
                  </Link>
                  <button onClick={() => toggleDestination(d.id)} className="text-rose-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {savedPkgs.length > 0 && (
          <section>
            <h2 className="mb-2 text-sm font-bold text-zinc-900">Packages ({savedPkgs.length})</h2>
            <div className="space-y-2">
              {savedPkgs.map((p) => {
                const d = getDestination(p.destinationId);
                return (
                  <div key={p.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                    {d && <img src={d.image} alt={d.name} className="h-14 w-14 rounded-lg object-cover" />}
                    <Link href={`/traveler/package/${p.id}`} className="flex-1">
                      <p className="text-sm font-bold text-zinc-900">{p.title}</p>
                      <p className="text-xs text-zinc-500">₹{p.price.toLocaleString()} • {p.duration}</p>
                    </Link>
                    <button onClick={() => togglePackage(p.id)} className="text-rose-500">
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </>
  );
}