<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageHero from '@/components/PageHero.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import FilterTabs from '@/components/FilterTabs.vue';
import SpotCard from '@/components/SpotCard.vue';
import SpotModal from '@/components/SpotModal.vue';
import EmptyState from '@/components/EmptyState.vue';
import {
  attractionCategories,
  attractions,
} from '@/data/attractions';
import heroImage from '@/assets/images/scenery-hero.webp';

const route = useRoute();
const router = useRouter();

const initialCategory =
  typeof route.query.category === 'string' ? route.query.category : 'all';
const initialSearch = typeof route.query.q === 'string' ? route.query.q : '';
const initialSort = typeof route.query.sort === 'string' ? route.query.sort : 'recommended';

const activeCategory = ref(
  attractionCategories.some((item) => item.value === initialCategory)
    ? initialCategory
    : 'all'
);
const search = ref(initialSearch);
const sort = ref(initialSort);
const activeSpot = ref(null);
const searchInput = ref(null);

const filteredSpots = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  let list = attractions.filter((spot) => {
    const matchesCategory =
      activeCategory.value === 'all' || spot.category === activeCategory.value;
    const haystack = [
      spot.name,
      spot.en,
      spot.category,
      spot.summary,
      spot.location,
      ...spot.highlights,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && (!keyword || haystack.includes(keyword));
  });

  if (sort.value === 'rating') {
    list = [...list].sort((a, b) => Number(b.rating) - Number(a.rating));
  } else if (sort.value === 'name') {
    list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
  }

  return list;
});

const resultText = computed(() =>
  search.value.trim() || activeCategory.value !== 'all'
    ? `找到 ${filteredSpots.value.length} 处目的地`
    : '六处目的地，山、江、书院与古塔'
);

watch([activeCategory, search, sort], () => {
  const query = {};

  if (activeCategory.value !== 'all') query.category = activeCategory.value;
  if (search.value.trim()) query.q = search.value.trim();
  if (sort.value !== 'recommended') query.sort = sort.value;

  router.replace({ query });
});

async function resetFilters() {
  activeCategory.value = 'all';
  search.value = '';
  sort.value = 'recommended';
  await nextTick();
  searchInput.value?.focus();
}

function openSpot(spot) {
  activeSpot.value = spot;
}

function closeSpot() {
  activeSpot.value = null;
}
</script>

<template>
  <div class="scenery-page">
    <PageHero
      eyebrow="SCENERY / 风景"
      title="山有南岳"
      accent="水有湘江"
      subtitle="从 1300 米的云海，到江心岛上的一阵晚风。衡阳的风景不急着被看完，它更适合被慢慢经过。"
      :image="heroImage"
      image-position="center 50%"
    >
      <template #meta>
        <span>6 处精选目的地</span>
        <span>山岳 · 古建 · 书院 · 江岛</span>
        <span>建议 2–3 天</span>
      </template>

      <template #aside>
        <div class="hero-note">
          <span class="hero-note__index">01 — 06</span>
          <p>如果只去一个地方，去南岳。如果还有一天，把时间留给湘江边。</p>
        </div>
      </template>
    </PageHero>

    <section class="section scenery-list">
      <div class="container">
        <SectionHeading
          eyebrow="PLACES TO GO"
          title="把衡阳走成一张地图"
          description="按类型筛选，或者直接搜索你想去的地方。每一处都可以点开看详情。"
        />

        <div class="toolbar" v-reveal>
          <FilterTabs
            v-model="activeCategory"
            :options="attractionCategories"
            label="按景点类型筛选"
          />

          <div class="toolbar__right">
            <label class="search-box">
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4.2 4.2" stroke-linecap="round" />
              </svg>
              <span class="sr-only">搜索景点</span>
              <input
                ref="searchInput"
                v-model="search"
                type="search"
                placeholder="搜索景点、地点或关键词"
              />
              <button
                v-if="search"
                type="button"
                class="search-box__clear"
                aria-label="清空搜索"
                @click="search = ''"
              >
                ×
              </button>
            </label>

            <label class="sort-box">
              <span class="sr-only">排序方式</span>
              <select v-model="sort">
                <option value="recommended">推荐排序</option>
                <option value="rating">评分优先</option>
                <option value="name">名称排序</option>
              </select>
            </label>
          </div>
        </div>

        <div class="results-line">
          <p aria-live="polite">{{ resultText }}</p>
          <span v-if="search || activeCategory !== 'all'" class="results-line__hint">
            正在筛选
          </span>
        </div>

        <TransitionGroup
          v-if="filteredSpots.length"
          name="card"
          tag="div"
          class="spot-grid"
        >
          <SpotCard
            v-for="(spot, index) in filteredSpots"
            :key="spot.id"
            v-reveal="{ delay: index * 55 }"
            :spot="spot"
            :index="index"
            @open="openSpot"
          />
        </TransitionGroup>

        <EmptyState
          v-else
          title="没有找到这处风景"
          text="换一个关键词，或者把筛选条件放宽一点。衡阳还有很多角落没写完。"
        >
          <template #actions>
            <button type="button" class="btn btn--primary" @click="resetFilters">
              重置筛选
            </button>
          </template>
        </EmptyState>
      </div>
    </section>

    <section class="scenery-tip">
      <div class="container scenery-tip__inner" v-reveal>
        <span class="scenery-tip__seal">游</span>
        <div>
          <p class="eyebrow">A SMALL REMINDER</p>
          <h2>山上的天气，比手机里的预报快一步。</h2>
          <p>
            去南岳记得带一件外套和轻便雨衣。山顶风大，夏天也会凉。
            如果看日出，提前确认景区车和索道的首班时间。
          </p>
        </div>
        <RouterLink to="/plan" class="btn btn--light">
          去看行程建议
          <span class="btn__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>

    <SpotModal :spot="activeSpot" @close="closeSpot" />
  </div>
</template>

<style scoped>
.scenery-list {
  background: var(--bg);
}

.hero-note {
  padding: 20px 22px;
  color: rgba(247, 240, 225, 0.72);
  background: rgba(14, 25, 20, 0.3);
  border: 1px solid rgba(247, 240, 225, 0.2);
  border-radius: 3px 18px 3px 18px;
  backdrop-filter: blur(10px);
}

.hero-note__index {
  display: block;
  margin-bottom: 10px;
  color: #e8c27c;
  font-size: 0.56rem;
  letter-spacing: 0.18em;
}

.hero-note p {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.95rem;
  line-height: 1.75;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.toolbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 250px;
  padding: 0 13px;
  color: var(--faint);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  transition: border-color 0.2s ease;
}

.search-box:focus-within {
  border-color: var(--jade);
}

.search-box input {
  width: 100%;
  min-height: 40px;
  padding: 0;
  color: var(--ink);
  font-size: 0.8rem;
  background: transparent;
  border: 0;
  outline: 0;
}

.search-box input::placeholder {
  color: var(--faint);
}

.search-box__clear {
  padding: 0;
  color: var(--faint);
  font-size: 1.2rem;
  line-height: 1;
  background: transparent;
  cursor: pointer;
}

.search-box__clear:hover {
  color: var(--cinnabar);
}

.sort-box select {
  min-height: 42px;
  padding: 0 30px 0 14px;
  color: var(--ink-soft);
  font-size: 0.77rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
}

.results-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 0.74rem;
}

.results-line p {
  margin: 0;
}

.results-line__hint {
  color: var(--cinnabar);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.spot-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.card-enter-active,
.card-leave-active,
.card-move {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.scenery-tip {
  padding-block: clamp(70px, 10vw, 120px);
  color: #f7f0e1;
  background:
    radial-gradient(circle at 80% 30%, rgba(232, 194, 124, 0.16), transparent 30%),
    #16251f;
}

.scenery-tip__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(24px, 5vw, 70px);
}

.scenery-tip__seal {
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  color: #e8c27c;
  font-family: var(--serif);
  font-size: 1.7rem;
  border: 1px solid rgba(232, 194, 124, 0.45);
  border-radius: 50%;
}

.scenery-tip h2 {
  max-width: 18ch;
  margin-bottom: 12px;
  color: #fbf6e9;
  font-size: clamp(1.7rem, 3.5vw, 2.8rem);
}

.scenery-tip p:not(.eyebrow) {
  max-width: 58ch;
  margin: 0;
  color: rgba(247, 240, 225, 0.6);
  font-size: 0.85rem;
  line-height: 1.85;
}

@media (max-width: 1050px) {
  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .toolbar__right {
    width: 100%;
  }

  .search-box {
    flex: 1;
  }
}

@media (max-width: 900px) {
  .spot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .scenery-tip__inner {
    grid-template-columns: auto 1fr;
  }

  .scenery-tip__inner > .btn {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 600px) {
  .toolbar__right {
    align-items: stretch;
    flex-direction: column;
  }

  .sort-box select {
    width: 100%;
  }

  .spot-grid {
    grid-template-columns: 1fr;
  }

  .scenery-tip__inner {
    grid-template-columns: 1fr;
  }

  .scenery-tip__seal {
    width: 54px;
    height: 54px;
    font-size: 1.3rem;
  }

  .scenery-tip__inner > .btn {
    grid-column: auto;
  }
}
</style>
