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
      Once you've mastered the basics, you can use Sirou to solve complex
      architectural challenges in large scale applications.
    </p>

    <h2 id="analytics">1. Analytics & Tracking</h2>
    <p>
      Use a global router subscription to track page views and navigation
      events.
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
    <p>Generate breadcrumbs dynamically from the current route name.</p>
    <CodeBlock
      language="typescript"
      filename="Breadcrumbs.tsx"
      code={`function Breadcrumbs() {
  const currentRoute = useCurrentRouteName();
  const parts = currentRoute.split(".");

  return (
    <nav>
      {parts.map((part, i) => (
        <SirouLink key={part} to={parts.slice(0, i + 1).join(".")}>
          {part}
        </SirouLink>
      ))}
    </nav>
  );
}`}
    />

    <h2 id="persistent-query">3. Persistent Query Parameters</h2>
    <p>Use a global guard to persist query parameters across navigations.</p>
    <CodeBlock
      language="typescript"
      code={`router.registerGuard({
  name: "persist-query",
  execute: async ({ query, router }) => {
    if (query.affiliate && !router.nextQuery.affiliate) {
      return {
        allowed: true,
        query: { ...router.nextQuery, affiliate: query.affiliate },
      };
    }
    return { allowed: true };
  },
});`}
    />

    <h2 id="multi-tenant">4. Multi-Tenant Routing</h2>
    <p>Support multiple subdomains or tenants with schema-based routing.</p>
    <CodeBlock
      language="typescript"
      code={`const routes = defineRoutes({
  tenantHome: {
    path: "/:tenantId/home",
    params: { tenantId: "string" },
  },
});`}
    />

    <h2 id="prefetching">5. Pre-fetching for Speed</h2>
    <p>Execute loaders for a page before the user clicks a link.</p>
    <CodeBlock
      language="typescript"
      code={`<SirouLink to="dashboard" onMouseEnter={() => router.preload("dashboard")}>
  Dashboard
</SirouLink>`}
    />
  </div>
);

export default PatternsPage;
