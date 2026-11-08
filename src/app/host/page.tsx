"use client";

import Link from "next/link";
import { useState } from "react";
import { packages, destinations, hosts } from "@/lib/data";
import { Plus, Star, Users } from "lucide-react";

export default function HostPage() {
  const [created, setCreated] = useState<string[]>([]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Host Dashboard</h1>
        <p className="text-xs text-zinc-500">Curate packages & reach travelers</p>
      </header>

      <div className="space-y-5 px-5 py-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="Packages" value={packages.length + created.length} />
          <Stat label="Bookings" value="128" />
          <Stat label="Earnings" value="₹4.2L" />
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="text-sm font-bold text-emerald-900">Become a verified host</h3>
          <p className="mt-1 text-xs text-emerald-700">List homestays, guide services, transport or food. Verification badge boosts bookings by 3x.</p>
          <button className="mt-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white">Apply now</button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-900">Your packages</h2>
            <Link
              href="/host/packages/new"
              className="flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white"
            >
              <Plus size={13} /> New package
            </Link>
          </div>

          {created.length > 0 && (
            <div className="mb-3 space-y-2">
              {created.map((t) => (
                <div key={t} className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-sm font-bold text-emerald-900">{t}</p>
                  <p className="text-xs text-emerald-700">Draft saved • pending review</p>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {packages.slice(0, 4).map((p) => {
              const d = destinations.find((x) => x.id === p.destinationId);
              const h = hosts.find((x) => x.id === p.hostId);
              return (
                <div key={p.id} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-zinc-900">{p.title}</p>
                    <p className="text-sm font-black text-emerald-600">₹{p.price.toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-zinc-500">{d?.name} • {h?.name} • ⭐ {p.rating}</p>
                  <div className="mt-2 flex gap-2">
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">Edit</button>
                    <button className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-700">View bookings</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-sm font-bold text-zinc-900">Verified hosts</h2>
          <div className="space-y-2">
            {hosts.filter((h) => h.verified).map((h) => (
              <div key={h.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-lg">{h.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-zinc-900">{h.name} <span className="text-emerald-600">✓</span></p>
                  <p className="text-xs text-zinc-500">{h.type} • {h.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3">
      <p className="text-lg font-black text-zinc-900">{value}</p>
      <p className="text-[10px] font-medium text-zinc-500">{label}</p>
    </div>
  );
}

