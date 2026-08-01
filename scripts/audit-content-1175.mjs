import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const directory = path.join(process.cwd(), 'wiki', 'content', 'articles');

const rewrites = {
  'resources.md': {
    body: `Riftborne tracks four colony resources: Vulkron, Aurelite, Deuterium, and Astra. Each resource has its own current amount, capacity, and hourly trend. [Evidence](#evidence-runtime-economy-1175)

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
`
  },
  'the-storage-rule.md': {
    body: `Storage determines how long a colony can continue producing before a resource reaches its individual cap. [Evidence](#evidence-runtime-economy-1175)

For Astraean colonies, Solvault supplies Vulkron, Aurelite, and Deuterium capacity, while Heliovex supplies Astra capacity. The corresponding Varkon buildings are Skarncache and Voltforge; the Veil buildings are Nyxvault and Gloamwell. [Evidence](#evidence-building-names-1175)

The captured live-world Heliovex entry reports Astra targets of 2,750 at level 1, 5,000 at level 5, and 100,000 at level 20. These are campaign values, not universal constants; consult the active colony detail before calculating an upgrade. [Evidence](#evidence-storage-screen-1175)

Treat capacity as a scheduling tool:

- Upgrade when production would cap before the next scheduled login.
- Move or market surpluses when another colony can use them.
- At objective sites, keep both culture-specific capacity buildings aligned when the objective detail says its next level is gated by the lower capacity level.
`
  },
  'first-login-a-safe-opening.md': {
    body: `The opening phase establishes an empire’s production schedule, defensive safety, and first expansion route. [Evidence](#evidence-runtime-economy-1175)

Begin by reading the home colony’s four current amounts, individual caps, and hourly trends. The exact starting levels and stockpile are campaign settings, so this wiki does not assume a universal opening inventory. [Evidence](#evidence-live-world-1175)

Queue only what the displayed stockpile can support, check when each resource will cap, and choose the first expansion route from visible geography rather than a fixed build order.
`
  },
  'key-structures.md': {
    data: {
      aliases: ['Solis Battery', 'Solis Aegis', 'Solvault', 'Heliovex', 'Skarncache', 'Voltforge', 'Nyxvault', 'Gloamwell', 'shipyard']
    },
    body: `Key structures provide the economic, military, capacity, logistics, and defensive effects used by specialized colonies. [Evidence](#evidence-building-effects-1175)

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
`
  },
  'solis-battery.md': {
    data: {
      summary: 'Solis Battery is Astraean static attack infrastructure that contributes against light and heavy attackers while the building stands.',
      verification: 'confirmed',
      infobox: {
        Culture: 'Astraean',
        Role: 'Static attack infrastructure',
        Targets: 'Light and heavy hulls',
        Patch: '11.75'
      }
    },
    body: `Solis Battery is the Astraean static attack building. It adds flat attack against light and heavy hulls and fires with the stationed garrison while the building remains standing. It does not use shield integrity. [Evidence](#evidence-building-effects-1175)

Its effect is culture-dependent. The active Codex and combat simulator should be used for a specific level and world; this page deliberately avoids copying a value from defensive infrastructure or converting its level into an unsupported fleet-power total.

The Varkon and Veil structures in the same role are Warbattery and Duskbattery. [Evidence](#evidence-building-names-1175)
`
  },
  'objectives-and-victory.md': {
    data: {
      summary: 'Patch 11.75 exposes two standard progress tracks: an Origin Wormhole victory and a faction Valor victory generated from controlled Keystones.'
    },
    body: `Patch 11.75 exposes two standard victory tracks: the Origin Wormhole and faction Valor. [Evidence](#evidence-runtime-objectives-1175)

## Origin Wormhole

The Origin is the objective colony at \`(0,0)\`. Its culture-specific Wormhole must reach level 100. The Wormhole names are Lens of Aster for Astraean, Furnace of Vorrak for Varkon, and Sanctum of Vael for Veil.

The Wormhole cannot advance beyond the lower level of that colony’s two culture-specific capacity buildings. The interface names those buildings for the owner’s culture.

## Valor

Controlled Keystones can build a culture- and tier-specific vision structure and a Valor Conduit. Valor Conduits generate faction Valor; the standard victory threshold in the current client is 250,000 Valor. Generation depends on conduit level and the Keystone’s current Visions. [Evidence](#evidence-runtime-objectives-1175)

Keystone names vary by culture and tier. Current worlds can contain Inner, Border, and Outer Keystones.

## World settings

The multiplayer operator can override campaign settings and owns the world state. Always confirm the active victory panel before committing faction resources. [Evidence](#evidence-live-world-1175)
`
  },
  'sources-and-confidence.md': {
    data: {
      summary: 'This wiki uses current-client evidence, sanitized UI transcripts, deterministic simulations, and separately labeled live-world observations.'
    },
    body: `This wiki targets the installed 11.75 client, build \`a7b5c7c\`. [Evidence](#evidence-client-build-1175)

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
`
  },
  'production-scaling-caveat.md': {
    data: {
      summary: 'Production increments are campaign inputs; the active colony preview is the authority for a world’s current hourly output.',
      verification: 'confirmed'
    },
    body: `Resource-building increments are campaign inputs. The current executable applies the configured increment to the matching production building, but a wiki-wide coefficient would be wrong for worlds that change that setting. [Evidence](#evidence-runtime-economy-1175)

Use the active colony preview for current hourly production and the projected change shown for an upgrade. Comparisons between worlds must state the campaign settings used.
`
  },
  'carrier-documentation-discrepancy.md': {
    data: {
      title: 'Carrier values and custom rosters',
      summary: 'Carrier effects must be read from the active roster and combat preview because multiplayer worlds can use detached or modified ship statistics.',
      verification: 'observed'
    },
    body: `Carrier effects are roster-dependent. The active multiplayer operator can supply a custom or detached ship roster, so a carrier coefficient copied from another campaign is not reliable. [Evidence](#evidence-live-world-1175)

Use the current Codex roster and combat preview for the active world. This wiki does not publish a universal carrier percentage until the value is exposed by a current, ruleset-specific source.
`
  },
  'varkon.md': {
    data: {
      summary: 'Varkon favors deliberate offensive timing, culture-specific military infrastructure, and fleets built for a chosen campaign window.'
    },
    body: `Varkon is an offensive culture whose current infrastructure includes Warspire, Skarncache, Voltforge, Kraghwall, Warbattery, Clawdock, Warfoundry, and Breach Forge. [Evidence](#evidence-building-names-1175)

Its practical strength is concentrated force: assemble a fleet for a defined target, confirm travel and return exposure, and coordinate the launch window with allies. Numerical culture modifiers and ship values must be read from the active Codex because multiplayer worlds can use a customized roster. [Evidence](#evidence-live-world-1175)
`
  },
  'astraean.md': {
    data: {
      summary: 'Astraean uses solar-themed infrastructure, strong defensive tools, and a measured economy-first style.'
    },
    body: `Astraean’s current infrastructure includes Sunspire, Solvault, Heliovex, Astergate, Solis Aegis, Solis Battery, Solar Slipway, Auric Drydock, and Helion Bombard. [Evidence](#evidence-building-names-1175)

Astraean strategy favors protected production clusters and deliberate reinforcement. Culture and ship modifiers can vary with the active roster and campaign, so exact discounts, speeds, and combat values belong to the current Codex rather than a universal table. [Evidence](#evidence-live-world-1175)
`
  },
  'veil.md': {
    data: {
      summary: 'Veil uses shadow-themed infrastructure and rewards asymmetric positioning, mobility, and information control.'
    },
    body: `Veil’s current infrastructure includes Nightspire, Nyxvault, Gloamwell, Whisperway, Duskshroud, Duskbattery, Nocturnal Slipway, Umbral Drydock, and Rift Ruinery. [Evidence](#evidence-building-names-1175)

Veil strategy favors asymmetric launch positions, concealed intentions, and selective fights. Exact culture bonuses, Eldritch upgrade costs, and roster values are world-sensitive and must be read from the active Codex before committing resources. [Evidence](#evidence-live-world-1175)
`
  },
  'buildings-and-base-roles.md': {
    body: `Buildings determine a colony’s production, capacity, logistics, military output, and defensive role. [Evidence](#evidence-building-effects-1175)

Current building names are culture-specific. A role should therefore be identified by its displayed effect, not by carrying terminology from another culture into the article.

Additional copies and maximum levels are not uniform across every structure. The construction screen states whether another copy is available and what prerequisite unlocks it. Use that screen for the active campaign rather than assuming that all structures share one cap.

Specialization remains a strategic choice: production colonies protect continuous output, shipbuilding colonies protect queues and Astra, logistics colonies shorten supply paths, and fortified colonies combine stationed ships with current defensive infrastructure.
`
  },
  'combat-power.md': {
    data: {
      summary: 'Combat power is a matchup estimate produced from the active roster, fleet composition, infrastructure, and current modifiers.',
      evidence: ['client-build-1175', 'runtime-fleets-1175', 'runtime-combat-1175', 'combat-matrix-1175']
    },
    body: `Combat power is a matchup estimate, not a fixed conversion between a displayed number and ship count. [Evidence](#evidence-runtime-combat-1175)

The active roster, attacker and defender cultures, light/heavy mix, infrastructure, directives, SPUs, tactics, and world modifiers can all change a preview. This is why a displayed power value cannot answer “how many ships?” without the exact scenario.

## Reproducible example

The 11.75 built-in simulator was run with seed 1175 for 200 trials per culture pairing. The profile used 15 attacking light fighters against 10 defending destroyers with level-5 central infrastructure. In all nine culture pairings, the defender won every run and the attacking force was lost. [Evidence](#evidence-combat-matrix-1175)

This result proves only that recorded fixture. It should not be generalized to a custom multiplayer roster or a different building, directive, SPU, or tactics configuration.
`
  },
  'fleet-power.md': {
    data: {
      summary: 'Fleet power is a context-sensitive preview and has no universal conversion to a number of ships.'
    },
    body: `Fleet power is a context-sensitive preview rather than a fixed conversion from headcount. [Evidence](#evidence-runtime-combat-1175)

A displayed value such as **3,200 power has no universal ship count**. It can describe materially different fleets because hull lines, culture, roster settings, infrastructure, directives, SPUs, tactics, mission type, and the opposing composition all affect the estimate.

Use the in-game combat simulator with the exact active-world roster. Record both sides, infrastructure, modifiers, and mission type whenever quoting a power result.
`
  },
  'shield-integrity.md': {
    body: `Shield integrity represents the current contribution of a colony’s culture-specific defensive structure. Direct attacks can reduce that contribution even when the attacking force fails to capture the colony. [Evidence](#evidence-runtime-combat-1175)

Integrity loss and building-level destruction are separate outcomes. A later attack may face a weaker defensive contribution, but removing building levels requires the attack and siege paths shown by the current simulator.

Do not infer integrity damage from attacker headcount or Solis Battery level. Solis Battery is static attack infrastructure, not the Astraean shield. [Evidence](#evidence-building-effects-1175)
`
  },
  'astra-upkeep-and-starvation.md': {
    body: `Astra supports construction and stationed fleets. A colony whose stationed upkeep exceeds its Astra supply can begin losing garrisoned ships. [Evidence](#evidence-runtime-economy-1175)

The safe operating rule is to use the live hourly trend: estimate the runway from current Astra and the displayed net drain, then include incoming or departing reinforcements before relying on that colony.

Upkeep modifiers and starvation timing can vary with the current roster, structures, SPUs, and world settings. This wiki therefore does not publish a universal loss interval. Confirm the destination’s Astra runway before reinforcing an ally. [Evidence](#evidence-live-world-1175)
`
  },
  'espionage.md': {
    body: `Espionage missions use Intelligence hulls to gather time-sensitive information about hostile colonies and objectives. [Evidence](#evidence-runtime-combat-1175)

The active roster and target’s counter-intelligence determine the risk. A report is a dated observation, not live truth: record when it was captured, what could arrive before an attack, and whether the target may be presenting a deliberate decoy.

Objective and faction progress that is not shared through ownership or current visibility should be treated as stale after the observation time. [Evidence](#evidence-runtime-objectives-1175)
`
  },
  'siege.md': {
    body: `Siege is the building-damage stage of a successful attack. Surviving siege capability and the selected target determine whether building levels are removed. [Evidence](#evidence-runtime-combat-1175)

Siege is not interchangeable with raid cargo or ordinary combat power. A fleet that wins the ship battle can still fail to achieve its structural objective if too little siege capability survives.

Use the current simulator with the exact target building and infrastructure. World-specific building costs and modifiers make a universal “siege per level” table unreliable.
`
  },
  'raid-ceiling.md': {
    body: `Raid yield is bounded by the surviving fleet’s cargo, the target resources exposed to looting, and current raid modifiers. [Evidence](#evidence-runtime-combat-1175)

Nano Storage reduces exposed value, while logistics hulls and current cargo modifiers affect what can be carried away. A larger combat fleet does not automatically improve the haul if surviving cargo remains the bottleneck.

Use the raid simulator with explicit target resources and buildings when comparing designs. Active-world roster values must be recorded with the result. [Evidence](#evidence-live-world-1175)
`
  },
  'markets-organizations-and-diplomacy.md': {
    data: {
      summary: 'Multiplayer markets, organizations, contracts, and diplomacy coordinate resources and political pressure within the active world.',
      verification: 'observed'
    },
    body: `Markets, organizations, contracts, and diplomacy are multiplayer systems whose available actions and values belong to the active world. [Evidence](#evidence-live-world-1175)

Use the current transaction confirmation screen for exchange quantities, reserved resources, cargo requirements, fees, shares, loans, and contract terms. This wiki does not publish universal prices or timers where the operator can change the world configuration.

Strategically, treat logistics and diplomacy as combat support: confirm who can ship resources, who can reinforce, which missions the current stance permits, and what public action will reveal to rivals.
`
  },
  'expansion-and-geography.md': {
    body: `Expansion converts current infrastructure prerequisites and colonization hulls into additional territory on a wrapped galaxy map. [Evidence](#evidence-runtime-fleets-1175)

The construction and colonization screens are authoritative for the active campaign’s unlocks, valid destination, slot type, cost, and travel time. Do not apply a milestone table from another world.

Because the map wraps, visual edge distance can be misleading. Evaluate an expansion by actual travel time, reinforcement access, resource effect, and exposure to hostile launch colonies.
`
  },
  'rare-metals-and-spus.md': {
    data: {
      summary: 'Rare-metal sites and SPUs provide campaign-specific augmentation whose current effects are listed in the installed 11.75 data and active UI.'
    },
    body: `Rare-metal sites produce materials used by the SPU system. The current 11.75 data table exposes SPU targets including ship classes, economy, capacity, travel, cargo, siege, tracking, evasion, upkeep, research, and intelligence. [Evidence](#evidence-current-data-1175)

Exact mining chances, delivery timing, recipes, and installed bonuses should be read from the active site and SPU screens. They can depend on the campaign and current augmentation, so this wiki does not publish a universal crafting schedule.

For planning, compare an SPU’s displayed marginal effect with the fleet or colony that will actually use it; a high-tier bonus on an inactive system creates no immediate tempo.
`
  },
  'match-structure.md': {
    body: `A Riftborne match is governed by tempo: the rate at which an empire converts production, movement, and information into useful options. [Evidence](#evidence-client-build-1175)

Patch 11.75 presents two standard victory tracks:

- **Origin Wormhole:** hold the Origin at \`(0,0)\` and raise its culture-specific Wormhole to level 100.
- **Valor:** generate 250,000 faction Valor through Valor Conduits on controlled Keystones.

The active multiplayer operator owns world settings and may change campaign parameters, so the live victory panel is authoritative. [Evidence](#evidence-runtime-objectives-1175)

Between those objectives, good play means maintaining capacity headroom, protecting Astra-supported garrisons, keeping useful queues active, shortening response paths, and refreshing intelligence before committing a fleet.
`
  },
  'daily-spu-timing.md': {
    data: {
      title: 'SPU delivery timing',
      summary: 'Coordinate refits and launches around the delivery schedule shown by the active SPU screen.'
    },
    body: `SPU delivery timing is a strategy pattern whose schedule must be read from the active site. [Evidence](#evidence-current-data-1175)

Align purchases, fleet refits, and major launches just after a confirmed delivery when practical. Rivals may calculate against the previously visible configuration, but the advantage disappears if the schedule or installed bonus is guessed incorrectly.
`
  },
  'keystone-donation-delay.md': {
    data: {
      title: 'Keystone funding timing',
      summary: 'Coordinate Keystone funding with capacity gates, Valor Conduit progress, defense, and the active faction plan.'
    },
    body: `Keystone funding timing is a faction strategy built around the current Valor path. [Evidence](#evidence-runtime-objectives-1175)

Confirm the Keystone’s current vision capacity, pending contribution, Valor Conduit level, defensive coverage, and active-world victory panel before sending faction resources. Funding that outruns capacity or leaves the site undefended can create visible progress without durable advantage.
`
  },
  'choosing-a-victory-route.md': {
    body: `Victory-route selection compares a faction’s Origin access, Keystone network, defensive coverage, resource throughput, and information position. [Evidence](#evidence-runtime-objectives-1175)

Prefer the Origin Wormhole route when the faction can hold the central colony, sustain both capacity prerequisites, and protect a single highly visible construction project.

Prefer the Valor route when the faction can control and supply Keystones, grow Valor Conduits, and defend a distributed objective network long enough to reach the active-world threshold.

The strongest posture can threaten both routes so opponents cannot concentrate every response on one site. Confirm the live victory panel before committing; the operator owns campaign settings. [Evidence](#evidence-live-world-1175)
`
  }
};

for (const [filename, rewrite] of Object.entries(rewrites)) {
  const fullPath = path.join(directory, filename);
  const parsed = matter(fs.readFileSync(fullPath, 'utf8'));
  Object.assign(parsed.data, rewrite.data ?? {});
  fs.writeFileSync(fullPath, matter.stringify(rewrite.body, parsed.data));
}

console.log(`Applied ${Object.keys(rewrites).length} patch-11.75 content rewrites.`);
