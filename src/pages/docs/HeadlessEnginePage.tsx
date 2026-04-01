import React from "react";
import CodeBlock from "@/components/CodeBlock";

const HeadlessEnginePage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Headless Engine</h1>
      <p>
        Sirou's core engine is 100% "Headless"—meaning it is a pure logic layer
        with no dependencies on a DOM, a framework, or even a browser
        environment.
      </p>

      <h2 id="logic-first">Logic First Architecture</h2>
      <p>
        The <code>@sirou/core</code> package provides the "Brain" of your
        routing system. Adapters for React, Svelte, or React Native are merely
        thin wrappers that bind the engine's state to UI components.
      </p>

      <h2 id="benefits">Benefits of Headless Routing</h2>

      <h3 id="cross-platform">Cross Platform</h3>
      <p>
        Use the exact same <code>routes.ts</code> file in your Web Dashboard and
        your Expo Mobile App.
      </p>

      <h3 id="testable">Testable</h3>
      <p>
        Match routes, run guards, and verify redirects in Node.js or Vitest
        without needing to mount a UI.
      </p>

      <h3 id="framework-agnostic">Framework Agnostic</h3>
      <p>
        Migrating from React to Svelte? Keep 100% of your routing logic and
        navigation flow.
      </p>

      <h2 id="no-ui-usage">Example: No UI Usage</h2>
      <p>
        You can use Sirou to match paths or build URLs even in a CLI or a
        background worker.
      </p>
      <CodeBlock
        language="typescript"
        filename="matcher.ts"
        code={`import { createMatcher } from "@sirou/core";
import { routes } from "./routes";

const matcher = createMatcher(routes);
const match = matcher.match("/user/42");

if (match) {
  console.log("Matched Route:", match.name); // "profile"
  console.log("Parsed ID:", match.params.id); // "42"
}`}
      />
    </div>
  );
};

export default HeadlessEnginePage;
