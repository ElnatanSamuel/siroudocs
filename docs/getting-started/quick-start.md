# Quick Start

This guide walks you through a complete Sirou setup for **React** with React Router. The pattern is near identical for other frameworks see the adapter specific pages for differences.

---

## Step 1 Define routes

Create a single route config file. This is your **source of truth** across the whole app.

```typescript
// src/routes.ts
import { defineRoutes } from "@sirou/core";

export const routes = defineRoutes({
  home: {
    path: "/",
    meta: { title: "Home" },
  },
  login: {
    path: "/login",
    meta: { title: "Login" },
  },
  dashboard: {
    path: "/dashboard",
    meta: { title: "Dashboard", requiresAuth: true },
    guards: ["auth"],
  },
  user: {
    path: "/user/:id",
    params: { id: "string" },
    meta: { title: "User Profile", requiresAuth: true },
    guards: ["auth"],
  },
  notFound: { path: "*" },
});

export type AppRoutes = typeof routes;
```

---

## Step 2 Create a guard

```typescript
// src/guards.ts
import { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta }) => {
    const token = localStorage.getItem("accessToken");
    if (!token && meta?.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};
```

---

## Step 3 Wrap your app

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SirouRouterProvider } from "@sirou/react";
import { routes } from "./routes";
import { authGuard } from "./guards";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <SirouRouterProvider config={routes} guards={[authGuard]}>
      <App />
    </SirouRouterProvider>
  </BrowserRouter>,
);
```

---

## Step 4 Navigate

```tsx
// src/components/Nav.tsx
import { useSirouRouter } from "@sirou/react";
import type { AppRoutes } from "../routes";

export function Nav() {
  const router = useSirouRouter<AppRoutes>();

  return (
    <nav>
      <button onClick={() => router.go("home")}>Home</button>
      <button onClick={() => router.go("user", { id: "123" })}>Profile</button>
      <button onClick={() => router.back()}>Back</button>
    </nav>
  );
}
```

All arguments to `router.go()` are fully typed. TypeScript will error if you:

- Use a route name that doesn't exist
- Pass the wrong type for a param
- Forget a required param

---

## Step 5 Protect routes with `<SirouGuard>`

```tsx
// src/App.tsx
import { Routes, Route, Outlet } from "react-router-dom";
import { SirouGuard } from "@sirou/react";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<SirouGuard routeName="dashboard" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route element={<SirouGuard routeName="user" />}>
        <Route path="/user/:id" element={<UserProfile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

`<SirouGuard>` runs the guards for the given route. If blocked, it renders nothing and redirects. If allowed, it renders the nested `<Outlet />`.

---

## What's Next

- [Route Guards](../guides/route-guards.md) deeper dive into guard patterns
- [Data Loaders](../guides/data-loaders.md) pre fetch data before a route renders
- [React Adapter](../adapters/react.md) all hooks and components
