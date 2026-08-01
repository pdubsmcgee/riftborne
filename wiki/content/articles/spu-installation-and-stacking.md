---
title: SPU installation and stacking
slug: spu-installation-and-stacking
summary: Exact SPU per-unit strength, additive stack calculation, ignored-stack conditions, effect targets, and recipient choices.
category: Economy
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 96
aliases: [install SPU, stack SPUs, SPU effects, SPU bonus formula]
relatedPages: [spu-crafting-and-delivery, rare-metals-and-spus, live-world-values]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, current-data-1175, spu-stacking-1175]
mechanicDependencies: []
---
SPUs add persistent augmentation values to the owning player’s calculated bonuses. The current catalog targets production, storage, build speed, ship construction, travel, defense, research, upkeep, transmutation, fleet combat, cargo, critical chance, evasion, tracking, spy survival, diplomacy, and individual unit classes. [Evidence](#evidence-current-data-1175)

## Strength formula

Unless an SPU carries an explicit override, one unit contributes:

`per-unit bonus = ((Drill level + Refiner level) / 2) × 0.1%`.

A stack contributes `per-unit bonus × count`. For example, a Drill 10 / Refiner 6 SPU has average level 8 and contributes 0.8% per unit; a stack of 3 contributes 2.4% to its catalogued target. [Evidence](#evidence-spu-stacking-1175)

## Stacking rule

Valid contributions aimed at the same target are added in the SPU aggregation stage. There is no replacement-by-highest rule or general cap in that stage. Explicit percentage overrides replace the level-derived per-unit magnitude for that stack. Fleet critical, evasion, and tracking values are converted from fractions to percentage points after addition.

The following contribute nothing: errored SPUs, zero or negative counts, empty permutation keys, keys absent from the current catalog, and effects whose calculated contribution is effectively zero.

## Identity and inventory

Two stacks have the same identity only when error state, permutation key, included codes, Drill level, Refiner level, override, and—when location matching is required—base location agree. A visually similar effect can therefore remain a separate stack.

Choose an SPU for the action it changes now. Travel and cargo favor active routes; production and storage favor durable colonies; class bonuses favor a roster that actually uses that class. The exact crafting recipe and delivery timing remain live-workflow fields covered by [SPU crafting and delivery](/wiki/spu-crafting-and-delivery/).
