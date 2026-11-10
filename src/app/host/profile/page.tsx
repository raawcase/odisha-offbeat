"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { packages, hosts } from "@/lib/data";
import { User, Settings, Star, IndianRupee, ShieldCheck, LogOut, ChevronRight, Award } from "lucide-react";

export default function HostProfilePage() {
  const [verified, setVerified] = useState(true);
  const host = hosts[0];

  useEffect(() => {}, []);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 px-5 py-4 backdrop-blur">
        <h1 className="text-xl font-black tracking-tight text-zinc-900">Account</h1>
        <p className="text-xs text-zinc-500">Host profile & settings</p>
      </header>

      <div className="space-y-5 px-5 py-4">
        <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-amber-50 to-accent-soft p-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-3xl shadow">
            {host?.avatar || "🏡"}
          </div>
          <div className="flex-1">
            <p className="text-lg font-black text-zinc-900">{host?.name || "Host"}</p>
            <p className="text-xs text-zinc-600">{host?.type} • {host?.location}</p>
            {verified && (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent-ink">
                <ShieldCheck size={10} /> Verified host
              </span>
            )}
          </div>
          <button className="rounded-full border border-zinc-200 p-2 text-zinc-600">
            <Settings size={16} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="Listings" value={packages.length} />
          <Stat label="Rating" value="4.8★" />
          <Stat label="Earnings" value="₹4.2L" />
        </div>

        <div className="rounded-2xl border border-accent-soft bg-accent-soft p-4">
          <div className="flex items-center gap-2">
            <Award size={18} className="text-accent" />
            <p className="text-sm font-bold text-accent-ink">Verified host badge</p>
          </div>
          <p className="mt-1 text-xs text-accent-ink">
            Verified hosts get 3x more bookings. Complete KYC, photos & community references to earn the badge.
          </p>
          <button className="mt-2 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white">
            {verified ? "Manage verification" : "Apply for verification"}
          </button>
        </div>

        <div className="space-y-1">
          <SettingsRow icon={<IndianRupee size={16} />} label="Payouts & earnings" href="/host" />
          <SettingsRow icon={<Star size={16} />} label="Reviews & ratings" href="/host/packages" />
          <SettingsRow icon={<Settings size={16} />} label="Listing settings" href="/host/packages" />
          <SettingsRow icon={<User size={16} />} label="Profile & KYC" href="/host" />
        </div>

        <button
          onClick={() => { window.location.href = "/"; }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 py-3 text-sm font-bold text-rose-600"
        >
          <LogOut size={16} /> Log out
        </button>
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

function SettingsRow({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3">
      <div className="text-accent">{icon}</div>
      <span className="flex-1 text-sm font-semibold text-zinc-800">{label}</span>
      <ChevronRight size={16} className="text-zinc-400" />
    </Link>
  );
}