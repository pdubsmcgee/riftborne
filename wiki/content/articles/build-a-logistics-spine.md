---
title: Build a logistics spine
slug: build-a-logistics-spine
summary: >-
  Build a logistics spine is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 44
aliases: []
relatedPages:
  - official-multiplayer
  - join-a-faction-and-become-legible
  - organize-by-response-time
  - separate-public-plans-from-launch-orders
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
  - ships-fleets-and-travel
  - astra-upkeep-and-starvation
---
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
