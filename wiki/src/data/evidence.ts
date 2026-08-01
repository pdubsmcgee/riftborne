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
  verifiedAt: string;
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
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'The installed Windows client reports patch 11.75, build a7b5c7c, built 2026-07-31 15:16:13 UTC.',
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
  'spu-stacking-1175': {
    id: 'spu-stacking-1175',
    title: 'SPU identity, magnitude, and stacking rules',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'A valid non-errored SPU contributes its per-unit bonus multiplied by stack count. Contributions targeting the same statistic are added. Invalid, errored, unknown, empty, and zero-count stacks contribute nothing. Without an explicit override, per-unit bonus is 0.1 percent times the average of Drill and Refiner levels.',
    method: 'Read-only inspection of SpuStack.BonusPercentPerUnit and SpuAugmentSystem.ComputeTotals, cross-checked against Content/Data/spu_bonuses.csv.'
  },
  'building-catalog-1175': {
    id: 'building-catalog-1175',
    title: 'Building limits and level tables',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'Standard structures use level 20 unless explicitly specialized. Central infrastructure reaches 25, flagship research 5, hangar 10, origin-wormhole and Keystone-vision objectives 100, and Dyson Sphere 200. Current level tables define resource costs and build times independently by structure.',
    method: 'Read-only inspection of BuildingConfig initialization and generated level tables.'
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
  'runtime-organizations-1175': {
    id: 'runtime-organizations-1175',
    title: 'Current organization domain and accounting surfaces',
    kind: 'current-client',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'The current client contains organization identity and ownership records, shareholder and share-market snapshots, capital history, parent/subsidiary relationships, contracts, loans, defaults, credit ratings, dividends, buybacks, earnings, catalysts, and reinvestment surfaces. This inventory establishes that the systems exist; it does not establish formulas or live values.',
    method: 'Read-only type and member inventory of OrganizationSystem, OrganizationStatsSystem, CreditRatingSystem, and organization domain records in the installed client.'
  },
  'organization-valuation-1175': {
    id: 'organization-valuation-1175',
    title: 'Organization valuation and ownership formulas',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'Fair value per share combines balance value, profitable seven-day income, backlog, reinvestment, holdings, interest and dividend flows, dilution, concentration, liquidity, defaults, and a bounded macro multiplier. Outstanding shares exclude treasury shares. Control resolves to the largest effective ownership stake, with current owner and then founder winning an exact tie.',
    method: 'Read-only inspection of OrganizationStatsSystem.ComputeFairValuePerShare, OutstandingShares, ComputeShareholderSnapshots, and OrganizationSystem.ResolveControllingPlayerId.'
  },
  'organization-capital-actions-1175': {
    id: 'organization-capital-actions-1175',
    title: 'Organization shares, buybacks, and dividends',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'Sell orders reserve existing shares; bids escrow Noctmarks. Treasury issuance lists treasury-backed shares without increasing issued shares, while follow-on funding increases authorized, issued, and treasury shares before listing them. Buyback budgets are escrowed from treasury and completed purchases become treasury shares. Scheduled dividends pay whole-Noctmark amounts to current player and organization holders and skip an interval when treasury cannot cover the complete payout.',
    method: 'Read-only inspection of OrganizationSystem share-order, issuance, follow-on-funding, buyback, matching, cancellation, and scheduled-dividend methods.'
  },
  'organization-credit-1175': {
    id: 'organization-credit-1175',
    title: 'Organization loan and credit-rating rules',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'Loan terms use one-to-seven-day durations and daily simple interest equal to the ceiling of outstanding principal times the daily percentage. Interest is collected daily; a missed interest payment or unpaid maturity defaults immediately and seizes available borrower funds. Credit score starts at 74 and is adjusted by bounded activity, repayment history, active debt, and defaults in the preceding 30 days.',
    method: 'Read-only inspection of OrganizationSystem loan lifecycle methods and CreditRatingSystem score and event methods.'
  },
  'organization-contracts-1175': {
    id: 'organization-contracts-1175',
    title: 'Organization contract lifecycle',
    kind: 'runtime-audit',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'core',
    transcript: 'A controlling player posts a validated contract against another player. The payout leaves treasury immediately for escrow. A different player may accept it for personal or controlled-organization settlement. Cancellation returns remaining escrow to the posting organization. Current objective types enforce their own target and minimum-quantity rules.',
    method: 'Read-only inspection of OrganizationSystem contract posting, validation, acceptance, completion, and cancellation methods.'
  },
  'organization-ui-1175': {
    id: 'organization-ui-1175',
    title: 'Current organization and finance screens',
    kind: 'current-ui',
    patch: '11.75',
    build: 'a7b5c7c',
    verifiedAt: '2026-08-01',
    ruleset: 'live-world',
    transcript: 'The current CLI exposes organization hub, owner, summary, shareholder, share-market, capital-history, global-loan, lender, borrower, repayment, loan-book, and contract screens. Exact labels, permissions, formulas, balances, and confirmation behavior remain live-state observations until captured from the active screen.',
    method: 'Read-only inventory of the installed CLI HUD screen types; no player account or strategic state captured.'
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
