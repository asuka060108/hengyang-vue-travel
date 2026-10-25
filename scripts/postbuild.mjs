import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const source = join(dist, 'index.html');
const target = join(dist, '404.html');

await copyFile(source, target);
console.log('✓ 已生成 dist/404.html，用于 GitHub Pages 的 SPA 路由回退');
