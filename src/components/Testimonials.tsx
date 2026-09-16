import { Quote, Star } from "lucide-react";
import { TESTIMONIALS, type Testimonial } from "../lib/site";
import { SectionHeading, Em } from "./ui";

function Card({ t }: { t: Testimonial }) {
  const initials = t.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <figure className="relative w-[19.5rem] shrink-0 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.05] sm:w-[24rem]">
      <Quote aria-hidden className="absolute right-5 top-5 h-6 w-6 text-white/[0.07]" />
      <div className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} aria-hidden className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
        ))}
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-mist-200">"{t.quote}"</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          aria-hidden
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-[12px] font-bold text-white ${t.avatar}`}
        >
          {initials}
        </span>
        <span>
          <span className="block font-display text-[14px] font-semibold text-mist-100">{t.name}</span>
          <span className="block text-[12.5px] text-mist-500">{t.role}</span>
        </span>
        <span className="ml-auto rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-mist-400">
          {t.app}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false }: { items: Testimonial[]; reverse?: boolean }) {
  return (
    <div className="marquee mask-x overflow-hidden">
      <div className={`marquee-track flex w-max gap-5 py-2.5 ${reverse ? "animate-marquee-rev" : "animate-marquee-slow"}`}>
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-5 pr-5">
            {items.map((t) => (
              <li key={`${copy}-${t.name}`}>
                <Card t={t} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="stories" aria-labelledby="stories-title" className="relative scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[36rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(177,92,255,0.6), transparent 72%)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Member stories"
          title={
            <span id="stories-title">
              Don't take our word for it. <br className="hidden sm:block" />
              Take <Em>theirs</Em>.
            </span>
          }
          sub="38,000+ five-star ratings and counting — from people who noticed the details."
        />
      </div>
      <div className="mt-14 space-y-5 sm:mt-16">
        <Row items={TESTIMONIALS.slice(0, 4)} />
        <Row items={TESTIMONIALS.slice(4)} reverse />
      </div>
    </section>
  );
}
