"use client";

import Link from "next/link";
import Image from "next/image";
import { getPackage, getDestination, getHost } from "@/lib/data";
import { useSaved } from "@/lib/useSaved";
import AppShell from "@/components/AppShell";
import { ArrowLeft, Star, Users, Clock, Check } from "lucide-react";

export default function PackageClient({ id }: { id: string }) {
  const p = getPackage(id);
  const { isPkgSaved, togglePackage } = useSaved();

  if (!p) return <AppShell><div className="p-6 text-center">Package not found.</div></AppShell>;

  const d = getDestination(p.destinationId);
  const h = getHost(p.hostId);

  return (
    <AppShell>
      <div className="relative h-56 w-full">
        {d && <Image src={d.image} alt={d?.name ?? ""} fill className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Link href="/traveler/packages" className="absolute left-4 top-4 rounded-full bg-white/30 p-2 text-white backdrop-blur">
          <ArrowLeft size={18} />
        </Link>
        <button
          onClick={() => togglePackage(p.id)}
          className="absolute right-4 top-4 rounded-full bg-white/30 p-2 backdrop-blur"
        >
          <HeartIcon filled={isPkgSaved(p.id)} />
        </button>
        <div className="absolute bottom-4 left-5 text-white">
          <p className="text-xs font-medium text-white/80">{d?.district}, Odisha</p>
          <h1 className="text-xl font-black">{p.title}</h1>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-emerald-600">₹{p.price.toLocaleString()}</p>
            <p className="text-xs text-zinc-500">per person</p>
          </div>
          <div className="text-right text-xs text-zinc-600">
            <p className="flex items-center justify-end gap-1"><Clock size={12} /> {p.duration}</p>
            <p className="flex items-center justify-end gap-1"><Users size={12} /> {p.groupSize} people</p>
            <p className="flex items-center justify-end gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {p.rating} ({p.reviews} reviews)</p>
          </div>
        </div>

        {h && (
          <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-2xl">{h.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-zinc-900">{h.name} {h.verified && <span className="text-emerald-600">✓ verified</span>}</p>
              <p className="text-xs text-zinc-500">{h.type} • {h.location}</p>
              <p className="text-xs text-zinc-600">{h.bio}</p>
            </div>
          </div>
        )}

        <div>
          <h3 className="mb-2 text-sm font-bold text-zinc-900">What's included</h3>
          <div className="flex flex-wrap gap-1.5">
            {p.includes.map((inc) => (
              <span key={inc} className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Check size={11} /> {inc}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-zinc-900">Itinerary</h3>
          <div className="space-y-3">
            {p.itinerary.map((it) => (
              <div key={it.day} className="rounded-xl border border-zinc-200 bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">{it.day}</span>
                  <p className="text-sm font-bold text-zinc-900">{it.title}</p>
                </div>
                <ul className="mt-2 space-y-1 pl-9 text-xs text-zinc-600">
                  {it.activities.map((a) => (
                    <li key={a} className="flex gap-1.5"><span>•</span>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {d && (
          <Link
            href={`/traveler/destination/${d.id}`}
            className="block rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center text-sm font-semibold text-zinc-700"
          >
            View destination details →
          </Link>
        )}

        <button className="w-full rounded-2xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/30">
          Request Booking (mock)
        </button>
        <p className="text-center text-[10px] text-zinc-400">Prototype: booking request goes to host via WhatsApp/SMS in production.</p>
      </div>
    </AppShell>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#f43f5e" : "none"} stroke={filled ? "#f43f5e" : "white"} strokeWidth="2">
      <path d="M12 21s-7-4.5-9.5-9C.5 8 2.5 4 6.5 4c2 0 3.5 1 5.5 3 2-2 3.5-3 5.5-3 4 0 6 4 4 8-2.5 4.5-9.5 9-9.5 9z" />
    </svg>
  );
}