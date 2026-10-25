import { computed, ref, watch, watchEffect } from 'vue';

const STORAGE_KEY = 'hengyang-theme';

function readStoredTheme() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getInitialTheme() {
  const stored = readStoredTheme();
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function useTheme() {
  const theme = ref(getInitialTheme());
  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  };

  watchEffect(() => {
    document.documentElement.dataset.theme = theme.value;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.value === 'dark' ? '#111614' : '#f4efe4');
  });

  watch(
    theme,
    (value) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, value);
      } catch {
        // localStorage may be unavailable in private mode.
      }
    },
    { immediate: true }
  );

  return { theme, isDark, toggleTheme };
}
