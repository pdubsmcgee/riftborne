---
title: Which ship should I build?
slug: which-ship-should-i-build
summary: Choose ships from the mission backward, using current Codex values and a verified target rather than a universal tier list.
category: Ships and fleets
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 99
aliases:
  - best ship
  - ship tier list
  - what ship to build
  - ship counters
relatedPages:
  - fleet-composition
  - ships-fleets-and-travel
  - combat-simulator
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies: []
---
The best ship is the hull that supplies a missing mission role at an acceptable cost, travel profile, and upkeep in the active world. Patch 11.75 distinguishes Intelligence, Light, Heavy, Carrier, Siege, Colonization, and Flagship roles. [Evidence](#evidence-runtime-fleets-1175)

| Desired result | Start by evaluating | Check before building |
|---|---|---|
| Obtain information | Intelligence role | Target, mission availability, travel time, and survival assumptions |
| Fight or intercept | Light and Heavy roles | Observed enemy mix and current simulator inputs |
| Move loot or supplies | Hulls with displayed cargo | Expected surviving capacity and route time |
| Damage infrastructure | Siege role with combat support | Target building, surviving siege, and mission type |
| Found a settlement | Colonization role | Eligible target, founding origin, slot, and travel time |
| Support a larger force | Carrier or roster-defined support | Current effect text and whether enough eligible ships benefit |
| Defend a colony | Sustainable mixed garrison | Arrival time, target mix, shield/base effects, and Astra runway |

## Selection method

1. Write the mission result in one sentence.
2. Inspect the current Codex entries for eligible roles.
3. Eliminate hulls that cannot arrive in time or cannot be sustained.
4. Compare at least two compositions with the exact target information available.
5. Use the built-in simulator for combat claims and retain its roster provenance.
6. Build only the amount supported by the current economy and mission schedule.

## Why there is no universal tier list

Multiplayer worlds may provide a custom roster and modifiers. Names, costs, speed, cargo, upkeep, and combat profiles require a world identifier and capture time. A hull can be excellent in one roster and unsuitable in another. [Evidence](#evidence-live-world-1175)

## Needs verification

Any page claiming exact counter ratios or “ships per power” must provide the culture, ship counts, infrastructure, mission, modifiers, roster provenance, simulator seed set, and capture time. Without those inputs, the claim is not reproducible.
