"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, User } from "lucide-react";

const items = [
  { href: "/host", label: "Dashboard", icon: LayoutDashboard },
  { href: "/host/packages", label: "Packages", icon: Package },
  { href: "/host/packages/new", label: "New", icon: PlusCircle },
  { href: "/host/profile", label: "Account", icon: User },
];

export default function HostNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {items.map((it) => {
          const active = pathname === it.href || pathname.startsWith(it.href + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.href + it.label}
              href={it.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                active ? "text-emerald-600" : "text-zinc-500"
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
              {it.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}