<script setup lang="ts">
/**
 * Card com inclinação 3D e brilho que segue o cursor.
 */
const props = withDefaults(defineProps<{ max?: number, tag?: string }>(), {
  max: 8,
  tag: 'div',
})

const el = ref<HTMLElement>()
const style = ref<Record<string, string>>({})

const onMove = (e: PointerEvent) => {
  if (e.pointerType === 'touch' || !el.value) return
  const rect = el.value.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  style.value = {
    '--mx': `${px * 100}%`,
    '--my': `${py * 100}%`,
    transform: `perspective(900px) rotateX(${(0.5 - py) * props.max}deg) rotateY(${(px - 0.5) * props.max}deg)`,
  }
}

const onLeave = () => {
  style.value = { transform: 'perspective(900px) rotateX(0) rotateY(0)' }
}
</script>

<template>
  <component
    :is="tag"
    ref="el"
    class="tilt glass"
    :style="style"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="tilt__glow" aria-hidden="true" />
    <slot />
  </component>
</template>

<style scoped lang="scss">
.tilt {
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s;
  will-change: transform;

  &:hover {
    border-color: var(--border-strong);
  }

  /* Borda com gradiente que acende perto do cursor */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      300px circle at var(--mx, 50%) var(--my, 50%),
      rgba(66, 211, 146, 0.7),
      rgba(124, 92, 255, 0.4) 40%,
      transparent 70%
    );
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &__glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      400px circle at var(--mx, 50%) var(--my, 50%),
      rgba(124, 92, 255, 0.12),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }

  &:hover::before,
  &:hover &__glow {
    opacity: 1;
  }
}
</style>
