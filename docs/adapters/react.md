# React Adapter (`@sirou/react`)

The React adapter wraps React Router (v6) and provides a full suite of hooks and components for a Sirou powered React application.

## Installation

```bash
npm install @sirou/core @sirou/react react react-router-dom
```

---

## Provider Setup

```tsx
import { BrowserRouter } from "react-router-dom";
import { SirouRouterProvider } from "@sirou/react";
import { routes } from "./routes";
import { authGuard } from "./guards";

<BrowserRouter>
  <SirouRouterProvider config={routes} guards={[authGuard]}>
    <App />
  </SirouRouterProvider>
</BrowserRouter>;
```

`SirouRouterProvider` accepts:

| Prop       | Type           | Description                   |
| :--------- | :------------- | :---------------------------- |
| `config`   | `RouteConfig`  | Your route schema             |
| `guards`   | `RouteGuard[]` | Guards to register on startup |
| `children` | `ReactNode`    | App tree                      |

---

## Hooks

### `useSirouRouter<T>()`

Returns the type safe router instance.

```typescript
const router = useSirouRouter<typeof routes>();

await router.go("user", { id: "123" });
await router.replace("home");
await router.back();
router.build("user", { id: "456" }); // → "/user/456"
router.current(); // RouteInfo | null
router.getHistory(); // RouteInfo[]
```

---

### `useRouteParams<T, TRoute>()` / `useSirouParams<T, TRoute>()`

Returns the current route's params (from React Router's `useParams`).

```typescript
const { id } = useRouteParams<typeof routes, "user">();
```

> `useSirouParams` is an alias for `useRouteParams` — both names are exported.

---

### `useSirouRoute()`

Returns the current `RouteInfo` and re renders when the route changes.

```typescript
const route = useSirouRoute();
// { name, path, params, query, meta }
```

---

### `useRouteData<T>()`

Returns pre fetched data from the current route's loader.

```typescript
const product = useRouteData<Product>();
```

---

### `useRouteTitle(fallback?)`

Automatically updates `document.title` from `route.meta.title`.

```typescript
useRouteTitle("My App");
```

---

### `useRouteAnalytics(callback, deps?)`

Calls `callback` with the current `RouteInfo` on every route change (and on initial load).

```typescript
useRouteAnalytics((route) => {
  analytics.page(route.name, route.meta);
});
```

---

### `useBreadcrumbs()`

Returns an array of `{ label, path }` breadcrumb objects based on the current path segments.

```typescript
const breadcrumbs = useBreadcrumbs();
// [{ label: "Settings", path: "/settings" }, { label: "Profile", path: "/settings/profile" }]
```

---

## Components

### `<SirouGuard routeName="..." params={...} />`

A layout route component that runs guards before rendering its children via `<Outlet />`.

```tsx
<Routes>
  <Route element={<SirouGuard routeName="dashboard" />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
</Routes>
```

---

### `<SirouLink to="..." params={...}>`

Type safe link component that builds the correct `href` via the Sirou router.

```tsx
<SirouLink<typeof routes> to="user" params={{ id: "123" }}>
  View Profile
</SirouLink>
```

---

### `<SirouDevTools />`

A floating DevTools panel (only renders in development).

```tsx
{
  import.meta.env.DEV && <SirouDevTools />;
}
```

Shows: current route name, path, params, metadata, and navigation history.
