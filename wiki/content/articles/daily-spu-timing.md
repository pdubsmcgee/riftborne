---
title: SPU delivery timing
slug: daily-spu-timing
summary: >-
  Coordinate refits and launches around the delivery schedule shown by the
  active SPU screen.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 59
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
  - runtime-fleets-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies:
  - ships-fleets-and-travel
---
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
