<script setup lang="ts">
import { profile, projects } from '~/data/portfolio'
</script>

<template>
  <section id="projetos" class="section">
    <v-container>
      <p v-reveal class="section-eyebrow">04. projetos</p>
      <h2 v-reveal="80" class="section-title">
        Coisas que eu <span class="text-gradient">construí</span>.
      </h2>

      <v-row>
        <v-col v-for="(project, i) in projects" :key="project.title" cols="12" md="6">
          <div v-reveal="(i % 2) * 120" class="h-100">
            <TiltCard tag="article" class="project h-100" :max="6">
              <div class="project__top">
                <div class="project__icon">
                  <v-icon :icon="project.icon" size="26" />
                </div>
                <div class="d-flex align-center ga-1">
                  <v-chip
                    size="x-small"
                    :color="project.kind === 'Profissional' ? 'primary' : 'secondary'"
                    variant="tonal"
                    class="font-mono mr-1"
                  >
                    {{ project.kind }}
                  </v-chip>
                  <v-btn
                    v-for="link in project.links"
                    :key="link.href"
                    :href="link.href"
                    target="_blank"
                    rel="noopener"
                    :icon="link.icon"
                    :aria-label="`${link.label}: ${project.title}`"
                    variant="text"
                    size="small"
                  />
                </div>
              </div>

              <h3 class="project__title font-display">{{ project.title }}</h3>
              <p class="project__desc">{{ project.description }}</p>

              <ul class="project__tags font-mono">
                <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
              </ul>
            </TiltCard>
          </div>
        </v-col>
      </v-row>

      <div v-reveal class="text-center mt-12">
        <v-btn
          :href="profile.github"
          target="_blank"
          rel="noopener"
          variant="outlined"
          prepend-icon="mdi-github"
          append-icon="mdi-arrow-top-right"
        >
          Mais no GitHub
        </v-btn>
      </div>
    </v-container>
  </section>
</template>

<style scoped lang="scss">
.project {
  display: flex;
  flex-direction: column;
  padding: 28px;

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  &__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: 14px;
    color: var(--green);
    background: linear-gradient(135deg, rgba(66, 211, 146, 0.18), rgba(124, 92, 255, 0.18));
    border: 1px solid var(--border);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover &__icon {
    transform: rotate(-8deg) scale(1.08);
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    transition: color 0.3s;
  }

  &:hover &__title {
    color: var(--green);
  }

  &__desc {
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 20px;
    flex: 1;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    list-style: none;
    font-size: 0.78rem;
    color: var(--cyan);
  }
}
</style>
