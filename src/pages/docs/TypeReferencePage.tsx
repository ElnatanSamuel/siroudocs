import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";

const TypeReferencePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="doc-prose max-w-4xl"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Type Reference
        </h1>
        <p className="text-foreground/80 leading-7">
          All public types exported from <code>@sirou/core</code>.
        </p>
      </div>

      <section className="mb-12">
        <h2 id="route-definition-types" className="text-xl font-semibold mb-4">
          Route Definition Types
        </h2>
        <h3 className="text-lg font-semibold mb-4">
          <code>RouteConfig</code>
        </h3>
        <CodeBlock
          language="typescript"
          code={`type RouteConfig = { [routeName: string]: RouteDefinition };`}
        />

        <h3 className="text-lg font-semibold mt-8 mb-4">
          <code>RouteDefinition&lt;TPath, TParams, TMeta&gt;</code>
        </h3>
        <CodeBlock
          language="typescript"
          code={`type RouteDefinition = {
  path: string;
  params?: RouteParamConfig;
  meta?: RouteMeta;
  guards?: string[]; // guard names (must be registered)
  loader?: (ctx: GuardContext) => Promise<any>;
  children?: RouteConfig;
};`}
        />
      </section>

      <section className="mb-12">
        <h2 id="inference-types" className="text-xl font-semibold mb-4">
          Inference Types
        </h2>
        <h3 className="text-lg font-semibold mb-4">
          <code>InferParams&lt;Config&gt;</code>
        </h3>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          Infers the params object type from a <code>RouteParamConfig</code>.
        </p>
        <CodeBlock
          language="typescript"
          code={`const route = {
  path: "/user/:id",
  params: { id: "string" },
} as const;

type Params = InferParams<typeof route.params>;
// → { id: string }`}
        />
      </section>

      <section className="mb-12">
        <h2 id="navigation-types" className="text-xl font-semibold mb-4">
          Navigation Types
        </h2>
        <h3 className="text-lg font-semibold mb-4">
          <code>RouteInfo</code>
        </h3>
        <CodeBlock
          language="typescript"
          code={`type RouteInfo = {
  name: string;
  path: string;
  params: Record<string, any>;
  query: Record<string, any>;
  meta: RouteMeta;
};`}
        />
      </section>

      <section className="mb-12">
        <h2 id="adapter-interface" className="text-xl font-semibold mb-4">
          Adapter Interface
        </h2>
        <h3 className="text-lg font-semibold mb-4">
          <code>SirouAdapter</code>
        </h3>
        <CodeBlock
          language="typescript"
          code={`interface SirouAdapter {
  navigate(
    url: string,
    options?: NavigationOptions,
    routeName?: string,
    params?: Record<string, any>,
  ): Promise<void>;
  replace(
    url: string,
    options?: NavigationOptions,
    routeName?: string,
    params?: Record<string, any>,
  ): Promise<void>;
  back(): Promise<void>;
  getCurrentLocation(): Location;
  subscribe(listener: LocationListener): Unsubscribe;
  canGoBack(): boolean;
}`}
        />
      </section>
    </motion.div>
  );
};

export default TypeReferencePage;
