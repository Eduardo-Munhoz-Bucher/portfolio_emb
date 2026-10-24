# Portfólio — Eduardo Munhoz Bucher

Portfólio pessoal feito com **Nuxt 4**, **Vue 3**, **Vuetify 3** e TypeScript.

## Requisitos

- Node.js **22** (versão fixada em `.nvmrc`; o Nuxt 4.6 não suporta Node 20)

```bash
nvm use
npm install
```

## Scripts

```bash
npm run dev       # servidor de desenvolvimento em http://localhost:3000
npm run build     # build de produção
npm run generate  # site estático (ideal para Vercel/Netlify)
npm run preview   # pré-visualiza o build
npx nuxi typecheck
```

## Estrutura

- `app/data/portfolio.ts`: **todo o conteúdo** (textos, experiências, projetos, stack, links). Para atualizar o portfólio, edite só esse arquivo.
- `app/components/`: seções da página (`HeroSection`, `AboutSection`, `ExperienceSection`, `StackSection`, `ProjectsSection`, `ContactSection`) e efeitos (`BackgroundFx`, `TiltCard`, `CountUp`).
- `app/plugins/vuetify.ts`: tema do Vuetify.
- `app/plugins/reveal.ts`: diretiva `v-reveal` (animação ao rolar).
- `public/tech/`: logos das tecnologias ([Devicon](https://devicon.dev), licença MIT).

## Efeitos visuais

- Rede de partículas em canvas que reage ao mouse + blobs de gradiente e spotlight
- Nome com entrada animada letra a letra e efeito de digitação
- Cards com inclinação 3D e borda luminosa seguindo o cursor
- Marquee infinito da stack, contadores animados e revelação ao rolar
- Barra de progresso de leitura e menu com seção ativa
- Respeita `prefers-reduced-motion`
