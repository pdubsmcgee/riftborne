---
title: Objective information asymmetry
slug: objective-information-asymmetry
summary: >-
  Objective information asymmetry is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 64
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
  - runtime-combat-1175
  - runtime-objectives-1175
  - live-world-1175
mechanicDependencies:
  - objectives-and-victory
---
Objective information asymmetry is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Enemy objective progress is snapshot-based. A faction can accelerate between spy cycles or deliberately present stale progress. Rotate spies and avoid announcing donation timing.

## Why it works

Objective progress observed through espionage is a timestamped snapshot. A coordinated faction can change its position between reports, so uncertainty itself must be included in planning.

## Execution

- Assign repeated observations to named players.
- Store capture time with every report.
- Increase refresh frequency as the victory margin narrows.
- Keep exact friendly contribution timing within the smallest useful group.

## Risks and counterplay

- Duplicate probes waste intelligence capacity.
- Overconfidence in a stale report can miss a victory push.
- Excessive secrecy can prevent allies from providing coverage.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
