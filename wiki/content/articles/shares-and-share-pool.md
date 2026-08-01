---
title: Shares and the share pool
slug: shares-and-share-pool
summary: Exact authorized, issued, treasury, outstanding, reserved, and holder-share concepts used by organizations in 11.75.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 81
aliases: [organization shares, share pool, treasury shares, outstanding shares]
relatedPages: [organizations, existing-share-sales, follow-on-funding-and-dilution, dividends, buybacks]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175, organization-valuation-1175]
mechanicDependencies: []
---
The current organization model distinguishes authorized, issued, treasury, outstanding, held, and reserved shares. All are whole shares. [Evidence](#evidence-organization-capital-actions-1175)

| Field | Meaning |
|---|---|
| Authorized shares | Capacity tracked by the organization; follow-on funding increases it |
| Issued shares | Total created, including shares held in treasury |
| Treasury shares | Issued shares held by the organization rather than an outside holder |
| Outstanding shares | `max(1, issued shares) − treasury shares`, clamped nonnegative |
| Holder shares | Direct player shares or shares held by another organization |
| Reserved shares | Existing or treasury shares committed to an active sell order |

Displayed stake is held shares divided by outstanding shares. Snapshot labels are Majority at 50% or more, Blocking at 25%, Influence at 10%, Stake at 5%, and Minor below 5%. These labels describe stake size; operational control follows the effective largest-holder rule. [Evidence](#evidence-organization-valuation-1175)

An active sell order locks its quantity from other sales. A bid locks the buyer’s Noctmarks in escrow. Treasury shares receive no dividend because dividends iterate current player and organization holders only.
