import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['@mdi/font/css/materialdesignicons.css', '~/assets/styles/main.scss'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: { transformAssetUrls },
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Eduardo Munhoz Bucher | Desenvolvedor Full-stack',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Portfólio de Eduardo Munhoz Bucher, Desenvolvedor Full-stack com Vue.js, Nuxt e TypeScript. Três anos no suporte, hoje construindo o produto que eu atendia.',
        },
        { name: 'theme-color', content: '#07070d' },
        { property: 'og:title', content: 'Eduardo Munhoz Bucher | Desenvolvedor Full-stack' },
        {
          property: 'og:description',
          content: 'Dev full-stack que entende o produto pelo olho de quem usa.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap',
        },
      ],
    },
  },
})
