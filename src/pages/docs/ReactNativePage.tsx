import React from "react";
import CodeBlock from "@/components/CodeBlock";

const ReactNativePage: React.FC = () => (
  <div className="doc-prose">
    <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--accent))" }}>Adapters</p>
    <h1>React Native Adapter</h1>
    <p>Typed navigation for mobile apps. Sirou for React Native provides a full bridge to React Navigation, keeping your business logic universal while using native mobile primitives.</p>

    <h2 id="installation">Installation</h2>
    <CodeBlock language="bash" code="npm install @sirou/react-native" />

    <h2 id="key-features">Key Features</h2>

    <h3 id="native-performance">Native Performance</h3>
    <p>Leverages the high-performance Sirou Trie for lightning-fast route matching on mobile devices.</p>

    <h3 id="react-nav-bridge">React Navigation Bridge</h3>
    <p>Sync Sirou's route state with React Navigation's history stack for a seamless native feel.</p>

    <h3 id="deep-linking">Deep Linking</h3>
    <p>Automatic support for mobile deep links, mapped directly from your centralized schema.</p>

    <h2 id="basic-setup">Basic Setup</h2>
    <CodeBlock language="typescript" filename="App.tsx" code={`import { SirouNativeProvider, createNativeRouter } from "@sirou/react-native";
import { routes } from "./routes";

const router = createNativeRouter(routes);

export function App() {
  return (
    <SirouNativeProvider router={router}>
      <NavigationContainer>
        {/* Your Native Stack */}
      </NavigationContainer>
    </SirouNativeProvider>
  );
}`} />

    <h2 id="typed-hooks">Typed Hook Usage</h2>
    <CodeBlock language="typescript" filename="DetailsScreen.tsx" code={`import { useRouteParams } from "@sirou/react-native";

function DetailsScreen() {
  // Params are fully typed based on your routes.ts schema
  const { userId } = useRouteParams("user_detail");

  return <Text>Viewing User: {userId}</Text>;
}`} />
  </div>
);

export default ReactNativePage;
