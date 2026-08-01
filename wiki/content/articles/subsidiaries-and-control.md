---
title: Subsidiaries and control
slug: subsidiaries-and-control
summary: A cautious guide to organization ownership chains, displayed controllers, subsidiary boundaries, and control-change checks.
category: Multiplayer
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-07-30'
order: 90
aliases:
  - subsidiary
  - organization control
  - parent company
relatedPages:
  - organizations
  - shares-and-share-pool
  - follow-on-funding-and-dilution
  - organization-fair-value
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - live-world-1175
mechanicDependencies: []
---
Control should be taken from the active organization screen, not inferred from a familiar real-world corporate threshold. Ownership percentages and displayed control are related observations but may not be identical. [Evidence](#evidence-live-world-1175)

## Control map

| Entity | Direct owner | Stake shown | Controller shown | Timestamp |
|---|---|---:|---|---|
| Parent | Record from screen | Record | Record | Record |
| Subsidiary | Record from screen | Record | Record | Record |
| Lower-tier entity | Record from screen | Record | Record | Record |

Trace each link separately. After a share sale, funding round, or buyback, re-open every affected entity and record the new controller. Keep [Fair value](/wiki/organization-fair-value/) separate from the control map unless the client explicitly consolidates subsidiaries.

> **Needs verification:** The control threshold, tie handling, indirect ownership, voting versus economic rights, maximum depth, circular ownership prevention, consolidation, and controller permissions.

