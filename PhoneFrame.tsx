import { ArrowUp, Check } from "lucide-react";
import { useState, type FormEvent, type SVGProps } from "react";
import { FOOTER_COLS } from "../lib/site";
import { Logo } from "./Logo";

type IconProps = SVGProps<SVGSVGElement>;

const XIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

const InstagramIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const GithubIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const SOCIALS = [
  { icon: XIcon, label: "DelQuro on X" },
  { icon: InstagramIcon, label: "DelQuro on Instagram" },
  { icon: YoutubeIcon, label: "DelQuro on YouTube" },
  { icon: GithubIcon, label: "DelQuro on GitHub" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer aria-label="Site footer" className="relative border-t border-white/[0.07]">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand + newsletter */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-[15px] leading-relaxed text-mist-400">
              An independent studio crafting everyday apps, obsessively. Made with care by DelQuro
              Labs LLC.
            </p>
            <p className="mt-6 font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-mist-500">
              One thoughtful email a month
            </p>
            {subscribed ? (
              <p role="status" className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-[14px] font-medium text-emerald-300">
                <Check className="h-4 w-4" aria-hidden /> You're on the list. Welcome.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-3 flex max-w-sm gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full min-w-0 rounded-full border border-white/10 bg-white/[0.04] px-4.5 py-2.5 text-[14px] text-mist-100 placeholder:text-mist-600 transition-colors focus:border-aurora-a/60 focus:bg-white/[0.06] focus:outline-none"
                />
                <button
                  type="submit"
                  className="btn-shine shrink-0 rounded-full bg-gradient-to-r from-aurora-a via-aurora-b to-aurora-c px-5 py-2.5 font-display text-[13.5px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.97]"
                >
                  Subscribe
                </button>
              </form>
            )}
            <ul className="mt-7 flex gap-2.5" aria-label="Social media">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <a
                    href="#top"
                    aria-label={label}
                    className="glass flex h-10 w-10 items-center justify-center rounded-xl text-mist-400 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:text-white"
                  >
                    <Icon className="h-[17px] w-[17px]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-[12.5px] font-semibold uppercase tracking-[0.18em] text-mist-500">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="link-underline text-[14.5px] text-mist-400 transition-colors hover:text-mist-100"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="text-[13px] text-mist-500">
            © {new Date().getFullYear()} DelQuro Labs LLC · Wilmington, Delaware. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#top" className="text-[13px] text-mist-500 transition-colors hover:text-mist-200">
              Terms
            </a>
            <a href="#top" className="text-[13px] text-mist-500 transition-colors hover:text-mist-200">
              Privacy
            </a>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-mist-400 transition-colors hover:text-white"
              aria-label="Back to top"
            >
              Back to top
              <span className="glass flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-1">
                <ArrowUp className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* giant watermark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[3.5vw] bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center font-display text-[19.5vw] font-bold leading-[0.82] tracking-[-0.05em] text-transparent">
          DelQuro
        </p>
      </div>
    </footer>
  );
}
