import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { culturalEvents } from "@/data/tourism-data";

export const Route = createFileRoute("/agenda")({
  head: () => ({ meta: [{ title: "Agenda Cultural | São Gonçalo do Rio Abaixo" }] }),
  component: AgendaPage,
});

const cats = ["Todos", "Música", "Gastronomia", "Folclore", "Esporte", "Religioso", "Arte"] as const;

function AgendaPage() {
  const [filter, setFilter] = useState<string>("Todos");
  const filtered = filter === "Todos" ? culturalEvents : culturalEvents.filter((e) => e.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-16">
      <header className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Calendário</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Agenda Cultural</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Festas, festivais e tradições durante todo o ano.</p>
      </header>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === c ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {filtered.map((e, i) => {
          const date = new Date(e.date);
          const day = date.toLocaleDateString("pt-BR", { day: "2-digit" });
          const month = date.toLocaleDateString("pt-BR", { month: "short" }).toUpperCase().replace(".", "");
          return (
            <motion.article key={e.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-2xl p-6 flex gap-5 hover:shadow-soft transition">
              <div className="text-center shrink-0 w-16 bg-gradient-to-b from-terracotta to-gold text-cream rounded-xl p-2">
                <div className="font-display text-3xl font-bold leading-none">{day}</div>
                <div className="text-[10px] font-mono mt-1">{month}</div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent">{e.category}</span>
                <h3 className="font-display text-xl mt-1 mb-1">{e.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{e.description}</p>
                <div className="flex items-center gap-1 text-xs text-foreground/70"><MapPin className="w-3 h-3" /> {e.location}</div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
