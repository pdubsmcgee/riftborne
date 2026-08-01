---
title: Objectives and the late game
slug: objectives-and-victory
summary: >-
  Patch 11.75 exposes two standard progress tracks: an Origin Wormhole victory
  and a faction Valor victory generated from controlled Keystones.
category: Objectives
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 36
aliases: []
relatedPages:
  - choosing-a-victory-route
legacyHash: objectives-and-the-late-game
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-combat-1175
  - runtime-objectives-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Patch 11.75 exposes two standard victory tracks: the Origin Wormhole and faction Valor. [Evidence](#evidence-runtime-objectives-1175)

## Origin Wormhole

The Origin is the objective colony at `(0,0)`. Its culture-specific Wormhole must reach level 100. The Wormhole names are Lens of Aster for Astraean, Furnace of Vorrak for Varkon, and Sanctum of Vael for Veil.

The Wormhole cannot advance beyond the lower level of that colony’s two culture-specific capacity buildings. The interface names those buildings for the owner’s culture.

## Valor

Controlled Keystones can build a culture- and tier-specific vision structure and a Valor Conduit. Valor Conduits generate faction Valor; the standard victory threshold in the current client is 250,000 Valor. Generation depends on conduit level and the Keystone’s current Visions. [Evidence](#evidence-runtime-objectives-1175)

Keystone names vary by culture and tier. Current worlds can contain Inner, Border, and Outer Keystones.

## World settings

The multiplayer operator can override campaign settings and owns the world state. Always confirm the active victory panel before committing faction resources. [Evidence](#evidence-live-world-1175)
