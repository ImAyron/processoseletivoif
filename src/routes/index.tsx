import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search, Sparkles, MapPin, Calendar, MessageCircle } from "lucide-react";
import { heroImage, touristicPoints, testimonials, categoryMeta } from "@/data/tourism-data";
import { TourismCard } from "@/components/TourismCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "São Gonçalo do Rio Abaixo - MG | Turismo, Natureza e Cultura" },
      { name: "description", content: "Cachoeiras, patrimônio barroco, gastronomia mineira e experiências sustentáveis a 90km de Belo Horizonte." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = touristicPoints.slice(0, 6);
  return (
    <>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={heroImage} alt="Cachoeira em São Gonçalo do Rio Abaixo" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-transparent to-forest-deep/70" />

        <div className="relative max-w-5xl mx-auto px-6 text-center text-cream z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-gold mb-6"
          >
            Minas Gerais · Vale do Aço
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] text-balance"
          >
            Descubra <em className="text-gold not-italic">São Gonçalo</em><br />do Rio Abaixo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-cream/90 max-w-2xl mx-auto text-balance"
          >
            Natureza, História e Experiências Únicas no Coração de Minas Gerais
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/pontos" className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-medium shadow-elevated hover:scale-105 transition">
              Explorar agora <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/roteiro" className="inline-flex items-center gap-2 bg-cream/15 backdrop-blur text-cream border border-cream/30 px-8 py-4 rounded-full font-medium hover:bg-cream/25 transition">
              <Sparkles className="w-4 h-4" /> Criar roteiro com IA
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className="mt-14 max-w-xl mx-auto bg-cream/95 backdrop-blur rounded-full p-2 flex items-center gap-2 shadow-elevated"
          >
            <Search className="w-5 h-5 text-forest-deep ml-3" />
            <input
              placeholder="O que você quer descobrir?"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2"
            />
            <Link to="/chat" className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Perguntar à Gonça</Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Por categoria</span>
          <h2 className="font-display text-4xl md:text-5xl mt-3">O que te chama hoje?</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(categoryMeta).map(([key, meta]) => (
            <Link
              key={key}
              to="/pontos"
              search={{ category: key }}
              className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <div className="text-4xl mb-2">{meta.emoji}</div>
              <div className="font-display text-base text-primary group-hover:text-accent transition">{meta.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED POINTS */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Imperdíveis</span>
              <h2 className="font-display text-4xl md:text-5xl mt-3">Pontos turísticos em destaque</h2>
            </div>
            <Link to="/pontos" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p, i) => <TourismCard key={p.id} point={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: Sparkles, title: "Roteiro com IA", text: "Em 3 passos, monte uma viagem sob medida com a Gonça.", to: "/roteiro" as const, color: "var(--terracotta)" },
          { icon: MapPin, title: "Mapa interativo", text: "Veja todos os pontos no mapa e trace sua rota.", to: "/mapa" as const, color: "var(--forest)" },
          { icon: Calendar, title: "Agenda cultural", text: "Festas, festivais e tradições durante todo o ano.", to: "/agenda" as const, color: "var(--gold)" },
        ].map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={it.to} className="block bg-card border border-border rounded-2xl p-8 hover:shadow-elevated transition-all hover:-translate-y-1 h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-cream" style={{ background: it.color }}>
                <it.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl mb-2">{it.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{it.text}</p>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section className="gradient-forest text-cream py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-gold">Depoimentos</span>
            <h2 className="font-display text-4xl md:text-5xl mt-3">Quem visita, se apaixona</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-cream/10 backdrop-blur p-6 rounded-2xl border border-cream/15"
              >
                <p className="font-display text-lg italic leading-relaxed">"{t.text}"</p>
                <footer className="mt-4 font-mono text-xs text-gold uppercase tracking-wider">— {t.name}, {t.origin}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA CHAT */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="font-display text-4xl md:text-5xl mb-4">Conheça a <em className="text-accent not-italic">Gonça</em></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Sua guia virtual com IA. Tira dúvidas, monta roteiros e conta a história da cidade — 24h por dia.
        </p>
        <Link to="/chat" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-medium shadow-elevated hover:scale-105 transition">
          Começar conversa <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
