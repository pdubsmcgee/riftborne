---
title: Buybacks
slug: buybacks
summary: Exact buyback authorization, escrow, pricing, settlement, cancellation, treasury-share destination, and control effects.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 89
aliases: [share buyback, organization repurchase, treasury bid]
relatedPages: [shares-and-share-pool, treasury-and-holdings, dividends, subsidiaries-and-control]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175]
mechanicDependencies: []
---
A buyback is a treasury-funded bid for the organization’s own shares. Only the controlling player can authorize it. [Evidence](#evidence-organization-capital-actions-1175)

The bid price is floored to a whole Noctmark with a minimum of 1. The requested budget must buy at least one share and treasury must cover it. The system computes `floor(budget / bid price)` shares, escrows exactly `shares × bid price`, subtracts that amount from treasury and retained earnings, and places a treasury bid.

When a holder sells into it, the holder receives the escrowed price and the purchased shares become treasury shares. Treasury shares leave the outstanding-share denominator, so the remaining outside holders’ percentages rise even though their counts do not.

Cancelling an unfilled treasury bid returns remaining escrow to treasury and retained earnings. No separate fee, debt block, contract block, or seller compulsion appears in the audited core method: a seller must choose to fill the bid. Compare the ownership effect with [Dividends](/wiki/dividends/), which distribute cash without changing share counts.
