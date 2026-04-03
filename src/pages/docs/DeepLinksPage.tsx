import React from "react";
import { motion } from "framer-motion";
import CodeBlock from "@/components/CodeBlock";

const DeepLinksPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="doc-prose max-w-4xl"
    >
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          Deep Links (React Native)
        </h1>
        <p className="text-foreground/80 leading-7">
          Sirou can generate a complete React Navigation{" "}
          <strong>linking configuration</strong> from your route schema. This
          enables universal links and URL scheme based deep links with zero
          manual mapping.
        </p>
      </div>

      <section className="mb-12">
        <h2 id="setup" className="text-xl font-semibold mb-4">
          Setup
        </h2>
        <CodeBlock
          language="bash"
          code={`npm install @sirou/core @sirou/react-native @react-navigation/native`}
        />
      </section>

      <section className="mb-12">
        <h2
          id="generate-the-linking-config"
          className="text-xl font-semibold mb-4"
        >
          Generate the Linking Config
        </h2>
        <CodeBlock
          language="typescript"
          filename="src/linking.ts"
          code={`import { generateSirouLinking } from "@sirou/react-native";
import { routes } from "./routes";

export const linking = generateSirouLinking(routes, [
  "myapp://",
  "https://myapp.com",
]);`}
        />
        <p className="text-sm leading-relaxed text-foreground/80 mt-4">
          The result is a React Navigation <code>LinkingOptions</code> object
          that maps every route path to its screen name.
        </p>
      </section>

      <section className="mb-12">
        <h2
          id="use-in-navigationcontainer"
          className="text-xl font-semibold mb-4"
        >
          Use in NavigationContainer
        </h2>
        <CodeBlock
          language="tsx"
          code={`import { NavigationContainer } from "@react-navigation/native";
import { linking } from "./linking";

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* ... your navigators */}
    </NavigationContainer>
  );
}`}
        />
      </section>

      <section className="mb-12">
        <h2
          id="manual-deep-link-generation"
          className="text-xl font-semibold mb-4"
        >
          Manual Deep Link Generation
        </h2>
        <p className="text-sm leading-relaxed text-foreground/80 mb-4">
          You can also build deep link URLs manually:
        </p>
        <CodeBlock
          language="typescript"
          code={`import { URLBuilder } from "@sirou/core";
import { routes } from "./routes";

const builder = new URLBuilder();
const url = builder.build(routes.products.children!.details, {
  productId: "abc",
});
// → "/products/abc"`}
        />
      </section>
    </motion.div>
  );
};

export default DeepLinksPage;
