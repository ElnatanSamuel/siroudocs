# Deep Links (React Native)

Sirou can generate a complete React Navigation **linking configuration** from your route schema. This enables universal links and URL scheme based deep links with zero manual mapping.

---

## Setup

```bash
npm install @sirou/core @sirou/react-native @react-navigation/native
```

---

## Generate the Linking Config

```typescript
// src/linking.ts
import { generateSirouLinking } from "@sirou/react-native";
import { routes } from "./routes";

export const linking = generateSirouLinking(routes, [
  "myapp://",
  "https://myapp.com",
]);
```

The result is a React Navigation `LinkingOptions` object that maps every route path to its screen name.

---

## Use in NavigationContainer

```tsx
import { NavigationContainer } from "@react-navigation/native";
import { linking } from "./linking";

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* ... your navigators */}
    </NavigationContainer>
  );
}
```

---

## Route Naming Convention

Sirou uses dotted route names (e.g. `products.details`) as screen names. Make sure your React Navigation screen names match your Sirou route names.

---

## Manual Deep Link Generation

You can also build deep link URLs manually:

```typescript
import { URLBuilder } from "@sirou/core";
import { routes } from "./routes";

const builder = new URLBuilder();
const url = builder.build(routes.products.children!.details, {
  productId: "abc",
});
// → "/products/abc"
```
