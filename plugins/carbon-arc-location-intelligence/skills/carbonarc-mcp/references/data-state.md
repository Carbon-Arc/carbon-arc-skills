# Known data-state facts

> Part of `carbonarc-mcp`. Read before you commit to an insight id, and before any 626 / 627 pull.

---

- **The look-alike insight trap.** Several insights share an *identical* `insight_label` and `topic_label` while belonging to different panels with different freshness, geography and population. Confirm the panel behind an insight ID with `data_library` before using it — never select on label alone. Using a stale look-alike produces a report that is confidently out of date and looks completely current. Always check: is this panel live, what is its geographic availability, what is its population, and is there a fresher sibling.
  **The card family is where this bites hardest:** several distinct US card panels publish insights whose
  `insight_label` and `topic_label` are character-for-character identical, differing only in the panel behind
  them — a complete general-purpose panel, a historic-only panel, a panel skewed to younger cardholders, and a
  single-issuer private-label panel whose category mix suits financed purchases rather than everyday spend.
  Selecting on label alone is a one-in-four guess. Run `data_library` on the insight id and read
  `tearsheet_name`, `frequency` and `history` **before the first billed call**; `frequency: Historic`, or a
  `history` that ends at a fixed past date, means the panel is frozen and a report built on it will look
  current while being a year or more stale.
- **Frozen panels.** Some panels are historic-only and stop at a fixed date. Label any read from them as historical, and prefer the live sibling for current work. A frozen panel that is larger than its live sibling can still serve as a **second asset through its end date**: compare totals and rank order with the live series (`ca-core` `gating.md` §9), never as the spine, and never past the date it stops.
- **The complete US card panel's transaction-method split is not a business measure — use the sum.**
  **627 returns a `TRANSACTION METHOD` split that 626 does not**, at `us` and `state` resolution on
  multi-entity pulls, though not on a single-entity monthly pull. **Sum before dividing, or the ticket comes
  out 2x.** Neither column is reportable alone: the online column is card-not-present
  activity, which is not what a company means by its digital, app or delivery sales, and there is usually no
  disclosed figure to check it against. **Take the sum of the two as the basis, and hold that basis across every
  comparator** (rule 12). Where one call returns the split and another a total, reconcile them before using
  either — the total should equal the sum exactly, and if it does not, something else is wrong. **Cardholders (628) are the exception: they cannot be summed across the split**, because a person who
  shops both ways is counted in both. Where a cardholder count is needed, filter one method (in-person:
  `transaction_method: ["Physical"]`) and use the same filter on spend and transactions for every
  comparator.
- **Constant-shopper topics** give cleaner YoY than the core panel — the same-cardholder base removes composition drift. Prefer them for trend reads where available.
- **Overlapping-shopper and nPMI cross-shop insights** exist but availability **varies by brand pair**. Check before promising the analysis; state the fallback when it is unavailable.
- **Card sees the merchant, not the item.** Brand-versus-brand share within a retail channel requires point-of-sale data. Card is legitimate for specialty retailers whose category is dominated by a few named merchants, and for direct-to-consumer brands where the brand *is* the merchant.
- **Aggregator merchants are not brand signals.** Spend captured at a delivery or marketplace aggregator spans every merchant on that platform. It cannot be differenced against a single brand's spend to size leakage, and a caveat does not rescue a title that performs the comparison anyway.
- **Foot-traffic visitor profiles** arrive as JSON strings needing a parse, and device panels carry regional skew.
- **Foot traffic is presented only as visits per location**, never as raw visits: divide visits (45862) by
  the store count (45863, `aggregate: "mean"`) from the same entity, geography and grain. The location list
  grows over time and never drops a closed place, so raw visits move with the list. Before visits per
  location say anything about *size*, test them against a published figure for the same place and months
  (lodging tax, sales tax); where only timing matches, the series reads timing only. *(Verified Oct 2026:
  visits per hotel location fell 12% year over year in a month when the published lodging tax fell 45%.)*

## Category breaks, and the brand basket

**A card category can break: a step of the same sign in every geography in the same month**, places with
no news included. Such a step is a change in how the panel maps merchants to the category, not demand,
and it often hits geographies unequally, so a gap across it is contaminated.

- **Check before any category comparison**: the category's year-over-year change in every geography in the
  read, month by month. *(Known: the card Restaurants category stepped down 10% to 35% year over year in
  every metro area checked from Aug 2024 and recovered exactly a year later, on 626 at metro grain. Treat
  the category as broken from Aug 2024 to Aug 2025 until a re-check shows otherwise.)*
- **When a category breaks, do not just drop it: build it from brands.** Pick brands that represent the
  category, sum them per geography, and read the sum as the category. It need not be exhaustive.
  - Pick brands present in **the subject and every comparison** (national, not regional), across the
    category's main formats (for restaurants, for example: quick service, coffee, fast casual, pizza,
    casual dining).
  - **Probe first, at quarterly grain**: one call for the subject shows that every brand returns rows and
    whether the brands share the break. If they share it, the basket cannot stand in; say so.
  - **Break-check the summed basket** across every geography, then drop one brand at a time: a claim that
    moves materially without one brand is about that brand.
  - **Name it for what it is**: "spending at N national [category] chains", and say what it misses
    (independent businesses). Where a second dataset reads the same category (foot traffic per location),
    compare the timing.
  *(Verified Oct 2026 on a place pilot: a 14-chain restaurant basket showed no step in Aug 2024 in any
  metro area, and its recovery month matched restaurant foot traffic per location.)*
