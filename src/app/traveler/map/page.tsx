"use client";

import Link from "next/link";
import { destinations } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function MapPage() {
  // Odisha bounds
  const minLat = 17.8, maxLat = 22.6, minLng = 81.3, maxLng = 87.6;
  const toXY = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;
    return { x, y };
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Map View</h1>
        <p className="text-xs text-zinc-500">Off-beat destinations across Odisha</p>
      </header>

      <div className="px-5 py-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-accent-soft via-teal-50 to-amber-50">
          {/* district labels */}
          <span className="absolute left-[8%] top-[12%] text-[10px] font-semibold text-zinc-400">Mayurbhanj</span>
          <span className="absolute left-[55%] top-[28%] text-[10px] font-semibold text-zinc-400">Angul</span>
          <span className="absolute left-[30%] top-[45%] text-[10px] font-semibold text-zinc-400">Kandhamal</span>
          <span className="absolute left-[12%] top-[62%] text-[10px] font-semibold text-zinc-400">Koraput</span>
          <span className="absolute left-[70%] top-[60%] text-[10px] font-semibold text-zinc-400">Ganjam</span>
          <span className="absolute left-[78%] top-[35%] text-[10px] font-semibold text-zinc-400">Kendrapara</span>

          {destinations.map((d) => {
            const { x, y } = toXY(d.lat, d.lng);
            return (
              <Link
                key={d.id}
                href={`/traveler/destination/${d.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className="group relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm shadow-lg ring-2 ring-white transition-transform group-hover:scale-125">
                    {d.emoji}
                  </div>
                  <span className="pointer-events-none absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-zinc-700 opacity-0 shadow group-hover:opacity-100">
                    {d.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-bold text-zinc-900">All destinations</h3>
          {destinations.map((d) => (
            <Link
              key={d.id}
              href={`/traveler/destination/${d.id}`}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3"
            >
              <MapPin size={16} className="text-accent" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-zinc-900">{d.name}</p>
                <p className="text-xs text-zinc-500">{d.district} • {d.duration}</p>
              </div>
              <span className="text-xs font-bold text-accent">{d.budget}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}