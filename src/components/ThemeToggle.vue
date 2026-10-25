<script setup>
import { inject } from 'vue';

const { isDark, toggleTheme } = inject('theme');
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? '切换到日间模式' : '切换到夜间模式'"
    :title="isDark ? '切换到日间模式' : '切换到夜间模式'"
    @click="toggleTheme"
  >
    <Transition name="theme-icon" mode="out-in">
      <svg
        v-if="isDark"
        key="sun"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path
          d="M12 2.8v2.1M12 19.1v2.1M4.8 12H2.7M21.3 12h-2.1M6.9 6.9 5.4 5.4M18.6 18.6l-1.5-1.5M17.1 6.9l1.5-1.5M5.4 18.6l1.5-1.5"
        />
      </svg>
      <svg
        v-else
        key="moon"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20.3 15.2A8.6 8.6 0 0 1 8.8 3.7 8.6 8.6 0 1 0 20.3 15.2Z" />
      </svg>
    </Transition>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  width: 42px;
  height: 42px;
  padding: 0;
  place-items: center;
  color: var(--ink-soft);
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.theme-toggle:hover {
  color: var(--jade);
  background: var(--surface);
  border-color: var(--line-strong);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-35deg) scale(0.7);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(35deg) scale(0.7);
}
</style>
