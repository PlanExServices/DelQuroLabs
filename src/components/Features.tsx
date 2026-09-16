import { CloudOff, Fingerprint, HeartHandshake, Layers, Sparkles, Zap } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { Stagger, Item } from "./Reveal";
import { SectionHeading, Em } from "./ui";
import { cn } from "../utils/cn";

function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "spotlight group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.045] sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

function IconChip({ icon, tint }: { icon: ReactNode; tint: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
        tint
      )}
    >
      {icon}
    </span>
  );
}

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The DelQuro standard"
          title={
            <span id="features-title">
              Engineered like infrastructure.
              <br className="hidden sm:block" /> Finished like <Em>art</Em>.
            </span>
          }
          sub="Every screen, sound, and millisecond sweated — so the software disappears and only your day remains."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-12">
          {/* Design you can feel — large card with mini UI */}
          <Item className="lg:col-span-7">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="max-w-md">
                  <IconChip
                    tint="border-violet-400/25 bg-violet-500/10 text-violet-300"
                    icon={<Sparkles className="h-5 w-5" aria-hidden />}
                  />
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist-100 sm:text-2xl">
                    Design you can feel
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-mist-400">
                    120fps motion, tuned haptics, typography set by hand. The kind of polish you
                    notice in your thumb before you notice it with your eyes.
                  </p>
                </div>
                {/* mini mock UI */}
                <div aria-hidden className="relative">
                  <div className="glass mx-auto max-w-md rounded-2xl p-4 shadow-2xl transition-transform duration-700 group-hover:-translate-y-1.5 group-hover:rotate-[-0.5deg]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-aurora-a to-aurora-b" />
                        <div>
                          <div className="h-2.5 w-24 rounded-full bg-white/25" />
                          <div className="mt-1.5 h-2 w-16 rounded-full bg-white/10" />
                        </div>
                      </div>
                      <span className="flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-aurora-a to-aurora-c px-0.5">
                        <span className="h-5 w-5 translate-x-5 rounded-full bg-white shadow" />
                      </span>
                    </div>
                    <div className="mt-4 space-y-2.5">
                      <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-3">
                        <span className="h-2 w-2 rounded-full bg-teal-300" />
                        <div className="h-2 flex-1 rounded-full bg-white/10" />
                        <span className="font-display text-[11px] font-semibold text-teal-300">Done</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-white/[0.05] p-3">
                        <span className="h-2 w-2 rounded-full bg-fuchsia-300 animate-pulse-soft" />
                        <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-violet-400/50 to-white/10" />
                        <span className="font-display text-[11px] font-semibold text-fuchsia-300">Now</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 opacity-60">
                        <span className="h-2 w-2 rounded-full bg-white/30" />
                        <div className="h-2 flex-1 rounded-full bg-white/10" />
                        <span className="font-display text-[11px] font-medium text-mist-500">4:30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Item>

          {/* Private by default */}
          <Item className="lg:col-span-5">
            <SpotlightCard className="h-full">
              <IconChip
                tint="border-teal-400/25 bg-teal-500/10 text-teal-300"
                icon={<Fingerprint className="h-5 w-5" aria-hidden />}
              />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist-100 sm:text-2xl">
                Private by default
              </h3>
              <p className="mt-2.5 leading-relaxed text-mist-400">
                On-device intelligence, end-to-end encrypted sync, and a business model that sells
                software — not you.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Privacy commitments">
                {["No ads", "No trackers", "No data brokers", "E2E encrypted"].map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-teal-400/20 bg-teal-500/[0.07] px-3 py-1.5 text-[12px] font-medium text-teal-200"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Item>

          {/* Syncs everywhere */}
          <Item className="lg:col-span-4">
            <SpotlightCard className="h-full">
              <IconChip
                tint="border-indigo-400/25 bg-indigo-500/10 text-indigo-300"
                icon={<Zap className="h-5 w-5" aria-hidden />}
              />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist-100">
                Syncs in a blink
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mist-400">
                iPhone, Android, Mac, and web — changes follow you in under a heartbeat, fully
                encrypted.
              </p>
              <div aria-hidden className="mt-6 flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-300/80" />
                    {i < 3 && (
                      <span
                        className="h-px w-6 bg-gradient-to-r from-indigo-300/60 to-transparent animate-pulse-soft"
                        style={{ animationDelay: `${i * 0.6}s` }}
                      />
                    )}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Item>

          {/* Offline first */}
          <Item className="lg:col-span-4">
            <SpotlightCard className="h-full">
              <IconChip
                tint="border-fuchsia-400/25 bg-fuchsia-500/10 text-fuchsia-300"
                icon={<CloudOff className="h-5 w-5" aria-hidden />}
              />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist-100">
                Offline-first, always
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mist-400">
                Airplane mode is a feature, not a limitation. Everything works at 38,000 feet and
                reconciles when you land.
              </p>
            </SpotlightCard>
          </Item>

          {/* One subscription */}
          <Item className="lg:col-span-4">
            <SpotlightCard className="h-full">
              <IconChip
                tint="border-cyan-400/25 bg-cyan-500/10 text-cyan-300"
                icon={<Layers className="h-5 w-5" aria-hidden />}
              />
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-mist-100">
                One membership, every app
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-mist-400">
                DelQuro+ unlocks the whole suite — and everything we ship next. One plan, zero
                nickel-and-diming.
              </p>
              <div aria-hidden className="mt-6 flex items-center">
                {["from-indigo-400 to-violet-500", "from-fuchsia-400 to-purple-600", "from-teal-400 to-cyan-500"].map(
                  (g, i) => (
                    <span
                      key={g}
                      className={`-ml-2 h-8 w-8 rounded-xl bg-gradient-to-br ${g} ring-2 ring-ink-900 transition-transform duration-500 group-hover:rotate-[-6deg] first:ml-0`}
                      style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                    />
                  )
                )}
                <span className="ml-3 font-display text-[12px] font-semibold uppercase tracking-widest text-mist-500">
                  = DelQuro+
                </span>
              </div>
            </SpotlightCard>
          </Item>

          {/* Human support */}
          <Item className="lg:col-span-12">
            <SpotlightCard className="lg:p-10">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-5">
                  <IconChip
                    tint="border-rose-400/25 bg-rose-500/10 text-rose-300"
                    icon={<HeartHandshake className="h-5 w-5" aria-hidden />}
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-mist-100 sm:text-2xl">
                      Support from the humans who built it
                    </h3>
                    <p className="mt-2.5 max-w-xl leading-relaxed text-mist-400">
                      No ticket black holes, no chatbots pretending. Median first response: 11
                      minutes — from an engineer who can actually fix it.
                    </p>
                  </div>
                </div>
                <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-semibold text-mist-100">We're online</div>
                    <div className="text-[12px] text-mist-500">hello@delquro.com</div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </Item>
        </Stagger>
      </div>
    </section>
  );
}
