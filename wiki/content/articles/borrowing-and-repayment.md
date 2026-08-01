---
title: Borrowing and repayment
slug: borrowing-and-repayment
summary: A confirmation checklist for taking organization credit, scheduling repayment, and preserving treasury headroom.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 86
aliases:
  - repay loan
  - organization borrowing
relatedPages:
  - loans-and-credit-book
  - credit-ratings
  - treasury-and-holdings
  - organization-screen
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Borrow only from the exact terms shown in the active confirmation flow. Projected proceeds are not the same as net spendable treasury, and a displayed due amount may change with settlement or timing. [Evidence](#evidence-live-world-1175)

## Decision table

| Stage | Confirm |
|---|---|
| Offer | lender, principal, total obligation, due timing |
| Acceptance | net treasury received, fees, rating effect |
| During term | next payment, available treasury, competing obligations |
| Repayment | amount applied, remaining principal, status after payment |
| Closure | zero balance and closed state on both ledgers |

Keep a repayment reserve separate from discretionary [Dividends](/wiki/dividends/) and [Buybacks](/wiki/buybacks/). Capture before-and-after screenshots or transcripts so a rounding or settlement difference can be diagnosed.

> **Needs verification:** Partial payments, automatic collection, payment priority, early-payment treatment, late penalties, default behavior, and whether repayment consumes reserved funds.

