# React Native Adapter (`@sirou/react-native`)

The React Native adapter bridges Sirou with React Navigation v6+. It treats React Navigation screen names as route identifiers, and Sirou route names map directly to screen names.

## Installation

```bash
npm install @sirou/core @sirou/react-native @react-navigation/native
```

---

## Provider Setup

`SirouRouterProvider` **must** be placed **inside** your `NavigationContainer`.

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { SirouRouterProvider } from "@sirou/react-native";
import { routes } from "./routes";
import { authGuard } from "./guards";

export default function App() {
  return (
    <NavigationContainer>
      <SirouRouterProvider config={routes} guards={[authGuard]}>
        <RootNavigator />
      </SirouRouterProvider>
    </NavigationContainer>
  );
}
```

---

## Hooks

### `useSirouRouter<T>()`

```typescript
const router = useSirouRouter<typeof routes>();

await router.go("home");
await router.go("user", { id: "123" });
await router.back();
```

### `useSirouRoute()`

Returns the current `RouteInfo` (name, path, params, query, meta).

```typescript
const route = useSirouRoute();
console.log(route?.name); // "home"
```

### `useSirouParams<T, TRoute>()`

Returns the current screen's params from `route.params`.

```typescript
const { id } = useSirouParams<typeof routes, "user">();
```

---

## Deep Links

```typescript
import { generateSirouLinking } from "@sirou/react-native";
import { routes } from "./routes";

const linking = generateSirouLinking(routes, ["myapp://", "https://myapp.com"]);

// Pass linking to NavigationContainer
<NavigationContainer linking={linking}>
```

---

## How Navigation Works

The `ReactNativeAdapter` maps Sirou calls to React Navigation:

| Sirou call                | RN equivalent                 |
| :------------------------ | :---------------------------- |
| `router.go("home")`       | `navigation.navigate("home")` |
| `router.replace("login")` | `navigation.replace("login")` |
| `router.back()`           | `navigation.goBack()`         |
| `router.canGoBack()`      | `navigation.canGoBack()`      |

The adapter uses the **route name** (not URL) to navigate — React Navigation is screen name based, not URL based. Sirou passes the `routeName` through from `router.go()` to the adapter's `navigate()` call.

---

## Guard on Initial Load

`SirouRouterProvider` calls `router.initialize()` once on mount (inside `useEffect`). This checks guards for the current screen when the app opens — including deep link launches.

---

## Location Tracking

The adapter subscribes to the React Navigation `"state"` event to detect screen changes and notify Sirou listeners. This keeps `router.current()` and `useSirouRoute()` in sync with the native navigation stack.
