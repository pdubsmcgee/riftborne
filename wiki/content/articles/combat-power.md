---
title: Combat power
slug: combat-power
summary: >-
  Combat power is a matchup estimate produced from the active roster, fleet
  composition, infrastructure, and current modifiers.
category: Warfare and intelligence
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 28
aliases:
  - fleet power
  - combat simulator
  - 3200 power
relatedPages:
  - carrier-documentation-discrepancy
  - combat-simulator
legacyHash: combat-without-the-fog-machine
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - combat-matrix-1175
mechanicDependencies: []
---
Combat power is a matchup estimate, not a fixed conversion between a displayed number and ship count. [Evidence](#evidence-runtime-combat-1175)

The active roster, attacker and defender cultures, light/heavy mix, infrastructure, directives, SPUs, tactics, and world modifiers can all change a preview. This is why a displayed power value cannot answer “how many ships?” without the exact scenario.

## Reproducible example

The 11.75 built-in simulator was run with seed 1175 for 200 trials per culture pairing. The profile used 15 attacking light fighters against 10 defending destroyers with level-5 central infrastructure. In all nine culture pairings, the defender won every run and the attacking force was lost. [Evidence](#evidence-combat-matrix-1175)

This result proves only that recorded fixture. It should not be generalized to a custom multiplayer roster or a different building, directive, SPU, or tactics configuration.

## Composition sensitivity

The estimate changes with the opposing light/heavy share and current modifiers. A force can look strong in one fixture and weak in another without changing ship count.

## Reproducible comparison

Keep every input fixed, change one variable, and use recorded seeds. Store exact fleets, cultures, infrastructure, mission, target, modifiers, roster provenance, and build.

## Strategic interpretation

Combat output does not include cargo value, siege objective, travel exposure, replacement time, or defense left behind. Those belong beside the simulator result, not inside a universal conversion.
