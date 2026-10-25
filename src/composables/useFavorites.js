import { computed, readonly, ref, watch } from 'vue';

const STORAGE_KEY = 'hengyang-favorites';

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

const favoriteIds = ref(readFavorites());
const favoriteSet = computed(() => new Set(favoriteIds.value));
const count = computed(() => favoriteIds.value.length);

watch(
  favoriteIds,
  (value) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Ignore storage failures and keep the in-memory state.
    }
  },
  { deep: true }
);

function isFavorite(id) {
  return favoriteSet.value.has(id);
}

function toggleFavorite(id) {
  favoriteIds.value = isFavorite(id)
    ? favoriteIds.value.filter((item) => item !== id)
    : [...favoriteIds.value, id];
}

function clearFavorites() {
  favoriteIds.value = [];
}

export function useFavorites() {
  return {
    favoriteIds: readonly(favoriteIds),
    count,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
