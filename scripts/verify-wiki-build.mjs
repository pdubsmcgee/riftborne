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
  'wiki/organizations/index.html',
  'wiki/organization-screen/index.html',
  'wiki/directive-catalog/index.html',
  'wiki/settlement-procedure/index.html',
  'wiki/fleet-controls/index.html',
  'strategy/advanced-tactics-and-edge-cases/index.html',
  'category/warfare-intelligence/index.html',
  'pagefind/pagefind.js',
  'sitemap-index.xml',
  'robots.txt',
  'social-preview.svg'
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
if (searchable.length < 90) {
  console.error(`Expected at least 90 Pagefind article documents; found ${searchable.length}.`);
  process.exit(1);
}

const routeFiles = new Map();
for (const file of htmlFiles) {
  const relative = path.relative(dist, file).replaceAll('\\', '/');
  const route = relative === 'index.html' ? '/' : relative === '404.html' ? '/404/' : `/${relative.replace(/index\.html$/, '')}`;
  routeFiles.set(route, file);
}

const linkErrors = [];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(html)) linkErrors.push(`${path.relative(dist, file)}: image missing alt text`);
  for (const match of html.matchAll(/\shref=["'](\/(?!\/)[^"']*)["']/g)) {
    const value = match[1];
    const [pathAndQuery, fragment] = value.split('#', 2);
    const pathname = pathAndQuery.split('?', 1)[0];
    if (/\.[a-z0-9]+$/i.test(pathname)) continue;
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    const target = routeFiles.get(normalized);
    if (!target) { linkErrors.push(`${path.relative(dist, file)}: broken route ${value}`); continue; }
    if (fragment && !new RegExp(`\\bid=["']${escapeRegex(decodeURIComponent(fragment))}["']`).test(fs.readFileSync(target, 'utf8'))) {
      linkErrors.push(`${path.relative(dist, file)}: broken anchor ${value}`);
    }
  }
}
if (linkErrors.length) {
  console.error(`Built wiki has ${linkErrors.length} link or media issue(s):`);
  for (const error of linkErrors.slice(0, 100)) console.error(`- ${error}`);
  process.exit(1);
}

const home = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
for (const marker of ['application/ld+json', 'og:image', 'twitter:image', 'How do I', 'Major systems', 'Troubleshooting']) {
  if (!home.includes(marker)) { console.error(`Homepage is missing required marker: ${marker}`); process.exit(1); }
}
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!/Sitemap:\s*https:\/\/riftbornewiki\.317society\.com\/sitemap-index\.xml/i.test(robots)) {
  console.error('robots.txt does not advertise the canonical sitemap.');
  process.exit(1);
}

const corpus = htmlFiles.map((file) => fs.readFileSync(file, 'utf8')).join(' ').toLowerCase();
for (const term of ['organization fair value', 'share pool', 'dilution', 'credit rating', 'noctmarks', 'spu crafting', 'cannot colonize', 'solis battery', 'shield integrity', '3200 power', 'aegis vanguard']) {
  if (!corpus.includes(term)) { console.error(`Built search corpus is missing required term: ${term}`); process.exit(1); }
}

console.log(`Built wiki verification passed: ${htmlFiles.length} HTML pages and ${searchable.length} searchable articles.`);

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (entry.name.endsWith('.html')) htmlFiles.push(fullPath);
  }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
