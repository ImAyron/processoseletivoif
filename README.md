# Turismo São Gonçalo do Rio Abaixo

> Portal de turismo da cidade de São Gonçalo do Rio Abaixo (MG), com mapa, roteiros e assistente de IA. Desenvolvido para processo seletivo do IF.
> Tourism portal for São Gonçalo do Rio Abaixo (MG, Brazil), featuring a map, itineraries, and an AI assistant. Built for an IF selection process.

---

## 🇧🇷 Português

### Sobre

Aplicação web que apresenta os atrativos turísticos de **São Gonçalo do Rio Abaixo, Minas Gerais**. O visitante navega por pontos turísticos, consulta a agenda de eventos, monta roteiros e tira dúvidas com um assistente de IA.

Os atrativos são organizados em seis categorias:

| Categoria | |
|---|---|
| 🌊 Natureza & Cachoeiras | Cachoeira do Pimenta, Balneário Rio das Velhas |
| 🏛️ Patrimônio Histórico | Igreja Matriz de São Gonçalo, Fazenda Histórica Bela Vista |
| 🍽️ Gastronomia Local | Restaurante Fogão a Lenha |
| 🏕️ Ecoturismo & Aventura | Trilha das Bromélias, Mirante do Vale Verde |
| 🎨 Arte & Cultura | Museu Municipal, Festival da Cachoeira |
| 🌞 Lazer | Praça Coronel Almeida, Viveiro de Orquídeas Nativas |

### Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Página inicial |
| `/pontos` | Lista de pontos turísticos |
| `/pontos/:slug` | Detalhe de um ponto |
| `/mapa` | Mapa interativo |
| `/roteiro` | Montagem de roteiros |
| `/agenda` | Calendário de eventos e festas |
| `/galeria` | Galeria de imagens |
| `/historia` | História da cidade |
| `/chat` | Assistente de IA |

### Stack

- **Framework:** TanStack Start (React + TanStack Router + TanStack Query)
- **Build:** Vite, Bun
- **UI:** Radix UI, Tailwind CSS
- **Backend:** Supabase (banco e autenticação)
- **IA:** Lovable AI Gateway (modelos Gemini)
- **Deploy:** Cloudflare Workers (`wrangler`)

### Como rodar

```bash
bun install
bun run dev
```

Outros comandos:

```bash
bun run build     # build de produção
bun run preview   # pré-visualizar o build
bun run lint      # ESLint
bun run format    # Prettier
```

### Variáveis de ambiente

Crie um `.env` na raiz com as chaves do seu projeto Supabase:

```
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

> ⚠️ Não versione o arquivo `.env`. Mantenha-o listado no `.gitignore`.

---

## 🇺🇸 English

### About

Web application showcasing the tourist attractions of **São Gonçalo do Rio Abaixo, Minas Gerais, Brazil**. Visitors browse points of interest, check the events calendar, build itineraries, and ask questions through an AI assistant.

Attractions are grouped into six categories:

| Category | |
|---|---|
| 🌊 Nature & Waterfalls | Cachoeira do Pimenta, Balneário Rio das Velhas |
| 🏛️ Historic Heritage | Igreja Matriz de São Gonçalo, Fazenda Histórica Bela Vista |
| 🍽️ Local Cuisine | Restaurante Fogão a Lenha |
| 🏕️ Ecotourism & Adventure | Trilha das Bromélias, Mirante do Vale Verde |
| 🎨 Art & Culture | Museu Municipal, Festival da Cachoeira |
| 🌞 Leisure | Praça Coronel Almeida, Viveiro de Orquídeas Nativas |

### Pages

| Route | Content |
|---|---|
| `/` | Home |
| `/pontos` | List of attractions |
| `/pontos/:slug` | Attraction detail |
| `/mapa` | Interactive map |
| `/roteiro` | Itinerary builder |
| `/agenda` | Events and festivals calendar |
| `/galeria` | Image gallery |
| `/historia` | City history |
| `/chat` | AI assistant |

### Stack

- **Framework:** TanStack Start (React + TanStack Router + TanStack Query)
- **Build:** Vite, Bun
- **UI:** Radix UI, Tailwind CSS
- **Backend:** Supabase (database and auth)
- **AI:** Lovable AI Gateway (Gemini models)
- **Deploy:** Cloudflare Workers (`wrangler`)

### Running

```bash
bun install
bun run dev
```

Other commands:

```bash
bun run build     # production build
bun run preview   # preview the build
bun run lint      # ESLint
bun run format    # Prettier
```

### Environment variables

Create a `.env` at the root with your Supabase project keys:

```
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
```

> ⚠️ Do not commit the `.env` file. Keep it listed in `.gitignore`.
