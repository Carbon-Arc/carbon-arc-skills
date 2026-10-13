# Handling what comes back

> Part of `carbonarc-mcp`. Read the moment the first pull returns, before any series reaches a data module or Gate 3.

**What Gate 3 carries from this file:** each signal's data-through date, taken from the returned max
date; one line wherever that date moved the window end away from the provisional one (both dates); and
the result of the nine checks below per series. The modules' own method files repeat most of the nine
checks. The signal-lag rules are only here.

---

## Response shapes

Response shapes vary by insight type. Field names differ — `value`, `amount`, `spend`, `visits` — so **always inspect the raw response before writing a data module**, and map to the standardized format explicitly rather than assuming.

Watch for a returned dimension you did not ask for. A framework may split the result by a component (transaction method, payment type) you then have to decide how to handle — silently summing it is a decision, not a default. See non-negotiable 12.

On an oversized result set, see `pull-sizing.md`.

## Signal lags

Per-signal `dataThrough` handling is mandatory in any multi-signal artifact. Never let the freshest signal's date imply the others are that fresh.

**Plan on the tearsheet's lag; decide on the fill.** Two steps, in this order:

1. **Before any pull (Gates 1 and 2):** run `data_library` on each signal's dataset and read the lag its
   tearsheet lists. Use it to set a **provisional** window end (today minus the lag), and label it
   provisional wherever it appears, including the windows shown in the Gate 2 pull list. This is the
   starting assumption, not a decision.
2. **After the pull:** the returned max date (below) and the completeness check in `ca-core`'s
   `references/gating.md` §5 set the actual window end. **Where they disagree with the tearsheet, the fill
   wins**: move the window, and say so at Gate 3 in one line, with both dates.

**Align on the max date the response returns, never on the published lag.** `framework_to_insight`
truncates the request itself and reports `table_max_date_implemented_date`. Published lags are a
property of the asset's documentation and go stale; the returned date is a property of the pull in
front of you.

```python
common_end = min(r.table_max_date_implemented_date for r in responses_on_this_page)
```

*Verified Sep 2026:* two topics inside one asset published lags of T+9 and T+16 days and returned the
**same** max date, so a recipe built on the published differential would have discarded a week of good
data for a trap that never reaches the caller. Across **different assets** the cutoffs genuinely differ
and that is where the alignment earns its keep: on one day, four panels in one report returned four
different latest periods spread over twelve days.

Two mechanics that travel with this, both verified: **a requested start pulls the whole period
containing it**, so the first row can include days before the window you asked for, and **the echoed
`framework_request.filters` comes back empty even when a window applied**. Verify the window from the
returned rows, never from the echo.

**Fallback only.** Use this table when `data_library` returns no lag for the dataset. It was written by
hand and goes stale; never prefer it to the tearsheet, and never to the fill.

| Signal family | Typical lag |
|---|---|
| Card | T+3 days |
| App | T+4 days |
| Foot traffic | T+5 days |
| Advertising | ~1 week |
| Point of sale | weekly or longer |

## The validation gate

Run on every pulled series **before** it reaches a data module. A failing series is flagged in the output or dropped — never silently included (non-negotiables rule 3). Results are presented at Gate 3.

1. **Continuity** — no missing periods inside the window. A gap usually means the query silently truncated; re-pull with explicit dates.
2. **Partial-period detection** — check the returned max date and the first/last rows against the requested window. Any period only partly covered is dropped everywhere: YoY, trailing averages, charts, tables. A quarter is partial if the pull's start or end date falls inside it, which happens routinely when a monthly window is aggregated to quarters.
3. **YoY integrity** — compute YoY only where both the current and prior-year period exist in the pull. Never extrapolate one.
4. **Cross-signal magnitude sanity** — check orders of magnitude against each other. Card spend divided by visits should produce a plausible ticket size; visits per location per day should be plausible for the format. A mismatch usually means a wrong entity, a wrong unit, or a panel subset. **A collection method can break on a specific business model** — a location-based visit panel over-counts a delivery-led format, for instance — so sanity-check against the business model, not just against other signals.
5. **Panel-break detection** — a sudden level shift (>30% period-over-period with no known cause) in an otherwise smooth series suggests a panel composition change, not a business change. Check the same period across the peer set *and across geographies*: if they all move, it is the panel. Flag it; never narrate it as a business inflection. If the break is confined to one component, use the clean component only — and then apply rule 12.
6. **Recency** — record the latest available period **per signal**, and label each with its own data-through date.
7. **Provenance** — record the insight ID, the insight label, and the panel name **with its population** for every series.
8. **Cohort-share debias** — any bucket-versus-whole read (generation, income, geography) is reframed as within-bucket YoY, population-reweighted, or explicitly labeled "share of panel, not population" with the skew named. Panel composition is not population composition.
9. **Basis consistency** — see non-negotiable 12. Every series in a comparison is on the same component basis, or the comparison does not ship.

## Credibility pulls

Feeding the backtest obligation in non-negotiable 4:

- **Backtest pairs** — the signal's full history against the matching reported figure, with as much overlap as exists. Pull these where non-negotiable 4 fires: an investor audience, or any artifact that cites a reported figure.
- **Correlation and lead/lag** — monthly YoY for the candidate signal and the core proxy over an identical window; compute Pearson r at lags of −3 to +3 periods and report the best lag with its r. **Check the sign of the lag makes causal sense.** A "demand signal" whose best correlation has the revenue proxy *leading it* is not a demand signal.

Both are computed locally on series already pulled. Ensure the windows overlap when pulling.
