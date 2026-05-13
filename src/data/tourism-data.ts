import heroCachoeira from "@/assets/hero-cachoeira.jpg";
import igreja from "@/assets/igreja-matriz.jpg";
import mirante from "@/assets/mirante.jpg";
import gastronomia from "@/assets/gastronomia.jpg";
import trilha from "@/assets/trilha.jpg";
import balneario from "@/assets/balneario.jpg";

export type Category =
  | "natureza"
  | "patrimonio"
  | "gastronomia"
  | "ecoturismo"
  | "cultura"
  | "lazer";

export const categoryMeta: Record<Category, { label: string; emoji: string; color: string }> = {
  natureza: { label: "Natureza & Cachoeiras", emoji: "🌊", color: "var(--forest)" },
  patrimonio: { label: "Patrimônio Histórico", emoji: "🏛️", color: "var(--terracotta)" },
  gastronomia: { label: "Gastronomia Local", emoji: "🍽️", color: "var(--gold)" },
  ecoturismo: { label: "Ecoturismo & Aventura", emoji: "🏕️", color: "var(--forest-deep)" },
  cultura: { label: "Arte & Cultura", emoji: "🎨", color: "var(--terracotta-light)" },
  lazer: { label: "Lazer", emoji: "🌞", color: "var(--forest-light)" },
};

export type TouristicPoint = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  rating: number;
  shortDescription: string;
  longDescription: string;
  image: string;
  tags: string[];
  badge?: "Mais Visitado" | "Imperdível" | "Novo";
  coords: [number, number];
  hours: string;
  ticket: string;
  howToGet: string;
  tips: string;
};

export const touristicPoints: TouristicPoint[] = [
  {
    id: "1",
    slug: "cachoeira-do-pimenta",
    name: "Cachoeira do Pimenta",
    category: "natureza",
    rating: 4.9,
    shortDescription: "Queda d'água de 35m cercada por Mata Atlântica preservada, com poço cristalino para banho.",
    longDescription:
      "A Cachoeira do Pimenta é o cartão postal de São Gonçalo do Rio Abaixo. Suas águas frias e cristalinas descem por um paredão rochoso de 35 metros, formando um amplo poço para banho. O acesso é feito por uma trilha leve de 1,2 km em meio à mata.",
    image: heroCachoeira,
    tags: ["#cachoeira", "#trilha", "#família", "#banho"],
    badge: "Mais Visitado",
    coords: [-19.815, -43.365],
    hours: "Diariamente, 08h às 17h",
    ticket: "Gratuito",
    howToGet: "10km do centro pela MG-129, acesso sinalizado",
    tips: "Leve repelente, calçado de trilha e protetor solar biodegradável.",
  },
  {
    id: "2",
    slug: "igreja-matriz",
    name: "Igreja Matriz de São Gonçalo",
    category: "patrimonio",
    rating: 4.8,
    shortDescription: "Templo barroco do século XVIII, padroeiro da cidade, com talha dourada original.",
    longDescription:
      "Erguida em 1745 e tombada pelo IEPHA, a Igreja Matriz preserva altares em talha dourada, imagens sacras barrocas e pinturas do mestre Manoel da Costa Athayde. É o coração religioso e histórico da cidade.",
    image: igreja,
    tags: ["#barroco", "#religioso", "#história"],
    badge: "Imperdível",
    coords: [-19.8167, -43.3667],
    hours: "Ter a Dom, 09h às 18h",
    ticket: "Gratuito (contribuição opcional)",
    howToGet: "Praça Coronel Almeida, centro",
    tips: "Visitas guiadas aos sábados às 10h.",
  },
  {
    id: "3",
    slug: "mirante-vale-verde",
    name: "Mirante do Vale Verde",
    category: "natureza",
    rating: 4.7,
    shortDescription: "Vista panorâmica 360° das serras e do Rio das Velhas. Imperdível ao nascer do sol.",
    longDescription:
      "A 980m de altitude, o mirante oferece a melhor vista da região. Trilha de 2km de dificuldade moderada, ideal para fotografia, contemplação e observação de aves.",
    image: mirante,
    tags: ["#mirante", "#nascer-do-sol", "#fotografia"],
    coords: [-19.808, -43.358],
    hours: "24h (acesso por conta e risco)",
    ticket: "Gratuito",
    howToGet: "Acesso pela estrada do Engenho Velho, 8km de terra",
    tips: "Vá ao amanhecer, leve lanterna e agasalho.",
  },
  {
    id: "4",
    slug: "fazenda-bela-vista",
    name: "Fazenda Histórica Bela Vista",
    category: "patrimonio",
    rating: 4.6,
    shortDescription: "Casarão do ciclo do café, restaurado, com museu vivo da vida rural mineira.",
    longDescription:
      "Construída em 1820, a fazenda preserva a casa-grande, senzala, capela e moinho d'água. Oferece visita guiada, café da roça e experiência de colheita sazonal.",
    image: trilha,
    tags: ["#fazenda", "#café", "#história"],
    coords: [-19.825, -43.38],
    hours: "Sex a Dom, 09h às 16h",
    ticket: "R$ 25,00",
    howToGet: "15km do centro, estrada para Itabira",
    tips: "Reserve o café da roça com antecedência.",
  },
  {
    id: "5",
    slug: "trilha-bromelias",
    name: "Trilha das Bromélias",
    category: "ecoturismo",
    rating: 4.8,
    shortDescription: "Percurso de 6km em meio a centenas de bromélias e orquídeas nativas.",
    longDescription:
      "Trilha autoguiada com placas interpretativas que apresentam a flora endêmica da Mata Atlântica. Dificuldade moderada, com 4 paradas para contemplação e um poço de águas claras no meio do caminho.",
    image: trilha,
    tags: ["#trilha", "#aventura", "#flora"],
    badge: "Novo",
    coords: [-19.79, -43.345],
    hours: "Diariamente, 07h às 16h",
    ticket: "R$ 15,00 (apoio à conservação)",
    howToGet: "12km do centro, parque municipal",
    tips: "Use calçado fechado. Guia opcional disponível.",
  },
  {
    id: "6",
    slug: "museu-municipal",
    name: "Museu Municipal",
    category: "cultura",
    rating: 4.5,
    shortDescription: "Acervo de arte sacra, ferramentas do garimpo e fotos centenárias da cidade.",
    longDescription:
      "Localizado no antigo casarão da Câmara, o museu reúne mais de 800 peças que contam a história de São Gonçalo desde o ciclo do ouro até os dias atuais.",
    image: igreja,
    tags: ["#museu", "#cultura", "#história"],
    coords: [-19.817, -43.3675],
    hours: "Ter a Sáb, 10h às 17h",
    ticket: "Gratuito",
    howToGet: "Centro histórico, ao lado da Praça",
    tips: "Audioguia em PT/EN disponível.",
  },
  {
    id: "7",
    slug: "balneario-rio-das-velhas",
    name: "Balneário Rio das Velhas",
    category: "lazer",
    rating: 4.7,
    shortDescription: "Águas claras, piscinas naturais e estrutura completa para um dia em família.",
    longDescription:
      "O balneário possui prainha de areia, quiosques, restaurante de comida mineira e piscinas naturais formadas pelo rio. Ideal para crianças e descanso.",
    image: balneario,
    tags: ["#família", "#banho", "#piscina-natural"],
    coords: [-19.82, -43.37],
    hours: "Diariamente, 08h às 18h",
    ticket: "R$ 20,00",
    howToGet: "5km do centro, estrada do Rio",
    tips: "Cozinha aberta até 16h.",
  },
  {
    id: "8",
    slug: "praca-coronel-almeida",
    name: "Praça Coronel Almeida",
    category: "patrimonio",
    rating: 4.4,
    shortDescription: "Coração do centro histórico, com coreto, jacarandás centenários e feiras.",
    longDescription:
      "Reformada em 2018 mantendo o desenho original do século XIX, é palco de feiras, festivais e do café da manhã comunitário aos domingos.",
    image: igreja,
    tags: ["#centro", "#feira", "#convivência"],
    coords: [-19.8168, -43.3668],
    hours: "24h",
    ticket: "Gratuito",
    howToGet: "Centro da cidade",
    tips: "Feira de produtos coloniais aos sábados, 7h às 12h.",
  },
  {
    id: "9",
    slug: "viveiro-orquideas",
    name: "Viveiro de Orquídeas Nativas",
    category: "natureza",
    rating: 4.6,
    shortDescription: "Mais de 200 espécies de orquídeas da Mata Atlântica em cultivo sustentável.",
    longDescription:
      "Projeto de conservação que cultiva e reintroduz orquídeas nativas. Visitas educativas com biólogos e venda de mudas certificadas.",
    image: trilha,
    tags: ["#flora", "#orquídea", "#educativo"],
    coords: [-19.812, -43.36],
    hours: "Qua a Dom, 09h às 16h",
    ticket: "R$ 10,00",
    howToGet: "7km do centro, bairro Vargem",
    tips: "Compre mudas para apoiar o projeto.",
  },
  {
    id: "10",
    slug: "restaurante-fogao-lenha",
    name: "Restaurante Fogão a Lenha",
    category: "gastronomia",
    rating: 4.9,
    shortDescription: "Cozinha mineira raiz: tutu, frango caipira, doces de tacho e cachaça artesanal.",
    longDescription:
      "Tradicional há 40 anos, serve pratos preparados em fogão a lenha com ingredientes da própria horta. Buffet livre e cardápio à la carte.",
    image: gastronomia,
    tags: ["#mineiro", "#tradicional", "#imperdível"],
    badge: "Imperdível",
    coords: [-19.819, -43.369],
    hours: "Ter a Dom, 11h30 às 16h",
    ticket: "Médio R$ 75 por pessoa",
    howToGet: "Rua Direita, 234, centro",
    tips: "Reserve aos finais de semana.",
  },
];

export type CulturalEvent = {
  id: string;
  name: string;
  date: string; // ISO
  category: "Música" | "Gastronomia" | "Folclore" | "Esporte" | "Religioso" | "Arte";
  location: string;
  description: string;
};

export const culturalEvents: CulturalEvent[] = [
  { id: "e1", name: "Festa de São Gonçalo - Padroeiro", date: "2026-01-10", category: "Religioso", location: "Igreja Matriz", description: "Procissão, missa solene e quermesse com pratos típicos." },
  { id: "e2", name: "Festival da Cachoeira", date: "2026-02-14", category: "Música", location: "Cachoeira do Pimenta", description: "3 dias de música ao vivo, gastronomia e oficinas ambientais." },
  { id: "e3", name: "Corrida Ecológica na Serra", date: "2026-03-22", category: "Esporte", location: "Trilha das Bromélias", description: "Corrida de 5, 10 e 21km com percurso pela Mata Atlântica." },
  { id: "e4", name: "Exposição de Fotografia da Natureza", date: "2026-04-05", category: "Arte", location: "Museu Municipal", description: "Mostra coletiva com obras dos melhores fotógrafos da região." },
  { id: "e5", name: "Festival da Cachaça Artesanal", date: "2026-05-18", category: "Gastronomia", location: "Praça Coronel Almeida", description: "Degustação, prêmios e shows de viola." },
  { id: "e6", name: "Encontro de Folias de Reis", date: "2026-06-08", category: "Folclore", location: "Centro Histórico", description: "Tradicional encontro de 12 grupos da região." },
  { id: "e7", name: "Festa Junina Rio Abaixo", date: "2026-06-24", category: "Folclore", location: "Praça Central", description: "Quadrilha, fogueira e comidas típicas." },
  { id: "e8", name: "Mostra de Cinema Ambiental", date: "2026-07-15", category: "Arte", location: "Centro Cultural", description: "Curtas e longas sobre meio ambiente." },
  { id: "e9", name: "Feira de Artesanato Local (mensal)", date: "2026-08-02", category: "Arte", location: "Praça Coronel Almeida", description: "Artesãos locais expõem cestaria, cerâmica e tecelagem." },
  { id: "e10", name: "Noite da Culinária Mineira", date: "2026-09-12", category: "Gastronomia", location: "Restaurantes do centro", description: "Menu degustação em 8 restaurantes parceiros." },
  { id: "e11", name: "Festival de Catira e Viola", date: "2026-10-20", category: "Música", location: "Coreto da Praça", description: "Apresentações de catira, modas de viola e cururu." },
  { id: "e12", name: "Natal Iluminado Rio Abaixo", date: "2026-12-15", category: "Religioso", location: "Centro Histórico", description: "Decoração, presépio vivo e cantata." },
];

export const galleryImages = [
  { id: "g1", src: heroCachoeira, category: "Natureza", title: "Cachoeira do Pimenta" },
  { id: "g2", src: igreja, category: "Arquitetura", title: "Igreja Matriz" },
  { id: "g3", src: mirante, category: "Natureza", title: "Mirante do Vale Verde" },
  { id: "g4", src: gastronomia, category: "Gastronomia", title: "Comida mineira" },
  { id: "g5", src: trilha, category: "Natureza", title: "Trilha das Bromélias" },
  { id: "g6", src: balneario, category: "Natureza", title: "Balneário Rio das Velhas" },
  { id: "g7", src: heroCachoeira, category: "Natureza", title: "Mata Atlântica" },
  { id: "g8", src: igreja, category: "Arquitetura", title: "Patrimônio colonial" },
  { id: "g9", src: gastronomia, category: "Gastronomia", title: "Pão de queijo artesanal" },
  { id: "g10", src: trilha, category: "Vida Local", title: "Caminhantes na trilha" },
  { id: "g11", src: balneario, category: "Natureza", title: "Águas cristalinas" },
  { id: "g12", src: mirante, category: "Natureza", title: "Vista das serras" },
];

export const historicalTimeline = [
  { year: "1701", title: "Bandeirantes na região", text: "Primeiras expedições paulistas chegam ao Vale do Rio das Velhas em busca de ouro." },
  { year: "1745", title: "Construção da Igreja Matriz", text: "Templo barroco é erguido pelos devotos de São Gonçalo." },
  { year: "1820", title: "Ciclo do café", text: "Fazendas como a Bela Vista expandem a produção cafeeira." },
  { year: "1861", title: "Emancipação política", text: "São Gonçalo do Rio Abaixo é elevado à categoria de município." },
  { year: "1920", title: "Estrada de ferro", text: "Chegada do trem impulsiona o comércio e a integração regional." },
  { year: "1980", title: "Criação da APA", text: "Área de Proteção Ambiental garante a preservação da Mata Atlântica." },
  { year: "2005", title: "Tombamento do centro", text: "IEPHA tomba o conjunto arquitetônico do centro histórico." },
  { year: "2024", title: "Plano de turismo sustentável", text: "Cidade lança plano integrado de turismo ecológico e cultural." },
];

export const testimonials = [
  { name: "Marina S.", origin: "Belo Horizonte, MG", text: "A Cachoeira do Pimenta é simplesmente mágica. Voltarei com toda a família!" },
  { name: "Lucas R.", origin: "Rio de Janeiro, RJ", text: "Roteiro perfeito de fim de semana. O fogão a lenha vale a viagem." },
  { name: "Helena M.", origin: "São Paulo, SP", text: "Recebimento caloroso, natureza intocada e história em cada esquina." },
  { name: "Carlos T.", origin: "Vitória, ES", text: "Trilha das Bromélias foi um dos passeios mais bonitos que já fiz." },
  { name: "Ana P.", origin: "Brasília, DF", text: "A IA Gonça montou um roteiro impecável para nós em 2 minutos." },
  { name: "Rafael D.", origin: "Curitiba, PR", text: "Cidade tranquila, pessoas acolhedoras. Mineiridade na essência." },
];

export const heroImage = heroCachoeira;
