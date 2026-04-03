import React from "react";
import CodeBlock from "@/components/CodeBlock";

const NextjsAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>Next.js Adapter</h1>
    <p>
      <code>@sirou/next</code> provides full support for the Next.js App Router,
      Server Components, Edge Middleware, and Server Actions. Your centralized
      route schema works identically on client, server, and edge runtimes.
    </p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/next" />

    <h2 id="client-setup">Client Setup (App Router)</h2>
    <p>
      In a client component, use <code>SirouRouterProvider</code> from
      <code>@sirou/next</code> to bind the router to Next.js's navigation APIs.
    </p>
    <CodeBlock
      language="typescript"
      filename="app/layout.tsx"
      code={`"use client";
import { SirouRouterProvider } from "@sirou/next";
import { routes } from "@/lib/routes";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SirouRouterProvider routes={routes}>
          {children}
        </SirouRouterProvider>
      </body>
    </html>
  );
}`}
    />

    <h2 id="hooks-client">Client Hooks</h2>
    <p>
      All hooks from <code>@sirou/react</code> work inside the Next.js provider,
      including
      <code>useSirouRouter</code>, <code>useRouteParams</code>, and{" "}
      <code>useSirouParams</code>.
    </p>
    <CodeBlock
      language="typescript"
      filename="components/Navbar.tsx"
      code={`"use client";
import { useSirouRouter } from "@sirou/next";

export function Navbar() {
  const router = useSirouRouter();
  return <button onClick={() => router.go("home")}>Home</button>;
}`}
    />

    <h2 id="server-utilities">Server Utilities</h2>
    <p>
      Import from <code>@sirou/next/server</code> in Server Components and API
      routes. These are pure functions with no React dependency.
    </p>

    <h3 id="build-url">buildUrl</h3>
    <p>
      Type-safe URL construction usable in server actions, API handlers, or
      static generation helpers.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { buildUrl } from "@sirou/next/server";
import { routes } from "@/lib/routes";

const url = buildUrl(routes, "userProfile", { id: "42" });
// "/user/42"`}
    />

    <h3 id="sirou-middleware">createSirouMiddleware</h3>
    <p>
      Run Sirou guards at the edge before the request reaches your server.
      Supports auth, feature flags, geo-blocking, and any other guard logic.
    </p>
    <CodeBlock
      language="typescript"
      filename="middleware.ts"
      code={`import { createSirouMiddleware } from "@sirou/next/server";
import { routes } from "./lib/routes";
import { authGuard } from "./lib/guards";

export const middleware = createSirouMiddleware(routes, [authGuard]);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};`}
    />

    <h2 id="guard-middleware">Guard in Middleware</h2>
    <p>
      Guards passed to <code>createSirouMiddleware</code> receive the same
      context shape as client-side guards, with an additional{" "}
      <code>context.request</code> field pointing to the{" "}
      <code>NextRequest</code>.
    </p>
    <CodeBlock
      language="typescript"
      filename="lib/guards.ts"
      code={`import type { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta, context }) => {
    const token = context.request.cookies.get("token")?.value;
    if (!token && meta.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};`}
    />

    <h2 id="server-component">Server Component Route Access</h2>
    <p>
      Use <code>buildUrl</code> to construct links in React Server Components
      without hydrating a router on the client.
    </p>
    <CodeBlock
      language="typescript"
      filename="app/user/[id]/page.tsx"
      code={`import { buildUrl } from "@sirou/next/server";
import { routes } from "@/lib/routes";

export default function UserPage({ params }) {
  const settingsUrl = buildUrl(routes, "settings");

  return (
    <div>
      <h1>User {params.id}</h1>
      <a href={settingsUrl}>Settings</a>
    </div>
  );
}`}
    />

    <h2 id="pages-router">Pages Router Support</h2>
    <p>
      For the legacy Pages Router, use <code>useSirouRouter</code> inside a
      <code>_app.tsx</code> provider setup. The adapter internally wraps
      <code>next/router</code> when the App Router is not detected.
    </p>
    <CodeBlock
      language="typescript"
      filename="pages/_app.tsx"
      code={`import { SirouRouterProvider } from "@sirou/next";
import { routes } from "../lib/routes";

export default function MyApp({ Component, pageProps }) {
  return (
    <SirouRouterProvider routes={routes}>
      <Component {...pageProps} />
    </SirouRouterProvider>
  );
}`}
    />
  </div>
);

export default NextjsAdapterPage;
