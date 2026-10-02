---
name: ca-audience
description: "Use this skill when someone wants to know which customers a brand is winning or losing by age: how its spend splits across generations, how that mix is moving, and how it compares with a competitor's, even if they only ask about Gen Z or younger customers. It reads card spend by generation, adjusted for the panel's age skew, and income or gender where the data covers them. Not for a musician's or actor's fans. For a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Validated on the restaurant and luxury pilots. The debias is mandatory and non-negotiable — see the cohort gate in setup-brand.md."
---

# Audience — which customers are we losing?

Invoke **`ca-core`** first. The method is **`ca-core/references/instruments/card-cohorts.md`** — read it
before pulling. **The cohort gate in `setup-brand.md` applies and is not optional.**

## The one rule that governs this module

**Never publish a raw cross-generation share from US Complete.** The panel is materially older than the
country, and the correction *inverts comparisons* rather than softening them: on the pilot the raw chart
said a rival skewed older than the subject when the adjusted chart said the opposite.

The recipe (which insight, the national denominator, the rebase, what to drop, which spine) and the
checks before shipping live in `card-cohorts.md` and nowhere else. Follow that file, not a summary of it.
It covers both of this tab's charts: the adjusted mix, and the time series, which is **indexed against
the national cohort before its YoY is taken**, never read plain.

## Before anything

Entities resolved, demand route asserted, live re-survey, Phase 1a done. **Settle the debias denominator
before the first cohort pull** — no cohort figure ships without it.

## Run order

1. **The adjusted mix** for the subject and one or two comparators, per `card-cohorts.md`, "The recipe".
2. **The indexed monthly series** for the subject and one comparator, from 24 months before the window,
   per `card-cohorts.md`, "Tracking a cohort over time".

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The adjusted mix**, subject and comparators. Read as *where a brand's pull sits across generations*,
   not as a share of revenue — say that in the caption.
2. **Monthly YoY by generation, indexed, one chart per brand** — subject and one comparator. A two-endpoint bar
   chart hides *when* the turn happened; the series does not.


## The receipt panel, where it covers the subject

A second route, and **demographic-only**. Where the live re-survey shows the receipt panel covers the
subject, it carries dimensions card does not — gender, income, education level — read from receipts
rather than from a card's merchant line. The debias is the same card recipe, so the two can sit side by
side once both are adjusted.

The recipe is **`ca-core/references/instruments/pos-cohorts.md`**. Read it before the first receipt pull:
it carries the in-store and online split, which must never be merged, the insight ids per component, and
the per-cohort volume gate.

**The one thing that cannot wait for that file: never publish a level from this panel** — no spend, no
volume, no unit price, and no growth rate on any of them, for the subject or a peer. The panel is far
too thin to size a brand's trade and its components decay independently, so a level chart says the
business collapsed when what happened is that the panel stopped.

## Gates

The cohort gate in `setup-brand.md`. Volume gate on any ranked cohort cut. Drop any cohort under ~1% of spend from a normalized
mix. `verify_report.py` fails the build if cohort figures appear with no basis stated anywhere.

## What this module will not say

Income cuts from the frozen detailed panel without saying it is frozen. A cohort's *count* of customers
as if it were the population. Anything about a cohort too thin to clear the floor.

## If this module is run on its own

It may be the first thing that has run, so it cannot assume the orchestrator's setup happened.

- **Demand route unset** → run the gate here: a probe on **626** against the resolved entity, before
  designing anything. Retailer-mediated ends the run with the client-facing scope line.
- **Phase 1a not done** → **run it now, and only it**: fiscal calendar, unit count and unit growth for
  every peer, candidate events as names and rough dates. Nothing else — the disclosed figures come later,
  against a claim.
- **Before you write this tab's copy, run Phase 1b on it.** For each claim the tab intends to make,
  retrieve the one disclosed figure that claim is exposed to and drop or reframe the claim if the panel
  contradicts it. It is a gate, not context: without it this module can publish a figure that contradicts
  a public filing, which is the one failure a reader will always catch.
- Write back whatever you learn, so the next module does not repeat it.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
