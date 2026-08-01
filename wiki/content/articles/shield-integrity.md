---
title: Shield integrity
slug: shield-integrity
summary: >-
  Defensive-structure integrity scales its combat contribution and can be
  reduced by direct attacks separately from building-level siege damage.
category: Warfare and intelligence
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 32
aliases:
  - Solis Battery
  - shield grinding
  - base defense
relatedPages:
  - raids-shields-siege-and-spies
  - raid-ceiling
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
  - runtime-combat-1175
mechanicDependencies: []
---
Shield integrity represents the current contribution of a colony’s culture-specific defensive structure. Direct attacks can reduce that contribution even when the attacking force fails to capture the colony. [Evidence](#evidence-runtime-combat-1175)

Integrity loss and building-level destruction are separate outcomes. A later attack may face a weaker defensive contribution, but removing building levels requires the attack and siege paths shown by the current simulator.

Do not infer integrity damage from attacker headcount or Solis Battery level. Solis Battery is static attack infrastructure, not the Astraean shield. [Evidence](#evidence-building-effects-1175)

## Integrity versus building level

Integrity changes the defensive contribution available to a later battle. Building-level loss is a siege result. A plan that intends to remove infrastructure must account for both stages.

## Sequential attacks

Carry the resulting integrity state into the next fixture and update the stationed fleet. Do not assume a fixed loss per attacker or ship; use the active simulator.

## Defensive response

Fresh garrison, changed composition, and any currently available repair action can alter the next outcome. Treat observed setup waves as warning of a possible later siege.
