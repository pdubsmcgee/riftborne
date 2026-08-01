---
title: Founding a colony or outpost
slug: settlement-procedure
summary: Found settlements by verifying the target type, founding origin, available slot, pending fleets, cost, and travel preview.
category: Expansion and buildings
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 97
aliases:
  - how to colonize
  - found an outpost
  - establish a colony
  - cannot colonize
relatedPages:
  - settlement-slots
  - outpost-types
  - expansion-and-geography
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-settlement-slots-1175
  - runtime-fleets-1175
mechanicDependencies: []
---
Founding a settlement joins a target, a founding colony, settlement capacity, and a colonization fleet. The capacity check belongs to the selected origin rather than an empire-wide pool. [Evidence](#evidence-runtime-settlement-slots-1175)

## Procedure

1. Select an eligible destination and inspect the settlement option it offers.
2. Select the colony that will serve as the founding origin.
3. Confirm that the origin has an unlocked, unused settlement slot.
4. Check whether a colonization fleet is already pending from that origin.
5. Confirm that the required hull and resources are available.
6. Read the final mission, destination, and travel preview.
7. Launch and then verify that the fleet appears as pending from the intended origin.
8. After arrival, open the new settlement and confirm ownership and available infrastructure.

## Why the origin matters

The new settlement records its founding colony. If the outpost is later lost, its occupied capacity is removed from that origin's current count. If the founding colony itself is lost, its unlocked capacity does not transfer to another colony. [Evidence](#evidence-runtime-settlement-slots-1175)

## If the action is unavailable

Check the target type, selected origin, current slot display, pending launches, hull availability, resource requirement, and any prerequisite shown by the action. Do not infer the missing requirement from a different culture or campaign.

## Cancellation and destruction

A pending colonization fleet counts against the origin while pending. After cancellation, interception, or resolution, reopen the origin and confirm its displayed capacity before scheduling another launch. Exact refund and timing behavior is **Needs verification** unless the current confirmation screen states it.
