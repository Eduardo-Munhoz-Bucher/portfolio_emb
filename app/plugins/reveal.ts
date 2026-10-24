import type { Directive } from 'vue'

/**
 * v-reveal: anima o elemento quando ele entra na tela.
 * Uso: v-reveal ou v-reveal="150" (delay em ms).
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined

  const getObserver = () => {
    observer ||= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    return observer
  }

  const reveal: Directive<HTMLElement, number | undefined> = {
    // A classe é adicionada só no cliente para não gerar mismatch de hidratação
    // (e o conteúdo continua visível no HTML do SSR para SEO/sem JS).
    beforeMount(el, binding) {
      el.classList.add('reveal')
      if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    },
    mounted(el) {
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  }

  nuxtApp.vueApp.directive('reveal', reveal)
})
