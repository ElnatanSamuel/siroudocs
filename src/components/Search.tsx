import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "cmdk";
import { Search as SearchIcon, FileText, CornerDownLeft } from "lucide-react";
import { navigation } from "./DocSidebar";
import { cn } from "@/lib/utils";

export const Search: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md border bg-muted/50 text-muted-foreground text-sm w-52 hover:bg-muted/80 transition-colors"
      >
        <SearchIcon className="h-3.5 w-3.5 shrink-0" />
        <span className="text-xs">Search docs...</span>
        <kbd className="ml-auto text-[10px] font-mono bg-background px-1.5 py-0.5 rounded border">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Search"
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] p-4 bg-background/40 backdrop-blur-sm"
      >
        <div className="w-full max-w-[640px] bg-card rounded-xl border shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="flex items-center border-b px-4 py-3">
            <SearchIcon className="mr-3 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              placeholder="Search documentation..."
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm">
              No results found.
            </Command.Empty>
            {navigation.map((group) => (
              <Command.Group
                key={group.label}
                heading={
                  <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </div>
                }
              >
                {group.items.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.href}
                    onSelect={() => onSelect(item.href)}
                    className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-foreground outline-none aria-selected:bg-accent/10 aria-selected:text-foreground transition-colors"
                  >
                    <FileText className="mr-2.5 h-4 w-4 opacity-50 text-foreground" />
                    <span className="flex-1 text-foreground">{item.title}</span>
                    <CornerDownLeft className="ml-auto h-3.5 w-3.5 opacity-20 text-foreground" />
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
};

export default Search;
