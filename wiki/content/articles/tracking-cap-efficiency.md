---
title: Tracking cap efficiency
slug: tracking-cap-efficiency
summary: >-
  Tracking cap efficiency is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 55
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
  - runtime-fleets-1175
  - live-world-1175
mechanicDependencies:
  - combat-power
---
Tracking cap efficiency is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Tracking/evasion edge clamps at ±20%. Once you hit the cap against the expected target, more tracking has no direct power benefit in that matchup. Spend the next augmentation slot elsewhere.

## Why it works

Tracking investment has diminishing decision value once the current matchup reaches its implemented edge limit. Additional investment should be judged by whether it helps a different expected opponent.

## Execution

- Identify the target class and current evasion.
- Confirm the effective edge in the current preview.
- Compare the next tracking improvement with attack, defense, cargo, speed, or upkeep alternatives.
- Retest whenever the opposing mix changes.

## Risks and counterplay

- A capped matchup against one fleet may be uncapped against another.
- A roster update can change the comparison.
- Aggregate power may hide which target class receives the benefit.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
