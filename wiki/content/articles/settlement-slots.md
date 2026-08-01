---
title: Settlement slots
slug: settlement-slots
summary: Settlement capacity is tracked per founding colony from currently owned settlements and pending colonization fleets.
category: Expansion and buildings
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 72
aliases:
  - outpost slots
  - colony slots
  - losing an outpost
relatedPages:
  - expansion-and-geography
  - outpost-types
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-settlement-slots-1175
  - runtime-fleets-1175
mechanicDependencies: []
---
Settlement slots determine how many settlements a particular colony can support. Patch 11.75 calculates availability from that founding colony’s unlocked capacity, qualifying settlements still owned by the player, and colonization fleets currently pending from that origin. [Evidence](#evidence-runtime-settlement-slots-1175)

## Slots belong to an origin

Capacity is not one empire-wide pool. A settlement records the colony from which it was founded, and the slot check is performed against that origin. When preparing a launch, select the intended origin first and read its current settlement display.

## Losing an outpost

An outpost is not a permanent lifetime charge. If it leaves the player’s owned-base collection, it no longer counts against that player’s slot. A base with no remaining building levels also fails the current slot-occupancy test. The original colony may then use the capacity again, provided the slot is still unlocked.

Losing the founding colony is different: its capacity does not migrate to another colony. A replacement settlement must launch from an origin that independently exposes an available slot.

## Pending launches

A colonization fleet already traveling from the origin counts while pending. This prevents the same capacity from being promised to multiple destinations. Recheck the origin after a launch is cancelled, resolved, or destroyed rather than assuming the slot display has already changed.

## Multiplayer use

After losing an outpost, verify ownership and the origin’s slot panel before building a replacement plan. The safest statement is “the slot should be available under the current rule”; the live launch screen remains authoritative for the exact world state.
