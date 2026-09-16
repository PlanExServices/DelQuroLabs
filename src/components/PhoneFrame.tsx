import { cn } from "../utils/cn";

export function PhoneFrame({
  src,
  alt,
  glow,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  glow: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {/* ambient halo */}
      <div
        aria-hidden
        className="absolute -inset-12 rounded-[3.5rem] opacity-70 blur-3xl"
        style={{ background: `radial-gradient(58% 58% at 50% 42%, ${glow}, transparent 72%)` }}
      />
      {/* side hardware */}
      <div aria-hidden className="absolute -left-[2.5px] top-[18%] h-8 w-[3px] rounded-full bg-white/25" />
      <div aria-hidden className="absolute -left-[2.5px] top-[27%] h-12 w-[3px] rounded-full bg-white/25" />
      <div aria-hidden className="absolute -right-[2.5px] top-[23%] h-16 w-[3px] rounded-full bg-white/25" />

      {/* chassis */}
      <div className="relative rounded-[2.4rem] border border-white/15 bg-gradient-to-b from-white/15 via-white/5 to-transparent p-[2.5px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85)]">
        <div className="rounded-[2.2rem] bg-black p-[7px]">
          <div className="relative aspect-[9/19.3] overflow-hidden rounded-[1.85rem] bg-ink-900">
            <img
              src={src}
              alt={alt}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              width={590}
              height={1266}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* dynamic island */}
            <div aria-hidden className="absolute left-1/2 top-[1.6%] h-[3.4%] w-[33%] -translate-x-1/2 rounded-full border border-white/[0.06] bg-black" />
            {/* glass sheen */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.85rem] bg-gradient-to-bl from-white/[0.09] via-transparent to-transparent" />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.85rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
