---
title: Astra upkeep and starvation
slug: astra-upkeep-and-starvation
summary: >-
  Astra supports both construction and stationed fleets; a base at zero Astra
  begins losing garrisoned ships.
category: Economy
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 16
aliases:
  - zero Astra
  - ship starvation
  - upkeep
relatedPages:
  - resources
  - the-storage-rule
  - production-scaling-caveat
  - troubleshooting-fleets-and-ships
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - runtime-fleets-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Astra supports construction and stationed fleets. A colony whose stationed upkeep exceeds its Astra supply can begin losing garrisoned ships. [Evidence](#evidence-runtime-economy-1175)

The safe operating rule is to use the live hourly trend: estimate the runway from current Astra and the displayed net drain, then include incoming or departing reinforcements before relying on that colony.

Upkeep modifiers and starvation timing can vary with the current roster, structures, SPUs, and world settings. This wiki therefore does not publish a universal loss interval. Confirm the destination’s Astra runway before reinforcing an ally. [Evidence](#evidence-live-world-1175)

## Reading the runway

The resource panel provides the three inputs that matter: current Astra, its capacity, and the present hourly trend. A negative trend is not automatically a crisis; it becomes one when the remaining amount cannot cover the time until the next shipment, fleet departure, or other change in demand.

## Reinforcement check

Before sending ships to an ally, ask for the destination’s current Astra amount and trend, then have the recipient preview the state after the reinforcement is stationed. Ships that arrive safely but create an unsustainable garrison have not solved the defensive problem.

## Recovery options

Reduce stationed demand, increase or redirect Astra supply, arrange a shipment, or shorten the period the fleet must remain. Exact attrition timing is intentionally omitted because the current roster and world settings can alter the result. [Evidence](#evidence-live-world-1175)

## Recovery sequence

1. Reopen the affected colony and record current Astra, capacity, and hourly trend.
2. Identify newly stationed or returning fleets that changed demand.
3. Check incoming supply and the time until it arrives.
4. Compare that arrival with the displayed runway; do not rely on a remembered balance.
5. Reduce stationed demand or increase supply before beginning optional construction.
6. Reopen the resource panel after each major change and confirm that the trend moved as expected.

## Common mistakes

- Treating capacity as production: a larger Astra cap does not itself correct a negative hourly trend.
- Sending more defenders without checking the destination's demand.
- Counting an incoming shipment as already available.
- Assuming a loss interval copied from another world is current.
- Starting another Astra-consuming commitment during recovery without rereading the trend.

## Needs verification

The exact ordering of ship losses, grace periods, and any world-specific starvation modifier requires current runtime evidence. A useful capture includes the colony's Astra panel, full stationed roster, active modifiers, world, build, and timestamps before and after the transition.
