export interface Tech {
  name: string
  icon: string
  /** Logos escuros que precisam ser clareados no tema dark */
  invert?: boolean
  group: 'front' | 'back' | 'tools'
}

export interface Experience {
  role: string
  company: string
  period: string
  type: string
  current?: boolean
  summary: string
  highlights: { title: string, text: string }[]
  tags: string[]
}

export interface Project {
  title: string
  kind: 'Profissional' | 'Pessoal'
  description: string
  tags: string[]
  icon: string
  links: { label: string, href: string, icon: string }[]
}

export const profile = {
  name: 'Eduardo Munhoz Bucher',
  firstName: 'Eduardo',
  role: 'Desenvolvedor Front-end',
  location: 'Joinville, SC',
  email: 'eduardomb.dev@gmail.com',
  github: 'https://github.com/Eduardo-Munhoz-Bucher',
  linkedin: 'https://www.linkedin.com/in/eduardo-munhoz-bucher-13b234201/',
  whatsapp: `https://wa.me/5547997291885?text=${encodeURIComponent('Olá Eduardo, tudo bem? Vi seu portfólio!')}`,
  whatsappDisplay: '(47) 99729-1885',
  resume: '/Curriculo-Eduardo-Munhoz-Bucher.pdf',
  tagline: 'Passei três anos atendendo os clientes do sistema que hoje eu ajudo a construir.',
  rotating: ['Vue.js', 'Nuxt', 'TypeScript', 'JavaScript', 'Node.js', 'design systems'],
}

export const about = [
  'Comecei na RotaExata como estagiário de suporte: atendia cliente no telefone e no chat e ajudava técnico em campo na instalação de equipamentos. Ali aprendi uma coisa que curso nenhum ensina: onde o usuário trava, o que ele não entende e o que faz ele ligar irritado.',
  'Desde 2025 estou do outro lado, como Desenvolvedor Front-end. Construo as telas desse mesmo sistema com Vue.js, Nuxt, JavaScript e TypeScript. Quando a entrega pede, também trabalho no back-end com Node.js, NestJS e banco de dados.',
  'Hoje participo da migração do sistema de Nuxt 2 para Nuxt 4, da refatoração de telas antigas e da criação do design system da empresa, com componentes reutilizáveis que deixam o código mais consistente e fácil de manter. Também desenvolvi o novo site institucional da RotaExata.',
]

export const stats = [
  { value: 4, suffix: '+', label: 'anos de RotaExata' },
  { value: 3, suffix: '', label: 'anos no suporte ao cliente' },
  { value: 1, suffix: '+', label: 'ano como dev front-end' },
]

const icon = (file: string) => `/tech/${file}.svg`

export const techs: Tech[] = [
  { name: 'Vue.js', icon: icon('vuejs-original'), group: 'front' },
  { name: 'Nuxt', icon: icon('nuxtjs-original'), group: 'front' },
  { name: 'TypeScript', icon: icon('typescript-original'), group: 'front' },
  { name: 'JavaScript', icon: icon('javascript-original'), group: 'front' },
  { name: 'Vuetify', icon: icon('vuetify-original'), group: 'front' },
  { name: 'HTML5', icon: icon('html5-original'), group: 'front' },
  { name: 'CSS3', icon: icon('css3-original'), group: 'front' },
  { name: 'Sass', icon: icon('sass-original'), group: 'front' },
  { name: 'Node.js', icon: icon('nodejs-original'), group: 'back' },
  { name: 'NestJS', icon: icon('nestjs-original'), group: 'back' },
  { name: 'Express', icon: icon('express-original'), invert: true, group: 'back' },
  { name: 'PostgreSQL', icon: icon('postgresql-original'), group: 'back' },
  { name: 'MongoDB', icon: icon('mongodb-original'), group: 'back' },
  { name: 'AWS', icon: icon('amazonwebservices-plain-wordmark'), invert: true, group: 'back' },
  { name: 'Postman', icon: icon('postman-original'), group: 'tools' },
  { name: 'Git', icon: icon('git-original'), group: 'tools' },
  { name: 'Figma', icon: icon('figma-original'), group: 'tools' },
]

export const experiences: Experience[] = [
  {
    role: 'Desenvolvedor Front-end',
    company: 'RotaExata',
    period: 'ago. 2025 — o momento',
    type: 'Tempo integral · Híbrido',
    current: true,
    summary:
      'Desenvolvimento da plataforma web da RotaExata, com foco em front-end e atuação no back-end quando a entrega exige.',
    highlights: [
      {
        title: 'Novo site institucional',
        text: 'Nuxt 4, Vue 3 e TypeScript, com componentes reutilizáveis, SEO, performance e layout responsivo. Formulário de contato integrado ao Pipedrive (CRM do time comercial) e back-end refatorado.',
      },
      {
        title: 'Migração Nuxt 2 → Nuxt 4',
        text: 'Atualização de uma aplicação em produção, adaptando código legado, dependências e padrões que mudaram entre as versões.',
      },
      {
        title: 'Design system',
        text: 'Criação de uma biblioteca de componentes reutilizáveis, padronizando a interface e reduzindo código duplicado entre as telas.',
      },
      {
        title: 'Features e correção de bugs',
        text: 'Novas funcionalidades e correção de problemas reportados por clientes. A experiência no suporte me ajuda a achar rápido onde o problema realmente está.',
      },
      {
        title: 'Refatoração de telas legadas',
        text: 'Reescrita de telas antigas seguindo os novos padrões, deixando o código mais legível e fácil de manter.',
      },
      {
        title: 'Back-end',
        text: 'Demandas com Node.js, NestJS, Express, PostgreSQL, MongoDB e AWS.',
      },
    ],
    tags: ['Vue.js', 'Nuxt', 'TypeScript', 'Vuetify', 'Node.js', 'NestJS'],
  },
  {
    role: 'Suporte ao Cliente',
    company: 'RotaExata',
    period: 'ago. 2022 — jul. 2025',
    type: 'Estagiário → Analista de Suporte',
    summary:
      'Atendimento a clientes da plataforma de rastreamento e gestão de frotas por telefone e chat, e apoio técnico em campo na instalação de equipamentos.',
    highlights: [
      {
        title: 'Olhar de quem usa',
        text: 'Três anos ouvindo onde o usuário trava, o que ele não entende e o que gera atrito, hoje isso orienta as telas que eu construo.',
      },
      {
        title: 'Diagnóstico',
        text: 'Investigação de problemas reportados, reprodução de cenários e ponte entre clientes e o time de desenvolvimento.',
      },
    ],
    tags: ['Atendimento', 'Diagnóstico'],
  },
]

export const projects: Project[] = [
  {
    title: 'Site institucional RotaExata',
    kind: 'Profissional',
    description:
      'Novo site da empresa com Nuxt 4, Vue 3 e TypeScript. Componentes reutilizáveis, SEO, performance e formulário de contato integrado ao Pipedrive.',
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'SEO', 'Pipedrive'],
    icon: 'mdi-web',
    links: [],
  },
  {
    title: 'Design system RotaExata',
    kind: 'Profissional',
    description:
      'Biblioteca de componentes reutilizáveis para padronizar a interface da plataforma e reduzir código duplicado entre as telas.',
    tags: ['Vue 3', 'JavaScript', 'Componentização'],
    icon: 'mdi-palette-swatch-outline',
    links: [],
  },
  {
    title: 'RotaLocadora',
    kind: 'Pessoal',
    description:
      'Sistema de gerenciamento de veículos para locadora: cadastro, edição e exclusão, histórico de movimentações e localização dos veículos em mapa com Leaflet.',
    tags: ['Nuxt', 'Vuetify', 'Leaflet', 'Express', 'MySQL'],
    icon: 'mdi-car-key',
    links: [
      {
        label: 'Código',
        href: 'https://github.com/Eduardo-Munhoz-Bucher/Teste-RotaExata',
        icon: 'mdi-github',
      },
    ],
  },
  {
    title: 'Calculadora JavaScript',
    kind: 'Pessoal',
    description:
      'Calculadora interativa com JavaScript puro, HTML e CSS. Operações básicas, interface responsiva e manipulação direta do DOM.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    icon: 'mdi-calculator-variant-outline',
    links: [
      {
        label: 'Código',
        href: 'https://github.com/Eduardo-Munhoz-Bucher/projeto-calculadora',
        icon: 'mdi-github',
      },
    ],
  },
]

export const navLinks = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'stack', label: 'Stack' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
]
