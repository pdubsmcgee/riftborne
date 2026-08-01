---
title: 'Fight campaigns, not battles'
slug: fight-campaigns-not-battles
summary: >-
  Fight campaigns, not battles is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 46
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
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - combat-power
  - ships-fleets-and-travel
  - siege
---
Fight campaigns, not battles is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


A multiplayer attack should answer:

- What changes on the map if we win?
- What replaces our losses?
- Can the target be reinforced before impact?
- Is siege protected enough to convert the win?
- Who holds our bases while fleets are away?
- What is the diplomatic cost?

If those answers are missing, raid, spy, contract, or wait.
