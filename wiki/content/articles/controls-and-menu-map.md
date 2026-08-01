---
title: Controls and menu map
slug: controls-and-menu-map
summary: Use Riftborne's major colony, empire, military, intelligence, and system screens as a task map rather than memorizing isolated keys.
category: Getting started
pageType: reference
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 100
aliases:
  - controls
  - keyboard shortcuts
  - menu keys
  - where is the Codex
relatedPages:
  - first-login-a-safe-opening
  - fleet-controls
  - directives
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-economy-1175
  - runtime-fleets-1175
  - live-world-1175
mechanicDependencies: []
---
Riftborne groups actions by the object being managed: the selected colony, the wider empire, military movement, intelligence, and system communication. Read the on-screen menu because it is the authoritative map for the current screen.

```text
Selected colony
|- Infrastructure: buildings and construction queues
|- Shipyards: ship training and available hulls
`- Logistics: colony-specific movement and support

Empire
|- Colonies and outposts
|- Factions and diplomacy
`- Economy and market systems

Military and intelligence
|- Garrisons and fleet state
|- Combat logs and tactical actions
|- Star map and Codex
`- Notifications, directives, and statistics
```

## Task map

| Task | Start from | Confirm before acting |
|---|---|---|
| Build or inspect infrastructure | Selected colony's infrastructure screen | Colony, building, queue position, and cost |
| Train ships | Selected colony's shipyard screen | Colony, hull, quantity, queue, and upkeep consequence |
| Move or inspect fleets | Garrison, fleet list, or star map | Origin, destination, participants, mission, and arrival |
| Find a prerequisite or current effect | Codex and selected action preview | Culture, current level, requirement, and build |
| Review progression | Directives screen | Path, current stage, requirement, and completion state |
| Diagnose an event | Notifications and combat logs | Time, location, participants, and outcome |

## Needs verification

This article intentionally omits a universal key table until the current interface bindings are captured without ambiguity. Menu letters and contextual actions should be copied only from a complete current screen, not from an older guide. [Evidence](#evidence-client-build-1175)
