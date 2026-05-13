import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { historicalTimeline } from "@/data/tourism-data";

export const Route = createFileRoute("/historia")({
  head: () => ({ meta: [{ title: "História | São Gonçalo do Rio Abaixo" }] }),
  component: HistoriaPage,
});

function HistoriaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
      <header className="text-center mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Patrimônio</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Nossa História</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Mais de três séculos de mineiridade, fé, café e Mata Atlântica.
        </p>
      </header>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
        {historicalTimeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative md:grid md:grid-cols-2 gap-12 mb-12 ${i % 2 === 0 ? "" : "md:[&>:first-child]:order-2"}`}
          >
            <div className={`md:text-${i % 2 === 0 ? "right" : "left"}`}>
              <div className="font-display text-6xl text-accent font-bold">{item.year}</div>
              <h3 className="font-display text-2xl mt-2">{item.title}</h3>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
              <p className="text-foreground/90 leading-relaxed">{item.text}</p>
            </div>
            <div className="absolute left-1/2 top-6 w-4 h-4 bg-accent rounded-full -translate-x-1/2 hidden md:block ring-4 ring-background" />
          </motion.div>
        ))}
      </div>

      <section className="mt-20 grid md:grid-cols-3 gap-6">
        {[
          { title: "Tradições", text: "Catira, modas de viola, folias de reis e o cururu mineiro mantêm vivas as raízes da cidade." },
          { title: "Culinária", text: "Tutu de feijão, frango com quiabo, pão de queijo e doces de tacho — fogão a lenha como herança." },
          { title: "Artesanato", text: "Cestaria de taquara, tecelagem em algodão e cerâmica utilitária produzidas por mestres locais." },
        ].map((c) => (
          <div key={c.title} className="bg-secondary rounded-2xl p-6">
            <h4 className="font-display text-2xl text-primary mb-2">{c.title}</h4>
            <p className="text-sm text-foreground/80 leading-relaxed">{c.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
