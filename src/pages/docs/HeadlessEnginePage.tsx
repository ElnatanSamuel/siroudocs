import React from "react";
import CodeBlock from "@/components/CodeBlock";

const HeadlessEnginePage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Headless Engine</h1>
      <p>
        The <code>@sirou/core</code> package is a pure TypeScript logic layer.
        It has no dependency on the DOM, any UI framework, or any browser API.
        It works identically in a Node.js server, an edge runtime, a React
        Native Hermes VM, and a browser.
      </p>

      <h2 id="architecture">Architecture</h2>
      <p>
        The engine exposes three primary subsystems that framework adapters
        compose together.
      </p>

      <h3 id="trie-matcher">Trie Matcher</h3>
      <p>
        Route matching is powered by a Radix Trie, the same data structure used
        by production routers like Express and Fastify. It supports static
        segments, named parameters, and wildcard segments with O(log n) lookup
        time.
      </p>
      <CodeBlock
        language="typescript"
        filename="matcher.ts"
        code={`import { createMatcher } from "@sirou/core";
import { routes } from "./routes";

const matcher = createMatcher(routes);

const match = matcher.match("/user/42");
// { name: "userProfile", params: { id: "42" }, meta: { ... } }

const miss = matcher.match("/not-a-route");
// null`}
      />

      <h3 id="guard-engine">Guard Engine</h3>
      <p>
        Guards are plain async functions registered by name on the router. The
        engine resolves each guard sequentially and short-circuits on the first
        denial.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { SirouRouterCore } from "@sirou/core";

const router = new SirouRouterCore(routes, adapter);

router.registerGuard({
  name: "auth",
  execute: async ({ meta }) => {
    const token = localStorage.getItem("token");
    if (!token && meta.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
});`}
      />

      <h3 id="url-builder">URL Builder</h3>
      <p>
        The engine provides a type-safe URL construction utility. It enforces
        that required params are passed and that they match the declared types
        in your schema.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { buildUrl } from "@sirou/core";
import { routes } from "./routes";

const url = buildUrl(routes, "userProfile", { id: "99" });
// "/user/99"

// TypeScript error: id is required
const bad = buildUrl(routes, "userProfile");`}
      />

      <h2 id="no-ui-usage">Using the Engine Without a UI</h2>
      <p>
        You can use <code>@sirou/core</code> directly in any backend context,
        CLI tool, or test environment.
      </p>
      <CodeBlock
        language="typescript"
        filename="scripts/validate-links.ts"
        code={`import { createMatcher } from "@sirou/core";
import { routes } from "../src/routes";

const matcher = createMatcher(routes);

const links = ["/", "/user/1", "/settings", "/unknown"];

for (const link of links) {
  const match = matcher.match(link);
  console.log(link, match ? "OK" : "BROKEN");
}`}
      />

      <h2 id="testing">Testing Without a Browser</h2>
      <p>
        Guards, loaders, and URL matching can all be unit tested with Vitest or
        Jest in a Node environment. No JSDOM or browser context required.
      </p>
      <CodeBlock
        language="typescript"
        filename="router.test.ts"
        code={`import { describe, it, expect } from "vitest";
import { createMatcher, buildUrl } from "@sirou/core";
import { routes } from "./routes";

describe("Sirou Core", () => {
  const matcher = createMatcher(routes);

  it("matches the user profile route", () => {
    const match = matcher.match("/user/99");
    expect(match?.name).toBe("userProfile");
    expect(match?.params.id).toBe("99");
  });

  it("builds a typed URL", () => {
    expect(buildUrl(routes, "userProfile", { id: "5" })).toBe("/user/5");
  });
});`}
      />

      <h2 id="custom-adapter">Writing a Custom Adapter</h2>
      <p>
        If you target a platform not yet covered by an official adapter, you can
        write your own. An adapter is just an object that satisfies the{" "}
        <code>SirouAdapter</code>
        interface.
      </p>
      <CodeBlock
        language="typescript"
        code={`import type { SirouAdapter } from "@sirou/core";

const myAdapter: SirouAdapter = {
  getCurrentPath: () => window.location.pathname,
  goUrl: (url, replace, state, silent) => {
    if (silent) return;
    if (replace) window.history.replaceState(state, "", url);
    else window.history.pushState(state, "", url);
  },
  listen: (callback) => {
    window.addEventListener("popstate", callback);
    return () => window.removeEventListener("popstate", callback);
  },
};`}
      />
    </div>
  );
};

export default HeadlessEnginePage;
