---
title: 'Rare metals, mining outposts, Noctmarks, and SPUs'
slug: rare-metals-and-spus
summary: >-
  Rare-metal sites and SPUs provide campaign-specific augmentation whose current
  effects are listed in the installed 11.75 data and active UI.
category: Economy
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 35
aliases:
  - rare metals
  - Noctium
  - Noctmarks
  - SPU
relatedPages:
  - noctium-and-noctmarks
  - mining-outposts
  - spu-crafting-and-delivery
  - spu-installation-and-stacking
legacyHash: rare-metals-mining-outposts-noctmarks-and-spus
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
Rare-metal sites produce materials used by the SPU system. The current 11.75 data table exposes SPU targets including ship classes, economy, capacity, travel, cargo, siege, tracking, evasion, upkeep, research, and intelligence. [Evidence](#evidence-current-data-1175)

Exact mining chances, delivery timing, recipes, and installed bonuses should be read from the active site and SPU screens. They can depend on the campaign and current augmentation, so this wiki does not publish a universal crafting schedule.

For planning, compare an SPU’s displayed marginal effect with the fleet or colony that will actually use it; a high-tier bonus on an inactive system creates no immediate tempo.

## Separate site from augmentation

A rare-metal site is the production source; an SPU is an installed improvement with a displayed target and effect. Owning a site does not automatically mean the resulting augmentation belongs on the nearest or largest fleet.

## Workflow

```text
Eligible rare-metal site
        |
        v
Mining outpost and site actions
        |
        v
Rare-metal/SPU inventory -> crafting or transmutation
        |
        v
Delivery state -> eligible recipient -> installed effect
```

At every arrow, open the current screen and confirm what moved, what remains committed, and which recipient is named. This prevents materials in progress from being mistaken for available inventory and completed items from being mistaken for installed effects.

## Allocation questions

Which fleet or colony uses the affected system most often? Does the improvement help the current objective? Is the recipient likely to remain active and supplied? Would a lower apparent bonus create more immediate tempo elsewhere?

## Evidence boundary

The installed table confirms the available effect categories. Recipes, chance, delivery schedule, tier, and the final installed value must come from the current site and SPU screens before they are treated as facts. [Evidence](#evidence-current-data-1175)

## Related procedures

- [Noctium and Noctmarks](/wiki/noctium-and-noctmarks/) separates the terms from ordinary colony resources.
- [Rare-metal mining outposts](/wiki/mining-outposts/) covers founding, origin capacity, and replacement after loss.
- [SPU crafting and delivery](/wiki/spu-crafting-and-delivery/) provides a commitment checklist.
- [SPU installation and stacking](/wiki/spu-installation-and-stacking/) explains how to verify an active effect without assuming stacking rules.
