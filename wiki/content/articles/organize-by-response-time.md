---
title: Organize by response time
slug: organize-by-response-time
summary: >-
  Organize by response time is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 42
aliases: []
relatedPages:
  - official-multiplayer
  - join-a-faction-and-become-legible
  - separate-public-plans-from-launch-orders
  - build-a-logistics-spine
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
  - espionage
---
Organize by response time is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Create local cells of nearby faction members. Each cell should know:

- who can spy;
- who has the fastest reaction fleet;
- who holds cargo and Astra reserves;
- who can siege;
- who is awake during which windows.

Distance is less useful than actual arrival time.

## Why it works

A faction’s useful neighborhood is defined by arrival windows, not by how close names appear on the map.

## Execution

- Measure representative routes for reaction, cargo, and siege fleets.
- Group players whose active periods and arrival times overlap.
- Assign intelligence, emergency Astra, and heavy response roles.
- Recalculate cells after expansion or major fleet-speed changes.

## Risks and counterplay

- One universal map radius ignores different hull speeds.
- A cell without night or off-hour coverage has a predictable gap.
- Centralizing every reserve can lengthen response to secondary fronts.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
