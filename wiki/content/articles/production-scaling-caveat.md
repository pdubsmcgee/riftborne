---
title: Production scaling caveat
slug: production-scaling-caveat
summary: >-
  Production increments are campaign inputs; the active colony preview is the
  authority for a world’s current hourly output.
category: Economy
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 17
aliases: []
relatedPages:
  - resources
  - the-storage-rule
  - astra-upkeep-and-starvation
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Resource-building increments are campaign inputs. The current executable applies the configured increment to the matching production building, but a wiki-wide coefficient would be wrong for worlds that change that setting. [Evidence](#evidence-runtime-economy-1175)

Use the active colony preview for current hourly production and the projected change shown for an upgrade. Comparisons between worlds must state the campaign settings used.
