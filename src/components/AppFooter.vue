<script setup>
import FooterNav from './FooterNav.vue';

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <span class="footer-brand__seal">雁</span>
          <p class="footer-brand__title">雁城衡阳</p>
          <p class="footer-brand__en">HENGYANG · HUNAN · CHINA</p>
          <p class="footer-brand__text">
            山有南岳，城有湘江，味有鱼粉。<br />
            愿你在衡阳，慢一点，再慢一点。
          </p>
        </div>

        <div class="footer-column">
          <p class="footer-heading">页面</p>
          <FooterNav />
        </div>

        <div class="footer-column">
          <p class="footer-heading">旅行提示</p>
          <p class="footer-note">
            景区开放时间、索道与交通可能随季节调整，出发前请以官方公告为准。
          </p>
          <p class="footer-note">
            部分图片来自 Pexels，作为旅行氛围示意；文字内容为课程项目整理。
          </p>
        </div>
      </div>

      <div class="footer-mark" aria-hidden="true">HENGYANG</div>

      <div class="footer-bottom">
        <p>© {{ year }} 雁城衡阳 · 全栈开发课程实验</p>
        <p>Vue 3 · Vite · Vue Router</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  overflow: hidden;
  padding-top: 76px;
  color: var(--ink-soft);
  background: var(--surface-strong);
  border-top: 1px solid var(--line);
}

.footer-top {
  display: grid;
  grid-template-columns: 1.2fr 0.6fr 1fr;
  gap: clamp(32px, 6vw, 100px);
  padding-bottom: 54px;
}

.footer-brand__seal {
  display: grid;
  width: 42px;
  height: 42px;
  margin-bottom: 18px;
  place-items: center;
  color: #f7f0e1;
  font-family: var(--serif);
  font-size: 1.3rem;
  background: var(--cinnabar);
  border-radius: 11px 11px 11px 2px;
}

.footer-brand__title {
  margin-bottom: 3px;
  color: var(--ink);
  font-family: var(--serif);
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.footer-brand__en {
  margin-bottom: 24px;
  color: var(--faint);
  font-size: 0.56rem;
  letter-spacing: 0.22em;
}

.footer-brand__text {
  max-width: 34ch;
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.9;
}

.footer-heading {
  margin-bottom: 15px;
  color: var(--faint);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.footer-note {
  max-width: 34ch;
  margin-bottom: 12px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.8;
}

.footer-mark {
  margin-bottom: -0.1em;
  color: transparent;
  font-family: var(--serif);
  font-size: clamp(4rem, 14vw, 12rem);
  font-weight: 700;
  letter-spacing: -0.06em;
  line-height: 0.8;
  -webkit-text-stroke: 1px var(--line-strong);
  user-select: none;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 22px 0 28px;
  color: var(--faint);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  border-top: 1px solid var(--line);
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .site-footer {
    padding-top: 56px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .footer-brand {
    grid-column: auto;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
