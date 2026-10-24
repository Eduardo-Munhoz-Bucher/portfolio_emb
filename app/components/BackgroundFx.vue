<script setup lang="ts">
/**
 * Fundo fixo: rede de partículas em canvas que reage ao mouse,
 * blobs de gradiente animados, grid sutil e um spotlight seguindo o cursor.
 */
const canvas = ref<HTMLCanvasElement>()
const spotlight = ref<HTMLDivElement>()

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

onMounted(() => {
  const el = canvas.value
  const ctx = el?.getContext('2d')
  if (!el || !ctx) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const mouse = { x: -9999, y: -9999 }
  let particles: Particle[] = []
  let width = 0
  let height = 0
  let frame = 0

  const resize = () => {
    width = window.innerWidth
    height = window.innerHeight
    el.width = width * dpr
    el.height = height * dpr
    el.style.width = `${width}px`
    el.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.min(Math.floor((width * height) / 16000), 110)
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.6,
    }))
  }

  const LINK = 130
  const MOUSE = 180

  const draw = () => {
    ctx.clearRect(0, 0, width, height)

    for (const p of particles) {
      // Partículas próximas do mouse são levemente atraídas
      const dxm = mouse.x - p.x
      const dym = mouse.y - p.y
      const dm = Math.hypot(dxm, dym)
      if (dm < MOUSE) {
        p.vx += (dxm / dm) * 0.012
        p.vy += (dym / dm) * 0.012
      }
      p.vx *= 0.995
      p.vy *= 0.995
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1
    }

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i]!
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j]!
        const d = Math.hypot(a.x - b.x, a.y - b.y)
        if (d > LINK) continue
        ctx.strokeStyle = `rgba(124, 92, 255, ${(1 - d / LINK) * 0.22})`
        ctx.lineWidth = 0.8
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
      if (dm < MOUSE) {
        ctx.strokeStyle = `rgba(66, 211, 146, ${(1 - dm / MOUSE) * 0.5})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(mouse.x, mouse.y)
        ctx.stroke()
      }

      ctx.fillStyle = dm < MOUSE ? 'rgba(66, 211, 146, 0.9)' : 'rgba(236, 235, 245, 0.55)'
      ctx.beginPath()
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
      ctx.fill()
    }

    if (!reduceMotion) frame = requestAnimationFrame(draw)
  }

  const onMove = (e: PointerEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
    spotlight.value?.style.setProperty('--x', `${e.clientX}px`)
    spotlight.value?.style.setProperty('--y', `${e.clientY}px`)
  }
  const onLeave = () => {
    mouse.x = -9999
    mouse.y = -9999
  }

  resize()
  draw()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <div class="bg-fx" aria-hidden="true">
    <div class="bg-fx__grid" />
    <div class="bg-fx__blob bg-fx__blob--1" />
    <div class="bg-fx__blob bg-fx__blob--2" />
    <div class="bg-fx__blob bg-fx__blob--3" />
    <canvas ref="canvas" class="bg-fx__canvas" />
    <div ref="spotlight" class="bg-fx__spotlight" />
    <div class="bg-fx__noise" />
  </div>
</template>

<style scoped lang="scss">
.bg-fx {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  &__grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%);
  }

  &__blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.35;
    animation: float 22s ease-in-out infinite alternate;

    &--1 {
      width: 520px;
      height: 520px;
      background: var(--violet);
      top: -160px;
      left: -120px;
    }
    &--2 {
      width: 460px;
      height: 460px;
      background: var(--green);
      top: 30%;
      right: -160px;
      opacity: 0.22;
      animation-duration: 28s;
      animation-delay: -6s;
    }
    &--3 {
      width: 380px;
      height: 380px;
      background: var(--cyan);
      bottom: -140px;
      left: 30%;
      opacity: 0.18;
      animation-duration: 32s;
      animation-delay: -12s;
    }
  }

  &__canvas {
    position: absolute;
    inset: 0;
  }

  &__spotlight {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      600px circle at var(--x, 50%) var(--y, -20%),
      rgba(66, 211, 146, 0.07),
      transparent 60%
    );
  }

  &__noise {
    position: absolute;
    inset: 0;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(80px, 60px) scale(1.1); }
  100% { transform: translate(-40px, 120px) scale(0.95); }
}
</style>
