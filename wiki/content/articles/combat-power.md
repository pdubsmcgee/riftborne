---
title: Combat power
slug: combat-power
summary: >-
  Combat power is derived from target composition, unit statistics, critical
  chance, tracking, evasion, and global multipliers.
category: Warfare and intelligence
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 28
aliases:
  - fleet power
  - combat simulator
  - 3200 power
relatedPages:
  - carrier-documentation-discrepancy
sources:
  - local-guide
legacyHash: combat-without-the-fog-machine
---
Combat power is derived from target composition, unit statistics, critical chance, tracking, evasion, and global multipliers. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Combat weights attack and defense against the opponent’s light/heavy mix.

```text
weighted attack =
  attack-vs-light × enemy light share +
  attack-vs-heavy × enemy heavy share

weighted defense =
  defense-vs-light × enemy light share +
  defense-vs-heavy × enemy heavy share
```

Unit SPUs and carrier aura modify those contributions. Crit contributes `1 + average crit / 200`. Tracking versus evasion contributes a multiplier clamped between 0.8 and 1.2:

```text
tracking edge = clamp((tracking - enemy evasion) / 200, -0.2, 0.2)
```

Attacker power then applies fleet and global attack multipliers. Defender power combines its crit-adjusted attack, multiplier-adjusted unit defense, flat base defense, global defense, and tracking edge.

On an Attack, one side breaks. Loss fractions are scaled so the losing side is wiped. On a Raid, the same raw fractions start halved; raids are softer, not safe.

Large overmatch gives only a limited casualty discount. Attack incoming damage bottoms at 75% around 3× overmatch; raid incoming damage bottoms at 90%. Even an overwhelming fleet therefore continues to take meaningful incoming damage.

Small fleets suffer rounding:

```text
lost ships = round(original count × loss fraction)
```

This makes one- and two-hull probes swing between no effect and total loss.
