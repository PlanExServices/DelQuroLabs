import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Check, RefreshCcw, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PLANS } from "../lib/site";
import { EXPO, Stagger, Item } from "./Reveal";
import { Button, SectionHeading, Em } from "./ui";
import { cn } from "../utils/cn";

function Price({ plan, annual }: { plan: (typeof PLANS)[number]; annual: boolean }) {
  if (plan.monthly === null)
    return (
      <div className="flex items-baseline gap-2">
        <span className="font-display text-5xl font-semibold tracking-tight text-mist-100">$249</span>
        <span className="text-sm text-mist-500">once, forever</span>
      </div>
    );
  const amount = annual ? plan.annual! : plan.monthly!;
  return (
    <div className="flex items-baseline gap-2">
      <span className="relative inline-flex h-[3.4rem] items-baseline overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={annual ? "annual" : "monthly"}
            initial={{ y: 26, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -26, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: EXPO }}
            className="font-display text-5xl font-semibold tracking-tight text-mist-100"
          >
            ${amount.toFixed(2)}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="text-sm text-mist-500">/ month</span>
    </div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-32 h-[34rem] w-[64rem] -translate-x-1/2 opacity-[0.13] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(79,216,255,0.45), transparent 72%)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <span id="pricing-title">
              Free to start. <Em>Fair</Em> forever.
            </span>
          }
          sub="One plan unlocks every app on every device. No tiers of tiers, no feature roulette — and a 30-day money-back promise on everything."
        />

        {/* billing toggle */}
        <div className="mt-10 flex justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="glass relative inline-flex rounded-full p-1"
          >
            {(["Monthly", "Annual"] as const).map((label) => {
              const selected = annual === (label === "Annual");
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setAnnual(label === "Annual")}
                  className={cn(
                    "relative rounded-full px-5 py-2.5 font-display text-[13.5px] font-semibold transition-colors",
                    selected ? "text-white" : "text-mist-400 hover:text-mist-200"
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="billing-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-aurora-a/80 via-aurora-b/80 to-aurora-c/80"
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {label}
                    {label === "Annual" && (
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-bold tracking-wide">
                        −38%
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Stagger className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((plan) => {
            const card = (
              <div
                className={cn(
                  "flex h-full flex-col p-7 sm:p-8",
                  plan.featured
                    ? "rounded-[calc(1.6rem-1.5px)] bg-ink-900"
                    : "rounded-3xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-500 hover:border-white/15"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-aurora-a via-aurora-b to-aurora-c px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-lg">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold tracking-tight text-mist-100">
                  {plan.name}
                </h3>
                <p className="mt-1 text-[14px] text-mist-500">{plan.blurb}</p>

                <div className="mt-6">
                  <Price plan={plan} annual={annual} />
                  <p className="mt-1.5 h-4 text-[12.5px] text-mist-500">
                    {plan.featured && annual ? plan.annualNote : plan.featured ? "Billed monthly" : plan.monthly === 0 ? "No card required" : "​"}
                  </p>
                </div>

                <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] text-mist-300">
                      <Check
                        aria-hidden
                        className={cn("mt-0.5 h-4 w-4 shrink-0", plan.featured ? "text-aurora-c" : "text-mist-500")}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href="#cta"
                  variant={plan.featured ? "primary" : "ghost"}
                  className="mt-8 w-full"
                  magnetic={plan.featured}
                >
                  {plan.cta}
                </Button>
              </div>
            );

            return (
              <Item key={plan.name} className="h-full">
                {plan.featured ? (
                  <div className="relative h-full rounded-[1.6rem] bg-gradient-to-b from-aurora-a via-aurora-b to-aurora-c p-[1.5px] shadow-[0_0_90px_-18px_rgba(139,92,246,0.55)]">
                    {card}
                  </div>
                ) : (
                  <div className="h-full">{card}</div>
                )}
              </Item>
            );
          })}
        </Stagger>

        {/* guarantees */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { icon: ShieldCheck, text: "No data selling, ever" },
            { icon: RefreshCcw, text: "Cancel anytime in two taps" },
            { icon: BadgeCheck, text: "30-day money-back guarantee" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="inline-flex items-center gap-2 text-[13.5px] text-mist-400">
              <Icon aria-hidden className="h-4 w-4 text-aurora-c" />
              {text}
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-[12.5px] text-mist-600">
          Prices in USD. Keep your data forever, whatever you decide.
        </p>
      </div>
    </section>
  );
}
