import React from "react";
import CodeBlock from "@/components/CodeBlock";

const DataLoadersPage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Data Loaders</h1>
      <p>
        Data Loaders allow you to fetch the data your screens need <strong>before</strong> the
        transition occurs. This eliminates UI watermarks and ensures a premium, flicker-free experience.
      </p>

      <h2 id="define-loader">Define a Loader</h2>
      <p>Loaders are defined directly in your route schema.</p>
      <CodeBlock
        language="typescript"
        code={`export const routes = defineRoutes({
  userProfile: {
    path: "/user/:id",
    loaders: {
      user: async ({ id }) => {
        return fetchUser(id);
      },
      posts: async ({ id }) => {
        return fetchUserPosts(id);
      },
    },
  },
});`}
      />

      <h2 id="accessing-data">Accessing Data</h2>
      <p>Use the <code>useRouteData</code> hook to access the pre-loaded data in your components.</p>
      <CodeBlock
        language="typescript"
        filename="ProfilePage.tsx"
        code={`import { useRouteData } from "@sirou/react";

function ProfilePage() {
  const { user, posts } = useRouteData("userProfile");

  return (
    <div>
      <h1>{user.name}</h1>
      <PostList items={posts} />
    </div>
  );
}`}
      />

      <h2 id="key-advantages">Key Advantages</h2>

      <h3 id="no-waterfall">No UI Waterfall</h3>
      <p>
        Parallelize data fetching so the screen only renders once the entire data tree is ready.
      </p>

      <h3 id="type-safe-data">Type Safety</h3>
      <p>Data returned from loaders is automatically typed when accessed via hooks.</p>

      <h3 id="cache-awareness">Cache Awareness</h3>
      <p>
        Sirou intelligently manages loader state, preventing redundant fetches during param-only updates.
      </p>
    </div>
  );
};

export default DataLoadersPage;
