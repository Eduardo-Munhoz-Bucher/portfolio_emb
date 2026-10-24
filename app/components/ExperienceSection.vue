<script setup lang="ts">
import { experiences } from '~/data/portfolio'
</script>

<template>
  <section id="experiencia" class="section">
    <v-container>
      <p v-reveal class="section-eyebrow">02. experiência</p>
      <h2 v-reveal="80" class="section-title">
        Onde eu <span class="text-gradient">trabalho</span>.
      </h2>

      <div class="timeline">
        <article
          v-for="exp in experiences"
          :key="exp.role"
          v-reveal="120"
          class="timeline__item"
        >
          <span class="timeline__dot" :class="{ 'timeline__dot--current': exp.current }" />

          <div class="timeline__card glass">
            <header class="timeline__header">
              <div>
                <h3 class="font-display text-h5 font-weight-bold">
                  {{ exp.role }} <span class="text-primary">@ {{ exp.company }}</span>
                </h3>
                <p class="font-mono text-caption text-medium-emphasis mt-1">
                  {{ exp.period }} · {{ exp.type }}
                </p>
              </div>
              <v-chip
                v-if="exp.current"
                color="primary"
                size="small"
                variant="tonal"
                prepend-icon="mdi-circle-medium"
              >
                O momento
              </v-chip>
            </header>

            <p class="timeline__summary">{{ exp.summary }}</p>

            <div class="highlights">
              <div v-for="h in exp.highlights" :key="h.title" class="highlights__item">
                <p class="highlights__title">
                  <v-icon icon="mdi-chevron-right" size="18" color="primary" />
                  {{ h.title }}
                </p>
                <p class="highlights__text">{{ h.text }}</p>
              </div>
            </div>

            <div class="d-flex flex-wrap ga-2 mt-6">
              <v-chip
                v-for="tag in exp.tags"
                :key="tag"
                size="small"
                variant="outlined"
                class="font-mono"
              >
                {{ tag }}
              </v-chip>
            </div>
          </div>
        </article>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  position: relative;
  padding-left: 36px;

  &::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 2px;
    background: linear-gradient(var(--green), var(--violet) 60%, transparent);
  }

  &__item {
    position: relative;

    & + & {
      margin-top: 32px;
    }
  }

  &__dot {
    position: absolute;
    left: -36px;
    top: 30px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--violet);

    &--current {
      border-color: var(--green);
      background: var(--green);
      box-shadow: 0 0 0 6px rgba(66, 211, 146, 0.15), 0 0 24px var(--green);
    }
  }

  &__card {
    padding: 28px;
    transition: border-color 0.3s, transform 0.3s;

    &:hover {
      border-color: var(--border-strong);
      transform: translateX(4px);
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  &__summary {
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;

  &__item {
    padding: 16px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid transparent;
    transition: border-color 0.3s, background 0.3s;

    &:hover {
      border-color: rgba(66, 211, 146, 0.3);
      background: rgba(66, 211, 146, 0.04);
    }
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  &__text {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.6;
  }
}
</style>
