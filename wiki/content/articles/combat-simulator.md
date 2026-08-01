---
title: Combat simulator
slug: combat-simulator
summary: The built-in simulator evaluates exact fleets, cultures, infrastructure, missions, modifiers, and roster provenance.
category: Warfare and intelligence
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 74
aliases:
  - battle simulator
  - codex simulator
  - battle sim
relatedPages:
  - combat-power
  - fleet-composition
  - siege
  - raid-ceiling
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-combat-1175
  - combat-matrix-1175
  - live-world-1175
mechanicDependencies: []
---
Riftborne’s built-in combat simulator is the authoritative way to compare a specified battle without turning displayed power into a universal ship-count formula. It uses the current combat path and can represent fleets, cultures, infrastructure, mission context, and modifiers. [Evidence](#evidence-runtime-combat-1175)

## Required inputs

Record both fleet ledgers, attacker and defender cultures, stationed status, relevant infrastructure and levels, directive state, SPUs, tactics, mission type, target resources, target building, world modifiers, and roster provenance. If one of those inputs is guessed, label the output as analysis rather than a confirmed matchup.

## Compare one change

Start from a saved fixture and change one variable: ship mix, support hull, infrastructure level, modifier, or target. This makes the marginal effect interpretable. Comparing unrelated fleets by headline power does not reveal why the result changed.

## Deterministic runs

For a published matchup, record seed and run count. The wiki’s current example uses seed `1175` and 200 runs for each culture pairing, with the complete fixture stored alongside the evidence registry. [Evidence](#evidence-combat-matrix-1175)

## Read beyond win rate

Inspect surviving ships, cargo, siege capability, structural result, and the state carried into a possible second wave. A fleet can win the ship battle while failing its raid or demolition objective.

## World boundary

Multiplayer can use a custom roster and global modifiers. A result is portable only when the destination world uses the same inputs. Always include world identifier and capture time for live-world analysis. [Evidence](#evidence-live-world-1175)
