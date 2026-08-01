---
title: Credit ratings and factors
slug: credit-ratings
summary: Exact credit-score inputs, caps, penalties, grade thresholds, qualifying payments, and ways to recover after a default.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 87
aliases: [credit rating, organization credit score, AAA rating]
relatedPages: [loans-and-credit-book, borrowing-and-repayment, treasury-and-holdings, organization-fair-value]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-credit-1175]
mechanicDependencies: []
---
A credit score begins at 74 and is recalculated from business activity, good payments, active debt, and defaults. The final score is clamped from 0 to 100. [Evidence](#evidence-organization-credit-1175)

## Formula

`score = clamp(74 + activity + good payments − active-debt penalty − recent-default penalty, 0, 100)`

| Input | Rule |
|---|---|
| Organization activity | Up to 6 recorded economic-reliability events |
| Personal activity | Marketplace trades, contracts, and share trades; each count is capped at 5 and multiplied by 0.4, with 6 points total maximum |
| On-time streak | Up to 8 points |
| Seasoned loans repaid | Up to 3 loans at 4 points each |
| Active debt | Up to 8 points: outstanding/original principal × 5, plus 1 for each active loan beyond the first |
| Recent defaults | 30 points each, capped at 60, during the previous 30 days |

Good-payment credit is capped at 20. A loan must have original principal of at least 80 Noctmarks to qualify. An on-time scheduled payment counts only when interest is positive. A seasoned repayment requires positive interest paid and full principal repayment no later than maturity. Default resets the on-time streak to zero. [Evidence](#evidence-organization-credit-1175)

## Grades

| Minimum score | Grade |
|---:|---|
| 88 | AAA |
| 80 | AA |
| 71 | A |
| 61 | BBB |
| 49 | BB |
| 37 | B |
| 0 | CCC |

Loan offers may specify a minimum acceptable grade. Recovery after default is slow by design: avoid another default, reduce active exposure, generate legitimate activity, and complete qualifying interest-bearing loans on time.
