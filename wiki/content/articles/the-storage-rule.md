---
title: The storage rule
slug: the-storage-rule
summary: >-
  Storage determines how long a base can continue producing before additional
  output is lost.
category: Economy
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 15
aliases: []
relatedPages:
  - resources
  - astra-upkeep-and-starvation
  - production-scaling-caveat
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-objectives-1175
  - live-world-1175
  - storage-screen-1175
mechanicDependencies: []
---
Storage determines how long a colony can continue producing before a resource reaches its individual cap. [Evidence](#evidence-runtime-economy-1175)

For Astraean colonies, Solvault supplies Vulkron, Aurelite, and Deuterium capacity, while Heliovex supplies Astra capacity. The corresponding Varkon buildings are Skarncache and Voltforge; the Veil buildings are Nyxvault and Gloamwell. [Evidence](#evidence-building-names-1175)

The captured live-world Heliovex entry reports Astra targets of 2,750 at level 1, 5,000 at level 5, and 100,000 at level 20. These are campaign values, not universal constants; consult the active colony detail before calculating an upgrade. [Evidence](#evidence-storage-screen-1175)

Treat capacity as a scheduling tool:

- Upgrade when production would cap before the next scheduled login.
- Move or market surpluses when another colony can use them.
- At objective sites, keep both culture-specific capacity buildings aligned when the objective detail says its next level is gated by the lower capacity level.
