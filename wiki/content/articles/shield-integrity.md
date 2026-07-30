---
title: Shield integrity
slug: shield-integrity
summary: >-
  Ion Shield integrity scales a shield’s defensive contribution and is reduced
  by every direct attack.
category: Warfare and intelligence
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 32
aliases:
  - Solis Battery
  - shield grinding
  - base defense
relatedPages:
  - raids-shields-siege-and-spies
  - raid-ceiling
  - siege
  - espionage
sources:
  - local-guide
---
Ion Shield integrity scales a shield’s defensive contribution and is reduced by every direct attack. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Every Attack chips Ion Shield integrity even if the attackers die:

```text
base damage % = attacker opening power / 45,000
ratio = attacker power / defender power
blend = ratio / (ratio + 1)
factor = 0.90 + 0.20 × blend
integrity damage = base damage × factor
```

Only siege removes actual building levels. Integrity attrition, however, can prepare a later breach.
