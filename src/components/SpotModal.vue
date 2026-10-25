<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  spot: { type: Object, default: null },
});

const emit = defineEmits(['close']);
const closeButton = ref(null);
let previousFocus = null;

async function handleSpotChange(spot) {
  document.body.classList.toggle('modal-open', Boolean(spot));

  if (spot) {
    previousFocus = document.activeElement;
    await nextTick();
    closeButton.value?.focus();
  } else {
    previousFocus?.focus?.();
  }
}

function close() {
  emit('close');
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.spot) {
    close();
  }
}

watch(() => props.spot, handleSpotChange);

onMounted(() => window.addEventListener('keydown', onKeydown));

onBeforeUnmount(() => {
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="spot"
        class="modal-backdrop"
        role="presentation"
        @click.self="close"
      >
        <section
          class="spot-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="spot-modal-title"
        >
          <button
            ref="closeButton"
            type="button"
            class="spot-modal__close"
            aria-label="关闭景点详情"
            @click="close"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>

          <div class="spot-modal__media">
            <img
              :src="spot.image"
              :alt="`${spot.name}风景`"
              :style="{ objectPosition: spot.imagePosition }"
            />
            <div class="spot-modal__media-shade"></div>
            <div class="spot-modal__media-caption">
              <span>{{ spot.en }}</span>
              <span>{{ spot.location }}</span>
            </div>
          </div>

          <div class="spot-modal__body">
            <p class="eyebrow">{{ spot.eyebrow }}</p>
            <div class="spot-modal__headline">
              <h2 id="spot-modal-title">{{ spot.name }}</h2>
              <span class="spot-modal__rating">★ {{ spot.rating }}</span>
            </div>

            <p class="spot-modal__quote">“{{ spot.quote }}”</p>
            <p class="spot-modal__description">{{ spot.description }}</p>

            <div class="spot-modal__facts">
              <div>
                <span>最佳季节</span>
                <strong>{{ spot.bestTime }}</strong>
              </div>
              <div>
                <span>建议停留</span>
                <strong>{{ spot.duration }}</strong>
              </div>
              <div>
                <span>海拔</span>
                <strong>{{ spot.altitude }}</strong>
              </div>
            </div>

            <h3 class="spot-modal__subtitle">别错过</h3>
            <div class="spot-modal__highlights">
              <span v-for="item in spot.highlights" :key="item" class="tag">
                {{ item }}
              </span>
            </div>

            <div class="spot-modal__tip">
              <span class="spot-modal__tip-label">旅行提示</span>
              <p>{{ spot.tip }}</p>
            </div>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(10, 16, 13, 0.68);
  backdrop-filter: blur(8px);
  overflow-y: auto;
}

.spot-modal {
  position: relative;
  display: grid;
  grid-template-columns: minmax(280px, 0.95fr) minmax(320px, 1.05fr);
  width: min(1020px, 100%);
  max-height: calc(100dvh - 48px);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 28px;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.34);
}

.spot-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  display: grid;
  width: 42px;
  height: 42px;
  padding: 0;
  place-items: center;
  color: #f7f0e1;
  background: rgba(15, 26, 20, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.spot-modal__close:hover {
  background: rgba(184, 73, 50, 0.65);
  transform: rotate(90deg);
}

.spot-modal__media {
  position: relative;
  min-height: 520px;
  overflow: hidden;
  background: var(--bg-soft);
}

.spot-modal__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spot-modal__media-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 48%, rgba(10, 18, 15, 0.64));
}

.spot-modal__media-caption {
  position: absolute;
  right: 24px;
  bottom: 22px;
  left: 24px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.spot-modal__body {
  padding: clamp(30px, 5vw, 54px);
  overflow-y: auto;
}

.spot-modal__headline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.spot-modal__headline h2 {
  margin-bottom: 14px;
  font-size: clamp(2rem, 4vw, 3rem);
}

.spot-modal__rating {
  flex: 0 0 auto;
  padding-top: 6px;
  color: var(--gold);
  font-size: 0.78rem;
}

.spot-modal__quote {
  margin-bottom: 20px;
  color: var(--cinnabar);
  font-family: var(--serif);
  font-size: 1.02rem;
  line-height: 1.7;
}

.spot-modal__description {
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.9;
}

.spot-modal__facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 26px 0;
  overflow: hidden;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.spot-modal__facts div {
  padding: 13px 14px;
  background: var(--surface);
}

.spot-modal__facts span {
  display: block;
  margin-bottom: 4px;
  color: var(--faint);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
}

.spot-modal__facts strong {
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 600;
}

.spot-modal__subtitle {
  margin: 0 0 12px;
  font-size: 1.05rem;
}

.spot-modal__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 24px;
}

.spot-modal__tip {
  padding: 16px 18px;
  background: var(--jade-light);
  border-left: 2px solid var(--jade);
  border-radius: 0 12px 12px 0;
}

.spot-modal__tip-label {
  display: block;
  margin-bottom: 5px;
  color: var(--jade);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.spot-modal__tip p {
  margin: 0;
  color: var(--ink-soft);
  font-size: 0.8rem;
  line-height: 1.7;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.28s ease;
}

.modal-enter-active .spot-modal,
.modal-leave-active .spot-modal {
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.28s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .spot-modal,
.modal-leave-to .spot-modal {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}

@media (max-width: 820px) {
  .modal-backdrop {
    align-items: end;
    padding: 0;
  }

  .spot-modal {
    grid-template-columns: 1fr;
    max-height: 92dvh;
    border-radius: 24px 24px 0 0;
  }

  .spot-modal__media {
    min-height: 260px;
    max-height: 34dvh;
  }

  .spot-modal__body {
    padding: 26px 22px 32px;
  }
}
</style>
