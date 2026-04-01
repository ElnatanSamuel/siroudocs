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
      The Sirou React adapter provides a collection of hooks and components to
      bind the core routing engine to your React application.
    </p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/react" />

    <h2 id="core-components">Core Components</h2>

    <h3 id="sirou-provider">SirouProvider</h3>
    <p>Wraps your application and provides the router context.</p>
    <CodeBlock
      language="typescript"
      filename="Root.tsx"
      code={`import { SirouProvider, createBrowserRouter } from "@sirou/react";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

function Root() {
  return (
    <SirouProvider router={router}>
      <App />
    </SirouProvider>
  );
}`}
    />

    <h3 id="sirou-link">SirouLink</h3>
    <p>
      A type safe link component that ensures you never point to a non existent
      route.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { SirouLink } from "@sirou/react";

<SirouLink to="profile" params={{ id: "42" }}>
  View Profile
</SirouLink>;`}
    />

    <h2 id="typed-hooks">Typed Hooks</h2>

    <h3 id="use-sirou-router">
      <code>useSirouRouter()</code>
    </h3>
    <p>
      Access the router instance for programmatic navigation:{" "}
      <code>router.go('home')</code>.
    </p>

    <h3 id="use-route-params">
      <code>useRouteParams(routeName)</code>
    </h3>
    <p>Get fully typed parameters for a specific route.</p>

    <h3 id="use-route-data">
      <code>useRouteData(routeName)</code>
    </h3>
    <p>Access data fetched by the route's loaders.</p>
  </div>
);

export default ReactAdapterPage;
