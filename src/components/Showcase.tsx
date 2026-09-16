import { motion } from "framer-motion";
import { Apple, ArrowRight, BadgeCheck, Check, Globe, Laptop, Play, Star, TrendingUp } from "lucide-react";
import { SUITE_APPS, type SuiteApp } from "../lib/site";
import { AppIcon } from "./AppIcon";
import { PhoneFrame } from "./PhoneFrame";
import { EXPO, Reveal } from "./Reveal";
import { SectionHeading, Em } from "./ui";
import { cn } from "../utils/cn";

function PlatformChips() {
  const items = [
    { icon: Apple, label: "iOS" },
    { icon: Play, label: "Android" },
    { icon: Laptop, label: "Mac" },
    { icon: Globe, label: "Web" },
  ];
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Available platforms">
      {items.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] font-medium text-mist-400 transition-colors hover:border-white/25 hover:text-mist-200"
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

function AppRow({ app, index }: { app: SuiteApp; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <div
      className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:py-24"
      style={{ contentVisibility: "auto" }}
    >
      {/* copy */}
      <div className={cn(flipped && "lg:order-2")}>
        <Reveal>
          <div className="flex items-center gap-4">
            <AppIcon app={app} size={56} />
            <div>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-mist-100">
                {app.name}
              </h3>
              <p className={cn("font-serif text-lg italic", app.accent.text)}>{app.tagline}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-6 max-w-lg text-[16.5px] leading-relaxed text-mist-400">
            {app.description}
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="mt-7 space-y-3.5">
            {app.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[15px] text-mist-200">
                <span
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                    app.accent.chipBg,
                    app.accent.chipBorder
                  )}
                >
                  <Check className={cn("h-3 w-3", app.accent.text)} aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#pricing"
              className={cn(
                "group inline-flex items-center gap-2 font-display text-[15px] font-semibold",
                app.accent.text
              )}
            >
              Download {app.name}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </a>
            <span className="hidden h-4 w-px bg-white/10 sm:block" aria-hidden />
            <span className="flex items-center gap-1.5 text-[13.5px] text-mist-400">
              <Star className="h-4 w-4 fill-amber-300 text-amber-300" aria-hidden />
              <span className="font-semibold text-mist-100">{app.rating}</span> · {app.ratingsCount}{" "}
              ratings
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13.5px] text-mist-400">
              <BadgeCheck className={cn("h-4 w-4", app.accent.text)} aria-hidden />
              {app.storeBadge}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-7">
            <PlatformChips />
          </div>
        </Reveal>
      </div>

      {/* visual */}
      <div className={cn("relative", flipped && "lg:order-1")}>
        <Reveal delay={0.1} y={40}>
          <div className="relative mx-auto w-[230px] sm:w-[270px] lg:w-[290px]">
            <PhoneFrame src={app.image} alt={`${app.name} app — ${app.tagline}`} glow={app.accent.glow} />
          </div>
        </Reveal>

        {/* floating micro chips */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EXPO, delay: 0.4 }}
          className={cn(
            "absolute top-[16%] animate-float",
            flipped ? "left-[2%] sm:left-[6%]" : "right-[2%] sm:right-[6%]"
          )}
        >
          <div className={cn("flex items-center gap-2.5 rounded-2xl border px-4 py-3 backdrop-blur-xl", app.accent.chipBg, app.accent.chipBorder)}>
            <span className={cn("flex h-8 w-8 items-center justify-center rounded-xl", app.accent.chipBg)}>
              {app.id === "vantage" ? (
                <TrendingUp className={cn("h-4 w-4", app.accent.text)} />
              ) : (
                <Check className={cn("h-4 w-4", app.accent.text)} />
              )}
            </span>
            <div>
              <div className="text-[11px] text-mist-400">{app.chip.label}</div>
              <div className="font-display text-[13px] font-semibold text-mist-100">{app.chip.value}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EXPO, delay: 0.55 }}
          className={cn(
            "absolute bottom-[14%] animate-float-slow",
            flipped ? "right-[2%] sm:right-[8%]" : "left-[2%] sm:left-[8%]"
          )}
        >
          <div className="glass flex items-center gap-2 rounded-full py-2 pl-2.5 pr-4">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-amber-300 text-amber-300" />
              ))}
            </span>
            <span className="text-[12px] font-medium text-mist-300">"{app.storeBadge}"</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="apps" aria-labelledby="apps-title" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-[30rem] w-[60rem] -translate-x-1/2 opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(109,92,255,0.6), transparent 72%)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Meet the suite"
          title={
            <span id="apps-title">
              Three apps. One <Em>quiet</Em> system.
            </span>
          }
          sub="Each one stands alone beautifully. Together, they quietly run your day, your rest, and your money — with a single membership."
        />
        <div className="divide-y divide-white/[0.06]">
          {SUITE_APPS.map((app, i) => (
            <AppRow key={app.id} app={app} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
