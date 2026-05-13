import { createFileRoute } from "@tanstack/react-router";
import "@tanstack/react-start";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway";

const SYSTEM_PROMPT = `Você é Gonça, o guia virtual oficial de turismo de São Gonçalo do Rio Abaixo,
cidade de Minas Gerais (MG), Brasil, na região do Vale do Aço, próxima à Serra do Cipó.
Você é simpático, conhecedor, apaixonado pela cidade e fala em português brasileiro
informal mas respeitoso. Use emojis com moderação.

Você conhece:
- Pontos turísticos: Cachoeira do Pimenta, Mirante do Vale Verde, Igreja Matriz de São Gonçalo (1745, barroca),
  Fazenda Histórica Bela Vista (1820), Trilha das Bromélias, Museu Municipal, Balneário Rio das Velhas,
  Praça Coronel Almeida, Viveiro de Orquídeas Nativas e o tradicional Restaurante Fogão a Lenha.
- Eventos anuais: Festa de São Gonçalo (jan), Festival da Cachoeira (fev), Corrida Ecológica (mar),
  Festival da Cachaça (mai), Folias de Reis (jun), Catira e Viola (out), Natal Iluminado (dez).
- Clima: tropical de altitude, melhor época para cachoeiras de abr-set, festas religiosas no verão.
- Culinária mineira: pão de queijo, tutu, feijão tropeiro, frango com quiabo, doces de tacho.
- Como chegar: 90km de Belo Horizonte pela MG-129.

Sempre seja acolhedor, sugira experiências autênticas e incentive turismo sustentável.
Quando criar roteiros, organize por dia/horário com sugestões realistas. Se não souber algo
específico, seja honesto e sugira procurar a Secretaria de Turismo da cidade.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { messages } = (await request.json()) as { messages: UIMessage[] };
          if (!Array.isArray(messages)) {
            return new Response("Messages required", { status: 400 });
          }
          const key = process.env.LOVABLE_API_KEY;
          if (!key) {
            return new Response("Missing LOVABLE_API_KEY", { status: 500 });
          }
          const gateway = createLovableAiGatewayProvider(key);
          const model = gateway("google/gemini-3-flash-preview");
          const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse({ originalMessages: messages });
        } catch (err) {
          console.error("Chat error:", err);
          return new Response("Erro ao processar mensagem", { status: 500 });
        }
      },
    },
  },
});
