import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ReactNativePage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      Adapters
    </p>
    <h1>React Native Adapter</h1>
    <p>
      <code>@sirou/react-native</code> bridges the Sirou core engine to React
      Navigation v6. Use the same route schema, guards, and loaders across your
      web and mobile apps.
    </p>

    <h2 id="installation">Installation</h2>
    <CodeBlock
      language="bash"
      code={`npm install @sirou/react-native @react-navigation/native @react-navigation/native-stack`}
    />

    <h2 id="setup">Setup</h2>
    <p>
      Wrap your <code>NavigationContainer</code> with{" "}
      <code>SirouNativeProvider</code>. The provider initializes the Sirou
      engine and registers a listener on React Navigation's state changes.
    </p>
    <CodeBlock
      language="typescript"
      filename="App.tsx"
      code={`import { NavigationContainer } from "@react-navigation/native";
import { SirouNativeProvider, createNativeRouter } from "@sirou/react-native";
import { routes } from "./routes";

const router = createNativeRouter(routes);

export function App() {
  return (
    <SirouNativeProvider router={router}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SirouNativeProvider>
  );
}`}
    />

    <h2 id="guards">Registering Guards</h2>
    <p>
      Register guards on the router instance before the{" "}
      <code>NavigationContainer</code>
      mounts to protect the initial route.
    </p>
    <CodeBlock
      language="typescript"
      filename="guards.ts"
      code={`import type { RouteGuard } from "@sirou/core";

export const authGuard: RouteGuard = {
  name: "auth",
  execute: async ({ meta }) => {
    const token = await SecureStore.getItemAsync("token");
    if (!token && meta.requiresAuth) {
      return { allowed: false, redirect: "/login" };
    }
    return { allowed: true };
  },
};`}
    />
    <CodeBlock
      language="typescript"
      filename="App.tsx"
      code={`const router = createNativeRouter(routes);
router.registerGuard(authGuard);`}
    />

    <h2 id="hooks">Hooks</h2>

    <h3 id="use-route-params">
      <code>useRouteParams(routeName)</code>
    </h3>
    <p>
      Returns typed parameters for the current route. If the current route does
      not match
      <code>routeName</code>, the hook returns <code>undefined</code>.
    </p>
    <CodeBlock
      language="typescript"
      filename="DetailsScreen.tsx"
      code={`import { useRouteParams } from "@sirou/react-native";

function DetailsScreen() {
  const { userId } = useRouteParams("userDetail");
  return <Text>Viewing User {userId}</Text>;
}`}
    />

    <h3 id="use-sirou-router-native">
      <code>useSirouRouter()</code>
    </h3>
    <p>
      Returns the native router instance with the same <code>go</code> and{" "}
      <code>goUrl</code>
      API as other adapters.
    </p>
    <CodeBlock
      language="typescript"
      code={`import { useSirouRouter } from "@sirou/react-native";

function BackButton() {
  const router = useSirouRouter();
  return <Pressable onPress={() => router.go("home")}>Back</Pressable>;
}`}
    />

    <h2 id="deep-links">Deep Linking</h2>
    <p>
      Your Sirou schema serves as the single source of truth for deep link URL
      patterns. Pass <code>buildUrl</code> output directly to React Navigation's
      <code>linking.config</code>.
    </p>
    <CodeBlock
      language="typescript"
      filename="linking.ts"
      code={`import { buildUrl } from "@sirou/core";
import { routes } from "./routes";

export const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      UserDetail: buildUrl(routes, "userDetail", { userId: ":userId" }),
    },
  },
};`}
    />

    <h2 id="expo">Expo Support</h2>
    <p>
      <code>@sirou/react-native</code> works with both bare React Native and
      Expo managed workflow. No additional configuration is required. For Expo
      Router users, use the adapter alongside Expo's file-based routing by
      treating Sirou as the guard and data layer.
    </p>
  </div>
);

export default ReactNativePage;
