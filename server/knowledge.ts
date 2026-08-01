import type { Store } from './db.js';

const retrievedAt = '2026-07-20T00:00:00.000Z';

const sources = [
  { id: 'official-guide-2026-01', title: 'Riftborne Sovereigns Gameplay Guide', url: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4301130/manuals/ba1549a453f026cc7a8cf3247e19af87c8d91b37/RiftborneSovereigns_GameplayGuide.pdf', authority: 80, publishedAt: '2026-01-02', retrievedAt, version: '2026-01-02', notes: 'Official baseline; later patches take precedence.' },
  { id: 'steam-store', title: 'Riftborne on Steam', url: 'https://store.steampowered.com/app/4301130/Riftborne/', authority: 90, publishedAt: '2026-03-27', retrievedAt, version: '11.72', notes: 'Official product description and current feature inventory.' },
  { id: 'itch-release', title: 'Riftborne on Itch.io', url: 'https://riftborne.itch.io/riftborne', authority: 90, publishedAt: '2026-04-10', retrievedAt, version: '11.72', notes: 'Official release files and developer posts.' },
  { id: 'patch-colonies-2026-04', title: 'Stability Updates and New Colony Progression', url: 'https://riftborne.itch.io/riftborne/devlog/1503071/stability-updates-and-new-colony-progression', authority: 95, publishedAt: '2026-04-28', retrievedAt, version: '10.x', notes: 'Official progression rework.' },
  { id: 'steam-community-2026-06', title: 'Riftborne Steam Community and Patch Notes', url: 'https://steamcommunity.com/app/4301130', authority: 85, publishedAt: '2026-06-26', retrievedAt, version: '11.46', notes: 'Official patch notes mixed with community content.' },
  { id: 'local-game-install-11-75', title: 'Local Riftborne 11.75 runtime audit', url: 'local:C:/Program Files (x86)/Steam/steamapps/common/Riftborne', authority: 100, publishedAt: '2026-07-30', retrievedAt: '2026-07-30T00:00:00.000Z', version: '11.75', notes: 'Current client build a7b5c7c, runtime systems, Codex renderers, and current data tables.' }
];

type SeedFact = { sourceId: string; topic: string; title: string; body: string; version?: string; authority?: number; confidence?: number; effectiveAt?: string; superseded?: boolean };

const guideFacts: SeedFact[] = [
  ['overview','Core loop','Build an economy and storage, train fleets, raid or attack rivals, expand through colonies and outposts, scale through logistics and markets, support faction goals, and contest the Core Nexus.'],
  ['cultures','Astraean','Stable energy and economy scaling with tools for hiding resources.'],
  ['cultures','Varkon','Industrial tempo, cheaper pressure, upkeep reduction, and conscription tools.'],
  ['cultures','Veil','Earns shards from combat and uses Eldritch upgrades and fast transmutation.'],
  ['time','Simulation time','Actions schedule future events and passive production advances in whole-second simulation steps. Timers and exact offline behavior must be checked against the current multiplayer version.'],
  ['map','Toroidal galaxy','The galaxy uses integer coordinates and wraps at its edges. Travel uses the shortest wrapped Euclidean distance.'],
  ['map','Core Nexus','The central zone around coordinate 0,0 is the principal endgame battleground and grants strong economy and defense modifiers.'],
  ['map','Terrain bonuses','Asteroid fields favor Vulkron and Aurelite; nebulas favor Deuterium; Terran worlds give balanced production; crystal belts favor Aurelite; gas giants favor Deuterium and Astra; solar harvests and energy spires favor Astra; black holes penalize production and defense.'],
  ['resources','Core resources','Vulkron, Aurelite, Deuterium, and Astra form the main economy. Passive production is storage-capped, while deliveries, loot, trade routes, and market transfers may exceed caps.'],
  ['resources','Rare resources','Mining sites can yield Echorite, Prismalloy, Xenocite, Vantium, Radianite, and Noctium. Noctium can mint Noctmarks for the SPU market.'],
  ['economy','Astra upkeep','Stationed ships consume Astra. Starved garrisons can lose ships, beginning with cheaper hulls, so supply safety is a strategic constraint.'],
  ['buildings','Production buildings','Extractor, Synthesiser, Combinator, and Solar Array add to Vulkron, Aurelite, Deuterium, and Astra multipliers respectively.'],
  ['buildings','Culture-specific capacity','Solvault and Heliovex serve Astraean capacity; Skarncache and Voltforge serve Varkon; Nyxvault and Gloamwell serve Veil. The first building covers Vulkron, Aurelite, and Deuterium; the second covers Astra.'],
  ['buildings','Orbital Exchange','Supports market offers, friendly resource shipments, trade routes, merchant runs, and the SPU market.'],
  ['ships','Fleet speed','Fleet speed is controlled by the slowest ship. Cargo determines raid carrying capacity, Intelligence hulls perform spy missions, and Siege hulls damage buildings during attacks.'],
  ['ships','Carrier aura','Carriers improve the stats of other ships in their fleet. They do not receive their own aura.'],
  ['fleets','Mission types','Reinforce stations ships at the target, Spy gathers intelligence, Raid uses reduced-casualty combat and takes cargo-limited loot, Attack forces decisive combat and can apply siege damage, and Colonise establishes a valid base or outpost.'],
  ['combat','Raid versus attack','Raids are softer engagements aimed at loot. Attacks are hard engagements that can destroy defenses and building levels when siege ships survive.'],
  ['espionage','Intelligence fleets','Spy missions use Intelligence ships only. Survivors generate intel after skirmishing with defending spies.'],
  ['logistics','Supply lines','Trade routes, direct shipments, cargo routes, and fleet positioning let specialized bases support one another. Route exposure and slowest-hull speed affect risk.'],
  ['spu','SPU production','Rare-metal mining outposts craft SPU augmentation chips and periodically deliver them. The current combination and tier rules should follow later patch notes.'],
  ['factions','Diplomacy matters','Faction relations gate hostile missions and affect reinforcement sentiment, wars, contracts, and shared strategic pressure.'],
  ['victory','Long-game objective','Economic growth and faction power feed an endgame centered on control and conflict around the Core Nexus. Confirm the current world victory state from telemetry.'],
  ['controls','Core shortcuts','The terminal HUD uses W/S or arrows to navigate, Enter to confirm, Esc or Z to return, M for the map, C for the Codex, R for rankings, and number keys for major empire and military screens.']
].map(([topic,title,body]) => ({ sourceId: 'official-guide-2026-01', topic, title, body, version: '2026-01-02', authority: 80, confidence: 0.8, effectiveAt: '2026-01-02', superseded: false }));

const patchFacts: SeedFact[] = [
  { sourceId: 'patch-colonies-2026-04', topic: 'expansion', title: 'Outpost roles', body: 'Strategic outposts are five-slot forward positions; asteroid outposts specialize in one resource; rare-metal outposts mint Noctmarks and craft SPUs; full colonies receive the complete building system.', version: '10.x', authority: 95, confidence: 0.96, effectiveAt: '2026-04-28' },
  { sourceId: 'patch-colonies-2026-04', topic: 'map', title: 'Modern starting terrain', body: 'Players spawn on Terran World tiles. Empty space produces nothing by default and contains resource-specialized asteroids; black holes are rarer and more evenly distributed.', version: '10.x', authority: 95, confidence: 0.96, effectiveAt: '2026-04-28' },
  { sourceId: 'patch-colonies-2026-04', topic: 'spu', title: 'Modern SPU tiers', body: 'SPUs combine two at a time with square-root scaling, require Noctmarks to combine, and progress from Tier I through Tier X and beyond.', version: '10.x', authority: 95, confidence: 0.96, effectiveAt: '2026-04-28' },
  { sourceId: 'steam-community-2026-06', topic: 'automation', title: 'Construction queues', body: 'Automatic construction queues support cancellation, reordering, and reusable presets. Planned construction spends resources when construction begins, not when first planned.', version: '11.x', authority: 85, confidence: 0.9, effectiveAt: '2026-06-26' },
  { sourceId: 'steam-community-2026-06', topic: 'map', title: 'Configurable map markers', body: 'Detailed map markers and selected-tile highlighting are configurable through the in-game Codex settings.', version: '11.46', authority: 85, confidence: 0.9, effectiveAt: '2026-06-26' },
  { sourceId: 'steam-community-2026-06', topic: 'logistics', title: 'Modern route controls', body: 'Cargo-route amounts may be raw values or percentages, route capacity can be overdesignated with warnings, and raid routes linked to presets follow later preset edits.', version: '11.x', authority: 85, confidence: 0.88, effectiveAt: '2026-06-26' },
  { sourceId: 'itch-release', topic: 'overview', title: 'Current release', body: 'The Windows and Linux release is version 11.72 as of July 2026. Runs are designed to unfold over weeks or months.', version: '11.72', authority: 90, confidence: 0.95, effectiveAt: '2026-07-18' }
];

const localInstallFacts: SeedFact[] = [
  { sourceId: 'local-game-install-11-75', topic: 'overview', title: 'Installed game version', body: 'The local Steam install reports Riftborne patch 11.75, build a7b5c7c, built July 30, 2026 UTC.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'victory', title: 'Current victory paths', body: 'Current campaign victory has an Origin Wormhole path at level 100 and a faction Valor path at 250,000 Valor generated from Keystone Valor Conduits.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'buildings', title: 'Current capacity names', body: 'Astraean uses Solvault and Heliovex, Varkon uses Skarncache and Voltforge, and Veil uses Nyxvault and Gloamwell for resource capacity.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'buildings', title: 'Solis Battery', body: 'Solis Battery is Astraean static attack infrastructure against light and heavy hulls.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'economy', title: 'Astra starvation rule', body: 'Stationed ships consume Astra hourly. If a colony runs out of Astra, parked ships can be lost, making Astra safety a first-order fleet constraint.', version: '11.75', authority: 100, confidence: 0.98, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'fleets', title: 'Fleet movement and defense basics', body: 'Fleet movement follows the current roster and infrastructure modifiers. Only stationed or garrison ships defend a colony; hangared ships do not.', version: '11.75', authority: 100, confidence: 0.98, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'directives', title: 'Directive paths are parallel', body: 'The current directive table defines multiple parallel guidance and progression paths.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' },
  { sourceId: 'local-game-install-11-75', topic: 'spu', title: 'SPU bonus data availability', body: 'The current install includes SPU bonus mappings for ship, economy, base, fleet, and intelligence effects.', version: '11.75', authority: 100, confidence: 1, effectiveAt: '2026-07-30' }
];

export function seedKnowledge(store: Store) {
  for (const source of sources) store.addSource(source);
  for (const fact of localInstallFacts) {
    store.addFact({
      sourceId: fact.sourceId, topic: fact.topic, title: fact.title, body: fact.body,
      version: fact.version ?? 'unknown', authority: fact.authority ?? 50,
      confidence: fact.confidence ?? 0.7, effectiveAt: fact.effectiveAt ?? retrievedAt,
      superseded: fact.superseded ?? false
    });
  }
}
