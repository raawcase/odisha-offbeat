"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getPackage, getDestination } from "@/lib/data";
import { CheckCircle2, Calendar, Users, Wallet, Download, Share2, MapPin } from "lucide-react";

const BOOKINGS_KEY = "odisha-bookings-v1";

type Booking = {
  id: string; packageId: string; destinationId: string; title: string; destination?: string;
  district?: string; date: string; travelers: string; name: string; phone: string; price: number;
  duration: string; createdAt: number; status: string;
};

export default function BookingConfirmClient({ id }: { id: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(BOOKINGS_KEY);
      const list: Booking[] = raw ? JSON.parse(raw) : [];
      const b = list.find((x) => x.id === id);
      setBooking(b || null);
    } catch {}
    setLoaded(true);
  }, [id]);

  const pkg = booking ? getPackage(booking.packageId) : undefined;
  const dest = booking ? getDestination(booking.destinationId) : undefined;

  if (!loaded) {
    return <div className="flex h-screen items-center justify-center text-sm text-zinc-500">Loading…</div>;
  }

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-zinc-600">Booking not found.</p>
        <Link href="/traveler/packages" className="mt-3 inline-block rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
          Browse packages
        </Link>
      </div>
    );
  }

  const total = booking.price * parseInt(booking.travelers || "1");

  return (
    <>
      {/* success hero — the emotional peak */}
      <div className="relative h-72 w-full overflow-hidden">
        {dest && <Image src={dest.image} alt={dest.name} fill className="object-cover" priority />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70">
            <CheckCircle2 size={14} /> Confirmed
          </div>
          <h1 className="mt-2 text-3xl font-light tracking-tight">{dest?.name}</h1>
          <p className="mt-1 text-sm text-white/85">Your host will be in touch, {booking.name.split(" ")[0]}.</p>
          <p className="mt-3 font-mono text-xs tracking-[0.3em] text-white/60">{booking.id}</p>
        </div>
      </div>

      <div className="space-y-5 px-5 py-5">
        {/* summary */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-bold text-zinc-900">{booking.title}</h3>
          <p className="mt-1 text-xs text-zinc-500">{dest?.name} • {dest?.district}, Odisha</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <Info icon={<Calendar size={13} />} label="Date" value={booking.date} />
            <Info icon={<Users size={13} />} label="Travelers" value={`${booking.travelers} ${parseInt(booking.travelers) === 1 ? "person" : "people"}`} />
            <Info icon={<Wallet size={13} />} label="Total" value={`₹${total.toLocaleString()}`} />
            <Info icon={<MapPin size={13} />} label="Duration" value={booking.duration} />
          </div>
        </div>

        {/* itinerary */}
        {pkg && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-zinc-900">Your itinerary</h3>
            <div className="space-y-2">
              {pkg.itinerary.map((it) => (
                <div key={it.day} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">{it.day}</span>
                    <p className="text-sm font-bold text-zinc-900">{it.title}</p>
                  </div>
                  <ul className="mt-1.5 space-y-0.5 pl-8 text-xs text-zinc-600">
                    {it.activities.map((a) => <li key={a}>• {a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* included */}
        {pkg && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-zinc-900">Included</h3>
            <div className="flex flex-wrap gap-1.5">
              {pkg.includes.map((inc) => (
                <span key={inc} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-ink">✓ {inc}</span>
              ))}
            </div>
          </div>
        )}

        {/* essentials reminder */}
        {dest && (
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-900">Pack smart</p>
            <p className="mt-1 text-xs text-amber-800">
              {dest.essentials.amenities.slice(0, 2).join(" • ")}. Carry cash (ATMs limited) and download offline maps before you go.
            </p>
          </div>
        )}

        {/* actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => alert("Offline pack downloaded (mock)")}
            className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-700"
          >
            <Download size={14} /> Offline pack
          </button>
          <button
            onClick={() => {
              const text = `I'm visiting ${dest?.name}, Odisha! Booking ${booking.id}`;
              if (navigator.share) navigator.share({ title: "Odisha trip", text }).catch(() => {});
              else alert("Share link copied (mock)");
            }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-700"
          >
            <Share2 size={14} /> Share trip
          </button>
        </div>

        <button
          onClick={() => alert("Added to calendar (mock)")}
          className="w-full rounded-2xl bg-zinc-900 py-3 text-sm font-bold text-white"
        >
          Add to calendar
        </button>

        <Link
          href="/traveler/saved"
          className="block w-full rounded-2xl bg-accent py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-accent/30"
        >
          View my trips
        </Link>
        <p className="text-center text-[10px] text-zinc-400">
          Prototype: host will contact you on {booking.phone} to confirm details.
        </p>
      </div>
    </>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-2.5">
      <div className="flex items-center gap-1 text-zinc-500">{icon}<span className="text-[10px]">{label}</span></div>
      <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
    </div>
  );
}