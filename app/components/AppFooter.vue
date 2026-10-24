<script setup lang="ts">
import { profile } from '~/data/portfolio'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <v-container class="footer__inner">
      <p class="font-mono text-caption text-medium-emphasis">
        © {{ year }} • Desenvolvido por {{ profile.name }}
      </p>
      <div>
        <v-btn
          :href="profile.github"
          target="_blank"
          rel="noopener"
          icon="mdi-github"
          variant="text"
          size="small"
          aria-label="GitHub"
        />
        <v-btn
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          icon="mdi-linkedin"
          variant="text"
          size="small"
          aria-label="LinkedIn"
        />
        <v-btn
          :href="`mailto:${profile.email}`"
          icon="mdi-email-outline"
          variant="text"
          size="small"
          aria-label="E-mail"
        />
        <v-btn
          :href="profile.whatsapp"
          target="_blank"
          rel="noopener"
          icon="mdi-whatsapp"
          variant="text"
          size="small"
          aria-label="WhatsApp"
        />
      </div>
    </v-container>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  position: relative;
  border-top: 1px solid var(--border);

  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
    padding-block: 24px;
  }
}
</style>
