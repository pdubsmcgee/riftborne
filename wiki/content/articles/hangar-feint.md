---
title: Hangar feint
slug: hangar-feint
summary: >-
  Hangar feint is a strategy pattern derived from documented Riftborne mechanics
  and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 51
aliases: []
relatedPages:
  - advanced-tactics-and-edge-cases
  - astra-trap
  - shield-grinding-sacrificial-attacks
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
  - fleet-composition
---
Hangar feint is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Only stationed ships defend. A base can appear wealthy but weak because hulls are hangared—or can invite an attack and station them before arrival.

**Counter:** refresh intel near impact and model enemy reaction time.

## Why it works

Because only stationed ships defend, the visible defensive state can change when stored hulls are reassigned. The tactic exploits the delay between an attacker’s observation and impact.

## Execution

- Measure the attacker’s travel time and likely last intelligence refresh.
- Keep the intended defenders available rather than committed elsewhere.
- Station them only when doing so will not create an upkeep crisis.
- Prepare a second response in case the attacker recalls.

## Risks and counterplay

- Fresh espionage can expose the change.
- Astra limitations can make the apparent reserve unusable.
- Holding too much in reserve sacrifices pressure elsewhere.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
