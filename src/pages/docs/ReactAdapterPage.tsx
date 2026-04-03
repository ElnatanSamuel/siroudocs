import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ReactAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>React Adapter</h1>
    <p>
      The <code>@sirou/react</code> package bridges the core routing engine to
      your React application through a set of hooks, components, and a built-in
      DevTools panel.
    </p>

    <h2 id="installation">Installation</h2>
    <CodeBlock
      language="bash"
      code="npm install @sirou/react react-router-dom"
    />

    <h2 id="setup">Setup</h2>
    <p>
      Wrap your application with <code>SirouRouterProvider</code>. It accepts
      your route schema and exposes the router context to all descendant
      components.
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

    <h2 id="hooks">Hooks</h2>

    <h3 id="use-sirou-router">
      <code>useSirouRouter()</code>
    </h3>
    <p>
      Returns the <code>SirouRouter</code> instance. Provides programmatic
      navigation, URL building, and access to current route state.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { useSirouRouter } from "@sirou/react";

function Navbar() {
  const router = useSirouRouter();

  return (
    <button onClick={() => router.go("dashboard")}>
      Go to Dashboard
    </button>
  );
}`}
    />

    <h3 id="use-route-params">
      <code>useRouteParams(routeName)</code>
    </h3>
    <p>
      Returns fully typed parameters for the given route. TypeScript enforces
      the correct param shape based on your <code>routes.ts</code> schema.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { useRouteParams } from "@sirou/react";

function ProfilePage() {
  const { id } = useRouteParams("userProfile");
  // id is typed as string because routes.ts declares { id: "string" }
  return <h1>User {id}</h1>;
}`}
    />

    <h3 id="use-sirou-params">
      <code>useSirouParams(routeName)</code>
    </h3>
    <p>
      Alias for <code>useRouteParams</code>. Use either name.
    </p>

    <h3 id="use-route-data">
      <code>useRouteData(routes, routeName)</code>
    </h3>
    <p>
      Accesses data resolved by the route's loaders before the transition
      committed.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { useRouteData } from "@sirou/react";
import { routes } from "./routes";

function UserProfile() {
  const { user, posts } = useRouteData(routes, "userProfile");
  return <div>{user.name}</div>;
}`}
    />

    <h2 id="components">Components</h2>

    <h3 id="sirou-guard">
      <code>SirouGuard</code>
    </h3>
    <p>
      Wraps a subtree and renders it only when the current route passes all
      registered guards. Automatically redirects when access is denied.
    </p>
    <CodeBlock
      language="typescript"
      filename="ProtectedRoute.tsx"
      code={`import { SirouGuard } from "@sirou/react";

function ProtectedRoute({ children }) {
  return (
    <SirouGuard fallback={<div>Checking access...</div>}>
      {children}
    </SirouGuard>
  );
}`}
    />

    <h3 id="sirou-link">
      <code>SirouLink</code>
    </h3>
    <p>
      A type-safe anchor component. The <code>to</code> prop only accepts valid
      route names from your schema, and <code>params</code> is validated against
      the route's declared parameters.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { SirouLink } from "@sirou/react";

<SirouLink to="userProfile" params={{ id: "42" }}>
  View Profile
</SirouLink>`}
    />

    <h2 id="guards">Registering Guards</h2>
    <CodeBlock
      language="typescript"
      filename="guards.ts"
      code={`import { useSirouRouter } from "@sirou/react";
import { useEffect } from "react";

function GuardSetup() {
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
  }, []);

  return null;
}`}
    />

    <h2 id="devtools">Sirou Debugger</h2>
    <p>
      Add <code>SirouDevTools</code> to your root component in development. It
      renders an overlay panel showing the current route, active params, query
      string, and navigation history.
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

export default ReactAdapterPage;
