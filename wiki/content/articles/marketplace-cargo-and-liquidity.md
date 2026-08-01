---
title: Marketplace offers, reserved cargo, and liquidity
slug: marketplace-cargo-and-liquidity
summary: Interpret market activity by separating listed offers, available cargo, committed cargo, executable quantity, and delivery state.
category: Economy
pageType: guide
patch: '11.75'
verification: observed
lastReviewed: '2026-08-01'
order: 101
aliases:
  - cargo reserved
  - market offer
  - no liquidity
  - cannot sell resources
relatedPages:
  - resources
  - markets-organizations-and-diplomacy
  - build-a-logistics-spine
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: live-world
evidence:
  - client-build-1175
  - runtime-economy-1175
  - live-world-1175
mechanicDependencies: []
---
A market screen can show an intention to trade without guaranteeing that the full quantity can execute immediately. Read price, quantity, cargo state, counterparty availability, and delivery state separately. [Evidence](#evidence-live-world-1175)

## Five quantities to separate

| Quantity | Meaning to verify |
|---|---|
| Colony inventory | Resource currently stored at the selected colony |
| Available cargo | Capacity currently usable for a new movement or trade |
| Reserved or committed cargo | Capacity already attached to another order or movement |
| Listed quantity | Amount advertised by an offer |
| Executable quantity | Amount the current confirmation preview will actually accept |

## When cargo appears reserved

Inspect active offers, pending transactions, fleets in transit, and the selected origin. Cancel or change nothing until the interface identifies which commitment owns the cargo. After a transaction resolves, reopen the relevant screens rather than relying on a stale summary.

## When an offer will not fill

Check that the offer is still active, the opposite side exists at an acceptable price, the selected colony holds the resource, sufficient uncommitted cargo exists, and the route or diplomatic state permits the action. A visible listing is not proof of immediate liquidity.

## Reporting a market problem

Record the world, capture time, selected colony, resource, side of the trade, displayed price and quantity, available and reserved cargo, confirmation message, and relevant pending movements. Remove player identity before publishing the transcript.

## Needs verification

Universal matching priority, partial-fill rules, cancellation treatment, fees, and delivery timing are not established by the current core evidence. Treat them as live-world observations until reproduced. [Evidence](#evidence-live-world-1175)
