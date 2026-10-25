<script setup>
const props = defineProps({
  options: { type: Array, required: true },
  label: { type: String, default: '筛选' },
});

const model = defineModel({ type: String, default: 'all' });

function select(value) {
  model.value = value;
}
</script>

<template>
  <div class="filter-tabs" role="tablist" :aria-label="label">
    <button
      v-for="option in props.options"
      :key="option.value"
      type="button"
      role="tab"
      class="filter-tabs__item"
      :class="{ 'is-active': model === option.value }"
      :aria-selected="model === option.value"
      @click="select(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.filter-tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 5px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
}

.filter-tabs__item {
  min-height: 34px;
  padding: 6px 15px;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 600;
  background: transparent;
  border-radius: 999px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.filter-tabs__item:hover {
  color: var(--ink);
}

.filter-tabs__item.is-active {
  color: #fbf8f1;
  background: var(--jade);
  box-shadow: 0 6px 16px rgba(31, 107, 86, 0.18);
}

@media (max-width: 600px) {
  .filter-tabs {
    width: 100%;
    border-radius: 16px;
  }

  .filter-tabs__item {
    flex: 1 0 auto;
    padding-inline: 12px;
  }
}
</style>
