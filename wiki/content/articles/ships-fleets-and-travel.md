---
title: 'Ships, fleets, and travel'
slug: ships-fleets-and-travel
summary: >-
  Fleets combine specialized hull families, while their travel time is
  determined by wrapped distance and the slowest participating ship.
category: Ships and fleets
pageType: overview
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 26
aliases: []
relatedPages:
  - fleet-composition
sources:
  - local-guide
---
Fleets combine specialized hull families, while their travel time is determined by wrapped distance and the slowest participating ship. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Every culture covers Intelligence, light screen/skirmisher, main-line heavy, Carrier, Siege, Colonization, and Flagship roles.

Ship resource cost derives from base cost:

```text
Vulkron   = base cost × 1.25
Aurelite  = base cost × 0.95
Deuterium = base cost × 0.95
Astra     = base cost × 0.85
```

Then the culture discount halves one resource.

Training is split into independent lanes by completed shipyard copies and hull family. Veil Riftwalk Logistics doubles each unlocked family’s lanes. Current clients can split batches across lanes; use it to start every lane immediately.

Travel:

```text
hours = wrapped distance /
        (slowest modified ship speed × base travel multiplier × global multiplier)
```

The standard global multiplier is 3.0 and minimum travel is 0.01 hours. Manual shipments and accepted market trades instead use:

```text
trade speed = 5 × base travel multiplier × global multiplier × shipment-speed multiplier
```
