---
title: Troubleshooting fleets and missing ships
slug: troubleshooting-fleets-and-ships
summary: Reconcile ship counts across garrisons, fleets, training queues, transit, missions, and combat logs before reporting a loss.
category: Ships and fleets
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 103
aliases:
  - ships disappeared
  - missing ships
  - extra ships
  - fleet not showing
relatedPages:
  - fleet-controls
  - ships-fleets-and-travel
  - astra-upkeep-and-starvation
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies: []
---
A ship count is a snapshot of one state, not necessarily the empire's total. Reconcile garrisons, fleets in transit, training queues, resolved missions, and combat losses before concluding that ships appeared or disappeared.

## Reconciliation procedure

1. Reopen the selected colony and record its stationed garrison.
2. Inspect active outbound, inbound, returning, and otherwise occupied fleets.
3. Check ship-training queues and recently completed training.
4. Review combat logs and mission results since the last known count.
5. Check whether ships arrived at a different destination than expected.
6. Verify the destination's Astra state if ships were stationed there.
7. Refresh the relevant screens and compare again.

## Extra ships

An apparent increase can come from completed training, a returning fleet, reinforcement, or comparing different colonies or timestamps. Establish a common timestamp before treating it as duplication.

## Missing ships

Ships may be in transit, assigned to another fleet, destroyed in combat, or lost after creating unsustainable stationed demand. The movement list, training queue, combat log, notifications, and destination resource trend together provide a better account than a single garrison screen. [Evidence](#evidence-runtime-fleets-1175)

## Reporting checklist

Provide the build, world, timestamps, origin, intended destination, hull counts before and after, fleet state, training state, relevant combat-log entry, and destination Astra trend. Sanitize player identity and coordinates.

## Needs verification

If the states do not reconcile, preserve them without restarting or issuing more movement orders. A suspected duplication or disappearance requires a reproducible transition, not only two totals captured at unknown times. [Evidence](#evidence-live-world-1175)
