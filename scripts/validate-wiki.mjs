import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const locations = [
  ['articles', path.join(root, 'wiki', 'content', 'articles')],
  ['categories', path.join(root, 'wiki', 'content', 'categories')]
];
const validSources = new Set(['local-guide', 'local-data', 'official-manual', 'steam', 'patch-11-64', 'community-guide']);
const validTypes = new Set(['overview', 'guide', 'mechanic', 'reference', 'strategy']);
const validVerification = new Set(['confirmed', 'patch-sensitive', 'observed', 'inferred', 'strategy']);
const required = ['title', 'slug', 'summary', 'category', 'pageType', 'patch', 'verification', 'lastReviewed', 'order', 'aliases', 'relatedPages', 'sources'];
const errors = [];
const entries = [];

for (const [collection, directory] of locations) {
  if (!fs.existsSync(directory)) {
    errors.push(`Missing content directory: ${directory}`);
    continue;
  }
  for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.md'))) {
    const fullPath = path.join(directory, filename);
    const parsed = matter(fs.readFileSync(fullPath, 'utf8'));
    const entry = { collection, filename, body: parsed.content, ...parsed.data };
    entries.push(entry);
    for (const field of required) {
      if (entry[field] === undefined || entry[field] === null) errors.push(`${collection}/${filename}: missing ${field}`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug ?? '')) errors.push(`${collection}/${filename}: invalid slug`);
    if (!validTypes.has(entry.pageType)) errors.push(`${collection}/${filename}: invalid pageType ${entry.pageType}`);
    if (!validVerification.has(entry.verification)) errors.push(`${collection}/${filename}: invalid verification ${entry.verification}`);
    if (!Array.isArray(entry.sources) || !entry.sources.length) errors.push(`${collection}/${filename}: at least one source is required`);
    for (const source of entry.sources ?? []) {
      if (!validSources.has(source)) errors.push(`${collection}/${filename}: unknown source ${source}`);
    }
    if (strip(entry.body).length < 60) errors.push(`${collection}/${filename}: body is too short`);
  }
}

const articles = entries.filter((entry) => entry.collection === 'articles');
if (articles.length < 45) errors.push(`Expected at least 45 focused articles; found ${articles.length}`);

const routeCounts = new Map();
for (const entry of entries) {
  const route = entry.collection === 'categories'
    ? `/category/${entry.slug}/`
    : `/${entry.pageType === 'strategy' ? 'strategy' : 'wiki'}/${entry.slug}/`;
  routeCounts.set(route, (routeCounts.get(route) ?? 0) + 1);
}
for (const [route, count] of routeCounts) if (count > 1) errors.push(`Duplicate route: ${route}`);

const articleSlugs = new Set(articles.map((entry) => entry.slug));
for (const entry of entries) {
  for (const related of entry.relatedPages ?? []) {
    if (!articleSlugs.has(related)) errors.push(`${entry.collection}/${entry.filename}: missing related page ${related}`);
  }
  for (const match of entry.body.matchAll(/\]\(\/(?:wiki|strategy)\/([a-z0-9-]+)\/\)/g)) {
    if (!articleSlugs.has(match[1])) errors.push(`${entry.collection}/${entry.filename}: broken internal link ${match[0]}`);
  }
}

const corpus = articles.map((entry) => `${entry.title} ${(entry.aliases ?? []).join(' ')} ${strip(entry.body)}`).join(' ').toLowerCase();
for (const term of ['solis battery', 'aegis', '3200 power', 'shield integrity', 'keystone', 'cheese']) {
  if (!corpus.includes(term)) errors.push(`Search corpus is missing required term: ${term}`);
}

if (errors.length) {
  console.error(`Wiki validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Wiki validation passed: ${articles.length} articles, ${entries.length - articles.length} categories, ${articleSlugs.size} unique article routes.`);

function strip(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
