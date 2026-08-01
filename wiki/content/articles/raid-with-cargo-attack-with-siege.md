---
title: 'Raid-with-cargo, attack-with-siege'
slug: raid-with-cargo-attack-with-siege
summary: >-
  Raid-with-cargo, attack-with-siege is a strategy pattern derived from
  documented Riftborne mechanics and should be evaluated against the active
  world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 56
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
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - raid-ceiling
  - siege
---
Raid-with-cargo, attack-with-siege is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


This sounds basic, but it is the strongest economic cheese because many players optimize only combat power. Calculate loot ceiling before launching; strip siege from raids and cargo from pure demolition unless it serves the return plan.

## Why it works

Mission design should follow the intended result. Raids need surviving cargo to extract value; structural attacks need surviving siege to remove building levels.

## Execution

- Write “loot” or “structure” as the primary objective.
- Use the matching simulator mode and current target state.
- Remove hulls whose only contribution is to the other mission type unless they serve a planned follow-up.
- Record the expected ceiling before launch.

## Risks and counterplay

- A mixed fleet may be slower and worse at both tasks.
- A combat win can conceal zero economic or structural progress.
- Unexpected defenders can change which support hulls survive.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
