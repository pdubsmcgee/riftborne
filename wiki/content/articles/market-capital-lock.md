---
title: Market capital lock
slug: market-capital-lock
summary: >-
  Market capital lock is a strategy pattern derived from documented Riftborne
  mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 62
aliases: []
relatedPages:
  - advanced-tactics-and-edge-cases
  - astra-trap
  - shield-grinding-sacrificial-attacks
  - hangar-feint
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - live-world-1175
mechanicDependencies:
  - markets-organizations-and-diplomacy
---
Market capital lock is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Cargo ships are reserved by live offers and trade legs travel. An attractive offer can immobilize a trader’s capacity. Post only with a liquidity plan; exploit opponents who tie up all cargo by pressuring elsewhere.

## Why it works

Market activity competes with military logistics for cargo and attention. A profitable offer can still be harmful if it reserves the capacity needed for emergency movement.

## Execution

- Separate trade cargo from the emergency reserve.
- Check current obligations before posting an offer.
- Set a condition for cancelling or declining low-priority trades.
- Track arrival time rather than treating acceptance as immediate liquidity.

## Risks and counterplay

- World settings can change fees, travel, and reservation behavior.
- An opponent may pressure the region while cargo is committed.
- Over-reserving for emergencies can also leave productive trade idle.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
