import React from "react";
import CodeBlock from "@/components/CodeBlock";

const SvelteAdapterPage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Adapters</p>
    <h1>Svelte Adapter</h1>
    <p>Reactive, type-safe routing for the Svelte ecosystem. Sirou for Svelte brings the power of centralized schema management to Svelte and SvelteKit applications.</p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/svelte" />

    <h2 id="key-features">Key Features</h2>

    <h3 id="first-class-stores">First-Class Stores</h3>
    <p>Route state, parameters, and query strings are exposed as native Svelte stores for effortless reactivity.</p>

    <h3 id="sveltekit-ready">SvelteKit Ready</h3>
    <p>Augment SvelteKit's file-based routing with Sirou's centralized type safety and cross-platform guards.</p>

    <h3 id="minimal-boilerplate">Minimal Boilerplate</h3>
    <p>Leverage Svelte's concise syntax with our custom providers and components.</p>

    <h2 id="setup">Setup (SvelteKit)</h2>
    <CodeBlock language="typescript" filename="+layout.svelte" code={`<script>
  import { SirouProvider, createSvelteRouter } from '@sirou/svelte';
  import { routes } from '$lib/routes';

  const router = createSvelteRouter(routes);
</script>

<SirouProvider {router}>
  <slot />
</SirouProvider>`} />

    <h2 id="using-stores">Using Stores</h2>
    <CodeBlock language="typescript" filename="Page.svelte" code={`<script>
  import { params, page } from '@sirou/svelte';

  // Fully typed and reactive
  $: id = $params.id;
  $: title = $page.meta.title;
</script>

<h1>{title}</h1>
<p>User ID: {id}</p>`} />
  </div>
);

export default SvelteAdapterPage;
