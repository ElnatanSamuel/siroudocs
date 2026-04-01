import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const areSameIds = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id, index) => id === b[index]);

const TableOfContents: React.FC = () => {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const collectHeadings = () => {
      const prose = document.querySelector(".doc-prose");
      if (!prose) return;

      const elements = prose.querySelectorAll("h2, h3");
      const items: TocItem[] = [];
      const idCounts = new Map<string, number>();

      elements.forEach((el, index) => {
        const text = el.textContent?.trim() || "";
        const baseId =
          text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || `section-${index + 1}`;

        const count = idCounts.get(baseId) ?? 0;
        idCounts.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

        el.id = id;
        items.push({
          id,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        });
      });

      setHeadings(items);
    };

    const timer = setTimeout(collectHeadings, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    setActiveIds([]);
  }, [location.pathname]);

  const visibleIdsRef = React.useRef<Set<string>>(new Set());

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIdsRef.current.add(entry.target.id);
          } else {
            visibleIdsRef.current.delete(entry.target.id);
          }
        });

        const nextIds = headings
          .filter((h) => visibleIdsRef.current.has(h.id))
          .map((h) => h.id);

        if (nextIds.length > 0) {
          setActiveIds((prev) => (areSameIds(prev, nextIds) ? prev : nextIds));
        }
      },
      {
        // Highlight when they are in the upper half of the screen
        rootMargin: "-10% 0% -45% 0%",
        threshold: 0,
      },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Handle bottom of page fallback
    const scrollContainer = document.querySelector("main.flex-1");
    const handleScroll = () => {
      if (!scrollContainer) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      // If we're at the very bottom, highlight the last item
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 20) {
        const lastId = headings[headings.length - 1].id;
        setActiveIds([lastId]);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      observer.disconnect();
      visibleIdsRef.current.clear();
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-0 w-52 shrink-0 h-full overflow-y-auto px-4 border-l">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="space-y-1 border-l">
        {headings.map((h) => {
          const isActive = activeIds.includes(h.id);
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(h.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "block text-[13px] py-0.5 transition-colors border-l -ml-px",
                  h.level === 3 ? "pl-6" : "pl-3",
                  isActive
                    ? "border-accent text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
