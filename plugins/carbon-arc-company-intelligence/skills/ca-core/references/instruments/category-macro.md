# Category macro: the national denominator, cohorts, deferral and macro series

Treat these call shapes as starting points: confirm each id live with `get_insights_from_entity` at `limit=250`.

## The national denominator

A category's share of the consumer's wallet needs a numerator and denominator from **one insight at one
grain**. Use the category node over a broader node (a top-level retail or durable-goods category, or the
national panel entity where the insight runs on it) on the same insight, same resolution, same grain.
Probe the pair before planning around it. If no broader node runs on the insight, report the category's
year-over-year beside the reference categories' and make no share claim.

## Reference categories

Chosen before any pull and shown to the reader: **one essential** (groceries, fuel or drug stores, for
example) and **one discretionary category with no tie to housing or vehicles**. Same insight, grain and
resolution as the subject. They answer "is the consumer pulling back from everything, or from this".

## Cohorts

- **Age groups: live.** The generation cut (116195-116198) on the complete panel. On a category node it
  ran at `state` and failed at `us` (Oct 2026): sum states for the category side. The adjustment and the
  tracking-over-time index are in `card-cohorts.md` and are mandatory.
- **Income groups: frozen.** The income cuts surveyed (355-358, 66-68) sit on the Detailed panel, which
  stopped in Aug 2025. They may carry history up to that date, dated on the chart, and never a current
  read. Re-survey each run for a live income cut on the complete panel; if one appears, it takes the
  same adjustment against the national panel as age groups do.
- A cohort's index moving is checked for drift across all groups before it is called (`gating.md` §3).

## Deferral

Big-ticket deferral shows up as **transactions falling at a steady or rising ticket** (fewer purchases,
the ones made are the necessary ones) or **ticket falling at steady transactions** (trading down). Read
both from `spend = transactions x ticket`.

- A ticket-size distribution is not in the surveyed topics. Where a future survey shows one, the share
  of transactions above a fixed dollar threshold, held constant in real terms across the window, is the
  direct read.
- Price inflation raises ticket with no change in behavior. Retrieve the category's published price
  index (▲, public source) and say how much of a ticket move it covers, in words, never as an adjusted
  panel series.

## Macro series in the MCP

The **Housing Indicator** and its siblings (prices, markets, construction, finance) carry national
public series: new-home sales, starts, permits, completions, months' supply, furnishings and shelter
prices, residential real-estate and home-equity lending. They are context on a national chart, sourced as
public statistics, and never divided into panel spend. No existing-home sales or mortgage-rate series
was found in discovery; those come from public sources as ▲.

## Macro events

The `ca-events` method, with two controls: the reference categories (should not move) and the
category's neighborhood (may move together). An economy-wide event usually reaches every market, so the
geographic split is often absent; where an event has heavier exposure somewhere (a tariff on a good one
region buys more of, a storm, a state incentive), split on it.
