# Odisha Offbeat — Discover the Unseen

A mobile-first prototype for **Startup Odisha**: a Tinder-style swipe discovery app for off-beat
tourist destinations across Odisha, with host-curated packages, day-wise itineraries and a local
"essentials" layer (transport, stays, food, amenities). Built to empower independent travelers
and rural hosts (homestays, guides, transport, vendors).

## Screens

- `/` — Landing & value proposition
- `/discover` — Swipe deck of destinations (filter by interest)
- `/destination/[id]` — Destination detail + essentials + host packages
- `/packages` & `/package/[id]` — Host packages with day-wise itinerary
- `/saved` — Saved destinations & packages
- `/host` — Host dashboard (create package, mock)
- `/map` — Map view of all destinations

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (best viewed at ~390px width / mobile device).

## Deploy (zero-cost)

- Push to GitHub → import in **Vercel** (free tier). All assets are local; no paid services.
- Optional backend (free tiers): **Supabase** (Postgres + Auth + Storage) for real hosts/packages,
  **Razorpay** test keys for payments, **Mapbox/OSM** for maps.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react · localStorage
for saved state. No paid infra. Images are local (public/odisha).

## Prototype scope

Swipe, save, essentials, packages, itineraries, host dashboard and map are functional. Booking is
mocked (request goes to host via WhatsApp/SMS in production). Data is seeded mock content for
12 off-beat Odisha destinations.