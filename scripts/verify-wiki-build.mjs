import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist-wiki');
const required = [
  'index.html',
  '404.html',
  'a-z/index.html',
  'search/index.html',
  'wiki/combat-power/index.html',
  'wiki/solis-battery/index.html',
  'wiki/aegis-vanguard/index.html',
  'strategy/advanced-tactics-and-edge-cases/index.html',
  'category/warfare-intelligence/index.html',
  'pagefind/pagefind.js',
  'sitemap-index.xml',
  'robots.txt'
];

const missing = required.filter((relative) => !fs.existsSync(path.join(dist, relative)));
if (missing.length) {
  console.error(`Built wiki is missing ${missing.length} required output(s):`);
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

const htmlFiles = [];
walk(dist);
const searchable = htmlFiles.filter((file) => {
  const html = fs.readFileSync(file, 'utf8');
  return html.includes('data-pagefind-body');
});
if (searchable.length < 45) {
  console.error(`Expected at least 45 Pagefind article documents; found ${searchable.length}.`);
  process.exit(1);
}

console.log(`Built wiki verification passed: ${htmlFiles.length} HTML pages and ${searchable.length} searchable articles.`);

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}
