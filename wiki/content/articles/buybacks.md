---
title: Buybacks
slug: buybacks
summary: A transaction guide for organization share repurchases, treasury cost, ownership changes, and the destination of repurchased shares.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 89
aliases:
  - share buyback
  - organization repurchase
relatedPages:
  - shares-and-share-pool
  - treasury-and-holdings
  - dividends
  - subsidiaries-and-control
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
A buyback spends organization resources to repurchase ownership from a holder. Use the projected post-action ledger because the destination and treatment of repurchased shares determine the result. [Evidence](#evidence-live-world-1175)

## Buyback checklist

| Field | Record |
|---|---|
| Seller | Holder and shares offered |
| Price | Total and per-share display, if present |
| Treasury cost | Purchase amount plus fees |
| Share destination | Pool, organization-held, retired, or other label |
| Ownership result | Remaining holders’ projected percentages |
| Control result | Any projected controller change |

Do not equate a buyback with a [Dividend](/wiki/dividends/): both use treasury, but one purchases a specific ownership claim while the other distributes value under the client’s eligibility rule.

> **Needs verification:** Pricing limits, seller consent, approval thresholds, repurchased-share destination, percentage denominator, fee treatment, and whether debt or contracts block a buyback.

