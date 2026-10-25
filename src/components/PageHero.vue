<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  accent: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  image: { type: String, required: true },
  imagePosition: { type: String, default: 'center' },
  compact: { type: Boolean, default: false },
});
</script>

<template>
  <section class="page-hero" :class="{ 'is-compact': compact }">
    <img
      class="page-hero__image"
      :src="image"
      :alt="title"
      :style="{ objectPosition: imagePosition }"
    />
    <div class="page-hero__veil"></div>
    <div class="page-hero__grain"></div>

    <div class="container page-hero__inner">
      <div class="page-hero__content">
        <p v-if="eyebrow" class="page-hero__eyebrow">{{ eyebrow }}</p>
        <h1>
          {{ title }}
          <em v-if="accent">{{ accent }}</em>
        </h1>
        <p v-if="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>

        <div v-if="$slots.meta" class="page-hero__meta">
          <slot name="meta" />
        </div>

        <div v-if="$slots.actions" class="page-hero__actions">
          <slot name="actions" />
        </div>
      </div>

      <div v-if="$slots.aside" class="page-hero__aside">
        <slot name="aside" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-hero {
  position: relative;
  display: flex;
  min-height: min(72vh, 720px);
  padding-block: clamp(100px, 14vw, 170px) clamp(60px, 8vw, 100px);
  overflow: hidden;
  color: #f7f0e1;
  background: #18221d;
}

.page-hero.is-compact {
  min-height: 440px;
  padding-block: 110px 64px;
}

.page-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85) contrast(0.98);
  transform: scale(1.015);
  animation: heroDrift 18s ease-in-out infinite alternate;
}

@keyframes heroDrift {
  to {
    transform: scale(1.07) translate3d(-0.6%, -0.6%, 0);
  }
}

.page-hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 18, 15, 0.86) 0%, rgba(10, 18, 15, 0.55) 48%, rgba(10, 18, 15, 0.12) 100%),
    linear-gradient(0deg, rgba(10, 18, 15, 0.54), transparent 45%);
}

.page-hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.page-hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 48px;
  width: min(var(--max-width), calc(100% - 48px));
}

.page-hero__content {
  max-width: 780px;
}

.page-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: #e9c686;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.23em;
  text-transform: uppercase;
}

.page-hero__eyebrow::before {
  content: "";
  width: 32px;
  height: 1px;
  background: currentColor;
}

.page-hero h1 {
  max-width: 12ch;
  margin-bottom: 20px;
  color: #fbf6e9;
  font-size: clamp(3rem, 7vw, 6.2rem);
  text-wrap: balance;
  text-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
}

.page-hero h1 em {
  display: block;
  color: #e9c686;
  font-style: normal;
}

.page-hero__subtitle {
  max-width: 54ch;
  margin-bottom: 0;
  color: rgba(247, 240, 225, 0.73);
  font-size: clamp(0.96rem, 1.4vw, 1.1rem);
  line-height: 1.9;
}

.page-hero__meta,
.page-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 28px;
}

.page-hero__meta {
  color: rgba(247, 240, 225, 0.58);
  font-size: 0.74rem;
  letter-spacing: 0.08em;
}

.page-hero__aside {
  flex: 0 0 auto;
  align-self: flex-end;
  max-width: 280px;
}

@media (max-width: 900px) {
  .page-hero {
    min-height: 620px;
    padding-block: 96px 50px;
  }

  .page-hero__inner {
    align-items: flex-start;
    flex-direction: column;
    gap: 28px;
  }

  .page-hero__aside {
    max-width: 100%;
    align-self: flex-start;
  }
}

@media (max-width: 600px) {
  .page-hero {
    min-height: 560px;
  }

  .page-hero__inner {
    width: calc(100% - 36px);
  }

  .page-hero h1 {
    font-size: clamp(2.75rem, 14vw, 4.1rem);
  }

  .page-hero__subtitle {
    font-size: 0.9rem;
  }
}
</style>
