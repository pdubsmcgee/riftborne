---
title: Fleet power
slug: fleet-power
summary: >-
  Fleet power is a context-sensitive preview and has no universal conversion to
  a number of ships.
category: Ships and fleets
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 68
aliases: []
relatedPages:
  - combat-power
  - fleet-composition
  - key-structures
infobox:
  Type: Combat metric
  Context: Matchup-dependent
  Exact source: Codex combat simulator
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - current-data-1175
mechanicDependencies: []
---
Fleet power is a context-sensitive preview rather than a fixed conversion from headcount. [Evidence](#evidence-runtime-combat-1175)

A displayed value such as **3,200 power has no universal ship count**. It can describe materially different fleets because hull lines, culture, roster settings, infrastructure, directives, SPUs, tactics, mission type, and the opposing composition all affect the estimate.

Use the in-game combat simulator with the exact active-world roster. Record both sides, infrastructure, modifiers, and mission type whenever quoting a power result.

## What the number can do

Fleet power is useful for comparing fully specified scenarios inside the same roster and ruleset. It can help identify whether a composition change improves the preview against a particular target.

## What the number cannot do

It does not reveal ship count, replacement cost, cargo, travel time, siege survival, or strategic value. Two fleets with the same displayed power can solve different missions and perform differently against the same defender mix.

## How to quote it responsibly

Attach the roster provenance, cultures, ship counts, infrastructure, mission, target mix, modifiers, and capture time. Without those inputs, “3,200 power” is context rather than a reproducible combat claim.
