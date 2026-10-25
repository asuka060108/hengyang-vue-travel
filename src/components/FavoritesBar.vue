<script setup>
const props = defineProps({
  items: { type: Array, required: true },
});

defineEmits(['remove', 'clear']);
</script>

<template>
  <Transition name="favorites">
    <section v-if="props.items.length" class="favorites" aria-live="polite">
      <div class="favorites__head">
        <div>
          <p class="favorites__eyebrow">MY TASTE LIST</p>
          <h3>我的衡阳味觉清单</h3>
        </div>
        <button type="button" class="favorites__clear" @click="$emit('clear')">
          清空
        </button>
      </div>

      <div class="favorites__chips">
        <button
          v-for="item in props.items"
          :key="item.id"
          type="button"
          class="favorites__chip"
          :aria-label="`移除${item.name}`"
          @click="$emit('remove', item.id)"
        >
          {{ item.name }}
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.favorites {
  margin-bottom: 30px;
  padding: 20px 22px;
  background: var(--jade-light);
  border: 1px solid color-mix(in srgb, var(--jade) 22%, transparent);
  border-radius: 16px;
}

.favorites__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

.favorites__eyebrow {
  margin-bottom: 3px;
  color: var(--jade);
  font-size: 0.56rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.favorites h3 {
  margin: 0;
  font-size: 1.1rem;
}

.favorites__clear {
  padding: 4px 0;
  color: var(--muted);
  font-size: 0.72rem;
  background: transparent;
  border-bottom: 1px solid var(--line-strong);
  cursor: pointer;
}

.favorites__clear:hover {
  color: var(--cinnabar);
}

.favorites__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.favorites__chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 11px;
  color: var(--jade-deep);
  font-size: 0.73rem;
  background: var(--surface);
  border: 1px solid color-mix(in srgb, var(--jade) 20%, transparent);
  border-radius: 999px;
  cursor: pointer;
}

.favorites__chip span {
  color: var(--faint);
  font-size: 0.9rem;
  line-height: 1;
}

.favorites__chip:hover span {
  color: var(--cinnabar);
}

.favorites-enter-active,
.favorites-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.favorites-enter-from,
.favorites-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
