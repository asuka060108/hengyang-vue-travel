<script setup>
import { provide } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ScrollProgress from '@/components/ScrollProgress.vue';
import BackToTop from '@/components/BackToTop.vue';
import { useTheme } from '@/composables/useTheme';

const theme = useTheme();
provide('theme', theme);
</script>

<template>
  <div class="page">
    <ScrollProgress />
    <AppHeader />

    <main class="site-main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <KeepAlive :max="3">
            <component :is="Component" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
    <BackToTop />
  </div>
</template>

<style scoped>
.site-main {
  min-height: 60vh;
}
</style>
