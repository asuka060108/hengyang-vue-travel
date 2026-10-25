<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import PageHero from '@/components/PageHero.vue';
import SectionHeading from '@/components/SectionHeading.vue';
import ItineraryTimeline from '@/components/ItineraryTimeline.vue';
import TravelTips from '@/components/TravelTips.vue';
import {
  itineraryDays,
  packingItems,
  travelTips,
} from '@/data/itinerary';
import heroImage from '@/assets/images/dongzhou.webp';

const STORAGE_KEY = 'hengyang-packing';
const packingReady = ref(false);

const budgetStyle = ref('comfort');
const travelDays = ref(3);
const travelers = ref(2);

const styleOptions = {
  economy: { label: '经济', perDay: 280, note: '青旅 / 民宿 + 本地小馆' },
  comfort: { label: '舒适', perDay: 520, note: '舒适酒店 + 正经餐馆' },
  premium: { label: '品质', perDay: 860, note: '山景酒店 + 精选餐厅' },
};

const ticketPerPerson = 160;
const styleInfo = computed(() => styleOptions[budgetStyle.value]);
const perPerson = computed(
  () => styleInfo.value.perDay * travelDays.value + ticketPerPerson
);
const totalBudget = computed(() => perPerson.value * travelers.value);

const money = new Intl.NumberFormat('zh-CN');

const checklist = reactive(
  packingItems.map((item) => ({ ...item, checked: false }))
);
const doneCount = computed(
  () => checklist.filter((item) => item.checked).length
);
const packingProgress = computed(
  () => (checklist.length ? (doneCount.value / checklist.length) * 100 : 0)
);

const transport = [
  {
    type: '高铁',
    title: '衡阳东站',
    text: '长沙南约 30–40 分钟，广州南约 2 小时。出站后可打车或坐旅游专线去南岳。',
  },
  {
    type: '飞机',
    title: '衡阳南岳机场',
    text: '机场到市区约 30 分钟，航班较少，适合远距离出发。',
  },
  {
    type: '自驾',
    title: '南岳景区',
    text: '节假日停车位紧张，建议早上 8 点前到。山路多弯，雨天慢行。',
  },
];

onMounted(() => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (Array.isArray(saved)) {
      for (const item of checklist) {
        item.checked = saved.includes(item.id);
      }
    }
  } catch {
    // Ignore malformed storage and start fresh.
  }
  packingReady.value = true;
});

watch(
  checklist,
  (value) => {
    if (!packingReady.value) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(value.filter((item) => item.checked).map((item) => item.id))
      );
    } catch {
      // Storage may be unavailable.
    }
  },
  { deep: true }
);

function resetChecklist() {
  for (const item of checklist) {
    item.checked = false;
  }
}
</script>

<template>
  <div class="plan-page">
    <PageHero
      eyebrow="PLAN / 行程"
      title="三日雁城"
      accent="把时间走慢"
      subtitle="三天两晚，一天给山，一天给城，一天给江畔和伴手礼。不是打卡清单，是一条可以随时停下来的慢路线。"
      :image="heroImage"
      image-position="center 50%"
    >
      <template #meta>
        <span>3 天 2 晚</span>
        <span>南岳 + 市区 + 江畔</span>
        <span>适合第一次来衡阳</span>
      </template>

      <template #aside>
        <div class="plan-hero-note">
          <span class="plan-hero-note__label">A SLOW ROUTE</span>
          <p>如果只有两天，删掉第三天；如果遇到雨，把山和城调换顺序。</p>
          <span class="plan-hero-note__stamp">行</span>
        </div>
      </template>
    </PageHero>

    <section class="plan-facts">
      <div class="container plan-facts__grid">
        <div>
          <span>最佳季节</span>
          <strong>春 / 秋</strong>
          <small>4–5 月、9–11 月最舒服</small>
        </div>
        <div>
          <span>建议节奏</span>
          <strong>3 天 2 晚</strong>
          <small>山上住一晚，市区住一晚</small>
        </div>
        <div>
          <span>人均预算</span>
          <strong>¥{{ money.format(perPerson) }}</strong>
          <small>不含往返大交通</small>
        </div>
        <div>
          <span>关键词</span>
          <strong>山 · 江 · 粉</strong>
          <small>早起看云，夜里嗦螺</small>
        </div>
      </div>
    </section>

    <section class="section itinerary-section">
      <div class="container">
        <SectionHeading
          eyebrow="THE ROUTE"
          title="三天，刚好够认识衡阳"
          description="点击 DAY 01 / 02 / 03 切换行程。时间可以弹性调整，别把自己赶得太紧。"
        />
        <ItineraryTimeline :days="itineraryDays" />
      </div>
    </section>

    <section class="section plan-tools">
      <div class="container plan-tools__grid">
        <div class="budget-card" v-reveal>
          <p class="eyebrow">BUDGET CALCULATOR</p>
          <h2>先算一笔<br /><em>旅行账</em></h2>
          <p class="budget-card__intro">
            按 3 天 2 晚估算，包含住宿、吃饭、市内交通和南岳门票，不含往返大交通。
          </p>

          <div class="budget-form">
            <label class="field">
              <span>旅行方式</span>
              <select v-model="budgetStyle" class="select">
                <option value="economy">经济 · {{ styleOptions.economy.note }}</option>
                <option value="comfort">舒适 · {{ styleOptions.comfort.note }}</option>
                <option value="premium">品质 · {{ styleOptions.premium.note }}</option>
              </select>
            </label>

            <div class="budget-slider">
              <div class="budget-slider__head">
                <span>旅行天数</span>
                <strong>{{ travelDays }} 天</strong>
              </div>
              <input v-model.number="travelDays" type="range" min="1" max="5" step="1" />
            </div>

            <div class="budget-slider">
              <div class="budget-slider__head">
                <span>出行人数</span>
                <strong>{{ travelers }} 人</strong>
              </div>
              <input v-model.number="travelers" type="range" min="1" max="8" step="1" />
            </div>
          </div>

          <div class="budget-result">
            <div>
              <span>人均预算</span>
              <strong>¥{{ money.format(perPerson) }}</strong>
            </div>
            <div>
              <span>总预算</span>
              <strong>¥{{ money.format(totalBudget) }}</strong>
            </div>
          </div>
          <p class="budget-card__note">
            估算口径：{{ styleInfo.note }}，含南岳门票 ¥{{ ticketPerPerson }}/人。
          </p>
        </div>

        <div class="checklist-card" v-reveal="{ delay: 120 }">
          <div class="checklist-card__head">
            <div>
              <p class="eyebrow">PACKING LIST</p>
              <h2>出发前，<br /><em>别忘带这些</em></h2>
            </div>
            <span class="checklist-card__count">{{ doneCount }} / {{ checklist.length }}</span>
          </div>

          <div class="checklist-progress" aria-hidden="true">
            <span :style="{ width: `${packingProgress}%` }"></span>
          </div>

          <ul class="checklist">
            <li v-for="item in checklist" :key="item.id">
              <label :class="{ 'is-checked': item.checked }">
                <input v-model="item.checked" type="checkbox" />
                <span class="checklist__box" aria-hidden="true"></span>
                <span class="checklist__text">
                  <strong>{{ item.label }}</strong>
                  <small>{{ item.hint }}</small>
                </span>
              </label>
            </li>
          </ul>

          <div class="checklist-card__foot">
            <p>勾选状态会保存在本机浏览器。</p>
            <button type="button" @click="resetChecklist">清空清单</button>
          </div>
        </div>
      </div>
    </section>

    <section class="transport-section">
      <div class="container">
        <SectionHeading
          eyebrow="GETTING THERE"
          title="怎么到衡阳，怎么去南岳"
          description="衡阳的交通不复杂，关键是给南岳留出完整的半天。"
        />
        <div class="transport-grid">
          <article
            v-for="(item, index) in transport"
            :key="item.type"
            class="transport-card"
            v-reveal="{ delay: index * 80 }"
          >
            <span class="transport-card__type">{{ item.type }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <SectionHeading
          eyebrow="TRAVEL NOTES"
          title="最后，再提醒你四件事"
          description="这些小事，能让衡阳之行舒服很多。"
        />
        <TravelTips :tips="travelTips" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.plan-hero-note {
  padding: 22px;
  color: rgba(247, 240, 225, 0.72);
  background: rgba(14, 25, 20, 0.32);
  border: 1px solid rgba(247, 240, 225, 0.2);
  border-radius: 3px 18px 3px 18px;
  backdrop-filter: blur(10px);
}

.plan-hero-note__label {
  display: block;
  margin-bottom: 10px;
  color: #e8c27c;
  font-size: 0.54rem;
  letter-spacing: 0.18em;
}

.plan-hero-note p {
  margin: 0;
  font-family: var(--serif);
  font-size: 0.94rem;
  line-height: 1.75;
}

.plan-hero-note__stamp {
  display: grid;
  width: 30px;
  height: 30px;
  margin-top: 16px;
  place-items: center;
  color: rgba(232, 194, 124, 0.7);
  font-family: var(--serif);
  font-size: 0.84rem;
  border: 1px solid rgba(232, 194, 124, 0.35);
  border-radius: 50%;
}

.plan-facts {
  padding-block: 0;
  background: var(--surface-strong);
  border-bottom: 1px solid var(--line);
}

.plan-facts__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.plan-facts__grid > div {
  padding: 26px 22px;
  border-left: 1px solid var(--line);
}

.plan-facts__grid > div:first-child {
  border-left: 0;
}

.plan-facts span {
  display: block;
  margin-bottom: 7px;
  color: var(--faint);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
}

.plan-facts strong {
  display: block;
  margin-bottom: 3px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
}

.plan-facts small {
  color: var(--muted);
  font-size: 0.66rem;
}

.itinerary-section {
  background: var(--bg);
}

.plan-tools {
  background: var(--bg-soft);
}

.plan-tools__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}

.budget-card,
.checklist-card {
  padding: clamp(26px, 4vw, 40px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
}

.budget-card h2,
.checklist-card h2 {
  margin-bottom: 16px;
  font-size: clamp(2rem, 3.5vw, 3rem);
}

.budget-card h2 em,
.checklist-card h2 em {
  color: var(--cinnabar);
  font-style: normal;
}

.budget-card__intro {
  max-width: 48ch;
  margin-bottom: 26px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.8;
}

.budget-form {
  display: grid;
  gap: 19px;
}

.budget-form .field > span {
  color: var(--faint);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.budget-slider {
  display: grid;
  gap: 8px;
}

.budget-slider__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
  font-size: 0.72rem;
}

.budget-slider__head strong {
  color: var(--ink);
  font-family: var(--serif);
  font-size: 1rem;
  font-weight: 600;
}

.budget-slider input[type="range"] {
  width: 100%;
  accent-color: var(--jade);
  cursor: pointer;
}

.budget-result {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  margin-top: 26px;
  overflow: hidden;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.budget-result div {
  padding: 16px;
  background: var(--jade-light);
}

.budget-result span {
  display: block;
  margin-bottom: 4px;
  color: var(--muted);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
}

.budget-result strong {
  color: var(--jade-deep);
  font-family: var(--serif);
  font-size: clamp(1.3rem, 2.5vw, 1.9rem);
  font-weight: 600;
}

.budget-card__note {
  margin: 14px 0 0;
  color: var(--faint);
  font-size: 0.65rem;
}

.checklist-card {
  display: flex;
  flex-direction: column;
}

.checklist-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.checklist-card__count {
  flex: 0 0 auto;
  padding-top: 8px;
  color: var(--gold);
  font-family: var(--serif);
  font-size: 1rem;
}

.checklist-progress {
  height: 3px;
  margin: 22px 0 18px;
  overflow: hidden;
  background: var(--line);
  border-radius: 999px;
}

.checklist-progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--jade), var(--gold));
  transition: width 0.3s ease;
}

.checklist {
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.checklist label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 8px;
  border-radius: 9px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.checklist label:hover {
  background: var(--bg);
}

.checklist input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.checklist__box {
  position: relative;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  border: 1px solid var(--line-strong);
  border-radius: 5px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.checklist__box::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 5px;
  width: 5px;
  height: 9px;
  border: solid #f7f0e1;
  border-width: 0 1.5px 1.5px 0;
  opacity: 0;
  transform: rotate(45deg) scale(0.7);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

label.is-checked .checklist__box {
  background: var(--jade);
  border-color: var(--jade);
}

label.is-checked .checklist__box::after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

.checklist__text {
  display: grid;
  gap: 1px;
}

.checklist__text strong {
  color: var(--ink-soft);
  font-size: 0.8rem;
  font-weight: 500;
}

.checklist__text small {
  color: var(--faint);
  font-size: 0.64rem;
}

label.is-checked .checklist__text strong {
  color: var(--faint);
  text-decoration: line-through;
}

.checklist-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--line);
}

.checklist-card__foot p {
  margin: 0;
  color: var(--faint);
  font-size: 0.62rem;
}

.checklist-card__foot button {
  padding: 0;
  color: var(--muted);
  font-size: 0.7rem;
  background: transparent;
  border-bottom: 1px solid var(--line-strong);
  cursor: pointer;
}

.checklist-card__foot button:hover {
  color: var(--cinnabar);
}

.transport-section {
  padding-block: clamp(70px, 10vw, 120px);
  background: var(--bg);
}

.transport-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.transport-card {
  padding: 26px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.transport-card:hover {
  border-color: var(--line-strong);
  transform: translateY(-3px);
}

.transport-card__type {
  display: inline-block;
  margin-bottom: 24px;
  padding: 5px 10px;
  color: var(--cinnabar);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: var(--cinnabar-light);
  border-radius: 999px;
}

.transport-card h3 {
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.transport-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.79rem;
  line-height: 1.8;
}

@media (max-width: 1000px) {
  .plan-facts__grid {
    grid-template-columns: 1fr 1fr;
  }

  .plan-facts__grid > div:nth-child(3) {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .plan-facts__grid > div:nth-child(4) {
    border-top: 1px solid var(--line);
  }

  .plan-tools__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .transport-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .plan-facts__grid {
    grid-template-columns: 1fr;
  }

  .plan-facts__grid > div {
    padding: 18px 0;
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .plan-facts__grid > div:first-child {
    border-top: 0;
  }

  .budget-result {
    grid-template-columns: 1fr;
  }
}
</style>
