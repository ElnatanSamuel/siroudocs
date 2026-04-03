# Core API Reference

All exports from `@sirou/core`.

---

## `defineRoutes(config)`

Identity function that returns the config with full TypeScript inference. Always wrap your routes with this for type safety.

```typescript
const routes = defineRoutes({
  home: { path: "/" },
});
```

---

## `createRouter(config, adapter)`

Creates a `SirouRouterCore` instance. Useful for headless/custom setups.

```typescript
const router = createRouter(routes, myAdapter);
```

---

## `SirouRouterCore<TConfig>`

The core routing engine. Implements `SirouRouter<TConfig>`.

### Methods

| Method          | Signature                                   | Description                         |
| :-------------- | :------------------------------------------ | :---------------------------------- |
| `go`            | `(routeName, params?) Promise<void>`        | Navigate to a route                 |
| `replace`       | `(routeName, params?) Promise<void>`        | Replace current history entry       |
| `back`          | `() Promise<void>`                          | Go back                             |
| `build`         | `(routeName, params?) string`               | Build URL without navigating        |
| `current`       | `() RouteInfo \| null`                      | Current matched route               |
| `canGoBack`     | `() boolean`                                | Whether back navigation is possible |
| `subscribe`     | `(listener) Unsubscribe`                    | Subscribe to location changes       |
| `getHistory`    | `() RouteInfo[]`                            | Last 20 navigation entries          |
| `getLoaderData` | `(routeName) any`                           | Data from the route's loader        |
| `getMeta`       | `(routeName) RouteMeta`                     | Route metadata                      |
| `registerGuard` | `(guard) void`                              | Register a guard at runtime         |
| `checkGuards`   | `(routeName, params?) Promise<GuardResult>` | Run guards without navigating       |
| `initialize`    | `() Promise<void>`                          | Guard and load the initial route    |

---

## `RouteTrie`

High performance Radix Trie for O(log n) route matching.

```typescript
const trie = new RouteTrie();
trie.insert("home", routeDef, "/");
const match = trie.match("/user/123");
// { route, name, params }
```

---

## `matchRoute(config, pathname)`

One shot helper that creates a new trie, populates it, and returns the match.

```typescript
const match = matchRoute(routes, "/user/123");
```

---

## `URLBuilder`

Builds URL strings from route definitions and params.

```typescript
const builder = new URLBuilder();
builder.build(route, { id: "123" }); // → "/user/123"
```

---

## `SchemaValidator`

Validates a route config for duplicate paths, missing param configs, and unused params.

```typescript
const { valid, errors } = new SchemaValidator().validate(routes);
```

### Error Types

| Type             | Description                                                 |
| :--------------- | :---------------------------------------------------------- |
| `duplicate_path` | Two routes share the same URL path                          |
| `invalid_param`  | Param in path not configured, or configured but not in path |

---

## `DeepLinkGenerator`

Generates a React Navigation linking config from a route schema.

```typescript
const gen = new DeepLinkGenerator();
const linking = gen.generateReactNativeConfig(routes, ["myapp://"]);
```
