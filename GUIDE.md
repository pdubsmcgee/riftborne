# The Riftborne Field Manual

> Generated from the canonical Riftborne Wiki article collection. Edit the individual files in `wiki/content/articles/`, then run `npm run guide:generate`.

This reference targets **Riftborne patch 11.73**. Each article distinguishes confirmed mechanics, patch-sensitive documentation, inference, and strategy.

## Getting started

### Riftborne overview

Canonical page: [/wiki/riftborne-overview/](https://riftbornewiki.317society.com/wiki/riftborne-overview/)

Riftborne is a real-time 4X strategy game in which economies are converted into territory, fleets, intelligence, and campaign objectives. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Riftborne is a real-time, terminal-based 4X game. Four resources are converted into buildings, ships, intelligence, territory, and two primary victory conditions. The official multiplayer world supports up to 120 commanders across six factions and is designed to last weeks. Its strategic emphasis is logistics and coordination rather than rapid input.

Ten foundational rules summarize the game:

1. **Full storage is stopped production.** Spend or expand storage before capping.
2. **Zero Astra kills stationed ships**, one every 10 simulation seconds, cheapest first.
3. **Central Spire is tempo and territory.** Levels 5, 10, 15, and 21–25 grant outpost slots; level 20 grants one child colony.
4. **Only stationed ships defend.** Hangared ships do not.
5. **The slowest ship sets fleet speed.** Do not drag siege or colony hulls through a fast-response fleet.
6. **Spy before committing.** Public maps do not show the real garrison or live enemy objective progress.
7. **Raid for money; attack for removal.** Only an Attack with surviving siege can destroy building levels.
8. **Cargo is part of raid power.** A military win with no carrying capacity is an economic loss.
9. **Specialize bases.** One excellent ship forge plus one excellent economy is better than four confused colonies.
10. **Multiplayer is a team game.** The winning resource is often a faction mate who answers messages and can reinforce on time.

### Match structure and victory conditions

Canonical page: [/wiki/match-structure/](https://riftbornewiki.317society.com/wiki/match-structure/)

A Riftborne match is governed by tempo: the rate at which an empire converts production and information into useful options. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The visible loop is simple:

`produce → build → scout → expand → pressure → hold objectives`

The deeper loop is about **tempo**. Every capped warehouse, idle shipyard, slow launch base, stale spy report, and indefensible colony gives away time. Good players convert time into optionality: enough storage to wait, enough intelligence to choose, and enough travel speed to respond.

The normal victory paths are:

- **Origin victory:** clear and colonize `(0,0)`, then raise the culture-specific Wormhole to level 100.
- **Keystone victory:** one faction controls five Keystone colonies, each with at least 1,000 Visions.

If all other campaign factions surrender in multiplayer, the last unsurrendered faction also wins.

Origin and Keystone sites begin under static **KRAKEN Void** garrisons. Objective sites can be attacked and spied on, but not raided. Enemy objective values are only as current as the last successful spy snapshot; faction-owned objectives are live to their faction.

### Opening a campaign

Canonical page: [/wiki/first-login-a-safe-opening/](https://riftbornewiki.317society.com/wiki/first-login-a-safe-opening/)

The opening phase establishes an empire’s production schedule, defensive safety, and first expansion route. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

A home base begins with Silo 5, Solar Cell 5, and all four stores filled to the current cap. This stockpile provides the initial construction and expansion tempo.

### Opening priorities

Canonical page: [/wiki/opening-priorities/](https://riftbornewiki.317society.com/wiki/opening-priorities/)

Opening priorities are the early investments that prevent capped production, Astra failure, and directionless construction. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

1. Queue Central Spire progress with a deliberate milestone in mind.
2. Add resource production and enough storage that the next login will not find capped stores.
3. Stabilize Astra before training a meaningful garrison.
4. Scout the local ring and measure routes, including wrapped map edges.
5. Decide whether the first outpost is economic, positional, or rare-metal focused.
6. Build the shipyard family that supports the selected base role.
7. Inform the faction of the empire’s location, active period, and intended role.

Three openings are consistently coherent:

- **Macro/outpost:** Spire 5 quickly, early production site, storage, then a defensible route to Spire 20. Best in quiet space.
- **Raid tempo:** earlier Light/Heavy Shipyards, intelligence, fast cargo-capable fleets, and replacement income. Best beside exposed rivals.
- **Fortress/core:** Astra safety, Ion Shield, controlled expansion, then a short reinforcement path toward the center. Best on contested lanes.

The bad opening is not a specific build order. It is buying whatever happens to be affordable without deciding what the base is becoming.

## Economy

### Resources

Canonical page: [/wiki/resources/](https://riftbornewiki.317society.com/wiki/resources/)

The Riftborne economy consists of four stored resources whose value depends on production time, capacity, and scheduled spending. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The four core resources are:

| Resource | Storage | Main pressure |
|---|---|---|
| Vulkron | Silo | Heavy industry, buildings, ships |
| Aurelite | Silo | Broad economy and ship costs |
| Deuterium | Silo | Logistics and advanced hulls |
| Astra | Solar Cell | Buildings, ships, and stationed-fleet upkeep |

Standard passive production is:

```text
gain = base production per hour × resource multiplier × hours
stored = min(storage cap, old stored + gain)
```

Standard base production begins at 1,000 per hour for each resource. Tile and building bonuses add to the base multiplier; some Eldritch and SPU effects multiply afterward.

### The storage rule

Canonical page: [/wiki/the-storage-rule/](https://riftbornewiki.317society.com/wiki/the-storage-rule/)

Storage determines how long a base can continue producing before additional output is lost. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Silo holds Vulkron, Aurelite, and Deuterium; Solar Cell holds Astra. Standard targets are about 2,750 at level 1, 5,000 at level 5, and 100,000 at level 20. The curve is not linear below level 5.

Treat storage as a scheduling tool:

- Upgrade storage when production would cap before the next scheduled login.
- Move or market surpluses when another base can use them.
- Keep objective sites’ Silo and Solar Cell climbing together because objective level is gated by the lower one.

### Astra upkeep and starvation

Canonical page: [/wiki/astra-upkeep-and-starvation/](https://riftbornewiki.317society.com/wiki/astra-upkeep-and-starvation/)

Astra supports both construction and stationed fleets; a base at zero Astra begins losing garrisoned ships. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
hourly upkeep = Σ(ship upkeep × stationed count)
after Drone Facility = upkeep × (1 - reduction)
Drone reduction = min(80%, 4% × level)
```

Veil’s Astra Suture Seal then multiplies remaining upkeep by 0.80. Stored base-side reduction is capped at 95% even if SPUs push it higher.

At zero Astra, the base loses one stationed ship every 10 simulation seconds, cheapest hull first. This creates two useful rules:

- Keep several hours of burn at military bases.
- Do not reinforce an ally until somebody confirms the destination can pay the upkeep.

Mining outposts draw Astra from their founding colony, falling back to the richest colony if that origin is gone.

### Production scaling caveat

Canonical page: [/wiki/production-scaling-caveat/](https://riftbornewiki.317society.com/wiki/production-scaling-caveat/)

Production scaling caveat is part of Riftborne’s reference system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — patch sensitive:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The installed 11.73 documentation conflicts with itself: its economy chapter derives `+0.45` multiplier per standard resource-building level to reach 10,000/hour at level 20, while its building reference says `+10%` per level. Custom campaign presets can also change scaling. **Trust the live Codex/base preview for the current world** and use the formula structure—not the disputed coefficient—for planning.

### Rare metals, mining outposts, Noctmarks, and SPUs

Canonical page: [/wiki/rare-metals-and-spus/](https://riftbornewiki.317society.com/wiki/rare-metals-and-spus/)

Rare metals, mining outposts, Noctmarks, and SPUs is part of Riftborne’s expansion and buildings system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Rare-metal tables are Echo Vein, Prismatic Lode, Xeno Shardfield, Vant Flux Rift, Radian Crucible, and Noct Cache. They bias Echorite, Prismalloy, Xenocite, Vantium, Radianite, and Noctium respectively or in combinations.

Drill mining rolls once per whole minute:

```text
chance = 0.05 + ((drill level - 1) / 19) × 0.95
```

That is 5% at level 1, 50% at level 10, and 100% at level 20. Drill auto-level is tied to lifetime metals mined, from below 100 at level 1 to 10,000+ at level 20.

Refiner attempts one SPU craft per hour and converts `10 Noctium → 10 Noctmarks` hourly. SPU deliveries start every 24 hours after the first production.

SPU strength:

```text
bonus per unit = average(Drill level, Refiner level) × 0.1%
stack bonus = bonus per unit × identical stack count
```

SPUs can affect class attack/defense/speed/training/upkeep; production/storage/build/research/transmute speed; global upkeep; travel; base defense; fleet attack/defense/siege/raid/cargo/crit/evasion/tracking; spy survival; and diplomacy penalties.

Derived priority: Drill and Refiner levels should improve before an empire mass-produces a permanent SPU stack. Daily delivery waves create discrete power spikes that can support coordinated purchases and campaigns.

## Expansion and buildings

### Expansion and geography

Canonical page: [/wiki/expansion-and-geography/](https://riftbornewiki.317society.com/wiki/expansion-and-geography/)

Expansion converts Central Spire milestones and colonization hulls into additional territory on a wrapped galaxy map. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The galaxy wraps at its edges. Distance is shortest-path Euclidean distance on that torus, so a visually distant opposite edge may provide a short route into an empire’s territory.

Central Spire provides `+10%` building speed per level and unlocks:

| Spire | Unlock |
|---|---|
| 5, 10, 15 | One generic outpost slot at each milestone |
| 20 | One child colony from that origin |
| 21–25 | One additional generic outpost slot per level |

Each generic slot can fund:

- a strategic outpost on empty space;
- an asteroid mining outpost on an asteroid;
- a rare-metal mining outpost on a seeded site.

A full colony requires a Colonization hull, consumes one hull, and can raise its own Spire to continue the colony chain. Reaching an occupied hostile tile resolves as combat.

### Buildings and base roles

Canonical page: [/wiki/buildings-and-base-roles/](https://riftbornewiki.317society.com/wiki/buildings-and-base-roles/)

Buildings define a base’s production, logistics, military output, storage, and defensive specialization. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Most structures cap at 20. Dyson Sphere caps at 200; Flagship Research at 5.

```text
actual build time = listed build time / build-speed multiplier
```

Build speed comes from Central Spire, Flagship Research, Eldritch upgrades, directives, and SPUs. Astraean normal building speed receives a 0.60 multiplier, so Astraean expansion needs planning rather than improvisation.

### Key structures

Canonical page: [/wiki/key-structures/](https://riftbornewiki.317society.com/wiki/key-structures/)

Key structures provide the economic, military, storage, logistics, and defensive effects used by specialized bases. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

- **Extractor / Synthesiser / Combinator / Solar Array:** Vulkron, Aurelite, Deuterium, Astra production.
- **Dyson Sphere:** late-game Astra scaling.
- **Light Shipyard:** `+10%` light/intelligence build and travel speed and `+2%` light stats per level.
- **Heavy Shipyard:** same pattern for heavy/cargo/colonization hulls.
- **Siege Foundry:** same pattern for bomber/siege hulls; bombers at 5, siege at 15.
- **Ion Shield:** defense multiplier plus flat defense; current integrity scales only its contribution.
- **Nano Storage:** hides `min(80%, 4% × level)` from hostile loot.
- **Drone Facility:** reduces upkeep by the same curve.
- **Orbital Exchange:** `+1%` launched cargo and `+1%` logistics shipment speed per level.
- **Flagship Research:** `+15%` research and `+3%` building speed per level.

Ion Shield strength varies dramatically:

| Culture | Per level | Level 20 |
|---|---|---|
| Astraean | +7.5% defense, +75 flat | 2.5× shield contribution, +1,500 flat |
| Varkon | +1%, +10 flat | 1.2×, +200 |
| Veil | +5%, +50 flat | 2.0×, +1,000 |

Strong empires assign roles:

- **Economic engine:** matching production, storage, low unnecessary garrison.
- **Military forge:** shipyards, Astra, Drone Facility, uninterrupted stock.
- **Launch hub:** shipyards, Orbital Exchange, speed/cargo effects.
- **Fortress:** Ion Shield, Nano Storage, stationed defenders, nearby response.
- **Objective node:** storage gates, Astra, shield, faction reinforcement.
- **Research sanctuary:** Flagship Research on a base unlikely to be erased.

## Cultures

### Cultures

Canonical page: [/wiki/cultures/](https://riftbornewiki.317society.com/wiki/cultures/)

Cultures is part of Riftborne’s cultures system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

This overview groups the focused articles associated with cultures.

### Astraean: compound interest with a shield

Canonical page: [/wiki/astraean/](https://riftbornewiki.317society.com/wiki/astraean/)

Astraean is an economy-oriented culture with discounted Aurelite ship costs, strong shields, and slower construction. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

- 50% Aurelite discount on ship costs.
- Overclocker adds half the campaign’s normal per-level resource bonus to all four outputs.
- Strongest Ion Shield.
- Normal buildings run at 0.60 speed; ship-building speed at 0.70.

Astraean performs best as a compounding economy built around safe clusters, balanced output, and efficient mixed fleets. Its production advantage can attract raids, which makes Nano Storage and credible retaliation important. The culture has no innate combat multiplier; its advantage is the ability to field and replace useful ships over time.

### Varkon: choose the hour of violence

Canonical page: [/wiki/varkon/](https://riftbornewiki.317society.com/wiki/varkon/)

Varkon is an offensive culture built around discounted Vulkron ship costs and time-limited attack amplification. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

- 50% Vulkron ship-cost discount.
- Attack and raid fleets receive a 3.0× attack multiplier in the 11.73 guide.
- Conscription Service costs `200 × level` of every resource and grants `+10% × level` attack during its active window.
- Weakest shield and slow ships.

Conscription’s active window scales from 15 minutes to 4 hours; the post-window cooldown scales from 24 to 16 hours. Activate for a coordinated campaign, not a random probe. Varkon’s strategic problem is not winning a chosen fight—it is arriving, recovering, and not being counterattacked while its slow fleet is away.

### Veil: asymmetry as an economy

Canonical page: [/wiki/veil/](https://riftbornewiki.317society.com/wiki/veil/)

Veil is a mobile, attack-oriented culture that converts combat losses into Soul Shards and base-local Eldritch upgrades. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

- 50% Deuterium ship-cost discount.
- One Soul Shard per unit kill, shared across the empire.
- Fast ships, high attack, lower durability.
- Transmuting Void converts mixed resources 1:1 into a chosen output after a timer.
- Eldritch Conduit buys base-local upgrades.

Important Eldritch options:

| Upgrade | Cost | Effect |
|---|---:|---|
| Phantom Treaty | 4,200 | 80% less diplomatic penalty from this base |
| Shadow Hoard | 4,600 | +20% hidden resources, overall cap 95% |
| Whisper Relay | 4,800 | +20% spy speed |
| Stasis Bastion | 4,800 | -25% incoming siege budget |
| Phase Foundry | 5,000 | +20% ship training |
| Obsidian Overclock | 5,000 | +20% construction |
| Gloom Ward | 5,200 | +20% base defense |
| Rift Cargo Manifolds | 5,200 | +20% launched cargo |
| Umbral Stockpiles | 5,400 | +25% storage |
| Nullwake Drives | 5,500 | +20% all fleet travel |
| Astra Suture Seal | 5,600 | -20% upkeep after other reductions |
| Stolen Breath | 5,700 | extra post-raid siphon |
| Crit-Chain Doctrine | 5,800 | +10 crit |
| Riftwalk Logistics | 6,000 | two training lanes per unlocked family |
| Veil Siphon | 6,000 | +20% raid loot |
| Void Siege Rites | 6,000 | +50% siege |
| Eclipse Ascension | 10,000 | choose War, Economy, or Espionage |

Eclipse paths: War gives +25% fleet attack and defense; Economy gives +50% to all four production multipliers at that base; Espionage makes spy travel one second.

Veil wins by concentrating upgrades in launch bases and taking unequal trades. Do not spread expensive base-local upgrades everywhere.

## Ships and fleets

### Ships, fleets, and travel

Canonical page: [/wiki/ships-fleets-and-travel/](https://riftbornewiki.317society.com/wiki/ships-fleets-and-travel/)

Fleets combine specialized hull families, while their travel time is determined by wrapped distance and the slowest participating ship. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Every culture covers Intelligence, light screen/skirmisher, main-line heavy, Carrier, Siege, Colonization, and Flagship roles.

Ship resource cost derives from base cost:

```text
Vulkron   = base cost × 1.25
Aurelite  = base cost × 0.95
Deuterium = base cost × 0.95
Astra     = base cost × 0.85
```

Then the culture discount halves one resource.

Training is split into independent lanes by completed shipyard copies and hull family. Veil Riftwalk Logistics doubles each unlocked family’s lanes. Current clients can split batches across lanes; use it to start every lane immediately.

Travel:

```text
hours = wrapped distance /
        (slowest modified ship speed × base travel multiplier × global multiplier)
```

The standard global multiplier is 3.0 and minimum travel is 0.01 hours. Manual shipments and accepted market trades instead use:

```text
trade speed = 5 × base travel multiplier × global multiplier × shipment-speed multiplier
```

### Fleet composition

Canonical page: [/wiki/fleet-composition/](https://riftbornewiki.317society.com/wiki/fleet-composition/)

Fleet composition balances screening, line combat, cargo, siege, carrier support, and mission-specific speed. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

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

Fleet power is part of Riftborne’s ships and fleets system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Fleet power is a context-sensitive combat estimate rather than a fixed conversion from ship count.

The combat calculation weights attack and defense against the opposing fleet’s light and heavy mix, then applies critical chance, tracking, evasion, carrier effects, base defense, shield integrity, directives, SPUs, and culture modifiers. A displayed value such as **3,200 power therefore has no universal ship count**.

As a rough reading aid, a 3,200-power force may represent dozens of developed combat hulls or hundreds of inexpensive light hulls. The exact count changes with hull class, culture, shipyard levels, directives, SPUs, and whether the fleet is attacking or defending.

> **Patch-sensitive:** Use the in-game Codex combat simulator for an exact matchup. Headcount alone cannot determine whether a force defeats a fortified base.

## Warfare and intelligence

### Combat power

Canonical page: [/wiki/combat-power/](https://riftbornewiki.317society.com/wiki/combat-power/)

Combat power is derived from target composition, unit statistics, critical chance, tracking, evasion, and global multipliers. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Combat weights attack and defense against the opponent’s light/heavy mix.

```text
weighted attack =
  attack-vs-light × enemy light share +
  attack-vs-heavy × enemy heavy share

weighted defense =
  defense-vs-light × enemy light share +
  defense-vs-heavy × enemy heavy share
```

Unit SPUs and carrier aura modify those contributions. Crit contributes `1 + average crit / 200`. Tracking versus evasion contributes a multiplier clamped between 0.8 and 1.2:

```text
tracking edge = clamp((tracking - enemy evasion) / 200, -0.2, 0.2)
```

Attacker power then applies fleet and global attack multipliers. Defender power combines its crit-adjusted attack, multiplier-adjusted unit defense, flat base defense, global defense, and tracking edge.

On an Attack, one side breaks. Loss fractions are scaled so the losing side is wiped. On a Raid, the same raw fractions start halved; raids are softer, not safe.

Large overmatch gives only a limited casualty discount. Attack incoming damage bottoms at 75% around 3× overmatch; raid incoming damage bottoms at 90%. Even an overwhelming fleet therefore continues to take meaningful incoming damage.

Small fleets suffer rounding:

```text
lost ships = round(original count × loss fraction)
```

This makes one- and two-hull probes swing between no effect and total loss.

### Raids, shields, siege, and spies

Canonical page: [/wiki/raids-shields-siege-and-spies/](https://riftbornewiki.317society.com/wiki/raids-shields-siege-and-spies/)

Raids, shields, siege, and spies is part of Riftborne’s warfare and intelligence system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

This overview groups the focused articles associated with raids, shields, siege, and spies.

### Raid ceiling

Canonical page: [/wiki/raid-ceiling/](https://riftbornewiki.317society.com/wiki/raid-ceiling/)

Raid yield is limited by surviving cargo capacity, visible target resources, and raid-loot modifiers. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
carry = Σ(count × cargo × carrier effect) × fleet cargo multiplier
ceiling = min(carry, target total)
ceiling = min(target total, ceiling × raid-loot multiplier)
visible = target total × (1 - hidden fraction)
```

Loot is then taken randomly by resource from visible stock. Nano Storage therefore reduces expected value, while Orbital Exchange, cargo hulls, directive/SPU bonuses, and Veil effects raise it.

Veil Stolen Breath takes an extra:

```text
min(10% of main steal, 5% of remaining target resources)
```

### Shield integrity

Canonical page: [/wiki/shield-integrity/](https://riftbornewiki.317society.com/wiki/shield-integrity/)

Ion Shield integrity scales a shield’s defensive contribution and is reduced by every direct attack. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Every Attack chips Ion Shield integrity even if the attackers die:

```text
base damage % = attacker opening power / 45,000
ratio = attacker power / defender power
blend = ratio / (ratio + 1)
factor = 0.90 + 0.20 × blend
integrity damage = base damage × factor
```

Only siege removes actual building levels. Integrity attrition, however, can prepare a later breach.

### Siege

Canonical page: [/wiki/siege/](https://riftbornewiki.317society.com/wiki/siege/)

Siege damage converts surviving siege capacity into building-level destruction after a successful attack. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
raw siege = Σ(count × siege stat × carrier effect)
survival scale = max(0.2, surviving siege / initial siege)
final budget = raw siege × fleet siege multiplier × survival scale
```

Stasis Bastion multiplies that budget by 0.75. Each destroyed building level consumes 40% of that level’s total build cost. With no selected target, siege hits the highest-level building. A non-spawn base disappears when every building reaches zero.

### Espionage

Canonical page: [/wiki/espionage/](https://riftbornewiki.317society.com/wiki/espionage/)

Espionage missions use Intelligence hulls to obtain time-sensitive information about hostile bases and objectives. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Spy missions accept Intelligence hulls only.

```text
survival = clamp(0.65 + spy-survival bonus, 0.05, 0.95)
losses = ceil((defender spy-defense power / 12) × (1 - survival))
```

Fresh intel is perishable. Record when a report was taken, what could reinforce before arrival, and whether the target deliberately showed a weak garrison.

## Objectives

### Objectives and the late game

Canonical page: [/wiki/objectives-and-victory/](https://riftbornewiki.317society.com/wiki/objectives-and-victory/)

Campaign victory is achieved through the central Origin Wormhole, five faction Keystones, or multiplayer surrender. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

At `(0,0)`, the culture structures are Sanctum of Vael, Lens of Aster, and Furnace of Vorrak. The site only permits Wormhole, Silo, Solar Cell, and Ion Shield.

Each quadrant has an Inner and Outer Keystone. Keystone sites permit Keystone Vision, Silo, Solar Cell, and Ion Shield. Culture-specific names differ, but the function is the same.

Noctmark efficiency improves with level:

```text
Noctmarks per Vision = 100 / 100 ^ ((level - 1) / 99)
```

That falls from 100 at level 1 to 1 at level 100, while hourly throughput also rises with level. This makes early bulk donation inefficient unless immediate conversion is strategically necessary.

## Multiplayer

### Markets, organizations, contracts, and diplomacy

Canonical page: [/wiki/markets-organizations-and-diplomacy/](https://riftbornewiki.317society.com/wiki/markets-organizations-and-diplomacy/)

Markets, organizations, contracts, and diplomacy is part of Riftborne’s multiplayer system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Resource market offers are strict 1-for-1 exchanges. Seller cargo is reserved while an offer is live; both sides need stock and cargo capacity, and fulfillment travels in both directions.

Organizations begin with 100 authorized/founder shares and no public float. Initial share price is approximately:

```text
max(1, round(seed Noctmarks / 100))
```

Organizations can issue contracts, trade shares, and lend Noctmarks. Daily loan interest is:

```text
ceil(outstanding principal × daily rate percent / 100)
```

If interest cannot be paid, the lender seizes available treasury and records the rest as unrecovered.

Contracts include base, building, or ship destruction; total or resource-specific raids; mining-outpost destruction; shield-integrity damage; and Astra raids. Efficient contracts reward pressure that already supports the faction’s strategic plan.

Raids and attacks alter faction sentiment; reinforcement, transfers, tribute, and trade can improve relationships. Daily faction stance updates can turn sentiment into Ally, Neutral, or Enemy gates. Veil Phantom Treaty is therefore not merely flavor—it allows deniable economic warfare from one launch base.

Transmissions take 10–30 seconds to discover, offer three choices, and then cool down for 10 minutes. Outcomes can change resources, relations, ships, or building levels. Use them on a base positioned to exploit or survive the result.

## Strategy

### How to value a tile

Canonical page: [/strategy/how-to-value-a-tile/](https://riftbornewiki.317society.com/strategy/how-to-value-a-tile/)

Tile value is determined by yield, travel time, reinforcement access, and exposure rather than yield alone. [Source](#references)

> **Evidence status — inferred:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Rank a target on four axes:

1. **Yield:** production/terrain bonuses and rare-metal table.
2. **Reach:** travel time from a real shipyard, not visual distance.
3. **Support:** who can reinforce and supply it?
4. **Exposure:** how many hostile launch bases can reach it before your faction can?

A modest tile inside a reinforcement triangle is often worth more than a spectacular tile hanging alone in enemy space.

### Choosing a victory route

Canonical page: [/strategy/choosing-a-victory-route/](https://riftbornewiki.317society.com/strategy/choosing-a-victory-route/)

Victory-route selection compares a faction’s central control, distributed defense, resource throughput, and information position. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Prefer Origin when your faction has:

- superior central travel lanes;
- a concentrated defensive economy;
- enough storage/build tempo to raise one site;
- the ability to absorb attention from the entire map.

Prefer Keystones when your faction has:

- distributed territory across several quadrants;
- reliable Noctmark production and donation discipline;
- enough members to defend multiple sites;
- intelligence coverage that catches coordinated sieges.

The best faction may threaten both so opponents cannot concentrate.

### Official multiplayer strategy

Canonical page: [/strategy/official-multiplayer/](https://riftbornewiki.317society.com/strategy/official-multiplayer/)

Official multiplayer rewards coordinated logistics, current intelligence, response-time organization, and objective timing. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

The current official world is a weeks-long real-time campaign. You cannot reproduce single-player’s time-advance tactics. The best approach is operational:

### Join a faction and become legible

Canonical page: [/strategy/join-a-faction-and-become-legible/](https://riftbornewiki.317society.com/strategy/join-a-faction-and-become-legible/)

Join a faction and become legible is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Independent play is explicitly high risk. On day one, share your coordinates, culture, active hours, intended role, and nearby threats. Reliability gets you reinforcements and intelligence; silence makes even a large empire strategically invisible.

### Organize by response time

Canonical page: [/strategy/organize-by-response-time/](https://riftbornewiki.317society.com/strategy/organize-by-response-time/)

Organize by response time is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Create local cells of nearby faction members. Each cell should know:

- who can spy;
- who has the fastest reaction fleet;
- who holds cargo and Astra reserves;
- who can siege;
- who is awake during which windows.

Distance is less useful than actual arrival time.

### Separate public plans from launch orders

Canonical page: [/strategy/separate-public-plans-from-launch-orders/](https://riftbornewiki.317society.com/strategy/separate-public-plans-from-launch-orders/)

Separate public plans from launch orders is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Maintain a broad faction plan (“secure western Inner Keystone”), but share exact fleet composition and launch time only with participants. Assume enemy spy snapshots and social leakage exist.

### Build a logistics spine

Canonical page: [/strategy/build-a-logistics-spine/](https://riftbornewiki.317society.com/strategy/build-a-logistics-spine/)

Build a logistics spine is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Use backline production, forward launch hubs, and fortified transfer nodes. Keep slow siege behind the line until the target is confirmed. Pre-position cargo and Astra before the war, because market travel after the alarm is often too late.

### Run an intelligence cycle

Canonical page: [/strategy/run-an-intelligence-cycle/](https://riftbornewiki.317society.com/strategy/run-an-intelligence-cycle/)

Run an intelligence cycle is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Use one owner per priority target, timestamp reports, and avoid duplicate blind probes. Re-spy before the fleet reaches the point where it cannot be recalled or retasked. Track enemy shipyard levels because response time can matter more than the observed garrison.

### Fight campaigns, not battles

Canonical page: [/strategy/fight-campaigns-not-battles/](https://riftbornewiki.317society.com/strategy/fight-campaigns-not-battles/)

Fight campaigns, not battles is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

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

Shift to objectives before the leaderboard tells you to is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Economic rank is not victory. In the middle game, choose an objective route, reserve Noctmarks, build staging bases, and schedule coverage. A faction that begins coordinating only after an enemy Wormhole becomes visible is already late.

### Advanced tactics and edge cases

Canonical page: [/strategy/advanced-tactics-and-edge-cases/](https://riftbornewiki.317society.com/strategy/advanced-tactics-and-edge-cases/)

Advanced tactics use documented interactions and edge cases to create advantages that are not obvious from headline statistics. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

These tactics follow from confirmed rules. “Cheese” means exploiting incentives and timing, not abusing bugs or unauthorized access.

### Astra trap

Canonical page: [/strategy/astra-trap/](https://riftbornewiki.317society.com/strategy/astra-trap/)

Astra trap is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Raid Astra shortly before a known garrison burn or incoming reinforcement. The loot may matter less than forcing starvation. Cheapest ships die first, so a screen can evaporate and change the target mix for the next attack.

**Counter:** several hours of Astra, Drone Facility, emergency shipments, and alerts.

### Shield-grinding sacrificial attacks

Canonical page: [/strategy/shield-grinding-sacrificial-attacks/](https://riftbornewiki.317society.com/strategy/shield-grinding-sacrificial-attacks/)

Shield-grinding sacrificial attacks is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Every Attack damages shield integrity based mainly on opening attacker power, even if the attacking fleet is wiped. Multiple disposable waves can soften an otherwise impossible shield for the real siege.

**Counter:** detect launch waves, reinforce before the final strike, repair/rotate defenses if the interface permits, and retaliate against the launch base.

### Hangar feint

Canonical page: [/strategy/hangar-feint/](https://riftbornewiki.317society.com/strategy/hangar-feint/)

Hangar feint is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Only stationed ships defend. A base can appear wealthy but weak because hulls are hangared—or can invite an attack and station them before arrival.

**Counter:** refresh intel near impact and model enemy reaction time.

### Slowest-hull sabotage—self-inflicted edition

Canonical page: [/strategy/slowest-hull-sabotage-self-inflicted-edition/](https://riftbornewiki.317society.com/strategy/slowest-hull-sabotage-self-inflicted-edition/)

Slowest-hull sabotage—self-inflicted edition is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

One siege or colony hull can ruin an interception window. Keep response, cargo, siege, and colonization packages separate until the final assembly point.

### Wrapped-edge backdoor

Canonical page: [/strategy/wrapped-edge-backdoor/](https://riftbornewiki.317society.com/strategy/wrapped-edge-backdoor/)

Wrapped-edge backdoor is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Players read a rectangular map emotionally even though it is toroidal. Expand and launch across the seam; measure both routes.

### Defender-mix manipulation

Canonical page: [/strategy/defender-mix-manipulation/](https://riftbornewiki.317society.com/strategy/defender-mix-manipulation/)

Defender-mix manipulation is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Power weights anti-light/anti-heavy values against fleet composition. Feeding or removing a screen changes the opponent’s weighted efficiency. Scout compositions, then counter the share—not the ship count.

### Tracking cap efficiency

Canonical page: [/strategy/tracking-cap-efficiency/](https://riftbornewiki.317society.com/strategy/tracking-cap-efficiency/)

Tracking cap efficiency is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Tracking/evasion edge clamps at ±20%. Once you hit the cap against the expected target, more tracking has no direct power benefit in that matchup. Spend the next augmentation slot elsewhere.

### Raid-with-cargo, attack-with-siege

Canonical page: [/strategy/raid-with-cargo-attack-with-siege/](https://riftbornewiki.317society.com/strategy/raid-with-cargo-attack-with-siege/)

Raid-with-cargo, attack-with-siege is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

This sounds basic, but it is the strongest economic cheese because many players optimize only combat power. Calculate loot ceiling before launching; strip siege from raids and cargo from pure demolition unless it serves the return plan.

### Nano Storage forcing function

Canonical page: [/strategy/nano-storage-forcing-function/](https://riftbornewiki.317society.com/strategy/nano-storage-forcing-function/)

Nano Storage forcing function is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

At Nano Storage 20, 80% is hidden. Against such a target, repeated raids may be theater. Either attack with siege, hit logistics shipments, or choose a less protected economy.

### Keystone donation delay

Canonical page: [/strategy/keystone-donation-delay/](https://riftbornewiki.317society.com/strategy/keystone-donation-delay/)

Keystone donation delay is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Noctmark cost per Vision improves exponentially with Keystone level. Unless the faction needs immediate visible progress, build the structure and storage gates before pouring in the treasury.

### Daily SPU timing

Canonical page: [/strategy/daily-spu-timing/](https://riftbornewiki.317society.com/strategy/daily-spu-timing/)

Daily SPU timing is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

SPUs arrive in 24-hour waves after first production. Align purchases, fleet refits, and major launches just after delivery; an opponent may calculate against yesterday’s stats.

### Veil deniable-raider base

Canonical page: [/strategy/veil-deniable-raider-base/](https://riftbornewiki.317society.com/strategy/veil-deniable-raider-base/)

Veil deniable-raider base is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Concentrate Phantom Treaty, Veil Siphon, cargo, speed, and Stolen Breath at one launch hub. It becomes an economic scalpel with dramatically reduced diplomatic consequences.

### Varkon window stack

Canonical page: [/strategy/varkon-window-stack/](https://riftbornewiki.317society.com/strategy/varkon-window-stack/)

Varkon window stack is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Do not activate Conscription independently. Stack it with fresh spy intel, faction arrival times, contracts, and multiple launches inside the same window. The cooldown is the real cost.

### Market capital lock

Canonical page: [/strategy/market-capital-lock/](https://riftbornewiki.317society.com/strategy/market-capital-lock/)

Market capital lock is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Cargo ships are reserved by live offers and trade legs travel. An attractive offer can immobilize a trader’s capacity. Post only with a liquidity plan; exploit opponents who tie up all cargo by pressuring elsewhere.

### Empty-base deletion

Canonical page: [/strategy/empty-base-deletion/](https://riftbornewiki.317society.com/strategy/empty-base-deletion/)

Empty-base deletion is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Siege spends against building levels and removes a non-spawn base when everything reaches zero. If conquest is unnecessary, a focused demolition can erase the position and its reinforcement geometry.

### Objective information asymmetry

Canonical page: [/strategy/objective-information-asymmetry/](https://riftbornewiki.317society.com/strategy/objective-information-asymmetry/)

Objective information asymmetry is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

Enemy objective progress is snapshot-based. A faction can accelerate between spy cycles or deliberately present stale progress. Rotate spies and avoid announcing donation timing.

### Common strategic failures

Canonical page: [/strategy/common-failures/](https://riftbornewiki.317society.com/strategy/common-failures/)

Common ways strong empires lose is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

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

A recurring command checklist is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Source](#references)

> **Evidence status — Strategy:** This page derives recommendations from confirmed mechanics. It does not describe an official guarantee.

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

### Carrier documentation discrepancy

Canonical page: [/wiki/carrier-documentation-discrepancy/](https://riftbornewiki.317society.com/wiki/carrier-documentation-discrepancy/)

Carrier documentation discrepancy is part of Riftborne’s reference system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — patch sensitive:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The 11.73 combat chapter says each carrier adds 0.1% (`0.001`) to non-carrier stats, but its worked example and movement/raid chapters use 0.01% (`0.0001`). Treat the live combat preview as authoritative. Either value still means carriers pay off through the number and value of non-carrier hulls, not their own stat line.

### Directives

Canonical page: [/wiki/directives/](https://riftbornewiki.317society.com/wiki/directives/)

Directives are twelve parallel ten-stage progression paths that grant permanent empire bonuses when completed. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Twelve ten-stage tracks progress in parallel and auto-complete. The installed guide lists these permanent capstones:

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

This wiki ranks installed patch data above older official material and labels strategic inference separately from confirmed mechanics. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Primary inputs:

- Bundled local `Content/GAMEPLAY_GUIDE` and `Content/Data` from Steam patch 11.73.
- [Official Steam store page](https://store.steampowered.com/app/4301130/Riftborne/).
- [Official gameplay-guide PDF](https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/4301130/manuals/ba1549a453f026cc7a8cf3247e19af87c8d91b37/RiftborneSovereigns_GameplayGuide.pdf).
- [Official 11.64 patch notes](https://riftborne.itch.io/riftborne/devlog/1571499/1164-patch-notes).
- [Developer’s July 2026 multiplayer announcement](https://www.reddit.com/r/spacesimgames/comments/1v012eq/riftborne_space_4x_new_multiplayer_server/).
- [Community beginner guide](https://steamcommunity.com/sharedfiles/filedetails/?id=3705847823), used only for qualitative culture perspective because many numbers predate 11.73.

Where sources conflict, this manual prefers the installed 11.73 data, explicitly marks the disagreement, and recommends the live Codex or combat preview for the active world.

### Aegis Vanguard

Canonical page: [/wiki/aegis-vanguard/](https://riftbornewiki.317society.com/wiki/aegis-vanguard/)

Aegis Vanguard is part of Riftborne’s reference system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Aegis Vanguard is the Fighter directive path. It contains ten stages that progress automatically alongside the other directive tracks.

Level 5, **Shock Spearhead**, requires a victory over a defending fleet with more than 10,000 power. The installed directive data describes intermediate stages as guidance and progression milestones rather than separate combat bonuses.

Completing all ten stages grants the permanent Aegis Vanguard capstone: **+8% fleet attack**. A reference to “Aegis level 5” therefore identifies directive progress, not a 5% or half-strength version of the final buff.

### Solis Battery

Canonical page: [/wiki/solis-battery/](https://riftbornewiki.317society.com/wiki/solis-battery/)

Solis Battery is part of Riftborne’s reference system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — patch sensitive:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Solis Battery is a term that may appear in an active-world Codex or earlier game material, but it is not defined in the installed patch 11.73 gameplay guide or readable data tables used by this wiki.

It should not be assigned an inferred defense value from its level alone. When the term appears in a live world, its Codex entry and combat preview are authoritative for that world.

> **Patch-sensitive:** This page intentionally records the documentation gap instead of presenting an unsupported formula. Related calculations are documented under [Shield integrity](/wiki/shield-integrity/) and [Key structures](/wiki/key-structures/).

### Glossary

Canonical page: [/wiki/glossary/](https://riftbornewiki.317society.com/wiki/glossary/)

Glossary is part of Riftborne’s reference system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

- **Astra:** A core resource used for construction and stationed-fleet upkeep.
- **Codex:** The in-game reference and combat-preview interface for the active world.
- **Keystone:** A faction objective that converts donated Noctmarks into Visions.
- **Noctmark:** An objective currency refined from Noctium.
- **Origin:** The central objective at coordinate `(0,0)`.
- **SPU:** A stackable upgrade produced through rare-metal mining and refining.
- **Stationed fleet:** Ships assigned to a base and eligible to defend it.
- **Wormhole:** A culture-specific Origin structure that produces an Origin victory at level 100.
