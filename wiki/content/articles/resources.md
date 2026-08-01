---
title: Resources
slug: resources
summary: >-
  The Riftborne economy consists of four stored resources whose value depends on
  production time, capacity, and scheduled spending.
category: Economy
pageType: overview
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 14
aliases:
  - Vulkron
  - Aurelite
  - Deuterium
  - Astra
  - economy
relatedPages:
  - the-storage-rule
  - astra-upkeep-and-starvation
  - production-scaling-caveat
legacyHash: economy-four-resources-and-one-invisible-clock
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-fleets-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Riftborne tracks four colony resources: Vulkron, Aurelite, Deuterium, and Astra. Each resource has its own current amount, capacity, and hourly trend. [Evidence](#evidence-runtime-economy-1175)

## Production buildings

| Resource | Production building |
|---|---|
| Vulkron | Extractor |
| Aurelite | Synthesiser |
| Deuterium | Combinator |
| Astra | Solar Array |

The live interface reports all four resources together. Capacity is not a shared warehouse total: each resource has an independent cap. Production values and modifiers may differ by campaign, so the base preview is authoritative for the active world. [Evidence](#evidence-live-world-1175)

## Capacity buildings

| Culture | Vulkron, Aurelite, and Deuterium | Astra |
|---|---|---|
| Astraean | Solvault | Heliovex |
| Varkon | Skarncache | Voltforge |
| Veil | Nyxvault | Gloamwell |

The first building in each row supplies capacity to the first three resources. The second supplies Astra capacity. [Evidence](#evidence-building-effects-1175)

## Practical reading

A capped resource cannot receive further passive production. Before leaving a colony unattended, compare its current amount, cap, and hourly trend with the next expected login. Transfers and spending decisions should use the figures displayed for that colony rather than a wiki-wide assumed production rate.
