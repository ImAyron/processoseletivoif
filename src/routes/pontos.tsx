import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { TourismCard } from "@/components/TourismCard";
import { touristicPoints, categoryMeta, type Category } from "@/data/tourism-data";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/pontos")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Pontos Turísticos | São Gonçalo do Rio Abaixo" }] }),
  component: PontosPage,
});

function PontosPage() {
  const search = useSearch({ from: "/pontos" });
  const [filter, setFilter] = useState<string>(search.category ?? "todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return touristicPoints.filter((p) => {
      const matchCat = filter === "todos" || p.category === filter;
      const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.join(" ").includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [filter, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <header className="mb-10 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Explore</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Pontos Turísticos</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          {touristicPoints.length} experiências em natureza, patrimônio, gastronomia e cultura.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome ou tag..."
          className="flex-1 px-4 py-2.5 rounded-full border border-border bg-card outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter("todos")}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === "todos" ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"}`}
        >Todos</button>
        {(Object.entries(categoryMeta) as [Category, typeof categoryMeta[Category]][]).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === key ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"}`}
          >
            {meta.emoji} {meta.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => <TourismCard key={p.id} point={p} index={i} />)}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">Nenhum ponto encontrado.</p>
      )}
    </div>
  );
}
