import { Link } from "@tanstack/react-router";
import { Star, MapPin, Plus } from "lucide-react";
import { motion } from "framer-motion";
import type { TouristicPoint } from "@/data/tourism-data";
import { categoryMeta } from "@/data/tourism-data";

export function TourismCard({ point, index = 0 }: { point: TouristicPoint; index?: number }) {
  const meta = categoryMeta[point.category];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all hover:-translate-y-1 border border-border"
    >
      <Link to="/pontos/$slug" params={{ slug: point.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={point.image}
            alt={point.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
          {point.badge && (
            <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full shadow-soft">
              {point.badge}
            </span>
          )}
          <span className="absolute top-3 left-3 bg-cream/95 text-forest-deep text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur">
            {meta.emoji} {meta.label.split(" ")[0]}
          </span>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-xl font-semibold text-foreground leading-tight">{point.name}</h3>
          <div className="flex items-center gap-1 text-gold shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-mono">{point.rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{point.shortDescription}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {point.tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[11px] font-mono text-forest bg-secondary px-2 py-0.5 rounded">{t}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link
            to="/pontos/$slug"
            params={{ slug: point.slug }}
            className="flex-1 text-center text-sm font-medium bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition"
          >
            Ver detalhes
          </Link>
          <Link
            to="/mapa"
            search={{ point: point.slug }}
            className="px-3 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition"
            aria-label="Ver no mapa"
          >
            <MapPin className="w-4 h-4" />
          </Link>
          <Link
            to="/roteiro"
            className="px-3 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition"
            aria-label="Adicionar ao roteiro"
          >
            <Plus className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
