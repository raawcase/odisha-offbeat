import TravelerNav from "@/components/TravelerNav";

export default function TravelerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-soft via-zinc-100 to-amber-50">
      <div className="mx-auto min-h-screen max-w-md bg-white shadow-2xl shadow-zinc-300/40">
        <div className="pb-20">{children}</div>
        <TravelerNav />
      </div>
    </div>
  );
}