---
title: Fair value
slug: organization-fair-value
summary: The exact 11.75 fair-value formula, its inputs, penalties, macro adjustment, fallback, and practical interpretation.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 80
aliases: [organization valuation, organization fair value, company fair value, fair value formula]
relatedPages: [organizations, organization-screen, treasury-and-holdings, loans-and-credit-book, shares-and-share-pool]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-valuation-1175]
mechanicDependencies: []
---
Fair value is the client’s modelled value per outstanding share. In build `a7b5c7c`, the calculation is deterministic, but several inputs reflect current world and organization state. It is not a liquidation guarantee or the price at which another player must trade. [Evidence](#evidence-organization-valuation-1175)

## Denominator and asset base

`S = max(1, issued shares − treasury shares)`. Treasury shares therefore do not dilute the per-share denominator while they remain in treasury.

The adjusted asset base is `treasury + issued-loan principal + 0.82 × equity holdings − borrowed principal`. Backlog liability is deducted at 35% before the nonnegative balance value is divided by `S`.

## Per-share components

| Component | Contribution |
|---|---:|
| Adjusted balance value | `max(0, asset base − 0.35 × backlog liability) / S` |
| Positive net income, trailing 7 days | `4 × max(0, income) / S` |
| Backlog | `0.5 × max(0, backlog) / S` |
| Reinvestment | `0.65 × sum of track levels` |
| Equity holdings bonus | `0.38 × holdings / S` |
| Backlog-liability penalty | `0.28 × liability / S` |
| Daily interest due penalty | `2.1 × interest due / S` |
| Daily interest receivable bonus | `1.45 × receivable / S` |
| Scheduled dividend-income bonus | `1.8 × (30-day income / 30) / S` |
| Liquidity bonus | `1.2 × liquidity score` |
| Recent-default penalty | `0.35 × recent defaults` |

Sell pressure and dilution subtract `0.08 × recent dilution percent + 0.06 × shares-for-sale percent`. Ownership concentration above 55% subtracts `0.015` per percentage point.

## Macro adjustment and rounding

The subtotal is multiplied by `clamp(0.94 + 0.24 × (purchasing-power index − 1) − 0.18 × war-disruption fraction + 0.10 × clamp(catalyst pressure, −1, 1), 0.68, 1.34)`.

The result is rounded to two decimals with a minimum of 1 Noctmark. If it is effectively zero, the fallback is the lower of last trade price and seed-anchored price, also with a minimum of 1. [Evidence](#evidence-organization-valuation-1175)

Use fair value as a decomposition tool. A rising market price with flat fair value is demand, not automatically improved fundamentals. Compare it with [Treasury and holdings](/wiki/treasury-and-holdings/) and the actual order book before trading.
