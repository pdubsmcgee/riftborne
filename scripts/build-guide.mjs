import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'wiki', 'content', 'articles');
const target = path.join(root, 'GUIDE.md');
const checkOnly = process.argv.includes('--check');

const categoryOrder = [
  'Getting started',
  'Economy',
  'Expansion and buildings',
  'Cultures',
  'Ships and fleets',
  'Warfare and intelligence',
  'Objectives',
  'Multiplayer',
  'Strategy',
  'Reference'
];

const entries = fs.readdirSync(contentDir)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const parsed = matter(fs.readFileSync(path.join(contentDir, name), 'utf8'));
    return { ...parsed.data, body: parsed.content.trim() };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

const lines = [
  '# The Riftborne Field Manual',
  '',
  '> Generated from the canonical Riftborne Wiki article collection. Edit the individual files in `wiki/content/articles/`, then run `npm run guide:generate`.',
  '',
  'This reference targets **Riftborne patch 11.75**, build `a7b5c7c`. Confirmed mechanics cite current-client evidence; live-world observations and strategy are labeled separately.',
  ''
];

for (const category of categoryOrder) {
  const members = entries.filter((entry) => entry.category === category);
  if (!members.length) continue;
  lines.push(`## ${category}`, '');
  for (const entry of members) {
    const route = `/${entry.pageType === 'strategy' ? 'strategy' : 'wiki'}/${entry.slug}/`;
    lines.push(`### ${entry.title}`, '', `Canonical page: [${route}](https://riftbornewiki.317society.com${route})`, '');
    lines.push(entry.body.replace(/^# .+$/gm, '').trim(), '');
  }
}

const output = `${lines.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
if (checkOnly) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : '';
  if (current !== output) {
    console.error('GUIDE.md is out of date. Run npm run guide:generate.');
    process.exit(1);
  }
  console.log(`GUIDE.md matches ${entries.length} canonical wiki articles.`);
} else {
  fs.writeFileSync(target, output, 'utf8');
  console.log(`Generated GUIDE.md from ${entries.length} wiki articles.`);
}
