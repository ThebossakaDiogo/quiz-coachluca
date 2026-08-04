export const CHECKOUT_URL = 'https://pay.cakto.com.br/capui7o_1015855';

export const ASSETS = {
  logo: '/assets/LOGO3-WGBt60gj.webp',
  gifs: {
    sales1: '/assets/gif-salespage-1-MfxSMHU2.gif',
    fit1: '/assets/gif-sales-page-2-CeepqVlc.gif',
    homeFit: '/assets/landingpage_nova-D9AExXHH.webp',
  },
  coach: {
    main: '/assets/coachapresentation1-BQaYGSJw.webp',
    alt: '/assets/coachapresentation-HCeA4fhh.webp',
  },
  results: [
    '/assets/ba1-BznIB2qC.jpg',
    '/assets/ba2-TWGQctri.jpg',
    '/assets/ba3-qTxyqyYZ.jpg',
    '/assets/ba4-C9laZ4pf.webp',
    '/assets/ba5-ejwaX96j.webp',
    '/assets/ba6-P_KDi3uZ.jpg',
  ],
  ages: {
    '18-29': '/assets/18-29-CINL6ef1.png',
    '30-39': '/assets/30-39-DlwPfCB7.png',
    '40-49': '/assets/40-50-DhYvfFZS.png',
    '50plus': '/assets/50_-BjiVXxuV.png',
  }
};

export const QUIZ_STEPS = [
  {
    id: 1,
    slug: 'inicio-avaliacao',
    type: 'question',
    headerBadge: "🔥 FitFlow Método 28D",
    eyebrow: "Passo 1 de 12",
    title: "Você quer empinar, arredondar e aumentar o bumbum em 28 Dias treinando em casa?",
    subtitle: "Descubra a estimulação neuromuscular profunda (8-10 min/dia) calibrada para o seu tipo de corpo. Sem academia, sem cargas pesadas e sem cirurgias. 🚀",
    options: [
      { emoji: "😩", label: "Não, me sinto frustrada e quero aumentar (+4 a +7 cm)", value: "frustrada" },
      { emoji: "💧", label: "Quero eliminar a flacidez, a celulite e firmar tudo", value: "tonificar" },
      { emoji: "🍑", label: "Quero esculpir o efeito 'Push-Up' redondo e durinho", value: "esculpir" }
    ]
  },
  {
    id: 2,
    slug: 'idade',
    type: 'age',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 2 de 12",
    title: "Selecione a sua faixa de idade",
    subtitle: "Isso ajuda a calcular a sua taxa de resposta muscular e a intensidade metabólica.",
    options: [
      { label: "18 - 29 anos", value: "18-29", image: ASSETS.ages["18-29"] },
      { label: "30 - 39 anos", value: "30-39", image: ASSETS.ages["30-39"] },
      { label: "40 - 49 anos", value: "40-49", image: ASSETS.ages["40-49"] },
      { label: "50+ anos", value: "50plus", image: ASSETS.ages["50plus"] }
    ]
  },
  {
    id: 3,
    slug: 'incomodo',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 3 de 12",
    title: "O que mais te incomoda quando você se olha no espelho?",
    subtitle: "Identificar o seu principal ponto de insatisfação permite ativar o estímulo neuromuscular correto.",
    options: [
      { emoji: "😩", label: "Meu bumbum pequeno ou sem volume", value: "pequeno" },
      { emoji: "💧", label: "Flacidez ou falta de firmeza", value: "flacidez" },
      { emoji: "🍊", label: "Celulite ou pele irregular", value: "celulitis" },
      { emoji: "🍑", label: "Falta de elevação na parte superior", value: "elevacion" }
    ]
  },
  {
    id: 4,
    slug: 'inseguranca',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 4 de 12",
    title: "Você já deixou de usar roupas coladas ou biquínis por não se sentir confiante?",
    subtitle: "Nossa meta é devolver 100% da sua autoestima e segurança com o seu corpo.",
    options: [
      { emoji: "👗", label: "Sim, com frequência me privo de usar roupas ajustadas", value: "frecuencia" },
      { emoji: "😳", label: "Às vezes me sinto um pouco insegura", value: "a_veces" },
      { emoji: "✨", label: "Não, mas gostaria de ficar ainda mais desenhada e atraente", value: "impactante" }
    ]
  },
  {
    id: 5,
    slug: 'crenca',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 5 de 12",
    title: "Você acredita que é possível transformar seu bumbum com treinos rápidos e focados feitos em casa?",
    subtitle: "A chave é o estímulo profundo das fibras musculares, não horas exaustivas na academia.",
    options: [
      { emoji: "🔥", label: "Sim, estou pronta para começar!", value: "lista" },
      { emoji: "❓", label: "Tenho dúvidas, mas adoraria testar um método guiado", value: "dudas" },
      { emoji: "🏋️", label: "Achava que só funcionava com cargas pesadas", value: "pesas" }
    ]
  },
  {
    id: 6,
    slug: 'disposicao',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 6 de 12",
    title: "Se existisse um método comprovado combinando treinos curtos e um plano alimentar simples, você testaria?",
    subtitle: "Sem dietas malucas nem horas cansativas de cárdio.",
    options: [
      { emoji: "✅", label: "Sim, 100% disposta a seguir o plano", value: "dispuesta_100" },
      { emoji: "😏", label: "Me mostre resultados de alunas primeiro", value: "ver_resultados" },
      { emoji: "🤨", label: "Dependeria dos resultados prometidos", value: "dependeria" }
    ]
  },
  {
    id: 7,
    slug: 'tempo',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 7 de 12",
    title: "Quanto tempo você tem disponível por dia para fazer suas rotinas?",
    subtitle: "Ajustamos os exercícios de forma ultra eficiente para encaixar na sua rotina.",
    options: [
      { emoji: "⏱️", label: "8 a 10 minutos por dia", value: "8_10min" },
      { emoji: "⏰", label: "10 a 20 minutos por dia", value: "10_20min" },
      { emoji: "⏳", label: "Mais de 20 minutos por dia", value: "mas_20min" }
    ]
  },
  {
    id: 8,
    slug: 'dias-treino',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 8 de 12",
    title: "Quantos dias por semana você prefere treinar?",
    subtitle: "O descanso estratégico é fundamental para o músculo crescer rápido.",
    options: [
      { emoji: "📅", label: "3 dias por semana", value: "3_dias" },
      { emoji: "📆", label: "4 a 5 dias por semana", value: "4_5_dias" },
      { emoji: "⚡", label: "Todos os dias (rotinas express de 8 min)", value: "todos_dias" }
    ]
  },
  {
    id: 9,
    slug: 'refeicoes',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 9 de 12",
    title: "Quantas refeições você faz por dia normalmente?",
    subtitle: "💡 Essa é a chave do seu metabolismo! O Coach Luca descobriu que 90% das pessoas erram aqui e por isso não conseguem definir e empinar os glúteos.",
    options: [
      { emoji: "😴", label: "1 a 2 refeições por dia", value: "1_2_comidas" },
      { emoji: "🍽️", label: "3 refeições básicas por dia", value: "3_comidas" },
      { emoji: "✅", label: "4 a 5 refeições (incluindo lanches)", value: "4_5_comidas" }
    ]
  },
  {
    id: 10,
    slug: 'coach-luca',
    type: 'coach',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 10 de 12",
    title: "Conheça o Coach Luca",
    subtitle: "Especialista internacional em biomecânica e modelagem de glúteos femininos.",
    coachInfo: {
      experienceYears: "12+ Anos",
      successCases: "12.000+",
      bio: "O Coach Luca desenvolveu o FitFlow Método 28D, um sistema revolucionário de estimulação profunda que empina, esculpe e aumenta os glúteos em casa sem dores nas articulações.",
      mainImage: ASSETS.coach.main,
      altImage: ASSETS.coach.alt,
      results: ASSETS.results.slice(0, 3)
    },
    options: [
      { label: "Continuar para o Diagnóstico Final", value: "continuar" }
    ]
  },
  {
    id: 11,
    slug: 'comprometimento',
    type: 'question',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 11 de 12",
    title: "Qual é o seu nível de comprometimento para transformar o seu corpo?",
    subtitle: "Buscamos mulheres totalmente dispostas a ver resultados visíveis em poucas semanas.",
    options: [
      { emoji: "🔥", label: "100% Comprometida - Vou dar o meu melhor", value: "compromiso_100" },
      { emoji: "👍", label: "Moderado - Vou no meu próprio ritmo", value: "compromiso_moderado" },
      { emoji: "👀", label: "Curiosa - Quero conhecer a proposta primeiro", value: "curiosa" }
    ]
  },
  {
    id: 12,
    slug: 'objetivo-final',
    type: 'goal',
    headerBadge: "FitFlow Método 28D",
    eyebrow: "Passo 12 de 12",
    title: "Qual é o seu objetivo de bumbum ideal?",
    subtitle: "Selecione o formato e silhueta que você deseja alcançar.",
    options: [
      { emoji: "🍑", label: "Empinado e Firme (Efeito Push-Up)", value: "elevado" },
      { emoji: "✨", label: "Esculpido e Definido (Sem Flacidez)", value: "esculpido" },
      { emoji: "💪", label: "Tonalizado e Atlético", value: "tonificado" },
      { emoji: "🔴", label: "Redondo e com Mais Volume", value: "redondo" }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Carolina M.",
    age: "34 anos",
    location: "São Paulo, SP",
    avatar: ASSETS.results[0],
    rating: 5,
    text: "Em apenas 3 semanas meu bumbum ficou visivelmente empinado e durinho. As rotinas de 8 minutos são super práticas no meu dia a dia.",
    resultBadge: "+5.5 cm em 28 Dias"
  },
  {
    id: 2,
    name: "Valeria G.",
    age: "29 anos",
    location: "Rio de Janeiro, RJ",
    avatar: ASSETS.results[1],
    rating: 5,
    text: "Não acreditava que sem academia desse resultado. A celulite desapareceu quase por completo. 100% recomendado!",
    resultBadge: "Sem Flacidez • Firmeza Total"
  },
  {
    id: 3,
    name: "Mariana R.",
    age: "41 anos",
    location: "Belo Horizonte, MG",
    avatar: ASSETS.results[2],
    rating: 5,
    text: "Tenho dois filhos e pouco tempo livre. Esse programa devolveu minha confiança para usar biquíni sem vergonha. Muito obrigada ao Coach Luca!",
    resultBadge: "Efeito Push-Up Real"
  }
];

export const BEFORE_AFTER_CASES = [
  {
    id: 1,
    title: "Caso 1: Firmeza Express",
    detail: "Resultados em 14 Dias",
    image: ASSETS.results[0],
    tag: "98.4% Elevação"
  },
  {
    id: 2,
    title: "Caso 2: Ganho de Volume",
    detail: "Resultados em 21 Dias",
    image: ASSETS.results[1],
    tag: "+6.0 cm Volume"
  },
  {
    id: 3,
    title: "Caso 3: Fim da Celulite",
    detail: "Resultados em 28 Dias",
    image: ASSETS.results[2],
    tag: "Pele Lisa"
  },
  {
    id: 4,
    title: "Caso 4: Efeito Push-Up",
    detail: "Resultados em 28 Dias",
    image: ASSETS.results[3],
    tag: "Definição Máxima"
  }
];
