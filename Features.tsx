export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* aurora wash, top center */}
      <div
        className="absolute -top-[30rem] left-1/2 h-[52rem] w-[90rem] -translate-x-1/2 opacity-30 blur-3xl animate-pulse-soft"
        style={{
          background:
            "radial-gradient(closest-side, rgba(109,92,255,0.5), rgba(177,92,255,0.18) 55%, transparent 75%)",
        }}
      />
      {/* fuchsia pool, right */}
      <div
        className="absolute top-[38%] -right-[22rem] h-[44rem] w-[44rem] opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(217,70,239,0.55), transparent 72%)" }}
      />
      {/* cyan pool, left */}
      <div
        className="absolute top-[68%] -left-[24rem] h-[46rem] w-[46rem] opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(79,216,255,0.5), transparent 72%)" }}
      />
      {/* film grain */}
      <div className="noise absolute inset-0 opacity-[0.05] mix-blend-soft-light" />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 0%, transparent 60%, rgba(5,5,9,0.55))" }}
      />
    </div>
  );
}
