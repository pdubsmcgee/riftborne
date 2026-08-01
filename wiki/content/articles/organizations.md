---
title: Organizations overview
slug: organizations
summary: How organizations are founded and how ownership, treasury, markets, credit, contracts, control, and progression fit together.
category: Multiplayer
pageType: overview
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 78
aliases: [organization, company, found organization, organization ticker]
relatedPages: [organization-screen, organization-fair-value, treasury-and-holdings, loans-and-credit-book, contracts, organization-progression]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, runtime-organizations-1175, organization-capital-actions-1175, organization-credit-1175, organization-contracts-1175]
mechanicDependencies: []
---
Organizations are multiplayer entities with their own treasury, shares, holdings, contracts, loans, capital history, and controller. They let players pool or separate financial activity from personal Noctmarks. [Evidence](#evidence-runtime-organizations-1175)

## Founding

An organization name must contain at least 3 characters. Its ticker is exactly 3 unique letters from A–Z. Founding requires at least 1 Noctmark, funded either personally or from the treasury of an organization the player controls when creating a subsidiary.

A new organization begins with 100 authorized and 100 issued shares. The founder or parent receives all 100; none begin in treasury. Seed capital enters the new treasury. Initial share price is `max(1, round(seed capital / 100))`, using midpoint-away-from-zero rounding. [Evidence](#evidence-organization-capital-actions-1175)

## System map

| Question | Article |
|---|---|
| What does the screen mean? | [Organization screen](/wiki/organization-screen/) |
| What is it worth? | [Fair value](/wiki/organization-fair-value/) |
| Who owns it? | [Shares and the share pool](/wiki/shares-and-share-pool/) |
| How does new funding work? | [Follow-on funding and dilution](/wiki/follow-on-funding-and-dilution/) |
| What is actually liquid? | [Treasury and holdings](/wiki/treasury-and-holdings/) |
| How do loans and ratings work? | [Loans and the credit book](/wiki/loans-and-credit-book/) and [Credit ratings](/wiki/credit-ratings/) |
| How are jobs funded? | [Contracts](/wiki/contracts/) |
| Who controls subsidiaries? | [Subsidiaries and control](/wiki/subsidiaries-and-control/) |

The controlling player can authorize treasury actions, but control can move after trades or dilution. Reopen the organization after any ownership-changing transaction rather than assuming founder status is permanent.
