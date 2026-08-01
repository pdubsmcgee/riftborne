---
title: Valor victory
slug: valor-victory
summary: Controlled Keystones can use vision infrastructure and Valor Conduits to generate faction-wide Valor progress.
category: Objectives
pageType: mechanic
patch: '11.75'
verification: confirmed
lastReviewed: '2026-07-30'
order: 76
aliases:
  - Valor from Keystones
  - Valor Conduit
  - faction Valor
relatedPages:
  - objectives-and-victory
  - origin-wormhole
  - keystone-donation-delay
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - runtime-objectives-1175
  - live-world-1175
mechanicDependencies: []
---
The Valor route uses controlled Keystones, their current vision infrastructure, and Valor Conduits to generate faction-wide progress. Patch 11.75’s standard threshold is 250,000 faction Valor. [Evidence](#evidence-runtime-objectives-1175)

## Distributed objective network

Unlike the Origin route, Valor can depend on several sites. Distribution makes it harder for one attack to stop all progress, but it increases the number of garrisons, supply paths, construction states, and handoffs the faction must coordinate.

## Keystone tiers and ownership

The current client includes Inner, Border, and Outer Keystone sites. The live interface is authoritative for a particular site’s ownership, progress, available structures, contribution state, and defensive position.

## Conduit planning

Before investing, confirm the site can hold long enough to convert construction and contributions into useful Valor. Record friendly response time, hostile response time, capacity, pending contribution, conduit state, and the age of the intelligence used to judge nearby threats.

## Information risk

Enemy progress may be known only through ownership visibility or a spy snapshot. Treat observed totals as timestamped evidence and increase refresh cadence as either faction approaches the active threshold.

## Active-world authority

World configuration can affect pacing and context. Always confirm the live victory panel and identify the multiplayer world when quoting progress or an expected completion time. [Evidence](#evidence-live-world-1175)
