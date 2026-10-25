<script setup>
const props = defineProps({
  food: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
  index: { type: Number, default: 0 },
});

defineEmits(['toggle-favorite']);

const spiceLabels = ['不辣', '微辣', '中辣', '重辣'];
</script>

<template>
  <article class="food-card">
    <div class="food-card__media">
      <img
        :src="food.image"
        :alt="`${food.name}菜品示意`"
        :style="{ objectPosition: food.imagePosition }"
        loading="lazy"
      />
      <div class="food-card__shade"></div>

      <span class="food-card__category">{{ food.category }}</span>

      <button
        type="button"
        class="food-card__favorite"
        :class="{ 'is-favorite': favorite }"
        :aria-label="favorite ? `取消收藏${food.name}` : `收藏${food.name}`"
        :aria-pressed="favorite"
        @click="$emit('toggle-favorite', food.id)"
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          :fill="favorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="1.6"
          aria-hidden="true"
        >
          <path
            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.3l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="food-card__spice" :aria-label="`辣度：${spiceLabels[food.spice]}`">
        <span
          v-for="level in 3"
          :key="level"
          class="food-card__chili"
          :class="{ 'is-filled': level <= food.spice }"
        ></span>
        <small>{{ spiceLabels[food.spice] }}</small>
      </div>
    </div>

    <div class="food-card__body">
      <div class="food-card__top">
        <div>
          <p class="food-card__eyebrow">{{ food.season }}</p>
          <h3>{{ food.name }}</h3>
        </div>
        <span class="food-card__price">{{ food.price }}</span>
      </div>

      <p class="food-card__summary">{{ food.summary }}</p>
      <p class="food-card__description">{{ food.description }}</p>

      <div class="food-card__tags">
        <span v-for="tag in food.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <p class="food-card__tip">
        <span>吃法</span>
        {{ food.tip }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.food-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.food-card:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow);
  transform: translateY(-5px);
}

.food-card__media {
  position: relative;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: var(--bg-soft);
}

.food-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.food-card:hover .food-card__media img {
  transform: scale(1.05);
}

.food-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 15, 0.12),
    transparent 44%,
    rgba(10, 18, 15, 0.36)
  );
}

.food-card__category {
  position: absolute;
  top: 14px;
  left: 16px;
  padding: 5px 10px;
  color: #f7f0e1;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  background: rgba(15, 26, 20, 0.44);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.food-card__favorite {
  position: absolute;
  top: 12px;
  right: 14px;
  display: grid;
  width: 38px;
  height: 38px;
  padding: 0;
  place-items: center;
  color: #f7f0e1;
  background: rgba(15, 26, 20, 0.38);
  border: 1px solid rgba(255, 255, 255, 0.23);
  border-radius: 50%;
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;
}

.food-card__favorite:hover {
  transform: scale(1.07);
}

.food-card__favorite.is-favorite {
  color: #f1b1a7;
  background: rgba(184, 73, 50, 0.38);
}

.food-card__spice {
  position: absolute;
  bottom: 14px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.78);
}

.food-card__spice small {
  margin-left: 5px;
  font-size: 0.6rem;
  letter-spacing: 0.05em;
}

.food-card__chili {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 50%;
}

.food-card__chili.is-filled {
  background: #e96c52;
  box-shadow: 0 0 0 3px rgba(233, 108, 82, 0.12);
}

.food-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px 22px 20px;
}

.food-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
}

.food-card__eyebrow {
  margin-bottom: 4px;
  color: var(--cinnabar);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.food-card h3 {
  margin-bottom: 0;
}

.food-card__price {
  flex: 0 0 auto;
  padding-top: 3px;
  color: var(--gold);
  font-family: var(--serif);
  font-size: 0.95rem;
  font-weight: 600;
}

.food-card__summary {
  margin: 13px 0 10px;
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: 1.02rem;
  line-height: 1.6;
}

.food-card__description {
  margin-bottom: 16px;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.78;
}

.food-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
  margin-bottom: 16px;
}

.food-card__tip {
  margin-bottom: 0;
  padding-top: 14px;
  color: var(--faint);
  font-size: 0.75rem;
  line-height: 1.65;
  border-top: 1px solid var(--line);
}

.food-card__tip span {
  margin-right: 7px;
  color: var(--cinnabar);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

@media (max-width: 600px) {
  .food-card__body {
    padding: 18px;
  }
}
</style>
