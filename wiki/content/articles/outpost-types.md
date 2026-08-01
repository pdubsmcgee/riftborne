---
title: Outpost types
slug: outpost-types
summary: Strategic, asteroid, and rare-metal outposts occupy settlement capacity but support different locations and infrastructure roles.
category: Expansion and buildings
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 73
aliases:
  - strategic outpost
  - asteroid outpost
  - rare metal outpost
relatedPages:
  - settlement-slots
  - rare-metals-and-spus
  - how-to-value-a-tile
  - mining-outposts
  - settlement-procedure
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-settlement-slots-1175
  - runtime-economy-1175
  - current-data-1175
mechanicDependencies: []
---
Patch 11.75 distinguishes strategic outposts, asteroid outposts, and rare-metal mining outposts. They use outpost capacity from their founding colony but are offered on different tile types and do not share the complete construction freedom of a full colony. [Evidence](#evidence-runtime-settlement-slots-1175)

## Strategic outposts

Strategic outposts are offered on eligible empty-space targets. Their purpose is positional: shorten response routes, create a forward garrison or logistics point, and influence which parts of the wrapped map can be reached in time.

## Asteroid outposts

Asteroid outposts are offered on eligible resource-asteroid variants. Their allowed production infrastructure follows the asteroid’s displayed resource role. Evaluate them by usable output, transport exposure, and whether the founding colony can defend the route.

## Rare-metal mining outposts

Rare-metal sites use their dedicated outpost type and connect to the SPU system. Current recipes, chances, delivery state, and installed augmentation effects belong to the live site and SPU screens rather than a universal schedule. [Evidence](#evidence-current-data-1175)

## Choosing the type

The target tile constrains what can be founded, so settlement type is not merely a preference. Use the current colonization screen to confirm the offered option, required origin, cost, travel time, and slot before committing the hull.

## Loss and replacement

Any of these outposts stops counting for its former owner after ownership is lost. The freed capacity remains attached to the founding colony, not to the tile or the conquering player.

## Before committing a colonization hull

Confirm the exact settlement option shown on the target, the selected founding origin, that origin's available capacity, pending colonization fleets, displayed cost, and travel time. The type is constrained by the tile, while the slot is constrained by the origin.

See [Founding a colony or outpost](/wiki/settlement-procedure/) for the full procedure and [Rare-metal mining outposts](/wiki/mining-outposts/) for the SPU-specific workflow.
