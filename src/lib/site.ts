export type AppAccent = {
  from: string;
  to: string;
  text: string;
  chipBg: string;
  chipBorder: string;
  glow: string;
};

export type SuiteApp = {
  id: "loom" | "aura" | "vantage";
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  image: string;
  rating: string;
  ratingsCount: string;
  storeBadge: string;
  chip: { label: string; value: string };
  accent: AppAccent;
};

export const SUITE_APPS: SuiteApp[] = [
  {
    id: "loom",
    name: "Loom",
    tagline: "Your day, beautifully blocked.",
    description:
      "The calm planner. Loom takes your sprawling to-do list and gently arranges it into a realistic, time-blocked day — automatically. When life happens, it reshuffles without the guilt trip.",
    bullets: [
      "Auto-scheduling that respects your energy",
      "Capture from anywhere — Siri, share sheet, widgets",
      "Guilt-free reshuffling when plans change",
    ],
    image: "/images/screen-loom.jpg",
    rating: "4.9",
    ratingsCount: "24k",
    storeBadge: "Editor's Choice",
    chip: { label: "Deep work", value: "2h 15m done" },
    accent: {
      from: "#6366F1",
      to: "#8B5CF6",
      text: "text-indigo-300",
      chipBg: "bg-indigo-500/10",
      chipBorder: "border-indigo-400/20",
      glow: "rgba(129, 140, 248, 0.38)",
    },
  },
  {
    id: "aura",
    name: "Aura",
    tagline: "Sleep deeper. Breathe easier.",
    description:
      "Your wind-down companion. Adaptive soundscapes, science-backed breathwork, and sleep stories told by real humans — designed to get you there, night after night.",
    bullets: [
      "Soundscapes that adapt as you drift off",
      "3-minute breathwork for anxious moments",
      "Sleep stories narrated by real voices",
    ],
    image: "/images/screen-aura.jpg",
    rating: "4.8",
    ratingsCount: "9k",
    storeBadge: "App of the Day",
    chip: { label: "Sleep score", value: "94 · Excellent" },
    accent: {
      from: "#A855F7",
      to: "#D946EF",
      text: "text-fuchsia-300",
      chipBg: "bg-fuchsia-500/10",
      chipBorder: "border-fuchsia-400/20",
      glow: "rgba(217, 70, 239, 0.32)",
    },
  },
  {
    id: "vantage",
    name: "Vantage",
    tagline: "Money, finally clear.",
    description:
      "Every account in one honest view. Vantage builds budgets that learn how you actually live — and keeps every insight on your device, where it belongs.",
    bullets: [
      "All your accounts, one honest number",
      "Budgets that learn how you live",
      "Read-only connections, on-device insights",
    ],
    image: "/images/screen-vantage.jpg",
    rating: "4.9",
    ratingsCount: "14k",
    storeBadge: "Best New App",
    chip: { label: "This month", value: "$312 saved" },
    accent: {
      from: "#14B8A6",
      to: "#22D3EE",
      text: "text-teal-300",
      chipBg: "bg-teal-500/10",
      chipBorder: "border-teal-400/20",
      glow: "rgba(45, 212, 191, 0.32)",
    },
  },
];

export const NAV_LINKS = [
  { label: "Apps", href: "#apps" },
  { label: "Why DelQuro", href: "#features" },
  { label: "Stories", href: "#stories" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const PRESS_WORDMARKS = [
  { name: "WIRED", className: "font-display font-bold tracking-[0.4em] uppercase" },
  { name: "The Verge", className: "font-display font-extrabold italic tracking-tight" },
  { name: "Fast Company", className: "font-serif font-semibold tracking-tight" },
  { name: "Product Hunt", className: "font-display font-semibold" },
  { name: "TechRadar", className: "font-display font-medium tracking-tight" },
  { name: "MacStories", className: "font-sans font-light tracking-wide" },
  { name: "9to5Mac", className: "font-display font-extrabold tracking-tighter" },
  { name: "AppAdvice", className: "font-sans font-semibold italic" },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  app: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I've downloaded every planner on the store. Loom is the first one still on my phone a year later — it plans around my life instead of against it.",
    name: "Maya Chen",
    role: "Product Designer",
    app: "Loom",
    avatar: "from-indigo-400 to-violet-500",
  },
  {
    quote:
      "Aura's three-minute breathwork got me through board season. Shoulders drop by the second minute, every single time.",
    name: "Daniel Okafor",
    role: "Founder & CEO",
    app: "Aura",
    avatar: "from-fuchsia-400 to-purple-600",
  },
  {
    quote:
      "Vantage found three subscriptions I'd forgotten I was paying for. It quite literally paid for itself with one notification.",
    name: "Sofia Marques",
    role: "Teacher",
    app: "Vantage",
    avatar: "from-teal-400 to-cyan-500",
  },
  {
    quote:
      "It's rare to feel this much care in software. Every animation, every haptic, every sound — considered. I study these apps.",
    name: "Jonas Weber",
    role: "iOS Engineer",
    app: "DelQuro+",
    avatar: "from-violet-400 to-indigo-600",
  },
  {
    quote:
      "My therapist asked what changed. Honestly? I started sleeping with Aura and waking up to a day Loom already made sense of.",
    name: "Priya Nair",
    role: "Registered Nurse",
    app: "Aura",
    avatar: "from-purple-400 to-fuchsia-500",
  },
  {
    quote:
      "Finally, a finance app that doesn't shame me. Vantage is the first budget I have ever actually kept.",
    name: "Alex Rivera",
    role: "Freelance Photographer",
    app: "Vantage",
    avatar: "from-cyan-400 to-blue-500",
  },
  {
    quote:
      "One subscription for three of my most-used apps is how every suite should work. The sync is invisible — it just follows me.",
    name: "Tomás Silva",
    role: "Medical Student",
    app: "DelQuro+",
    avatar: "from-indigo-400 to-blue-600",
  },
  {
    quote:
      "Support answered in eleven minutes. An actual human. Who built the feature I was asking about. Unheard of.",
    name: "Grace Kim",
    role: "Writer",
    app: "Loom",
    avatar: "from-fuchsia-400 to-rose-500",
  },
];

export type Plan = {
  name: string;
  blurb: string;
  monthly: number | null;
  annual: number | null;
  annualNote?: string;
  cta: string;
  featured?: boolean;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "A generous taste of the suite.",
    monthly: 0,
    annual: 0,
    cta: "Download free",
    features: [
      "All three apps, core features",
      "1 device",
      "Local backup & open export",
      "Community support",
    ],
  },
  {
    name: "DelQuro+",
    blurb: "The full experience, everywhere.",
    monthly: 7.99,
    annual: 4.92,
    annualNote: "Billed $59 once a year",
    cta: "Start 7-day free trial",
    featured: true,
    features: [
      "Everything in Starter",
      "Every app unlocked, on every device",
      "Instant end-to-end encrypted sync",
      "Premium themes, widgets & soundscapes",
      "Smart automations & insights",
      "Family sharing for up to 5",
      "Priority support from real humans",
    ],
  },
  {
    name: "Lifetime",
    blurb: "For people who hate subscriptions too.",
    monthly: null,
    annual: null,
    cta: "Get lifetime access",
    features: [
      "Everything in DelQuro+",
      "Pay once, keep it forever",
      "All future apps included",
      "Founding-member badge",
      "Concierge onboarding call",
    ],
  },
];

export const FAQS = [
  {
    q: "Is DelQuro+ really one subscription for all three apps?",
    a: "Yes — one plan unlocks every premium feature in Loom, Aura, and Vantage on every device you own. Anything we ship in the future is included while you're subscribed, and Lifetime members get it forever.",
  },
  {
    q: "Which platforms do you support?",
    a: "iPhone, iPad, Android, macOS, and a fast web app — all native, all polished. Everything syncs end-to-end encrypted in the background, so your day, your sleep data, and your budgets simply follow you.",
  },
  {
    q: "Do you show ads or sell my data?",
    a: "Never — and that isn't marketing copy, it's the business model. No ads, no third-party trackers, no data brokers. Most intelligence runs on-device, sync is end-to-end encrypted, and you can export or delete everything in two taps.",
  },
  {
    q: "Can I really use the apps for free, forever?",
    a: "Yes. The free tier isn't a disguised trial — Loom, Aura, and Vantage each have generous free versions you can use indefinitely. Upgrade only when you want sync, premium content, and the deeper magic.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep premium until the end of your billing period, then glide back to the free tier. Nothing is held hostage — your data stays put and exports anytime in open formats.",
  },
  {
    q: "Do you offer refunds?",
    a: "Every paid plan comes with a 30-day, no-questions-asked money-back guarantee. Email a human and you'll usually have your refund before lunch.",
  },
];

export const FOOTER_COLS = [
  {
    title: "Apps",
    links: [
      { label: "Loom — Planner", href: "#apps" },
      { label: "Aura — Sleep", href: "#apps" },
      { label: "Vantage — Money", href: "#apps" },
      { label: "DelQuro+", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About the studio", href: "#" },
      { label: "Journal", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", href: "#faq" },
      { label: "Privacy", href: "#" },
      { label: "Security", href: "#" },
      { label: "Community", href: "#stories" },
      { label: "System status", href: "#" },
    ],
  },
];
