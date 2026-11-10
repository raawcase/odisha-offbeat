"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPackage, getDestination } from "@/lib/data";
import { Calendar, Users, Phone, User } from "lucide-react";

const BOOKINGS_KEY = "odisha-bookings-v1";

export default function BookingNewClient({ packageId }: { packageId?: string }) {
  const router = useRouter();
  const pkg = packageId ? getPackage(packageId) : undefined;
  const dest = pkg ? getDestination(pkg.destinationId) : undefined;

  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkg) return;
    setSubmitting(true);
    const id = "OD" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const booking = {
      id,
      packageId: pkg.id,
      destinationId: pkg.destinationId,
      title: pkg.title,
      destination: dest?.name,
      district: dest?.district,
      date,
      travelers,
      name,
      phone,
      price: pkg.price,
      duration: pkg.duration,
      createdAt: Date.now(),
      status: "confirmed",
    };
    try {
      const raw = localStorage.getItem(BOOKINGS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(booking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    } catch {}
    setTimeout(() => router.push(`/traveler/booking/${id}`), 600);
  };

  if (!pkg) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-zinc-600">No package selected.</p>
        <Link href="/traveler/packages" className="mt-3 inline-block rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
          Browse packages
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <Link href={`/traveler/package/${pkg.id}`} className="text-zinc-600">←</Link>
          <div>
            <h1 className="text-xl font-black tracking-tight text-zinc-900">Book Package</h1>
            <p className="text-xs text-zinc-500">{pkg.title}</p>
          </div>
        </div>
      </header>
      <div className="px-5 py-4">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-bold text-zinc-900">{pkg.title}</p>
          <p className="text-xs text-zinc-500">{dest?.name} • {pkg.duration} • ₹{pkg.price.toLocaleString()}/person</p>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">Travel date</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5">
              <Calendar size={16} className="text-zinc-400" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">Travelers</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5">
              <Users size={16} className="text-zinc-400" />
              <select value={travelers} onChange={(e) => setTravelers(e.target.value)} className="flex-1 bg-transparent text-sm outline-none">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? "person" : "people"}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">Your name</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5">
              <User size={16} className="text-zinc-400" />
              <input
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-zinc-700">Phone</label>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5">
              <Phone size={16} className="text-zinc-400" />
              <input
                required
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-accent py-3.5 text-sm font-bold text-white shadow-lg shadow-accent/30 disabled:opacity-60"
          >
            {submitting ? "Confirming…" : `Confirm booking • ₹${(pkg.price * parseInt(travelers || "1")).toLocaleString()}`}
          </button>
        </form>
      </div>
    </>
  );
}