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
