---
title: Borrowing and repayment
slug: borrowing-and-repayment
summary: A practical borrowing workflow with exact interest timing, partial principal repayment, maturity, reserves, and default avoidance.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 86
aliases: [repay loan, organization borrowing, partial loan payment]
relatedPages: [loans-and-credit-book, credit-ratings, treasury-and-holdings, organization-screen]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-credit-1175]
mechanicDependencies: []
---
Borrowing transfers the chosen principal immediately and starts a daily interest schedule one day later. The loan matures after the selected 1–7-day term. [Evidence](#evidence-organization-credit-1175)

| Stage | Confirm |
|---|---|
| Offer | lender, available principal, daily rate, minimum credit grade |
| Acceptance | personal or controlled-organization destination, principal, 1–7-day term |
| During term | `ceil(outstanding principal × rate / 100)`, next collection, maturity, available balance |
| Repayment | partial or full principal amount and resulting daily interest |
| Closure | zero principal, closed state, and whether it qualified as a seasoned repayment |

Principal repayment may be partial and moves directly to lender treasury. A full early repayment closes the loan. It does not prepay future interest; the credit-history bonus for a seasoned repayment requires that positive interest was already paid. [Evidence](#evidence-organization-credit-1175)

## Safe reserve

Reserve at least the next daily interest plus remaining principal before discretionary spending. For a 1,000-Noctmark loan at 2.5% daily, the first charge is 25. Repaying 400 principal before the next collection lowers the following charge to `ceil(600 × 0.025) = 15`.

Do not empty the account for [Dividends](/wiki/dividends/), share bids, or other actions while interest is due. Collection is automatic and default is immediate if the selected borrower balance cannot cover it.
