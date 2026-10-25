<script setup>
const props = defineProps({
  tips: { type: Array, required: true },
});

const iconLabels = {
  weather: '候',
  train: '行',
  food: '味',
  temple: '礼',
};
</script>

<template>
  <div class="tips-grid">
    <article v-for="(tip, index) in props.tips" :key="tip.title" class="tip-card">
      <div class="tip-card__top">
        <span class="tip-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="tip-card__seal">{{ iconLabels[tip.icon] ?? '记' }}</span>
      </div>
      <h3>{{ tip.title }}</h3>
      <p>{{ tip.text }}</p>
    </article>
  </div>
</template>

<style scoped>
.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  overflow: hidden;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.tip-card {
  padding: 26px 24px 28px;
  background: var(--surface);
  transition: background-color 0.25s ease;
}

.tip-card:hover {
  background: var(--surface-strong);
}

.tip-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.tip-card__number {
  color: var(--faint);
  font-family: var(--serif);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
}

.tip-card__seal {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  color: var(--cinnabar);
  font-family: var(--serif);
  font-size: 0.92rem;
  background: var(--cinnabar-light);
  border-radius: 50%;
}

.tip-card h3 {
  margin-bottom: 10px;
  font-size: 1.18rem;
}

.tip-card p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.78;
}

@media (max-width: 900px) {
  .tips-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 520px) {
  .tips-grid {
    grid-template-columns: 1fr;
  }
}
</style>
