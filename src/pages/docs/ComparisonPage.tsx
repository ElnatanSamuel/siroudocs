import React from "react";

const ComparisonPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Advanced
    </p>
    <h1>Comparison</h1>
    <p>
      Sirou takes a different approach to routing. Instead of just "mapping a
      URL to a component", we treat the route as a <strong>State Object</strong>{" "}
      with a defined lifecycle.
    </p>

    <h2 id="vs-react-router">Sirou vs. React Router</h2>
    <p>
      React Router is the industry standard, but it often leads to "stringly
      typed" navigation and manual data fetching logic injected deep into
      components.
    </p>
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 pr-4 font-semibold">Feature</th>
            <th className="text-left py-2 pr-4 font-semibold">React Router</th>
            <th className="text-left py-2 font-semibold">Sirou</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Type Safety</strong>
            </td>
            <td className="py-2 pr-4">Third party wrappers</td>
            <td className="py-2">Built-in from day one</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Navigation</strong>
            </td>
            <td className="py-2 pr-4">
              <code>navigate("/users/123")</code>
            </td>
            <td className="py-2">
              <code>router.go("user_detail", {'{ id: "123" }'})</code>
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Guard Logic</strong>
            </td>
            <td className="py-2 pr-4">Manual wrappers / useEffect</td>
            <td className="py-2">Native guards property</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Data Flow</strong>
            </td>
            <td className="py-2 pr-4">Loader functions (v6+)</td>
            <td className="py-2">Integrated loaders with type safe context</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 pr-4">
              <strong>Architecture</strong>
            </td>
            <td className="py-2 pr-4">Component centric</td>
            <td className="py-2">Schema centric (Single Source of Truth)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 id="vs-nextjs">Sirou vs. Next.js (App Router)</h2>
    <p>
      Next.js is a powerful framework with file-system routing, but Sirou offers
      more centralized control.
    </p>
    <ul>
      <li>
        <strong>Centralized Schema</strong>: Next.js defines routes by folder
        structure. Sirou defines routes in a single <code>routes.ts</code> file,
        making it easier to see the whole map at a glance.
      </li>
      <li>
        <strong>Param Parsing</strong>: In Next.js, params are always strings in
        the server component. Sirou parses them according to your schema
        (numbers, booleans, customs) before they hit your logic.
      </li>
      <li>
        <strong>Universal Flow</strong>: Sirou routes can be shared between your
        Next.js web app and your React Native mobile app. Next.js routing is web
        only.
      </li>
    </ul>

    <h2 id="vs-sveltekit">Sirou vs. SvelteKit</h2>
    <p>SvelteKit uses a file based router similar to Next.js.</p>
    <ul>
      <li>
        <strong>Reactivity</strong>: Sirou provides native Svelte stores (
        <code>$page</code>, <code>$params</code>) that are fully typed against
        your schema.
      </li>
      <li>
        <strong>Guard Uniformity</strong>: SvelteKit's{" "}
        <code>hooks.server.js</code> and <code>+page.server.js</code> handle
        security. Sirou allows you to use the same Guard logic in your Svelte
        web app and your React Native app.
      </li>
    </ul>

    <h2 id="vs-react-navigation">Sirou vs. React Navigation</h2>
    <p>
      React Navigation is the standard for React Native CLI, but it lacks
      built-in "Web to Mobile" uniformity.
    </p>
    <ul>
      <li>
        <strong>Navigation Unified</strong>: Use{" "}
        <code>go('profile', {"{ id: 1 }"})</code> on Web and it maps to a{" "}
        <code>push('Profile', {"{ id: 1 }"})</code> on Mobile automatically.
      </li>
      <li>
        <strong>State Engine</strong>: React Navigation stores state in its own
        complex object. Sirou stores route state in a lean, serializable object
        that integrates with your app's global state easily.
      </li>
    </ul>

    <h2 id="vs-expo-router">Sirou vs. Expo Router</h2>
    <p>
      Expo Router brings file-system routing to native mobile, but Sirou
      provides more flexibility for complex enterprise apps.
    </p>
    <ul>
      <li>
        <strong>Schema vs File System</strong>: Like Next.js, Expo Router is
        file based. Sirou is schema based, allowing you to define complex guards
        and loaders without deep folder nesting.
      </li>
      <li>
        <strong>Cross Platform Sync</strong>: Expo Router is excellent for Expo
        apps. Sirou is designed for teams that may have a Next.js web app and a
        React Native mobile app and want to share <strong>100%</strong> of their
        routing logic.
      </li>
    </ul>
  </div>
);

export default ComparisonPage;
