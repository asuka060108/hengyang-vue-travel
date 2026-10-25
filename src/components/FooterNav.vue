<script setup>
const navItems = [
  { to: '/', label: '首页', en: 'HOME' },
  { to: '/scenery', label: '风景', en: 'SCENERY' },
  { to: '/food', label: '美食', en: 'FOOD' },
  { to: '/plan', label: '行程', en: 'PLAN' },
];
</script>

<template>
  <nav class="footer-nav" aria-label="页脚导航">
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="footer-nav__link"
    >
      <span>{{ item.label }}</span>
      <small>{{ item.en }}</small>
    </RouterLink>
  </nav>
</template>

<style scoped>
.footer-nav {
  display: grid;
  gap: 10px;
}

.footer-nav__link {
  display: flex;
  align-items: baseline;
  gap: 10px;
  width: fit-content;
  color: var(--ink-soft);
  transition: color 0.2s ease, transform 0.2s ease;
}

.footer-nav__link:hover {
  color: var(--cinnabar);
  transform: translateX(4px);
}

.footer-nav__link small {
  color: var(--faint);
  font-size: 0.58rem;
  letter-spacing: 0.16em;
}
</style>
