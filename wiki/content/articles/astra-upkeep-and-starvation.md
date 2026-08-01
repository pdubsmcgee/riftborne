---
title: Astra upkeep and starvation
slug: astra-upkeep-and-starvation
summary: >-
  Astra supports both construction and stationed fleets; a base at zero Astra
  begins losing garrisoned ships.
category: Economy
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 16
aliases:
  - zero Astra
  - ship starvation
  - upkeep
relatedPages:
  - resources
  - the-storage-rule
  - production-scaling-caveat
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - runtime-fleets-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Astra supports construction and stationed fleets. A colony whose stationed upkeep exceeds its Astra supply can begin losing garrisoned ships. [Evidence](#evidence-runtime-economy-1175)

The safe operating rule is to use the live hourly trend: estimate the runway from current Astra and the displayed net drain, then include incoming or departing reinforcements before relying on that colony.

Upkeep modifiers and starvation timing can vary with the current roster, structures, SPUs, and world settings. This wiki therefore does not publish a universal loss interval. Confirm the destination’s Astra runway before reinforcing an ally. [Evidence](#evidence-live-world-1175)
