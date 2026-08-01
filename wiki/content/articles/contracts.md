---
title: Contracts
slug: contracts
summary: A field ledger for organization contract parties, obligations, triggers, settlement, permissions, and operational risk.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 91
aliases:
  - organization contracts
  - multiplayer contract
relatedPages:
  - organizations
  - organization-screen
  - treasury-and-holdings
  - loans-and-credit-book
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Contracts are active-world obligations. Preserve the exact offer and confirmation text because a title or summary may omit conditions that determine settlement. [Evidence](#evidence-live-world-1175)

## Contract ledger

| Field | Record |
|---|---|
| Parties | Every organization or player bound |
| Consideration | What each party commits |
| Trigger | Event or time that activates performance |
| Deadline | Client-displayed due time and timezone |
| Settlement | Automatic or manual action shown |
| Failure state | Client-described consequence |
| Authority | Role or account that may accept, alter, or cancel |

Reserve any promised treasury or holdings in the organization’s operational plan even if the main balance still displays them. Cross-check lending-like terms against [Loans and the credit book](/wiki/loans-and-credit-book/).

> **Needs verification:** Supported contract types, escrow, amendments, cancellation, breach remedies, visibility, transferability, recurring obligations, and settlement order.

