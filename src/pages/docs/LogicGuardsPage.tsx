import React from "react";
import CodeBlock from "@/components/CodeBlock";

const LogicGuardsPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Logic Guards</h1>
      <p>
        Logic Guards are asynchronous functions that control access to your routes. They allow you to
        prevent unauthorized entry, perform redirects, or handle complex business logic before a
        navigation is finalized.
      </p>

      <h2 id="guard-anatomy">Guard Anatomy</h2>
      <p>A guard receives a context object and returns a <code>GuardResult</code>.</p>
      <CodeBlock
        language="typescript"
        code={`interface GuardContext {
  route: string;
  params: Record<string, any>;
  query: Record<string, string>;
  meta: any;
  router: SirouRouter;
}

type GuardResult =
  | { allowed: true }
  | { allowed: false; redirect: string | RedirectObject };`}
      />

      <h2 id="implementation">Implementation</h2>
      <p>Register your guards on the router instance.</p>
      <CodeBlock
        language="typescript"
        code={`router.registerGuard({
  name: "auth",
  execute: async ({ meta }) => {
    const user = await checkAuth();

    if (!user && meta.requiresAuth) {
      return {
        allowed: false,
        redirect: "/login",
      };
    }

    return { allowed: true };
  },
});`}
      />

      <h2 id="why-guards">Why use Logic Guards?</h2>

      <h3 id="centralized">Centralized Logic</h3>
      <p>
        Keep your auth and permission logic in one place instead of repeating <code>useEffect</code> checks
        in every component.
      </p>

      <h3 id="platform-agnostic">Platform Agnostic</h3>
      <p>Use the same guard logic on your Svelte web app and your React Native mobile app.</p>

      <h3 id="typed-context">Type Safe Context</h3>
      <p>Guards have access to fully typed parameters and metadata from your route schema.</p>

      <h2 id="multi-guard">Multi-Guard Execution</h2>
      <p>
        You can apply multiple guards to a single route. Sirou executes them in the order defined
        in your schema.
      </p>
      <CodeBlock
        language="typescript"
        code={`export const routes = defineRoutes({
  admin: {
    path: "/admin",
    guards: ["auth", "isAdmin"],
  },
});`}
      />
    </div>
  );
};

export default LogicGuardsPage;
