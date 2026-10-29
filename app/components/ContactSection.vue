<script setup lang="ts">
import { profile } from '~/data/portfolio'

const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <section id="contato" class="section">
    <v-container>
      <div v-reveal class="contact glass">
        <div class="contact__orb" aria-hidden="true" />

        <p class="section-eyebrow justify-center">05. contato</p>
        <h2 class="contact__title font-display">
          Precisa de um dev full-stack que entende o produto
          <span class="text-gradient">pelo olho de quem usa?</span>
        </h2>
        <p class="contact__text">
          Me chama no WhatsApp, no LinkedIn ou manda um e-mail.
        </p>

        <div class="contact__actions">
          <v-btn
            :href="profile.whatsapp"
            target="_blank"
            rel="noopener"
            color="primary"
            size="x-large"
            prepend-icon="mdi-whatsapp"
            class="contact__cta"
          >
            Chamar no WhatsApp
          </v-btn>
          <v-btn
            :href="`mailto:${profile.email}`"
            variant="outlined"
            size="x-large"
            prepend-icon="mdi-email-fast-outline"
          >
            E-mail
          </v-btn>
          <v-btn
            :href="profile.linkedin"
            target="_blank"
            rel="noopener"
            variant="outlined"
            size="x-large"
            prepend-icon="mdi-linkedin"
          >
            LinkedIn
          </v-btn>
        </div>

        <v-btn
          :href="profile.resume"
          download
          variant="tonal"
          color="secondary"
          prepend-icon="mdi-file-download-outline"
          class="mb-6"
        >
          Baixar currículo (PDF)
        </v-btn>

        <br>

        <button type="button" class="contact__email font-mono" @click="copyEmail">
          {{ profile.email }}
          <v-icon :icon="copied ? 'mdi-check' : 'mdi-content-copy'" size="16" />
        </button>
      </div>
    </v-container>

    <v-snackbar v-model="copied" :timeout="2200" color="primary" location="bottom">
      E-mail copiado!
    </v-snackbar>
  </section>
</template>

<style scoped lang="scss">
.contact {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 72px 24px;
  border-radius: 28px;

  &__orb {
    position: absolute;
    width: 600px;
    height: 600px;
    left: 50%;
    top: -360px;
    translate: -50% 0;
    border-radius: 50%;
    background: conic-gradient(from 0deg, var(--green), var(--cyan), var(--violet), var(--green));
    filter: blur(100px);
    opacity: 0.25;
    animation: spin 14s linear infinite;
    pointer-events: none;
  }

  // Conteúdo acima do orb; o orb fica de fora para continuar absolute
  > *:not(.contact__orb) {
    position: relative;
  }

  .section-eyebrow {
    display: flex;
  }

  &__title {
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.02em;
    max-width: 820px;
    margin: 0 auto 16px;
  }

  &__text {
    color: var(--muted);
    font-size: 1.1rem;
    margin-bottom: 36px;
  }

  &__actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 28px;
  }

  &__cta {
    color: #07070d !important;
    font-weight: 600;
    box-shadow: 0 0 40px rgba(66, 211, 146, 0.4);
  }

  &__email {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    font-size: 0.9rem;
    padding: 6px 12px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;

    &:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

@keyframes spin {
  to { rotate: 360deg; }
}
</style>
