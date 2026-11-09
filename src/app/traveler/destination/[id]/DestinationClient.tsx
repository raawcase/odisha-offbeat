"use client";

import Image from "next/image";
import Link from "next/link";
import { getDestination, getHost, getPackagesForDestination } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import AppShell from "@/components/AppShell";
import { ArrowLeft, Heart, MapPin, Calendar, Wallet, Mountain } from "lucide-react";

export default function DestinationClient({ id }: { id: string }) {
  const d = getDestination(id);
  const { isDestSaved, toggleDestination } = useSaved();

  if (!d) {
    return (
      <AppShell>
        <div className="p-6 text-center">Destination not found.</div>
      </AppShell>
    );
  }

  const pkgs = getPackagesForDestination(d.id);

  return (
    <AppShell>
      <div className="relative h-72 w-full">
        <Image src={d.image} alt={d.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Link href="/traveler/discover" className="absolute left-4 top-4 rounded-full bg-white/30 p-2 text-white backdrop-blur">
          <ArrowLeft size={18} />
        </Link>
        <button
          onClick={() => toggleDestination(d.id)}
          className="absolute right-4 top-4 rounded-full bg-white/30 p-2 backdrop-blur"
        >
          <Heart size={18} className={isDestSaved(d.id) ? "fill-rose-500 text-rose-500" : "text-white"} />
        </button>
        <div className="absolute bottom-4 left-5 right-5 text-white">
          <p className="text-xs font-medium text-white/80">{d.emoji} {d.district}, Odisha</p>
          <h1 className="text-2xl font-black">{d.name}</h1>
          <p className="text-sm text-white/90">{d.tagline}</p>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div className="flex flex-wrap gap-2">
          {d.tags.map((t) => (
            <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-ink">{t}</span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat icon={<Calendar size={14} />} label="Duration" value={d.duration} />
          <Stat icon={<Wallet size={14} />} label="Budget" value={d.budget} />
          <Stat icon={<Mountain size={14} />} label="Difficulty" value={d.difficulty} />
        </div>

        <p className="text-sm leading-relaxed text-zinc-700">{d.description}</p>

        <div>
          <h3 className="mb-2 text-sm font-bold text-zinc-900">Highlights</h3>
          <div className="flex flex-wrap gap-1.5">
            {d.highlights.map((h) => (
              <span key={h} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">{h}</span>
            ))}
          </div>
          <p className="mt-2 text-xs text-zinc-500">Best season: {d.bestSeason}</p>
        </div>

        <EssentialsBlock d={d} />

        {pkgs.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-zinc-900">Host Packages</h3>
            <div className="space-y-3">
              {pkgs.map((p) => {
                const host = getHost(p.hostId);
                return (
                  <Link
                    key={p.id}
                    href={`/traveler/package/${p.id}`}
                    className="block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-zinc-900">{p.title}</h4>
                      <span className="text-sm font-black text-accent">₹{p.price.toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500">{p.duration} • {p.groupSize} people • ⭐ {p.rating} ({p.reviews})</p>
                    <p className="mt-1 text-xs text-zinc-600">by {host?.name} {host?.verified ? "✓" : ""}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-bold text-zinc-900">Local Hosts</h3>
          <div className="space-y-2">
            {d.hostIds.map((hid) => {
              const h = getHost(hid);
              if (!h) return null;
              return (
                <div key={h.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-xl">{h.avatar}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-zinc-900">{h.name} {h.verified && <span className="text-accent">✓</span>}</p>
                    <p className="text-xs text-zinc-500">{h.type} • {h.location}</p>
                    <p className="text-xs text-zinc-600">{h.bio}</p>
                  </div>
                </div>
              );
            })}
            {d.hostIds.length === 0 && <p className="text-xs text-zinc-500">No verified hosts yet — be the first!</p>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-2">
      <div className="flex items-center justify-center gap-1 text-zinc-500">{icon}<span className="text-[10px]">{label}</span></div>
      <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function EssentialsBlock({ d }: { d: NonNullable<ReturnType<typeof getDestination>> }) {
  const sections = [
    { title: "Transport", items: d.essentials.transport, emoji: "🚌" },
    { title: "Stays", items: d.essentials.stays, emoji: "🏠" },
    { title: "Food", items: d.essentials.food, emoji: "🍽️" },
    { title: "Amenities", items: d.essentials.amenities, emoji: "ℹ️" },
  ];
  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-zinc-900">Essentials</h3>
      <div className="space-y-2">
        {sections.map((s) => (
          <details key={s.title} className="group rounded-xl border border-zinc-200 bg-white">
            <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-zinc-800">
              <span>{s.emoji}</span> {s.title}
              <span className="ml-auto text-zinc-400 group-open:rotate-180">▾</span>
            </summary>
            <ul className="space-y-1 px-3 pb-2 text-xs text-zinc-600">
              {s.items.map((it) => <li key={it} className="flex gap-1.5"><span>•</span>{it}</li>)}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}