"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "odisha-saved-v1";

type Saved = { destinations: string[]; packages: string[] };

function read(): Saved {
  if (typeof window === "undefined") return { destinations: [], packages: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { destinations: [], packages: [] };
    const parsed = JSON.parse(raw);
    return { destinations: parsed.destinations ?? [], packages: parsed.packages ?? [] };
  } catch {
    return { destinations: [], packages: [] };
  }
}

export function useSaved() {
  const [saved, setSaved] = useState<Saved>({ destinations: [], packages: [] });

  useEffect(() => {
    setSaved(read());
  }, []);

  const persist = useCallback((next: Saved) => {
    setSaved(next);
    try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  }, []);

  const toggleDestination = useCallback((id: string) => {
    const cur = read();
    const has = cur.destinations.includes(id);
    persist({ ...cur, destinations: has ? cur.destinations.filter(x => x !== id) : [...cur.destinations, id] });
  }, [persist]);

  const togglePackage = useCallback((id: string) => {
    const cur = read();
    const has = cur.packages.includes(id);
    persist({ ...cur, packages: has ? cur.packages.filter(x => x !== id) : [...cur.packages, id] });
  }, [persist]);

  const isDestSaved = useCallback((id: string) => saved.destinations.includes(id), [saved]);
  const isPkgSaved = useCallback((id: string) => saved.packages.includes(id), [saved]);

  return { saved, toggleDestination, togglePackage, isDestSaved, isPkgSaved };
}