import React from "react";

const RoadmapPage: React.FC = () => (
  <div className="doc-prose">
    <h1>Roadmap</h1>
    <p>
      My goal is to make Sirou the standard for universal routing in the
      TypeScript ecosystem. Here is what I am working on:
    </p>

    <h2 id="q1-2026">Q1 2026: The Stability Phase (Current)</h2>
    <ul>
      <li>
        <strong>Universal Core</strong>: Stable Radix Trie matcher.
      </li>
      <li>
        <strong>React & Next.js Adapters</strong>: Production-ready hooks and
        components.
      </li>
      <li>
        <strong>Data Loaders</strong>: Fully integrated data lifecycle.
      </li>
      <li>
        <strong>CLI Portal</strong>: Interactive route reference generator.
      </li>
    </ul>

    <h2 id="q2-2026">Q2 2026: Ecosystem Expansion</h2>
    <ul>
      <li>
        <strong>Zod Integration</strong>: Native support for Zod schemas in{" "}
        <code>params</code> for runtime validation.
      </li>
      <li>
        <strong>Internationalization (i18n)</strong>: Automatic path prefixing
        based on user locale.
      </li>
      <li>
        <strong>React Native Navigation V7 Support</strong>: Aligning with the
        latest mobile navigation standards.
      </li>
    </ul>

    <p>Want to contribute? Check out the contribution guide on GitHub.</p>
  </div>
);

export default RoadmapPage;
