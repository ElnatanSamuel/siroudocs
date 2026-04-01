import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cpu,
  Globe,
  ArrowRight,
  Zap,
  Layers,
  Share2,
} from "lucide-react";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";

const IntroductionPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="doc-prose max-w-4xl"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Introduction</h1>
        <p className="text-foreground/80 leading-7">
          Sirou is a framework agnostic, universal routing and navigation engine
          for TypeScript. It provides a single source of truth for your
          application's architecture, ensuring type safe and consistent logic
          across Web, Mobile, and Server environments.
        </p>
      </div>

      <section className="mb-12">
        <h2
          id="core-philosophy"
          className="text-xl font-semibold mb-4 flex items-center gap-2"
        >
          The Core Philosophy
        </h2>
        <div className="p-5 rounded-[6px] border bg-muted/30">
          <p className="m-0 text-sm leading-relaxed text-foreground/80">
            Modern application development often leads to fragmented routing
            logic, different patterns for your Next.js web app, your React
            Native mobile app, and your server side redirects. Sirou solves this
            by treating your routes as a{" "}
            <span className="text-foreground font-semibold">
              centralized schema
            </span>
            .
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="key-benefits"
          className="text-xl font-semibold mb-6 flex items-center gap-2"
        >
          Key Benefits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-[6px] border bg-card hover:bg-muted/50 transition-colors group">
            <h3 className="text-base font-bold mb-2">Type Safety</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automatic autocomplete and validation for route names, parameters,
              and query strings. Catch broken links at compile time.
            </p>
          </div>
          <div className="p-5 rounded-[6px] border bg-card hover:bg-muted/50 transition-colors group">
            <h3 className="text-base font-bold mb-2">Headless Engine</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The core logic is pure TypeScript. Zero dependencies on the DOM or
              any specific UI framework.
            </p>
          </div>
          <div className="p-5 rounded-[6px] border bg-card hover:bg-muted/50 transition-colors group">
            <h3 className="text-base font-bold mb-2">Universal Bridge</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Share 100% of your routing logic, guards, and loaders between your
              Web dashboard and Mobile app.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="how-it-works"
          className="text-xl font-semibold mb-6 flex items-center gap-2"
        >
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              step: "01",
              title: "Define",
              desc: "Create a type safe schema using defineRoutes.",
            },
            {
              step: "02",
              title: "Abstract",
              desc: "Use symbols and types for navigation.",
            },
            {
              step: "03",
              title: "Navigate",
              desc: "Use adapters to bind Sirou to your UI.",
            },
          ].map((s) => (
            <div key={s.step} className="p-4 rounded-[6px] border bg-card">
              <div className="text-[10px] font-bold text-accent mb-1 uppercase tracking-wider opacity-60">
                Step {s.step}
              </div>
              <h4 className="font-bold text-sm">{s.title}</h4>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mb-12">
        <CodeBlock
          language="typescript"
          filename="routes.ts"
          code={`import { defineRoutes } from "@sirou/core";

// Single source of truth
export const routes = defineRoutes({
  dashboard: {
    path: "/dashboard",
    meta: { title: "User Dashboard" },
  },
  profile: {
    path: "/user/:id",
    params: { id: "string" },
  },
});`}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 p-6 rounded-[6px] border bg-card justify-between">
        <div>
          <h3 className="text-lg font-bold mb-1">Getting Started</h3>
          <p className="text-muted-foreground text-xs m-0">
            Learn how to install and configure Sirou in your project.
          </p>
        </div>
        <Button
          asChild
          variant="secondary"
          className="rounded-[6px] h-9 px-4 text-sm"
        >
          <Link
            to="/docs/installation"
            className="flex items-center no-underline gap-2"
          >
            Installation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default IntroductionPage;
