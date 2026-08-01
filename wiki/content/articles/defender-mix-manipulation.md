---
title: Defender-mix manipulation
slug: defender-mix-manipulation
summary: >-
  Defender-mix manipulation is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 54
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
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - combat-power
---
Defender-mix manipulation is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Power weights anti-light/anti-heavy values against fleet composition. Feeding or removing a screen changes the opponent’s weighted efficiency. Scout compositions, then counter the share—not the ship count.

## Why it works

Combat estimates react to the opposing light/heavy mix. The useful question is therefore which target share the defender presents, not merely how many hulls it owns.

## Execution

- Record the defender’s current light and heavy shares.
- Preview more than one attacking mix.
- Account for infrastructure and reinforcements separately.
- Use a small first action only when its strategic purpose justifies revealing intent.

## Risks and counterplay

- A refreshed garrison can reverse the preferred matchup.
- Displayed aggregate power can conceal a poor target-class fit.
- Sacrificial setup waves may cost more than the efficiency gained.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
