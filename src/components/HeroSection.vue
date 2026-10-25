<script setup>
defineProps({
  image: { type: String, required: true },
});
</script>

<template>
  <section class="hero">
    <img class="hero__image" :src="image" alt="南岳衡山云雾山景" />
    <div class="hero__veil"></div>
    <div class="hero__grain"></div>

    <div class="container hero__inner">
      <div class="hero__copy">
        <p class="hero__kicker">HUNAN · CHINA · 26.89°N</p>
        <h1>
          <span>山有南岳</span>
          <em>城有湘江</em>
        </h1>
        <p class="hero__lede">
          衡阳，古称雁城。北雁南飞至此而回，湘江与蒸水在此相遇。
          这里有五岳独秀的云海，也有一碗鱼粉唤醒的清晨。
        </p>

        <div class="hero__actions">
          <RouterLink to="/scenery" class="btn btn--light">
            去看山
            <span class="btn__arrow" aria-hidden="true">→</span>
          </RouterLink>
          <RouterLink to="/food" class="hero__text-link">
            去吃一碗鱼粉
            <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>

        <div class="hero__meta">
          <span>1300.2m 祝融峰</span>
          <span>2200+ 年建城史</span>
          <span>湘江穿城而过</span>
        </div>
      </div>

      <aside class="hero__aside">
        <div class="hero__stamp">雁</div>
        <p class="hero__aside-label">TRAVEL NOTE / 01</p>
        <p class="hero__aside-title">从一座山，<br />走进一座城。</p>
        <p class="hero__aside-text">
          建议把南岳放在第一天，把市区留给第二天。山上看云，城里吃粉。
        </p>
        <div class="hero__aside-rule"></div>
        <p class="hero__aside-foot">HENGYANG TRAVEL GUIDE · 2026</p>
      </aside>
    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span>SCROLL TO EXPLORE</span>
      <i></i>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: flex;
  min-height: calc(100svh - var(--header-height));
  padding-block: clamp(100px, 14vw, 170px) clamp(54px, 8vw, 96px);
  overflow: hidden;
  color: #f8f2e5;
  background: #16211c;
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  filter: saturate(0.82) contrast(1.02);
  animation: heroScale 16s ease-out both;
}

@keyframes heroScale {
  from {
    transform: scale(1.08);
  }
  to {
    transform: scale(1);
  }
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(9, 17, 14, 0.88) 0%, rgba(9, 17, 14, 0.52) 52%, rgba(9, 17, 14, 0.08) 100%),
    linear-gradient(0deg, rgba(9, 17, 14, 0.56), transparent 46%);
}

.hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 50px;
  width: min(var(--max-width), calc(100% - 48px));
}

.hero__copy {
  max-width: 720px;
  animation: copyIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes copyIn {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

.hero__kicker {
  margin-bottom: 22px;
  color: #e8c27c;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.24em;
}

.hero h1 {
  margin-bottom: 24px;
  color: #fbf6e9;
  font-size: clamp(4rem, 10vw, 9.5rem);
  font-weight: 500;
  line-height: 0.96;
  letter-spacing: -0.055em;
  text-wrap: balance;
}

.hero h1 span,
.hero h1 em {
  display: block;
}

.hero h1 em {
  color: #e8c27c;
  font-style: normal;
  transform: translateX(clamp(24px, 6vw, 100px));
}

.hero__lede {
  max-width: 46ch;
  margin-bottom: 30px;
  color: rgba(248, 242, 229, 0.74);
  font-size: clamp(0.95rem, 1.4vw, 1.08rem);
  line-height: 1.9;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}

.hero__text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(248, 242, 229, 0.78);
  font-size: 0.84rem;
  border-bottom: 1px solid rgba(248, 242, 229, 0.28);
  transition: color 0.2s ease, border-color 0.2s ease;
}

.hero__text-link:hover {
  color: #fbf6e9;
  border-color: #fbf6e9;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin-top: 52px;
  color: rgba(248, 242, 229, 0.47);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
}

.hero__meta span {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}

.hero__meta span::before {
  content: "";
  width: 4px;
  height: 4px;
  background: #e8c27c;
  border-radius: 50%;
}

.hero__aside {
  flex: 0 0 250px;
  align-self: flex-end;
  padding: 24px;
  background: rgba(17, 29, 23, 0.32);
  border: 1px solid rgba(248, 242, 229, 0.18);
  border-radius: 4px 24px 4px 24px;
  backdrop-filter: blur(10px);
  animation: copyIn 1.1s 0.16s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__stamp {
  display: grid;
  width: 38px;
  height: 38px;
  margin-bottom: 30px;
  place-items: center;
  color: #fbf6e9;
  font-family: var(--serif);
  font-size: 1.2rem;
  border: 1px solid rgba(232, 194, 124, 0.7);
  border-radius: 50%;
}

.hero__aside-label {
  margin-bottom: 14px;
  color: rgba(248, 242, 229, 0.45);
  font-size: 0.54rem;
  letter-spacing: 0.18em;
}

.hero__aside-title {
  margin-bottom: 12px;
  font-family: var(--serif);
  font-size: 1.52rem;
  line-height: 1.42;
}

.hero__aside-text {
  margin-bottom: 22px;
  color: rgba(248, 242, 229, 0.62);
  font-size: 0.78rem;
  line-height: 1.75;
}

.hero__aside-rule {
  height: 1px;
  margin-bottom: 13px;
  background: rgba(248, 242, 229, 0.16);
}

.hero__aside-foot {
  margin: 0;
  color: rgba(248, 242, 229, 0.35);
  font-size: 0.48rem;
  letter-spacing: 0.14em;
}

.hero__scroll {
  position: absolute;
  right: clamp(22px, 4vw, 56px);
  bottom: 28px;
  display: flex;
  align-items: center;
  gap: 13px;
  color: rgba(248, 242, 229, 0.42);
  font-size: 0.54rem;
  letter-spacing: 0.18em;
  writing-mode: vertical-rl;
}

.hero__scroll i {
  display: block;
  width: 1px;
  height: 44px;
  background: linear-gradient(#e8c27c, transparent);
  animation: scrollLine 1.8s ease-in-out infinite;
  transform-origin: top;
}

@keyframes scrollLine {
  50% {
    transform: scaleY(0.55);
    opacity: 0.4;
  }
}

@media (max-width: 980px) {
  .hero__aside {
    display: none;
  }

  .hero__scroll {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero {
    min-height: calc(100svh - var(--header-height));
    padding-block: 86px 56px;
  }

  .hero__inner {
    width: calc(100% - 36px);
  }

  .hero h1 {
    font-size: clamp(3.5rem, 18vw, 5.5rem);
  }

  .hero h1 em {
    transform: translateX(18px);
  }

  .hero__lede {
    font-size: 0.9rem;
  }

  .hero__meta {
    margin-top: 36px;
    gap: 8px 14px;
    font-size: 0.6rem;
  }
}
</style>
