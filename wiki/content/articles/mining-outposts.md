---
title: Rare-metal mining outposts
slug: mining-outposts
summary: Rare-metal mining outposts connect eligible sites to the SPU workflow while consuming capacity from a founding colony.
category: Expansion and buildings
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 94
aliases:
  - mining outpost
  - rare metal site
  - rare-metal outpost
relatedPages:
  - outpost-types
  - settlement-slots
  - rare-metals-and-spus
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-settlement-slots-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
A rare-metal mining outpost is the settlement type used on an eligible rare-metal site. It consumes a settlement slot from the colony that founded it and connects that site to the SPU workflow. [Evidence](#evidence-runtime-settlement-slots-1175)

## Before launching

1. Select the intended founding colony.
2. Confirm that the target offers the mining-outpost action.
3. Read the origin's available settlement capacity.
4. Check for a pending colonization fleet from that origin.
5. Review the displayed cost, travel time, and destination.
6. Confirm that the route and resulting outpost can be defended.

The target tile determines whether this settlement type is available. A commander cannot turn an arbitrary empty-space or asteroid target into a rare-metal site. [Evidence](#evidence-current-data-1175)

## After founding

Open the site rather than assuming production has started. Check its current status, inventory, available actions, and any delivery destination. The existence of an owned outpost does not by itself prove that a specific recipe is active or an SPU has been installed.

## Loss and replacement

If the outpost leaves the former owner's owned-base collection, it stops consuming that player's slot. The capacity becomes reusable at the original founding colony, subject to that colony still existing and exposing the slot. [Evidence](#evidence-runtime-settlement-slots-1175)

## Needs verification

Exact extraction chances, action timings, recipes, and delivery schedules must be read from the active site. Preserve the world and capture time when documenting those values. [Evidence](#evidence-live-world-1175)
