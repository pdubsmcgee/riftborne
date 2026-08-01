---
title: Empty-base deletion
slug: empty-base-deletion
summary: >-
  Empty-base deletion is a strategy pattern derived from documented Riftborne
  mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 63
aliases: []
relatedPages:
  - advanced-tactics-and-edge-cases
  - astra-trap
  - shield-grinding-sacrificial-attacks
  - hangar-feint
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - siege
---
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
