---
title: Live-world values and ruleset boundaries
slug: live-world-values
summary: Rosters, modifiers, pacing, factions, and world state must be labeled separately from core 11.75 mechanics.
category: Reference
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 77
aliases:
  - server settings
  - world modifiers
  - custom roster
  - ruleset
relatedPages:
  - sources-and-confidence
  - combat-simulator
  - official-multiplayer
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - live-world-1175
  - runtime-fleets-1175
mechanicDependencies: []
---
A core mechanic belongs to build `a7b5c7c`; a live-world value belongs to a particular multiplayer world at a particular time. The operator controls settings including world seed, pacing, simulation time, faction configuration, global modifiers, and ship roster. [Evidence](#evidence-live-world-1175)

## Core examples

Core evidence can establish that only stationed ships defend, that fleet movement uses participating hulls and modifiers, that settlement slots count current qualifying ownership, or that siege is required for structural damage. These claims still need the exact build that implements them.

## Live-world examples

Ship statistics, displayed fleet power, current ownership, garrisons, objective progress, prices, active offers, travel previews, population, faction membership, and global modifiers are observations. They can change without the wiki’s core explanation becoming wrong.

## Required label

Record world identifier, capture time, patch, build, roster provenance, and the screen or command used. For combat, include the complete fixture. For an objective, include the site and visibility source. For a market value, include the transaction state.

## Avoid false precision

Do not average incompatible worlds or quote a current observation as a permanent formula. When a number cannot be reproduced from the same build and ruleset, publish the method for reading it rather than the number.

## Update policy

If the installed client changes, confirmed core claims pause until affected evidence is revalidated. Live-world observations remain historical records with their original timestamps, not proof of the new state.
