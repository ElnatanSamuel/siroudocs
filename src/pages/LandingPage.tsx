import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Route,
  Shield,
  Layers,
  Copy,
  Check,
  Compass,
  Cpu,
  Globe,
  ArrowRight,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import Beams from "@/components/Beams";

const features = [
  {
    icon: Route,
    title: "Compile Time Route Safety",
    desc: "Every route name, parameter, and query string is inferred by TypeScript. Broken links surface as build errors, never as 404s in production.",
    num: "01",
  },
  {
    icon: Shield,
    title: "Declarative Guard Pipelines",
    desc: "Define auth, roles, and feature flag checks directly in your route schema. Guards run in sequence before any render,  zero useEffect hacks.",
    num: "02",
  },
  {
    icon: Cpu,
    title: "O(k) Radix Trie Engine",
    desc: "Routes resolve in sub millisecond time regardless of table size. Deterministic matching eliminates order dependent bugs entirely.",
    num: "03",
  },
  {
    icon: Globe,
    title: "Write Once, Route Everywhere",
    desc: "A single routes.ts file powers your React SPA, Next.js app, Svelte site, and React Native mobile app with zero duplication.",
    num: "04",
  },
];

const heroCode = `import { defineRoutes } from "@sirou/core";

export const routes = defineRoutes({
  dashboard: {
    path: "/dashboard",
    meta: { title: "Dashboard" },
  },
  profile: {
    path: "/user/:id",
    params: { id: "string" },
    guards: ["auth"],
  },
});

// Full type inference no strings
router.go("profile", { id: "123" });`;

const LandingPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install @sirou/core");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "hsl(0 0% 0% / 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(0 0% 100% / 0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1">
            <div className="h-6 flex items-center">
              <img
                src="/image/sirouwhite.png"
                alt="sirou"
                className="h-6 w-auto hidden dark:block"
              />
              <img
                src="/image/siroublack.png"
                alt="sirou"
                className="h-6 w-auto block dark:hidden"
              />
            </div>
            <span className="text-xs font-bold ">SIROU</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/docs"
              className="text-sm text-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <a
              href="https://github.com/ElnatanSamuel/sirou"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Beams
            beamWidth={1}
            beamHeight={100}
            beamNumber={10}
            lightColor="#ffffff"
            speed={1.5}
            noiseIntensity={5}
            scale={0.24}
            rotation={360}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(var(--background)))",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-6 text-center pt-24 sm:pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6"
          ></motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="font-display uppercase text-[clamp(1.5rem,8vw,2.5rem)] leading-[1.1] sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight sm:leading-[0.9] mb-6 block w-full px-4 mx-auto"
          >
            Routes should be
            <br />
            <span className="text-foreground">a schema, not strings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-lg text-foreground max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Sirou is a universal, headless routing engine for TypeScript. Define
            once, navigate everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full px-8 sm:px-0 sm:max-w-none mx-auto"
          >
            <Link to="/docs" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 font-medium rounded-none px-8"
              >
                Read the docs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <button
              onClick={copyInstall}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-2.5 rounded-none border bg-card font-mono text-sm text-foreground hover:text-foreground transition-colors group"
            >
              <span className="text-foreground">$</span>
              <span>npm install @sirou/core</span>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto w-full px-6 sm:px-0"
          >
            <CodeBlock
              language="typescript"
              filename="routes.ts"
              code={heroCode}
            />
          </motion.div>
        </div>
      </section>

      {/* Why Sirou */}
      <section className="relative bg-background">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-foreground mb-3">
              Why Sirou
            </p>
            <h2 className="font-display text-4xl uppercase sm:text-3xl font-bold tracking-tight leading-[1.1]">
              Routing that scales
              <br />
              <span className="text-foreground">with your ambition</span>
            </h2>
          </motion.div>

          <div className="space-y-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group grid md:grid-cols-[auto_1fr] gap-6 items-start"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-foreground/80 pt-1 select-none">
                    {f.num}
                  </span>
                  <div className="h-10 w-10 rounded-none bg-card flex items-center justify-center shrink-0  transition-colors">
                    <f.icon className="h-4.5 w-4.5 text-foreground  transition-colors" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-sm text-foreground/80 leading-relaxed max-w-lg">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="border-t">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/80 mb-3">
              Ecosystem
            </p>
            <h2 className="font-display uppercase text-4xl sm:text-3xl font-bold tracking-tight leading-[1.1]">
              One core,
              <br />
              <span className="text-foreground">many adapters</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { pkg: "@sirou/core", desc: "Radix Trie engine & type system" },
              { pkg: "@sirou/react", desc: "React hooks & provider" },
              { pkg: "@sirou/nextjs", desc: "Next.js App Router adapter" },
              { pkg: "@sirou/svelte", desc: "Svelte stores & provider" },
              { pkg: "@sirou/react-native", desc: "React Navigation bridge" },
            ].map((p, i) => (
              <motion.div
                key={p.pkg}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="rounded-lg border bg-card/50 px-5 py-4 hover:border-accent/20 transition-colors group"
              >
                <p className="font-mono text-sm font-medium mb-1 group-hover:text-foreground transition-colors">
                  {p.pkg}
                </p>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl sm:text-3xl uppercase font-bold tracking-tight mb-4">
              Ready to unify your routes?
            </h2>
            <p className="text-foreground/80 mb-8 max-w-md mx-auto">
              Get started in under 5 minutes.
            </p>
            <Link to="/docs/quick-start">
              <Button size="lg" className="rounded-none px-8 gap-2">
                Quick Start Guide
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <img
              src="/image/sirouwhite.png"
              alt="sirou"
              className="h-6 block dark:hidden opacity-80"
            />
            <img
              src="/image/siroublack.png"
              alt="sirou"
              className="h-6 hidden dark:block opacity-80"
            />
          </div>
          <p className="text-xs text-foreground/80">
            Schema driven routing for TypeScript.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
