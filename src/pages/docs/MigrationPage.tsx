import React from "react";
import CodeBlock from "@/components/CodeBlock";

const MigrationPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Advanced</p>
    <h1>Migration Guide</h1>
    <p>Transitioning to Sirou from a traditional router is straightforward. The primary shift is moving from <strong>Path-Based Navigation</strong> to <strong>Schema-Based Navigation</strong>.</p>

    <h2 id="from-react-router">From React Router</h2>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">React Router</th>
            <th className="text-left py-2 font-semibold">Sirou</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b"><td className="py-2 pr-4"><code>{'<Link to="/user/123">'}</code></td><td className="py-2"><code>{'<SirouLink to="user" params={{ id: "123" }}>'}</code></td></tr>
          <tr className="border-b"><td className="py-2 pr-4"><code>navigate('/settings')</code></td><td className="py-2"><code>router.go('settings')</code></td></tr>
          <tr className="border-b"><td className="py-2 pr-4"><code>useParams()</code></td><td className="py-2"><code>useRouteParams('routeName')</code></td></tr>
          <tr className="border-b"><td className="py-2 pr-4"><code>useEffect</code> data fetching</td><td className="py-2"><code>loader</code> in route config</td></tr>
        </tbody>
      </table>
    </div>

    <h3 id="step-by-step">Step-by-Step Migration</h3>
    <ol>
      <li><strong>Define your routes</strong>: Map your existing Route components into a <code>routes.ts</code> file.</li>
      <li><strong>Replace Link components</strong>: Swap out <code>{'<Link />'}</code> for <code>{'<SirouLink />'}</code>.</li>
      <li><strong>Encapsulate Logic</strong>: Move authorization logic from <code>useEffect</code> into Sirou Guards.</li>
    </ol>

    <h2 id="from-nextjs">From Next.js</h2>
    <p>Sirou is fully compatible with Next.js. You can use Sirou purely for its <strong>URL Generation</strong> and <strong>Type Inference</strong> while keeping Next.js for rendering.</p>
    <CodeBlock language="typescript" code={`// Instead of this:
<Link href={\`/blog/\${post.slug}\`}>...</Link>;

// Use this:
import { getUrl } from "@sirou/next";
<Link href={getUrl("blog.post", { slug: post.slug })}>...</Link>;`} />

    <h2 id="breaking-changes">Breaking Changes from v0.x</h2>
    <ul>
      <li><code>defineSchema</code> renamed to <code>defineRoutes</code>.</li>
      <li><code>router.navigateTo</code> renamed to <code>router.go</code>.</li>
      <li><code>meta</code> is now strictly typed via the generic parameter in <code>defineRoutes</code>.</li>
    </ul>
  </div>
);

export default MigrationPage;
