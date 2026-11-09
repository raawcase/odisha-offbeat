"use client";

import Link from "next/link";
import { packages, getDestination, getHost } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import { Package as PkgIcon, Star, Users, Clock } from "lucide-react";

export default function PackagesPage() {
  const { isPkgSaved, togglePackage } = useSaved();
  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Host Packages</h1>
        <p className="text-xs text-zinc-500">Curated itineraries by local hosts</p>
      </header>
      <div className="space-y-3 px-5 py-4">
        {packages.map((p) => {
          const d = getDestination(p.destinationId);
          const h = getHost(p.hostId);
          return (
            <Link
              key={p.id}
              href={`/traveler/package/${p.id}`}
              className="block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >
              <div className="relative h-36 w-full bg-gradient-to-br from-accent to-teal-600">
                {d && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={d.image} alt={d.name} className="h-full w-full object-cover opacity-90" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-white/80">{d?.district}</p>
                  <h3 className="text-base font-bold">{p.title}</h3>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); togglePackage(p.id); }}
                  className="absolute right-3 top-3 rounded-full bg-white/30 p-1.5 backdrop-blur"
                >
                  <HeartIcon filled={isPkgSaved(p.id)} />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">{h?.name} {h?.verified ? "✓ verified" : ""}</p>
                  <p className="text-base font-black text-accent">₹{p.price.toLocaleString()}</p>
                </div>
                <div className="mt-2 flex gap-3 text-xs text-zinc-600">
                  <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {p.groupSize}</span>
                  <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {p.rating}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.includes.slice(0, 4).map((inc) => (
                    <span key={inc} className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] text-zinc-600">{inc}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f43f5e" : "none"} stroke={filled ? "#f43f5e" : "white"} strokeWidth="2">
      <path d="M12 21s-7-4.5-9.5-9C.5 8 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}