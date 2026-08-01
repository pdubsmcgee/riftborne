---
title: Follow-on funding and dilution
slug: follow-on-funding-and-dilution
summary: A practical guide to recording new organization funding, share allocation, ownership dilution, and post-transaction control.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 83
aliases:
  - follow-on investment
  - dilution
  - capital raise
relatedPages:
  - shares-and-share-pool
  - existing-share-sales
  - treasury-and-holdings
  - subsidiaries-and-control
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Follow-on funding can change both organization liquidity and ownership. Use the confirmation screen’s projected post-action ledger instead of applying an assumed finance formula. [Evidence](#evidence-live-world-1175)

## Funding worksheet

| Before | Transaction | After |
|---|---|---|
| Issued shares | New or pool shares allocated | New issued total |
| Holder counts | Contributor and amount | New holder counts |
| Ownership percentages | Displayed price or terms | Recalculated percentages |
| Treasury balance | Funding inflow and fees | Spendable post-settlement balance |
| Control | Current controller | Projected controller |

Dilution means an existing holder’s percentage can fall even if their share count does not. Check the new denominator and control result separately. Link the capital effect to [Treasury and holdings](/wiki/treasury-and-holdings/) and the governance effect to [Subsidiaries and control](/wiki/subsidiaries-and-control/).

> **Needs verification:** Pricing rules, pool consumption, approval thresholds, pre-emption rights, minimum investment, fee treatment, and the exact control test.

