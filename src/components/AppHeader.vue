<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const navItems = [
  { to: '/', label: '首页', en: 'HOME' },
  { to: '/scenery', label: '风景', en: 'SCENERY' },
  { to: '/food', label: '美食', en: 'FOOD' },
  { to: '/plan', label: '行程', en: 'PLAN' },
];

const route = useRoute();
const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 12;
}

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  }
);
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <div class="container header-inner">
      <RouterLink to="/" class="brand" aria-label="雁城衡阳首页">
        <span class="brand__seal">雁</span>
        <span class="brand__text">
          雁城衡阳
          <small>HENGYANG TRAVEL</small>
        </span>
      </RouterLink>

      <nav class="desktop-nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="desktop-nav__link"
          active-class="is-active"
          exact-active-class="is-active"
        >
          <span>{{ item.label }}</span>
          <small>{{ item.en }}</small>
        </RouterLink>
      </nav>

      <div class="header-actions">
        <ThemeToggle />
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-label="打开导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <span :class="{ 'is-open': menuOpen }"></span>
          <span :class="{ 'is-open': menuOpen }"></span>
        </button>
      </div>
    </div>

    <Transition name="mobile-menu">
      <nav v-if="menuOpen" class="mobile-nav" aria-label="移动端导航">
        <div class="container mobile-nav__inner">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="mobile-nav__link"
            active-class="is-active"
            @click="menuOpen = false"
          >
            <span>{{ item.label }}</span>
            <small>{{ item.en }}</small>
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 86%, transparent);
  border-bottom: 1px solid transparent;
  backdrop-filter: blur(18px);
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.site-header.is-scrolled {
  background: color-mix(in srgb, var(--bg) 94%, transparent);
  border-bottom-color: var(--line);
  box-shadow: 0 8px 30px rgba(33, 28, 18, 0.05);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: var(--header-height);
  gap: 28px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
}

.brand__seal {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: #f7f0e1;
  font-family: var(--serif);
  font-size: 1.18rem;
  background: var(--cinnabar);
  border-radius: 10px 10px 10px 2px;
  box-shadow: 0 7px 20px rgba(184, 73, 50, 0.18);
}

.brand__text {
  display: flex;
  flex-direction: column;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.12;
}

.brand__text small {
  margin-top: 3px;
  color: var(--faint);
  font-family: var(--sans);
  font-size: 0.48rem;
  letter-spacing: 0.2em;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.desktop-nav__link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  min-width: 74px;
  padding: 8px 12px;
  color: var(--muted);
  border-radius: 10px;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.desktop-nav__link small {
  font-size: 0.46rem;
  letter-spacing: 0.13em;
}

.desktop-nav__link::after {
  content: "";
  position: absolute;
  right: 14px;
  bottom: 2px;
  left: 14px;
  height: 1px;
  background: var(--cinnabar);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.desktop-nav__link:hover,
.desktop-nav__link.is-active {
  color: var(--ink);
}

.desktop-nav__link.is-active::after,
.desktop-nav__link:hover::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  padding: 11px;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.menu-toggle span + span {
  margin-top: 6px;
}

.menu-toggle span:first-child.is-open {
  transform: translateY(3.5px) rotate(45deg);
}

.menu-toggle span:last-child.is-open {
  transform: translateY(-3.5px) rotate(-45deg);
}

.mobile-nav {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  box-shadow: var(--shadow-soft);
}

.mobile-nav__inner {
  display: grid;
  padding-block: 14px 20px;
}

.mobile-nav__link {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 13px 4px;
  color: var(--ink-soft);
  font-family: var(--serif);
  font-size: 1.18rem;
  border-bottom: 1px solid var(--line);
}

.mobile-nav__link small {
  color: var(--faint);
  font-family: var(--sans);
  font-size: 0.58rem;
  letter-spacing: 0.16em;
}

.mobile-nav__link.is-active {
  color: var(--cinnabar);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 760px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
