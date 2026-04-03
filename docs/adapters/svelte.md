# SvelteKit Adapter (`@sirou/svelte`)

The SvelteKit adapter integrates with SvelteKit's `$app/navigation` and `$app/stores` APIs. It provides both a programmatic router and a guard setup utility for intercepting all navigations.

## Installation

```bash
npm install @sirou/core @sirou/svelte
```

---

## Create a Router

```typescript
// src/lib/router.ts
import { createSirouSvelteRouter } from "@sirou/svelte";
import { defineRoutes } from "@sirou/core";

const routes = defineRoutes({
  home: { path: "/" },
  dashboard: {
    path: "/dashboard",
    meta: { requiresAuth: true },
    guards: ["auth"],
  },
});

export const router = createSirouSvelteRouter(routes);
export type AppRoutes = typeof routes;
```

---

## Use in Components

```svelte
<script lang="ts">
  import { router } from "$lib/router";

  async function goHome() {
    await router.go("home");
  }
</script>

<button on:click={goHome}>Go Home</button>
```

---

## Setup Route Guards

Call `setupSirouGuards` once in your root `+layout.svelte`. It uses SvelteKit's `beforeNavigate` to intercept both programmatic navigation and raw `<a>` clicks.

```typescript
// src/routes/+layout.ts (or +layout.svelte <script>)
import { setupSirouGuards } from "@sirou/svelte";
import { routes } from "$lib/routes";
import { authGuard } from "$lib/guards";

setupSirouGuards(routes, [authGuard]);
```

### How It Works

1. `beforeNavigate` fires before any SvelteKit navigation.
2. If the target route has guards, the navigation is **cancelled** synchronously.
3. Guards are run asynchronously.
4. If allowed, Sirou calls `goto()` to re issue the navigation with a `_sirouNavigating` flag set to prevent the hook from re running (avoiding an infinite loop).
5. If blocked with a redirect, Sirou calls `goto(redirect)` instead.

> **Best practice:** Use `router.go()` or `<SirouLink>` for navigation guards run on the core before the adapter calls `goto()`, making them both checked efficiently. `setupSirouGuards` is the safety net for raw `<a>` links.

---

## Guard Context in Svelte

```typescript
export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ route, params, meta }) => {
    const session = await getSession();
    if (!session && meta?.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};
```

---

## SvelteAdapter Internals

The `SvelteAdapter` reads the current location from the `$app/stores` `page` store and calls `goto()` for navigation. It subscribes to `page.subscribe` to notify Sirou of location changes.
