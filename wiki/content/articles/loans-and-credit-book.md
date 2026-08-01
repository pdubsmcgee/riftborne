---
title: Loans and the credit book
slug: loans-and-credit-book
summary: A lender-and-borrower ledger for organization loans, outstanding principal, repayment status, and credit exposure.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 85
aliases:
  - organization loans
  - credit book
relatedPages:
  - organizations
  - borrowing-and-repayment
  - credit-ratings
  - treasury-and-holdings
  - contracts
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
The credit book is a dated record of claims and obligations. Read each loan’s displayed parties, principal, status, schedule, and settlement state rather than inferring terms from the headline balance. [Evidence](#evidence-live-world-1175)

## Loan ledger

| Field | Lender view | Borrower view |
|---|---|---|
| Counterparty | Who owes | Who is owed |
| Principal | Amount exposed | Amount received or outstanding |
| Price of credit | Return shown | Charge shown |
| Schedule | Expected receipt | Required payment |
| Status | Current, pending, late, closed | Current, pending, late, closed |
| Recovery | Client-described remedy | Client-described consequence |

Use [Borrowing and repayment](/wiki/borrowing-and-repayment/) before accepting or paying a loan. Use [Credit ratings and factors](/wiki/credit-ratings/) only as an observed indicator, not a substitute for the loan ledger.

> **Needs verification:** Interest calculation, compounding, grace periods, default remedies, early repayment, collateral, write-offs, and whether obligations survive ownership changes.

