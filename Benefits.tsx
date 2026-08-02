import { Backdrop } from "./components/Backdrop";
import { Benefits } from "./components/Benefits";
import { CTA } from "./components/CTA";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Pricing } from "./components/Pricing";
import { Showcase } from "./components/Showcase";
import { SocialProof } from "./components/SocialProof";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-semibold focus:text-ink-950"
      >
        Skip to content
      </a>
      <Backdrop />
      <Navbar />
      <main id="main">
        <Hero />
        <SocialProof />
        <Features />
        <Showcase />
        <Benefits />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
