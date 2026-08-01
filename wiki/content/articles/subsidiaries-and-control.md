---
title: Subsidiaries and control
slug: subsidiaries-and-control
summary: How effective ownership, organization-held shares, largest-stake control, ties, subsidiaries, and control changes work.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 90
aliases: [subsidiary, organization control, parent company, controlling stake]
relatedPages: [organizations, shares-and-share-pool, follow-on-funding-and-dilution, organization-fair-value]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-valuation-1175]
mechanicDependencies: []
---
Operational control belongs to the player with the largest effective ownership stake. It does not require 50%: a 40/35/25 split gives control to the 40-share effective holder. [Evidence](#evidence-organization-valuation-1175)

Direct player shares count toward that player. Shares held by another organization are attributed through that organization’s effective controller when resolving the target’s control, with recursion protected against ownership cycles. The controller is refreshed after ownership-changing transactions.

## Tie rule

If several players share the largest effective stake, the current controller keeps control when included in the tie. Otherwise the founder wins when included. If neither applies, the deterministic identifier ordering breaks the tie. This means matching the leader’s count may not be enough to take control.

## Subsidiary label

The statistics model counts another organization as a controlled subsidiary only when the holder organization owns strictly more than half of the target’s outstanding shares: `held shares × 2 > outstanding shares`. That reporting threshold is distinct from the operational largest-stake controller rule.

After issuance, follow-on funding, a trade, or a buyback, check both direct ownership and the effective chain. A parent’s controller may indirectly control assets held by that parent even when no personal share line appears on the target.
