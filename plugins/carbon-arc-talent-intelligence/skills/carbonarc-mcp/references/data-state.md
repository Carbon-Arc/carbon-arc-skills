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
- **Frozen panels.** Some panels are historic-only and stop at a fixed date. Label any read from them as historical, and prefer the live sibling for current work.
- **The complete US card panel's transaction-method split is not a business measure — use the sum.**
  **627 returns a `TRANSACTION METHOD` split that 626 does not**, at `us` and `state` resolution on
  multi-entity pulls, though not on a single-entity monthly pull. **Sum before dividing, or the ticket comes
  out 2x.** Neither column is reportable alone: the online column is card-not-present
  activity, which is not what a company means by its digital, app or delivery sales, and there is usually no
  disclosed figure to check it against. **Take the sum of the two as the basis, and hold that basis across every
  comparator** (rule 12). Where one call returns the split and another a total, reconcile them before using
  either — the total should equal the sum exactly, and if it does not, something else is wrong.
- **Constant-shopper topics** give cleaner YoY than the core panel — the same-cardholder base removes composition drift. Prefer them for trend reads where available.
- **Overlapping-shopper and nPMI cross-shop insights** exist but availability **varies by brand pair**. Check before promising the analysis; state the fallback when it is unavailable.
- **Card sees the merchant, not the item.** Brand-versus-brand share within a retail channel requires point-of-sale data. Card is legitimate for specialty retailers whose category is dominated by a few named merchants, and for direct-to-consumer brands where the brand *is* the merchant.
- **Aggregator merchants are not brand signals.** Spend captured at a delivery or marketplace aggregator spans every merchant on that platform. It cannot be differenced against a single brand's spend to size leakage, and a caveat does not rescue a title that performs the comparison anyway.
- **Foot-traffic visitor profiles** arrive as JSON strings needing a parse, and device panels carry regional skew. Use visits-per-location for cross-brand comparison; raw visit counts compare footprints, not demand.
