# 雁城衡阳 · 山水与烟火

![雁城衡阳首页](preview.webp)

一个以「衡阳旅行」为主题的纯前端 Vue 3 网站，包含 **4 个主页面、24 个 Vue 单文件组件**，覆盖衡阳风景、美食与三日行程。

- **在线体验**：<https://asuka060108.github.io/hengyang-vue-travel/>
- **GitHub 仓库**：<https://github.com/asuka060108/hengyang-vue-travel>
- **实验报告**：[实验报告.md](./实验报告.md)

## 页面

| 路由 | 页面 | 内容 |
| --- | --- | --- |
| `/` | 首页 | 南岳 Hero、衡阳介绍、数据、精选风景与美食、三日行程预览、旅行提示 |
| `/scenery` | 风景 | 6 处风景、分类筛选、关键词搜索、排序、景点详情弹窗 |
| `/food` | 美食 | 8 种味道、分类/辣度/收藏筛选、味觉清单持久化 |
| `/plan` | 行程 | 三日时间轴、预算计算器、行前清单、交通与旅行提示 |
| `/:pathMatch(.*)*` | 404 | 失配路由兜底 |

## 技术栈

- Vue 3.5（Composition API + `<script setup>`）
- Vue Router 4
- Vite 7
- 原生 CSS（CSS Variables、Grid、Transition、响应式）
- Canvas / SVG / 自定义指令 / IntersectionObserver
- 无第三方 UI 库，无后端依赖

## 24 个 Vue 单文件组件

### 根组件与页面（6）

`App.vue`、`HomeView.vue`、`SceneryView.vue`、`FoodView.vue`、`PlanView.vue`、`NotFoundView.vue`

> `App.vue` 是根组件，另外 5 个是路由页面组件；连同下方 18 个通用组件，共 **24 个 SFC**。

### 通用组件（18）

`AppHeader.vue`、`AppFooter.vue`、`FooterNav.vue`、`ThemeToggle.vue`、`ScrollProgress.vue`、`BackToTop.vue`、`HeroSection.vue`、`PageHero.vue`、`SectionHeading.vue`、`StatStrip.vue`、`SpotCard.vue`、`FoodCard.vue`、`FilterTabs.vue`、`SpotModal.vue`、`FavoritesBar.vue`、`EmptyState.vue`、`TravelTips.vue`、`ItineraryTimeline.vue`

### 非组件模块

- `src/router/index.js`：路由、懒加载、滚动行为、页面标题。
- `src/data/`：景点、美食、行程、旅行提示数据。
- `src/composables/`：`useTheme`、`useFavorites`。
- `src/directives/reveal.js`：`v-reveal` 滚动入场指令。
- `src/assets/styles/main.css`：设计变量、全局样式、主题、过渡与响应式。

## Vue 教程知识点覆盖

| 知识点 | 项目中的落点 |
| --- | --- |
| 应用与组件 | `main.js` 创建应用；24 个 SFC |
| 模板语法 / 插值 | `{{ }}`、动态文案、`v-bind` 简写 |
| 响应式基础 | `ref`、`reactive`（预算、清单、筛选状态） |
| 计算属性 | 过滤结果、收藏列表、预算、清单进度 |
| 侦听器 | `watch` 同步 URL 查询、持久化收藏与清单；`watchEffect` 同步主题 |
| 生命周期 | `onMounted` / `onBeforeUnmount`：滚动监听、键盘监听、Canvas、焦点管理 |
| Class / Style 绑定 | 激活导航、筛选标签、主题、进度条、图片位置 |
| 条件渲染 | `v-if` / `v-else`：弹窗、空状态、收藏栏、移动菜单 |
| 列表渲染 | `v-for`：景点、美食、行程、日志、清单、标签 |
| 事件处理 | 点击、输入、搜索、收藏、切换主题、弹窗关闭 |
| 表单绑定 | `v-model`：搜索、排序、select、range、checkbox；`defineModel`：`FilterTabs` |
| 组件 Props / Emits | `SpotCard`、`FoodCard`、`PageHero`、`SpotModal` 等 |
| 插槽 Slots | `SectionHeading` 的 `actions`、`PageHero` 的 `meta/aside`、`EmptyState` 的 `actions` |
| 模板引用 | 搜索框聚焦、弹窗关闭按钮聚焦 |
| 依赖注入 | `App.vue` 通过 `provide('theme')` 提供主题，`ThemeToggle` 使用 `inject` |
| 自定义指令 | `v-reveal` 基于 IntersectionObserver 的滚动入场 |
| Vue Router | 4 个主路由 + 404、懒加载、query 同步、滚动行为、页面标题 |
| 过渡与动画 | `<Transition>` 页面切换、弹窗、主题图标；`<TransitionGroup>` 卡片筛选与时间轴 |
| Teleport | `SpotModal` 将弹窗传送到 `body` |
| KeepAlive | `App.vue` 缓存最多 3 个页面组件 |
| 组合式函数 | `useTheme`、`useFavorites` 单例状态 + localStorage |
| 状态持久化 | 主题、收藏、行前清单写入 localStorage |

## 本地运行

需要 Node.js 20+。

```bash
pnpm install
pnpm dev
```

打开 `http://localhost:5173/`。

生产构建：

```bash
pnpm build
pnpm preview
```

`postbuild` 会把 `dist/index.html` 复制为 `dist/404.html`，用于 GitHub Pages 的 SPA 回退。

## 部署

仓库使用 `main` 保存源码，`gh-pages` 分支发布构建产物。

```bash
# GitHub Pages 需要子路径 base
$env:VITE_BASE='/hengyang-vue-travel/'
pnpm build
```

## 设计说明

- 视觉使用米纸色、墨绿、朱砂与金色，结合宋体标题和编辑式留白。
- 首页为沉浸式山景 Hero，内页使用统一的 `PageHero`。
- 支持日间 / 夜间主题，默认跟随系统。
- 卡片、筛选、弹窗、时间轴和预算/清单均有动效与移动端适配。
- 图片来自 Pexels，仅作为课程项目的旅行氛围示意；文字与行程为项目整理内容。

## 数据与图片来源

- 景点与美食数据维护在 `src/data/attractions.js`、`src/data/foods.js`。
- 行程、旅行提示与行前清单维护在 `src/data/itinerary.js`。
- 图片素材来自 [Pexels](https://www.pexels.com/)，仅用于课程演示，版权归原作者所有。
