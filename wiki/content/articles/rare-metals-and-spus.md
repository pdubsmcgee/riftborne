---
title: 'Rare metals, mining outposts, Noctmarks, and SPUs'
slug: rare-metals-and-spus
summary: >-
  Rare metals, mining outposts, Noctmarks, and SPUs is part of Riftborne’s
  expansion and buildings system and is documented here for patch 11.73.
category: Economy
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 35
aliases: []
relatedPages: []
sources:
  - local-guide
  - local-data
legacyHash: rare-metals-mining-outposts-noctmarks-and-spus
---
Rare metals, mining outposts, Noctmarks, and SPUs is part of Riftborne’s expansion and buildings system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Rare-metal tables are Echo Vein, Prismatic Lode, Xeno Shardfield, Vant Flux Rift, Radian Crucible, and Noct Cache. They bias Echorite, Prismalloy, Xenocite, Vantium, Radianite, and Noctium respectively or in combinations.

Drill mining rolls once per whole minute:

```text
chance = 0.05 + ((drill level - 1) / 19) × 0.95
```

That is 5% at level 1, 50% at level 10, and 100% at level 20. Drill auto-level is tied to lifetime metals mined, from below 100 at level 1 to 10,000+ at level 20.

Refiner attempts one SPU craft per hour and converts `10 Noctium → 10 Noctmarks` hourly. SPU deliveries start every 24 hours after the first production.

SPU strength:

```text
bonus per unit = average(Drill level, Refiner level) × 0.1%
stack bonus = bonus per unit × identical stack count
```

SPUs can affect class attack/defense/speed/training/upkeep; production/storage/build/research/transmute speed; global upkeep; travel; base defense; fleet attack/defense/siege/raid/cargo/crit/evasion/tracking; spy survival; and diplomacy penalties.

Derived priority: Drill and Refiner levels should improve before an empire mass-produces a permanent SPU stack. Daily delivery waves create discrete power spikes that can support coordinated purchases and campaigns.
