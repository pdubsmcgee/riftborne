---
title: Contracts
slug: contracts
summary: Current contract types, target requirements, payout escrow, acceptance, settlement destination, cancellation, and risk checks.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 91
aliases: [organization contracts, multiplayer contract, contract escrow, bounty]
relatedPages: [organizations, organization-screen, treasury-and-holdings, loans-and-credit-book]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-contracts-1175]
mechanicDependencies: []
---
Contracts let a controlled organization fund a measurable action against another player. Posting removes the payout from treasury and retained earnings immediately and holds it in contract escrow. [Evidence](#evidence-organization-contracts-1175)

| Type | Current validation at posting |
|---|---|
| Destroy base | Target has a non-spawn base; target value fixed to 1 |
| Destroy building levels | Building type required; at least 1 level; target currently owns that building |
| Destroy ship Astra | At least 10 Astra of ship destruction |
| Destroy mining outpost | Target has a mining outpost; target value fixed to 1 |
| Break ion-shield integrity | At least 10 integrity and target has a shield |
| Raid resources total | At least 100 total resources |
| Raid one resource | At least 50 of the selected resource |
| Raid Astra total | At least 40 Astra |

The creator cannot target themself. A contract starts pending; a different player may accept it and choose personal settlement or the treasury of an organization they control. Completed progress and payout are then tracked against the accepted contract.

Cancellation closes the contract and returns remaining escrow to the posting organization’s treasury and retained earnings. It does not pay the accepter. Closed contracts cannot be cancelled again. Before posting, treat the full payout as unavailable even if another summary has not refreshed yet.

Contracts are operational incentives, not loans: there is no principal repayment. Check target feasibility, current war state, and the exact settlement destination before acceptance.
