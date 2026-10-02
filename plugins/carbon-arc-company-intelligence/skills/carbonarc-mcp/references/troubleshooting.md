# When a call is slow, fails, or returns nothing

> Part of `carbonarc-mcp`. Read the moment a call fails, returns zero rows, or passes 90 seconds. Do not conclude an asset is unavailable without it.

---

## Latency — a slow call is a bug, not a big query

Pulls are fast. When one is not, the parameters are the suspect, not the size of the question.

| | observed Sep 2026 |
|---|---|
| Median billed pull | ~6 seconds |
| 21 of 25 pulls in one full report | under 15 seconds |
| Same insight, same shape, two runs | **42 seconds and 907 seconds** |
| An out-of-range geography | **22 minutes, then zero rows** |

**The rule: past 90 seconds, stop waiting and vary one parameter.** Geography first, because an
out-of-range `location_resolution` is answered with an empty result set rather than an error, so it
looks like a thin brand rather than a bad call. Then date resolution, then entity representation. Three
of those four are free to test elsewhere; none of them is worth 20 minutes of wall clock.

The same run wasted 22 of its 48 minutes of pull time on calls whose results could not be used. All of
it was one call that should have been abandoned inside the first two minutes.

**Size a pull before sending it, not after.** Entity count x period count, doubled if the insight
carries a component dimension, batched to roughly 100 rows. That is in `pull-sizing.md` and
it governs latency as much as it governs output shape.

## Before declaring an asset unavailable

**A framework error that names the entity is not evidence about the entity.** `framework_to_insight`
returns *"The entity and insight combination you provided could not be validated"* for a wrong
`date_resolution` as readily as for a wrong entity, and `get_filter_options` reproduces the same failure,
so it does not isolate the variable.

- **Vary each parameter independently** — `date_resolution`, `location_resolution`, entity representation,
  aggregate. Three of the four are free.
- **Establish a call you expect to SUCCEED before concluding anything fails.** A negative control without a
  positive control is not a test.
- **Check filter literals before you pass them, always.** A wrong *value* inside `filters` throws the same
  "entity and insight combination could not be validated" as a wrong entity. `get_filter_options` with a
  `filter_key` returns the exact accepted strings and is **free**; guessing them is the single cheapest way
  to manufacture a false unavailability verdict. *Verified Sep 2026:* a browsing-affinity insight was
  written into a foundation file as returning no partner dimension, and a report shipped without a
  competitive-set module because of it. The lens was fine. `country` wanted
  `"United States of America"`, not `"United States"` — and `start_date`/`end_date`, which are *columns*
  on that insight, are not *filter keys* on it and reject the whole call when passed. Both errors read as
  "the entity has no data". They cost five failed calls, and the correction later produced 35,864 rows.
- **A column is not a filter.** The columns an insight returns and the keys it filters on are different
  lists. Take the filter keys from `get_filter_options`, never from the tearsheet's data dictionary, and
  bound a window in code after retrieval when no date filter is offered.
- **Where `ontology` says coverage exists and the framework disagrees, the call is the suspect first.**
- **Match the claim to the evidence.** *"This call shape was rejected"* is what you know. *"This asset has
  no data"* is a much larger statement, and ⧗ (real data, wrong access path → SQL) versus ⛔ (no such data)
  point at opposite next actions.
- **Withdraw per series, never per panel.** A panel routinely fails for one entity and works for its
  peers, or dies in one component while another component of the same asset runs on. Ask which *series*
  failed, not which panel. *Verified Sep 2026:* a report dropped a receipt panel because its online
  component had decayed to noise, when the in-store component on the same asset and the same brand was
  still running; and dropped a browsing panel because the **subject's** series was broken, when five of
  eleven **peers** returned clean series. Both withdrawals cost a usable read, and for any analysis whose
  value is competitive the peer series is the one that mattered.

*Verified Sep 2026:* an asset was written off after one call used `quarter` on an insight that accepts
`month` only. Six diagnostic calls then went into testing entity variants. It was alive, and it became the
strongest local signal in that brief — and reversed a published conclusion.
