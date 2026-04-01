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

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    let frameId = 0;

    const setIfChanged = (nextIds: string[]) => {
      setActiveIds((prev) => (areSameIds(prev, nextIds) ? prev : nextIds));
    };

    const updateActive = () => {
      const vh = window.innerHeight;
      const topThreshold = vh * 0.2; // 20% from top
      const bottomThreshold = vh * 0.6; // 70% from top

      const visible = headingElements
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          // Is the heading within the middle-ish region of the screen?
          return rect.top >= topThreshold && rect.top <= bottomThreshold;
        })
        .map((el) => el.id);

      if (visible.length > 0) {
        setIfChanged(visible);
      } else {
        // Fallback: finding the latest heading above the top threshold
        const positions = headingElements.map((el) => ({
          id: el.id,
          top: el.getBoundingClientRect().top,
        }));

        const latestAbove = positions
          .filter((p) => p.top < topThreshold)
          .sort((a, b) => b.top - a.top)[0];

        setIfChanged(latestAbove ? [latestAbove.id] : []);
      }
    };

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        updateActive();
        frameId = 0;
      });
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-24 w-52 shrink-0 self-start">
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
