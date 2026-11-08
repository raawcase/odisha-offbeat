"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { interestOptions, type Interest } from "@/lib/data";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const STORAGE_KEY = "odisha-prefs-v1";

const styles = [
  { id: "Solo", emoji: "🎒", label: "Solo", desc: "Independent explorer" },
  { id: "Couple", emoji: "💑", label: "Couple", desc: "Romantic getaway" },
  { id: "Family", emoji: "👨‍👩‍👧‍👦", label: "Family", desc: "Fun for all ages" },
  { id: "Friends", emoji: "👯", label: "Friends", desc: "Group adventure" },
];

const budgets = [
  { id: "₹", label: "Budget", desc: "Under ₹3,000/day" },
  { id: "₹₹", label: "Mid-range", desc: "₹3,000–8,000/day" },
  { id: "₹₹₹", label: "Premium", desc: "₹8,000+/day" },
];

const durations = [
  { id: "Weekend", label: "Weekend", desc: "1–2 days" },
  { id: "Short", label: "Short trip", desc: "3–4 days" },
  { id: "Long", label: "Week+", desc: "5+ days" },
];

// Map travel style -> suggested location types
const styleSuggestions: Record<string, Interest[]> = {
  Solo: ["Trekking", "Waterfalls", "Tribal Culture", "Eco-tourism"],
  Couple: ["Beaches", "Heritage", "Cuisine", "Eco-tourism"],
  Family: ["Wildlife", "Beaches", "Heritage", "Eco-tourism"],
  Friends: ["Trekking", "Waterfalls", "Beaches", "Wildlife"],
};

const interestEmoji: Record<string, string> = {
  "Tribal Culture": "🛖", Beaches: "🏖️", Trekking: "⛰️", Wildlife: "🐯",
  Heritage: "🛕", Cuisine: "🍽️", Waterfalls: "💧", "Eco-tourism": "🌿",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [style, setStyle] = useState<string>("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [budget, setBudget] = useState<string>("₹₹");
  const [duration, setDuration] = useState<string>("Short");

  const totalSteps = 5;

  const toggleInterest = (i: Interest) => {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const applySuggestion = (s: string) => {
    setStyle(s);
    setInterests(styleSuggestions[s] || []);
  };

  const finish = () => {
    const prefs = { name, style, interests, budget, duration, completed: true, createdAt: Date.now() };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
    router.push("/traveler/discover");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="mx-auto min-h-screen max-w-md bg-white shadow-2xl shadow-zinc-300/40">
        {/* progress */}
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Step {step + 1} of {totalSteps}</span>
            <Link href="/traveler/discover" className="text-zinc-400">Skip</Link>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="px-5 py-6">
          {step === 0 && (
            <Step title="Welcome to Odisha Offbeat" subtitle="Let's personalize your discovery.">
              <div className="mt-6 space-y-3">
                <label className="block text-sm font-semibold text-zinc-800">What should we call you?</label>
                <input
                  className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-xs text-zinc-500">We'll use this to greet you. You can skip.</p>
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step title="How are you traveling?" subtitle="We'll tailor locations to your group.">
              <div className="mt-6 grid grid-cols-2 gap-3">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => applySuggestion(s.id)}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      style === s.id ? "border-emerald-500 bg-emerald-50 shadow-md" : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div className="text-3xl">{s.emoji}</div>
                    <p className="mt-2 text-sm font-bold text-zinc-900">{s.label}</p>
                    <p className="text-[11px] text-zinc-500">{s.desc}</p>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step title="What excites you?" subtitle="Pick the location types you love.">
              <div className="mt-6 grid grid-cols-2 gap-3">
                {interestOptions.map((i) => {
                  const active = interests.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      className={`flex items-center gap-2 rounded-2xl border p-3 text-left transition-all ${
                        active ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
                      }`}
                    >
                      <span className="text-xl">{interestEmoji[i]}</span>
                      <span className="text-xs font-semibold text-zinc-800">{i}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-zinc-500">We pre-selected some based on your travel style. Adjust freely.</p>
            </Step>
          )}

          {step === 3 && (
            <Step title="Your budget?" subtitle="We'll filter packages accordingly.">
              <div className="mt-6 space-y-2">
                {budgets.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBudget(b.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 transition-all ${
                      budget === b.id ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{b.label}</p>
                      <p className="text-[11px] text-zinc-500">{b.desc}</p>
                    </div>
                    <span className="text-lg font-black text-emerald-600">{b.id}</span>
                  </button>
                ))}
              </div>
            </Step>
          )}

          {step === 4 && (
            <Step title="Trip length?" subtitle="How long do you usually travel?">
              <div className="mt-6 space-y-2">
                {durations.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 transition-all ${
                      duration === d.id ? "border-emerald-500 bg-emerald-50" : "border-zinc-200 bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-zinc-900">{d.label}</p>
                      <p className="text-[11px] text-zinc-500">{d.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 p-4 text-center">
                <Sparkles className="mx-auto text-emerald-600" size={24} />
                <p className="mt-2 text-sm font-bold text-zinc-900">You're all set{name ? `, ${name}` : ""}!</p>
                <p className="mt-1 text-xs text-zinc-600">
                  We'll show {interests.length || "all"} location types matching your {style || "travel"} style.
                </p>
              </div>
            </Step>
          )}
        </div>

        {/* nav buttons */}
        <div className="sticky bottom-0 bg-white/90 px-5 py-4 backdrop-blur">
          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 text-zinc-600"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30"
              >
                Continue <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/30"
              >
                Start exploring <Sparkles size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="text-2xl font-black tracking-tight text-zinc-900">{title}</h1>
      <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      {children}
    </div>
  );
}