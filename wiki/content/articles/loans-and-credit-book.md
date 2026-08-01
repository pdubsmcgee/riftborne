---
title: Loans and the credit book
slug: loans-and-credit-book
summary: Current loan-offer rules, daily interest, maturity, defaults, treasury seizure, and lender and borrower ledger fields.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 85
aliases: [organization loans, credit book, daily interest]
relatedPages: [organizations, borrowing-and-repayment, credit-ratings, treasury-and-holdings, contracts]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-credit-1175]
mechanicDependencies: []
---
The credit book records organization-funded loans to players or organizations. Principal moves immediately from lender treasury to the selected borrower destination. Duration is limited to 1–7 days, and an organization cannot borrow from itself. [Evidence](#evidence-organization-credit-1175)

## Offers and interest

A controlling player configures an offer from organization treasury, chooses a daily rate greater than 0% and no more than 100%, and may require a minimum credit grade. Active offers cannot collectively make more Noctmarks available than current treasury.

Daily interest is simple, not added to principal: `ceil(outstanding principal × daily rate / 100)`. Because it uses outstanding principal, an early partial principal payment reduces later daily charges. Interest is attempted once per elapsed day through maturity and transfers to lender treasury and retained earnings.

## Default

There is no grace period in the audited core path. Missing scheduled interest causes immediate default for principal plus that interest. Reaching maturity with principal outstanding causes default for that principal. The system seizes as much as is currently available from the borrower, closes the loan, records any unrecovered balance, applies the credit penalty, and creates a temporary retaliation record. [Evidence](#evidence-organization-credit-1175)

| Borrower should track | Lender should track |
|---|---|
| Outstanding principal | Principal exposed |
| Daily interest and next collection | Daily receivable |
| Maturity | Maturity concentration |
| Spendable balance after other actions | Offer amount still backed by treasury |
| Credit score and qualifying-payment history | Recent defaults and unrecovered amounts |

Loan records remain obligations of their borrower entity when organization control changes; a share transaction does not cancel debt.
