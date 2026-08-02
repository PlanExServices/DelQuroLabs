import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ChevronRight, Play, Sparkles, Star } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { SUITE_APPS } from "../lib/site";
import { PhoneFrame } from "./PhoneFrame";
import { EXPO } from "./Reveal";
import { Button, Em } from "./ui";

const AVATARS = [
  ["MC", "from-indigo-400 to-violet-500"],
  ["DO", "from-fuchsia-400 to-purple-600"],
  ["SM", "from-teal-400 to-cyan-500"],
  ["PN", "from-violet-400 to-indigo-600"],
  ["GK", "from-cyan-400 to-blue-500"],
] as const;

/* masked line reveal for the headline */
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className="block"
        initial={{ y: "115%", opacity: 0.4 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.1, ease: EXPO, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Stat({
  value,
  decimals = 0,
  suffix,
  label,
}: {
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState((0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: EXPO,
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <div ref={ref} role="listitem" className="px-5 py-6 sm:px-8">
      <div className="font-display text-[26px] font-semibold tracking-tight text-mist-100 sm:text-3xl">
        {display}
        <span className="text-aurora">{suffix}</span>
      </div>
      <div className="mt-1 text-[13px] text-mist-500">{label}</div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const clusterRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 110, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 110, damping: 18 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  const [loom, aura, vantage] = SUITE_APPS;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44">
      {/* hero-local atmosphere */}
      <div aria-hidden className="grid-lines absolute inset-x-0 top-0 h-[760px] mask-b" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-16rem] h-[38rem] w-[64rem] -translate-x-1/2 opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(141,123,255,0.45), rgba(111,225,255,0.12) 60%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.25 }}
          >
            <a
              href="#apps"
              className="group glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3 text-[13px] text-mist-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-aurora-a to-aurora-b px-2.5 py-0.5 font-display text-[11px] font-bold uppercase tracking-wider text-white">
                <Sparkles className="h-3 w-3" aria-hidden /> New
              </span>
              Aura 2.0 is live — our calmest release yet
              <ChevronRight className="h-3.5 w-3.5 text-mist-500 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </motion.div>

          {/* headline */}
          <h1
            id="hero-title"
            className="mt-8 font-display text-[clamp(2.7rem,7.2vw,5.6rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-mist-100"
          >
            <Line delay={0.35}>Everyday apps,</Line>
            <Line delay={0.47}>
              <Em>obsessively</Em> crafted.
            </Line>
          </h1>

          {/* subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO, delay: 0.72 }}
            className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-mist-400 sm:text-lg"
          >
            DelQuro Labs is an independent studio building a suite of thoughtful apps — for focused
            mornings, restful nights, and money that finally makes sense.{" "}
            <span className="text-mist-200">No ads. No tracking. No noise.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO, delay: 0.84 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#apps" size="lg" magnetic className="w-full sm:w-auto">
              Explore the suite
              <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Button>
            <Button href="#features" variant="ghost" size="lg" className="w-full sm:w-auto">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                <Play className="h-3 w-3 fill-current" aria-hidden />
              </span>
              See why people switch
            </Button>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO, delay: 0.96 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <div className="flex -space-x-2.5" aria-hidden>
              {AVATARS.map(([initials, grad]) => (
                <span
                  key={initials}
                  className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${grad} text-[10px] font-bold text-white ring-2 ring-ink-950`}
                >
                  {initials}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                ))}
              </span>
              <p className="text-[13px] text-mist-400">
                <span className="font-semibold text-mist-100">4.9</span> from 38,000+ ratings ·{" "}
                loved by 2M+ people
              </p>
            </div>
          </motion.div>
        </div>

        {/* phone cluster */}
        <motion.div
          initial={{ opacity: 0, y: 90, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EXPO, delay: 1.0 }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          {/* orbit rings */}
          <div aria-hidden className="absolute left-1/2 top-2 -z-10 h-[420px] w-[740px] max-w-[140vw] -translate-x-1/2 rounded-[50%] border border-white/[0.07]" />
          <div aria-hidden className="absolute left-1/2 top-14 -z-10 h-[420px] w-[940px] max-w-[180vw] -translate-x-1/2 rounded-[50%] border border-white/[0.05] animate-spin-slower" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/3 -z-10 h-[60%] w-[120%] -translate-x-1/2 blur-3xl"
            style={{ background: "radial-gradient(50% 55% at 50% 45%, rgba(139,92,246,0.22), transparent 70%)" }}
          />

          <div
            ref={clusterRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative [perspective:1600px]"
          >
            <motion.div style={{ rotateX, rotateY }} className="relative flex items-end justify-center">
              <div className="relative z-0 -mr-12 hidden w-[216px] translate-y-8 rotate-[-9deg] scale-[0.93] animate-float-slow sm:block lg:w-[250px]">
                <PhoneFrame src={loom.image} alt="Loom — time-blocked daily planner app screen" glow={loom.accent.glow} />
              </div>
              <div className="relative z-10 w-[236px] animate-float sm:w-[266px] lg:w-[296px]">
                <PhoneFrame
                  src={aura.image}
                  alt="Aura — sleep and mindfulness app with glowing breathing circle"
                  glow={aura.accent.glow}
                  eager
                />
              </div>
              <div
                className="relative z-0 -ml-12 hidden w-[216px] translate-y-8 rotate-[9deg] scale-[0.93] animate-float-slow sm:block lg:w-[250px]"
                style={{ animationDelay: "1.4s" }}
              >
                <PhoneFrame src={vantage.image} alt="Vantage — personal finance dashboard app screen" glow={vantage.accent.glow} />
              </div>
            </motion.div>
          </div>

          {/* fade into next section */}
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[130%] -translate-x-1/2 bg-gradient-to-t from-ink-950 to-transparent" />
        </motion.div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: EXPO }}
          role="list"
          aria-label="DelQuro by the numbers"
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 divide-white/[0.07] border-y border-white/[0.07] sm:grid-cols-4 sm:divide-x"
        >
          <Stat value={2} suffix="M+" label="Downloads worldwide" />
          <Stat value={4.9} decimals={1} suffix="" label="Average App Store rating" />
          <Stat value={120} suffix="+" label="Countries & counting" />
          <Stat value={0} suffix="" label="Ads. Trackers. Ever." />
        </motion.div>
      </div>
    </section>
  );
}
