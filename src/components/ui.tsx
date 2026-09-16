import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "../utils/cn";
import { Reveal } from "./Reveal";

/* ---------- magnetic hover wrapper ---------- */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.16);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.22);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ---------- buttons ---------- */
type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  ariaLabel?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
  ariaLabel,
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold tracking-tight transition-all duration-300 will-change-transform";
  const sizes = {
    sm: "px-4.5 py-2 text-[13px]",
    md: "px-6 py-3 text-[15px]",
    lg: "px-7 py-3.5 text-[16px]",
  } as const;
  const variants = {
    primary:
      "btn-shine text-white bg-gradient-to-r from-aurora-a via-aurora-b to-aurora-c shadow-[0_10px_40px_-10px_rgba(139,92,246,0.65)] hover:shadow-[0_16px_54px_-8px_rgba(139,92,246,0.8)] hover:brightness-110 active:scale-[0.98]",
    ghost:
      "glass text-mist-100 hover:bg-white/[0.09] hover:border-white/20 active:scale-[0.98]",
    quiet: "text-mist-300 hover:text-white",
  } as const;

  const el = (
    <a href={href} aria-label={ariaLabel} className={cn(base, sizes[size], variants[variant], className)}>
      {children}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/* ---------- eyebrow pill ---------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5",
        "font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-mist-300",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-aurora-a to-aurora-c animate-pulse-soft" aria-hidden />
      {children}
    </span>
  );
}

/* ---------- section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-mist-100">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.16}>
          <p className={cn("mt-5 text-[17px] leading-relaxed text-mist-400", centered && "mx-auto max-w-2xl")}>
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- serif italic accent word ---------- */
export function Em({ children }: { children: ReactNode }) {
  return (
    <em className="font-serif italic font-normal tracking-normal text-aurora pr-[0.04em]">
      {children}
    </em>
  );
}
