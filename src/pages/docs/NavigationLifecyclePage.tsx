import React from "react";
import CodeBlock from "@/components/CodeBlock";

const NavigationLifecyclePage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Navigation Lifecycle</h1>
      <p>
        Every navigation event in Sirou flows through a strict, deterministic
        pipeline. Understanding it lets you hook into exactly the right moment
        to run auth checks, prefetch data, cancel in-flight requests, or record
        analytics events.
      </p>

      <h2 id="stages">Lifecycle Stages</h2>

      <h3 id="guard-phase">1. Guard Phase</h3>
      <p>
        Sirou executes each guard registered on the target route in the order
        they appear in the schema. If any guard returns{" "}
        <code>allowed: false</code>, the navigation stops immediately. A
        redirect returned by a guard triggers a new navigation cycle rather than
        continuing the current one.
      </p>

      <h3 id="loader-phase">2. Loader Phase</h3>
      <p>
        Once all guards pass, Sirou kicks off every loader function in parallel
        using
        <code>Promise.all</code>. The transition remains pending until every
        loader resolves or one throws.
      </p>

      <h3 id="commit-phase">3. Commit Phase</h3>
      <p>
        With guards and loaders settled, Sirou commits the new route to its
        internal state. Framework adapters receive the state update and trigger
        their own reactive rerender cycles.
      </p>

      <h3 id="state-phase">4. Subscriber Notification</h3>
      <p>
        After the commit, all subscribers registered via{" "}
        <code>router.subscribe</code>
        are called. This is the correct hook for analytics tracking, scroll
        restoration, and document title updates.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.subscribe(({ route, params, meta }) => {
  document.title = meta.title ?? "Sirou App";
  analytics.pageView(route, params);
});`}
      />

      <h2 id="hooks">Lifecycle Hooks</h2>

      <h3 id="on-error">onError</h3>
      <p>
        Fires when a loader throws or a guard throws unexpectedly. Receives the
        raw error and the navigation context.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.onError((error, context) => {
  console.error("Navigation failed", error, context.route);
});`}
      />

      <h3 id="on-before">onBeforeNavigate (adapter-level)</h3>
      <p>
        Some adapters expose a <code>beforeNavigate</code> callback that fires
        before the guard phase. In the Svelte adapter this maps directly to
        SvelteKit's
        <code>beforeNavigate</code> hook.
      </p>

      <h2 id="cancellation">Cancellation</h2>
      <p>
        If a second navigation event fires while the first is still in the
        loader phase, Sirou issues an <code>AbortSignal</code> to all pending
        loaders from the cancelled navigation and begins the new lifecycle
        immediately. No stale data is ever committed.
      </p>

      <h2 id="concurrent">Concurrent Navigations</h2>
      <p>
        Sirou queues navigations and processes them one at a time. Rapid user
        actions such as quickly clicking multiple links result in the last
        navigation winning. Earlier navigations are aborted cleanly.
      </p>

      <h2 id="debugging">Debugging the Lifecycle</h2>
      <p>
        Enable the Sirou Debugger in development to visualize the full lifecycle
        for every navigation including guard results, loader timings, and
        committed state.
      </p>
      <CodeBlock
        language="typescript"
        filename="Root.tsx"
        code={`import { SirouRouterProvider, SirouDevTools } from "@sirou/react";

function Root() {
  return (
    <SirouRouterProvider routes={routes}>
      <App />
      {process.env.NODE_ENV === "development" && <SirouDevTools />}
    </SirouRouterProvider>
  );
}`}
      />
    </div>
  );
};

export default NavigationLifecyclePage;
