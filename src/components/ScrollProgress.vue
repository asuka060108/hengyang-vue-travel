<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const progress = ref(0);
let frame = 0;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  frame = 0;
}

function onScroll() {
  if (frame) return;
  frame = window.requestAnimationFrame(updateProgress);
}

onMounted(() => {
  updateProgress();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  if (frame) window.cancelAnimationFrame(frame);
});
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <span :style="{ transform: `scaleX(${progress})` }"></span>
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  height: 2px;
  pointer-events: none;
}

.scroll-progress span {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--jade), var(--gold), var(--cinnabar));
  transform-origin: left center;
  will-change: transform;
}
</style>
