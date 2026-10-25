<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left' },
  inverted: { type: Boolean, default: false },
});
</script>

<template>
  <header
    class="section-heading"
    :class="[`is-${align}`, { 'is-inverted': inverted }]"
  >
    <div class="section-heading__copy">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2>{{ title }}</h2>
      <p v-if="description || $slots.description" class="section-heading__desc">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <div v-if="$slots.actions" class="section-heading__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: clamp(30px, 4vw, 52px);
}

.section-heading__copy {
  max-width: 760px;
}

.section-heading h2 {
  max-width: 24ch;
  margin-bottom: 14px;
  color: var(--ink);
}

.section-heading__desc {
  max-width: 58ch;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.96rem;
  line-height: 1.85;
}

.section-heading__actions {
  flex: 0 0 auto;
  padding-bottom: 3px;
}

.section-heading.is-center {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.section-heading.is-center .section-heading__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-heading.is-center h2 {
  max-width: 20ch;
}

.section-heading.is-center .section-heading__desc {
  margin-inline: auto;
}

.section-heading.is-inverted h2,
.section-heading.is-inverted .section-heading__desc {
  color: #f7f0e1;
}

@media (max-width: 700px) {
  .section-heading {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .section-heading.is-center {
    align-items: center;
  }

  .section-heading h2 {
    max-width: 100%;
  }
}
</style>
