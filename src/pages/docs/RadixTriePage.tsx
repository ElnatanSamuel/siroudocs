import React from "react";
import CodeBlock from "@/components/CodeBlock";

const RadixTriePage: React.FC = () => {
  return (
    <div className="doc-prose">
      <h1>Radix Trie</h1>
      <p>
        Sirou uses a high performance Radix Trie (prefix tree) for route
        matching. This architecture ensures that matching time is proportional
        to the depth of the path, not the total number of routes in your
        application.
      </p>

      <h2 id="how-it-matches">How it Matches</h2>
      <p>
        Unlike regex based routers that iterate through an array of patterns,
        the Radix Trie traverses a tree structure node by node.
      </p>

      <h2 id="performance">Performance Benchmarks</h2>
      <p>
        In large scale applications with thousands of routes, a Radix Trie
        remains consistently fast, while regex based matching scales linearly
        (O(N)).
      </p>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-semibold">Routes</th>
              <th className="text-left py-2 pr-4 font-semibold">
                Regex Matcher
              </th>
              <th className="text-left py-2 font-semibold">
                Sirou (Radix Trie)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">0.05ms</td>
              <td className="py-2">0.01ms</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">100</td>
              <td className="py-2 pr-4">0.45ms</td>
              <td className="py-2">0.01ms</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">1000</td>
              <td className="py-2 pr-4">4.2ms</td>
              <td className="py-2">0.02ms</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="key-advantages">Key Advantages</h2>

      <h3 id="microsecond-matching">Microsecond Matching</h3>
      <p>
        Even with 10,000+ routes, matching happens in well under 1 millisecond.
      </p>

      <h3 id="deterministic">Deterministic Routing</h3>
      <p>
        No more "route order" bugs. The tree structure naturally handles
        specificity, ensuring the most specific path always wins.
      </p>

      <h3 id="memory-efficient">Memory Efficient</h3>
      <p>
        Common path segments are shared between nodes, reducing the overall
        memory footprint of your router schema.
      </p>
    </div>
  );
};

export default RadixTriePage;
