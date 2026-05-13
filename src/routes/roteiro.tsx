import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Sparkles, Users, Clock, Heart, ChevronRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/roteiro")({
  head: () => ({ meta: [{ title: "Monte seu Roteiro com IA | São Gonçalo do Rio Abaixo" }] }),
  component: RoteiroPage,
});

const profiles = [
  { id: "familia", label: "Família", icon: Users },
  { id: "casal", label: "Casal", icon: Heart },
  { id: "aventureiro", label: "Aventureiro", icon: Sparkles },
  { id: "cultural", label: "Cultural", icon: Leaf },
];
const durations = ["1 dia", "Fim de semana", "1 semana"];
const interests = ["Cachoeiras", "Patrimônio", "Gastronomia", "Trilhas", "Fotografia", "Religioso"];

function RoteiroPage() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [picks, setPicks] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  function togglePick(i: string) {
    setPicks((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  }

  async function generate() {
    const prompt = `Monte um roteiro detalhado de turismo em São Gonçalo do Rio Abaixo - MG.
Perfil: ${profile}
Duração: ${duration}
Interesses: ${picks.join(", ") || "variados"}.

Organize por dia, com horários sugeridos, pontos turísticos específicos da cidade, sugestões de restaurantes, dicas práticas e estimativa de custos. Use markdown com títulos e listas.`;
    setGenerated(true);
    await sendMessage({ text: prompt });
  }

  const aiText = messages.filter((m) => m.role === "assistant").map((m) => m.parts.map((p) => p.type === "text" ? p.text : "").join("")).join("\n\n");
  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
      <header className="text-center mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-terracotta">Personalizado</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">Monte seu Roteiro</h1>
        <p className="text-muted-foreground mt-3">Em 3 passos, a Gonça cria uma viagem sob medida.</p>
      </header>

      {!generated && (
        <div className="bg-card border border-border rounded-2xl p-8 shadow-soft">
          <Stepper step={step} />

          {step === 0 && (
            <Section title="Quem está viajando?">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profiles.map((p) => (
                  <button key={p.id} onClick={() => setProfile(p.label)}
                    className={`p-4 rounded-xl border transition ${profile === p.label ? "border-accent bg-secondary" : "border-border hover:bg-secondary"}`}>
                    <p.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">{p.label}</div>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {step === 1 && (
            <Section title="Quanto tempo você tem?">
              <div className="grid grid-cols-3 gap-3">
                {durations.map((d) => (
                  <button key={d} onClick={() => setDuration(d)}
                    className={`p-4 rounded-xl border transition ${duration === d ? "border-accent bg-secondary" : "border-border hover:bg-secondary"}`}>
                    <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-medium">{d}</div>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {step === 2 && (
            <Section title="O que mais te interessa?">
              <div className="flex flex-wrap gap-2">
                {interests.map((i) => (
                  <button key={i} onClick={() => togglePick(i)}
                    className={`px-4 py-2 rounded-full border text-sm transition ${picks.includes(i) ? "bg-accent text-accent-foreground border-accent" : "bg-card border-border hover:bg-secondary"}`}>
                    {i}
                  </button>
                ))}
              </div>
            </Section>
          )}

          <div className="flex justify-between mt-8">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
              className="px-5 py-2 rounded-full border border-border disabled:opacity-30">Voltar</button>
            {step < 2 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={(step === 0 && !profile) || (step === 1 && !duration)}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground disabled:opacity-30 inline-flex items-center gap-2">
                Próximo <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={generate}
                className="px-6 py-2 rounded-full bg-accent text-accent-foreground inline-flex items-center gap-2 shadow-soft">
                <Sparkles className="w-4 h-4" /> Gerar com IA
              </button>
            )}
          </div>
        </div>
      )}

      {generated && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full gradient-forest flex items-center justify-center">
              <Leaf className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="font-display text-2xl">Seu roteiro pela Gonça</h2>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{profile} · {duration}</p>
            </div>
          </div>
          {isLoading && !aiText && <p className="text-muted-foreground italic">Gonça está montando seu roteiro...</p>}
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground leading-relaxed">{aiText}</div>
          <button onClick={() => { setGenerated(false); setStep(0); }} className="mt-6 text-accent text-sm font-medium hover:underline">
            ← Refazer roteiro
          </button>
        </motion.div>
      )}
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= step ? "bg-accent" : "bg-border"}`} />
      ))}
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-5">{title}</h2>
      {children}
    </div>
  );
}
