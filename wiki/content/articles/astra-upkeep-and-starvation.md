---
title: Astra upkeep and starvation
slug: astra-upkeep-and-starvation
summary: >-
  Astra supports both construction and stationed fleets; a base at zero Astra
  begins losing garrisoned ships.
category: Economy
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 16
aliases:
  - zero Astra
  - ship starvation
  - upkeep
relatedPages:
  - resources
  - the-storage-rule
  - production-scaling-caveat
sources:
  - local-guide
  - local-data
---
Astra supports both construction and stationed fleets; a base at zero Astra begins losing garrisoned ships. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
hourly upkeep = Σ(ship upkeep × stationed count)
after Drone Facility = upkeep × (1 - reduction)
Drone reduction = min(80%, 4% × level)
```

Veil’s Astra Suture Seal then multiplies remaining upkeep by 0.80. Stored base-side reduction is capped at 95% even if SPUs push it higher.

At zero Astra, the base loses one stationed ship every 10 simulation seconds, cheapest hull first. This creates two useful rules:

- Keep several hours of burn at military bases.
- Do not reinforce an ally until somebody confirms the destination can pay the upkeep.

Mining outposts draw Astra from their founding colony, falling back to the richest colony if that origin is gone.
