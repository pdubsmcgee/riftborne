---
title: Raid ceiling
slug: raid-ceiling
summary: >-
  Raid yield is limited by surviving cargo capacity, visible target resources,
  and raid-loot modifiers.
category: Warfare and intelligence
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 31
aliases: []
relatedPages:
  - raids-shields-siege-and-spies
  - shield-integrity
  - siege
  - espionage
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Raid yield is bounded by the surviving fleet’s cargo, the target resources exposed to looting, and current raid modifiers. [Evidence](#evidence-runtime-combat-1175)

Nano Storage reduces exposed value, while logistics hulls and current cargo modifiers affect what can be carried away. A larger combat fleet does not automatically improve the haul if surviving cargo remains the bottleneck.

Use the raid simulator with explicit target resources and buildings when comparing designs. Active-world roster values must be recorded with the result. [Evidence](#evidence-live-world-1175)

## Three ceilings

A raid is constrained first by resources exposed at the target, then by cargo that survives combat, and finally by any active raid modifiers. Raising combat strength alone does not necessarily increase the result.

## Simulator workflow

Enter the target’s current resources and relevant infrastructure, select the exact active-world roster, and compare the expected haul with travel time and replacement risk. If cargo is limiting, add or protect cargo; if exposed value is limiting, choose another target or mission.

## After the raid

Use the report to update both the target’s likely stockpile and your surviving carrying capacity. Repeating the original calculation without those changes overstates the next haul.
