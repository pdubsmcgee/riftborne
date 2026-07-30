---
title: 'Markets, organizations, contracts, and diplomacy'
slug: markets-organizations-and-diplomacy
summary: >-
  Markets, organizations, contracts, and diplomacy is part of Riftborne’s
  multiplayer system and is documented here for patch 11.73.
category: Multiplayer
pageType: mechanic
patch: '11.73'
verification: confirmed
lastReviewed: '2026-07-29'
order: 38
aliases: []
relatedPages: []
sources:
  - local-guide
legacyHash: markets-organizations-contracts-and-diplomacy
---
Markets, organizations, contracts, and diplomacy is part of Riftborne’s multiplayer system and is documented here for patch 11.73. [Source](#references)

> **Evidence status — confirmed:** Unless noted otherwise, mechanics are verified against the installed patch 11.73 guide.

Resource market offers are strict 1-for-1 exchanges. Seller cargo is reserved while an offer is live; both sides need stock and cargo capacity, and fulfillment travels in both directions.

Organizations begin with 100 authorized/founder shares and no public float. Initial share price is approximately:

```text
max(1, round(seed Noctmarks / 100))
```

Organizations can issue contracts, trade shares, and lend Noctmarks. Daily loan interest is:

```text
ceil(outstanding principal × daily rate percent / 100)
```

If interest cannot be paid, the lender seizes available treasury and records the rest as unrecovered.

Contracts include base, building, or ship destruction; total or resource-specific raids; mining-outpost destruction; shield-integrity damage; and Astra raids. Efficient contracts reward pressure that already supports the faction’s strategic plan.

Raids and attacks alter faction sentiment; reinforcement, transfers, tribute, and trade can improve relationships. Daily faction stance updates can turn sentiment into Ally, Neutral, or Enemy gates. Veil Phantom Treaty is therefore not merely flavor—it allows deniable economic warfare from one launch base.

Transmissions take 10–30 seconds to discover, offer three choices, and then cool down for 10 minutes. Outcomes can change resources, relations, ships, or building levels. Use them on a base positioned to exploit or survive the result.
