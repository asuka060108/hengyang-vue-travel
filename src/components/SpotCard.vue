<script setup>
defineProps({
  spot: { type: Object, required: true },
  index: { type: Number, default: 0 },
});

defineEmits(['open']);
</script>

<template>
  <button
    type="button"
    class="spot-card"
    :style="{ '--delay': `${index * 45}ms` }"
    @click="$emit('open', spot)"
  >
    <div class="spot-card__media">
      <img
        :src="spot.image"
        :alt="`${spot.name}风景`"
        :style="{ objectPosition: spot.imagePosition }"
        loading="lazy"
      />
      <div class="spot-card__shade"></div>
      <span class="spot-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="spot-card__category">{{ spot.category }}</span>
      <span class="spot-card__arrow" aria-hidden="true">↗</span>
    </div>

    <div class="spot-card__body">
      <div class="spot-card__heading">
        <div>
          <p class="spot-card__eyebrow">{{ spot.eyebrow }}</p>
          <h3>{{ spot.name }}</h3>
        </div>
        <span class="spot-card__rating">★ {{ spot.rating }}</span>
      </div>

      <p class="spot-card__summary">{{ spot.summary }}</p>

      <div class="spot-card__footer">
        <span>{{ spot.location }}</span>
        <span>{{ spot.duration }}</span>
        <span>{{ spot.bestTime }}</span>
      </div>
    </div>
  </button>
</template>

<style scoped>
.spot-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  overflow: hidden;
  color: var(--ink);
  font: inherit;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.spot-card:hover {
  border-color: var(--line-strong);
  box-shadow: var(--shadow);
  transform: translateY(-6px);
}

.spot-card__media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--bg-soft);
}

.spot-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.spot-card:hover .spot-card__media img {
  transform: scale(1.055);
}

.spot-card__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 18, 15, 0.14),
    transparent 42%,
    rgba(10, 18, 15, 0.42)
  );
}

.spot-card__index {
  position: absolute;
  top: 16px;
  left: 18px;
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--serif);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
}

.spot-card__category {
  position: absolute;
  top: 15px;
  right: 16px;
  padding: 5px 10px;
  color: #f7f0e1;
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  background: rgba(15, 26, 20, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  backdrop-filter: blur(8px);
}

.spot-card__arrow {
  position: absolute;
  right: 18px;
  bottom: 16px;
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  color: #1e2823;
  background: #f7f0e1;
  border-radius: 50%;
  transform: translateY(4px);
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.spot-card:hover .spot-card__arrow {
  opacity: 1;
  transform: translateY(0);
}

.spot-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 22px 22px 20px;
}

.spot-card__heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.spot-card__eyebrow {
  margin-bottom: 4px;
  color: var(--cinnabar);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.spot-card h3 {
  margin-bottom: 0;
  color: var(--ink);
}

.spot-card__rating {
  flex: 0 0 auto;
  color: var(--gold);
  font-size: 0.72rem;
  letter-spacing: 0.03em;
}

.spot-card__summary {
  flex: 1;
  margin: 12px 0 18px;
  color: var(--muted);
  font-size: 0.86rem;
  line-height: 1.75;
}

.spot-card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  padding-top: 14px;
  color: var(--faint);
  font-size: 0.64rem;
  letter-spacing: 0.04em;
  border-top: 1px solid var(--line);
}

.spot-card__footer span + span::before {
  content: "·";
  margin-right: 12px;
  color: var(--line-strong);
}

@media (max-width: 600px) {
  .spot-card__body {
    padding: 18px;
  }
}
</style>
