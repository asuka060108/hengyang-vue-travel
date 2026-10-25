<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  stats: { type: Array, required: true },
  inverted: { type: Boolean, default: false },
});

const currentValues = ref(props.stats.map(() => 0));
const reducedMotion = window.matchMedia?.(
  '(prefers-reduced-motion: reduce)'
).matches;

function formatValue(value, stat) {
  const fixed = value.toFixed(stat.decimals ?? 0);
  return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

onMounted(() => {
  if (reducedMotion) {
    currentValues.value = props.stats.map((stat) => stat.value);
    return;
  }

  const start = performance.now();
  const duration = 1500;

  function tick(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);

    currentValues.value = props.stats.map((stat) => stat.value * eased);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
});
</script>

<template>
  <div class="stat-strip" :class="{ 'is-inverted': inverted }">
    <div v-for="(stat, index) in stats" :key="stat.label" class="stat">
      <p class="stat__value">
        {{ formatValue(currentValues[index], stat) }}<span>{{ stat.suffix }}</span>
      </p>
      <p class="stat__label">{{ stat.label }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.stat {
  padding: 28px clamp(14px, 3vw, 34px);
  border-left: 1px solid var(--line);
}

.stat:first-child {
  border-left: 0;
}

.stat__value {
  margin-bottom: 6px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: clamp(1.9rem, 3.4vw, 3.1rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.04em;
}

.stat__value span {
  margin-left: 4px;
  color: var(--cinnabar);
  font-family: var(--sans);
  font-size: 0.58em;
  font-weight: 600;
  letter-spacing: 0;
}

.stat__label {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
}

.stat-strip.is-inverted {
  border-color: rgba(247, 240, 225, 0.18);
}

.stat-strip.is-inverted .stat {
  border-color: rgba(247, 240, 225, 0.18);
}

.stat-strip.is-inverted .stat__value {
  color: #f7f0e1;
}

.stat-strip.is-inverted .stat__label {
  color: rgba(247, 240, 225, 0.58);
}

@media (max-width: 700px) {
  .stat-strip {
    grid-template-columns: 1fr 1fr;
  }

  .stat:nth-child(odd) {
    border-left: 0;
  }

  .stat:nth-child(n + 3) {
    border-top: 1px solid var(--line);
  }

  .stat-strip.is-inverted .stat:nth-child(n + 3) {
    border-top-color: rgba(247, 240, 225, 0.18);
  }
}
</style>
