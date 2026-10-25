<script setup>
import { computed, ref } from 'vue';
import PageHero from '@/components/PageHero.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import FilterTabs from '@/components/FilterTabs.vue';
import FoodCard from '@/components/FoodCard.vue';
import FavoritesBar from '@/components/FavoritesBar.vue';
import EmptyState from '@/components/EmptyState.vue';
import { foodCategories, foods } from '@/data/foods';
import { useFavorites } from '@/composables/useFavorites';
import heroImage from '@/assets/images/food-hero.webp';

const activeCategory = ref('all');
const search = ref('');
const sort = ref('recommended');
const showFavorites = ref(false);
const searchInput = ref(null);

const {
  favoriteIds,
  count,
  isFavorite,
  toggleFavorite,
  clearFavorites,
} = useFavorites();

const favoriteFoods = computed(() =>
  foods.filter((food) => favoriteIds.value.includes(food.id))
);

const filteredFoods = computed(() => {
  const keyword = search.value.trim().toLowerCase();

  let list = foods.filter((food) => {
    const matchesCategory =
      activeCategory.value === 'all' || food.category === activeCategory.value;
    const matchesFavorite = !showFavorites.value || isFavorite(food.id);
    const haystack = [
      food.name,
      food.en,
      food.category,
      food.summary,
      food.description,
      ...food.tags,
    ]
      .join(' ')
      .toLowerCase();

    return matchesCategory && matchesFavorite && (!keyword || haystack.includes(keyword));
  });

  if (sort.value === 'spicy-asc') {
    list = [...list].sort((a, b) => a.spice - b.spice);
  } else if (sort.value === 'spicy-desc') {
    list = [...list].sort((a, b) => b.spice - a.spice);
  }

  return list;
});

const resultText = computed(() => {
  if (showFavorites.value) {
    return count.value
      ? `我的清单里有 ${filteredFoods.value.length} 种衡阳味道`
      : '还没有收藏，先逛逛再决定';
  }
  if (search.value.trim() || activeCategory.value !== 'all') {
    return `找到 ${filteredFoods.value.length} 种味道`;
  }
  return '八种味道，从早餐一直到夜宵';
});

function resetFilters() {
  activeCategory.value = 'all';
  search.value = '';
  sort.value = 'recommended';
  showFavorites.value = false;
  searchInput.value?.focus();
}
</script>

<template>
  <div class="food-page">
    <PageHero
      eyebrow="FOOD / 美食"
      title="一碗衡阳"
      accent="从早吃到夜"
      subtitle="衡阳菜不绕弯子：鲜、辣、香，直接落到胃里。早上鱼粉，中午土菜，晚上唆螺，半夜还能再打包一份卤粉。"
      :image="heroImage"
      image-position="center 52%"
    >
      <template #meta>
        <span>8 种本地味道</span>
        <span>粉面 · 土菜 · 小吃 · 物产</span>
        <span>建议空腹阅读</span>
      </template>

      <template #aside>
        <div class="food-hero-note">
          <span class="food-hero-note__label">A LOCAL'S ORDER</span>
          <p>鱼粉要加酸豆角，唆螺要配冰饮，土菜记得说“微辣”。</p>
          <span class="food-hero-note__stamp">味</span>
        </div>
      </template>
    </PageHero>

    <section class="taste-route">
      <div class="container taste-route__inner">
        <div class="taste-route__intro">
          <p class="eyebrow">A DAY OF EATING</p>
          <h2>衡阳人的一天，<br />从一碗粉开始。</h2>
        </div>
        <div class="taste-route__steps">
          <div class="taste-step">
            <span>07:30</span>
            <strong>鱼粉醒来</strong>
            <p>鲜鱼汤、剁椒、酸豆角，先喝汤再吃粉。</p>
          </div>
          <div class="taste-step">
            <span>12:30</span>
            <strong>土菜下饭</strong>
            <p>衡东黄贡椒、脆肚、麸子肉，米饭要续。</p>
          </div>
          <div class="taste-step">
            <span>21:30</span>
            <strong>夜宵收尾</strong>
            <p>唆螺、烧烤、冰饮，坐在路边慢慢嗦。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section food-list">
      <div class="container">
        <SectionHeading
          eyebrow="TASTE MAP"
          title="把衡阳的味道，装进一张清单"
          description="按类型筛选，搜索你想吃的，或者把感兴趣的菜先收藏起来。"
        />

        <div class="toolbar" v-reveal>
          <FilterTabs
            v-model="activeCategory"
            :options="foodCategories"
            label="按美食类型筛选"
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
              <span class="sr-only">搜索美食</span>
              <input
                ref="searchInput"
                v-model="search"
                type="search"
                placeholder="搜索菜名、口味或食材"
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
                <option value="spicy-asc">辣度：从低到高</option>
                <option value="spicy-desc">辣度：从高到低</option>
              </select>
            </label>

            <button
              type="button"
              class="favorite-filter"
              :class="{ 'is-active': showFavorites }"
              :aria-pressed="showFavorites"
              @click="showFavorites = !showFavorites"
            >
              <span aria-hidden="true">♥</span>
              我的清单
              <small v-if="count">{{ count }}</small>
            </button>
          </div>
        </div>

        <FavoritesBar
          :items="favoriteFoods"
          @remove="toggleFavorite"
          @clear="clearFavorites"
        />

        <div class="results-line">
          <p aria-live="polite">{{ resultText }}</p>
          <span class="results-line__hint">图片为菜品氛围示意</span>
        </div>

        <TransitionGroup
          v-if="filteredFoods.length"
          name="card"
          tag="div"
          class="food-grid"
        >
          <FoodCard
            v-for="(food, index) in filteredFoods"
            :key="food.id"
            v-reveal="{ delay: index * 55 }"
            :food="food"
            :favorite="isFavorite(food.id)"
            :index="index"
            @toggle-favorite="toggleFavorite"
          />
        </TransitionGroup>

        <EmptyState
          v-else
          title="这张桌子上暂时没有菜"
          text="换个关键词，或者取消“我的清单”筛选，看看别的衡阳味道。"
        >
          <template #actions>
            <button type="button" class="btn btn--primary" @click="resetFilters">
              重置筛选
            </button>
          </template>
        </EmptyState>
      </div>
    </section>

    <section class="food-note">
      <div class="container food-note__inner" v-reveal>
        <span class="food-note__seal">食</span>
        <div>
          <p class="eyebrow">A SMALL WARNING</p>
          <h2>衡阳的“微辣”，可能和你想的不太一样。</h2>
          <p>
            点菜时直接说“不要辣”或“少放辣椒”，比说“微辣”更有效。
            鱼粉和唆螺都可以调整辣度，别硬撑。
          </p>
        </div>
        <RouterLink to="/plan" class="btn btn--light">
          安排吃的行程
          <span class="btn__arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.food-hero-note {
  position: relative;
  padding: 22px;
  color: rgba(247, 240, 225, 0.72);
  background: rgba(14, 25, 20, 0.32);
  border: 1px solid rgba(247, 240, 225, 0.2);
  border-radius: 3px 18px 3px 18px;
  backdrop-filter: blur(10px);
}

.food-hero-note__label {
  display: block;
  margin-bottom: 11px;
  color: #e8c27c;
  font-size: 0.54rem;
  letter-spacing: 0.18em;
}

.food-hero-note p {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.94rem;
  line-height: 1.75;
}

.food-hero-note__stamp {
  position: absolute;
  right: 16px;
  bottom: 13px;
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: rgba(232, 194, 124, 0.7);
  font-family: var(--serif);
  font-size: 0.84rem;
  border: 1px solid rgba(232, 194, 124, 0.35);
  border-radius: 50%;
}

.taste-route {
  padding-block: clamp(60px, 8vw, 96px);
  background: var(--surface-strong);
  border-bottom: 1px solid var(--line);
}

.taste-route__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.25fr);
  gap: clamp(30px, 7vw, 100px);
  align-items: center;
}

.taste-route__intro h2 {
  margin: 0;
  font-size: clamp(2rem, 3.5vw, 3rem);
}

.taste-route__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  overflow: hidden;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 18px;
}

.taste-step {
  padding: 20px 18px;
  background: var(--surface);
}

.taste-step > span {
  display: block;
  margin-bottom: 13px;
  color: var(--cinnabar);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.taste-step strong {
  display: block;
  margin-bottom: 6px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.08rem;
  font-weight: 600;
}

.taste-step p {
  margin: 0;
  color: var(--muted);
  font-size: 0.74rem;
  line-height: 1.7;
}

.food-list {
  background: var(--bg);
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
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
  min-width: 245px;
  padding: 0 13px;
  color: var(--faint);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
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

.sort-box select {
  min-height: 42px;
  padding: 0 28px 0 13px;
  color: var(--ink-soft);
  font-size: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
}

.favorite-filter {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 42px;
  padding: 0 14px;
  color: var(--muted);
  font-size: 0.75rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.favorite-filter span {
  color: var(--cinnabar);
}

.favorite-filter small {
  display: grid;
  min-width: 18px;
  height: 18px;
  place-items: center;
  color: var(--surface);
  font-size: 0.58rem;
  background: var(--cinnabar);
  border-radius: 50%;
}

.favorite-filter:hover,
.favorite-filter.is-active {
  color: var(--cinnabar);
  background: var(--cinnabar-light);
  border-color: color-mix(in srgb, var(--cinnabar) 30%, transparent);
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
  color: var(--faint);
  font-size: 0.6rem;
  letter-spacing: 0.06em;
}

.food-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

.food-note {
  padding-block: clamp(70px, 10vw, 120px);
  color: #f7f0e1;
  background:
    radial-gradient(circle at 18% 20%, rgba(204, 102, 74, 0.2), transparent 34%),
    #1b1a16;
}

.food-note__inner {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(24px, 5vw, 70px);
}

.food-note__seal {
  display: grid;
  width: 70px;
  height: 70px;
  place-items: center;
  color: #e8c27c;
  font-family: var(--serif);
  font-size: 1.5rem;
  border: 1px solid rgba(232, 194, 124, 0.45);
  border-radius: 50%;
}

.food-note h2 {
  max-width: 20ch;
  margin-bottom: 12px;
  color: #fbf6e9;
  font-size: clamp(1.7rem, 3.5vw, 2.8rem);
}

.food-note p:not(.eyebrow) {
  max-width: 56ch;
  margin: 0;
  color: rgba(247, 240, 225, 0.6);
  font-size: 0.85rem;
  line-height: 1.85;
}

@media (max-width: 1080px) {
  .toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .toolbar__right {
    width: 100%;
    flex-wrap: wrap;
  }

  .search-box {
    flex: 1;
  }
}

@media (max-width: 900px) {
  .taste-route__inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .food-note__inner {
    grid-template-columns: auto 1fr;
  }

  .food-note__inner > .btn {
    grid-column: 2;
    justify-self: start;
  }
}

@media (max-width: 700px) {
  .food-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .taste-route__steps {
    grid-template-columns: 1fr;
  }

  .toolbar__right {
    align-items: stretch;
    flex-direction: column;
  }

  .search-box {
    min-width: 0;
  }

  .sort-box select {
    width: 100%;
  }

  .favorite-filter {
    justify-content: center;
  }

  .food-note__inner {
    grid-template-columns: 1fr;
  }

  .food-note__seal {
    width: 54px;
    height: 54px;
  }

  .food-note__inner > .btn {
    grid-column: auto;
  }
}
</style>
