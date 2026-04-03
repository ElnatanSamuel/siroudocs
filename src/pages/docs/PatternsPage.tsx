import React from "react";
import CodeBlock from "@/components/CodeBlock";

const PatternsPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Advanced Patterns</h1>
    <p>
      Practical patterns for production applications. These go beyond the basics
      and cover common architectural challenges that every large-scale app
      faces.
    </p>

    <h2 id="analytics">1. Analytics and Page Tracking</h2>
    <p>
      Subscribe to the router to send page view events on every committed
      navigation. This approach is more reliable than component-level effects
      because it fires after guards and loaders complete, so you only track
      pages users actually see.
    </p>
    <CodeBlock
      language="typescript"
      code={`router.subscribe(({ route, params, meta }) => {
  analytics.track("page_view", {
    page_name: route,
    title: meta.title,
    ...params,
  });
});`}
    />

    <h2 id="breadcrumbs">2. Dynamic Breadcrumbs</h2>
    <p>
      Sirou uses dotted-key notation for nested route names. You can generate
      breadcrumbs automatically by splitting on the dot.
    </p>
    <CodeBlock
      language="typescript"
      filename="Breadcrumbs.tsx"
      code={`import { useSirouRouter } from "@sirou/react";

function Breadcrumbs() {
  const router = useSirouRouter();
  const current = router.current?.name ?? "";
  const parts = current.split(".");

  return (
    <nav>
      {parts.map((part, i) => {
        const routeName = parts.slice(0, i + 1).join(".");
        return (
          <span key={part} onClick={() => router.go(routeName as any)}>
            {part}
          </span>
        );
      })}
    </nav>
  );
}`}
    />

    <h2 id="persistent-query">3. Persistent Query Parameters</h2>
    <p>
      Use a guard to carry specific query parameters like <code>affiliate</code>{" "}
      or
      <code>utm_source</code> across every navigation automatically.
    </p>
    <CodeBlock
      language="typescript"
      code={`router.registerGuard({
  name: "persist-query",
  execute: async ({ query }) => {
    if (query.ref) {
      sessionStorage.setItem("ref", query.ref);
    }
    return { allowed: true };
  },
});`}
    />

    <h2 id="multi-tenant">4. Multi-Tenant Routing</h2>
    <p>
      Model tenant-scoped routes with a leading <code>:tenantId</code>{" "}
      parameter. All type safety and guard logic applies equally.
    </p>
    <CodeBlock
      language="typescript"
      code={`export const routes = defineRoutes({
  tenantDashboard: {
    path: "/:tenantId/dashboard",
    params: { tenantId: "string" },
    guards: ["auth", "tenantAccess"],
    meta: { requiresAuth: true },
  },
  tenantSettings: {
    path: "/:tenantId/settings",
    params: { tenantId: "string" },
    guards: ["auth", "tenantAdmin"],
    meta: { requiresAuth: true },
  },
});`}
    />

    <h2 id="prefetching">5. Prefetching on Hover</h2>
    <p>
      Call loaders ahead of time when a user hovers over a link. By the time
      they click, data is already cached.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { useSirouRouter } from "@sirou/react";

function DashboardLink() {
  const router = useSirouRouter();

  return (
    <a
      href="/dashboard"
      onMouseEnter={() => router.preload("dashboard")}
      onClick={(e) => { e.preventDefault(); router.go("dashboard"); }}
    >
      Dashboard
    </a>
  );
}`}
    />

    <h2 id="route-based-themes">6. Route-Based Theming</h2>
    <p>
      Use route metadata to apply different themes or layouts to sections of
      your app without conditional logic inside components.
    </p>
    <CodeBlock
      language="typescript"
      filename="routes.ts"
      code={`export const routes = defineRoutes({
  marketing: {
    path: "/",
    meta: { theme: "light", layout: "landing" },
  },
  app: {
    path: "/app",
    meta: { theme: "dark", layout: "dashboard" },
    guards: ["auth"],
  },
});`}
    />
    <CodeBlock
      language="typescript"
      filename="Layout.tsx"
      code={`import { useSirouRouter } from "@sirou/react";

function Layout({ children }) {
  const router = useSirouRouter();
  const theme = router.current?.meta?.theme ?? "light";

  return (
    <div data-theme={theme}>
      {children}
    </div>
  );
}`}
    />

    <h2 id="guard-bypass">7. Development Guard Bypass</h2>
    <p>
      During local development you may want to bypass all guards. Wrap guard
      registration in an environment check.
    </p>
    <CodeBlock
      language="typescript"
      code={`if (import.meta.env.PROD) {
  router.registerGuard(authGuard);
  router.registerGuard(adminGuard);
}`}
    />

    <h2 id="test-guards">8. Testing Guards in Isolation</h2>
    <p>
      Guards are plain async functions. Test them directly without mounting any
      UI.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { describe, it, expect } from "vitest";
import { authGuard } from "./guards";

describe("authGuard", () => {
  it("allows access when token exists", async () => {
    localStorage.setItem("token", "valid");
    const result = await authGuard.execute({
      route: "dashboard",
      params: {},
      query: {},
      meta: { requiresAuth: true },
    });
    expect(result.allowed).toBe(true);
  });

  it("blocks and redirects when no token", async () => {
    localStorage.removeItem("token");
    const result = await authGuard.execute({
      route: "dashboard",
      params: {},
      query: {},
      meta: { requiresAuth: true },
    });
    expect(result.allowed).toBe(false);
    expect((result as any).redirect).toBe("/login");
  });
});`}
    />
  </div>
);

export default PatternsPage;
