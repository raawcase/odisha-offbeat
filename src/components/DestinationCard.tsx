import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/lib/data";

export default function DestinationCard({ destination, compact = false }: { destination: Destination; compact?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-zinc-900 shadow-2xl">
      <Image
        src={destination.image}
        alt={destination.name}
        fill
        sizes="(max-width: 448px) 100vw, 448px"
        className="object-cover"
        priority
      />
      {/* subtle gradient only at bottom for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* top-left: a single, quiet tag */}
      <div className="absolute left-5 top-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
          {destination.district}
        </span>
      </div>

      {/* bottom: name + one line */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-3xl font-light tracking-tight">{destination.name}</h2>
        <p className="mt-1 text-sm font-normal text-white/85">{destination.tagline}</p>
        {!compact && (
          <div className="mt-4 flex items-center gap-3 text-[11px] text-white/70">
            <span>{destination.duration}</span>
            <span className="opacity-40">·</span>
            <span>{destination.budget}</span>
            <span className="opacity-40">·</span>
            <span>{destination.difficulty}</span>
          </div>
        )}
      </div>

      {/* details link — quiet, bottom-right */}
      <Link
        href={`/traveler/destination/${destination.id}`}
        className="absolute bottom-6 right-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 hover:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        Details →
      </Link>
    </div>
  );
}