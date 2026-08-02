import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, Item } from "./Reveal";
import { Eyebrow, Em } from "./ui";

const BENEFITS = [
  {
    n: "01",
    title: "Attention back, every morning",
    copy: "Loom quietly plans tomorrow while you sleep, so mornings start with clarity instead of a scramble through five apps and a guilt-list.",
    stat: "5.2 hrs",
    statLabel: "of focused time reclaimed weekly, on average",
  },
  {
    n: "02",
    title: "Rest that actually restores",
    copy: "Aura meets you where you are — a racing mind at 11pm or 3am — and eases you down with sound and breath that adapt as you drift.",
    stat: "2× faster",
    statLabel: "to fall asleep, reported within two weeks",
  },
  {
    n: "03",
    title: "Money anxiety, dissolved",
    copy: "Vantage replaces the fog with one honest number and small, kind nudges. No shaming, no spreadsheets unless you ask.",
    stat: "92%",
    statLabel: "say they feel in control within 14 days",
  },
  {
    n: "04",
    title: "Zero lock-in, by design",
    copy: "Cancel in two taps. Export everything in open formats. Your data is yours — we just get to borrow it to make your day better.",
    stat: "2 taps",
    statLabel: "to cancel or export, whenever you like",
  },
];

export function Benefits() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
          {/* sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>Why people switch</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="why-title"
                className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-mist-100"
              >
                Small apps. <br />
                <Em>Outsized</Em> days.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-mist-400">
                We don't chase engagement metrics. We chase the moment you put your phone down and
                feel like your life is handled. That's the DelQuro effect.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <a
                href="#stories"
                className="group mt-7 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-aurora"
              >
                <span className="text-aurora">Hear it from our members</span>
                <ArrowRight className="h-4 w-4 text-aurora-c transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </a>
            </Reveal>
          </div>

          {/* numbered rows */}
          <Stagger className="border-t border-white/[0.08]">
            {BENEFITS.map((b) => (
              <Item key={b.n}>
                <div className="group grid gap-4 border-b border-white/[0.08] py-9 transition-all duration-500 hover:pl-3 sm:grid-cols-[auto_1fr] sm:gap-10 sm:py-11">
                  <span className="font-display text-[15px] font-semibold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)] transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(167,139,250,0.9)] sm:pt-1">
                    {b.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[22px] font-semibold tracking-tight text-mist-100 sm:text-2xl">
                      {b.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-mist-400">{b.copy}</p>
                    <div className="mt-5 flex items-baseline gap-3">
                      <span className="bg-gradient-to-r from-aurora-a via-aurora-b to-aurora-c bg-clip-text font-display text-2xl font-bold text-transparent sm:text-3xl">
                        {b.stat}
                      </span>
                      <span className="text-[13px] text-mist-500">{b.statLabel}</span>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
