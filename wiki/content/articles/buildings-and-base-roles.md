---
title: Buildings and base roles
slug: buildings-and-base-roles
summary: >-
  Buildings define a base’s production, logistics, military output, storage, and
  defensive specialization.
category: Expansion and buildings
pageType: overview
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 20
aliases:
  - building prerequisites
  - building catalog
  - culture building equivalents
relatedPages:
  - key-structures
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-economy-1175
  - building-names-1175
  - building-effects-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - current-data-1175
  - building-catalog-1175
mechanicDependencies: []
---
Buildings determine a colony’s production, capacity, logistics, military output, and defensive role. [Evidence](#evidence-building-effects-1175)

Current building names are culture-specific. A role should therefore be identified by its displayed effect, not by carrying terminology from another culture into the article.

Additional copies and maximum levels are not uniform. Standard structures cap at level 20; central infrastructure caps at 25, flagship research at 5, hangars at 10, origin-wormhole and Keystone-vision objectives at 100, and Dyson Sphere at 200. [Evidence](#evidence-building-catalog-1175)

## Verified culture equivalents

| Functional role | Astraean | Varkon | Veil | Verification |
|---|---|---|---|---|
| Vulkron, Aurelite, and Deuterium capacity | Solvault | Skarncache | Nyxvault | Current-client mapping |
| Astra capacity | Heliovex | Voltforge | Gloamwell | Current-client mapping |
| Astraean static attack | Solis Battery | Not applicable | Not applicable | Current-client effect |

These names and roles come from the current client rather than an older generic building vocabulary. [Evidence](#evidence-building-names-1175)

## Finding a prerequisite or copy unlock

```text
Infrastructure screen
|- select the building row
|- read the detail panel
|  |- current level and copy count
|  |- next cost and queue state
|  `- prerequisite or next-copy unlock
`- confirm the selected colony before queuing
```

When a building is unavailable, check the selected colony, current copies, level of every existing copy, central infrastructure, local slot capacity, queue state, and the exact detail-panel message. A prerequisite observed for one culture should not be renamed and applied to another without verifying its current equivalent.

Each structure has its own generated resource-cost and build-time curve. Copy unlocks are separate from level caps and should be read from the selected colony’s detail panel; the current audit has not yet established a safe universal copy-threshold table.

Specialization remains a strategic choice: production colonies protect continuous output, shipbuilding colonies protect queues and Astra, logistics colonies shorten supply paths, and fortified colonies combine stationed ships with current defensive infrastructure.

## Read effects, not inherited labels

The same functional role has different culture-specific names. Identify production, capacity, logistics, defense, static attack, shipbuilding, siege, or special effects before comparing cultures.

## Design around the job

An economy base protects output and capacity horizon. A launch base protects queues, Astra runway, and route coverage. A fortress protects stationed defense and response access. An objective base protects the exact prerequisites shown by its current site.

## Revisit specialization

As the front moves, review obsolete structures, vulnerable stockpiles, queue use, and whether the base still shortens a route that matters.
