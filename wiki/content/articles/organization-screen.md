---
title: Organization screen field guide
slug: organization-screen
summary: A practical checklist for reading an organization screen without confusing displayed totals, estimates, permissions, or pending actions.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 79
aliases:
  - organization interface
  - company screen
relatedPages:
  - organizations
  - organization-fair-value
  - treasury-and-holdings
  - credit-ratings
  - organization-progression
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - runtime-organizations-1175
  - organization-ui-1175
mechanicDependencies: []
fieldGuide:
  title: Organization screen fields
  caption: Current screen families are confirmed; exact live values and permissions remain observations.
  rows:
    - field: Identity and control
      meaning: Organization identifier, owner, parent, or controlling relationship shown by the current screen.
      changes: Ownership and control actions that settle successfully.
      why: Prevents decisions against the wrong entity or assumed controller.
      status: observed
      evidenceIds: [runtime-organizations-1175, organization-ui-1175]
    - field: Shareholders and share pool
      meaning: Current ownership records and any separately displayed unallocated capacity.
      changes: Settled share issues, transfers, sales, or repurchases.
      why: Establishes claims and possible dilution before a transaction.
      status: observed
      evidenceIds: [runtime-organizations-1175, organization-ui-1175]
    - field: Capital history and treasury
      meaning: Organization-side balances and recorded capital events, not a holder's personal proceeds.
      changes: Organization receipts, spending, distributions, and settled obligations.
      why: Distinguishes internal funding from secondary-owner payments.
      status: observed
      evidenceIds: [runtime-organizations-1175, organization-ui-1175]
    - field: Loans and credit
      meaning: Borrowing, repayment, default, and rating surfaces exposed by the current client.
      changes: The active loan lifecycle and current credit calculation.
      why: Reveals obligations that can constrain discretionary capital actions.
      status: needs verification
      evidenceIds: [runtime-organizations-1175, organization-ui-1175]
    - field: Contracts and pending actions
      meaning: Current obligations, counterparties, status, and confirmation state.
      changes: Posting, acceptance, completion, cancellation, or expiry under live rules.
      why: Separates settled results from actions that can still fail or change.
      status: needs verification
      evidenceIds: [runtime-organizations-1175, organization-ui-1175]
---
Treat the organization screen as a live snapshot. The screen families are present in the current CLI, but names, balances, ownership, permissions, and pending actions can change after capture. [Evidence](#evidence-organization-ui-1175)

Before confirming an action, compare the summary screen with the final confirmation. Record whether values are estimates, settled amounts, pending transfers, or projected results. Use [Fair value](/wiki/organization-fair-value/) for valuation vocabulary and [Treasury and holdings](/wiki/treasury-and-holdings/) for liquidity.

> **Needs verification:** Tab names, refresh behavior, role permissions, rounding, and whether pending actions are included in totals must be checked on the active screen.
