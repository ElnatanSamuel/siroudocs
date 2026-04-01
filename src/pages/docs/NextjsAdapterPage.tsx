import React from "react";
import CodeBlock from "@/components/CodeBlock";

const NextjsAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Adapters</p>
    <h1>Next.js Adapter</h1>
    <p>Seamlessly bridge Sirou's centralized routing with Next.js App Router and Server Components.</p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/nextjs" />

    <h2 id="features">Features</h2>

    <h3 id="server-actions">Server Actions</h3>
    <p>Use <code>sirouRedirect</code> inside your Server Actions for type-safe, validated redirects.</p>

    <h3 id="edge-middleware">Edge Middleware</h3>
    <p>Run Sirou guards directly at the edge to handle authentication and feature flags before the request hits your server.</p>

    <h3 id="shared-logic">Shared Logic</h3>
    <p>Share 100% of your routing schema between your Next.js web app and your React Native mobile app.</p>

    <h2 id="server-component">Server Component Usage</h2>
    <p>Access route information directly on the server without any client hydration.</p>
    <CodeBlock language="typescript" filename="app/user/[id]/page.tsx" code={`import { getSirouMatch } from '@sirou/nextjs/server';
import { routes } from '@/lib/routes';

export default async function Page({ params }) {
  const match = getSirouMatch(routes, '/user/' + params.id);

  return (
    <div>
      <h1>{match.meta.title}</h1>
      <p>Param ID: {match.params.id}</p>
    </div>
  );
}`} />

    <h2 id="guards-middleware">Using Guards in Middleware</h2>
    <p>Protect your Next.js routes using the same guard logic you use on the client.</p>
    <CodeBlock language="typescript" filename="middleware.ts" code={`import { sirouMiddleware } from "@sirou/nextjs/middleware";
import { routes } from "./lib/routes";

export default sirouMiddleware(routes, {
  guards: ["auth", "isAdmin"],
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};`} />
  </div>
);

export default NextjsAdapterPage;
