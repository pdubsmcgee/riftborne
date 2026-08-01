import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const expectedPatch = '11.75';
const expectedBuild = 'a7b5c7c';
const verifiedAt = '2026-07-30';
const locations = [
  ['articles', path.join(root, 'wiki', 'content', 'articles')],
  ['categories', path.join(root, 'wiki', 'content', 'categories')]
];
const validTypes = new Set(['overview', 'guide', 'mechanic', 'reference', 'strategy']);
const validVerification = new Set(['confirmed', 'patch-sensitive', 'observed', 'inferred', 'strategy']);
const validRulesets = new Set(['core', 'live-world', 'both', 'strategy']);
const required = [
  'title', 'slug', 'summary', 'category', 'pageType', 'patch',
  'verifiedBuild', 'verifiedAt', 'ruleset', 'verification',
  'lastReviewed', 'order', 'aliases', 'relatedPages', 'evidence'
];
const errors = [];
const entries = [];

const evidenceSource = fs.readFileSync(path.join(root, 'wiki', 'src', 'data', 'evidence.ts'), 'utf8');
const evidenceIds = new Set([...evidenceSource.matchAll(/^\s{2}'([a-z0-9-]+)':\s*\{/gm)].map((match) => match[1]));
if (!evidenceIds.size) errors.push('Evidence registry is empty.');

const obsoleteTerms = [
  ['si', 'lo'].join(''),
  ['solar', 'cell'].join(' ')
];

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
    if (!validRulesets.has(entry.ruleset)) errors.push(`${collection}/${filename}: invalid ruleset ${entry.ruleset}`);
    if (entry.patch !== expectedPatch) errors.push(`${collection}/${filename}: expected patch ${expectedPatch}, found ${entry.patch}`);
    if (entry.verifiedBuild !== expectedBuild) errors.push(`${collection}/${filename}: expected build ${expectedBuild}, found ${entry.verifiedBuild}`);
    if (entry.verifiedAt !== verifiedAt) errors.push(`${collection}/${filename}: expected verification date ${verifiedAt}`);
    if (!Array.isArray(entry.evidence) || !entry.evidence.length) errors.push(`${collection}/${filename}: at least one evidence record is required`);
    for (const evidence of entry.evidence ?? []) {
      if (!evidenceIds.has(evidence)) errors.push(`${collection}/${filename}: unknown evidence ${evidence}`);
    }
    if (collection === 'articles') {
      const cited = new Set([...entry.body.matchAll(/#evidence-([a-z0-9-]+)/g)].map((match) => match[1]));
      if (!cited.size) errors.push(`${collection}/${filename}: body has no claim-level evidence citation`);
      for (const citation of cited) {
        if (!entry.evidence.includes(citation)) errors.push(`${collection}/${filename}: cited evidence ${citation} is missing from frontmatter`);
      }
      if (entry.pageType === 'strategy' && (!Array.isArray(entry.mechanicDependencies) || !entry.mechanicDependencies.length)) {
        errors.push(`${collection}/${filename}: strategy requires mechanicDependencies`);
      }
      if (entry.pageType !== 'strategy' && entry.verification === 'strategy') {
        errors.push(`${collection}/${filename}: non-strategy page cannot use strategy verification`);
      }
      if (entry.pageType === 'strategy' && entry.ruleset !== 'strategy') {
        errors.push(`${collection}/${filename}: strategy page must use strategy ruleset`);
      }
    }
    if (strip(entry.body).length < 60) errors.push(`${collection}/${filename}: body is too short`);

    const searchable = `${entry.title} ${entry.summary} ${(entry.aliases ?? []).join(' ')} ${entry.body}`.toLowerCase();
    for (const term of obsoleteTerms) {
      if (new RegExp(`\\b${term.replace(' ', '\\s+')}s?\\b`, 'i').test(searchable)) {
        errors.push(`${collection}/${filename}: contains obsolete terminology`);
      }
    }
  }
}

const articles = entries.filter((entry) => entry.collection === 'articles');
if (articles.length < 45) errors.push(`Expected at least 45 focused articles; found ${articles.length}`);

const articleSlugs = new Set(articles.map((entry) => entry.slug));
const mechanicSlugs = new Set(articles.filter((entry) => entry.pageType !== 'strategy').map((entry) => entry.slug));
const routeCounts = new Map();
for (const entry of entries) {
  const route = entry.collection === 'categories'
    ? `/category/${entry.slug}/`
    : `/${entry.pageType === 'strategy' ? 'strategy' : 'wiki'}/${entry.slug}/`;
  routeCounts.set(route, (routeCounts.get(route) ?? 0) + 1);
}
for (const [route, count] of routeCounts) if (count > 1) errors.push(`Duplicate route: ${route}`);

for (const entry of entries) {
  for (const related of entry.relatedPages ?? []) {
    if (!articleSlugs.has(related)) errors.push(`${entry.collection}/${entry.filename}: missing related page ${related}`);
  }
  for (const dependency of entry.mechanicDependencies ?? []) {
    if (!mechanicSlugs.has(dependency)) errors.push(`${entry.collection}/${entry.filename}: invalid mechanic dependency ${dependency}`);
  }
  for (const match of entry.body.matchAll(/\]\(\/(?:wiki|strategy)\/([a-z0-9-]+)\/\)/g)) {
    if (!articleSlugs.has(match[1])) errors.push(`${entry.collection}/${entry.filename}: broken internal link ${match[0]}`);
  }
}

const corpus = articles.map((entry) => `${entry.title} ${(entry.aliases ?? []).join(' ')} ${strip(entry.body)}`).join(' ').toLowerCase();
for (const term of ['solis battery', 'aegis', '3200 power', 'shield integrity', 'keystone', 'cheese']) {
  if (!corpus.includes(term)) errors.push(`Search corpus is missing required term: ${term}`);
}

const buildInfoPath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Riftborne\\Content\\build_info.json';
if (fs.existsSync(buildInfoPath)) {
  const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, 'utf8'));
  if (buildInfo.PatchVersion !== expectedPatch || buildInfo.GitCommit !== expectedBuild) {
    errors.push(`Installed Riftborne build ${buildInfo.PatchVersion}/${buildInfo.GitCommit} does not match wiki ${expectedPatch}/${expectedBuild}.`);
  }
}

const fixturePath = path.join(root, 'wiki', 'evidence', 'simulator', 'reported-mixed-base-1175.json');
if (!fs.existsSync(fixturePath)) {
  errors.push('Missing deterministic simulator fixture.');
} else {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
  if (fixture.patch !== expectedPatch || fixture.build !== expectedBuild) errors.push('Simulator fixture build does not match the wiki.');
  if (fixture.runsPerMatchup < 200) errors.push('Simulator fixture must use at least 200 runs per matchup.');
  if (!Array.isArray(fixture.results) || fixture.results.length !== 9) errors.push('Simulator fixture must contain all nine culture matchups.');
}

if (errors.length) {
  console.error(`Wiki validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Wiki validation passed: ${articles.length} articles, ${entries.length - articles.length} categories, ${evidenceIds.size} current evidence records, patch ${expectedPatch} build ${expectedBuild}.`);

function strip(value) {
  return String(value ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
