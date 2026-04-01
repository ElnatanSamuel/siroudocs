import React from "react";
import CodeBlock from "@/components/CodeBlock";

const InstallationPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Getting Started
    </p>
    <h1>Installation</h1>
    <p>
      Install Sirou via npm. Sirou is modular, so you only install the core
      engine and the specific adapter for your framework.
    </p>

    <h2 id="core-engine">1. Install Core Engine</h2>
    <p>
      The core engine handles the Radix Trie matching, state management, and
      type inference.
    </p>
    <CodeBlock
      language="bash"
      filename="terminal"
      code="npm install @sirou/core"
    />

    <h2 id="platform-adapter">2. Install Platform Adapter</h2>
    <p>Choose the adapter that matches your frontend framework.</p>

    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Platform</th>
            <th className="text-left py-2 font-semibold">Package</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>React</strong>
            </td>
            <td className="py-2">
              <code>@sirou/react</code>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Next.js</strong>
            </td>
            <td className="py-2">
              <code>@sirou/nextjs</code>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>React Native</strong>
            </td>
            <td className="py-2">
              <code>@sirou/react-native</code>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Svelte</strong>
            </td>
            <td className="py-2">
              <code>@sirou/svelte</code>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CodeBlock
      language="bash"
      filename="terminal"
      code="# Example: Installing the React adapter\nnpm install @sirou/react"
    />

    <h2 id="peer-deps">Peer Dependencies</h2>
    <p>Ensure your project meets the following peer dependency requirements:</p>
    <ul>
      <li>
        <strong>React / Next.js</strong>: React 18+ and React Router 6+ (for
        React adapter).
      </li>
      <li>
        <strong>Svelte</strong>: Svelte 4+ or SvelteKit 2+.
      </li>
      <li>
        <strong>React Native</strong>: React Native 0.70+ and React Navigation
        6+.
      </li>
    </ul>

    <h2 id="typescript-config">TypeScript Configuration</h2>
    <p>
      Sirou relies heavily on advanced TypeScript features. Ensure your{" "}
      <code>tsconfig.json</code> is configured for the best experience:
    </p>
    <CodeBlock
      language="json"
      filename="tsconfig.json"
      code={`{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "node",
    "target": "ESNext"
  }
}`}
    />
  </div>
);

export default InstallationPage;
