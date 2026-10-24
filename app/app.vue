<template>
  <v-app>
    <NuxtRouteAnnouncer />
    <BackgroundFx />
    <AppNav />

    <v-main class="main">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<style scoped>
.main {
  position: relative;
  z-index: 1;
}
</style>
