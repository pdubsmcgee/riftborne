---
title: Raid ceiling
slug: raid-ceiling
summary: >-
  Raid yield is limited by surviving cargo capacity, visible target resources,
  and raid-loot modifiers.
category: Warfare and intelligence
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 31
aliases: []
relatedPages:
  - raids-shields-siege-and-spies
  - shield-integrity
  - siege
  - espionage
sources:
  - local-guide
---
Raid yield is limited by surviving cargo capacity, visible target resources, and raid-loot modifiers. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

```text
carry = Σ(count × cargo × carrier effect) × fleet cargo multiplier
ceiling = min(carry, target total)
ceiling = min(target total, ceiling × raid-loot multiplier)
visible = target total × (1 - hidden fraction)
```

Loot is then taken randomly by resource from visible stock. Nano Storage therefore reduces expected value, while Orbital Exchange, cargo hulls, directive/SPU bonuses, and Veil effects raise it.

Veil Stolen Breath takes an extra:

```text
min(10% of main steal, 5% of remaining target resources)
```
