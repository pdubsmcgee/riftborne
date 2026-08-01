---
title: Dividends
slug: dividends
summary: A field guide for organization distributions, holder entitlements, treasury impact, and confirmation-screen reconciliation.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 88
aliases:
  - organization dividend
  - shareholder distribution
relatedPages:
  - shares-and-share-pool
  - treasury-and-holdings
  - loans-and-credit-book
  - buybacks
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
A dividend converts organization treasury into holder distributions according to the active confirmation screen. Record the entitlement snapshot and projected treasury change before approval. [Evidence](#evidence-live-world-1175)

## Distribution worksheet

| Field | Confirm |
|---|---|
| Basis | Total distribution or amount per eligible share |
| Eligible shares | Which issued shares count |
| Recipients | Holder list and projected receipts |
| Organization cost | Gross outflow plus any fees |
| Timing | Declaration, record, and settlement state shown |
| Remaining headroom | Treasury after debt and contracts |

Reconcile recipient totals to the organization outflow. Check [Shares and the share pool](/wiki/shares-and-share-pool/) for the relevant denominator and [Treasury and holdings](/wiki/treasury-and-holdings/) for liquidity.

> **Needs verification:** Eligibility timing, treatment of pool or organization-held shares, rounding residuals, minimum distribution, approval permissions, fees, and cancellation.

