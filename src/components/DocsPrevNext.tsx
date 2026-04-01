import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const flatPages = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Quick Start", href: "/docs/quick-start" },
  { title: "Radix Trie", href: "/docs/core/radix-trie" },
  { title: "Navigation Lifecycle", href: "/docs/core/navigation-lifecycle" },
  { title: "Headless Engine", href: "/docs/core/headless-engine" },
  { title: "Logic Guards", href: "/docs/features/logic-guards" },
  { title: "Data Loaders", href: "/docs/features/data-loaders" },
  { title: "React", href: "/docs/adapters/react" },
  { title: "Next.js", href: "/docs/adapters/nextjs" },
  { title: "Svelte", href: "/docs/adapters/svelte" },
  { title: "React Native", href: "/docs/adapters/react-native" },
  { title: "TypeScript Mastery", href: "/docs/advanced/typescript" },
  { title: "Advanced Patterns", href: "/docs/advanced/patterns" },
  { title: "Comparison", href: "/docs/advanced/comparison" },
  { title: "Migration Guide", href: "/docs/advanced/migration" },
  { title: "Roadmap", href: "/docs/roadmap" },
];

const DocsPrevNext: React.FC = () => {
  const location = useLocation();
  const currentIndex = flatPages.findIndex((p) => p.href === location.pathname);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? flatPages[currentIndex - 1] : null;
  const next = currentIndex < flatPages.length - 1 ? flatPages[currentIndex + 1] : null;

  return (
    <div className="flex items-stretch gap-3 mt-16 pt-6 border-t">
      {prev ? (
        <Link
          to={prev.href}
          className="flex-1 group flex items-center gap-3 rounded-lg border px-4 py-3 hover:border-accent/40 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Previous</p>
            <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{prev.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          to={next.href}
          className="flex-1 group flex items-center justify-end gap-3 rounded-lg border px-4 py-3 hover:border-accent/40 transition-colors text-right"
        >
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Next</p>
            <p className="text-sm font-medium truncate group-hover:text-accent transition-colors">{next.title}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
};

export default DocsPrevNext;
