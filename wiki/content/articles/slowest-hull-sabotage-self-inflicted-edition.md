---
title: Slowest-hull sabotage—self-inflicted edition
slug: slowest-hull-sabotage-self-inflicted-edition
summary: >-
  Slowest-hull sabotage—self-inflicted edition is a strategy pattern derived
  from documented Riftborne mechanics and should be evaluated against the active
  world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 52
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
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - ships-fleets-and-travel
---
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
