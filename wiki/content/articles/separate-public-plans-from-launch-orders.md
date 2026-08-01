---
title: Separate public plans from launch orders
slug: separate-public-plans-from-launch-orders
summary: >-
  Separate public plans from launch orders is a strategy pattern derived from
  documented Riftborne mechanics and should be evaluated against the active
  world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 43
aliases: []
relatedPages:
  - official-multiplayer
  - join-a-faction-and-become-legible
  - organize-by-response-time
  - build-a-logistics-spine
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - runtime-objectives-1175
  - live-world-1175
mechanicDependencies:
  - objectives-and-victory
---
Separate public plans from launch orders is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Maintain a broad faction plan (“secure western Inner Keystone”), but share exact fleet composition and launch time only with participants. Assume enemy spy snapshots and social leakage exist.

## Why it works

A faction needs shared intent but does not need every operational detail exposed to every observer. Separating objective from execution reduces the value of social leakage.

## Execution

- Publish the broad objective and support needs.
- Keep exact composition, route, and launch time with participants.
- Give nonparticipants clear defensive or logistics tasks.
- Reveal more only when coordination benefit exceeds information risk.

## Risks and counterplay

- Too much secrecy causes duplicated action.
- A small planning group can become a single point of failure.
- In-game observations may reveal the operation anyway.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. Verify the linked mechanics and the active world’s roster, modifiers, travel times, intelligence age, and opponent response before committing.
