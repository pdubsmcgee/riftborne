export const SITE = {
  name: 'Riftborne Wiki',
  description: 'An independent, patch-aware reference for Riftborne mechanics, strategy, and multiplayer.',
  url: 'https://riftbornewiki.317society.com',
  repository: 'https://github.com/pdubsmcgee/riftborne',
  patch: '11.75',
  build: 'a7b5c7c',
  reviewed: '2026-07-30'
};

export const CATEGORIES = [
  { name: 'Getting started', slug: 'getting-started', description: 'Core rules, opening decisions, and the shape of a match.' },
  { name: 'Economy', slug: 'economy', description: 'Resources, storage, upkeep, production, mining, and SPUs.' },
  { name: 'Expansion and buildings', slug: 'expansion-buildings', description: 'Territory, colonies, outposts, structures, and base roles.' },
  { name: 'Cultures', slug: 'cultures', description: 'Astraean, Varkon, and Veil mechanics and identities.' },
  { name: 'Ships and fleets', slug: 'ships-fleets', description: 'Hull roles, composition, movement, and fleet power.' },
  { name: 'Warfare and intelligence', slug: 'warfare-intelligence', description: 'Combat, raids, shields, siege, and espionage.' },
  { name: 'Objectives', slug: 'objectives', description: 'Origin, Keystones, Visions, and campaign victory.' },
  { name: 'Multiplayer', slug: 'multiplayer', description: 'Organizations, markets, diplomacy, logistics, and coordination.' },
  { name: 'Strategy', slug: 'strategy', description: 'Clearly labeled analysis, advanced tactics, and edge cases.' },
  { name: 'Reference', slug: 'reference', description: 'Formulas, directives, terminology, sources, and patch notes.' }
] as const;

export const LEGACY_ROUTES: Record<string, string> = {
  'field-manual': '/',
  'the-one-page-version': '/wiki/riftborne-overview/',
  'what-a-match-is-really-about': '/wiki/match-structure/',
  'first-login-a-safe-opening': '/wiki/opening-priorities/',
  'economy-four-resources-and-one-invisible-clock': '/wiki/resources/',
  'expansion-and-geography': '/wiki/expansion-and-geography/',
  'buildings-and-base-roles': '/wiki/buildings-and-base-roles/',
  cultures: '/category/cultures/',
  'ships-fleets-and-travel': '/wiki/ships-fleets-and-travel/',
  'combat-without-the-fog-machine': '/wiki/combat-power/',
  'raids-shields-siege-and-spies': '/category/warfare-intelligence/',
  'rare-metals-mining-outposts-noctmarks-and-spus': '/wiki/rare-metals-and-spus/',
  'objectives-and-the-late-game': '/wiki/objectives-and-victory/',
  'markets-organizations-contracts-and-diplomacy': '/wiki/markets-organizations-and-diplomacy/',
  directives: '/wiki/directives/',
  'how-to-win-official-multiplayer': '/strategy/official-multiplayer/',
  'hidden-mechanics-cheese-and-meta-play': '/strategy/advanced-tactics-and-edge-cases/',
  'common-ways-strong-empires-lose': '/strategy/common-failures/',
  'a-recurring-command-checklist': '/strategy/command-checklist/',
  'sources-and-confidence': '/wiki/sources-and-confidence/'
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function articlePath(article: { slug: string; pageType: string }) {
  return `/${article.pageType === 'strategy' ? 'strategy' : 'wiki'}/${article.slug}/`;
}

export function categorySlug(name: string) {
  return CATEGORIES.find((category) => category.name === name)?.slug ?? slugify(name);
}
