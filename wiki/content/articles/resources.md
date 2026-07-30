---
title: Resources
slug: resources
summary: >-
  The Riftborne economy consists of four stored resources whose value depends on
  production time, capacity, and scheduled spending.
category: Economy
pageType: overview
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
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
sources:
  - local-guide
  - local-data
legacyHash: economy-four-resources-and-one-invisible-clock
---
The Riftborne economy consists of four stored resources whose value depends on production time, capacity, and scheduled spending. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

The four core resources are:

| Resource | Storage | Main pressure |
|---|---|---|
| Vulkron | Silo | Heavy industry, buildings, ships |
| Aurelite | Silo | Broad economy and ship costs |
| Deuterium | Silo | Logistics and advanced hulls |
| Astra | Solar Cell | Buildings, ships, and stationed-fleet upkeep |

Standard passive production is:

```text
gain = base production per hour × resource multiplier × hours
stored = min(storage cap, old stored + gain)
```

Standard base production begins at 1,000 per hour for each resource. Tile and building bonuses add to the base multiplier; some Eldritch and SPU effects multiply afterward.
