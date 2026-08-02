import { AnimatePresence, motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../lib/site";
import { cn } from "../utils/cn";
import { Logo } from "./Logo";
import { Button } from "./ui";
import { EXPO } from "./Reveal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EXPO, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* scroll progress hairline */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-aurora-a via-aurora-b to-aurora-c"
      />
      <div
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-ink-950/60"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-[4.5rem]"
        >
          <Logo />

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-[14px] font-medium text-mist-400 transition-colors hover:text-mist-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#pricing"
              className="px-3 py-2 text-[14px] font-medium text-mist-400 transition-colors hover:text-mist-100"
            >
              Sign in
            </a>
            <Button href="#pricing" size="sm" magnetic>
              Get DelQuro+
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-xl text-mist-100 lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EXPO }}
              className="overflow-hidden border-t border-white/[0.06] bg-ink-950/95 backdrop-blur-xl lg:hidden"
            >
              <nav aria-label="Mobile" className="px-5 py-6 sm:px-8">
                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  className="flex flex-col gap-1"
                >
                  {NAV_LINKS.map((l) => (
                    <motion.li
                      key={l.href}
                      variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.4, ease: EXPO }}
                    >
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-medium text-mist-200 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {l.label}
                        <ArrowRight className="h-4 w-4 text-mist-600" aria-hidden />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
                <div className="mt-5 px-1">
                  <Button href="#pricing" className="w-full" ariaLabel="Get DelQuro+">
                    Get DelQuro+ <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <p className="mt-3 text-center text-xs text-mist-500">
                    Free to start · No card required
                  </p>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
