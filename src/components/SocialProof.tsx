import { PRESS_WORDMARKS } from "../lib/site";

export function SocialProof() {
  return (
    <section aria-label="Featured in the press" className="relative py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-mist-500">
          As featured in
        </p>
      </div>
      <div className="marquee mask-x mt-8 overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20"
            >
              {PRESS_WORDMARKS.map((w) => (
                <li key={w.name} className="flex items-center gap-14 sm:gap-20">
                  <span
                    className={`whitespace-nowrap text-lg text-mist-500 transition-colors duration-300 hover:text-mist-200 sm:text-xl ${w.className}`}
                  >
                    {w.name}
                  </span>
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-mist-600/50" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <span className="sr-only">
        Featured in WIRED, The Verge, Fast Company, Product Hunt, TechRadar, MacStories, 9to5Mac and
        AppAdvice.
      </span>
    </section>
  );
}
