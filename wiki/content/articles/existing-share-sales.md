---
title: Existing-share sales
slug: existing-share-sales
summary: A transaction checklist for sales between current share owners that do not automatically fund the organization treasury.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 82
aliases:
  - secondary share sale
  - share transfer
relatedPages:
  - shares-and-share-pool
  - follow-on-funding-and-dilution
  - organization-fair-value
  - treasury-and-holdings
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
An existing-share sale should be read from its confirmation screen as a transfer between named parties. Do not assume the organization receives proceeds unless the interface explicitly says so. [Evidence](#evidence-live-world-1175)

## Before confirming

| Check | Record |
|---|---|
| Seller | Current holder and shares available |
| Buyer | Eligible recipient |
| Quantity | Shares transferred |
| Consideration | Amount, units, and payer |
| Fees | Who pays and when |
| Ownership result | Both parties’ projected percentages |
| Treasury result | Explicit organization balance change, if any |

Compare this with [Follow-on funding and dilution](/wiki/follow-on-funding-and-dilution/): a secondary sale usually changes who owns an existing claim, while follow-on funding may create or allocate a claim and change the denominator. The exact client wording controls.

> **Needs verification:** Settlement timing, cancellation, price limits, taxes or fees, buyer eligibility, and whether any sale type routes proceeds to the treasury.

