---
title: Fleet controls and ship transfers
slug: fleet-controls
summary: A practical control guide for assembling fleets, moving them, stationing ships, returning them, and confirming mission state.
category: Ships and fleets
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 98
aliases:
  - create a fleet
  - move ships
  - return ships home
  - transfer ships
relatedPages:
  - ships-fleets-and-travel
  - fleet-composition
  - command-checklist
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - live-world-1175
mechanicDependencies: []
---
Fleet controls turn stationed ships into a mission group and assign that group an origin, destination, mission, and travel state. The final preview is the best check that the intended ships are participating. [Evidence](#evidence-runtime-fleets-1175)

## Assemble and launch

1. Open the colony or garrison that currently owns the ships.
2. Open its fleet or ship action.
3. Select the hulls and quantities needed for one mission.
4. Choose the target and mission.
5. Review participating ships, travel time, cargo, and mission-specific fields.
6. Launch, then verify the fleet in the movement or fleet list.

## Move versus station

A ship in transit is not stationed at either endpoint. After arrival, verify whether the mission leaves the ships stationed, returning, or otherwise occupied. Only stationed ships belong in a base-defense count.

## Return ships home

Select the fleet at its current location, choose the appropriate movement or return action exposed by that screen, select the intended destination, and inspect the preview. “Home” should be treated as a chosen destination, not an assumption: verify where the fleet will actually arrive.

## Common control mistakes

- Launching from the wrong colony after switching map targets.
- Selecting every available hull and accidentally slowing a reaction fleet.
- Counting ships in transit as local defense.
- Sending siege or colonization hulls on a mission that does not need them.
- Reading a stale fleet list instead of reopening it after arrival.
- Assuming reinforcement is sustainable without checking destination Astra.

## Needs verification

Exact key bindings and action labels can differ between interfaces and builds. This page documents the workflow; use the labels visible in the current client and capture the complete screen before adding a universal key sequence. [Evidence](#evidence-live-world-1175)
