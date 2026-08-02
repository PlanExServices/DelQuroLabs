import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import { FAQS } from "../lib/site";
import { EXPO, Reveal } from "./Reveal";
import { Eyebrow, Em } from "./ui";
import { cn } from "../utils/cn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* sticky intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="faq-title"
                className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-mist-100"
              >
                Questions? <br />
                <Em>Answered</Em>, honestly.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-mist-400">
                The things people actually ask us — subscriptions, privacy, platforms — without the
                legal fog machine.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="glass mt-8 max-w-md rounded-3xl p-6">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/10 text-violet-300">
                    <MessageCircle className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold text-mist-100">
                      Still curious?
                    </p>
                    <p className="text-[13px] text-mist-500">
                      Talk to a human — median reply, 11 minutes.
                    </p>
                  </div>
                </div>
                <a
                  href="mailto:hello@delquro.com"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 font-display text-[13.5px] font-semibold text-mist-100 transition-all hover:border-white/25 hover:bg-white/[0.1]"
                >
                  hello@delquro.com
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* accordion */}
          <Reveal delay={0.1}>
            <div className="border-t border-white/[0.08]">
              {FAQS.map((item, i) => {
                const open = openIndex === i;
                const buttonId = `faq-button-${i}`;
                const panelId = `faq-panel-${i}`;
                return (
                  <div key={item.q} className="border-b border-white/[0.08]">
                    <h3>
                      <button
                        type="button"
                        id={buttonId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(open ? null : i)}
                        className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                      >
                        <span
                          className={cn(
                            "font-display text-[17px] font-medium tracking-tight transition-colors duration-300 sm:text-lg",
                            open ? "text-white" : "text-mist-200 group-hover:text-white"
                          )}
                        >
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          transition={{ duration: 0.35, ease: EXPO }}
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                            open
                              ? "border-aurora-b/50 bg-aurora-b/15 text-aurora-c"
                              : "border-white/10 text-mist-400 group-hover:border-white/25 group-hover:text-mist-100"
                          )}
                        >
                          <Plus className="h-4 w-4" aria-hidden />
                        </motion.span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EXPO }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-mist-400">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
