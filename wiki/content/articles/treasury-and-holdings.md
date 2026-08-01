---
title: Treasury and holdings
slug: treasury-and-holdings
summary: What enters and leaves organization treasury, how orders reserve capital, and how holdings and obligations affect liquidity.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 84
aliases: [organization treasury, company holdings, treasury liquidity, reserved Noctmarks]
relatedPages: [organizations, organization-fair-value, loans-and-credit-book, dividends, buybacks]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175, organization-credit-1175, organization-contracts-1175]
mechanicDependencies: []
---
Treasury is the organization’s Noctmark balance. The action being taken determines whether capital remains liquid, moves to escrow, becomes a holding, or leaves the organization. [Evidence](#evidence-organization-capital-actions-1175)

| Action | Immediate treasury effect |
|---|---|
| Treasury-share or follow-on listing | None until a buyer pays |
| Sale of treasury shares | Buyer payment enters treasury |
| Organization share bid | Full bid value leaves treasury for escrow |
| Cancelled organization bid | Remaining escrow returns to treasury |
| Buyback authorization | Buyback value leaves treasury for escrow |
| Contract posting | Full payout leaves treasury for contract escrow |
| Contract cancellation | Remaining escrow returns |
| Loan issued | Principal leaves lender treasury immediately |
| Loan borrowed into organization | Principal enters borrower treasury immediately |
| Principal or interest payment | Leaves borrower and enters lender treasury |
| Dividend interval | Full holder payout leaves treasury, or the interval is skipped |

Shares bought through an organization become that organization’s equity holdings. Their reference valuation combines fair value and last trade price when both exist: 65% fair value and 35% last price. The separate fair-value model applies an additional holdings weight rather than treating every holding as instantly spendable cash.

For safe liquidity, subtract all bid, buyback, and contract escrow already committed, then reserve the next loan interest and maturity principal. A high [Fair value](/wiki/organization-fair-value/) does not prove that treasury can cover an immediate action.
