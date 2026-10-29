<script setup lang="ts">
import { profile } from '~/data/portfolio'

// Efeito de digitação alternando as palavras
const typed = ref(profile.rotating[0]!)
let timer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  let word = 0
  let chars = typed.value.length
  let deleting = true

  const tick = () => {
    const current = profile.rotating[word]!
    chars += deleting ? -1 : 1
    typed.value = current.slice(0, chars)

    let delay = deleting ? 45 : 90
    if (!deleting && chars === current.length) {
      deleting = true
      delay = 1800
    } else if (deleting && chars === 0) {
      deleting = false
      word = (word + 1) % profile.rotating.length
      delay = 300
    }
    timer = setTimeout(tick, delay)
  }
  timer = setTimeout(tick, 2200)
})

onBeforeUnmount(() => clearTimeout(timer))

// Letras agrupadas por palavra para o nome não quebrar no meio de uma palavra
let offset = 0
const nameWords = profile.name.split(' ').map((word) => {
  const item = { letters: word.split(''), offset }
  offset += word.length + 1
  return item
})
</script>

<template>
  <section id="inicio" class="hero">
    <v-container>
      <v-row align="center">
        <v-col cols="12" lg="7">
          <div class="hero__badge font-mono">
            <span class="hero__pulse" />
            Desenvolvedor na RotaExata · {{ profile.location }}
          </div>

          <p class="hero__hello font-mono">Olá, eu sou</p>

          <h1 class="hero__name font-display" :aria-label="profile.name">
            <template v-for="(word, w) in nameWords" :key="w">
              <span class="hero__word-wrap" aria-hidden="true">
                <span
                  v-for="(letter, i) in word.letters"
                  :key="i"
                  class="hero__letter"
                  :style="{ animationDelay: `${0.3 + (word.offset + i) * 0.035}s` }"
                >{{ letter }}</span>
              </span>{{ ' ' }}
            </template>
          </h1>

          <h2 class="hero__role font-display">
            <span class="text-gradient">{{ profile.role }}</span>
          </h2>

          <p class="hero__typed font-mono">
            <span class="text-medium-emphasis">construindo com</span>
            <span class="hero__word">{{ typed }}</span><span class="hero__caret" />
          </p>

          <p class="hero__tagline">
            {{ profile.tagline }} Hoje construo telas com Vue.js, Nuxt e TypeScript
            pensando em quem está do outro lado da tela.
          </p>

          <div class="hero__actions">
            <v-btn
              href="#projetos"
              color="primary"
              size="large"
              append-icon="mdi-arrow-right"
              class="hero__cta"
            >
              Ver projetos
            </v-btn>
            <v-btn
              :href="profile.resume"
              download
              variant="outlined"
              size="large"
              prepend-icon="mdi-file-download-outline"
            >
              Baixar currículo
            </v-btn>

            <div class="hero__socials">
              <v-btn
                :href="profile.github"
                target="_blank"
                rel="noopener"
                icon="mdi-github"
                variant="text"
                aria-label="GitHub"
              />
              <v-btn
                :href="profile.linkedin"
                target="_blank"
                rel="noopener"
                icon="mdi-linkedin"
                variant="text"
                aria-label="LinkedIn"
              />
              <v-btn
                :href="profile.whatsapp"
                target="_blank"
                rel="noopener"
                icon="mdi-whatsapp"
                variant="text"
                aria-label="WhatsApp"
              />
            </div>
          </div>
        </v-col>

        <v-col cols="12" lg="5" class="d-none d-lg-block">
          <div class="code-wrap">
            <TiltCard class="code-card" :max="10">
              <div class="code-card__bar">
                <span /><span /><span />
                <p class="font-mono">eduardo.ts</p>
              </div>
              <pre class="code-card__code font-mono"><code><span class="k">const</span> <span class="v">eduardo</span> = {
  <span class="p">cargo</span>: <span class="s">'Dev Full-stack'</span>,
  <span class="p">stack</span>: [
    <span class="s">'Vue'</span>, <span class="s">'Nuxt'</span>, <span class="s">'TypeScript'</span>,
    <span class="s">'Node'</span>, <span class="s">'NestJS'</span>,
  ],
  <span class="p">superpoder</span>: <span class="s">'entender o usuário'</span>,
}

<span class="c">// 3 anos no suporte → hoje no código</span>
<span class="v">eduardo</span>.<span class="f">build</span>(<span class="s">'telas que fazem sentido'</span>)</code></pre>
            </TiltCard>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <a href="#sobre" class="hero__scroll" aria-label="Rolar para Sobre">
      <span class="hero__mouse"><span /></span>
    </a>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 999px;
    font-size: 0.78rem;
    color: var(--muted);
    margin-bottom: 28px;
    animation: fade-up 0.8s both;
  }

  &__pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 0 0 rgba(66, 211, 146, 0.6);
    animation: pulse 2s infinite;
  }

  &__hello {
    color: var(--green);
    margin-bottom: 8px;
    animation: fade-up 0.8s 0.1s both;
  }

  &__name {
    font-size: clamp(2.6rem, 7vw, 5.2rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.03em;
    margin-bottom: 12px;
  }

  &__word-wrap {
    display: inline-block;
    white-space: nowrap;
  }

  &__letter {
    display: inline-block;
    animation: letter-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
    transition: color 0.2s, transform 0.2s;

    &:hover {
      color: var(--green);
      transform: translateY(-6px) rotate(-4deg);
    }
  }

  &__role {
    font-size: clamp(1.8rem, 4.5vw, 3.4rem);
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 20px;
    animation: fade-up 0.8s 1s both;
  }

  &__typed {
    font-size: 1rem;
    margin-bottom: 24px;
    animation: fade-up 0.8s 1.1s both;
  }

  &__word {
    color: var(--cyan);
    margin-left: 8px;
  }

  &__caret {
    display: inline-block;
    width: 9px;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: text-bottom;
    background: var(--cyan);
    animation: blink 1s steps(1) infinite;
  }

  &__tagline {
    max-width: 560px;
    color: var(--muted);
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 36px;
    animation: fade-up 0.8s 1.2s both;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    animation: fade-up 0.8s 1.3s both;
  }

  &__cta {
    box-shadow: 0 0 32px rgba(66, 211, 146, 0.35);
    color: #07070d !important;
    font-weight: 600;
  }

  &__socials {
    display: flex;
    margin-left: 4px;
  }

  &__scroll {
    position: absolute;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    animation: fade-up 0.8s 1.8s both;
  }

  &__mouse {
    display: block;
    width: 24px;
    height: 38px;
    border: 2px solid var(--border-strong);
    border-radius: 14px;
    position: relative;

    span {
      position: absolute;
      left: 50%;
      top: 7px;
      width: 4px;
      height: 8px;
      margin-left: -2px;
      border-radius: 2px;
      background: var(--green);
      animation: scroll-dot 1.8s infinite;
    }
  }
}

.code-wrap {
  animation: fade-up 1s 0.8s both, bob 6s 2s ease-in-out infinite;
}

.code-card {

  &__bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--border);

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ff5f57;

      &:nth-child(2) { background: #febc2e; }
      &:nth-child(3) { background: #28c840; }
    }

    p {
      margin-left: 12px;
      font-size: 0.8rem;
      color: var(--muted);
    }
  }

  &__code {
    padding: 22px 24px 26px;
    font-size: 0.88rem;
    line-height: 1.75;
    white-space: pre;
    overflow-x: auto;
    color: var(--text);

    .k { color: #c792ea; }
    .v { color: var(--cyan); }
    .p { color: #82aaff; }
    .s { color: var(--green); }
    .f { color: #ffcb6b; }
    .c { color: #676e95; font-style: italic; }
  }
}

@keyframes letter-in {
  from {
    opacity: 0;
    transform: translateY(60%) rotate(8deg);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes blink {
  50% { opacity: 0; }
}

@keyframes pulse {
  70% { box-shadow: 0 0 0 10px rgba(66, 211, 146, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 211, 146, 0); }
}

@keyframes scroll-dot {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(14px); }
}

@keyframes bob {
  50% { translate: 0 -12px; }
}
</style>
