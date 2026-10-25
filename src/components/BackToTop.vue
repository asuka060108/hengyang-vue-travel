<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const visible = ref(false);

function onScroll() {
  visible.value = window.scrollY > 640;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <Transition name="back-top">
    <button
      v-if="visible"
      class="back-top"
      type="button"
      aria-label="回到页面顶部"
      title="回到顶部"
      @click="scrollToTop"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
  display: grid;
  width: 46px;
  height: 46px;
  padding: 0;
  place-items: center;
  color: var(--surface);
  background: var(--jade);
  border-radius: 50%;
  box-shadow: 0 12px 30px rgba(18, 69, 53, 0.22);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.back-top:hover {
  background: var(--jade-deep);
  transform: translateY(-3px);
}

.back-top-enter-active,
.back-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.back-top-enter-from,
.back-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 760px) {
  .back-top {
    right: 16px;
    bottom: 16px;
    width: 42px;
    height: 42px;
  }
}
</style>
