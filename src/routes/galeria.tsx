import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { galleryImages } from "@/data/tourism-data";

export const Route = createFileRoute("/galeria")({
  head: () => ({ meta: [{ title: "Galeria | São Gonçalo do Rio Abaixo" }] }),
  component: GaleriaPage,
});

const cats = ["Todos", "Natureza", "Arquitetura", "Gastronomia", "Vida Local"];

function GaleriaPage() {
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const filtered = filter === "Todos" ? galleryImages : galleryImages.filter((g) => g.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <header className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Visual</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Galeria</h1>
      </header>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm border transition ${filter === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((g, i) => (
          <button key={g.id} onClick={() => setLightbox(g.src)}
            className="block w-full break-inside-avoid rounded-xl overflow-hidden group relative">
            <img src={g.src} alt={g.title} loading="lazy"
              className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${i % 3 === 0 ? "aspect-[3/4]" : i % 2 === 0 ? "aspect-square" : "aspect-[4/3]"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
              <span className="text-cream text-sm font-medium">{g.title}</span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-forest-deep/95 backdrop-blur flex items-center justify-center p-4">
          <button className="absolute top-4 right-4 text-cream"><X className="w-8 h-8" /></button>
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
