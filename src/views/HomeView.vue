<script setup>
import { computed, ref } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import StatStrip from '@/components/StatStrip.vue';
import SpotCard from '@/components/SpotCard.vue';
import FoodCard from '@/components/FoodCard.vue';
import SpotModal from '@/components/SpotModal.vue';
import TravelTips from '@/components/TravelTips.vue';
import { attractions } from '@/data/attractions';
import { foods } from '@/data/foods';
import { itineraryDays, travelTips } from '@/data/itinerary';
import { useFavorites } from '@/composables/useFavorites';
import heroImage from '@/assets/images/nanyue.webp';
import islandImage from '@/assets/images/dongzhou.webp';
import academyImage from '@/assets/images/shigu.webp';

const featuredSpots = computed(() => attractions.slice(0, 3));
const featuredFoods = computed(() => foods.slice(0, 3));

const activeSpot = ref(null);
const { isFavorite, toggleFavorite } = useFavorites();

const stats = [
  { value: 1300.2, decimals: 1, suffix: 'm', label: '祝融峰海拔' },
  { value: 2200, suffix: '+', label: '年建城史' },
  { value: 6, suffix: '处', label: '精选目的地' },
  { value: 8, suffix: '味', label: '从早吃到夜' },
];

function openSpot(spot) {
  activeSpot.value = spot;
}

function closeSpot() {
  activeSpot.value = null;
}
</script>

<template>
  <div class="home">
    <HeroSection :image="heroImage" />

    <section class="section intro">
      <div class="container intro__grid">
        <div class="intro__copy" v-reveal>
          <p class="eyebrow">WHY HENGYANG</p>
          <h2>不只是一座<br /><em>中转站</em></h2>
          <p>
            很多人把衡阳当作去南岳的中转站，匆匆路过。但这座湘江边的城市，
            有书院的旧时光、江心岛的晚风，也有凌晨还冒着热气的鱼粉摊。
          </p>
          <p>
            它不急着讨好谁。你可以在山上看完云海，再回城里慢慢吃一顿饭。
            山与城之间，不过一小时车程。
          </p>
          <RouterLink to="/scenery" class="text-link">
            从风景开始认识它
            <span aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <div class="intro__collage" v-reveal="{ delay: 140 }">
          <figure class="intro__figure intro__figure--tall">
            <img :src="islandImage" alt="湘江中的东洲岛" loading="lazy" />
            <figcaption>东洲岛 · 湘江把城市轻轻推开</figcaption>
          </figure>
          <figure class="intro__figure">
            <img :src="academyImage" alt="石鼓书院古建筑" loading="lazy" />
            <figcaption>石鼓书院 · 蒸湘汇流处</figcaption>
          </figure>
          <span class="intro__note">NORTH GOOSE<br />SOUTH RETURN</span>
        </div>
      </div>
    </section>

    <section class="section section--tight stats-section">
      <div class="container">
        <StatStrip :stats="stats" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="SCENERY / 风景"
          title="山有南岳，水有湘江"
          description="从五岳独秀的祝融峰，到江心岛上的书院。衡阳的风景不只在景区里，也在城市转身的每一个瞬间。"
        >
          <template #actions>
            <RouterLink to="/scenery" class="btn btn--ghost">
              查看全部风景
              <span class="btn__arrow" aria-hidden="true">→</span>
            </RouterLink>
          </template>
        </SectionHeading>

        <div class="spot-grid">
          <SpotCard
            v-for="(spot, index) in featuredSpots"
            :key="spot.id"
            v-reveal="{ delay: index * 80 }"
            :spot="spot"
            :index="index"
            @open="openSpot"
          />
        </div>
      </div>
    </section>

    <section class="quote-band">
      <div class="container quote-band__inner">
        <p class="quote-band__mark" aria-hidden="true">“</p>
        <blockquote>
          雁到这里回头，<br />
          人到这里慢下来。
        </blockquote>
        <p class="quote-band__source">回雁峰 · 雁城之名的由来</p>
        <span class="quote-band__seal" aria-hidden="true">雁</span>
      </div>
    </section>

    <section class="section food-preview">
      <div class="container">
        <SectionHeading
          eyebrow="FOOD / 美食"
          title="一碗衡阳，从早吃到夜"
          description="清晨的鱼粉、午间的土菜、夜里的唆螺。衡阳的味道不精致，但很直接，像这里的人。"
        >
          <template #actions>
            <RouterLink to="/food" class="btn btn--ghost">
              打开味觉地图
              <span class="btn__arrow" aria-hidden="true">→</span>
            </RouterLink>
          </template>
        </SectionHeading>

        <div class="food-grid">
          <FoodCard
            v-for="(food, index) in featuredFoods"
            :key="food.id"
            v-reveal="{ delay: index * 80 }"
            :food="food"
            :favorite="isFavorite(food.id)"
            :index="index"
            @toggle-favorite="toggleFavorite"
          />
        </div>
      </div>
    </section>

    <section class="section plan-preview">
      <div class="container plan-preview__inner">
        <div class="plan-preview__copy" v-reveal>
          <p class="eyebrow">3 DAYS IN HENGYANG</p>
          <h2>把三天，<br /><em>走成一条慢线</em></h2>
          <p>
            第一天给南岳，第二天给古城和江岛，第三天留给江畔、老街和伴手礼。
            不赶路，也不把行程塞满。
          </p>
          <RouterLink to="/plan" class="btn btn--primary">
            查看完整行程
            <span class="btn__arrow" aria-hidden="true">→</span>
          </RouterLink>
        </div>

        <div class="plan-preview__days">
          <RouterLink
            v-for="day in itineraryDays"
            :key="day.id"
            to="/plan"
            class="day-card"
            v-reveal="{ delay: day.id * 80 }"
          >
            <span class="day-card__label">{{ day.label }}</span>
            <strong>{{ day.title }}</strong>
            <small>{{ day.subtitle }}</small>
            <span class="day-card__line"></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <SectionHeading
          eyebrow="BEFORE YOU GO"
          title="出发前，记住这几件小事"
          description="衡阳不难玩，但山和辣都有自己的脾气。"
        />
        <TravelTips :tips="travelTips" />
      </div>
    </section>

    <section
      class="closing"
      :style="{ '--closing-image': `url(${heroImage})` }"
    >
      <div class="container closing__inner" v-reveal>
        <p class="eyebrow">THE LAST PAGE</p>
        <h2>来衡阳，<br />把脚步放慢一点。</h2>
        <p>山会一直在，粉也会一直热。</p>
        <div class="closing__actions">
          <RouterLink to="/plan" class="btn btn--light">安排三日行程</RouterLink>
          <RouterLink to="/food" class="closing__link">
            先看看吃什么 <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <SpotModal :spot="activeSpot" @close="closeSpot" />
  </div>
</template>

<style scoped>
.intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(40px, 8vw, 130px);
  align-items: center;
}

.intro__copy h2 {
  max-width: 9ch;
  margin-bottom: 26px;
}

.intro__copy h2 em {
  color: var(--cinnabar);
  font-style: normal;
}

.intro__copy > p:not(.eyebrow) {
  max-width: 48ch;
  margin-bottom: 18px;
  color: var(--muted);
  font-size: 0.93rem;
  line-height: 1.95;
}

.text-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  color: var(--jade);
  font-size: 0.82rem;
  font-weight: 600;
  border-bottom: 1px solid color-mix(in srgb, var(--jade) 40%, transparent);
  transition: gap 0.2s ease, color 0.2s ease;
}

.text-link:hover {
  gap: 15px;
  color: var(--cinnabar);
}

.intro__collage {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.72fr;
  gap: 18px;
  align-items: end;
  padding-bottom: 40px;
}

.intro__figure {
  margin: 0;
}

.intro__figure--tall {
  transform: translateY(30px);
}

.intro__figure img {
  width: 100%;
  aspect-ratio: 0.85;
  object-fit: cover;
  border-radius: 140px 140px 16px 16px;
  box-shadow: var(--shadow);
}

.intro__figure:not(.intro__figure--tall) img {
  aspect-ratio: 0.72;
  border-radius: 16px 16px 90px 16px;
}

.intro__figure figcaption {
  margin-top: 10px;
  color: var(--faint);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
}

.intro__note {
  position: absolute;
  right: 4px;
  bottom: 0;
  color: var(--gold);
  font-size: 0.52rem;
  line-height: 1.7;
  letter-spacing: 0.16em;
  text-align: right;
}

.stats-section {
  padding-block: clamp(12px, 2vw, 20px) clamp(36px, 5vw, 60px);
}

.spot-grid,
.food-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.quote-band {
  position: relative;
  overflow: hidden;
  padding-block: clamp(80px, 12vw, 150px);
  color: #f7f0e1;
  background:
    radial-gradient(circle at 20% 30%, rgba(81, 139, 104, 0.35), transparent 38%),
    linear-gradient(120deg, #15251f, #101a17 65%, #1c2a20);
}

.quote-band::before {
  content: "";
  position: absolute;
  top: -40%;
  right: -5%;
  width: 56vw;
  height: 56vw;
  border: 1px solid rgba(232, 194, 124, 0.16);
  border-radius: 50%;
}

.quote-band::after {
  content: "";
  position: absolute;
  right: 14%;
  bottom: -30%;
  width: 36vw;
  height: 36vw;
  border: 1px solid rgba(232, 194, 124, 0.1);
  border-radius: 50%;
}

.quote-band__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.quote-band__mark {
  height: 34px;
  margin-bottom: 6px;
  color: #e8c27c;
  font-family: Georgia, serif;
  font-size: 5rem;
  line-height: 1;
}

.quote-band blockquote {
  margin: 0 0 22px;
  color: #fbf6e9;
  font-family: var(--serif);
  font-size: clamp(2.2rem, 5vw, 4.6rem);
  font-weight: 500;
  line-height: 1.28;
  letter-spacing: -0.03em;
}

.quote-band__source {
  margin: 0;
  color: rgba(247, 240, 225, 0.48);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
}

.quote-band__seal {
  position: absolute;
  top: 24px;
  right: 6%;
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  color: #e8c27c;
  font-family: var(--serif);
  font-size: 1.4rem;
  border: 1px solid rgba(232, 194, 124, 0.42);
  border-radius: 50%;
}

.food-preview {
  background: var(--bg-soft);
}

.plan-preview {
  background: var(--surface-strong);
}

.plan-preview__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(40px, 8vw, 120px);
  align-items: center;
}

.plan-preview__copy h2 {
  margin-bottom: 22px;
}

.plan-preview__copy h2 em {
  color: var(--cinnabar);
  font-style: normal;
}

.plan-preview__copy > p:not(.eyebrow) {
  max-width: 40ch;
  margin-bottom: 26px;
  color: var(--muted);
  font-size: 0.92rem;
  line-height: 1.9;
}

.plan-preview__days {
  display: grid;
  gap: 1px;
  overflow: hidden;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.day-card {
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 25px 26px;
  background: var(--surface);
  transition: background-color 0.25s ease, padding-left 0.25s ease;
}

.day-card:hover {
  padding-left: 34px;
  background: var(--bg);
}

.day-card__label {
  color: var(--cinnabar);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.day-card strong {
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.32rem;
  font-weight: 600;
}

.day-card small {
  color: var(--muted);
  font-size: 0.72rem;
}

.day-card__line {
  position: absolute;
  bottom: 0;
  left: 26px;
  width: 32px;
  height: 1px;
  background: var(--gold);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}

.day-card:hover .day-card__line {
  transform: scaleX(1);
}

.closing {
  padding-block: clamp(100px, 16vw, 220px);
  color: #f7f0e1;
  background:
    linear-gradient(120deg, rgba(14, 23, 18, 0.96), rgba(14, 23, 18, 0.78)),
    var(--closing-image) center 38% / cover;
}

.closing__inner {
  max-width: 680px;
}

.closing h2 {
  margin-bottom: 18px;
  color: #fbf6e9;
  font-size: clamp(3rem, 6.5vw, 6rem);
  line-height: 1.04;
}

.closing > p:not(.eyebrow) {
  margin-bottom: 30px;
  color: rgba(247, 240, 225, 0.62);
  font-size: 0.94rem;
}

.closing__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}

.closing__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(247, 240, 225, 0.7);
  font-size: 0.84rem;
  border-bottom: 1px solid rgba(247, 240, 225, 0.25);
}

.closing__link:hover {
  color: #fbf6e9;
}

@media (max-width: 980px) {
  .spot-grid,
  .food-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .plan-preview__inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

@media (max-width: 800px) {
  .intro__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .intro__collage {
    max-width: 560px;
  }

  .quote-band__seal {
    display: none;
  }
}

@media (max-width: 600px) {
  .spot-grid,
  .food-grid {
    grid-template-columns: 1fr;
  }

  .intro__collage {
    grid-template-columns: 1fr 0.8fr;
    gap: 10px;
  }

  .intro__figure img {
    border-radius: 80px 80px 12px 12px;
  }

  .intro__figure:not(.intro__figure--tall) img {
    border-radius: 12px 12px 60px 12px;
  }

  .day-card {
    grid-template-columns: 64px 1fr;
    padding: 20px 18px;
  }

  .day-card small {
    grid-column: 2;
  }

  .day-card:hover {
    padding-left: 22px;
  }
}
</style>
