<script setup>
defineProps({
  title: { type: String, default: '没有找到匹配的内容' },
  text: {
    type: String,
    default: '换个关键词或筛选条件，也许会有新的发现。',
  },
});
</script>

<template>
  <div class="empty-state">
    <svg
      viewBox="0 0 64 64"
      width="54"
      height="54"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="16" />
      <path d="m40 40 12 12M21 28h14M28 21v14" stroke-linecap="round" />
    </svg>
    <h3>{{ title }}</h3>
    <p>{{ text }}</p>
    <slot name="actions" />
  </div>
</template>

<style scoped>
.empty-state {
  display: grid;
  justify-items: center;
  padding: clamp(44px, 7vw, 80px) 24px;
  color: var(--muted);
  text-align: center;
  background: var(--surface);
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius);
}

.empty-state svg {
  margin-bottom: 16px;
  color: var(--gold);
}

.empty-state h3 {
  margin-bottom: 8px;
  color: var(--ink);
}

.empty-state p {
  max-width: 36ch;
  margin-bottom: 18px;
  font-size: 0.88rem;
}
</style>
