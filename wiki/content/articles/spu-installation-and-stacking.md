---
title: SPU installation and stacking
slug: spu-installation-and-stacking
summary: Confirm an SPU's eligible recipient, displayed marginal effect, and installed state before treating its bonus as active.
category: Economy
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 96
aliases:
  - install SPU
  - stack SPUs
  - SPU effects
relatedPages:
  - spu-crafting-and-delivery
  - rare-metals-and-spus
  - live-world-values
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: both
evidence:
  - client-build-1175
  - current-data-1175
  - live-world-1175
mechanicDependencies: []
---
An SPU becomes strategically useful when its effect is installed on an eligible recipient and the current interface shows that effect as active. The data exposes targets across fleet, colony, economy, capacity, research, travel, cargo, combat, and intelligence systems. [Evidence](#evidence-current-data-1175)

## Installation checklist

- Verify the SPU's effect category and eligible target.
- Select the intended recipient rather than the nearest available one.
- Read the before and after values when the interface provides them.
- Confirm the installation action and then reopen the recipient.
- Record the world and time for any numerical comparison.

## Stacking

Do not assume that two apparently similar effects add, multiply, replace one another, or share a cap. The safe test is to record the displayed value before installation, install one effect, reopen the screen, and record the displayed value again. Repeat only if the interface permits another installation.

> **Needs verification:** patch-wide stacking order, duplicate-effect limits, removal rules, and refund behavior require a reproducible UI or runtime observation. They are intentionally not presented as universal mechanics.

## Choosing a recipient

Prioritize actual use over headline magnitude. A travel effect belongs where it changes relevant arrivals; a cargo effect belongs where surviving raiders or haulers use it; an economy effect belongs on a colony that will remain productive. Installation on an inactive or doomed asset produces little immediate tempo even when the displayed bonus is large.

## Reporting an installed effect

Include the SPU name, effect text, recipient, prior value, resulting value, world identifier, capture time, and any other active modifier. Without that context, a screenshot of one number cannot establish stacking behavior. [Evidence](#evidence-live-world-1175)
