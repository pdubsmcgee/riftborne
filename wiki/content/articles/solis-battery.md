---
title: Solis Battery
slug: solis-battery
summary: >-
  Solis Battery is Astraean static attack infrastructure that contributes
  against light and heavy attackers while the building stands.
category: Reference
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 70
aliases: []
relatedPages:
  - shield-integrity
  - key-structures
  - fleet-power
infobox:
  Culture: Astraean
  Role: Static attack infrastructure
  Targets: Light and heavy hulls
  Patch: '11.75'
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - building-names-1175
  - building-effects-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies: []
---
Solis Battery is the Astraean static attack building. It adds flat attack against light and heavy hulls and fires with the stationed garrison while the building remains standing. It does not use shield integrity. [Evidence](#evidence-building-effects-1175)

Its effect is culture-dependent. The active Codex and combat simulator should be used for a specific level and world; this page deliberately avoids copying a value from defensive infrastructure or converting its level into an unsupported fleet-power total.

The Varkon and Veil structures in the same role are Warbattery and Duskbattery. [Evidence](#evidence-building-names-1175)

## Role in defense

Solis Battery contributes attack against both light and heavy hulls while it stands and a stationed garrison is present. It strengthens the exchange but does not replace the garrison, create cargo, or provide siege capability.

## Distinguish it from Solis Aegis

Solis Aegis is the Astraean defensive-structure role and participates in integrity mechanics. Solis Battery is static attack infrastructure. Comparing a Battery level directly with integrity or calling it a shield produces an invalid forecast.

## Evaluating a level

Use the Codex and simulator with exact Battery level, stationed fleet, enemy mix, and active-world modifiers. Publish the result only with those inputs and roster provenance. [Evidence](#evidence-runtime-combat-1175)
