---
title: Espionage
slug: espionage
summary: >-
  Espionage missions use Intelligence hulls to obtain time-sensitive information
  about hostile bases and objectives.
category: Warfare and intelligence
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 34
aliases: []
relatedPages:
  - raids-shields-siege-and-spies
  - raid-ceiling
  - shield-integrity
  - siege
sources:
  - local-guide
---
Espionage missions use Intelligence hulls to obtain time-sensitive information about hostile bases and objectives. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Spy missions accept Intelligence hulls only.

```text
survival = clamp(0.65 + spy-survival bonus, 0.05, 0.95)
losses = ceil((defender spy-defense power / 12) × (1 - survival))
```

Fresh intel is perishable. Record when a report was taken, what could reinforce before arrival, and whether the target deliberately showed a weak garrison.
