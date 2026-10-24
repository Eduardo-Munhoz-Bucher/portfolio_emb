<script setup lang="ts">
import { about, stats } from '~/data/portfolio'
</script>

<template>
  <section id="sobre" class="section">
    <v-container>
      <p v-reveal class="section-eyebrow">01. sobre mim</p>
      <h2 v-reveal="80" class="section-title">
        Do outro lado do <span class="text-gradient">chamado</span>.
      </h2>

      <v-row>
        <v-col cols="12" md="7">
          <p
            v-for="(paragraph, i) in about"
            :key="i"
            v-reveal="120 + i * 100"
            class="about__text"
          >
            {{ paragraph }}
          </p>
        </v-col>

        <v-col cols="12" md="5">
          <div v-reveal="200" class="journey glass">
            <div class="journey__step">
              <v-icon icon="mdi-headset" class="journey__icon" />
              <div>
                <p class="font-mono text-caption text-medium-emphasis">2022 — 2025</p>
                <p class="font-display text-h6">Suporte</p>
                <p class="text-body-2 text-medium-emphasis">
                  Telefone, chat e campo. Aprendendo onde o usuário trava.
                </p>
              </div>
            </div>

            <div class="journey__line" aria-hidden="true" />

            <div class="journey__step">
              <v-icon icon="mdi-code-tags" class="journey__icon journey__icon--active" />
              <div>
                <p class="font-mono text-caption text-medium-emphasis">2025 — hoje</p>
                <p class="font-display text-h6">Desenvolvimento</p>
                <p class="text-body-2 text-medium-emphasis">
                  Construindo as telas do mesmo sistema que eu atendia.
                </p>
              </div>
            </div>
          </div>

          <div class="stats">
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              v-reveal="300 + i * 100"
              class="stats__item glass"
            >
              <p class="stats__value font-display text-gradient">
                <CountUp :to="stat.value" />{{ stat.suffix }}
              </p>
              <p class="stats__label">{{ stat.label }}</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.about__text {
  color: var(--muted);
  font-size: 1.08rem;
  line-height: 1.8;
  margin-bottom: 20px;
}

.journey {
  padding: 28px;
  margin-bottom: 16px;

  &__step {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &__icon {
    flex: none;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border);
    color: var(--muted);

    &--active {
      color: var(--green);
      border-color: rgba(66, 211, 146, 0.4);
      box-shadow: 0 0 24px rgba(66, 211, 146, 0.25);
    }
  }

  &__line {
    width: 2px;
    height: 32px;
    margin: 8px 0 8px 21px;
    background: linear-gradient(var(--border-strong), var(--green));
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 10px;
      background: var(--green);
      box-shadow: 0 0 8px var(--green);
      animation: travel 2s linear infinite;
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  &__item {
    padding: 18px 14px;
    text-align: center;
    border-radius: 16px;
  }

  &__value {
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 6px;
  }

  &__label {
    font-size: 0.78rem;
    color: var(--muted);
    line-height: 1.35;
  }
}

@keyframes travel {
  from { top: -10px; }
  to { top: 100%; }
}
</style>
