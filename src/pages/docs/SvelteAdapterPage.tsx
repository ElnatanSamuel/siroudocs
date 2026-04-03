import React from "react";
import CodeBlock from "@/components/CodeBlock";

const SvelteAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>Svelte Adapter</h1>
    <p>
      <code>@sirou/svelte</code> integrates with SvelteKit and plain Svelte
      applications. Route state is exposed as native Svelte stores so all
      reactivity is declarative and automatic.
    </p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/svelte" />

    <h2 id="setup">Setup (SvelteKit)</h2>
    <p>
      Initialize the router and call <code>setupSirouGuards</code> once in your
      root layout. The guard setup hooks into SvelteKit's{" "}
      <code>beforeNavigate</code> lifecycle.
    </p>
    <CodeBlock
      language="typescript"
      filename="+layout.svelte"
      code={`<script>
  import { onMount } from "svelte";
  import { setupSirouGuards, createSvelteRouter } from "@sirou/svelte";
  import { routes } from "$lib/routes";
  import { authGuard } from "$lib/guards";

  const router = createSvelteRouter(routes);

  onMount(() => {
    router.registerGuard(authGuard);
    setupSirouGuards(router);
  });
</script>

<slot />`}
    />

    <h2 id="stores">Reactive Stores</h2>
    <p>
      Import <code>sirouPage</code> and <code>sirouParams</code> anywhere in
      your Svelte tree. They update automatically on every navigation.
    </p>
    <CodeBlock
      language="typescript"
      filename="Profile.svelte"
      code={`<script>
  import { sirouPage, sirouParams } from "@sirou/svelte";

  // Reactive - rerenders automatically on navigation
  $: id = $sirouParams.id;
  $: title = $sirouPage.meta?.title;
</script>

<h1>{title}</h1>
<p>Viewing user {id}</p>`}
    />

    <h2 id="guard-loop-prevention">Guard Loop Prevention</h2>
    <p>
      Sirou's Svelte adapter uses a module-scoped navigation flag to prevent the
      <code>goto()</code> call inside a guard from re-triggering{" "}
      <code>beforeNavigate</code>. You do not need to handle this yourself.
    </p>

    <h2 id="programmatic">Programmatic Navigation</h2>
    <CodeBlock
      language="typescript"
      code={`<script>
  import { createSvelteRouter } from "@sirou/svelte";
  import { routes } from "$lib/routes";
  import { buildUrl } from "@sirou/core";

  const router = createSvelteRouter(routes);

  function goToSettings() {
    router.go("settings");
  }

  function getProfileUrl(id) {
    return buildUrl(routes, "userProfile", { id });
  }
</script>

<button on:click={goToSettings}>Settings</button>
<a href={getProfileUrl("42")}>View Profile</a>`}
    />

    <h2 id="guards">Registering Guards</h2>
    <CodeBlock
      language="typescript"
      filename="lib/guards.ts"
      code={`import type { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta }) => {
    const token = localStorage.getItem("token");
    if (!token && meta.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};`}
    />

    <h2 id="sveltekit-augment">Augmenting SvelteKit File Routing</h2>
    <p>
      Sirou does not replace SvelteKit's file-based routing. It sits on top of
      it as the single source of truth for route names, params, and guards. Your
      SvelteKit pages remain unchanged; Sirou adds type-safety and centralized
      guard logic.
    </p>
  </div>
);

export default SvelteAdapterPage;
