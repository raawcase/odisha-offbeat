import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data";

export default function DestinationCard({ destination, compact = false }: { destination: Destination; compact?: boolean }) {
  const budgetColor = destination.budget === "₹" ? "bg-emerald-100 text-emerald-700" : destination.budget === "₹₹" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700";
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-zinc-900 shadow-xl">
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      <div className="absolute left-4 top-4 flex gap-1.5">
        {destination.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
            {t}
          </span>
        ))}
      </div>
      <div className="absolute right-4 top-4">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${budgetColor}`}>{destination.budget}</span>
      </div>
      <Link
        href={`/traveler/destination/${destination.id}`}
        className="absolute right-4 bottom-24 rounded-full bg-white/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur hover:bg-white/40"
        onClick={(e) => e.stopPropagation()}
      >
        Details →
      </Link>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="mb-1 flex items-center gap-2 text-xs font-medium text-white/80">
          <span>{destination.emoji}</span>
          <span>{destination.district}, Odisha</span>
          <span>•</span>
          <span>{destination.duration}</span>
        </div>
        <h2 className="text-2xl font-black leading-tight tracking-tight">{destination.name}</h2>
        <p className="mt-1 text-sm font-medium text-white/90">{destination.tagline}</p>
        {!compact && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.highlights.slice(0, 3).map((h) => (
              <span key={h} className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white/85">
                {h}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}