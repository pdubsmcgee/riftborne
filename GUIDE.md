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

## Three layers of play

The economy layer creates resources and queues. The operational layer converts them into movement, intelligence, defense, and replacement. The objective layer converts sustained map control into victory progress. Weakness in any layer eventually limits the others.

## Information horizon

Distinguish current UI facts, recent observations, and forecasts. Longer plans need checkpoints where live state replaces assumptions.

## Multiplayer consequence

Persistent time makes coverage and handoffs strategic resources. Clear response ownership can outperform larger assets that arrive separately or too late.

### Opening a campaign

Canonical page: [/wiki/first-login-a-safe-opening/](https://riftbornewiki.317society.com/wiki/first-login-a-safe-opening/)

The opening phase establishes an empire’s production schedule, defensive safety, and first expansion route. [Evidence](#evidence-runtime-economy-1175)

Begin by reading the home colony’s four current amounts, individual caps, and hourly trends. The exact starting levels and stockpile are campaign settings, so this wiki does not assume a universal opening inventory. [Evidence](#evidence-live-world-1175)

Queue only what the displayed stockpile can support, check when each resource will cap, and choose the first expansion route from visible geography rather than a fixed build order.

## First inspection

Read before spending: current resources, per-resource caps, hourly trends, existing building effects, queues, nearby tiles, faction messages, and the live victory panel. This establishes what the campaign actually gave you.

## First commitments

Choose a capacity horizon long enough to reach the next login, keep Astra compatible with the intended garrison, and pursue only the infrastructure prerequisite shown for the next desired unlock. A fixed sequence from another world can fail when starting stockpiles or pacing differ.

## Before logging out

Confirm queue completion times, expected cap times, inbound fleets, and the next decision that will require attention. Share location and intended role with the faction so allies can plan around the new empire.

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

## Reading the runway

The resource panel provides the three inputs that matter: current Astra, its capacity, and the present hourly trend. A negative trend is not automatically a crisis; it becomes one when the remaining amount cannot cover the time until the next shipment, fleet departure, or other change in demand.

## Reinforcement check

Before sending ships to an ally, ask for the destination’s current Astra amount and trend, then have the recipient preview the state after the reinforcement is stationed. Ships that arrive safely but create an unsustainable garrison have not solved the defensive problem.

## Recovery options

Reduce stationed demand, increase or redirect Astra supply, arrange a shipment, or shorten the period the fleet must remain. Exact attrition timing is intentionally omitted because the current roster and world settings can alter the result. [Evidence](#evidence-live-world-1175)

### Production scaling caveat

Canonical page: [/wiki/production-scaling-caveat/](https://riftbornewiki.317society.com/wiki/production-scaling-caveat/)

Resource-building increments are campaign inputs. The current executable applies the configured increment to the matching production building, but a wiki-wide coefficient would be wrong for worlds that change that setting. [Evidence](#evidence-runtime-economy-1175)

Use the active colony preview for current hourly production and the projected change shown for an upgrade. Comparisons between worlds must state the campaign settings used.

## Safe comparison method

Use the upgrade preview on the active colony. Record current production, projected production, level, world identifier, and capture time. Repeat the same method for the comparison colony instead of applying a coefficient copied from another campaign.

## Capacity consequence

Production upgrades shorten the time until that resource reaches its cap. An upgrade that looks efficient can still waste output if the matching capacity horizon or spending plan is not adjusted.

## Publishing rule

A universal formula belongs in the wiki only when it is exposed by current build evidence and cannot be overridden by the world. Otherwise the article documents the method, not a borrowed number.

### Rare metals, mining outposts, Noctmarks, and SPUs

Canonical page: [/wiki/rare-metals-and-spus/](https://riftbornewiki.317society.com/wiki/rare-metals-and-spus/)

Rare-metal sites produce materials used by the SPU system. The current 11.75 data table exposes SPU targets including ship classes, economy, capacity, travel, cargo, siege, tracking, evasion, upkeep, research, and intelligence. [Evidence](#evidence-current-data-1175)

Exact mining chances, delivery timing, recipes, and installed bonuses should be read from the active site and SPU screens. They can depend on the campaign and current augmentation, so this wiki does not publish a universal crafting schedule.

For planning, compare an SPU’s displayed marginal effect with the fleet or colony that will actually use it; a high-tier bonus on an inactive system creates no immediate tempo.

## Separate site from augmentation

A rare-metal site is the production source; an SPU is an installed improvement with a displayed target and effect. Owning a site does not automatically mean the resulting augmentation belongs on the nearest or largest fleet.

## Allocation questions

Which fleet or colony uses the affected system most often? Does the improvement help the current objective? Is the recipient likely to remain active and supplied? Would a lower apparent bonus create more immediate tempo elsewhere?

## Evidence boundary

The installed table confirms the available effect categories. Recipes, chance, delivery schedule, tier, and the final installed value must come from the current site and SPU screens before they are treated as facts. [Evidence](#evidence-current-data-1175)

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

## Read effects, not inherited labels

The same functional role has different culture-specific names. Identify production, capacity, logistics, defense, static attack, shipbuilding, siege, or special effects before comparing cultures.

## Design around the job

An economy base protects output and capacity horizon. A launch base protects queues, Astra runway, and route coverage. A fortress protects stationed defense and response access. An objective base protects the exact prerequisites shown by its current site.

## Revisit specialization

As the front moves, review obsolete structures, vulnerable stockpiles, queue use, and whether the base still shortens a route that matters.

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

### Settlement slots

Canonical page: [/wiki/settlement-slots/](https://riftbornewiki.317society.com/wiki/settlement-slots/)

Settlement slots determine how many settlements a particular colony can support. Patch 11.75 calculates availability from that founding colony’s unlocked capacity, qualifying settlements still owned by the player, and colonization fleets currently pending from that origin. [Evidence](#evidence-runtime-settlement-slots-1175)

## Slots belong to an origin

Capacity is not one empire-wide pool. A settlement records the colony from which it was founded, and the slot check is performed against that origin. When preparing a launch, select the intended origin first and read its current settlement display.

## Losing an outpost

An outpost is not a permanent lifetime charge. If it leaves the player’s owned-base collection, it no longer counts against that player’s slot. A base with no remaining building levels also fails the current slot-occupancy test. The original colony may then use the capacity again, provided the slot is still unlocked.

Losing the founding colony is different: its capacity does not migrate to another colony. A replacement settlement must launch from an origin that independently exposes an available slot.

## Pending launches

A colonization fleet already traveling from the origin counts while pending. This prevents the same capacity from being promised to multiple destinations. Recheck the origin after a launch is cancelled, resolved, or destroyed rather than assuming the slot display has already changed.

## Multiplayer use

After losing an outpost, verify ownership and the origin’s slot panel before building a replacement plan. The safest statement is “the slot should be available under the current rule”; the live launch screen remains authoritative for the exact world state.

### Outpost types

Canonical page: [/wiki/outpost-types/](https://riftbornewiki.317society.com/wiki/outpost-types/)

Patch 11.75 distinguishes strategic outposts, asteroid outposts, and rare-metal mining outposts. They use outpost capacity from their founding colony but are offered on different tile types and do not share the complete construction freedom of a full colony. [Evidence](#evidence-runtime-settlement-slots-1175)

## Strategic outposts

Strategic outposts are offered on eligible empty-space targets. Their purpose is positional: shorten response routes, create a forward garrison or logistics point, and influence which parts of the wrapped map can be reached in time.

## Asteroid outposts

Asteroid outposts are offered on eligible resource-asteroid variants. Their allowed production infrastructure follows the asteroid’s displayed resource role. Evaluate them by usable output, transport exposure, and whether the founding colony can defend the route.

## Rare-metal mining outposts

Rare-metal sites use their dedicated outpost type and connect to the SPU system. Current recipes, chances, delivery state, and installed augmentation effects belong to the live site and SPU screens rather than a universal schedule. [Evidence](#evidence-current-data-1175)

## Choosing the type

The target tile constrains what can be founded, so settlement type is not merely a preference. Use the current colonization screen to confirm the offered option, required origin, cost, travel time, and slot before committing the hull.

## Loss and replacement

Any of these outposts stops counting for its former owner after ownership is lost. The freed capacity remains attached to the founding colony, not to the tile or the conquering player.

## Cultures

### Cultures

Canonical page: [/wiki/cultures/](https://riftbornewiki.317society.com/wiki/cultures/)

Cultures is part of Riftborne’s cultures system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

This overview groups the focused articles associated with cultures.

## Current cultures

Riftborne currently presents Astraean, Varkon, and Veil. Each culture renames its central, capacity, logistics, defensive, static-attack, shipbuilding, and siege infrastructure. The names are not cosmetic: a player should use the displayed effect and current Codex entry when comparing roles across cultures. [Evidence](#evidence-building-names-1175)

## What carries across cultures

All three cultures still operate inside the same strategic problems: four-resource economy, travel-time logistics, stationed defense, intelligence, settlement capacity, and faction objectives. Their current ship rosters and numerical modifiers may differ by world, so this wiki separates durable roles from live values. [Evidence](#evidence-live-world-1175)

Use the dedicated Astraean, Varkon, and Veil pages as indexes into each infrastructure set.

### Astraean: compound interest with a shield

Canonical page: [/wiki/astraean/](https://riftbornewiki.317society.com/wiki/astraean/)

Astraean’s current infrastructure includes Sunspire, Solvault, Heliovex, Astergate, Solis Aegis, Solis Battery, Solar Slipway, Auric Drydock, and Helion Bombard. [Evidence](#evidence-building-names-1175)

Astraean strategy favors protected production clusters and deliberate reinforcement. Culture and ship modifiers can vary with the active roster and campaign, so exact discounts, speeds, and combat values belong to the current Codex rather than a universal table. [Evidence](#evidence-live-world-1175)

## Infrastructure roles

Sunspire is the Astraean central structure. Solvault and Heliovex provide the two capacity roles; Astergate is the logistics structure; Solis Aegis is defensive infrastructure; Solis Battery supplies static attack; Solar Slipway and Auric Drydock build the light and heavy families; Helion Bombard is the siege structure. [Evidence](#evidence-building-effects-1175)

## Planning implications

Astraean planning should distinguish protection from firepower. Solis Aegis and Solis Battery contribute through different combat paths, so one cannot be used as a numerical substitute for the other. Capacity likewise remains split between Solvault and Heliovex.

## Active-world check

Before choosing fleet ratios or upgrade timing, read the current Codex values and simulator. Culture identity is stable here; exact ship values and campaign modifiers are not.

### Varkon: choose the hour of violence

Canonical page: [/wiki/varkon/](https://riftbornewiki.317society.com/wiki/varkon/)

Varkon is an offensive culture whose current infrastructure includes Warspire, Skarncache, Voltforge, Kraghwall, Warbattery, Clawdock, Warfoundry, and Breach Forge. [Evidence](#evidence-building-names-1175)

Its practical strength is concentrated force: assemble a fleet for a defined target, confirm travel and return exposure, and coordinate the launch window with allies. Numerical culture modifiers and ship values must be read from the active Codex because multiplayer worlds can use a customized roster. [Evidence](#evidence-live-world-1175)

## Infrastructure roles

Warspire is the Varkon central structure. Skarncache and Voltforge fill the two capacity roles; Warcross is logistics; Kraghwall is defensive infrastructure; Warbattery supplies static attack; Clawdock and Warfoundry build the light and heavy families; Breach Forge is the siege structure. [Evidence](#evidence-building-effects-1175)

## Planning implications

A concentrated attack still needs a clear mission. Keep cargo for raids, preserve siege for structural attacks, and calculate the return exposure of the launch base. “Offensive culture” is not permission to replace current intelligence with aggregate power.

## Active-world check

Verify all numerical bonuses, abilities, hull values, and cooldowns in the active Codex before constructing a timing window.

### Veil: asymmetry as an economy

Canonical page: [/wiki/veil/](https://riftbornewiki.317society.com/wiki/veil/)

Veil’s current infrastructure includes Nightspire, Nyxvault, Gloamwell, Whisperway, Duskshroud, Duskbattery, Nocturnal Slipway, Umbral Drydock, and Rift Ruinery. [Evidence](#evidence-building-names-1175)

Veil strategy favors asymmetric launch positions, concealed intentions, and selective fights. Exact culture bonuses, Eldritch upgrade costs, and roster values are world-sensitive and must be read from the active Codex before committing resources. [Evidence](#evidence-live-world-1175)

## Infrastructure roles

Nightspire is the Veil central structure. Nyxvault and Gloamwell fill the two capacity roles; Whisperway is logistics; Duskshroud is defensive infrastructure; Duskbattery supplies static attack; Nocturnal Slipway and Umbral Drydock build the light and heavy families; Rift Ruinery is the siege structure. [Evidence](#evidence-building-effects-1175)

## Planning implications

Veil’s strategic value comes from preserving uncertainty and selecting the engagement. That still requires sustainable Astra, mission-specific support hulls, and a route that does not isolate the launch base.

## Active-world check

Treat named abilities, diplomatic effects, upgrade costs, and ship statistics as live-world data. Confirm them before using a plan copied from another campaign.

## Ships and fleets

### Ships, fleets, and travel

Canonical page: [/wiki/ships-fleets-and-travel/](https://riftbornewiki.317society.com/wiki/ships-fleets-and-travel/)

Fleets combine specialized hull families, while their travel time is determined by wrapped distance and the slowest participating ship. [Evidence](#evidence-client-build-1175)

The current client distinguishes Intelligence, Light, Heavy, Carrier, Siege, Colonization, and Flagship roles. The active roster supplies each hull’s cost, speed, cargo, upkeep, and combat profile; multiplayer worlds may replace those values. [Evidence](#evidence-runtime-fleets-1175)

A fleet travels at the pace produced by its participating hulls and active modifiers. The launch preview is authoritative for the chosen origin, destination, mission, and world. Keep slow-purpose hulls out of reaction fleets unless their effect is needed at the destination. [Evidence](#evidence-live-world-1175)

Training capacity and unlocks are shown by the current culture-specific shipyard screens. Do not infer lane counts, discounts, or timing from another campaign.

## Mission roles

Intelligence hulls support information gathering; Light and Heavy families form the main combat mix; Carriers modify supported forces according to the active roster; Siege converts successful attacks into structural damage; Colonization hulls establish settlements; Flagships are roster-defined strategic hulls.

## Travel discipline

Read the launch preview after every composition change. A route that works for a reaction fleet may fail once cargo or siege joins it. Wrapped geography also means the visually obvious direction is not always the shortest.

## Roster provenance

When sharing a fleet plan, state the world and capture time. Ship names, costs, speed, cargo, upkeep, and combat values can be supplied by the operator, so a table without provenance should not be treated as current.

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

## Build from the mission backward

Start with the result: defend, intercept, raid, destroy infrastructure, colonize, scout, or reinforce. Then add only the roles needed to produce that result. A fleet built from every available hull often inherits the slowest travel profile while preserving none of the support roles efficiently.

## Compare alternatives

Preview at least two light/heavy mixes against the observed target. For raids, repeat the comparison with expected surviving cargo. For attacks, test whether enough siege survives to affect the chosen building. For defense, verify that the ships will be stationed and that the destination can sustain their Astra demand.

## Keep modules separable

Reaction, cargo, siege, colonization, and intelligence groups should remain separate until the mission requires assembly.

### Fleet power

Canonical page: [/wiki/fleet-power/](https://riftbornewiki.317society.com/wiki/fleet-power/)

Fleet power is a context-sensitive preview rather than a fixed conversion from headcount. [Evidence](#evidence-runtime-combat-1175)

A displayed value such as **3,200 power has no universal ship count**. It can describe materially different fleets because hull lines, culture, roster settings, infrastructure, directives, SPUs, tactics, mission type, and the opposing composition all affect the estimate.

Use the in-game combat simulator with the exact active-world roster. Record both sides, infrastructure, modifiers, and mission type whenever quoting a power result.

## What the number can do

Fleet power is useful for comparing fully specified scenarios inside the same roster and ruleset. It can help identify whether a composition change improves the preview against a particular target.

## What the number cannot do

It does not reveal ship count, replacement cost, cargo, travel time, siege survival, or strategic value. Two fleets with the same displayed power can solve different missions and perform differently against the same defender mix.

## How to quote it responsibly

Attach the roster provenance, cultures, ship counts, infrastructure, mission, target mix, modifiers, and capture time. Without those inputs, “3,200 power” is context rather than a reproducible combat claim.

## Warfare and intelligence

### Combat power

Canonical page: [/wiki/combat-power/](https://riftbornewiki.317society.com/wiki/combat-power/)

Combat power is a matchup estimate, not a fixed conversion between a displayed number and ship count. [Evidence](#evidence-runtime-combat-1175)

The active roster, attacker and defender cultures, light/heavy mix, infrastructure, directives, SPUs, tactics, and world modifiers can all change a preview. This is why a displayed power value cannot answer “how many ships?” without the exact scenario.

## Reproducible example

The 11.75 built-in simulator was run with seed 1175 for 200 trials per culture pairing. The profile used 15 attacking light fighters against 10 defending destroyers with level-5 central infrastructure. In all nine culture pairings, the defender won every run and the attacking force was lost. [Evidence](#evidence-combat-matrix-1175)

This result proves only that recorded fixture. It should not be generalized to a custom multiplayer roster or a different building, directive, SPU, or tactics configuration.

## Composition sensitivity

The estimate changes with the opposing light/heavy share and current modifiers. A force can look strong in one fixture and weak in another without changing ship count.

## Reproducible comparison

Keep every input fixed, change one variable, and use recorded seeds. Store exact fleets, cultures, infrastructure, mission, target, modifiers, roster provenance, and build.

## Strategic interpretation

Combat output does not include cargo value, siege objective, travel exposure, replacement time, or defense left behind. Those belong beside the simulator result, not inside a universal conversion.

### Raids, shields, siege, and spies

Canonical page: [/wiki/raids-shields-siege-and-spies/](https://riftbornewiki.317society.com/wiki/raids-shields-siege-and-spies/)

Raids, shields, siege, and spies is part of Riftborne’s warfare and intelligence system and is documented here for patch 11.75. [Evidence](#evidence-client-build-1175)

This overview groups the focused articles associated with raids, shields, siege, and spies.

## Four different questions

- **Raid:** how much exposed value can surviving cargo remove?
- **Defensive integrity:** how much contribution remains from the culture-specific defensive structure?
- **Siege:** can surviving siege capability remove the selected building level?
- **Espionage:** how current and complete is the information used to choose the mission?

These systems interact but are not interchangeable. A fleet may win combat while failing to loot, fail to remove a structure, or act on intelligence that was accurate only when captured. [Evidence](#evidence-runtime-combat-1175)

## Planning sequence

Collect current information, state the mission’s desired outcome, preview the exact target, and preserve the support hulls that convert combat success into that outcome. After impact, use the report as the starting state for the next decision rather than assuming the first plan still applies.

### Raid ceiling

Canonical page: [/wiki/raid-ceiling/](https://riftbornewiki.317society.com/wiki/raid-ceiling/)

Raid yield is bounded by the surviving fleet’s cargo, the target resources exposed to looting, and current raid modifiers. [Evidence](#evidence-runtime-combat-1175)

Nano Storage reduces exposed value, while logistics hulls and current cargo modifiers affect what can be carried away. A larger combat fleet does not automatically improve the haul if surviving cargo remains the bottleneck.

Use the raid simulator with explicit target resources and buildings when comparing designs. Active-world roster values must be recorded with the result. [Evidence](#evidence-live-world-1175)

## Three ceilings

A raid is constrained first by resources exposed at the target, then by cargo that survives combat, and finally by any active raid modifiers. Raising combat strength alone does not necessarily increase the result.

## Simulator workflow

Enter the target’s current resources and relevant infrastructure, select the exact active-world roster, and compare the expected haul with travel time and replacement risk. If cargo is limiting, add or protect cargo; if exposed value is limiting, choose another target or mission.

## After the raid

Use the report to update both the target’s likely stockpile and your surviving carrying capacity. Repeating the original calculation without those changes overstates the next haul.

### Shield integrity

Canonical page: [/wiki/shield-integrity/](https://riftbornewiki.317society.com/wiki/shield-integrity/)

Shield integrity represents the current contribution of a colony’s culture-specific defensive structure. Direct attacks can reduce that contribution even when the attacking force fails to capture the colony. [Evidence](#evidence-runtime-combat-1175)

Integrity loss and building-level destruction are separate outcomes. A later attack may face a weaker defensive contribution, but removing building levels requires the attack and siege paths shown by the current simulator.

Do not infer integrity damage from attacker headcount or Solis Battery level. Solis Battery is static attack infrastructure, not the Astraean shield. [Evidence](#evidence-building-effects-1175)

## Integrity versus building level

Integrity changes the defensive contribution available to a later battle. Building-level loss is a siege result. A plan that intends to remove infrastructure must account for both stages.

## Sequential attacks

Carry the resulting integrity state into the next fixture and update the stationed fleet. Do not assume a fixed loss per attacker or ship; use the active simulator.

## Defensive response

Fresh garrison, changed composition, and any currently available repair action can alter the next outcome. Treat observed setup waves as warning of a possible later siege.

### Siege

Canonical page: [/wiki/siege/](https://riftbornewiki.317society.com/wiki/siege/)

Siege is the building-damage stage of a successful attack. Surviving siege capability and the selected target determine whether building levels are removed. [Evidence](#evidence-runtime-combat-1175)

Siege is not interchangeable with raid cargo or ordinary combat power. A fleet that wins the ship battle can still fail to achieve its structural objective if too little siege capability survives.

Use the current simulator with the exact target building and infrastructure. World-specific building costs and modifiers make a universal “siege per level” table unreliable.

## Structural objective

Select the building because its removal changes the defender’s next decision: production, capacity, logistics, defense, static attack, shipbuilding, siege support, or objective progress. “Any damage” is not a sufficient campaign objective.

## Fleet construction

The combat line must survive long enough for siege capability to remain after the ship battle. Compare alternate compositions in the current simulator and specify the target building. More siege at launch is not automatically better if the supporting fleet collapses.

## Multi-wave planning

Rebuild the fixture after every impact. Integrity, stationed ships, building levels, resources, and reinforcements can all change before the next wave.

### Espionage

Canonical page: [/wiki/espionage/](https://riftbornewiki.317society.com/wiki/espionage/)

Espionage missions use Intelligence hulls to gather time-sensitive information about hostile colonies and objectives. [Evidence](#evidence-runtime-combat-1175)

The active roster and target’s counter-intelligence determine the risk. A report is a dated observation, not live truth: record when it was captured, what could arrive before an attack, and whether the target may be presenting a deliberate decoy.

Objective and faction progress that is not shared through ownership or current visibility should be treated as stale after the observation time. [Evidence](#evidence-runtime-objectives-1175)

## A report is a snapshot

Record target, capture time, observed resources, infrastructure, stationed ships, objective state, and what the mission could not reveal. A report without its age is easy to mistake for current truth.

## Refresh cadence

The closer a fleet is to commitment—or a faction is to victory—the more expensive stale intelligence becomes. Refresh at the last practical decision point, not merely at the start of planning.

## Interpretation

Compare reports rather than reading them in isolation. Changes can indicate reinforcement, production, evacuation, or bait. Use the simulator only after translating the newest observation into an exact scenario.

### Combat simulator

Canonical page: [/wiki/combat-simulator/](https://riftbornewiki.317society.com/wiki/combat-simulator/)

Riftborne’s built-in combat simulator is the authoritative way to compare a specified battle without turning displayed power into a universal ship-count formula. It uses the current combat path and can represent fleets, cultures, infrastructure, mission context, and modifiers. [Evidence](#evidence-runtime-combat-1175)

## Required inputs

Record both fleet ledgers, attacker and defender cultures, stationed status, relevant infrastructure and levels, directive state, SPUs, tactics, mission type, target resources, target building, world modifiers, and roster provenance. If one of those inputs is guessed, label the output as analysis rather than a confirmed matchup.

## Compare one change

Start from a saved fixture and change one variable: ship mix, support hull, infrastructure level, modifier, or target. This makes the marginal effect interpretable. Comparing unrelated fleets by headline power does not reveal why the result changed.

## Deterministic runs

For a published matchup, record seed and run count. The wiki’s current example uses seed `1175` and 200 runs for each culture pairing, with the complete fixture stored alongside the evidence registry. [Evidence](#evidence-combat-matrix-1175)

## Read beyond win rate

Inspect surviving ships, cargo, siege capability, structural result, and the state carried into a possible second wave. A fleet can win the ship battle while failing its raid or demolition objective.

## World boundary

Multiplayer can use a custom roster and global modifiers. A result is portable only when the destination world uses the same inputs. Always include world identifier and capture time for live-world analysis. [Evidence](#evidence-live-world-1175)

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

### Origin Wormhole victory

Canonical page: [/wiki/origin-wormhole/](https://riftbornewiki.317society.com/wiki/origin-wormhole/)

The Origin route wins by raising the culture-specific Wormhole at the central objective colony to the current standard target of level 100. The structure is Lens of Aster for Astraean, Furnace of Vorrak for Varkon, and Sanctum of Vael for Veil. [Evidence](#evidence-runtime-objectives-1175)

## Concentrated objective

Origin progress is geographically concentrated. Construction, capacity, garrison, reinforcement, and intelligence all converge on one visible site. This makes coordination simpler but gives every opponent a clear location to watch and contest.

## Capacity prerequisite

The Wormhole’s progress is constrained by the lower of the owner culture’s two capacity-building levels at the Origin. Use the culture-specific names shown by the interface and keep both prerequisites aligned with the intended construction path.

## Operational plan

Before committing, record friendly and hostile arrival windows, stationed defense, Astra runway, construction resources, capacity levels, and the faction’s coverage handoff. Decide what event pauses construction and what condition triggers reinforcement.

## Contesting the route

Opponents can pressure the single site, its supply lines, or the launch colonies providing coverage. Current intelligence matters because the observed garrison and build state are snapshots rather than guaranteed impact-time conditions.

## Active-world authority

The live victory panel remains authoritative if an operator changes campaign parameters. State the world and capture time whenever reporting distance to victory. [Evidence](#evidence-live-world-1175)

### Valor victory

Canonical page: [/wiki/valor-victory/](https://riftbornewiki.317society.com/wiki/valor-victory/)

The Valor route uses controlled Keystones, their current vision infrastructure, and Valor Conduits to generate faction-wide progress. Patch 11.75’s standard threshold is 250,000 faction Valor. [Evidence](#evidence-runtime-objectives-1175)

## Distributed objective network

Unlike the Origin route, Valor can depend on several sites. Distribution makes it harder for one attack to stop all progress, but it increases the number of garrisons, supply paths, construction states, and handoffs the faction must coordinate.

## Keystone tiers and ownership

The current client includes Inner, Border, and Outer Keystone sites. The live interface is authoritative for a particular site’s ownership, progress, available structures, contribution state, and defensive position.

## Conduit planning

Before investing, confirm the site can hold long enough to convert construction and contributions into useful Valor. Record friendly response time, hostile response time, capacity, pending contribution, conduit state, and the age of the intelligence used to judge nearby threats.

## Information risk

Enemy progress may be known only through ownership visibility or a spy snapshot. Treat observed totals as timestamped evidence and increase refresh cadence as either faction approaches the active threshold.

## Active-world authority

World configuration can affect pacing and context. Always confirm the live victory panel and identify the multiplayer world when quoting progress or an expected completion time. [Evidence](#evidence-live-world-1175)

## Multiplayer

### Markets, organizations, contracts, and diplomacy

Canonical page: [/wiki/markets-organizations-and-diplomacy/](https://riftbornewiki.317society.com/wiki/markets-organizations-and-diplomacy/)

Markets, organizations, contracts, and diplomacy are multiplayer systems whose available actions and values belong to the active world. [Evidence](#evidence-live-world-1175)

Use the current transaction confirmation screen for exchange quantities, reserved resources, cargo requirements, fees, shares, loans, and contract terms. This wiki does not publish universal prices or timers where the operator can change the world configuration.

Strategically, treat logistics and diplomacy as combat support: confirm who can ship resources, who can reinforce, which missions the current stance permits, and what public action will reveal to rivals.

## Markets

Treat every offer as a logistics commitment. Confirm what becomes reserved, what must travel, when value arrives, and what emergency cargo remains free. Price alone does not describe operational cost.

## Organizations and contracts

Read the active confirmation screens before accepting obligations. Shares, loans, fees, permissions, and timers are world-state facts and should be recorded with the transaction.

## Diplomacy

Before a coordinated mission, confirm the current relationship, who can change it, and whether every participant sees the same plan.

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

## Why it works

The best tile is the one that improves the empire’s network. Raw yield matters, but reach, support, and exposure determine whether that yield remains usable during war.

## Execution

- Record the tile’s displayed effects and allowed settlement type.
- Measure routes from current production bases and allies.
- Count hostile launch options inside the response window.
- State the tile’s role before spending the colonization hull.

## Risks and counterplay

- A high-yield isolated tile can become a permanent escort burden.
- Visual proximity is unreliable on a wrapped map.
- The wrong settlement type can block the infrastructure the plan expects.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Choosing a victory route

Canonical page: [/strategy/choosing-a-victory-route/](https://riftbornewiki.317society.com/strategy/choosing-a-victory-route/)

Victory-route selection compares a faction’s Origin access, Keystone network, defensive coverage, resource throughput, and information position. [Evidence](#evidence-runtime-objectives-1175)

Prefer the Origin Wormhole route when the faction can hold the central colony, sustain both capacity prerequisites, and protect a single highly visible construction project.

Prefer the Valor route when the faction can control and supply Keystones, grow Valor Conduits, and defend a distributed objective network long enough to reach the active-world threshold.

The strongest posture can threaten both routes so opponents cannot concentrate every response on one site. Confirm the live victory panel before committing; the operator owns campaign settings. [Evidence](#evidence-live-world-1175)

## Compare concentration and distribution

The Origin path concentrates progress and defense at one visible central colony. The Valor path distributes control and construction across a Keystone network. Compare which geometry the faction’s logistics and active coverage can sustain.

## Decision inputs

Record ownership, friendly and hostile arrival times, prerequisites, capacity, resources, garrisons, and the age of enemy observations. Separate confirmed values from assumptions.

## Preserve flexibility

Early staging and intelligence can support either route. Commit when one path offers a defensible next milestone, then communicate its abort condition faction-wide.

### Official multiplayer strategy

Canonical page: [/strategy/official-multiplayer/](https://riftbornewiki.317society.com/strategy/official-multiplayer/)

Official multiplayer rewards coordinated logistics, current intelligence, response-time organization, and objective timing. [Evidence](#evidence-client-build-1175)

The official world is real-time, so single-player time-advance tactics do not transfer. Its roster, modifiers, population, faction structure, and objective state are live-world values; capture them with a world identifier and timestamp before using them in a plan. [Evidence](#evidence-live-world-1175)

The best approach is operational:

## Why it works

Persistent multiplayer rewards plans that survive real absence, asynchronous allies, and opponent reaction. The strongest plan is legible enough for allies to continue without its author online.

## Execution

- Record the active world identifier and settings used.
- Organize coverage by response time and active period.
- Timestamp intelligence and objective observations.
- Leave concise launch, resupply, and abort conditions.

## Risks and counterplay

- Single-player pacing assumptions do not transfer.
- Operator-controlled values can invalidate copied build orders.
- A plan requiring everyone online simultaneously is fragile.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Join a faction and become legible

Canonical page: [/strategy/join-a-faction-and-become-legible/](https://riftbornewiki.317society.com/strategy/join-a-faction-and-become-legible/)

Join a faction and become legible is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Independent play is explicitly high risk. On day one, share your coordinates, culture, active hours, intended role, and nearby threats. Reliability gets you reinforcements and intelligence; silence makes even a large empire strategically invisible.

## Why it works

Coordination converts personal assets into faction options. Allies can reinforce, supply, or share intelligence only when they understand where you are, when you respond, and what role your empire serves.

## Execution

- Share location, culture, active hours, and intended role.
- Report threats with coordinates, timestamps, and arrival windows.
- Volunteer one repeatable capability.
- Update the faction when your capacity changes.

## Risks and counterplay

- Oversharing exact launches increases leakage.
- Promising unsustainable coverage damages coordination.
- A distant group may provide little timely military support.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

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

## Why it works

A faction’s useful neighborhood is defined by arrival windows, not by how close names appear on the map.

## Execution

- Measure representative routes for reaction, cargo, and siege fleets.
- Group players whose active periods and arrival times overlap.
- Assign intelligence, emergency Astra, and heavy response roles.
- Recalculate cells after expansion or major fleet-speed changes.

## Risks and counterplay

- One universal map radius ignores different hull speeds.
- A cell without night or off-hour coverage has a predictable gap.
- Centralizing every reserve can lengthen response to secondary fronts.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Separate public plans from launch orders

Canonical page: [/strategy/separate-public-plans-from-launch-orders/](https://riftbornewiki.317society.com/strategy/separate-public-plans-from-launch-orders/)

Separate public plans from launch orders is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Maintain a broad faction plan (“secure western Inner Keystone”), but share exact fleet composition and launch time only with participants. Assume enemy spy snapshots and social leakage exist.

## Why it works

A faction needs shared intent but does not need every operational detail exposed to every observer. Separating objective from execution reduces the value of social leakage.

## Execution

- Publish the broad objective and support needs.
- Keep exact composition, route, and launch time with participants.
- Give nonparticipants clear defensive or logistics tasks.
- Reveal more only when coordination benefit exceeds information risk.

## Risks and counterplay

- Too much secrecy causes duplicated action.
- A small planning group can become a single point of failure.
- In-game observations may reveal the operation anyway.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Build a logistics spine

Canonical page: [/strategy/build-a-logistics-spine/](https://riftbornewiki.317society.com/strategy/build-a-logistics-spine/)

Build a logistics spine is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Use backline production, forward launch hubs, and fortified transfer nodes. Keep slow siege behind the line until the target is confirmed. Pre-position cargo and Astra before the war, because market travel after the alarm is often too late.

## Why it works

A logistics spine reduces the number of long, fragile movements required to keep a front supplied. It is a network of production bases, transfer points, and launch bases chosen by actual travel time.

## Execution

- Identify the front’s likely launch and fallback points.
- Place cargo and Astra behind the exposed edge, not on it.
- Move siege only after intelligence establishes a structural target.
- Give each node a named owner and resupply condition.

## Risks and counterplay

- A single obvious transfer node becomes a high-value target.
- Forward stockpiles create losses if the front collapses.
- Combining every fleet at one hub can leave the rear undefended.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Run an intelligence cycle

Canonical page: [/strategy/run-an-intelligence-cycle/](https://riftbornewiki.317society.com/strategy/run-an-intelligence-cycle/)

Run an intelligence cycle is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Use one owner per priority target, timestamp reports, and avoid duplicate blind probes. Re-spy before the fleet reaches the point where it cannot be recalled or retasked. Track enemy shipyard levels because response time can matter more than the observed garrison.

## Why it works

Intelligence is a process, not a single report. Collection, timestamping, comparison, and refresh cadence determine whether a fleet launches against reality or history.

## Execution

- Name the decision the report must support.
- Assign one collector and record capture time.
- Compare changes in garrison, infrastructure, and objective state.
- Schedule the final refresh before the force passes its practical decision point.

## Risks and counterplay

- More reports are not better if nobody reconciles them.
- Predictable probing can disclose the target.
- A report without travel-time context may already be obsolete.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

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

## Why it works

A favorable report can still be a strategic loss when replacement time, travel exposure, or the absence of siege leaves the map unchanged.

## Execution

- Write the desired map outcome before composing the fleet.
- Price replacement and return exposure alongside the attack.
- Assign defense for every launch base that will be weakened.
- Define the follow-up action and the condition that cancels it.

## Risks and counterplay

- Tactical success can strand the fleet far from the next objective.
- Allies may optimize for different outcomes unless the purpose is explicit.
- Repeated commitment can turn sunk cost into campaign failure.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Shift to objectives before the leaderboard tells you to

Canonical page: [/strategy/shift-to-objectives-before-the-leaderboard-tells-you-to/](https://riftbornewiki.317society.com/strategy/shift-to-objectives-before-the-leaderboard-tells-you-to/)

Shift to objectives before the leaderboard tells you to is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Economic rank is not victory. In the middle game, choose an objective route, reserve the resources shown by its current contribution and construction screens, build staging bases, and schedule coverage. A faction that begins coordinating only after an enemy Wormhole or Valor lead becomes visible is already late.

## Why it works

Economic rank measures capacity, while victory requires converting capacity into the active objective track. The transition has lead time: staging, defense, construction, intelligence, and faction scheduling.

## Execution

- Read the live victory panel and compare both paths.
- Identify the route’s next defensible milestone.
- Build logistics and coverage before public progress accelerates.
- Reserve only the resources shown by current objective screens.

## Risks and counterplay

- Moving too early can expose an underbuilt economy.
- Moving too late lets an opponent force every response.
- Public position may lag hidden preparation.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Advanced tactics and edge cases

Canonical page: [/strategy/advanced-tactics-and-edge-cases/](https://riftbornewiki.317society.com/strategy/advanced-tactics-and-edge-cases/)

Advanced tactics use documented interactions and edge cases to create advantages that are not obvious from headline statistics. [Evidence](#evidence-client-build-1175)

These tactics follow from confirmed rules. “Cheese” means exploiting incentives and timing, not abusing bugs or unauthorized access.

## How to use this section

Every strategy page identifies the verified mechanic it depends on, the assumptions required for the idea to work, and the most direct counterplay. “Advanced” does not mean universally stronger; it means the tactic extracts value from timing, information, fleet separation, or an opponent’s planning habits.

## Evaluation rule

Before using a tactic, verify its prerequisite page, substitute the active world’s roster and modifiers, and define an abort condition. If the tactic depends on a stale report or an unsupported numerical conversion, it is not ready to launch.

The most transferable ideas in this section concern response-time organization, mission-specific fleets, objective information, and logistics.

### Astra trap

Canonical page: [/strategy/astra-trap/](https://riftbornewiki.317society.com/strategy/astra-trap/)

Astra trap is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Raid Astra shortly before a known upkeep deficit or incoming reinforcement. The loot may matter less than shortening the target’s displayed runway. Do not assume a universal attrition order or interval; both must be confirmed in the current runtime before the tactic is timed.

**Counter:** preserve an Astra reserve, arrange emergency shipments, and alert allies before the runway becomes critical.

## Why it works

The tactic converts an economic raid into a timing attack. The meaningful target is not a fixed amount of Astra; it is the point at which the colony’s displayed runway becomes shorter than its resupply or reinforcement response.

## Execution

- Obtain a recent resource and garrison observation.
- Estimate the runway again with any incoming ships included.
- Compare a raid, blockade pressure, and a direct attack before choosing the lowest-cost way to create the deficit.
- Schedule the follow-up only after the first result is known.

## Risks and counterplay

- A shipment can erase the deficit before it matters.
- A stale upkeep estimate can make the entire sequence irrelevant.
- Repeated raids may disclose the real follow-up target.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Shield-grinding sacrificial attacks

Canonical page: [/strategy/shield-grinding-sacrificial-attacks/](https://riftbornewiki.317society.com/strategy/shield-grinding-sacrificial-attacks/)

Shield-grinding sacrificial attacks is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Direct attacks can reduce defensive-structure integrity separately from siege damage, including attacks that do not take the colony. This makes sequential waves a possible setup for a later siege, but the amount removed is scenario-dependent and must be previewed or simulated for the active world. [Evidence](#evidence-runtime-combat-1175)

**Counter:** detect launch waves, reinforce before the final strike, repair/rotate defenses if the interface permits, and retaliate against the launch base.

## Why it works

Sequential attacks can exchange disposable fleet value for reduced defensive-structure integrity before a later siege. It is useful only when the later wave gains more than the setup waves cost.

## Execution

- Simulate the complete sequence, not just the final battle.
- Record expected integrity after each wave.
- Keep the siege force separate until the defense has actually changed.
- Abort if reinforcement or repair invalidates the sequence.

## Risks and counterplay

- Setup waves reveal target and timing.
- Integrity change is scenario-dependent.
- A defender can punish the launch bases while the main force waits.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Hangar feint

Canonical page: [/strategy/hangar-feint/](https://riftbornewiki.317society.com/strategy/hangar-feint/)

Hangar feint is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Only stationed ships defend. A base can appear wealthy but weak because hulls are hangared—or can invite an attack and station them before arrival.

**Counter:** refresh intel near impact and model enemy reaction time.

## Why it works

Because only stationed ships defend, the visible defensive state can change when stored hulls are reassigned. The tactic exploits the delay between an attacker’s observation and impact.

## Execution

- Measure the attacker’s travel time and likely last intelligence refresh.
- Keep the intended defenders available rather than committed elsewhere.
- Station them only when doing so will not create an upkeep crisis.
- Prepare a second response in case the attacker recalls.

## Risks and counterplay

- Fresh espionage can expose the change.
- Astra limitations can make the apparent reserve unusable.
- Holding too much in reserve sacrifices pressure elsewhere.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Slowest-hull sabotage—self-inflicted edition

Canonical page: [/strategy/slowest-hull-sabotage-self-inflicted-edition/](https://riftbornewiki.317society.com/strategy/slowest-hull-sabotage-self-inflicted-edition/)

Slowest-hull sabotage—self-inflicted edition is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

One siege or colony hull can ruin an interception window. Keep response, cargo, siege, and colonization packages separate until the final assembly point.

## Why it works

A fleet inherits a mission tempo from its participating hulls. Adding a specialized slow hull too early can cost the interception or reinforcement window the combat ships were meant to meet.

## Execution

- Check the launch preview after every composition change.
- Move siege, cargo, and colonization packages separately when possible.
- Choose an assembly point based on arrival time.
- Merge only when the final mission requires the combined package.

## Risks and counterplay

- Separate packages can be intercepted individually.
- Late assembly can miss the coordinated launch.
- World-specific speed modifiers may change the expected bottleneck.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Wrapped-edge backdoor

Canonical page: [/strategy/wrapped-edge-backdoor/](https://riftbornewiki.317society.com/strategy/wrapped-edge-backdoor/)

Wrapped-edge backdoor is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Players read a rectangular map emotionally even though it is toroidal. Expand and launch across the seam; measure both routes.

## Why it works

The galaxy wraps, so a displayed edge is a seam rather than a wall. Players who plan only through the center can leave a shorter route unobserved.

## Execution

- Measure both wrapped directions in the movement preview.
- Map friendly and hostile arrival times across the seam.
- Use the route for expansion, reconnaissance, or reinforcement only when support can follow.
- Repeat the calculation for the actual hull mix.

## Risks and counterplay

- The same shortcut is available to the opponent.
- A seam outpost can be isolated from conventional support.
- Visual map intuition should never replace the displayed travel time.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Defender-mix manipulation

Canonical page: [/strategy/defender-mix-manipulation/](https://riftbornewiki.317society.com/strategy/defender-mix-manipulation/)

Defender-mix manipulation is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Power weights anti-light/anti-heavy values against fleet composition. Feeding or removing a screen changes the opponent’s weighted efficiency. Scout compositions, then counter the share—not the ship count.

## Why it works

Combat estimates react to the opposing light/heavy mix. The useful question is therefore which target share the defender presents, not merely how many hulls it owns.

## Execution

- Record the defender’s current light and heavy shares.
- Preview more than one attacking mix.
- Account for infrastructure and reinforcements separately.
- Use a small first action only when its strategic purpose justifies revealing intent.

## Risks and counterplay

- A refreshed garrison can reverse the preferred matchup.
- Displayed aggregate power can conceal a poor target-class fit.
- Sacrificial setup waves may cost more than the efficiency gained.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Tracking cap efficiency

Canonical page: [/strategy/tracking-cap-efficiency/](https://riftbornewiki.317society.com/strategy/tracking-cap-efficiency/)

Tracking cap efficiency is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Tracking/evasion edge clamps at ±20%. Once you hit the cap against the expected target, more tracking has no direct power benefit in that matchup. Spend the next augmentation slot elsewhere.

## Why it works

Tracking investment has diminishing decision value once the current matchup reaches its implemented edge limit. Additional investment should be judged by whether it helps a different expected opponent.

## Execution

- Identify the target class and current evasion.
- Confirm the effective edge in the current preview.
- Compare the next tracking improvement with attack, defense, cargo, speed, or upkeep alternatives.
- Retest whenever the opposing mix changes.

## Risks and counterplay

- A capped matchup against one fleet may be uncapped against another.
- A roster update can change the comparison.
- Aggregate power may hide which target class receives the benefit.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Raid-with-cargo, attack-with-siege

Canonical page: [/strategy/raid-with-cargo-attack-with-siege/](https://riftbornewiki.317society.com/strategy/raid-with-cargo-attack-with-siege/)

Raid-with-cargo, attack-with-siege is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

This sounds basic, but it is the strongest economic cheese because many players optimize only combat power. Calculate loot ceiling before launching; strip siege from raids and cargo from pure demolition unless it serves the return plan.

## Why it works

Mission design should follow the intended result. Raids need surviving cargo to extract value; structural attacks need surviving siege to remove building levels.

## Execution

- Write “loot” or “structure” as the primary objective.
- Use the matching simulator mode and current target state.
- Remove hulls whose only contribution is to the other mission type unless they serve a planned follow-up.
- Record the expected ceiling before launch.

## Risks and counterplay

- A mixed fleet may be slower and worse at both tasks.
- A combat win can conceal zero economic or structural progress.
- Unexpected defenders can change which support hulls survive.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Nano Storage forcing function

Canonical page: [/strategy/nano-storage-forcing-function/](https://riftbornewiki.317society.com/strategy/nano-storage-forcing-function/)

Nano Storage forcing function is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

At Nano Storage 20, 80% is hidden. Against such a target, repeated raids may be theater. Either attack with siege, hit logistics shipments, or choose a less protected economy.

## Why it works

When the target’s exposed resources are small, more raid attempts do not solve the real constraint. The attacker must change mission, target logistics in motion, or choose another economy.

## Execution

- Use the current raid preview to identify exposed value.
- Compare the expected haul with fleet risk and travel time.
- If structure removal is the goal, rebuild the force around surviving siege.
- If neither path pays, redirect pressure instead of escalating automatically.

## Risks and counterplay

- A defender may use apparent protection as bait.
- Siege escalation can turn an economic action into a costly war.
- The exact protection level must be verified from current infrastructure.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Keystone funding timing

Canonical page: [/strategy/keystone-donation-delay/](https://riftbornewiki.317society.com/strategy/keystone-donation-delay/)

Keystone funding timing is a faction strategy built around the current Valor path. [Evidence](#evidence-runtime-objectives-1175)

Confirm the Keystone’s current vision capacity, pending contribution, Valor Conduit level, defensive coverage, and active-world victory panel before sending faction resources. Funding that outruns capacity or leaves the site undefended can create visible progress without durable advantage.

## Why it works

Objective funding creates value only when the site can hold and convert it. Delaying a contribution can preserve flexibility while defenses, capacity, or conduit construction catch up.

## Execution

- Read the live victory and Keystone panels.
- Confirm ownership, current capacity, pending contributions, and defense.
- Coordinate the contribution with the faction’s coverage window.
- Recheck immediately before committing because objective information ages quickly.

## Risks and counterplay

- Excessive delay gives the opposing faction uncontested time.
- Public coordination may reveal the timing window.
- A contribution without defense can become progress for the next controller rather than your faction.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### SPU delivery timing

Canonical page: [/strategy/daily-spu-timing/](https://riftbornewiki.317society.com/strategy/daily-spu-timing/)

SPU delivery timing is a strategy pattern whose schedule must be read from the active site. [Evidence](#evidence-current-data-1175)

Align purchases, fleet refits, and major launches just after a confirmed delivery when practical. Rivals may calculate against the previously visible configuration, but the advantage disappears if the schedule or installed bonus is guessed incorrectly.

## Why it works

An SPU changes value only when it is delivered, installed, and applied to a system that will be used. Coordinating a major action after a confirmed improvement can invalidate an opponent’s older comparison.

## Execution

- Read the active site’s current delivery state.
- Choose the recipient before delivery.
- Rebuild the relevant preview with the installed effect.
- Launch only if the revised result changes the decision.

## Risks and counterplay

- A guessed schedule can idle fleets or resources.
- The opponent may refresh intelligence after installation.
- Waiting can surrender a better immediate action.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Veil deniable-raider base

Canonical page: [/strategy/veil-deniable-raider-base/](https://riftbornewiki.317society.com/strategy/veil-deniable-raider-base/)

Veil deniable-raider base is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Concentrate the active roster’s espionage, cargo, and travel advantages at one launch hub. The result is a selective raiding base whose composition can change quickly after fresh intelligence. Named abilities and diplomatic modifiers must be confirmed in the active world before being included in the calculation.

## Why it works

A specialized launch base can turn current information, cargo, and travel advantages into selective economic pressure without committing the entire empire.

## Execution

- Verify the active Veil roster and diplomatic modifiers.
- Choose a hub by actual route coverage.
- Keep intelligence and raid cargo available together.
- Move or stand down when the hub becomes predictable.

## Risks and counterplay

- Repeated launches expose the hub.
- Weak Astra or replacement income makes raiding self-defeating.
- Unverified named abilities must not enter the calculation.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Varkon window stack

Canonical page: [/strategy/varkon-window-stack/](https://riftbornewiki.317society.com/strategy/varkon-window-stack/)

Varkon window stack is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Concentrate current Varkon bonuses, fresh intelligence, allied arrival times, and multiple launches inside the same response window. Treat any ability name, duration, and cooldown as a live Codex value rather than a permanent rule.

## Why it works

Concentrating several verified advantages inside one response window can produce more value than using each as soon as it becomes available.

## Execution

- Confirm every active bonus and duration in the current Codex.
- Refresh target intelligence.
- Synchronize allied arrivals by displayed travel time.
- Define which launch proceeds if one participant misses the window.

## Risks and counterplay

- Waiting may surrender an earlier opportunity.
- A stale input can invalidate the stack.
- Concentrated fleets leave origin colonies exposed.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.

### Market capital lock

Canonical page: [/strategy/market-capital-lock/](https://riftbornewiki.317society.com/strategy/market-capital-lock/)

Market capital lock is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Cargo ships are reserved by live offers and trade legs travel. An attractive offer can immobilize a trader’s capacity. Post only with a liquidity plan; exploit opponents who tie up all cargo by pressuring elsewhere.

## Why it works

Market activity competes with military logistics for cargo and attention. A profitable offer can still be harmful if it reserves the capacity needed for emergency movement.

## Execution

- Separate trade cargo from the emergency reserve.
- Check current obligations before posting an offer.
- Set a condition for cancelling or declining low-priority trades.
- Track arrival time rather than treating acceptance as immediate liquidity.

## Risks and counterplay

- World settings can change fees, travel, and reservation behavior.
- An opponent may pressure the region while cargo is committed.
- Over-reserving for emergencies can also leave productive trade idle.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Empty-base deletion

Canonical page: [/strategy/empty-base-deletion/](https://riftbornewiki.317society.com/strategy/empty-base-deletion/)

Empty-base deletion is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Siege spends against building levels and removes a non-spawn base when everything reaches zero. If conquest is unnecessary, a focused demolition can erase the position and its reinforcement geometry.

## Why it works

A demolition campaign is about removing a position, not winning a single ship battle. The attack must preserve enough siege capability to convert fleet victory into building loss.

## Execution

- Decide whether removal is better than repeated raiding or containment.
- Select the exact building target in the current simulator.
- Protect siege behind the combat line.
- Re-simulate after every report because the remaining structure changes the next attack.

## Risks and counterplay

- The defender can reinforce between waves.
- A victory without surviving siege does not achieve the map objective.
- Removing a base may open the tile or settlement capacity for a replacement elsewhere.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

### Objective information asymmetry

Canonical page: [/strategy/objective-information-asymmetry/](https://riftbornewiki.317society.com/strategy/objective-information-asymmetry/)

Objective information asymmetry is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)

Enemy objective progress is snapshot-based. A faction can accelerate between spy cycles or deliberately present stale progress. Rotate spies and avoid announcing donation timing.

## Why it works

Objective progress observed through espionage is a timestamped snapshot. A coordinated faction can change its position between reports, so uncertainty itself must be included in planning.

## Execution

- Assign repeated observations to named players.
- Store capture time with every report.
- Increase refresh frequency as the victory margin narrows.
- Keep exact friendly contribution timing within the smallest useful group.

## Risks and counterplay

- Duplicate probes waste intelligence capacity.
- Overconfidence in a stale report can miss a victory push.
- Excessive secrecy can prevent allies from providing coverage.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.

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

## Why the order matters

Inbound threats and faction messages come first because they can invalidate every queued plan. Astra and capacity follow because they determine whether assets survive and production continues. Only then should a commander optimize new construction or launches.

## Handoff note

Before leaving, record the next completion, next cap, critical arrival, objective change, and any decision an ally may need to make.

## Periodic review

Reassess base roles, response-time cells, objective route, and obsolete market commitments. Repetition is valuable only while the checklist reflects the current campaign.

## Reference

### Carrier values and custom rosters

Canonical page: [/wiki/carrier-documentation-discrepancy/](https://riftbornewiki.317society.com/wiki/carrier-documentation-discrepancy/)

Carrier effects are roster-dependent. The active multiplayer operator can supply a custom or detached ship roster, so a carrier coefficient copied from another campaign is not reliable. [Evidence](#evidence-live-world-1175)

Use the current Codex roster and combat preview for the active world. This wiki does not publish a universal carrier percentage until the value is exposed by a current, ruleset-specific source.

## Why a universal value is unsafe

Carrier strength depends on the carrier entry, the ships receiving its effect, and the active combat context. A custom roster can change any of those inputs while leaving the hull’s general role intact.

## How to document a carrier test

Record the world identifier, capture time, carrier hull and count, supported fleet, both cultures, target composition, infrastructure, directives, SPUs, mission, simulator seed, and number of runs. Compare the same fixture with and without the carrier rather than quoting the resulting aggregate power alone.

## Practical decision

Use a carrier when its measured marginal result is worth its cost, speed effect on the fleet, upkeep, and opportunity cost. Re-run the comparison after a roster or world-setting change.

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

## Interpreting directive progress

A stage number identifies progress through the path. It must not be converted into a proportional combat bonus unless the current directive table grants one at that stage.

## Planning the requirement

Use the active preview to identify a defender satisfying the stage requirement, then judge the battle on strategic value as well as eligibility. Spending an irreplaceable force solely for directive progress can be a poor trade.

## After completion

Re-run fleet comparisons with the completed effect present and label directive state whenever publishing a power result. [Evidence](#evidence-runtime-combat-1175)

### Solis Battery

Canonical page: [/wiki/solis-battery/](https://riftbornewiki.317society.com/wiki/solis-battery/)

Solis Battery is the Astraean static attack building. It adds flat attack against light and heavy hulls and fires with the stationed garrison while the building remains standing. It does not use shield integrity. [Evidence](#evidence-building-effects-1175)

Its effect is culture-dependent. The active Codex and combat simulator should be used for a specific level and world; this page deliberately avoids copying a value from defensive infrastructure or converting its level into an unsupported fleet-power total.

The Varkon and Veil structures in the same role are Warbattery and Duskbattery. [Evidence](#evidence-building-names-1175)

## Role in defense

Solis Battery contributes attack against both light and heavy hulls while it stands and a stationed garrison is present. It strengthens the exchange but does not replace the garrison, create cargo, or provide siege capability.

## Distinguish it from Solis Aegis

Solis Aegis is the Astraean defensive-structure role and participates in integrity mechanics. Solis Battery is static attack infrastructure. Comparing a Battery level directly with integrity or calling it a shield produces an invalid forecast.

## Evaluating a level

Use the Codex and simulator with exact Battery level, stationed fleet, enemy mix, and active-world modifiers. Publish the result only with those inputs and roster provenance. [Evidence](#evidence-runtime-combat-1175)

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

### Live-world values and ruleset boundaries

Canonical page: [/wiki/live-world-values/](https://riftbornewiki.317society.com/wiki/live-world-values/)

A core mechanic belongs to build `a7b5c7c`; a live-world value belongs to a particular multiplayer world at a particular time. The operator controls settings including world seed, pacing, simulation time, faction configuration, global modifiers, and ship roster. [Evidence](#evidence-live-world-1175)

## Core examples

Core evidence can establish that only stationed ships defend, that fleet movement uses participating hulls and modifiers, that settlement slots count current qualifying ownership, or that siege is required for structural damage. These claims still need the exact build that implements them.

## Live-world examples

Ship statistics, displayed fleet power, current ownership, garrisons, objective progress, prices, active offers, travel previews, population, faction membership, and global modifiers are observations. They can change without the wiki’s core explanation becoming wrong.

## Required label

Record world identifier, capture time, patch, build, roster provenance, and the screen or command used. For combat, include the complete fixture. For an objective, include the site and visibility source. For a market value, include the transaction state.

## Avoid false precision

Do not average incompatible worlds or quote a current observation as a permanent formula. When a number cannot be reproduced from the same build and ruleset, publish the method for reading it rather than the number.

## Update policy

If the installed client changes, confirmed core claims pause until affected evidence is revalidated. Live-world observations remain historical records with their original timestamps, not proof of the new state.
