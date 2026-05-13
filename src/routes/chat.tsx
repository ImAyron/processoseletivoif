import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Send, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Gonça - Guia Virtual | São Gonçalo do Rio Abaixo" }] }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Quero criar um roteiro de fim de semana",
  "Quais são os melhores pontos para família?",
  "Onde comer comida mineira de verdade?",
  "Conte a história da cidade",
];

function ChatPage() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const isLoading = status === "submitted" || status === "streaming";

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    await sendMessage({ text });
  }

  async function handleSuggestion(text: string) {
    if (isLoading) return;
    await sendMessage({ text });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 flex flex-col" style={{ minHeight: "calc(100vh - 4rem)" }}>
      <header className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-forest mb-4 shadow-elevated">
          <Leaf className="w-8 h-8 text-gold" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl">Olá, sou a <em className="text-accent not-italic">Gonça</em></h1>
        <p className="text-muted-foreground mt-2">Sua guia virtual de São Gonçalo do Rio Abaixo</p>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-6 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="text-muted-foreground mb-4">Sobre o que você quer saber?</p>
            <div className="grid sm:grid-cols-2 gap-2 max-w-xl mx-auto">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="text-left text-sm bg-card border border-border rounded-xl p-3 hover:border-accent hover:bg-secondary transition"
                >{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          if (m.role === "user") {
            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                <div className="max-w-[80%] bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-br-sm">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{text}</p>
                </div>
              </motion.div>
            );
          }
          return (
            <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-forest flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4 text-gold" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>
              </div>
            </motion.div>
          );
        })}

        {status === "submitted" && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full gradient-forest flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-gold animate-pulse" />
            </div>
            <p className="pt-2 text-muted-foreground italic">Gonça está pensando...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-2 flex gap-2 shadow-soft sticky bottom-4">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSubmit(e); }}
          placeholder="Pergunte algo à Gonça..."
          rows={1}
          className="flex-1 bg-transparent outline-none px-3 py-2 resize-none text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-accent text-accent-foreground w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
