import { copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const source = join(dist, 'index.html');
const target = join(dist, '404.html');

await copyFile(source, target);
console.log('✓ 已生成 dist/404.html，用于 GitHub Pages 的 SPA 路由回退');

// GitHub Pages 对真实目录会返回 200；为每个路由生成入口副本，
// 这样直接访问 /scenery、/food、/plan 也不会收到 404 状态码。
for (const route of ['scenery', 'food', 'plan']) {
  const dir = join(dist, route);
  await mkdir(dir, { recursive: true });
  await copyFile(source, join(dir, 'index.html'));
  console.log(`✓ 已生成 dist/${route}/index.html`);
}
