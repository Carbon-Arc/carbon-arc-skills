---
name: ca-retention
description: "Use this skill when someone wants to know whether a brand keeps the customers it wins: how many new customers come back, whether existing customers are coming back less often, how that compares with a competitor, which generations come back, and whether the customers who return spend more or less, even if they only ask about loyalty, repeat customers, churn or cohorts. It reads card-panel retention for new and existing customers against a peer, as retention curves and retention triangles. Not for where lost customers went, which card data cannot show; for who shares the brand's customers, use ca-competitive-set, and for how its spend splits across age groups, use ca-audience. For a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.4.1'
---

# Retention — are we keeping the customers we win?

Invoke **`ca-core`** first. The method is **`ca-core/references/instruments/card-retention.md`**: read it
before pulling. This file is the run order.

## The one rule that governs this module

**Never report the everyone rate alone.** Retention for everyone who shopped is a mix of new customers,
who rarely come back, and existing ones, who mostly do. When the mix shifts, the total can move the
opposite way to both of its parts. Every read pulls both measures and splits them into new and existing
customers, per `card-retention.md`, "The analysis".

## Before anything

Entities resolved, data map built, live re-survey, Phase 1a done.

- **Read the coming-back row of the data map.** Retention follows the same people over time, so it runs
  only on a dataset that does (card retention today). Where the map found none for the set, this tab is
  cut and the rest of the report runs; Gate 1's scope sentence says why in one clause. Run on its own,
  say so and name what is readable instead.
- **Confirm the brand node that carries the spend** and that it has a retention topic, per
  `card-retention.md`, "Before the first pull". A listed insight is not proof of rows. Gate 1 names, for
  each brand, the node chosen and the sibling nodes that went into the probe with it (or that it has none).
- **Pick the peer.** At least one, from the benchmark's set, read exactly as the subject. Check both
  against "Minimum group size" from their 626 spend before writing the pull rows: a peer too small to read
  is replaced, not shown with a caveat. A group size read off spend is an estimate: say so wherever it
  appears, until the series probe returns the real count.

**Gate 1 carries no pull list.** It shows entities, coverage, grain and the peer, and asks about those.
The pulls are listed once, at Gate 2, in the table with **Method from**. A pull plan in Gate 1 that asks
"go ahead and pull?" skips the gate the user approves spend at.

## Run order

Curves are monthly and triangles are quarterly (`card-retention.md`, "The recipe"). Every call below
is its own Gate 2 row.

0. **The series probe** first: 124734 on the subject, monthly, for the curve month. Its rows are the
   subject's curve-month pull.
1. **Monthly, for the curves:** 124734 and 232620 for the curve month and the same month a year
   earlier, for the subject and each peer (the probe covers one of these).
2. **Quarterly, for the triangles:** 124734 and 232620 for the subject and each peer, eight starting
   quarters ending at the last one you will keep.
3. **By generation, monthly:** 232621 (everyone) and 124735 (new customers) for the subject, curve
   month, all generations in one call each. The new-share check decides the chart: everyone when every
   generation's new share is under 10%, existing customers when any is 10% or more. Drop a generation
   under the floor or with a collapsing count, or pool three starting months for it when its count
   holds.
4. **The checks** in `card-retention.md`, "Checks before any number is used", on every series, before any
   rate reaches a chart: unfilled latest month, the returned rate, group-count drift, size floor.
5. **The split and the spend reads**: new, existing and everyone rates; the new-customer share; starting
   spend per customer and spend retention.

## The evidence

Every chart on this tab is a **monthly retention curve** or a **quarterly retention triangle**, drawn per
`card-retention.md`, "How to present it". Lead with the chart that answers the question asked.

1. **Curves, new customers:** the curve month against the same month a year earlier, subject and peer.
   The tab's headline comparison.
2. **Triangle, new customers**, subject: every starting quarter, so the reader sees whether the change
   in chart 1 is one quarter or a run of them.
3. **Triangle, existing customers**, subject, with the new-customer share of each group stated in the
   caption or a tile, since it is what moves the everyone rate.
4. **Curves by generation**, subject, the curve month: which generations keep coming back, on everyone
   or on existing customers as the new-share check decides, with each generation's new share in the
   caption. One line per generation over the floor; rates only, never the mix.
5. **Spend retention** as a monthly curve (the group's spend in each month ÷ its starting spend) only
   where it tells a different story from the customer count.

A change is a finding only at z ≥ 2 (`card-retention.md`, "Minimum group size"). No detectable change is
written as such and is a finding too.

## Gates

The size floor and the count-collapse rule in `card-retention.md`. The latest closed month dropped, or
kept with the year-earlier test stated. Group-count drift above about 10% stated where the number is.

## What this module will not say

Where lost customers went: retention shows that customers stopped, not that a rival took them. A
customer *count* as if it were the brand's customer base. A change below z ≥ 2 as a change. Anything about
a brand whose new-customer groups fall under the floor. A generation's share of customers, which the
panel's age skew distorts.

## If this module is run on its own

It may be the first thing that has run, so it cannot assume the orchestrator's setup happened.

- **No data map yet** → build it here first: the sales probe in `setup-brand.md`, "The data map", before
  designing anything. Where the map cuts this tab's question, say so in one line and name what is read.
- **Phase 1a not done** → **run it now, and only it**: fiscal calendar, unit count and unit growth for
  every peer, candidate events as names and rough dates. Nothing else — the disclosed figures come later,
  against a claim.
- **Before you write this tab's copy, run Phase 1b on it.** For each claim the tab intends to make,
  retrieve the one disclosed figure that claim is exposed to (a disclosed repeat rate, active-customer
  count or loyalty-member figure) and drop or reframe the claim if the panel contradicts it.
- Write back whatever you learn, so the next module does not repeat it.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
