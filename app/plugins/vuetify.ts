import { createVuetify } from 'vuetify'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'emb',
      themes: {
        emb: {
          dark: true,
          colors: {
            background: '#07070d',
            surface: '#0f0f1a',
            'surface-bright': '#171728',
            primary: '#42d392',
            secondary: '#7c5cff',
            accent: '#22d3ee',
            error: '#ff5c7a',
            info: '#22d3ee',
            success: '#42d392',
            warning: '#ffb547',
          },
        },
      },
    },
    defaults: {
      VBtn: { rounded: 'lg', style: 'text-transform: none; letter-spacing: 0;' },
      VChip: { rounded: 'lg' },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
