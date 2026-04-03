import React from "react";
import CodeBlock from "@/components/CodeBlock";

const LogicGuardsPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Logic Guards</h1>
      <p>
        Guards are async functions that intercept every navigation before it
        commits. They are the correct place for auth checks, role enforcement,
        feature flags, and any logic that determines whether a user can access a
        route.
      </p>

      <h2 id="guard-anatomy">Guard Interface</h2>
      <p>
        Every guard implements the <code>RouteGuard</code> interface from{" "}
        <code>@sirou/core</code>.
      </p>
      <CodeBlock
        language="typescript"
        code={`import type { RouteGuard } from "@sirou/core";

const authGuard: RouteGuard = {
  name: "auth",
  execute: async (context) => {
    // return { allowed: true } to let the navigation proceed
    // return { allowed: false, redirect: "/login" } to block and redirect
  },
};`}
      />

      <h2 id="context">Guard Context</h2>
      <p>
        The <code>execute</code> function receives a typed context object on
        every invocation.
      </p>
      <CodeBlock
        language="typescript"
        code={`interface GuardContext {
  route: string;              // the target route name
  params: Record<string, any>; // typed route params
  query: Record<string, string>; // query string key/value pairs
  meta: Record<string, any>;  // metadata from your route schema
  context?: any;              // adapter-specific extras (e.g. NextRequest)
}`}
      />

      <h2 id="implementation">Full Implementation Example</h2>
      <CodeBlock
        language="typescript"
        filename="guards.ts"
        code={`import type { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta }) => {
    const token = localStorage.getItem("token");

    if (!token && meta.requiresAuth) {
      return {
        allowed: false,
        redirect: "/login",
      };
    }

    return { allowed: true };
  },
};

export const adminGuard: RouteGuard = {
  name: "isAdmin",
  execute: async ({ meta }) => {
    const role = localStorage.getItem("role");

    if (meta.adminOnly && role !== "admin") {
      return {
        allowed: false,
        redirect: "/403",
      };
    }

    return { allowed: true };
  },
};`}
      />

      <h2 id="register">Registering Guards</h2>
      <p>
        Call <code>router.registerGuard</code> before any navigation occurs. The
        best place is at application startup, before the router mounts.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { authGuard, adminGuard } from "./guards";

router.registerGuard(authGuard);
router.registerGuard(adminGuard);`}
      />

      <h2 id="attaching">Attaching Guards to Routes</h2>
      <p>
        Reference guard names in your route schema. Sirou runs them in the order
        listed.
      </p>
      <CodeBlock
        language="typescript"
        filename="routes.ts"
        code={`export const routes = defineRoutes({
  home: {
    path: "/",
    meta: { public: true },
  },
  dashboard: {
    path: "/dashboard",
    guards: ["auth"],
    meta: { requiresAuth: true, title: "Dashboard" },
  },
  admin: {
    path: "/admin",
    guards: ["auth", "isAdmin"],
    meta: { requiresAuth: true, adminOnly: true },
  },
});`}
      />

      <h2 id="multi-guard">Multi-Guard Execution Order</h2>
      <p>
        Guards run sequentially in the order they appear in the{" "}
        <code>guards</code> array. The first guard to return{" "}
        <code>allowed: false</code> stops the chain. Subsequent guards are not
        called.
      </p>

      <h2 id="async">Async Guards</h2>
      <p>
        Guards can perform any async operation including network requests,
        database queries, or token verification. Sirou awaits the result before
        proceeding.
      </p>
      <CodeBlock
        language="typescript"
        code={`const sessionGuard: RouteGuard = {
  name: "session",
  execute: async ({ meta }) => {
    // Verify token with a real API call
    const res = await fetch("/api/auth/verify", {
      headers: { Authorization: \`Bearer \${getToken()}\` },
    });

    if (!res.ok && meta.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }

    return { allowed: true };
  },
};`}
      />

      <h2 id="redirect-object">Structured Redirects</h2>
      <p>
        Instead of a plain string path, you can return a redirect object with
        additional state or query parameters.
      </p>
      <CodeBlock
        language="typescript"
        code={`return {
  allowed: false,
  redirect: {
    path: "/login",
    query: { returnTo: context.route },
    state: { reason: "session_expired" },
  },
};`}
      />

      <h2 id="silent">Silent Navigation</h2>
      <p>
        Pass <code>silent: true</code> to <code>router.go</code> to skip guard
        execution entirely. This is useful for internal redirects triggered by
        guards themselves to prevent recursive loops.
      </p>
      <CodeBlock
        language="typescript"
        code={`// bypass guards for this navigation
router.go("login", {}, { silent: true });`}
      />
    </div>
  );
};

export default LogicGuardsPage;
