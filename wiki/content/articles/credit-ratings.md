---
title: Credit ratings and factors
slug: credit-ratings
summary: How to record an organization credit rating, its displayed factors, and changes without claiming an unsupported universal formula.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 87
aliases:
  - credit rating
  - organization credit score
relatedPages:
  - loans-and-credit-book
  - borrowing-and-repayment
  - treasury-and-holdings
  - organization-fair-value
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
A credit rating is an observed client output. Record the rating and every factor the same screen displays; do not reverse-engineer a universal score from a small sample. [Evidence](#evidence-live-world-1175)

## Rating log

| Field | Record |
|---|---|
| Rating | Exact grade, score, or label |
| Factors | Names, direction, and values shown |
| Debt | Outstanding and newly requested amount |
| Liquidity | Treasury figure shown at the same time |
| History | Recent repayments, late states, or defaults visible |
| Change event | Action immediately preceding a rating update |

Compare repeated observations from the same world and build. A correlation between treasury or repayment history and a rating change is useful evidence, but it is not proof of weighting.

> **Needs verification:** Factor weights, update cadence, hidden inputs, history window, subsidiary effects, caps, decay, and how the rating changes loan availability or terms.

