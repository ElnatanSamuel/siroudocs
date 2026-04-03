# Introduction

**Sirou** is a universal type safe routing engine for the modern JavaScript and TypeScript ecosystem. Write your route schema **once** in TypeScript Sirou handles type safe navigation, async route guards, data loaders, deep link generation, and a developer experience that stays consistent across every platform you ship on.

## Supported Platforms

| Platform                            | Package               |
| :---------------------------------- | :-------------------- |
| React (Vite, CRA, etc.)             | `@sirou/react`        |
| Next.js App Router                  | `@sirou/next`         |
| SvelteKit                           | `@sirou/svelte`       |
| React Native (React Navigation v6+) | `@sirou/react-native` |

## Core Concepts

**Route Schema** a single TypeScript object that is your source of truth for every route in the app. It holds paths, param types, guards, loaders, metadata, and child routes.

**Type Safe Navigation** `router.go("routeName", params)` is fully typed. TypeScript prevents typos in route names, wrong param types, and missing required params at compile time.

**Route Guards** async functions that run before any navigation. They can allow the navigation, redirect to another route, or block completely. Guards run on both programmatic navigation (`router.go()`) and the initial page load.

**Data Loaders** async functions attached to a route definition that pre fetch data before the route renders. Access the result with `useRouteData()`.

**Adapters** thin wrappers around each framework's native navigation API. The core engine is agnostic adapters translate Sirou's `navigate`, `replace`, and `back` calls into framework specific equivalents.

## How It Works

```
defineRoutes()      ← your single source of truth
      │
SirouRouterCore     ← platform agnostic engine
      │     │
  Guards  Loaders   ← async middleware
      │
  Adapter           ← framework bridge (React Router, Next.js, etc.)
      │
 Native Nav         ← window.history, useRouter(), NavigationContainer
```

## Next Steps

- [Installation](./getting-started/installation.md) install Sirou for your platform
- [Quick Start](./getting-started/quick-start.md) be up and running in 5 minutes
- [Route Guards](./guides/route-guards.md) protect pages with async logic
