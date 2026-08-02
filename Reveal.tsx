import { useId } from "react";
import { cn } from "../utils/cn";

export function LogoMark({ size = 34, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="DelQuro Labs logo"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6D5CFF" />
          <stop offset="0.5" stopColor="#B15CFF" />
          <stop offset="1" stopColor="#4FD8FF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17" fill={`url(#${id})`} />
      <circle
        cx="32"
        cy="32"
        r="14"
        fill="none"
        stroke="#050509"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="66 22"
        transform="rotate(45 32 32)"
      />
      <circle cx="42.7" cy="21.3" r="4.4" fill="#050509" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="DelQuro Labs — home"
    >
      <LogoMark
        size={32}
        className="transition-transform duration-500 ease-out group-hover:rotate-[10deg] group-hover:scale-105"
      />
      <span className="font-display text-[19px] font-semibold tracking-tight text-mist-100">
        DelQuro
        <span className="ml-1.5 font-medium text-mist-500">Labs</span>
      </span>
    </a>
  );
}
