import { Apple, Play } from "lucide-react";
import { SUITE_APPS } from "../lib/site";
import { AppIcon } from "./AppIcon";
import { Reveal } from "./Reveal";
import { Em } from "./ui";

function StoreButton({
  icon: Icon,
  top,
  bottom,
  href,
}: {
  icon: typeof Apple;
  top: string;
  bottom: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.1]"
      aria-label={`${top} ${bottom}`}
    >
      <Icon className="h-7 w-7 text-mist-100 transition-transform duration-300 group-hover:scale-110" aria-hidden />
      <span className="text-left">
        <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-mist-400">
          {top}
        </span>
        <span className="block font-display text-[16px] font-semibold leading-tight text-mist-100">
          {bottom}
        </span>
      </span>
    </a>
  );
}

export function CTA() {
  return (
    <section id="cta" aria-labelledby="cta-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center sm:px-12 sm:py-24">
            {/* aurora field */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 130% at 50% -20%, rgba(109,92,255,0.32), transparent 55%), radial-gradient(70% 120% at 85% 110%, rgba(217,70,239,0.2), transparent 60%), radial-gradient(70% 120% at 12% 105%, rgba(79,216,255,0.18), transparent 60%), #0a0a12",
              }}
            />
            <div aria-hidden className="grid-lines absolute inset-0 opacity-60 mask-b" />
            <div aria-hidden className="noise absolute inset-0 opacity-[0.06] mix-blend-soft-light" />
            {/* slow conic ring */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 animate-spin-slower rounded-full opacity-[0.14]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0deg, rgba(141,123,255,0.8) 60deg, transparent 120deg, rgba(111,225,255,0.6) 240deg, transparent 300deg)",
                mask: "radial-gradient(closest-side, transparent 78%, black 80%)",
                WebkitMask: "radial-gradient(closest-side, transparent 78%, black 80%)",
              }}
            />

            <div className="relative">
              <div className="flex justify-center">
                {SUITE_APPS.map((app, i) => (
                  <span
                    key={app.id}
                    className={`-ml-3 first:ml-0 ${i === 1 ? "z-10 scale-115" : "scale-95 opacity-90"} transition-transform duration-500 hover:scale-110 hover:rotate-[-4deg]`}
                    style={{ transform: `rotate(${(i - 1) * 7}deg)` }}
                  >
                    <AppIcon app={app} size={58} />
                  </span>
                ))}
              </div>

              <h2
                id="cta-title"
                className="mx-auto mt-9 max-w-2xl font-display text-[clamp(2rem,5.2vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-mist-100"
              >
                Your calmer, clearer life starts <Em>tonight</Em>.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[16.5px] leading-relaxed text-mist-400">
                Download any app free, and feel the difference by morning. Upgrade to DelQuro+
                whenever — or never. We'll be here either way.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <StoreButton icon={Apple} top="Download on the" bottom="App Store" href="#cta" />
                <StoreButton icon={Play} top="Get it on" bottom="Google Play" href="#cta" />
              </div>

              <p className="mt-7 text-[12.5px] tracking-wide text-mist-500">
                Free to start · 60-second setup · No card required
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
