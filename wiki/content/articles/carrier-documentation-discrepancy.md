---
title: Carrier values and custom rosters
slug: carrier-documentation-discrepancy
summary: >-
  Carrier effects must be read from the active roster and combat preview because
  multiplayer worlds can use detached or modified ship statistics.
category: Reference
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 29
aliases: []
relatedPages:
  - combat-power
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies: []
---
Carrier effects are roster-dependent. The active multiplayer operator can supply a custom or detached ship roster, so a carrier coefficient copied from another campaign is not reliable. [Evidence](#evidence-live-world-1175)

Use the current Codex roster and combat preview for the active world. This wiki does not publish a universal carrier percentage until the value is exposed by a current, ruleset-specific source.
