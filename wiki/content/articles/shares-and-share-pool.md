---
title: Shares and the share pool
slug: shares-and-share-pool
summary: How to distinguish issued ownership, unallocated share-pool capacity, percentages, and pending share actions.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 81
aliases:
  - organization shares
  - share pool
relatedPages:
  - organizations
  - existing-share-sales
  - follow-on-funding-and-dilution
  - dividends
  - buybacks
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Share records describe ownership at a point in time. Separate shares already held by owners from any share-pool capacity the organization may allocate through a later action. [Evidence](#evidence-live-world-1175)

## Ownership ledger

| Field | Record separately |
|---|---|
| Issued shares | Shares currently assigned to holders |
| Share pool | Unallocated or organization-held capacity shown by the client |
| Holder stake | Count and displayed percentage |
| Pending action | Proposed issue, transfer, sale, or repurchase |
| Post-action stake | Confirmation-screen projection, if shown |

Never assume that pool shares have the same economic or voting treatment as issued shares. For a transfer between current owners, use [Existing-share sales](/wiki/existing-share-sales/). For newly allocated ownership, use [Follow-on funding and dilution](/wiki/follow-on-funding-and-dilution/).

> **Needs verification:** Authorized-versus-issued terminology, voting rights, fractional shares, pool replenishment, transfer restrictions, and the denominator used for displayed percentages must be confirmed in the active world.

