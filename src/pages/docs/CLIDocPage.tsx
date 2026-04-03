import React from "react";
import CodeBlock from "@/components/CodeBlock";

const CLIDocPage: React.FC = () => (
  <div className="doc-prose">
    <p
      className="text-sm font-medium mb-2"
      style={{ color: "hsl(var(--accent))" }}
    >
      CLI
    </p>
    <h1>Command Line Interface</h1>
    <p>
      The Sirou CLI is a powerful tool for managing your route schema,
      validating types, and generating documentation.
    </p>

    <h2 id="installation">Installation</h2>
    <p>Install the CLI globally or as a dev dependency in your project.</p>
    <CodeBlock language="bash" code="npm install -g @sirou/cli" />

    <h2 id="commands">Commands</h2>

    <h3 id="init">sirou init</h3>
    <p>
      Initializes a new `routes.ts` file in your current directory with a
      standard template.
    </p>
    <CodeBlock language="bash" code="sirou init" />

    <h3 id="validate">sirou validate</h3>
    <p>
      Validates your route schema for syntax errors and consistency. It ensures
      no duplicate paths or missing parameters.
    </p>
    <CodeBlock language="bash" code="sirou validate" />

    <h3 id="export">sirou export</h3>
    <p>
      Exports your route schema to a static JSON file. This is useful for
      sharing your schema with non-TypeScript systems.
    </p>
    <CodeBlock language="bash" code="sirou export --output routes.json" />

    <h3 id="docs">sirou docs</h3>
    <p>
      Generates a professional Documentation Portal (like this one) from your
      route schema and any markdown files in the `docs` folder.
    </p>
    <CodeBlock language="bash" code="sirou docs --output docs.html" />

    <h2 id="advanced-usage">Advanced Usage</h2>
    <p>
      Pass custom file paths if your routes are not in the default location.
    </p>
    <CodeBlock
      language="bash"
      code="sirou validate --file src/navigation/schema.ts"
    />
  </div>
);

export default CLIDocPage;
