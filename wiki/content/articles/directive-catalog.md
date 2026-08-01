---
title: Complete directive stage catalog
slug: directive-catalog
summary: Every current directive path and stage, with its objective, tracked metric, target, and unlock rule from the installed 11.75 data.
category: Reference
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 104
aliases:
  - all directive stages
  - directive requirements
  - Aegis Vanguard stages
  - Consortium Founder stages
relatedPages:
  - directives
  - controls-and-menu-map
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - current-data-1175
mechanicDependencies: []
---
This catalog transcribes all 110 directive stages from the installed 11.75 data. Internal storage identifiers are translated to current culture-neutral descriptions so the table applies to Astraean, Varkon, and Veil interfaces. [Evidence](#evidence-current-data-1175)

Use the stage title and tracked metric to diagnose progress. A row describes the requirement for that stage; it does not grant the permanent path effect listed in [Directives](/wiki/directives/).

## Signal Cartographer

**Archetype:** Intelligence · **Path key:** `INTEL` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Wake the Listening Posts** | Build Light Shipyard L1 and commission your first Intelligence ship. | Owned building level + owned unit count | LightShipyard>=1; Intelligence ships>=1 | Available at game start |
| 2 | **First Ghost Ping** | Launch your first spy mission. | Spy missions launched | >=1 | Complete previous stage in same path |
| 3 | **Constellation Sweep** | Complete three spy missions against enemy targets. | Spy missions resolved | >=3 total | Complete previous stage in same path |
| 4 | **Pattern Hunter** | Run intel operations against at least two different factions. | Distinct factions targeted by spy ops | >=2 | Complete previous stage in same path |
| 5 | **Threat Atlas** | Collect recent intel on five unique enemy bases. | Unique enemy bases with fresh intel | >=5 in recent window | Complete previous stage in same path |
| 6 | **Silence Breaker** | Accumulate eight successful spy outcomes. | Successful spy outcomes | >=8 lifetime | Complete previous stage in same path |
| 7 | **Eyes Across the Rim** | Launch at least three intel operations within a short campaign window. | Spy launches in rolling window | >=3 within 2h | Complete previous stage in same path |
| 8 | **Hunter of Giants** | Execute operations on 3 top ten empires by power. | Distinct top-10 power empires targeted by spy operations | >=3 empires | Complete previous stage in same path |
| 9 | **Black-Sky Mapping** | Map twelve unique enemy strongholds through intelligence activity. | Unique enemy bases ever scouted | >=12 lifetime | Complete previous stage in same path |
| 10 | **Omniscience Protocol** | Maintain fresh intelligence on ten high-value enemy bases. | High-value bases with fresh intel | >=10 in recent window | Complete previous stage in same path |

## Void Reaver

**Archetype:** Raider · **Path key:** `RAIDER` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Sharpen the Claws** | Assemble a starter raiding wing. | Owned light combat ships | >=10 | Available at game start |
| 2 | **First Blood in the Dark** | Launch your first raid mission. | Raid missions launched | >=1 | Complete previous stage in same path |
| 3 | **Burn-and-Run** | Win three raid engagements. | Raid victories | >=3 | Complete previous stage in same path |
| 4 | **Plunder Circuit** | Steal resources through raids. | Resources stolen via raid outcomes | >=2,500 | Complete previous stage in same path |
| 5 | **Blood Tally** | Destroy enemy ships during raids. | Ships killed in raids | >=100 lifetime | Complete previous stage in same path |
| 6 | **Cross-Faction Predation** | Score successful raids against multiple factions. | Distinct factions successfully raided | >=3 | Complete previous stage in same path |
| 7 | **Relentless Pressure** | Sustain heavy raid activity in one day cycle. | Raid victories in rolling 24h | >=10 | Complete previous stage in same path |
| 8 | **King's Ransom** | Accumulate major raid loot. | Resources stolen via raids | >=500,000 lifetime | Complete previous stage in same path |
| 9 | **Predator's Loop** | Build long-term raid consistency. | Raid victories | >=25 lifetime | Complete previous stage in same path |
| 10 | **Night Emperor** | Prove yourself the ultimate raider through sheer volume of conquest. | Raid victories + resources looted | 100 raid victories; 1,000,000 resources looted, lifetime | Complete previous stage in same path |

## Aegis Vanguard

**Archetype:** Fighter · **Path key:** `FIGHTER` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Form the Vanguard** | Build a frontline battle group. | Owned combat ships | >=25 | Available at game start |
| 2 | **Live Fire** | Win your first direct attack battle. | Attack battle victories | >=1 | Complete previous stage in same path |
| 3 | **Line Breaker** | Win five offensive battles. | Attack battle victories | >=5 | Complete previous stage in same path |
| 4 | **Combined Arms** | Field a mixed doctrine fleet. | Distinct combat unit classes owned | >=4 | Complete previous stage in same path |
| 5 | **Shock Spearhead** | Defeat a fleet that has over 10k power. | Victories over 10k defender power | >=1 | Complete previous stage in same path |
| 6 | **War Rhythm** | Launch repeated strikes in one operation window. | Attack launches in rolling window | >=5 within 60m | Complete previous stage in same path |
| 7 | **Command Presence** | Reach a high military posture. | Power | >=250,000 | Complete previous stage in same path |
| 8 | **Unbroken Advance** | Secure three consecutive attack victories. | Consecutive attack battle wins | >=3 streak | Complete previous stage in same path |
| 9 | **War Banner** | Accumulate sustained combat success. | Attack battle victories | >=20 lifetime | Complete previous stage in same path |
| 10 | **Ascendant Marshal** | Sustain overwhelming fleet power through a full cycle. | Fleet power sustained | >=1,000,000 power for 24h | Complete previous stage in same path |

## Solar Ledger

**Archetype:** Economist · **Path key:** `ECON` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Balance the Grid** | Establish core resource production buildings. | Owned building levels | Extractor>=1; Synthesiser>=1; Combinator>=1; SolarArray>=1 | Available at game start |
| 2 | **Positive Throughput** | Reach early stable income. | Total passive resources per hour | >=1,000 | Complete previous stage in same path |
| 3 | **Capacity Discipline** | Upgrade storage foundations. | Owned building levels | primary resource storage >=10; Astra storage >=10 | Complete previous stage in same path |
| 4 | **Macro Engine** | Scale into midgame macro economy. | Total passive resources per hour | >=10,000 | Complete previous stage in same path |
| 5 | **Volatility Damping** | Keep resources moving instead of letting storage bins cap out. | Storage cap avoidance streak | No resource at max storage for 12h | Complete previous stage in same path |
| 6 | **Compounding Systems** | Reach broad economic infrastructure maturity. | Economy building count at high level | 12 buildings at L10+ | Complete previous stage in same path |
| 7 | **Era Leverage** | Hit late-midgame production velocity. | Total passive resources per hour | >=50,000 | Complete previous stage in same path |
| 8 | **Treasury of Suns** | Maintain large reserves without starvation pressure. | Combined stockpile + starvation checks | Stockpile>=100,000; no starvation for 24h | Complete previous stage in same path |
| 9 | **Post-Scarcity Curve** | Push to ultra-high passive output. | Total passive resources per hour | >=150,000 | Complete previous stage in same path |
| 10 | **Economic Hegemony** | Sustain a dominant passive income stream. | Passive resources per hour sustained | >=250,000 for 8h | Complete previous stage in same path |

## Starlane Broker

**Archetype:** Trader · **Path key:** `TRADER` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Open the Exchange** | Construct Orbital Exchange L1. | Owned building level | OrbitalExchange>=1 | Available at game start |
| 2 | **First Listing** | Post your first marketplace offer. | Marketplace offers posted | >=1 | Complete previous stage in same path |
| 3 | **Ticker Initiate** | Complete five market trades. | Marketplace trade completions | >=5 | Complete previous stage in same path |
| 4 | **Spread Maker** | Maintain multiple active listings. | Concurrent active marketplace offers | >=3 | Complete previous stage in same path |
| 5 | **Route Arbitrage** | Trade across varied resource pairs. | Distinct resource pair combinations traded | >=3 | Complete previous stage in same path |
| 6 | **Market Pulse** | Reach significant market volume. | Marketplace trade volume | >=10,000 | Complete previous stage in same path |
| 7 | **Interstellar Counterparties** | Trade with many separate players. | Distinct counterparties traded with | >=5 | Complete previous stage in same path |
| 8 | **Liquidity Engine** | Complete high-frequency marketplace execution. | Marketplace trade completions | >=25 | Complete previous stage in same path |
| 9 | **Macro Arbitrage** | Scale to major trading operation size. | Marketplace trade volume | >=50,000 | Complete previous stage in same path |
| 10 | **Exchange Apex** | Reach elite lifetime trading volume. | Marketplace trade volume | >=75,000 lifetime | Complete previous stage in same path |

## Consortium Founder

**Archetype:** Business Owner · **Path key:** `BIZ` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **File the Charter** | Create your first organization. | Organizations owned | >=1 | Available at game start |
| 2 | **Issue a Mandate** | Post your first contract. | Contracts posted | >=1 | Complete previous stage in same path |
| 3 | **Contractor Network** | See multiple contracts completed. | Contracts completed | >=3 | Complete previous stage in same path |
| 4 | **Public Confidence** | Execute your first share-market transaction. | Organization share transactions | >=1 | Complete previous stage in same path |
| 5 | **Portfolio Layer** | Operate at least two active contracts at once. | Concurrent active contracts | >=2 | Complete previous stage in same path |
| 6 | **Executive Reach** | Have contracts accepted by many commanders. | Distinct players who accepted contracts | >=4 | Complete previous stage in same path |
| 7 | **Capital Momentum** | Grow organization valuation past a mid-tier target. | Organization valuation | >=5,000 | Complete previous stage in same path |
| 8 | **Board Expansion** | Complete a broad contract book. | Contracts completed | >=10 lifetime | Complete previous stage in same path |
| 9 | **Interstellar Holdings** | Own and operate multiple organizations. | Organizations owned | >=2 | Complete previous stage in same path |
| 10 | **Boardroom Throne** | Sustain elite organization valuation. | Organization valuation sustained | >=15,000 for 8h | Complete previous stage in same path |

## Frontier Ascendant

**Archetype:** Expansionist · **Path key:** `EXPAND` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Spire Backbone** | Raise Central Spire to L10. | Central Spire level | >=10 | Available at game start |
| 2 | **Mining Charter** | Found your first rare metals mining outpost. | Rare metals mining outpost count (not asteroid or strategic outposts) | >=1 | Complete previous stage in same path |
| 3 | **Command Apex** | Raise Central Spire to L20. | Central Spire level | >=20 | Complete previous stage in same path |
| 4 | **Second Horizon** | Colonize your second base. | Owned base count | >=2 | Complete previous stage in same path |
| 5 | **Web of Colonies** | Own five total settlements. | Owned base count (colonies + mining/strategic/asteroid outposts combined) | >=5 | Complete previous stage in same path |
| 6 | **Regional Hegemony** | Grow into a regional empire of eight total settlements. | Owned base count (colonies + mining/strategic/asteroid outposts combined) | >=8 | Complete previous stage in same path |
| 7 | **Imperial Infrastructure** | Reach Central Spire level 20 while holding at least 2 colonies. | Spire level + colony count | Spire>=20; colonies>=2 | Complete previous stage in same path |
| 8 | **Outpost Triad** | Diversify your expansion across every outpost type. | Distinct outpost types founded (Mining + Strategic + Asteroid) | >=3 | Complete previous stage in same path |
| 9 | **Imperial Palace** | Build one colony to Central Spire L25 with every outpost slot filled. | Colony Spire level + founded outpost slots | Spire>=25; 8/8 outpost slots filled | Complete previous stage in same path |
| 10 | **Dominion Ascendant** | Grow a sprawling colonial empire. | Owned colony count (colonies only - not outposts) | >=6 | Complete previous stage in same path |

## Forge Architect

**Archetype:** Industrialist · **Path key:** `INDUSTRY` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Industrial Seed** | Raise core industry buildings to L3. | Owned building levels | Extractor>=3; Synthesiser>=3; Combinator>=3; SolarArray>=3 | Available at game start |
| 2 | **Hardening Program** | Upgrade defense and heavy military fabrication infrastructure. | Owned building levels | IonShield>=3; HeavyShipyard>=3 | Complete previous stage in same path |
| 3 | **Specialization Frame** | Activate your culture-specific industry technology. | Culture-specific building level | Unique industry building >=1 | Complete previous stage in same path |
| 4 | **Foundry Tempo** | Accumulate combined building levels across your empire. | Total building levels empire-wide | >=60 | Complete previous stage in same path |
| 5 | **Vertical Scale** | Reach substantial empire construction depth. | Total building levels empire-wide | >=120 | Complete previous stage in same path |
| 6 | **Systems Core** | Upgrade strategic infrastructure hubs. | Owned building levels | OrbitalExchange>=5; IonShield>=5 | Complete previous stage in same path |
| 7 | **Megastructure Prelude** | Begin Dyson Sphere development. | Dyson Sphere level | >=1 | Complete previous stage in same path |
| 8 | **Factory Constellation** | Push empire-wide build depth further. | Total building levels empire-wide | >=220 | Complete previous stage in same path |
| 9 | **Dyson Surge** | Advance deep into Dyson specialization. | Dyson Sphere level | >=5 | Complete previous stage in same path |
| 10 | **Machine Dominion** | Reach machine-empire production apex. | Total passive resources per hour | >=250,000 | Complete previous stage in same path |

## Bastion Warden

**Archetype:** Defender · **Path key:** `DEFENSE` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Raise the Screen** | Build Ion Shield L1. | Owned building level | IonShield>=1 | Available at game start |
| 2 | **Garrison Protocol** | Maintain an initial home defense force. | Home-base stationed ships | >=25 | Complete previous stage in same path |
| 3 | **First Stand** | Win your first defensive battle. | Defense battle victories | >=1 | Complete previous stage in same path |
| 4 | **No Breach** | Secure repeated defensive wins. | Defense battle victories | >=5 | Complete previous stage in same path |
| 5 | **Mutual Bulwark** | Send reinforcements to support allies. | Reinforcement dispatches to allies | >=3 | Complete previous stage in same path |
| 6 | **Fortress Grid** | Deploy hardened shields across your empire. | Total Ion Shield levels across all bases | >=60 | Complete previous stage in same path |
| 7 | **Attrition Mastery** | Maintain favorable defensive kill efficiency. | Defensive K/D ratio over 24h | >1.0 | Complete previous stage in same path |
| 8 | **Unbroken Wall** | Prevent base losses during sustained pressure. | Base-loss events in rolling window | 0 losses for 48h | Complete previous stage in same path |
| 9 | **Citadel Doctrine** | Accumulate long-term defense victories. | Defense battle victories | >=20 lifetime | Complete previous stage in same path |
| 10 | **Aegis Imperium** | Hold through full-day conflict without losing a colony. | Base-loss events during active conflict | 0 losses for 24h | Complete previous stage in same path |

## Flux Quartermaster

**Archetype:** Logistics · **Path key:** `LOGI` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Supply Spine** | Create your first trade route. | Trade route count | >=1 | Available at game start |
| 2 | **Clockwork Freight** | Keep a route active for a full hour. | Single route active uptime | >=60m | Complete previous stage in same path |
| 3 | **Multi-Lane Traffic** | Operate multiple simultaneous trade routes. | Active trade routes | >=3 | Complete previous stage in same path |
| 4 | **Relief Lift** | Ship 20,000 resources via cargo route. | Cargo-route resources shipped | >=20,000 | Complete previous stage in same path |
| 5 | **Cargo River** | Ship 50,000 resources via cargo route. | Cargo-route resources shipped | >=50,000 | Complete previous stage in same path |
| 6 | **War Pipeline** | Reinforce 2 allied commanders. | Allied reinforcement arrivals | >=2 | Complete previous stage in same path |
| 7 | **Adaptive Routing** | Ship 100,000 resources via cargo route. | Cargo-route resources shipped | >=100,000 | Complete previous stage in same path |
| 8 | **Whole-Empire Scheduling** | Sustain a large active route network. | Active routes total | >=6 | Complete previous stage in same path |
| 9 | **Interstellar Throughput** | Ship 500,000 resources via cargo route. | Cargo-route resources shipped | >=500,000 lifetime | Complete previous stage in same path |
| 10 | **Galactic Backbone** | Run mixed logistics across many colonies. | Bases with active logistics participation | >=8 | Complete previous stage in same path |

## Noctium Artificer

**Archetype:** Augment Specialist · **Path key:** `AUGMENT` · **Stages:** 10

| Stage | Directive | Objective | Tracked metric | Target | Unlock |
|---:|---|---|---|---|---|
| 1 | **Prospector's Oath** | Establish your first rare metals mining outpost. | Rare metals mining outpost count (not asteroid or strategic outposts) | >=1 | Available at game start |
| 2 | **Refiner Spark** | Produce your first refined outpost batch. | Rare-metal or refiner output events | >=1 | Complete previous stage in same path |
| 3 | **Chipwright** | Craft your first SPU augment. | SPUs crafted | >=1 | Complete previous stage in same path |
| 4 | **Loadout Draft** | Equip multiple augments. | Active SPUs equipped | >=3 | Complete previous stage in same path |
| 5 | **A/B Tuning** | Craft stronger-quality SPUs. | Average SPU tier crafted | >=10 | Complete previous stage in same path |
| 6 | **Augment Exchange** | Execute your first SPU market transaction. | SPU market buys or sells | >=1 | Complete previous stage in same path |
| 7 | **Noctium Treasury** | Accumulate a meaningful Noctmarks reserve. | Noctmarks balance or earned total | >=2,500 | Complete previous stage in same path |
| 8 | **Augment Lattice** | Maintain a broad active augmentation setup. | Active SPUs equipped | >=8 | Complete previous stage in same path |
| 9 | **Legendary Craft** | Craft high-tier signature SPUs. | Average SPU tier crafted | >=20 | Complete previous stage in same path |
| 10 | **Apex Combination** | Combine or craft a single SPU at the maximum tier. | SPU tier owned (Tier 8 - the ceiling of the display tier curve) | >=1 SPU at Tier 8 | Complete previous stage in same path |

## Reading culture-specific requirements

The data uses internal building categories for tracking. In the interface, satisfy a storage requirement with the current culture-specific building in that category: Solvault and Heliovex for Astraean, Skarncache and Voltforge for Varkon, or Nyxvault and Gloamwell for Veil. [Evidence](#evidence-current-data-1175)

## Evidence boundary

These rows establish the current data targets. When a live progress display appears not to match a row, capture the path, stage, exact UI text, current progress, world identifier, build, and time before reporting a discrepancy.

