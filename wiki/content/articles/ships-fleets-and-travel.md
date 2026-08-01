---
title: 'Ships, fleets, and travel'
slug: ships-fleets-and-travel
summary: >-
  Fleets combine specialized hull families, while their travel time is
  determined by wrapped distance and the slowest participating ship.
category: Ships and fleets
pageType: overview
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 26
aliases:
  - fleet movement
  - travel time
  - ship roles
relatedPages:
  - fleet-composition
  - fleet-controls
  - which-ship-should-i-build
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-economy-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies: []
---
Fleets combine specialized hull families, while their travel time is determined by wrapped distance and the slowest participating ship. [Evidence](#evidence-client-build-1175)


The current client distinguishes Intelligence, Light, Heavy, Carrier, Siege, Colonization, and Flagship roles. The active roster supplies each hull’s cost, speed, cargo, upkeep, and combat profile; multiplayer worlds may replace those values. [Evidence](#evidence-runtime-fleets-1175)

A fleet travels at the pace produced by its participating hulls and active modifiers. The launch preview is authoritative for the chosen origin, destination, mission, and world. Keep slow-purpose hulls out of reaction fleets unless their effect is needed at the destination. [Evidence](#evidence-live-world-1175)

Training capacity and unlocks are shown by the current culture-specific shipyard screens. Do not infer lane counts, discounts, or timing from another campaign.

## Mission roles

Intelligence hulls support information gathering; Light and Heavy families form the main combat mix; Carriers modify supported forces according to the active roster; Siege converts successful attacks into structural damage; Colonization hulls establish settlements; Flagships are roster-defined strategic hulls.

| Role | Primary question | Do not assume |
|---|---|---|
| Intelligence | What information will this mission produce? | That an old report still describes the target on arrival |
| Light | What screening, tracking, or combat role does the current hull show? | That all Light ships are interchangeable |
| Heavy | Which observed target profile is it intended to fight? | That raw power predicts the matchup |
| Carrier | Which eligible ships receive the displayed support effect? | That a coefficient from another roster applies |
| Siege | Will enough siege survive a successful attack to affect the target building? | That normal combat victory alone damages infrastructure |
| Colonization | Which eligible target and founding origin will it use? | That settlement capacity is empire-wide |
| Flagship | What does this roster's exact entry say? | That every campaign supplies the same flagship |

## Travel discipline

Read the launch preview after every composition change. A route that works for a reaction fleet may fail once cargo or siege joins it. Wrapped geography also means the visually obvious direction is not always the shortest.

## Control workflow

Choose an origin, select participating ships, choose the destination and mission, then read the complete preview. After launch, verify the group in the fleet or movement list. On arrival, confirm whether the ships are stationed, returning, or still assigned to a mission. See [Fleet controls and ship transfers](/wiki/fleet-controls/).

Only stationed ships should be counted as local defenders. Ships moving toward a colony may arrive too late, and ships leaving it no longer provide the same local posture.

## Roster provenance

When sharing a fleet plan, state the world and capture time. Ship names, costs, speed, cargo, upkeep, and combat values can be supplied by the operator, so a table without provenance should not be treated as current.

For a build decision, use [Which ship should I build?](/wiki/which-ship-should-i-build/) and work backward from the mission rather than relying on a universal tier list.
