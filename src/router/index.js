import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: '山水与烟火' },
  },
  {
    path: '/scenery',
    name: 'scenery',
    component: () => import('@/views/SceneryView.vue'),
    meta: { title: '风景 · 山有南岳' },
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('@/views/FoodView.vue'),
    meta: { title: '美食 · 一碗衡阳' },
  },
  {
    path: '/plan',
    name: 'plan',
    component: () => import('@/views/PlanView.vue'),
    meta: { title: '行程 · 三日雁城' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '迷路了' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.path === from.path) return false;
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0, behavior: from.name ? 'smooth' : 'auto' };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title
    ? `${to.meta.title} · 雁城衡阳`
    : '雁城衡阳 · 山水与烟火';
});

export default router;
