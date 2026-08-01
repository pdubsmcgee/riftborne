---
title: Treasury and holdings
slug: treasury-and-holdings
summary: How to separate spendable treasury, investments, receivables, restricted amounts, and pending organization obligations.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 84
aliases:
  - organization treasury
  - company holdings
relatedPages:
  - organizations
  - organization-fair-value
  - loans-and-credit-book
  - dividends
  - buybacks
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - runtime-economy-1175
  - live-world-1175
mechanicDependencies: []
---
Treasury is useful only to the extent the active interface permits it to be spent. Keep cash-like balance distinct from holdings, receivables, and amounts reserved for pending actions. [Evidence](#evidence-live-world-1175)

## Liquidity view

| Bucket | Operational question |
|---|---|
| Available treasury | Can it fund an action immediately? |
| Reserved or pending | Which confirmation or contract claims it? |
| Holdings | What asset is owned and how is it valued? |
| Receivables | When and under what condition does it settle? |
| Debt service | What payment is due before discretionary spending? |
| Distribution capacity | What does the dividend or buyback screen allow? |

Take all figures from one timestamp, then reconcile them with [Loans and the credit book](/wiki/loans-and-credit-book/) and [Contracts](/wiki/contracts/). A high fair value does not prove high immediate liquidity.

> **Needs verification:** Currency units, reservation order, negative balances, holding valuation, settlement latency, and which roles can commit treasury funds.

