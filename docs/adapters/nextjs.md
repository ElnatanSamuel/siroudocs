# Next.js Adapter (`@sirou/next`)

The Next.js adapter targets the **App Router** (Next.js 13.4+) and includes both a client side provider/hooks and a server side middleware utility.

## Installation

```bash
npm install @sirou/core @sirou/next
```

---

## Client Side Usage

### Provider (Server Component safe)

Place `SirouRouterProvider` in your root `layout.tsx`. Since it uses `"use client"` internally, it can be used in Server Components as a wrapper.

```tsx
// app/layout.tsx
import { SirouRouterProvider } from "@sirou/next";
import { routes } from "@/routes";
import { authGuard } from "@/guards";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SirouRouterProvider config={routes} guards={[authGuard]}>
          {children}
        </SirouRouterProvider>
      </body>
    </html>
  );
}
```

---

### `useSirouRouter<T>()`

Must be used inside a `"use client"` component.

```tsx
"use client";
import { useSirouRouter } from "@sirou/next";
import type { AppRoutes } from "@/routes";

export function Nav() {
  const router = useSirouRouter<AppRoutes>();
  return <button onClick={() => router.go("home")}>Home</button>;
}
```

> **Implementation note:** The hook uses `useRef` to maintain a single stable router instance across re renders. When `usePathname()` changes, the internal adapter is updated in place so the router stays alive without losing registered guards.

---

### `useSirouParams<T, TRoute>()`

Returns query/search params (Next.js doesn't expose dynamic path segments to client components those come as props to the page).

```typescript
const params = useSirouParams<AppRoutes, "user">();
```

---

### `SirouLink`

Type safe link that builds the `href` via Sirou.

```tsx
<SirouLink<AppRoutes> to="user" params={{ id: "123" }}>
  View Profile
</SirouLink>
```

---

## Server Side Usage

### Middleware Guard

```typescript
// middleware.ts
import { createSirouMiddleware } from "@sirou/next/server";
import { routes } from "@/routes";
import { authGuard } from "@/guards";

export const middleware = createSirouMiddleware(routes, [authGuard]);

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*"],
};
```

The guard context object includes `context.request` (`NextRequest`) so you can read cookies, headers, etc:

```typescript
export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta, context }) => {
    const token = context?.request?.cookies.get("token")?.value;
    if (!token && meta?.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};
```

---

### `buildUrl` (Server Components)

Build a URL string in a Server Component or API route without hooks:

```typescript
import { buildUrl } from "@sirou/next/server";
import { routes } from "@/routes";

const url = buildUrl(routes, "user", { id: "123" }); // → "/user/123"
```

---

### `redirect` Helper

```typescript
import { redirect } from "@sirou/next/server";
import { routes } from "@/routes";

// In a Server Action
const url = redirect(routes, "dashboard");
// Use with Next.js redirect() from next/navigation
```
