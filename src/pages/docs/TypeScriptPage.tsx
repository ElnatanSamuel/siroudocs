import React from "react";
import CodeBlock from "@/components/CodeBlock";

const TypeScriptPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>TypeScript Mastery</h1>
    <p>
      Sirou leverages advanced TypeScript features like{" "}
      <strong>Template Literal Types</strong>,{" "}
      <strong>Recursive Conditional Types</strong>, and{" "}
      <strong>Mapped Types</strong> to provide zero cost type safety.
    </p>

    <h2 id="inferring-params">1. Inferring Parameters</h2>
    <p>
      Use Sirou's internal types to extract param requirements from your schema.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { InferParams } from "@sirou/core";
import { type AppRoutes } from "./routes";

// Extract params for a specific route
type DetailsParams = InferParams<AppRoutes, "products.details">;
// Result: { productId: string }`}
    />

    <h2 id="route-maps">2. Generating Full Route Maps</h2>
    <p>Get a flat list of every possible route string in your app:</p>
    <CodeBlock
      language="typescript"
      code={`import { FlatRouteMap } from "@sirou/core";

export type AllPaths = keyof FlatRouteMap<AppRoutes>;
// Result: "home" | "products.list" | "products.details" | ...`}
    />

    <h2 id="strict-meta">3. Strict Meta Types</h2>
    <p>
      Enforce a specific structure for your <code>meta</code> objects by passing
      a Generic to <code>defineRoutes</code>.
    </p>
    <CodeBlock
      language="typescript"
      code={`interface MyMeta {
  title: string;
  requiresAuth?: boolean;
}

export const routes = defineRoutes<MyMeta>({
  home: {
    path: "/",
    meta: { title: "Home" }, // Valid
    // meta: { foo: "bar" } // Error!
  },
});`}
    />

    <h2 id="type-safe-redirects">4. Type Safe Redirects</h2>
    <p>
      When returning a redirect from a guard, Sirou ensures the target route and
      its params are valid.
    </p>
    <CodeBlock
      language="typescript"
      code={`execute: async () => {
  return {
    allowed: false,
    redirect: { name: "login", params: {} }, // Type checked!
  };
};`}
    />
  </div>
);

export default TypeScriptPage;
