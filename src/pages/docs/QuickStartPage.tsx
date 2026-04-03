import React from "react";
import CodeBlock from "@/components/CodeBlock";

const QuickStartPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Getting Started
    </p>
    <h1>Quick Start</h1>
    <p>Get your first type-safe route running in under 5 minutes.</p>

    <h2 id="install">Step 1: Install</h2>
    <CodeBlock
      language="bash"
      code={`npm install @sirou/core @sirou/react react-router-dom`}
    />

    <h2 id="define-routes">Step 2: Define Your Routes</h2>
    <p>
      Create a <code>routes.ts</code> file at the root of your project. This
      file is your single source of truth and is shared across all platforms.
    </p>
    <CodeBlock
      language="typescript"
      filename="routes.ts"
      code={`import { defineRoutes } from "@sirou/core";

export const routes = defineRoutes({
  home: {
    path: "/",
    meta: { title: "Home", public: true },
  },
  userProfile: {
    path: "/user/:id",
    params: { id: "string" },
    guards: ["auth"],
    meta: { title: "Profile", requiresAuth: true },
  },
  settings: {
    path: "/settings",
    guards: ["auth"],
    meta: { title: "Settings", requiresAuth: true },
  },
  login: {
    path: "/login",
    meta: { title: "Login", public: true },
  },
});`}
    />

    <h2 id="initialize-router">Step 3: Initialize the Provider</h2>
    <p>
      Wrap your app with <code>SirouRouterProvider</code>. It creates the router
      context used by all hooks and components lower in the tree.
    </p>
    <CodeBlock
      language="typescript"
      filename="main.tsx"
      code={`import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SirouRouterProvider } from "@sirou/react";
import { routes } from "./routes";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SirouRouterProvider routes={routes}>
      <App />
    </SirouRouterProvider>
  </BrowserRouter>
);`}
    />

    <h2 id="register-guard">Step 4: Register a Guard</h2>
    <p>
      Guards intercept navigations before they commit. Register them at startup
      and reference their names in your route schema.
    </p>
    <CodeBlock
      language="typescript"
      filename="GuardSetup.tsx"
      code={`import { useEffect } from "react";
import { useSirouRouter } from "@sirou/react";

export function GuardSetup() {
  const router = useSirouRouter();

  useEffect(() => {
    router.registerGuard({
      name: "auth",
      execute: async ({ meta }) => {
        const token = localStorage.getItem("token");
        if (!token && meta.requiresAuth) {
          return { allowed: false, redirect: "/login" };
        }
        return { allowed: true };
      },
    });
  }, [router]);

  return null;
}`}
    />

    <h2 id="navigate">Step 5: Navigate</h2>
    <p>
      Use the <code>useSirouRouter</code> hook for programmatic navigation, or
      use <code>SirouLink</code> for declarative links. Both are fully
      type-safe.
    </p>
    <CodeBlock
      language="typescript"
      filename="Navbar.tsx"
      code={`import { useSirouRouter, SirouLink } from "@sirou/react";

function Navbar() {
  const router = useSirouRouter();

  return (
    <nav>
      <SirouLink to="home">Home</SirouLink>
      <SirouLink to="userProfile" params={{ id: "42" }}>
        My Profile
      </SirouLink>
      <button onClick={() => router.go("settings")}>
        Settings
      </button>
    </nav>
  );
}`}
    />

    <h2 id="access-params">Step 6: Access Params</h2>
    <p>
      Inside any component rendered within a matched route, access the current
      params with <code>useRouteParams</code>. The return type is inferred from
      your schema.
    </p>
    <CodeBlock
      language="typescript"
      filename="UserProfile.tsx"
      code={`import { useRouteParams } from "@sirou/react";

function UserProfile() {
  // id is typed as string from your routes.ts definition
  const { id } = useRouteParams("userProfile");

  return <h1>Viewing user {id}</h1>;
}`}
    />

    <h2 id="devtools">Development: Sirou Debugger</h2>
    <p>
      Add the <code>SirouDevTools</code> component in development. It overlays a
      panel with the current route, params, query, metadata, and history.
    </p>
    <CodeBlock
      language="typescript"
      filename="App.tsx"
      code={`import { SirouDevTools } from "@sirou/react";

export default function App() {
  return (
    <>
      <Router />
      {import.meta.env.DEV && <SirouDevTools />}
    </>
  );
}`}
    />
  </div>
);

export default QuickStartPage;
