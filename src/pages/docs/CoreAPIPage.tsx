import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";

const CoreAPIPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="doc-prose max-w-4xl"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Core API Reference
        </h1>
        <p className="text-foreground/80 leading-7">
          All exports from <code>@sirou/core</code>.
        </p>
      </div>

      <section className="mb-12">
        <h2 id="defineroutes-config" className="text-xl font-semibold mb-4">
          <code>defineRoutes(config)</code>
        </h2>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          Identity function that returns the config with full TypeScript
          inference. Always wrap your routes with this for type safety.
        </p>
        <CodeBlock
          language="typescript"
          code={`const routes = defineRoutes({
  home: { path: "/" },
});`}
        />
      </section>

      <section className="mb-12">
        <h2
          id="createrouter-config-adapter"
          className="text-xl font-semibold mb-4"
        >
          <code>createRouter(config, adapter)</code>
        </h2>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          Creates a <code>SirouRouterCore</code> instance. Useful for
          headless/custom setups.
        </p>
        <CodeBlock
          language="typescript"
          code={`const router = createRouter(routes, myAdapter);`}
        />
      </section>

      <section className="mb-12">
        <h2 id="sirouroutercore-tconfig" className="text-xl font-semibold mb-4">
          <code>SirouRouterCore&lt;TConfig&gt;</code>
        </h2>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          The core routing engine. Implements{" "}
          <code>SirouRouter&lt;TConfig&gt;</code>.
        </p>
        <h3 className="text-lg font-semibold mb-4">Methods</h3>
        <div className="p-1 rounded-[6px] border bg-card overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left py-2 px-4 font-semibold">Method</th>
                <th className="text-left py-2 px-4 font-semibold">Signature</th>
                <th className="text-left py-2 px-4 font-semibold">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-accent">go</td>
                <td className="py-2 px-4 font-mono">
                  (routeName, params?) Promise&lt;void&gt;
                </td>
                <td className="py-2 px-4">Navigate to a route</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-accent">replace</td>
                <td className="py-2 px-4 font-mono">
                  (routeName, params?) Promise&lt;void&gt;
                </td>
                <td className="py-2 px-4">Replace current history entry</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-accent">back</td>
                <td className="py-2 px-4 font-mono">() Promise&lt;void&gt;</td>
                <td className="py-2 px-4">Go back</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4 font-mono text-accent">build</td>
                <td className="py-2 px-4 font-mono">
                  (routeName, params?) string
                </td>
                <td className="py-2 px-4">Build URL without navigating</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono text-accent text-[10px]">
                  subscribe
                </td>
                <td className="py-2 px-4 font-mono">(listener) Unsubscribe</td>
                <td className="py-2 px-4">Subscribe to location changes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="routetrie" className="text-xl font-semibold mb-4">
          <code>RouteTrie</code>
        </h2>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          High performance Radix Trie for O(log n) route matching.
        </p>
        <CodeBlock
          language="typescript"
          code={`const trie = new RouteTrie();
trie.insert("home", routeDef, "/");
const match = trie.match("/user/123");
// { route, name, params }`}
        />
      </section>

      <section className="mb-12">
        <h2 id="urlbuilder" className="text-xl font-semibold mb-4">
          <code>URLBuilder</code>
        </h2>
        <CodeBlock
          language="typescript"
          code={`const builder = new URLBuilder();
builder.build(route, { id: "123" }); // → "/user/123"`}
        />
      </section>
    </motion.div>
  );
};

export default CoreAPIPage;
