---
title: Siege
slug: siege
summary: >-
  Siege damage converts surviving siege capacity into building-level destruction
  after a successful attack.
category: Warfare and intelligence
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 33
aliases: []
relatedPages:
  - raids-shields-siege-and-spies
  - raid-ceiling
  - shield-integrity
  - espionage
sources:
  - local-guide
---
Siege damage converts surviving siege capacity into building-level destruction after a successful attack. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
raw siege = Σ(count × siege stat × carrier effect)
survival scale = max(0.2, surviving siege / initial siege)
final budget = raw siege × fleet siege multiplier × survival scale
```

Stasis Bastion multiplies that budget by 0.75. Each destroyed building level consumes 40% of that level’s total build cost. With no selected target, siege hits the highest-level building. A non-spawn base disappears when every building reaches zero.
