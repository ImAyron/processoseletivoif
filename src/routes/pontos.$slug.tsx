import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Star, MapPin, Clock, Ticket, Lightbulb, ArrowLeft, Sparkles } from "lucide-react";
import { touristicPoints, categoryMeta } from "@/data/tourism-data";

export const Route = createFileRoute("/pontos/$slug")({
  loader: ({ params }) => {
    const point = touristicPoints.find((p) => p.slug === params.slug);
    if (!point) throw notFound();
    return { point };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.point.name} | São Gonçalo do Rio Abaixo` }],
  }),
  notFoundComponent: () => (
    <div className="text-center py-24">
      <h1 className="font-display text-3xl">Ponto não encontrado</h1>
      <Link to="/pontos" className="text-accent mt-4 inline-block">Voltar</Link>
    </div>
  ),
  component: DetailPage,
});

function DetailPage() {
  const { point } = Route.useLoaderData();
  const meta = categoryMeta[point.category];
  const nearby = touristicPoints.filter((p) => p.id !== point.id).slice(0, 3);

  return (
    <article>
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={point.image} alt={point.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 lg:px-8 pb-12 text-cream w-full">
            <Link to="/pontos" className="inline-flex items-center gap-2 text-cream/80 hover:text-cream mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" /> Todos os pontos
            </Link>
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-gold mb-3">{meta.emoji} {meta.label}</span>
            <h1 className="font-display text-5xl md:text-7xl font-semibold">{point.name}</h1>
            <div className="flex items-center gap-1 mt-3 text-gold">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-mono">{point.rating} / 5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-foreground/90">{point.longDescription}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {point.tags.map((t) => (
              <span key={t} className="text-xs font-mono text-forest bg-secondary px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>

          <h2 className="font-display text-3xl mt-12 mb-6">Atrações próximas</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nearby.map((p) => (
              <Link key={p.id} to="/pontos/$slug" params={{ slug: p.slug }} className="block group">
                <div className="aspect-square rounded-xl overflow-hidden mb-2">
                  <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-sm font-medium group-hover:text-accent transition">{p.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-soft">
            <InfoRow icon={Clock} label="Horários" value={point.hours} />
            <InfoRow icon={Ticket} label="Ingresso" value={point.ticket} />
            <InfoRow icon={MapPin} label="Como chegar" value={point.howToGet} />
            <InfoRow icon={Lightbulb} label="Dica" value={point.tips} />
          </div>
          <Link to="/roteiro" className="w-full inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-full font-medium hover:opacity-90 transition">
            <Sparkles className="w-4 h-4" /> Gerar roteiro com IA
          </Link>
          <Link to="/mapa" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium hover:opacity-90 transition">
            <MapPin className="w-4 h-4" /> Ver no mapa
          </Link>
        </aside>
      </div>
    </article>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}
