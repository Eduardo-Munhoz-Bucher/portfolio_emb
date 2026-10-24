<script setup lang="ts">
const props = withDefaults(defineProps<{ to: number, duration?: number }>(), { duration: 1600 })

const el = ref<HTMLElement>()
const value = ref(props.to)

onMounted(() => {
  if (!el.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  value.value = 0

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer.disconnect()
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now - start) / props.duration, 1)
      const eased = 1 - Math.pow(1 - t, 4)
      value.value = Math.round(eased * props.to)
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  })
  observer.observe(el.value)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <span ref="el">{{ value }}</span>
</template>
