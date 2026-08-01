---
title: Fleet composition
slug: fleet-composition
summary: >-
  Fleet composition balances screening, line combat, cargo, siege, carrier
  support, and mission-specific speed.
category: Ships and fleets
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 27
aliases:
  - mixed fleet
  - light ships
  - heavy ships
relatedPages:
  - ships-fleets-and-travel
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - runtime-objectives-1175
mechanicDependencies: []
---
Fleet composition balances screening, line combat, cargo, siege, carrier support, and mission-specific speed. [Evidence](#evidence-client-build-1175)


A practical force has:

- a light screen/tracking component;
- a heavy line that matches the target;
- enough cargo for the mission;
- siege only when structural damage is intended;
- carriers only when their aggregate aura justifies hull slots and cost;
- current intelligence.

Never merge the colony ship, siege train, cargo train, and reaction fleet merely because the interface permits it. Their slowest hull and different objectives make the combined fleet worse at every job.

## Build from the mission backward

Start with the result: defend, intercept, raid, destroy infrastructure, colonize, scout, or reinforce. Then add only the roles needed to produce that result. A fleet built from every available hull often inherits the slowest travel profile while preserving none of the support roles efficiently.

## Compare alternatives

Preview at least two light/heavy mixes against the observed target. For raids, repeat the comparison with expected surviving cargo. For attacks, test whether enough siege survives to affect the chosen building. For defense, verify that the ships will be stationed and that the destination can sustain their Astra demand.

## Keep modules separable

Reaction, cargo, siege, colonization, and intelligence groups should remain separate until the mission requires assembly.
