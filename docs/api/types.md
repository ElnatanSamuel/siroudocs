# Type Reference

All public types exported from `@sirou/core`.

---

## Route Definition Types

### `RouteConfig`

```typescript
type RouteConfig = { [routeName: string]: RouteDefinition };
```

### `RouteDefinition<TPath, TParams, TMeta>`

```typescript
type RouteDefinition = {
  path: string;
  params?: RouteParamConfig;
  meta?: RouteMeta;
  guards?: string[]; // guard names (must be registered)
  loader?: (ctx: GuardContext) => Promise<any>;
  children?: RouteConfig;
};
```

### `RouteParamConfig`

```typescript
type RouteParamConfig = {
  [key: string]:
    | ParamType
    | {
        type: ParamType;
        optional?: boolean;
        validate?: (value: any) => boolean;
        transform?: (value: string) => any;
      };
};
```

### `ParamType`

```typescript
type ParamType = "string" | "number" | "boolean" | "date";
```

---

## Inference Types

### `InferParams<Config>`

Infers the params object type from a `RouteParamConfig`.

```typescript
const route = {
  path: "/user/:id",
  params: { id: "string" },
} as const;

type Params = InferParams<typeof route.params>;
// → { id: string }
```

### `FlatRouteMap<T>`

Maps nested route configs into a flat dotted key structure.

```typescript
type Map = FlatRouteMap<typeof routes>;
// Keys like "products", "products.details"
```

---

## Guard Types

### `RouteGuard<TContext>`

```typescript
type RouteGuard<TContext = any> = {
  name: string;
  execute: (context: GuardContext<TContext>) => Promise<GuardResult>;
};
```

### `GuardContext<TContext>`

```typescript
type GuardContext<TContext = any> = {
  route: string;
  params: Record<string, any>;
  query?: Record<string, any>;
  meta?: RouteMeta;
  context?: TContext; // adapter specific (e.g. NextRequest)
};
```

### `GuardResult`

```typescript
type GuardResult =
  | { allowed: true }
  | { allowed: false; redirect?: string; reason?: string };
```

---

## Navigation Types

### `RouteInfo`

```typescript
type RouteInfo = {
  name: string;
  path: string;
  params: Record<string, any>;
  query: Record<string, any>;
  meta: RouteMeta;
};
```

### `RouteMeta`

```typescript
type RouteMeta = Record<string, any>;
```

### `NavigationOptions`

```typescript
type NavigationOptions = {
  state?: any;
  scroll?: boolean;
  shallow?: boolean;
};
```

### `Location`

```typescript
type Location = {
  pathname: string;
  search: string;
  hash: string;
  state?: any;
};
```

---

## Adapter Interface

### `SirouAdapter`

```typescript
interface SirouAdapter {
  navigate(
    url: string,
    options?: NavigationOptions,
    routeName?: string,
    params?: Record<string, any>,
  ): Promise<void>;
  replace(
    url: string,
    options?: NavigationOptions,
    routeName?: string,
    params?: Record<string, any>,
  ): Promise<void>;
  back(): Promise<void>;
  getCurrentLocation(): Location;
  subscribe(listener: LocationListener): Unsubscribe;
  canGoBack(): boolean;
}
```

### `LocationListener` / `Unsubscribe`

```typescript
type LocationListener = (location: Location) => void;
type Unsubscribe = () => void;
```
