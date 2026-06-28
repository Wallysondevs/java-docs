import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  GraduationCap, BookText, Cpu, Wrench, ChevronRight, ChevronDown,
  Coffee, X, Search, FileText,
} from "lucide-react";
import manifest from "@/manifest.json";

const ICONS: Record<string, any> = { GraduationCap, BookText, Cpu, Wrench };

interface NavItem { path: string; label: string; }
interface NavGroup { label: string; items: NavItem[]; }
interface NavSection { id: string; label: string; icon: string; groups: NavGroup[]; }

const SECTIONS = (manifest as any).sections as NavSection[];

interface SidebarProps { isOpen: boolean; setIsOpen: (o: boolean) => void; }

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  const [query, setQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => Object.fromEntries(SECTIONS.map((s) => [s.id, s.id === "tutorials"]))
  );

  const current = decodeURIComponent(location.replace(/^\/doc\//, ""));

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const results: { section: string; item: NavItem }[] = [];
    for (const sec of SECTIONS) {
      for (const g of sec.groups) {
        for (const it of g.items) {
          if (it.label.toLowerCase().includes(q) || it.path.toLowerCase().includes(q)) {
            results.push({ section: sec.label, item: it });
          }
        }
      }
    }
    return results.slice(0, 60);
  }, [query]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-72 z-50 overflow-y-auto transition-transform duration-300 border-r border-[hsl(var(--nix-blue))]/15",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: "hsl(var(--nix-bg))" }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 border-b border-white/5 sticky top-0 z-10"
          style={{ background: "hsl(var(--nix-bg-2))" }}
        >
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 min-w-0">
            <Coffee className="w-7 h-7 text-[hsl(var(--nix-orange))] flex-shrink-0" />
            <div className="min-w-0">
              <h1 className="font-mono font-bold text-sm text-[hsl(var(--nix-blue))] leading-tight">Java 25 Docs</h1>
              <p className="text-[10px] text-[hsl(var(--nix-dim))] font-mono leading-tight">Documentacao Oficial — PT-BR</p>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded text-gray-400 hover:text-white hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-3 py-3 sticky top-[57px] z-10" style={{ background: "hsl(var(--nix-bg))" }}>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--nix-dim))]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar na documentacao..."
              className="w-full bg-[hsl(var(--nix-bg-2))] border border-white/10 rounded-md pl-8 pr-2 py-1.5 text-[12px] font-mono text-[hsl(var(--nix-fg))] placeholder:text-[hsl(var(--nix-dim))] focus:outline-none focus:border-[hsl(var(--nix-blue))]/50"
            />
          </div>
        </div>

        <nav className="px-3 pb-8 space-y-1">
          {filtered ? (
            <div className="space-y-0.5">
              <p className="text-[10px] font-mono text-[hsl(var(--nix-dim))] px-2 mb-2">
                {filtered.length} resultado(s)
              </p>
              {filtered.map(({ section, item }) => {
                const active = current === item.path;
                return (
                  <Link
                    key={item.path}
                    href={`/doc/${item.path}`}
                    onClick={() => { setIsOpen(false); }}
                    className={cn(
                      "flex flex-col gap-0.5 px-2 py-1.5 rounded-md text-[13px] font-mono transition-colors",
                      active
                        ? "bg-[hsl(var(--nix-blue))]/15 text-[hsl(var(--nix-blue))]"
                        : "text-[hsl(var(--nix-fg))]/75 hover:text-[hsl(var(--nix-blue))] hover:bg-white/5"
                    )}
                  >
                    <span className="leading-tight">{item.label}</span>
                    <span className="text-[9px] text-[hsl(var(--nix-dim))]">{section}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            SECTIONS.map((sec) => {
              const Icon = ICONS[sec.icon] || FileText;
              const expanded = openSections[sec.id];
              return (
                <div key={sec.id}>
                  <button
                    onClick={() => setOpenSections((s) => ({ ...s, [sec.id]: !s[sec.id] }))}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-[12px] font-mono font-semibold text-[hsl(var(--nix-blue))] hover:bg-white/5 transition-colors"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 text-[hsl(var(--nix-orange))]" />
                    <span className="flex-1 text-left leading-tight">{sec.label}</span>
                    {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                  {expanded && (
                    <div className="ml-2 mt-0.5 border-l border-white/5 pl-2 space-y-2">
                      {sec.groups.map((g) => (
                        <div key={g.label}>
                          <h3 className="text-[10px] font-mono uppercase tracking-wider text-[hsl(var(--nix-purple))]/80 px-2 mt-2 mb-1">
                            {g.label}
                          </h3>
                          <ul className="space-y-0.5">
                            {g.items.map((item) => {
                              const active = current === item.path;
                              return (
                                <li key={item.path}>
                                  <Link
                                    href={`/doc/${item.path}`}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "flex items-center gap-1.5 px-2 py-1 rounded-md text-[12.5px] font-mono transition-colors",
                                      active
                                        ? "bg-[hsl(var(--nix-blue))]/15 text-[hsl(var(--nix-blue))] font-semibold"
                                        : "text-[hsl(var(--nix-fg))]/70 hover:text-[hsl(var(--nix-blue))] hover:bg-white/5"
                                    )}
                                  >
                                    {active && (
                                      <ChevronRight className="w-3 h-3 flex-shrink-0 text-[hsl(var(--nix-purple))]" />
                                    )}
                                    <span className="flex-1 leading-tight">{item.label}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </nav>

        <div
          className="px-4 py-3 border-t border-white/5 font-mono text-[10px] sticky bottom-0"
          style={{ background: "hsl(var(--nix-bg-2))" }}
        >
          <p className="text-[hsl(var(--nix-dim))] m-0">
            <span className="text-[hsl(var(--nix-green))]">●</span> {(manifest as any).total} paginas traduzidas
          </p>
          <p className="text-[hsl(var(--nix-dim))] m-0">
            <span className="text-[hsl(var(--nix-blue))]">$</span> JLS + JVMS + Tutoriais + Guias
          </p>
        </div>
      </aside>
    </>
  );
}
