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
    <p>Get your first type safe route running in less than 5 minutes.</p>

    <h2 id="define-routes">1. Define Your Routes</h2>
    <p>
      Create a <code>routes.ts</code> file to serve as your single source of
      truth.
    </p>
    <CodeBlock
      language="typescript"
      filename="routes.ts"
      code={`import { defineRoutes } from "@sirou/core";

export const routes = defineRoutes({
  home: { path: "/" },
  user: {
    path: "/user/:id",
    params: { id: "string" },
  },
});`}
    />

    <h2 id="initialize-router">2. Initialize the Router</h2>
    <p>
      In your main entry file, create the router instance and provide it to your
      app.
    </p>
    <CodeBlock
      language="typescript"
      filename="App.tsx"
      code={`import { SirouProvider, createBrowserRouter } from "@sirou/react";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

export function App() {
  return (
    <SirouProvider router={router}>
      <YourAppContents />
    </SirouProvider>
  );
}`}
    />

    <h2 id="navigate">3. Navigate with Type Safety</h2>
    <p>
      Forget string based paths. Use the route name and a typed params object.
    </p>
    <CodeBlock
      language="typescript"
      filename="Nav.tsx"
      code={`import { useSirouRouter } from "@sirou/react";

function Nav() {
  const router = useSirouRouter();

  return (
    <button onClick={() => router.go("user", { id: "123" })}>
      View Profile
    </button>
  );
}`}
    />
  </div>
);

export default QuickStartPage;
