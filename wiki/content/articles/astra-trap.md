---
title: Astra trap
slug: astra-trap
summary: >-
  Astra trap is a strategy pattern derived from documented Riftborne mechanics
  and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 49
aliases: []
relatedPages:
  - advanced-tactics-and-edge-cases
  - shield-grinding-sacrificial-attacks
  - hangar-feint
  - slowest-hull-sabotage-self-inflicted-edition
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-economy-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - astra-upkeep-and-starvation
  - raid-ceiling
---
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
