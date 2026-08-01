---
title: Shield-grinding sacrificial attacks
slug: shield-grinding-sacrificial-attacks
summary: >-
  Shield-grinding sacrificial attacks is a strategy pattern derived from
  documented Riftborne mechanics and should be evaluated against the active
  world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 50
aliases:
  - shield cheese
  - Solis Battery
relatedPages:
  - advanced-tactics-and-edge-cases
  - astra-trap
  - hangar-feint
  - slowest-hull-sabotage-self-inflicted-edition
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - shield-integrity
  - siege
---
Shield-grinding sacrificial attacks is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Direct attacks can reduce defensive-structure integrity separately from siege damage, including attacks that do not take the colony. This makes sequential waves a possible setup for a later siege, but the amount removed is scenario-dependent and must be previewed or simulated for the active world. [Evidence](#evidence-runtime-combat-1175)

**Counter:** detect launch waves, reinforce before the final strike, repair/rotate defenses if the interface permits, and retaliate against the launch base.

## Why it works

Sequential attacks can exchange disposable fleet value for reduced defensive-structure integrity before a later siege. It is useful only when the later wave gains more than the setup waves cost.

## Execution

- Simulate the complete sequence, not just the final battle.
- Record expected integrity after each wave.
- Keep the siege force separate until the defense has actually changed.
- Abort if reinforcement or repair invalidates the sequence.

## Risks and counterplay

- Setup waves reveal target and timing.
- Integrity change is scenario-dependent.
- A defender can punish the launch bases while the main force waits.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
