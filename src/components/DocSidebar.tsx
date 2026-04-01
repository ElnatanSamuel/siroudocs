import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronRight,
  BookOpen,
  Zap,
  Layers,
  Compass,
  FileCode,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  href: string;
}
export interface NavGroup {
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    label: "Core",
    icon: Zap,
    items: [
      { title: "Radix Trie", href: "/docs/core/radix-trie" },
      {
        title: "Navigation Lifecycle",
        href: "/docs/core/navigation-lifecycle",
      },
      { title: "Headless Engine", href: "/docs/core/headless-engine" },
    ],
  },
  {
    label: "Features",
    icon: Compass,
    items: [
      { title: "Logic Guards", href: "/docs/features/logic-guards" },
      { title: "Data Loaders", href: "/docs/features/data-loaders" },
    ],
  },
  {
    label: "Adapters",
    icon: Layers,
    items: [
      { title: "React", href: "/docs/adapters/react" },
      { title: "Next.js", href: "/docs/adapters/nextjs" },
      { title: "Svelte", href: "/docs/adapters/svelte" },
      { title: "React Native", href: "/docs/adapters/react-native" },
    ],
  },
  {
    label: "Advanced",
    icon: FileCode,
    items: [
      { title: "TypeScript Mastery", href: "/docs/advanced/typescript" },
      { title: "Advanced Patterns", href: "/docs/advanced/patterns" },
      { title: "Comparison", href: "/docs/advanced/comparison" },
      { title: "Migration Guide", href: "/docs/advanced/migration" },
    ],
  },
  {
    label: "Project",
    icon: Map,
    items: [{ title: "Roadmap", href: "/docs/roadmap" }],
  },
];

interface DocSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DocSidebar: React.FC<DocSidebarProps> = ({ isOpen, onToggle }) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    "Getting Started",
  );
  const toggleGroup = (label: string) => {
    setExpandedGroup((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={cn(
          "fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-60 bg-sidebar overflow-y-auto transition-transform duration-200 lg:sticky lg:top-14 lg:translate-x-0 lg:shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ borderRight: "1px solid hsl(var(--border) / 0.3)" }}
      >
        <div className="p-3 space-y-0.5">
          {navigation.map((group) => {
            const isExpanded = expandedGroup === group.label;
            const Icon = group.icon;
            return (
              <div key={group.label} className="mb-1">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="flex items-center w-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground hover:text-foreground transition-colors"
                >
                  <ChevronRight
                    className={cn(
                      "h-3 w-3 mr-1 transition-transform duration-150",
                      isExpanded && "rotate-90",
                    )}
                  />
                  <Icon className="h-3 w-3 mr-1.5 opacity-60" />
                  {group.label}
                </button>
                {isExpanded && (
                  <div className="ml-[18px] border-l pl-2 space-y-0.5 mt-0.5">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.href}
                        to={item.href}
                        end
                        className={({ isActive }) =>
                          cn(
                            "block px-2 py-1 text-[13px] rounded-md transition-colors",
                            isActive
                              ? "bg-accent/10 font-medium"
                              : "text-foreground hover:text-foreground hover:bg-muted",
                          )
                        }
                        style={({ isActive }) =>
                          isActive ? { color: "hsl(var(--accent))" } : {}
                        }
                        onClick={() => {
                          if (window.innerWidth < 1024) onToggle();
                        }}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default DocSidebar;
