# Route Guards

Route guards are async functions that run **before** any navigation completes. They can:

- **Allow** the navigation to proceed
- **Redirect** to a different route
- **Block** the navigation entirely

---

## Defining a Guard

Every guard has a `name` (string) and an `execute` function that receives a `GuardContext` and returns a `GuardResult`.

```typescript
import { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ route, params, meta }) => {
    const token = localStorage.getItem("accessToken");

    if (!token && meta?.requiresAuth) {
      // Redirect to login, preserving original destination could be done via state
      return { allowed: false, redirect: "/login" };
    }

    return { allowed: true };
  },
};
```

### `GuardContext`

| Property  | Type                  | Description                                                     |
| :-------- | :-------------------- | :-------------------------------------------------------------- |
| `route`   | `string`              | The path being navigated to (e.g. `/user/123`)                  |
| `params`  | `Record<string, any>` | Extracted route params                                          |
| `meta`    | `RouteMeta`           | Metadata from the route config                                  |
| `query`   | `Record<string, any>` | Query string params (if available)                              |
| `context` | `any`                 | Adapter specific context (e.g. `request` in Next.js middleware) |

### `GuardResult`

```typescript
// Allow
{ allowed: true }

// Block with redirect
{ allowed: false, redirect: "/login" }

// Block with reason (no redirect  throws an error)
{ allowed: false, reason: "Premium plan required" }
```

---

## Attaching Guards to Routes

Assign guard **names** (not functions) to a route via the `guards` array:

```typescript
const routes = defineRoutes({
  dashboard: {
    path: "/dashboard",
    meta: { requiresAuth: true },
    guards: ["auth"], // guard name
  },
  admin: {
    path: "/admin",
    meta: { requiresAuth: true, requiresAdmin: true },
    guards: ["auth", "admin"], // multiple guards, run in order
  },
});
```

Guards run in the order they are listed. If any guard blocks, the rest are skipped.

---

## Registering Guards

Pass guards to the provider's `guards` prop:

```tsx
// React / Next.js
<SirouRouterProvider config={routes} guards={[authGuard, adminGuard]}>
  {children}
</SirouRouterProvider>
```

```typescript
// Svelte  pass guards to setupSirouGuards
setupSirouGuards(routes, [authGuard, adminGuard]);
```

You can also register guards at runtime:

```typescript
const router = useSirouRouter();
router.registerGuard(adminGuard);
```

---

## Initial Route Protection

On app startup, Sirou calls `initialize()` which checks guards for the **current URL**. This prevents users from deep linking directly into protected pages.

React and React Native call `initialize()` automatically. For Svelte, the `createSirouSvelteRouter()` function returns a raw core instance call `initialize()` manually inside `onMount`.

---

## Multiple Guards (Composition)

```typescript
export const authGuard: RouteGuard = {
  name: "auth",
  execute: async () => {
    const user = await getUser();
    if (!user) return { allowed: false, redirect: "/login" };
    return { allowed: true };
  },
};

export const adminGuard: RouteGuard = {
  name: "admin",
  execute: async () => {
    const user = await getUser();
    if (user?.role !== "admin") {
      return { allowed: false, redirect: "/403" };
    }
    return { allowed: true };
  },
};
```

```typescript
admin: {
  path: "/admin",
  guards: ["auth", "admin"],  // auth first, then admin
}
```

---

## React: `<SirouGuard>` Component

Use `<SirouGuard>` as a layout route in React Router to protect entire branches:

```tsx
<Routes>
  <Route path="/login" element={<Login />} />

  {/* Protected section */}
  <Route element={<SirouGuard routeName="dashboard" />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
</Routes>
```

`<SirouGuard>` renders `null` while checking, renders `null` if blocked, and renders `<Outlet />` if allowed.

---

## Next.js: Middleware Guard

For server side protection, use `createSirouMiddleware` in `middleware.ts`:

```typescript
import { createSirouMiddleware } from "@sirou/next/server";
import { routes } from "@/routes";
import { authGuard } from "@/guards";

export const middleware = createSirouMiddleware(routes, [authGuard]);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
```

The middleware guard has access to `context.request` (the `NextRequest`) in the guard context.

---

## Svelte: `setupSirouGuards`

For Svelte, guards intercept both programmatic navigation and raw `<a>` tag clicks via `beforeNavigate`:

```typescript
// +layout.ts (or your root component)
import { createSirouSvelteRouter, setupSirouGuards } from "@sirou/svelte";
import { routes } from "$lib/routes";
import { authGuard } from "$lib/guards";

export const router = createSirouSvelteRouter(routes);

// Call once at app root
setupSirouGuards(routes, [authGuard]);
```

> **Note:** Sirou uses a `_sirouNavigating` flag internally to prevent an infinite loop when `beforeNavigate` re fires after Sirou calls `goto()` following a successful guard check.

---

## Checking Guards Manually

```typescript
const router = useSirouRouter();
const result = await router.checkGuards("dashboard");

if (!result.allowed) {
  console.log("Blocked:", result.reason);
}
```
