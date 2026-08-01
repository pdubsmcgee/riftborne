---
title: Fair value
slug: organization-fair-value
summary: A cautious guide to interpreting displayed organization fair value and reconciling it with assets, liabilities, and ownership.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 80
aliases:
  - organization valuation
  - company fair value
relatedPages:
  - organizations
  - organization-screen
  - treasury-and-holdings
  - loans-and-credit-book
  - shares-and-share-pool
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Displayed fair value is a live-world figure. Use it as the client’s current estimate, not as guaranteed liquidation proceeds or a permanent formula. [Evidence](#evidence-live-world-1175)

## Reconciliation worksheet

| Component | Question to ask |
|---|---|
| Treasury | Is the full balance spendable now? |
| Holdings | What price and timestamp value each holding? |
| Receivables | Are repayments or contracts counted before settlement? |
| Liabilities | Are principal, accrued charges, and pending payments deducted? |
| Control interests | How are subsidiaries represented? |
| Share count | Is the figure organization-wide or per issued share? |

Record the displayed total and its components from the same refresh. If a component cannot be reconciled, label the difference rather than forcing an invented residual. Pair the result with [Shares and the share pool](/wiki/shares-and-share-pool/) before quoting a per-share figure.

> **Needs verification:** The exact valuation formula, mark-to-market source, treatment of illiquid holdings, subsidiary consolidation, loan-loss assumptions, and rounding are not established by current evidence.

