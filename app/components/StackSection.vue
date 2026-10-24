<script setup lang="ts">
import { techs, type Tech } from '~/data/portfolio'

const groups: { key: Tech['group'], label: string, icon: string }[] = [
  { key: 'front', label: 'Front-end', icon: 'mdi-monitor-dashboard' },
  { key: 'back', label: 'Back-end & dados', icon: 'mdi-server-outline' },
  { key: 'tools', label: 'Ferramentas', icon: 'mdi-tools' },
]

const byGroup = (key: Tech['group']) => techs.filter(t => t.group === key)
</script>

<template>
  <section id="stack" class="section">
    <v-container>
      <p v-reveal class="section-eyebrow">03. stack</p>
      <h2 v-reveal="80" class="section-title">
        Ferramentas do <span class="text-gradient">dia a dia</span>.
      </h2>
    </v-container>

    <div v-reveal="120" class="marquee" aria-hidden="true">
      <div class="marquee__track">
        <div v-for="n in 2" :key="n" class="marquee__group">
          <div v-for="tech in techs" :key="`${n}-${tech.name}`" class="marquee__item">
            <img :src="tech.icon" alt="" :class="{ invert: tech.invert }" loading="lazy">
            <span class="font-display">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <v-container>
      <v-row class="mt-10">
        <v-col v-for="(group, gi) in groups" :key="group.key" cols="12" md="4">
          <div v-reveal="gi * 120" class="group glass">
            <p class="group__title font-display">
              <v-icon :icon="group.icon" color="primary" size="20" />
              {{ group.label }}
            </p>
            <div class="group__grid">
              <div v-for="tech in byGroup(group.key)" :key="tech.name" class="tech">
                <img
                  :src="tech.icon"
                  :alt="tech.name"
                  :class="{ invert: tech.invert }"
                  width="36"
                  height="36"
                  loading="lazy"
                >
                <span>{{ tech.name }}</span>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.invert {
  filter: brightness(0) invert(1);
}

.marquee {
  overflow: hidden;
  border-block: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.015);
  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
  transform: rotate(-1.5deg);
  margin-inline: -20px;

  &__track {
    display: flex;
    width: max-content;
    animation: marquee 40s linear infinite;
  }

  &:hover &__track {
    animation-play-state: paused;
  }

  &__group {
    display: flex;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 22px 36px;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--muted);
    white-space: nowrap;

    img {
      width: 32px;
      height: 32px;
    }

    &::after {
      content: '✦';
      margin-left: 36px;
      color: var(--violet);
      font-size: 0.9rem;
    }
  }
}

.group {
  height: 100%;
  padding: 24px;

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
    gap: 10px;
  }
}

.tech {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 8px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  font-size: 0.8rem;
  color: var(--muted);
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, box-shadow 0.3s, color 0.3s;

  img {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover {
    transform: translateY(-6px);
    color: var(--text);
    border-color: rgba(66, 211, 146, 0.4);
    box-shadow: 0 12px 32px -12px rgba(66, 211, 146, 0.45);

    img {
      transform: scale(1.15) rotate(-6deg);
    }
  }
}

@keyframes marquee {
  to { transform: translateX(-50%); }
}
</style>
