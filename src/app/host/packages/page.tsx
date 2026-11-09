"use client";

import Link from "next/link";
import { packages, destinations, hosts } from "@/lib/data";
import { Star, Users, Clock } from "lucide-react";

export default function HostPackagesPage() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Your Packages</h1>
        <p className="text-xs text-zinc-500">Manage listings & bookings</p>
      </header>
      <div className="space-y-3 px-5 py-4">
        <Link
          href="/host/packages/new"
          className="block rounded-2xl border-2 border-dashed border-accent-soft bg-accent-soft p-4 text-center text-sm font-semibold text-accent-ink"
        >
          + Create new package
        </Link>
        {packages.map((p) => {
          const d = destinations.find((x) => x.id === p.destinationId);
          const h = hosts.find((x) => x.id === p.hostId);
          return (
            <div key={p.id} className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-zinc-900">{p.title}</h3>
                <span className="text-sm font-black text-accent">₹{p.price.toLocaleString()}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-500">{d?.name} • {h?.name}</p>
              <div className="mt-2 flex gap-3 text-xs text-zinc-600">
                <span className="flex items-center gap-1"><Clock size={12} /> {p.duration}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {p.groupSize}</span>
                <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {p.rating}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <Link href={`/traveler/package/${p.id}`} className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">View</Link>
                <button className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">Edit</button>
                <button className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">Bookings</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}