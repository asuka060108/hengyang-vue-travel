<template>
  <section class="not-found">
    <div class="container not-found__inner">
      <div class="not-found__art" aria-hidden="true">
        <span class="not-found__seal">雁</span>
        <span class="not-found__line"></span>
        <span class="not-found__number">404</span>
      </div>
      <p class="eyebrow">LOST ON THE RIVER</p>
      <h1>这只雁，<br />飞错了方向。</h1>
      <p class="not-found__text">
        你要找的页面不在衡阳。回首页重新出发，或者去看看南岳的云。
      </p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--primary">
          回到首页
          <span class="btn__arrow" aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink to="/scenery" class="btn btn--ghost">去看风景</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  display: grid;
  min-height: 72vh;
  place-items: center;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 20%, rgba(232, 194, 124, 0.13), transparent 28%),
    var(--bg);
}

.not-found__inner {
  max-width: 780px;
  padding-block: clamp(70px, 12vw, 150px);
  text-align: center;
}

.not-found__art {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.not-found__seal {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  color: #f7f0e1;
  font-family: var(--serif);
  font-size: 1.4rem;
  background: var(--cinnabar);
  border-radius: 14px 14px 14px 2px;
}

.not-found__line {
  width: 80px;
  height: 1px;
  background: var(--line-strong);
}

.not-found__number {
  color: transparent;
  font-family: var(--serif);
  font-size: 2rem;
  -webkit-text-stroke: 1px var(--line-strong);
}

.not-found h1 {
  margin-bottom: 20px;
  font-size: clamp(3rem, 8vw, 6.2rem);
  line-height: 1.02;
}

.not-found__text {
  max-width: 40ch;
  margin: 0 auto 30px;
  color: var(--muted);
  font-size: 0.95rem;
  line-height: 1.9;
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
