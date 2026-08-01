---
title: Run an intelligence cycle
slug: run-an-intelligence-cycle
summary: >-
  Run an intelligence cycle is a strategy pattern derived from documented
  Riftborne mechanics and should be evaluated against the active world state.
category: Strategy
pageType: strategy
patch: '11.75'
verification: strategy
lastReviewed: '2026-07-30'
order: 45
aliases: []
relatedPages:
  - official-multiplayer
  - join-a-faction-and-become-legible
  - organize-by-response-time
  - separate-public-plans-from-launch-orders
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: strategy
evidence:
  - client-build-1175
  - runtime-fleets-1175
  - runtime-combat-1175
  - live-world-1175
mechanicDependencies:
  - espionage
---
Run an intelligence cycle is a strategy pattern derived from documented Riftborne mechanics and should be evaluated against the active world state. [Evidence](#evidence-client-build-1175)


Use one owner per priority target, timestamp reports, and avoid duplicate blind probes. Re-spy before the fleet reaches the point where it cannot be recalled or retasked. Track enemy shipyard levels because response time can matter more than the observed garrison.

## Why it works

Intelligence is a process, not a single report. Collection, timestamping, comparison, and refresh cadence determine whether a fleet launches against reality or history.

## Execution

- Name the decision the report must support.
- Assign one collector and record capture time.
- Compare changes in garrison, infrastructure, and objective state.
- Schedule the final refresh before the force passes its practical decision point.

## Risks and counterplay

- More reports are not better if nobody reconciles them.
- Predictable probing can disclose the target.
- A report without travel-time context may already be obsolete.

## Assumptions and ruleset

This is strategic analysis, not a guaranteed outcome. It assumes the linked mechanic pages still match the active build and that current-world roster, modifiers, travel times, intelligence age, and opponent response have been checked before commitment.
