import { useId } from "react";
import type { SuiteApp } from "../lib/site";
import { cn } from "../utils/cn";

function Glyph({ id }: { id: SuiteApp["id"] }) {
  if (id === "loom")
    return (
      <g fill="#fff" fillOpacity="0.95">
        <rect x="12" y="13" width="24" height="6" rx="3" />
        <rect x="12" y="25" width="17" height="6" rx="3" fillOpacity="0.75" />
        <rect x="12" y="37" width="11" height="6" rx="3" fillOpacity="0.5" />
      </g>
    );
  if (id === "aura")
    return (
      <g fill="none" stroke="#fff" strokeLinecap="round">
        <circle cx="28" cy="28" r="14" strokeWidth="3.4" strokeOpacity="0.95" />
        <circle cx="28" cy="28" r="8.5" strokeWidth="3" strokeOpacity="0.55" />
        <circle cx="28" cy="28" r="3.4" fill="#fff" stroke="none" />
      </g>
    );
  return (
    <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="12,38 21,28 27,33 40,17" strokeWidth="4" />
      <circle cx="40" cy="17" r="3.6" fill="#fff" stroke="none" />
    </g>
  );
}

export function AppIcon({
  app,
  size = 52,
  className,
}: {
  app: SuiteApp;
  size?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label={`${app.name} app icon`}
      className={cn("drop-shadow-lg", className)}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={app.accent.from} />
          <stop offset="1" stopColor={app.accent.to} />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="15" fill={`url(#${id})`} />
      <rect width="56" height="56" rx="15" fill="url(#${id})" opacity="0" />
      <rect x="0.75" y="0.75" width="54.5" height="54.5" rx="14.25" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.5" />
      <Glyph id={app.id} />
    </svg>
  );
}
