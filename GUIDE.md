# The Riftborne Field Manual

> Generated from the canonical Riftborne Wiki article collection. Edit the individual files in `wiki/content/articles/`, then run `npm run guide:generate`.

This reference targets **Riftborne patch 11.75**, build `a7b5c7c`. Confirmed mechanics cite current-client evidence; live-world observations and strategy are labeled separately.

## Getting started

### Riftborne overview

Canonical page: [/wiki/riftborne-overview/](https://riftbornewiki.317society.com/wiki/riftborne-overview/)

Riftborne is a real-time 4X strategy game in which economies are converted into territory, fleets, intelligence, and campaign objectives. [Evidence](#evidence-client-build-1175)

Riftborne is a real-time, terminal-based 4X game. Four resources are converted into buildings, ships, intelligence, territory, and campaign objectives. Multiplayer emphasizes logistics, intelligence, and coordination rather than rapid input. World size, faction count, pacing, and roster are operator-controlled values and must be read from the active world. [Evidence](#evidence-live-world-1175)

Ten foundational rules summarize the game:

1. **Full storage is stopped production.** Spend or expand storage before capping.
2. **Astra runway matters.** A colony that cannot support its stationed fleet risks attrition; use the live trend rather than an old timing constant.
3. **Culture-specific central infrastructure controls tempo and expansion.** Read the active construction screen for the current milestones.
4. **Only stationed ships defend.** Hangared ships do not.
5. **The slowest ship sets fleet speed.** Do not drag siege or colony hulls through a fast-response fleet.
6. **Spy before committing.** Public maps do not show the real garrison or live enemy objective progress.
7. **Raid for money; attack for removal.** Only an Attack with surviving siege can destroy building levels.
8. **Cargo is part of raid power.** A military win with no carrying capacity is an economic loss.
9. **Give each base a role.** Production, logistics, defense, and launch positions have different infrastructure needs.
10. **Multiplayer is a team game.** The winning resource is often a faction mate who answers messages and can reinforce on time.

### Match structure and victory conditions

Canonical page: [/wiki/match-structure/](https://riftbornewiki.317society.com/wiki/match-structure/)

A Riftborne match is governed by tempo: the rate at which an empire converts production, movement, and information into useful options. [Evidence](#evidence-client-build-1175)

Patch 11.75 presents two standard victory tracks:

- **Origin Wormhole:** hold the Origin at `(0,0)` and raise its culture-specific Wormhole to level 100.
- **Valor:** generate 250,000 faction Valor through Valor Conduits on controlled Keystones.

The active multiplayer operator owns world settings and may change campaign parameters, so the live victory panel is authoritative. [Evidence](#evidence-runtime-objectives-1175)

Between those objectives, good play means maintaining capacity headroom, protecting Astra-supported garrisons, keeping useful queues active, shortening response paths, and refreshing intelligence before committing a fleet.

### Opening a campaign

Canonical page: [/wiki/first-login-a-safe-opening/](https://riftbornewiki.317society.com/wiki/first-login-a-safe-opening/)

The opening phase establishes an empire’s production schedule, defensive safety, and first expansion route. [Evidence](#evidence-runtime-economy-1175)

Begin by reading the home colony’s four current amounts, individual caps, and hourly trends. The exact starting levels and stockpile are campaign settings, so this wiki does not assume a universal opening inventory. [Evidence](#evidence-live-world-1175)

Queue only what the displayed stockpile can support, check when each resource will cap, and choose the first expansion route from visible geography rather than a fixed build order.

### Opening priorities

Canonical page: [/wiki/opening-priorities/](https://riftbornewiki.317society.com/wiki/opening-priorities/)

Opening priorities are the early investments that prevent capped production, Astra failure, and directionless construction. [Evidence](#evidence-client-build-1175)

1. Queue culture-specific central infrastructure with a deliberate unlock in mind.
2. Add resource production and enough storage that the next login will not find capped stores.
3. Stabilize Astra before training a meaningful garrison.
4. Scout the local ring and measure routes, including wrapped map edges.
5. Decide whether the first outpost is economic, positional, or rare-metal focused.
6. Build the shipyard family that supports the selected base role.
7. Inform the faction of the empire’s location, active period, and intended role.

Three strategic shapes are coherent, but their exact build order depends on the active campaign:

- **Macro/outpost:** pursue the next verified expansion unlock, then support the new site with capacity and a defensible route.
- **Raid tempo:** prioritize the displayed shipyard prerequisites, intelligence, cargo-capable fleets, and replacement income.
- **Fortress/core:** preserve Astra runway, add the culture-specific defensive structure, and keep reinforcement travel short.

The bad opening is not a specific build order. It is buying whatever happens to be affordable without deciding what the base is becoming.

## Economy

### Resources

Canonical page: [/wiki/resources/](https://riftbornewiki.317society.com/wiki/resources/)

Riftborne tracks four colony resources: Vulkron, Aurelite, Deuterium, and Astra. Each resource has its own current amount, capacity, and hourly trend. [Evidence](#evidence-runtime-economy-1175)

## Production buildings

| Resource | Production building |
|---|---|
| Vulkron | Extractor |
| Aurelite | Synthesiser |
| Deuterium | Combinator |
| Astra | Solar Array |

The live interface reports all four resources together. Capacity is not a shared warehouse total: each resource has an independent cap. Production values and modifiers may differ by campaign, so the base preview is authoritative for the active world. [Evidence](#evidence-live-world-1175)

## Capacity buildings

| Culture | Vulkron, Aurelite, and Deuterium | Astra |
|---|---|---|
| Astraean | Solvault | Heliovex |
| Varkon | Skarncache | Voltforge |
| Veil | Nyxvault | Gloamwell |

The first building in each row supplies capacity to the first three resources. The second supplies Astra capacity. [Evidence](#evidence-building-effects-1175)

## Practical reading

A capped resource cannot receive further passive production. Before leaving a colony unattended, compare its current amount, cap, and hourly trend with the next expected login. Transfers and spending decisions should use the figures displayed for that colony rather than a wiki-wide assumed production rate.

### The storage rule

Canonical page: [/wiki/the-storage-rule/](https://riftbornewiki.317society.com/wiki/the-storage-rule/)

Storage determines how long a colony can continue producing before a resource reaches its individual cap. [Evidence](#evidence-runtime-economy-1175)

For Astraean colonies, Solvault supplies Vulkron, Aurelite, and Deuterium capacity, while Heliovex supplies Astra capacity. The corresponding Varkon buildings are Skarncache and Voltforge; the Veil buildings are Nyxvault and Gloamwell. [Evidence](#evidence-building-names-1175)

The captured live-world Heliovex entry reports Astra targets of 2,750 at level 1, 5,000 at level 5, and 100,000 at level 20. These are campaign values, not universal constants; consult the active colony detail before calculating an upgrade. [Evidence](#evidence-storage-screen-1175)

Treat capacity as a scheduling tool:

- Upgrade when production would cap before the next scheduled login.
- Move or market surpluses when another colony can use them.
- At objective sites, keep both culture-specific capacity buildings aligned when the objective detail says its next level is gated by the lower capacity level.

### Astra upkeep and starvation

Canonical page: [/wiki/astra-upkeep-and-starvation/](https://riftbornewiki.317society.com/wiki/astra-upkeep-and-starvation/)

Astra supports construction and stationed fleets. A colony whose stationed upkeep exceeds its Astra supply can begin losing garrisoned ships. [Evidence](#evidence-runtime-economy-1175)

The safe operating rule is to use the live hourly trend: estimate the runway from current Astra and the displayed net drain, then include incoming or departing reinforcements before relying on that colony.

Upkeep modifiers and starvation timing can vary with the current roster, structures, SPUs, and world settings. This wiki therefore does not publish a universal loss interval. Confirm the destination’s Astra runway before reinforcing an ally. [Evidence](#evidence-live-world-1175)

### Production scaling caveat

Canonical page: [/wiki/production-scaling-caveat/](https://riftbornewiki.317society.com/wiki/production-scaling-caveat/)

Resource-building increments are campaign inputs. The current executable applies the configured increment to the matching production building, but a wiki-wide coefficient would be wrong for worlds that change that setting. [Evidence](#evidence-runtime-economy-1175)

Use the active colony preview for current hourly production and the projected change shown for an upgrade. Comparisons between worlds must state the campaign settings used.

### Rare metals, mining outposts, Noctmarks, and SPUs

Canonical page: [/wiki/rare-metals-and-spus/](https://riftbornewiki.317society.com/wiki/rare-metals-and-spus/)

Rare-metal sites produce materials used by the SPU system. The current 11.75 data table exposes SPU targets including ship classes, economy, capacity, travel, cargo, siege, tracking, evasion, upkeep, research, and intelligence. [Evidence](#evidence-current-data-1175)

Exact mining chances, delivery timing, recipes, and installed bonuses should be read from the active site and SPU screens. They can depend on the campaign and current augmentation, so this wiki does not publish a universal crafting schedule.

For planning, compare an SPU’s displayed marginal effect with the fleet or colony that will actually use it; a high-tier bonus on an inactive system creates no immediate tempo.

## Expansion and buildings

### Expansion and geography

Canonical page: [/wiki/expansion-and-geography/](https://riftbornewiki.317society.com/wiki/expansion-and-geography/)

Expansion converts current infrastructure prerequisites and colonization hulls into additional territory on a wrapped galaxy map. [Evidence](#evidence-runtime-fleets-1175)

The construction and colonization screens are authoritative for the active campaign’s unlocks, valid destination, slot type, cost, and travel time. Do not apply a milestone table from another world.

## Losing an outpost

An outpost slot is current capacity, not a lifetime expenditure. The game counts qualifying outposts still owned by the player plus colonization fleets pending from the founding colony. If an outpost is lost to another player, it leaves the former owner’s count and that founding colony can use the slot again. An outpost with no remaining building levels also stops occupying a slot. [Evidence](#evidence-runtime-settlement-slots-1175)

The slot belongs to its founding colony. Losing that colony does not transfer its unlocked capacity to another colony, and a replacement launch still needs a valid unlocked slot at the chosen origin.

Because the map wraps, visual edge distance can be misleading. Evaluate an expansion by actual travel time, reinforcement access, resource effect, and exposure to hostile launch colonies.

### Buildings and base roles

Canonical page: [/wiki/buildings-and-base-roles/](https://riftbornewiki.317society.com/wiki/buildings-and-base-roles/)

Buildings determine a colony’s production, capacity, logistics, military output, and defensive role. [Evidence](#evidence-building-effects-1175)

Current building names are culture-specific. A role should therefore be identified by its displayed effect, not by carrying terminology from another culture into the article.

Additional copies and maximum levels are not uniform across every structure. The construction screen states whether another copy is available and what prerequisite unlocks it. Use that screen for the active campaign rather than assuming that all structures share one cap.

Specialization remains a strategic choice: production colonies protect continuous output, shipbuilding colonies protect queues and Astra, logistics colonies shorten supply paths, and fortified colonies combine stationed ships with current defensive infrastructure.

### Key structures

Canonical page: [/wiki/key-structures/](https://riftbornewiki.317society.com/wiki/key-structures/)

Key structures provide the economic, military, capacity, logistics, and defensive effects used by specialized colonies. [Evidence](#evidence-building-effects-1175)

- **Extractor / Synthesiser / Combinator / Solar Array:** production for Vulkron, Aurelite, Deuterium, and Astra.
- **Solvault / Skarncache / Nyxvault:** capacity for Vulkron, Aurelite, and Deuterium.
- **Heliovex / Voltforge / Gloamwell:** capacity for Astra.
- **Solar Slipway / Clawdock / Nocturnal Slipway:** intelligence and light-hull construction.
- **Auric Drydock / Warfoundry / Umbral Drydock:** heavy-hull construction.
- **Helion Bombard / Breach Forge / Rift Ruinery:** bomber and siege-hull construction.
- **Solis Aegis / Kraghwall / Duskshroud:** culture-specific defensive infrastructure.
- **Solis Battery / Warbattery / Duskbattery:** static attack against light and heavy hulls.
- **Astergate / Warcross / Whisperway:** logistics and market infrastructure.
- **Nano Storage:** reduces resources exposed to hostile looting.

Exact effects are shown by the current Codex and may depend on culture or campaign configuration. The wiki does not transfer a value from one culture’s building to another merely because the structures fill similar roles.

Useful colony roles include:

- **Economic engine:** matching production and capacity with a low unnecessary garrison.
- **Military forge:** shipbuilding infrastructure, Astra, and uninterrupted inputs.
- **Launch hub:** shipbuilding, logistics infrastructure, and a protected route network.
- **Fortress:** defensive infrastructure, Nano Storage, stationed defenders, and nearby response.
- **Objective node:** capacity gates, Astra, defense, and faction reinforcement.

## Cultures

### Cultures

Canonical page: [/wiki/cultures/](https://riftbornewiki.317society.com/wiki/cultures/)

Cultures is part of Riftborne’s cultures system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

This overview groups the focused articles associated with cultures.

### Astraean: compound interest with a shield

Canonical page: [/wiki/astraean/](https://riftbornewiki.317society.com/wiki/astraean/)

Astraean’s current infrastructure includes Sunspire, Solvault, Heliovex, Astergate, Solis Aegis, Solis Battery, Solar Slipway, Auric Drydock, and Helion Bombard. [Evidence](#evidence-building-names-1175)

Astraean strategy favors protected production clusters and deliberate reinforcement. Culture and ship modifiers can vary with the active roster and campaign, so exact discounts, speeds, and combat values belong to the current Codex rather than a universal table. [Evidence](#evidence-live-world-1175)

### Varkon: choose the hour of violence

Canonical page: [/wiki/varkon/](https://riftbornewiki.317society.com/wiki/varkon/)

Varkon is an offensive culture whose current infrastructure includes Warspire, Skarncache, Voltforge, Kraghwall, Warbattery, Clawdock, Warfoundry, and Breach Forge. [Evidence](#evidence-building-names-1175)

Its practical strength is concentrated force: assemble a fleet for a defined target, confirm travel and return exposure, and coordinate the launch window with allies. Numerical culture modifiers and ship values must be read from the active Codex because multiplayer worlds can use a customized roster. [Evidence](#evidence-live-world-1175)

### Veil: asymmetry as an economy

Canonical page: [/wiki/veil/](https://riftbornewiki.317society.com/wiki/veil/)

Veil’s current infrastructure includes Nightspire, Nyxvault, Gloamwell, Whisperway, Duskshroud, Duskbattery, Nocturnal Slipway, Umbral Drydock, and Rift Ruinery. [Evidence](#evidence-building-names-1175)

Veil strategy favors asymmetric launch positions, concealed intentions, and selective fights. Exact culture bonuses, Eldritch upgrade costs, and roster values are world-sensitive and must be read from the active Codex before committing resources. [Evidence](#evidence-live-world-1175)

## Ships and fleets

### Ships, fleets, and travel

Canonical page: [/wiki/ships-fleets-and-travel/](https://riftbornewiki.317society.com/wiki/ships-fleets-and-travel/)

Fleets combine specialized hull families, while their travel time is determined by wrapped distance and the slowest participating ship. [Evidence](#evidence-client-build-1175)

The current client distinguishes Intelligence, Light, Heavy, Carrier, Siege, Colonization, and Flagship roles. The active roster supplies each hull’s cost, speed, cargo, upkeep, and combat profile; multiplayer worlds may replace those values. [Evidence](#evidence-runtime-fleets-1175)

A fleet travels at the pace produced by its participating hulls and active modifiers. The launch preview is authoritative for the chosen origin, destination, mission, and world. Keep slow-purpose hulls out of reaction fleets unless their effect is needed at the destination. [Evidence](#evidence-live-world-1175)

Training capacity and unlocks are shown by the current culture-specific shipyard screens. Do not infer lane counts, discounts, or timing from another campaign.

### Fleet composition

Canonical page: [/wiki/fleet-composition/](https://riftbornewiki.317society.com/wiki/fleet-composition/)

Fleet composition balances screening, line combat, cargo, siege, carrier support, and mission-specific speed. [Evidence](#evidence-client-build-1175)

A practical force has:

- a light screen/tracking component;
- a heavy line that matches the target;
- enough cargo for the mission;
- siege only when structural damage is intended;
- carriers only when their aggregate aura justifies hull slots and cost;
- current intelligence.

Never merge the colony ship, siege train, cargo train, and reaction fleet merely because the interface permits it. Their slowest hull and different objectives make the combined fleet worse at every job.

### Fleet power

Canonical page: [/wiki/fleet-power/](https://riftbornewiki.317society.com/wiki/fleet-power/)

Fleet power is a context-sensitive preview rather than a fixed conversion from headcount. [Evidence](#evidence-runtime-combat-1175)

A displayed value such as **3,200 power has no universal ship count**. It can describe materially different fleets because hull lines, culture, roster settings, infrastructure, directives, SPUs, tactics, mission type, and the opposing composition all affect the estimate.

Use the in-game combat simulator with the exact active-world roster. Record both sides, infrastructure, modifiers, and mission type whenever quoting a power result.

## Warfare and intelligence

### Combat power

Canonical page: [/wiki/combat-power/](https://riftbornewiki.317society.com/wiki/combat-power/)

Combat power is a matchup estimate, not a fixed conversion between a displayed number and ship count. [Evidence](#evidence-runtime-combat-1175)

The active roster, attacker and defender cultures, light/heavy mix, infrastructure, directives, SPUs, tactics, and world modifiers can all change a preview. This is why a displayed power value cannot answer “how many ships?” without the exact scenario.

## Reproducible example

The 11.75 built-in simulator was run with seed 1175 for 200 trials per culture pairing. The profile used 15 attacking light fighters against 10 defending destroyers with level-5 central infrastructure. In all nine culture pairings, the defender won every run and the attacking force was lost. [Evidence](#evidence-combat-matrix-1175)

This result proves only that recorded fixture. It should not be generalized to a custom multiplayer roster or a different building, directive, SPU, or tactics configuration.

### Raids, shields, siege, and spies

Canonical page: [/wiki/raids-shields-siege-and-spies/](https://riftbornewiki.317society.com/wiki/raids-shields-siege-and-spies/)

Raids, shields, siege, and spies is part of Riftborne’s warfare and intelligence system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

This overview groups the focused articles associated with raids, shields, siege, and spies.

### Raid ceiling

Canonical page: [/wiki/raid-ceiling/](https://riftbornewiki.317society.com/wiki/raid-ceiling/)

Raid yield is bounded by the surviving fleet’s cargo, the target resources exposed to looting, and current raid modifiers. [Evidence](#evidence-runtime-combat-1175)

Nano Storage reduces exposed value, while logistics hulls and current cargo modifiers affect what can be carried away. A larger combat fleet does not automatically improve the haul if surviving cargo remains the bottleneck.

Use the raid simulator with explicit target resources and buildings when comparing designs. Active-world roster values must be recorded with the result. [Evidence](#evidence-live-world-1175)

### Shield integrity

Canonical page: [/wiki/shield-integrity/](https://riftbornewiki.317society.com/wiki/shield-integrity/)

Shield integrity represents the current contribution of a colony’s culture-specific defensive structure. Direct attacks can reduce that contribution even when the attacking force fails to capture the colony. [Evidence](#evidence-runtime-combat-1175)

Integrity loss and building-level destruction are separate outcomes. A later attack may face a weaker defensive contribution, but removing building levels requires the attack and siege paths shown by the current simulator.

Do not infer integrity damage from attacker headcount or Solis Battery level. Solis Battery is static attack infrastructure, not the Astraean shield. [Evidence](#evidence-building-effects-1175)

### Siege

Canonical page: [/wiki/siege/](https://riftbornewiki.317society.com/wiki/siege/)

Siege is the building-damage stage of a successful attack. Surviving siege capability and the selected target determine whether building levels are removed. [Evidence](#evidence-runtime-combat-1175)

Siege is not interchangeable with raid cargo or ordinary combat power. A fleet that wins the ship battle can still fail to achieve its structural objective if too little siege capability survives.

Use the current simulator with the exact target building and infrastructure. World-specific building costs and modifiers make a universal “siege per level” table unreliable.

### Espionage

Canonical page: [/wiki/espionage/](https://riftbornewiki.317society.com/wiki/espionage/)

Espionage missions use Intelligence hulls to gather time-sensitive information about hostile colonies and objectives. [Evidence](#evidence-runtime-combat-1175)

The active roster and target’s counter-intelligence determine the risk. A report is a dated observation, not live truth: record when it was captured, what could arrive before an attack, and whether the target may be presenting a deliberate decoy.

Objective and faction progress that is not shared through ownership or current visibility should be treated as stale after the observation time. [Evidence](#evidence-runtime-objectives-1175)

## Objectives

### Objectives and the late game

Canonical page: [/wiki/objectives-and-victory/](https://riftbornewiki.317society.com/wiki/objectives-and-victory/)

Patch 11.75 exposes two standard victory tracks: the Origin Wormhole and faction Valor. [Evidence](#evidence-runtime-objectives-1175)

## Origin Wormhole

The Origin is the objective colony at `(0,0)`. Its culture-specific Wormhole must reach level 100. The Wormhole names are Lens of Aster for Astraean, Furnace of Vorrak for Varkon, and Sanctum of Vael for Veil.

The Wormhole cannot advance beyond the lower level of that colony’s two culture-specific capacity buildings. The interface names those buildings for the owner’s culture.

## Valor

Controlled Keystones can build a culture- and tier-specific vision structure and a Valor Conduit. Valor Conduits generate faction Valor; the standard victory threshold in the current client is 250,000 Valor. Generation depends on conduit level and the Keystone’s current Visions. [Evidence](#evidence-runtime-objectives-1175)

Keystone names vary by culture and tier. Current worlds can contain Inner, Border, and Outer Keystones.

## World settings

The multiplayer operator can override campaign settings and owns the world state. Always confirm the active victory panel before committing faction resources. [Evidence](#evidence-live-world-1175)

## Multiplayer

### Markets, organizations, contracts, and diplomacy

Canonical page: [/wiki/markets-organizations-and-diplomacy/](https://riftbornewiki.317society.com/wiki/markets-organizations-and-diplomacy/)

Markets, organizations, contracts, and diplomacy are multiplayer systems whose available actions and values belong to the active world. [Evidence](#evidence-live-world-1175)

Use the current transaction confirmation screen for exchange quantities, reserved resources, cargo requirements, fees, shares, loans, and contract terms. This wiki does not publish universal prices or timers where the operator can change the world configuration.

Strategically, treat logistics and diplomacy as combat support: confirm who can ship resources, who can reinforce, which missions the current stance permits, and what public action will reveal to rivals.

## Strategy

### How to value a tile

Canonical page: [/strategy/how-to-value-a-tile/](https://riftbornewiki.317society.com/strategy/how-to-value-a-tile/)

Tile value is determined by yield, travel time, reinforcement access, and exposure rather than yield alone. [Evidence](#evidence-client-build-1175)

Rank a target on four axes:

1. **Yield:** production/terrain bonuses and rare-metal table.
2. **Reach:** travel time from a real shipyard, not visual distance.
3. **Support:** who can reinforce and supply it?
4. **Exposure:** how many hostile launch bases can reach it before your faction can?

A modest tile inside a reinforcement triangle is often worth more than a spectacular tile hanging alone in enemy space.

### Choosing a victory route

Canonical page: [/strategy/choosing-a-victory-route/](https://riftbornewiki.317society.com/strategy/choosing-a-victory-route/)

Victory-route selection compares a faction’s Origin access, Keystone network, defensive coverage, resource throughput, and information position. [Evidence](#evidence-runtime-objectives-1175)

Prefer the Origin Wormhole route when the faction can hold the central colony, sustain both capacity prerequisites, and protect a single highly visible construction project.

Prefer the Valor route when the faction can control and supply Keystones, grow Valor Conduits, and defend a distributed objective network long enough to reach the active-world threshold.

The strongest posture can threaten both routes so opponents cannot concentrate every response on one site. Confirm the live victory panel before committing; the operator owns campaign settings. [Evidence](#evidence-live-world-1175)

### Official multiplayer strategy

Canonical page: [/strategy/official-multiplayer/](https://riftbornewiki.317society.com/strategy/official-multiplayer/)

Official multiplayer rewards coordinated logistics, current intelligence, response-time organization, and objective timing. [Evidence](#evidence-client-build-1175)

The official world is real-time, so single-player time-advance tactics do not transfer. Its roster, modifiers, population, faction structure, and objective state are live-world values; capture them with a world identifier and timestamp before using them in a plan. [Evidence](#evidence-live-world-1175)

The best approach is operational:

### Join a faction and become legible

Canonical page: [/strategy/join-a-faction-and-become-legible/](https://riftbornewiki.317society.com/strategy/join-a-faction-and-become-legible/)

Join a faction and become legible is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Independent play is explicitly high risk. On day one, share your coordinates, culture, active hours, intended role, and nearby threats. Reliability gets you reinforcements and intelligence; silence makes even a large empire strategically invisible.

### Organize by response time

Canonical page: [/strategy/organize-by-response-time/](https://riftbornewiki.317society.com/strategy/organize-by-response-time/)

Organize by response time is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Create local cells of nearby faction members. Each cell should know:

- who can spy;
- who has the fastest reaction fleet;
- who holds cargo and Astra reserves;
- who can siege;
- who is awake during which windows.

Distance is less useful than actual arrival time.

### Separate public plans from launch orders

Canonical page: [/strategy/separate-public-plans-from-launch-orders/](https://riftbornewiki.317society.com/strategy/separate-public-plans-from-launch-orders/)

Separate public plans from launch orders is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Maintain a broad faction plan (“secure western Inner Keystone”), but share exact fleet composition and launch time only with participants. Assume enemy spy snapshots and social leakage exist.

### Build a logistics spine

Canonical page: [/strategy/build-a-logistics-spine/](https://riftbornewiki.317society.com/strategy/build-a-logistics-spine/)

Build a logistics spine is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Use backline production, forward launch hubs, and fortified transfer nodes. Keep slow siege behind the line until the target is confirmed. Pre-position cargo and Astra before the war, because market travel after the alarm is often too late.

### Run an intelligence cycle

Canonical page: [/strategy/run-an-intelligence-cycle/](https://riftbornewiki.317society.com/strategy/run-an-intelligence-cycle/)

Run an intelligence cycle is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Use one owner per priority target, timestamp reports, and avoid duplicate blind probes. Re-spy before the fleet reaches the point where it cannot be recalled or retasked. Track enemy shipyard levels because response time can matter more than the observed garrison.

### Fight campaigns, not battles

Canonical page: [/strategy/fight-campaigns-not-battles/](https://riftbornewiki.317society.com/strategy/fight-campaigns-not-battles/)

Fight campaigns, not battles is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

A multiplayer attack should answer:

- What changes on the map if we win?
- What replaces our losses?
- Can the target be reinforced before impact?
- Is siege protected enough to convert the win?
- Who holds our bases while fleets are away?
- What is the diplomatic cost?

If those answers are missing, raid, spy, contract, or wait.

### Shift to objectives before the leaderboard tells you to

Canonical page: [/strategy/shift-to-objectives-before-the-leaderboard-tells-you-to/](https://riftbornewiki.317society.com/strategy/shift-to-objectives-before-the-leaderboard-tells-you-to/)

Shift to objectives before the leaderboard tells you to is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Economic rank is not victory. In the middle game, choose an objective route, reserve the resources shown by its current contribution and construction screens, build staging bases, and schedule coverage. A faction that begins coordinating only after an enemy Wormhole or Valor lead becomes visible is already late.

### Advanced tactics and edge cases

Canonical page: [/strategy/advanced-tactics-and-edge-cases/](https://riftbornewiki.317society.com/strategy/advanced-tactics-and-edge-cases/)

Advanced tactics use documented interactions and edge cases to create advantages that are not obvious from headline statistics. [Evidence](#evidence-client-build-1175)

These tactics follow from confirmed rules. “Cheese” means exploiting incentives and timing, not abusing bugs or unauthorized access.

### Astra trap

Canonical page: [/strategy/astra-trap/](https://riftbornewiki.317society.com/strategy/astra-trap/)

Astra trap is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Raid Astra shortly before a known upkeep deficit or incoming reinforcement. The loot may matter less than shortening the target’s displayed runway. Do not assume a universal attrition order or interval; both must be confirmed in the current runtime before the tactic is timed.

**Counter:** preserve an Astra reserve, arrange emergency shipments, and alert allies before the runway becomes critical.

### Shield-grinding sacrificial attacks

Canonical page: [/strategy/shield-grinding-sacrificial-attacks/](https://riftbornewiki.317society.com/strategy/shield-grinding-sacrificial-attacks/)

Shield-grinding sacrificial attacks is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Direct attacks can reduce defensive-structure integrity separately from siege damage, including attacks that do not take the colony. This makes sequential waves a possible setup for a later siege, but the amount removed is scenario-dependent and must be previewed or simulated for the active world. [Evidence](#evidence-runtime-combat-1175)

**Counter:** detect launch waves, reinforce before the final strike, repair/rotate defenses if the interface permits, and retaliate against the launch base.

### Hangar feint

Canonical page: [/strategy/hangar-feint/](https://riftbornewiki.317society.com/strategy/hangar-feint/)

Hangar feint is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Only stationed ships defend. A base can appear wealthy but weak because hulls are hangared—or can invite an attack and station them before arrival.

**Counter:** refresh intel near impact and model enemy reaction time.

### Slowest-hull sabotage—self-inflicted edition

Canonical page: [/strategy/slowest-hull-sabotage-self-inflicted-edition/](https://riftbornewiki.317society.com/strategy/slowest-hull-sabotage-self-inflicted-edition/)

Slowest-hull sabotage—self-inflicted edition is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

One siege or colony hull can ruin an interception window. Keep response, cargo, siege, and colonization packages separate until the final assembly point.

### Wrapped-edge backdoor

Canonical page: [/strategy/wrapped-edge-backdoor/](https://riftbornewiki.317society.com/strategy/wrapped-edge-backdoor/)

Wrapped-edge backdoor is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Players read a rectangular map emotionally even though it is toroidal. Expand and launch across the seam; measure both routes.

### Defender-mix manipulation

Canonical page: [/strategy/defender-mix-manipulation/](https://riftbornewiki.317society.com/strategy/defender-mix-manipulation/)

Defender-mix manipulation is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Power weights anti-light/anti-heavy values against fleet composition. Feeding or removing a screen changes the opponent’s weighted efficiency. Scout compositions, then counter the share—not the ship count.

### Tracking cap efficiency

Canonical page: [/strategy/tracking-cap-efficiency/](https://riftbornewiki.317society.com/strategy/tracking-cap-efficiency/)

Tracking cap efficiency is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Tracking/evasion edge clamps at ±20%. Once you hit the cap against the expected target, more tracking has no direct power benefit in that matchup. Spend the next augmentation slot elsewhere.

### Raid-with-cargo, attack-with-siege

Canonical page: [/strategy/raid-with-cargo-attack-with-siege/](https://riftbornewiki.317society.com/strategy/raid-with-cargo-attack-with-siege/)

Raid-with-cargo, attack-with-siege is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

This sounds basic, but it is the strongest economic cheese because many players optimize only combat power. Calculate loot ceiling before launching; strip siege from raids and cargo from pure demolition unless it serves the return plan.

### Nano Storage forcing function

Canonical page: [/strategy/nano-storage-forcing-function/](https://riftbornewiki.317society.com/strategy/nano-storage-forcing-function/)

Nano Storage forcing function is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

At Nano Storage 20, 80% is hidden. Against such a target, repeated raids may be theater. Either attack with siege, hit logistics shipments, or choose a less protected economy.

### Keystone funding timing

Canonical page: [/strategy/keystone-donation-delay/](https://riftbornewiki.317society.com/strategy/keystone-donation-delay/)

Keystone funding timing is a faction strategy built around the current Valor path. [Evidence](#evidence-runtime-objectives-1175)

Confirm the Keystone’s current vision capacity, pending contribution, Valor Conduit level, defensive coverage, and active-world victory panel before sending faction resources. Funding that outruns capacity or leaves the site undefended can create visible progress without durable advantage.

### SPU delivery timing

Canonical page: [/strategy/daily-spu-timing/](https://riftbornewiki.317society.com/strategy/daily-spu-timing/)

SPU delivery timing is a strategy pattern whose schedule must be read from the active site. [Evidence](#evidence-current-data-1175)

Align purchases, fleet refits, and major launches just after a confirmed delivery when practical. Rivals may calculate against the previously visible configuration, but the advantage disappears if the schedule or installed bonus is guessed incorrectly.

### Veil deniable-raider base

Canonical page: [/strategy/veil-deniable-raider-base/](https://riftbornewiki.317society.com/strategy/veil-deniable-raider-base/)

Veil deniable-raider base is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Concentrate the active roster’s espionage, cargo, and travel advantages at one launch hub. The result is a selective raiding base whose composition can change quickly after fresh intelligence. Named abilities and diplomatic modifiers must be confirmed in the active world before being included in the calculation.

### Varkon window stack

Canonical page: [/strategy/varkon-window-stack/](https://riftbornewiki.317society.com/strategy/varkon-window-stack/)

Varkon window stack is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Concentrate current Varkon bonuses, fresh intelligence, allied arrival times, and multiple launches inside the same response window. Treat any ability name, duration, and cooldown as a live Codex value rather than a permanent rule.

### Market capital lock

Canonical page: [/strategy/market-capital-lock/](https://riftbornewiki.317society.com/strategy/market-capital-lock/)

Market capital lock is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Cargo ships are reserved by live offers and trade legs travel. An attractive offer can immobilize a trader’s capacity. Post only with a liquidity plan; exploit opponents who tie up all cargo by pressuring elsewhere.

### Empty-base deletion

Canonical page: [/strategy/empty-base-deletion/](https://riftbornewiki.317society.com/strategy/empty-base-deletion/)

Empty-base deletion is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Siege spends against building levels and removes a non-spawn base when everything reaches zero. If conquest is unnecessary, a focused demolition can erase the position and its reinforcement geometry.

### Objective information asymmetry

Canonical page: [/strategy/objective-information-asymmetry/](https://riftbornewiki.317society.com/strategy/objective-information-asymmetry/)

Objective information asymmetry is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Enemy objective progress is snapshot-based. A faction can accelerate between spy cycles or deliberately present stale progress. Rotate spies and avoid announcing donation timing.

### Common strategic failures

Canonical page: [/strategy/common-failures/](https://riftbornewiki.317society.com/strategy/common-failures/)

Common ways strong empires lose is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

- Expanding to the cap before defending the cap.
- Treating a large fleet as affordable because the build cost was paid.
- Funding objectives while storage, income, or defense is still fragile.
- Leaving every base as a mediocre hybrid.
- Winning fleet combat without cargo or siege to convert the result.
- Letting spy reports age through a long travel time.
- Sending all mobile defense away in one glorious attack.
- Mistaking a high score for a victory position.
- Ignoring diplomacy until a daily stance flip closes trade or reinforcement.
- Playing multiplayer like paused single-player.

### Command checklist

Canonical page: [/strategy/command-checklist/](https://riftbornewiki.317society.com/strategy/command-checklist/)

A recurring command checklist is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

At each meaningful login:

1. Check inbound fleets, alerts, and faction messages.
2. Check Astra runway at every garrison.
3. Spend or route resources before storage caps.
4. Keep all intended build/training lanes working.
5. Refresh priority intel.
6. Re-evaluate travel times, not just map distance.
7. Ask what the empire should become over the next two to four launch windows.
8. Tell allies anything that changes their decisions.

## Reference

### Carrier values and custom rosters

Canonical page: [/wiki/carrier-documentation-discrepancy/](https://riftbornewiki.317society.com/wiki/carrier-documentation-discrepancy/)

Carrier effects are roster-dependent. The active multiplayer operator can supply a custom or detached ship roster, so a carrier coefficient copied from another campaign is not reliable. [Evidence](#evidence-live-world-1175)

Use the current Codex roster and combat preview for the active world. This wiki does not publish a universal carrier percentage until the value is exposed by a current, ruleset-specific source.

### Directives

Canonical page: [/wiki/directives/](https://riftbornewiki.317society.com/wiki/directives/)

Directives are twelve parallel ten-stage progression paths that grant permanent empire bonuses when completed. [Evidence](#evidence-client-build-1175)

The current directive table defines twelve ten-stage paths that progress in parallel and auto-complete. It lists these permanent capstones: [Evidence](#evidence-current-data-1175)

| Path | Permanent effect |
|---|---|
| Signal Cartographer | +12% spy survival |
| Void Reaver | +10% raid loot |
| Aegis Vanguard | +8% fleet attack |
| Solar Ledger | +6% base production |
| Concord Envoy | +20% diplomacy penalty resistance |
| Starlane Broker | +8% fleet cargo |
| Consortium Founder | +8% base storage |
| Frontier Ascendant | +8% travel speed |
| Forge Architect | +8% build and ship-build speed |
| Bastion Warden | +10% base defense, +6% fleet defense |
| Flux Quartermaster | +10% travel speed, +6% cargo |
| Noctium Artificer | +8% research, +10% transmute speed |

Broad activity progresses more directive tracks. Espionage, trade, raiding, construction, expansion, and augmentation retain long-term value even when they are not an empire’s primary specialization.

### Sources and confidence

Canonical page: [/wiki/sources-and-confidence/](https://riftbornewiki.317society.com/wiki/sources-and-confidence/)

This wiki targets the installed 11.75 client, build `a7b5c7c`. [Evidence](#evidence-client-build-1175)

## Evidence order

1. Current in-game Codex and visible UI.
2. Read-only runtime audits of the installed client.
3. Reproducible runs through the built-in combat simulator.
4. Current multiplayer telemetry and world settings.
5. Current official release information.

Older written guides are discovery aids only. They cannot confirm a mechanic.

## Verification labels

- **Confirmed:** directly supported by the current client or Codex.
- **Observed:** captured from a current UI or live-world response.
- **Patch-sensitive:** valid only with the stated world or build context.
- **Strategy:** analysis whose mechanic dependencies are listed and verified separately.

Raw player screenshots remain private. Public evidence entries are sanitized transcripts that omit identity, coordinates, credentials, private stockpiles, and tactical information.

### Aegis Vanguard

Canonical page: [/wiki/aegis-vanguard/](https://riftbornewiki.317society.com/wiki/aegis-vanguard/)

Aegis Vanguard is part of Riftborne’s reference system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

Aegis Vanguard is the Fighter directive path. It contains ten stages that progress automatically alongside the other directive tracks.

Level 5, **Shock Spearhead**, requires a victory over a defending fleet with more than 10,000 power. The installed directive data describes intermediate stages as guidance and progression milestones rather than separate combat bonuses.

Completing all ten stages grants the permanent Aegis Vanguard capstone: **+8% fleet attack**. A reference to “Aegis level 5” therefore identifies directive progress, not a 5% or half-strength version of the final buff.

### Solis Battery

Canonical page: [/wiki/solis-battery/](https://riftbornewiki.317society.com/wiki/solis-battery/)

Solis Battery is the Astraean static attack building. It adds flat attack against light and heavy hulls and fires with the stationed garrison while the building remains standing. It does not use shield integrity. [Evidence](#evidence-building-effects-1175)

Its effect is culture-dependent. The active Codex and combat simulator should be used for a specific level and world; this page deliberately avoids copying a value from defensive infrastructure or converting its level into an unsupported fleet-power total.

The Varkon and Veil structures in the same role are Warbattery and Duskbattery. [Evidence](#evidence-building-names-1175)

### Glossary

Canonical page: [/wiki/glossary/](https://riftbornewiki.317society.com/wiki/glossary/)

Glossary is part of Riftborne’s reference system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

- **Astra:** A core resource used for construction and stationed-fleet upkeep.
- **Codex:** The in-game reference and combat-preview interface for the active world.
- **Keystone:** A tiered faction objective that can support vision infrastructure and a Valor Conduit.
- **Noctmark:** An objective currency used by current Keystone contribution actions.
- **Origin:** The central objective at coordinate `(0,0)`.
- **SPU:** A stackable upgrade produced through rare-metal mining and refining.
- **Stationed fleet:** Ships assigned to a base and eligible to defend it.
- **Valor:** Faction victory progress generated by Valor Conduits on controlled Keystones.
- **Wormhole:** A culture-specific Origin structure whose current standard victory target is level 100.
