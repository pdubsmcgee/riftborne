---
title: Dividends
slug: dividends
summary: Exact dividend scheduling, eligibility, whole-Noctmark rounding, treasury coverage, skipped intervals, and cancellation.
category: Multiplayer
pageType: guide
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 88
aliases: [organization dividend, shareholder distribution, dividend schedule]
relatedPages: [shares-and-share-pool, treasury-and-holdings, loans-and-credit-book, buybacks]
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence: [client-build-1175, organization-capital-actions-1175]
mechanicDependencies: []
---
A controlling player can schedule a recurring cash dividend as an amount per share unit and an interval in hours. The client verifies that treasury can cover the next complete payout before accepting the schedule. [Evidence](#evidence-organization-capital-actions-1175)

For each current player or organization holder, payout is `floor(shares held × amount per unit / shares per unit)`. A schedule is rejected if no current holder would receive at least one whole Noctmark. Treasury shares receive nothing. Organization holders receive their payout into their own treasury; players receive it personally.

At each interval, the full current-holder requirement is recalculated. If treasury covers it, treasury and retained earnings fall by the total and recipients are paid. If treasury is short, the entire interval is skipped and the next interval is scheduled; there is no partial pro-rata distribution.

Setting the amount to zero or interval to zero cancels the schedule. Amounts are normalized to four decimal places. Before enabling a dividend, reserve loan interest and contract commitments: the initial coverage check does not guarantee funds will still exist at payment time.
