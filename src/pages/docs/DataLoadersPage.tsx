import React from "react";
import CodeBlock from "@/components/CodeBlock";

const DataLoadersPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Data Loaders</h1>
      <p>
        Data Loaders are async functions defined directly inside your route
        schema. They resolve before the URL transition commits, so your
        components always receive data on their first render with no loading
        states required.
      </p>

      <h2 id="define-loader">Defining Loaders</h2>
      <p>
        Attach a <code>loaders</code> object to any route. Each key becomes a
        named data slice accessible in your component via{" "}
        <code>useRouteData</code>.
      </p>
      <CodeBlock
        language="typescript"
        filename="routes.ts"
        code={`import { defineRoutes } from "@sirou/core";

export const routes = defineRoutes({
  userProfile: {
    path: "/user/:id",
    params: { id: "string" },
    loaders: {
      user: async ({ params }) => {
        const res = await fetch(\`/api/users/\${params.id}\`);
        return res.json();
      },
      posts: async ({ params }) => {
        const res = await fetch(\`/api/users/\${params.id}/posts\`);
        return res.json();
      },
    },
  },
});`}
      />

      <h2 id="accessing-data">Accessing Loader Data</h2>
      <p>
        Use <code>useRouteData</code> to retrieve the resolved data in any
        component. The returned object is typed according to the return values
        of your loaders.
      </p>
      <CodeBlock
        language="typescript"
        filename="ProfilePage.tsx"
        code={`import { useRouteData } from "@sirou/react";
import { routes } from "./routes";

function ProfilePage() {
  const { user, posts } = useRouteData(routes, "userProfile");

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList items={posts} />
    </div>
  );
}`}
      />

      <h2 id="loader-context">Loader Context</h2>
      <p>
        Each loader receives a typed context object containing the following
        fields.
      </p>
      <CodeBlock
        language="typescript"
        code={`interface LoaderContext<TParams> {
  params: TParams;
  query: Record<string, string>;
  meta: Record<string, any>;
  signal: AbortSignal; // cancelled if user navigates away
}`}
      />

      <h2 id="parallel-loading">Parallel Execution</h2>
      <p>
        All loaders on a route run in parallel via <code>Promise.all</code>.
        This eliminates the sequential waterfall that occurs when components
        fetch data independently in their own <code>useEffect</code> or{" "}
        <code>onMount</code> calls.
      </p>

      <h2 id="abort">Cancellation</h2>
      <p>
        When a user navigates away mid-flight, Sirou invokes{" "}
        <code>signal.abort()</code>on every pending loader for the previous
        route. Use the signal in your fetch calls to cancel them cleanly.
      </p>
      <CodeBlock
        language="typescript"
        code={`user: async ({ params, signal }) => {
  const res = await fetch(\`/api/users/\${params.id}\`, { signal });
  return res.json();
},`}
      />

      <h2 id="error-handling">Error Handling</h2>
      <p>
        If any loader throws, the navigation is blocked and the error is
        surfaced through the router's <code>onError</code> callback. Use this to
        show a global error boundary or redirect to a failure page.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.onError((error, context) => {
  if (error.name === "LoaderError") {
    router.go("error", { state: { reason: error.message } });
  }
});`}
      />

      <h2 id="ssr">Server Side Rendering</h2>
      <p>
        When using <code>@sirou/next</code>, loaders can run in React Server
        Components. Pass the loader result as a prop to the client component so
        the page arrives fully hydrated from the server.
      </p>
      <CodeBlock
        language="typescript"
        filename="app/user/[id]/page.tsx"
        code={`import { buildUrl } from "@sirou/next/server";
import { routes } from "@/lib/routes";

export default async function UserPage({ params }) {
  const user = await fetch(\`/api/users/\${params.id}\`).then(r => r.json());

  return <ProfileClient user={user} />;
}`}
      />
    </div>
  );
};

export default DataLoadersPage;
