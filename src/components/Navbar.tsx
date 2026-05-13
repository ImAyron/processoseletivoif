import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/pontos", label: "Pontos Turísticos" },
  { to: "/roteiro", label: "Roteiro" },
  { to: "/mapa", label: "Mapa" },
  { to: "/agenda", label: "Agenda" },
  { to: "/galeria", label: "Galeria" },
  { to: "/historia", label: "História" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full gradient-forest flex items-center justify-center text-cream shadow-soft group-hover:scale-110 transition-transform">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-semibold text-base text-primary">São Gonçalo</div>
            <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">do Rio Abaixo · MG</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-secondary"
              activeProps={{ className: "text-primary bg-secondary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/chat"
            className="ml-2 inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition shadow-soft"
          >
            <MessageCircle className="w-4 h-4" />
            Fale com a Gonça
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <div className={cn("lg:hidden overflow-hidden transition-all", open ? "max-h-96" : "max-h-0")}>
        <div className="px-4 pb-4 flex flex-col gap-1 border-t border-border">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-md text-foreground/90 hover:bg-secondary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/chat"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            Fale com a Gonça
          </Link>
        </div>
      </div>
    </header>
  );
}
