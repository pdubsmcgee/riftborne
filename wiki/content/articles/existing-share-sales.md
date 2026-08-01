---
title: Existing-share sales
slug: existing-share-sales
summary: How player and organization sell orders, bids, escrow, settlement, cancellation, and first-public-share restrictions work.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 82
aliases: [secondary share sale, share transfer, share order book]
relatedPages: [shares-and-share-pool, follow-on-funding-and-dilution, organization-fair-value, treasury-and-holdings]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175]
mechanicDependencies: []
---
An existing-share sale transfers ownership and pays the seller; it does not fund the organization whose shares are traded. Players may trade personally or through an organization they control. [Evidence](#evidence-organization-capital-actions-1175)

## Orders

- A sell order reserves the full listed share quantity. The price is floored to a whole Noctmark with a minimum of 1.
- A bid immediately escrows `quantity × price` from the personal balance or selected controlled treasury.
- A player cannot buy their own sell order or sell into their own bid.
- An organization cannot buy its own stock through an ordinary bid; it must use a [Buyback](/wiki/buybacks/).
- A sole controlling holder with no public co-holder must use treasury issuance to open the first public shares.

Current orders fill as a complete listed quantity in the exposed transaction path, then close. When a holder sells, proceeds go to that holder’s personal balance or selling organization treasury. When treasury shares are sold, proceeds go to the issuing organization treasury.

Cancelling a sell order unlocks shares. Cancelling a bid returns its remaining escrow to the account that funded it. The audited path applies no share-trade fee. Always reopen the ownership screen after settlement because control is recalculated.
