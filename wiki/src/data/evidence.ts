export type EvidenceKind =
  | 'current-client'
  | 'current-ui'
  | 'runtime-audit'
  | 'simulator'
  | 'live-world';

export interface EvidenceRecord {
  id: string;
  title: string;
  kind: EvidenceKind;
  patch: '11.75';
  build: 'a7b5c7c';
  verifiedAt: '2026-07-30';
  ruleset: 'core' | 'live-world' | 'both';
  transcript: string;
  method: string;
  fixture?: string;
}

export const EVIDENCE: Record<string, EvidenceRecord> = {
  'client-build-1175': {
    id: 'client-build-1175',
    title: 'Installed client identity',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'The installed Windows client reports patch 11.75, build a7b5c7c, built 2026-07-30 16:32:01 UTC.',
    method: 'Riftborne.exe --build-info and Content/build_info.json.'
  },
  'building-names-1175': {
    id: 'building-names-1175',
    title: 'Current culture-specific building names',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'The current client maps Astraean storage to Solvault and Heliovex, Varkon storage to Skarncache and Voltforge, and Veil storage to Nyxvault and Gloamwell. Astraean static attack infrastructure is named Solis Battery.',
    method: 'Read-only inspection of BuildingNamingSystem in the installed client.'
  },
  'building-effects-1175': {
    id: 'building-effects-1175',
    title: 'Current building effects',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'The first culture-specific storage building adds capacity for Vulkron, Aurelite, and Deuterium; the second adds Astra capacity. Solis Battery adds flat attack against light and heavy hulls and remains active while standing.',
    method: 'Read-only inspection of BuildingConfig.GetEffects and the current Codex renderer.'
  },
  'storage-screen-1175': {
    id: 'storage-screen-1175',
    title: 'Current Astraean infrastructure screen',
    kind: 'current-ui',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'live-world',
    transcript: 'The live Astraean infrastructure screen identifies Heliovex as Astra storage and displays campaign targets of 2,750 at level 1, 5,000 at level 5, and 100,000 at level 20.',
    method: 'Private player-supplied capture; identifying and strategic information omitted.'
  },
  'current-data-1175': {
    id: 'current-data-1175',
    title: 'Installed 11.75 data tables',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'Directive and SPU tables were read from the same installed 11.75 build. Values are used only where the current table exposes them directly.',
    method: 'Content/Data/directive_paths.csv and Content/Data/spu_bonuses.csv.'
  },
  'runtime-economy-1175': {
    id: 'runtime-economy-1175',
    title: 'Current economy and storage implementation',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'Production, storage capacity, upkeep, hidden-resource, and transmutation behavior is taken from the executable paths used by the running client.',
    method: 'Read-only inspection of BuildingConfig and EconomySystem.'
  },
  'runtime-fleets-1175': {
    id: 'runtime-fleets-1175',
    title: 'Current fleet and movement implementation',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'Fleet role, movement, infrastructure, and roster statements are limited to behavior exposed by the current client implementation and Codex.',
    method: 'Read-only inspection of ShipTravelSpeedSystem, ShipInfrastructureSystem, and Codex ship screens.'
  },
  'runtime-settlement-slots-1175': {
    id: 'runtime-settlement-slots-1175',
    title: 'Current settlement-slot accounting',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'Outpost availability counts only qualifying outposts currently owned and colonization fleets currently pending from the founding colony. A former outpost no longer in that owner’s base list, or one with no remaining building levels, does not occupy a slot.',
    method: 'Read-only inspection of SettlementRules.HasAvailableOutpostSlotForKind, CountFoundedOutpostsFromOrigin, CountPendingOutpostsFromOrigin, and OccupiesSettlementSlot.'
  },
  'runtime-combat-1175': {
    id: 'runtime-combat-1175',
    title: 'Current combat, raid, siege, and espionage implementation',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'Published combat statements are limited to behavior used by the current CombatSystem and the Codex. Power is an estimate rather than a fixed conversion from ship count.',
    method: 'Read-only inspection of CombatSystem and SiegeTargetCatalog.'
  },
  'runtime-objectives-1175': {
    id: 'runtime-objectives-1175',
    title: 'Current objective and victory implementation',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'The current client defines an Origin Wormhole victory at level 100 and a Valor victory at 250,000 faction Valor. Keystones generate Valor through Valor Conduits; current objective sites include Inner, Border, and Outer tiers.',
    method: 'Read-only inspection of SpecialSiteSystem, VictoryConditionTracker, and the victory Codex screen.'
  },
  'combat-matrix-1175': {
    id: 'combat-matrix-1175',
    title: 'Deterministic combat matrix',
    kind: 'simulator',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'core',
    transcript: 'The published matrix uses 200 runs per culture matchup, seed 1175, the reported-mixed-base profile, an attacking force of 15 light fighters, and a defending force of 10 destroyers with level-5 central infrastructure.',
    method: 'Riftborne.exe --battle-sim-auto using the game simulation path.',
    fixture: 'wiki/evidence/simulator/reported-mixed-base-1175.json'
  },
  'live-world-1175': {
    id: 'live-world-1175',
    title: 'Active multiplayer-world boundary',
    kind: 'live-world',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-07-30',
    ruleset: 'live-world',
    transcript: 'The multiplayer operator owns the world seed, pacing, simulation time, factions, global modifiers, and ship roster. World-specific values must therefore be labeled separately from core rules.',
    method: 'Current multiplayer client contract and read-only world/session telemetry.'
  }
};
