"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSaved } from "@/lib/useSaved";
import { destinations, packages } from "@/lib/data";
import { User, Settings, Heart, MapPin, Calendar, LogOut, ChevronRight, Sparkles } from "lucide-react";

const PREFS_KEY = "odisha-prefs-v1";
const BOOKINGS_KEY = "odisha-bookings-v1";

type Prefs = { name?: string; style?: string; interests?: string[]; budget?: string; duration?: string; completed?: boolean };

export default function TravelerProfilePage() {
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const { saved } = useSaved();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) setPrefs(JSON.parse(raw));
      const b = localStorage.getItem(BOOKINGS_KEY);
      if (b) setBookings(JSON.parse(b));
    } catch {}
  }, []);

  const logout = () => {
    try { localStorage.removeItem(PREFS_KEY); } catch {}
    window.location.href = "/";
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Profile</h1>
        <p className="text-xs text-zinc-500">Your travel identity</p>
      </header>

      <div className="space-y-5 px-5 py-4">
        {/* avatar + name */}
        <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-accent-soft to-amber-50 p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow">
            {prefs?.style === "Solo" ? "🎒" : prefs?.style === "Couple" ? "💑" : prefs?.style === "Family" ? "👨‍👩‍👧‍👦" : prefs?.style === "Friends" ? "👯" : "🧳"}
          </div>
          <div className="flex-1">
            <p className="text-lg font-black text-zinc-900">{prefs?.name || "Traveler"}</p>
            <p className="text-xs text-zinc-600">{prefs?.style || "—"} traveler • {prefs?.budget || "—"} budget</p>
            <p className="text-[11px] text-zinc-500">{prefs?.duration || "—"} trips</p>
          </div>
          <Link href="/traveler/onboarding" className="rounded-full border border-zinc-200 p-2 text-zinc-600">
            <Settings size={16} />
          </Link>
        </div>

        {/* stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="Saved places" value={saved.destinations.length} />
          <Stat label="Saved packages" value={saved.packages.length} />
          <Stat label="Bookings" value={bookings.length} />
        </div>

        {/* interests */}
        {prefs?.interests && prefs.interests.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-zinc-900">Your interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {prefs.interests.map((i) => (
                <span key={i} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-ink">{i}</span>
              ))}
            </div>
          </div>
        )}

        {/* recent bookings */}
        {bookings.length > 0 && (
          <div>
            <h3 className="mb-2 text-sm font-bold text-zinc-900">Recent bookings</h3>
            <div className="space-y-2">
              {bookings.slice(0, 3).map((b) => (
                <Link key={b.id} href={`/traveler/booking/${b.id}`} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-lg">✅</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-zinc-900">{b.title}</p>
                    <p className="text-xs text-zinc-500">{b.destination} • {b.date} • {b.id}</p>
                  </div>
                  <ChevronRight size={16} className="text-zinc-400" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* saved preview */}
        {saved.destinations.length > 0 && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Saved destinations</h3>
              <Link href="/traveler/saved" className="text-xs font-semibold text-accent">View all</Link>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {saved.destinations.slice(0, 6).map((id) => {
                const d = destinations.find((x) => x.id === id);
                if (!d) return null;
                return (
                  <Link key={id} href={`/traveler/destination/${id}`} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.image} alt={d.name} className="h-20 w-20 rounded-xl object-cover" />
                    <p className="mt-1 w-20 truncate text-[10px] font-semibold text-zinc-700">{d.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* settings list */}
        <div className="space-y-1">
          <SettingsRow icon={<Sparkles size={16} />} label="Edit preferences" href="/traveler/onboarding" />
          <SettingsRow icon={<Heart size={16} />} label="Saved trips" href="/traveler/saved" />
          <SettingsRow icon={<MapPin size={16} />} label="Map view" href="/traveler/map" />
          <SettingsRow icon={<Calendar size={16} />} label="My bookings" href="/traveler/saved" />
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 py-3 text-sm font-bold text-rose-600"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-zinc-50 p-3">
      <p className="text-lg font-black text-zinc-900">{value}</p>
      <p className="text-[10px] font-medium text-zinc-500">{label}</p>
    </div>
  );
}

function SettingsRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <div className="text-accent">{icon}</div>
      <span className="flex-1 text-sm font-semibold text-zinc-800">{label}</span>
      <ChevronRight size={16} className="text-zinc-400" />
    </Link>
  );
}