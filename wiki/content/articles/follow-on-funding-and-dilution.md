---
title: Follow-on funding and dilution
slug: follow-on-funding-and-dilution
summary: How follow-on funding creates treasury shares, lists them for sale, changes the denominator, and delivers capital after purchase.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 83
aliases: [follow-on investment, dilution, capital raise, new share issue]
relatedPages: [shares-and-share-pool, existing-share-sales, treasury-and-holdings, subsidiaries-and-control]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175, organization-valuation-1175]
mechanicDependencies: []
---
Follow-on funding creates new shares and lists them from treasury. Only the controlling player can launch it. Quantity must be positive; ask price is floored to a whole number with a minimum of 1 Noctmark. [Evidence](#evidence-organization-capital-actions-1175)

| Before sale | Launch | When bought |
|---|---|---|
| Authorized share count | Increases by quantity | Unchanged |
| Issued share count | Increases by quantity | Unchanged |
| Treasury shares | Increases by quantity | Decreases by shares sold |
| Outstanding shares | Initially unchanged | Increases by shares sold |
| Treasury Noctmarks | No immediate proceeds | Receives price × quantity |

Creating treasury shares does not immediately dilute holders because treasury shares are excluded from outstanding shares. Dilution occurs as buyers take shares out of treasury. An unchanged 60-share holding is 60% of 100 outstanding shares, but 50% after 20 new shares are sold and the denominator becomes 120.

The client records recent dilution as `new quantity / pre-launch outstanding shares × 100`, which can depress [Fair value](/wiki/organization-fair-value/). No pre-emption right or transaction fee appears in this core path. Recalculate control after each fill because it follows the effective largest stake, not a fixed majority threshold. [Evidence](#evidence-organization-valuation-1175)
