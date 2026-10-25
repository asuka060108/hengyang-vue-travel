const prefersReducedMotion = window.matchMedia?.(
  '(prefers-reduced-motion: reduce)'
).matches;

let observer;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
  }
  return observer;
}

/**
 * v-reveal="{ delay: 120 }"：元素进入视口时淡入。
 * 同时演示自定义指令、IntersectionObserver 和 reduced-motion 处理。
 */
export default {
  mounted(el, binding) {
    if (prefersReducedMotion) {
      el.classList.add('is-visible');
      return;
    }

    el.classList.add('reveal');
    const delay =
      typeof binding.value === 'number' ? binding.value : binding.value?.delay;

    if (delay) {
      el.style.setProperty('--reveal-delay', `${delay}ms`);
    }

    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
