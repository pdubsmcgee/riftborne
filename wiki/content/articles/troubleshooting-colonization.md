---
title: Troubleshooting colonization and outposts
slug: troubleshooting-colonization
summary: Diagnose unavailable colony or outpost actions by checking the target, origin, slot, pending fleet, hull, resources, and prerequisites.
category: Expansion and buildings
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 102
aliases:
  - cannot build outpost
  - colony action unavailable
  - outpost slot missing
  - colonize button missing
relatedPages:
  - settlement-procedure
  - settlement-slots
  - outpost-types
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-settlement-slots-1175
  - runtime-fleets-1175
  - live-world-1175
mechanicDependencies: []
---
When a settlement action is unavailable, diagnose it from the destination back to the origin. Most apparent slot problems are actually a target, origin, pending-fleet, hull, resource, or prerequisite mismatch.

## Diagnostic order

1. **Target:** Does this tile offer the settlement type you intend to found?
2. **Origin:** Is the correct founding colony selected?
3. **Capacity:** Does that origin show an unlocked, unused slot?
4. **Pending action:** Is a colonization fleet from that origin already consuming the slot?
5. **Hull:** Is the required colonization ship available at that origin and not in transit?
6. **Resources:** Does the action preview show every required resource as available?
7. **Prerequisite:** Does the current action or Codex name a missing building or level?
8. **Live state:** Did ownership, diplomacy, or another fleet change since the screen was opened?

## After losing an outpost

The former outpost stops occupying its founding origin's slot after it leaves the player's owned-base collection. Reopen that origin and inspect the capacity display. If the slot does not appear usable, check for a pending colonization fleet and confirm that the founding colony still exists. [Evidence](#evidence-runtime-settlement-slots-1175)

## Useful evidence capture

Capture the target action, selected origin, slot panel, available colonization hull, and exact refusal message in the same session. Include the build, world, and time while removing player identity and coordinates.

## Needs verification

If all displayed requirements are met but the action remains unavailable, preserve the screen state as a reproducible case. Do not invent a hidden cooldown or permanent slot loss without runtime evidence. [Evidence](#evidence-live-world-1175)
