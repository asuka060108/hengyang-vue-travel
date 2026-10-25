<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  days: { type: Array, required: true },
});

const activeIndex = ref(0);
const activeDay = computed(() => props.days[activeIndex.value] ?? props.days[0]);
</script>

<template>
  <div class="itinerary" :style="{ '--day-color': activeDay.color }">
    <div class="itinerary__tabs" role="tablist" aria-label="选择行程天数">
      <button
        v-for="(day, index) in days"
        :key="day.id"
        type="button"
        role="tab"
        class="itinerary__tab"
        :class="{ 'is-active': activeIndex === index }"
        :aria-selected="activeIndex === index"
        @click="activeIndex = index"
      >
        <span>{{ day.label }}</span>
        <strong>{{ day.title }}</strong>
        <small>{{ day.subtitle }}</small>
      </button>
    </div>

    <Transition name="day" mode="out-in">
      <div :key="activeDay.id" class="itinerary__panel">
        <div class="itinerary__header">
          <span class="itinerary__day">{{ activeDay.label }}</span>
          <h3>{{ activeDay.title }}</h3>
          <p>{{ activeDay.subtitle }}</p>
        </div>

        <TransitionGroup name="stop" tag="ol" class="timeline">
          <li v-for="(stop, index) in activeDay.stops" :key="`${activeDay.id}-${stop.time}`" class="timeline__item">
            <div class="timeline__time">{{ stop.time }}</div>
            <div class="timeline__rail">
              <span class="timeline__dot"></span>
            </div>
            <div class="timeline__content">
              <div class="timeline__top">
                <span class="timeline__tag">{{ stop.tag }}</span>
                <span class="timeline__index">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <h4>{{ stop.title }}</h4>
              <p>{{ stop.description }}</p>
            </div>
          </li>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.itinerary {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: clamp(28px, 5vw, 70px);
}

.itinerary__tabs {
  display: flex;
  flex-direction: column;
  align-self: start;
  border-top: 1px solid var(--line);
}

.itinerary__tab {
  display: grid;
  gap: 3px;
  padding: 20px 4px;
  text-align: left;
  background: transparent;
  border-bottom: 1px solid var(--line);
  cursor: pointer;
  transition: color 0.2s ease, padding-left 0.2s ease;
}

.itinerary__tab span {
  color: var(--faint);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.itinerary__tab strong {
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.16rem;
  font-weight: 600;
}

.itinerary__tab small {
  color: var(--muted);
  font-size: 0.72rem;
}

.itinerary__tab:hover,
.itinerary__tab.is-active {
  padding-left: 14px;
}

.itinerary__tab.is-active {
  position: relative;
}

.itinerary__tab.is-active::before {
  content: "";
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 0;
  width: 2px;
  background: var(--day-color);
}

.itinerary__tab.is-active span,
.itinerary__tab.is-active strong {
  color: var(--day-color);
}

.itinerary__header {
  margin-bottom: 30px;
}

.itinerary__day {
  display: inline-block;
  margin-bottom: 8px;
  color: var(--day-color);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.itinerary__header h3 {
  margin-bottom: 3px;
  font-size: clamp(1.8rem, 3vw, 2.4rem);
}

.itinerary__header p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.82rem;
}

.timeline {
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline__item {
  display: grid;
  grid-template-columns: 74px 20px minmax(0, 1fr);
  gap: 0 14px;
  min-height: 140px;
}

.timeline__time {
  padding-top: 4px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 0.92rem;
  font-variant-numeric: tabular-nums;
}

.timeline__rail {
  position: relative;
  display: flex;
  justify-content: center;
}

.timeline__rail::after {
  content: "";
  position: absolute;
  top: 14px;
  bottom: 0;
  width: 1px;
  background: var(--line);
}

.timeline__item:last-child .timeline__rail::after {
  display: none;
}

.timeline__dot {
  position: relative;
  z-index: 1;
  width: 9px;
  height: 9px;
  margin-top: 7px;
  background: var(--surface);
  border: 2px solid var(--day-color);
  border-radius: 50%;
  box-shadow: 0 0 0 4px var(--bg);
}

.timeline__content {
  padding: 0 0 28px;
}

.timeline__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.timeline__tag {
  color: var(--day-color);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.timeline__index {
  color: var(--faint);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
}

.timeline__content h4 {
  margin-bottom: 6px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.08rem;
  font-weight: 600;
}

.timeline__content p {
  max-width: 58ch;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.8;
}

.day-enter-active,
.day-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.day-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.day-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.stop-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.stop-enter-from {
  opacity: 0;
  transform: translateX(8px);
}

@media (max-width: 800px) {
  .itinerary {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .itinerary__tabs {
    flex-direction: row;
    gap: 1px;
    overflow-x: auto;
    border: 1px solid var(--line);
    border-radius: 14px;
  }

  .itinerary__tab {
    flex: 1 0 140px;
    padding: 13px 14px;
    border-bottom: 0;
    border-left: 1px solid var(--line);
  }

  .itinerary__tab:first-child {
    border-left: 0;
  }

  .itinerary__tab:hover,
  .itinerary__tab.is-active {
    padding-left: 14px;
  }

  .itinerary__tab.is-active::before {
    top: auto;
    right: 12px;
    bottom: 0;
    left: 12px;
    width: auto;
    height: 2px;
  }
}

@media (max-width: 520px) {
  .timeline__item {
    grid-template-columns: 56px 16px minmax(0, 1fr);
    gap: 0 8px;
  }

  .timeline__time {
    font-size: 0.8rem;
  }
}
</style>
