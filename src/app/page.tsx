import Link from "next/link";
import Image from "next/image";
import { Compass, Package, MapPin, Users, ShieldCheck, WifiOff, Home as HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-zinc-100 to-amber-50">
      <div className="mx-auto min-h-screen max-w-md bg-white shadow-2xl shadow-zinc-300/40">
        <div className="relative h-64 w-full overflow-hidden">
          <Image src="/odisha/deomali.jpg" alt="Odisha" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Odisha Offbeat</p>
            <h1 className="mt-1 text-3xl font-black leading-tight">Discover the unseen Odisha</h1>
            <p className="mt-1 text-sm text-white/85">Swipe. Save. Travel. Empower locals.</p>
          </div>
        </div>

        <div className="space-y-5 px-5 py-6">
          <div>
            <h2 className="text-sm font-bold text-zinc-900">Choose your role</h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link href="/traveler" className="flex flex-col items-center justify-center rounded-2xl bg-emerald-600 p-5 text-white shadow-lg shadow-emerald-600/30">
                <Compass size={28} />
                <span className="mt-2 text-sm font-bold">I'm a Traveler</span>
                <span className="text-[10px] text-white/80">Discover & book trips</span>
              </Link>
              <Link href="/host" className="flex flex-col items-center justify-center rounded-2xl bg-zinc-900 p-5 text-white shadow-lg">
                <HomeIcon size={28} />
                <span className="mt-2 text-sm font-bold">I'm a Host</span>
                <span className="text-[10px] text-white/80">Curate packages</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/traveler/discover" className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <Compass size={20} className="mx-auto text-emerald-600" />
              <p className="mt-1 text-xs font-bold text-zinc-900">Start Swiping</p>
            </Link>
            <Link href="/traveler/packages" className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center">
              <Package size={20} className="mx-auto text-emerald-600" />
              <p className="mt-1 text-xs font-bold text-zinc-900">Browse Packages</p>
            </Link>
          </div>

          <div>
            <h2 className="text-sm font-bold text-zinc-900">Why Odisha Offbeat?</h2>
            <div className="mt-3 space-y-2">
              <Feature icon={<MapPin size={16} />} title="Off-beat discovery" desc="Tribal, eco, heritage & waterfall destinations beyond Puri-Konark." />
              <Feature icon={<Users size={16} />} title="Local empowerment" desc="Homestays, guides, transport & vendors get direct reach." />
              <Feature icon={<ShieldCheck size={16} />} title="Verified hosts" desc="Badges, reviews & safety info for remote travel." />
              <Feature icon={<WifiOff size={16} />} title="Works offline" desc="Download region packs for low-connectivity areas." />
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Pitch note</p>
            <p className="mt-1 text-sm text-zinc-700">
              Prototype for Startup Odisha — zero-cost infra (Next.js + Vercel + Supabase free tier). Swipe UX, host packages, essentials & saved trips are live; booking is mocked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-zinc-50 p-3">
      <div className="mt-0.5 text-emerald-600">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-zinc-900">{title}</p>
        <p className="text-xs text-zinc-600">{desc}</p>
      </div>
    </div>
  );
}