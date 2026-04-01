import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, Github, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import DocSidebar from "./DocSidebar";
import TableOfContents from "./TableOfContents";
import DocsPrevNext from "./DocsPrevNext";
import Search from "./Search";

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
      <Link to="/" className="hover:text-foreground transition-colors">
        home
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const isDocs = name === "docs";
        const displayName = name.replace(/-/g, " ");

        return (
          <React.Fragment key={name}>
            <span className="opacity-40">/</span>
            {isLast ? (
              <span className="text-foreground capitalize">{displayName}</span>
            ) : isDocs ? (
              <Link
                to={routeTo}
                className="hover:text-foreground transition-colors capitalize"
              >
                {displayName}
              </Link>
            ) : (
              <span className="capitalize">{displayName}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

const DocsLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <header
        className="sticky top-0 z-50 h-14 bg-background/80 backdrop-blur-xl"
        style={{ borderBottom: "1px solid hsl(var(--border) / 0.4)" }}
      >
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 flex items-center justify-center">
                <img
                  src="/image/sirouwhite.png"
                  alt="sirou"
                  className="h-6 w-auto hidden dark:block"
                />
                <img
                  src="/image/siroublack.png"
                  alt="sirou"
                  className="h-6 w-auto block dark:hidden"
                />
              </div>
            </Link>
            <span className="hidden sm:inline-block text-[10px] font-mono bg-muted px-2 py-0.5 rounded-md text-muted-foreground">
              docs
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Search />
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a
                href="https://github.com/ElnatanSamuel/simple-api"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <DocSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(false)}
        />
        <main className="flex-1 h-full overflow-y-auto min-w-0">
          <div className="flex w-full min-h-full">
            <div className="flex-1 py-4 px-4 sm:px-8 lg:pl-10 lg:pr-10">
              <div className="w-full max-w-6xl">
                <Breadcrumbs />
                <Outlet key={location.pathname} />
                <DocsPrevNext />
              </div>
            </div>
            <div className="hidden xl:block w-64 pr-8 py-10 shrink-0 h-full overflow-y-auto sticky top-0">
              <TableOfContents key={location.pathname} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
