# Pull sizing and cost

> Part of `carbonarc-mcp`. Read when building the Gate 2 manifest, and before any pull covering more than one entity or finer than quarter grain.

---

## The result-set cap — an oversized pull is worse than a failed one

**A pull whose result set exceeds what the MCP returns inline comes back as generated prose instead of rows.**
The call still bills, the response still looks like an answer, and the prose is not reliably derived from the
data. This is the one failure mode that does not announce itself: no error is raised, and the narrative reads
like a finding.

The cap is on the size of the returned result, so it is driven by **rows, not entities**: entities x periods x
any dimension the framework adds. A pull crosses it either by listing many entities or by asking for a fine
date resolution over a long window.

- **Size the pull before sending it.** Entity count x period count, doubled if the insight carries a component
  dimension. **Batch to roughly 100 rows**, which keeps you clear of the cap with margin.
- **Coarsen the grain before you drop entities or shorten the window.** A comparison set has to stay
  intact and history is what the analysis is for, but grain is usually negotiable: `quarter` costs a third
  of `month` in rows and answers most trend questions identically. *Verified Sep 2026:* four entities x 76
  months crossed the cap and came back as prose; **the same four at `quarter` returned a clean, fully
  labelled table**, and the coarser grain also suppressed month-level noise that had been tripping the
  panel-break gate 15 times on the same series. Only after coarsening does splitting by entity earn its
  place — several small pulls return real rows, cost less in total, and preserve the history.
- **A returned table missing a column you did not ask it to drop is a cap symptom.** The summarizer
  commonly strips the **date column** while leaving the value columns, so the table looks complete and is
  silently unlabelled. Reconstructing dates from row order works only if the row count matches the stated
  span exactly; if it does not, do not guess — re-pull coarser. Either way, record in the run notes that
  the dates were reconstructed rather than returned.
- **If prose arrives where a table was expected, discard it entirely** and re-pull smaller. Never mine the
  summary for figures and never quote it. Non-negotiable 1 applies: nothing in it was retrieved.

Carbon Arc puts the practical limit at roughly **50 pages of output**; batching to about 100 rows stays well
inside it. Past the cap the prose is unreliable and the tables it does emit sometimes lose their labels
entirely. *Observed Sep 2026:* a pull of eleven entities x 56 months x a two-value component split (about
1,200 rows) crossed it, cost roughly twenty times a single-entity pull, and returned a summary that named the
wrong leader and reported the row count as a transaction count. Single-entity pulls of 44 to 134 rows returned
clean tables throughout the same run.

## Cost

Billed calls are not uniform, and the spread is wide enough to plan around: a wide affinity pull
(tens of thousands of rows across hundreds of partners) has cost several times a multi-entity series
pull, and many times an ordinary single-entity series. These rules shape how you pull; they are never
turned into a figure for the user (see Gate 2).

- **Pull a wide, expensive insight once at the finest grain you will need, then slice every window out of
  it in code.** Re-pulling to change a window is the most common way to pay twice for a chart that was
  already in hand.
- **Discovery is free.** `search_entities`, `search_insights`, `ontology`, `data_library`,
  `get_filter_options` and the `get_*` traversals cost nothing. Any question you can settle with those,
  settle there first — most failed billed calls in practice are answerable by a free `get_filter_options`.

A call that is slow rather than large is a different problem: see `troubleshooting.md`.
