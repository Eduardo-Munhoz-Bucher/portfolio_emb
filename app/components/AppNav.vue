<script setup lang="ts">
import { navLinks, profile } from '~/data/portfolio'

const scrolled = ref(false)
const progress = ref(0)
const active = ref('')
const drawer = ref(false)

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = window.scrollY > 24
  progress.value = max > 0 ? (window.scrollY / max) * 100 : 0
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = entry.target.id
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  for (const link of navLinks) {
    const section = document.getElementById(link.id)
    if (section) observer.observe(section)
  }

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    observer.disconnect()
  })
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__progress" :style="{ transform: `scaleX(${progress / 100})` }" />

    <v-container class="nav__inner">
      <a href="#inicio" class="nav__logo font-mono" aria-label="Início">
        <span class="text-primary">&lt;</span>emb<span class="text-primary"> /&gt;</span>
      </a>

      <nav class="nav__links d-none d-md-flex">
        <a
          v-for="(link, i) in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav__link"
          :class="{ 'nav__link--active': active === link.id }"
        >
          <span class="font-mono text-primary">0{{ i + 1 }}.</span> {{ link.label }}
        </a>
        <v-btn
          :href="profile.whatsapp"
          target="_blank"
          rel="noopener"
          variant="outlined"
          color="primary"
          size="small"
          prepend-icon="mdi-whatsapp"
          class="ml-1"
        >
          Fale comigo
        </v-btn>
      </nav>

      <v-btn
        class="d-md-none"
        icon="mdi-menu"
        variant="text"
        aria-label="Abrir menu"
        @click="drawer = true"
      />
    </v-container>
  </header>

  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    width="280"
    class="nav__drawer"
  >
    <div class="d-flex justify-end pa-2">
      <v-btn icon="mdi-close" variant="text" aria-label="Fechar menu" @click="drawer = false" />
    </div>
    <v-list nav bg-color="transparent">
      <v-list-item
        v-for="(link, i) in navLinks"
        :key="link.id"
        :href="`#${link.id}`"
        :active="active === link.id"
        color="primary"
        @click="drawer = false"
      >
        <v-list-item-title class="font-display text-h6">
          <span class="font-mono text-primary text-body-2">0{{ i + 1 }}.</span> {{ link.label }}
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <div class="d-flex flex-column ga-3 pa-4">
      <v-btn
        :href="profile.whatsapp"
        target="_blank"
        rel="noopener"
        color="primary"
        variant="outlined"
        prepend-icon="mdi-whatsapp"
        block
      >
        Fale comigo
      </v-btn>
      <v-btn
        :href="profile.resume"
        download
        variant="tonal"
        prepend-icon="mdi-file-download-outline"
        block
      >
        Baixar currículo
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.nav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 1000;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  border-bottom: 1px solid transparent;

  &--scrolled {
    background: rgba(7, 7, 13, 0.7);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom-color: var(--border);
  }

  &__progress {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: var(--gradient);
    transform-origin: left;
  }

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    padding-block: 0;
  }

  &__logo {
    color: var(--text);
    text-decoration: none;
    font-size: 1.15rem;
    font-weight: 500;
    transition: letter-spacing 0.3s;

    &:hover {
      letter-spacing: 0.06em;
    }
  }

  &__links {
    align-items: center;
    gap: 4px;
  }

  &__link {
    position: relative;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    padding: 8px 12px;
    transition: color 0.2s;

    &::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 2px;
      height: 1px;
      background: var(--green);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s;
    }

    &:hover,
    &--active {
      color: var(--text);
      &::after {
        transform: scaleX(1);
      }
    }
  }

  &__drawer {
    background: rgba(10, 10, 20, 0.92) !important;
    backdrop-filter: blur(16px);
  }
}
</style>
