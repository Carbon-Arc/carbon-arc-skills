---
name: ca-execution
description: "Use this skill when someone wants to know what is behind a winner's growth, whether the winner is the company itself or a competitor: its attention, advertising and distribution against the rest of the set, whether it is outspending or being outspent, and whether its lead is holding. It reads whoever leads the benchmark. For a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Validated on the restaurant pilot's fast-growing rival (attention and media). Distribution leg unproven — store count and job openings both failed on the restaurant pilot."
---

# Execution — who is winning, and what is behind it?

Invoke **`ca-core`** first. This module **introduces no new instruments.** It re-points the benchmark and
event instruments at the winner and adds public research. Guard that: it is the module most likely to
sprout a stack of its own.

## Before anything

**It needs a winner, and the winner is whoever the benchmark says leads**: the brand growing fastest on the
benchmark's measure, **the subject included**. Run `ca-benchmark` first, or take the winner it already
identified. Never skip the subject because it is the subject, and never swap in a rival to keep the tab's
shape.

| The benchmark shows | This tab |
|---|---|
| **A competitor leads** | *What is behind [competitor]'s growth?* The winner is the competitor; the subject is the comparison. |
| **The subject leads** | *What is behind our lead, and is it holding?* The winner is the subject; the nearest challenger is the comparison. Still share of the set throughout, so it points outward as the reader file requires. |
| **Nobody is growing** | Say so plainly: that is the benchmark's finding. Ask the user whether to read the brand declining least, or cut the tab. Do not substitute a "least bad" brand without asking. |

Entities resolved, demand route asserted, live re-survey, Phase 1a done — as `ca-core` §2.

**Read `ca-core/references/instruments/cross-signal.md` before pulling attention, foot traffic or
advertising.** It carries the subject-count rule, the store-count denominator for foot traffic, and how
to treat a modality that disagrees with card.

## Run order

1. **Re-run the benchmark decomposition on the winner** and on the comparison — `spend = transactions x
   ticket`. Volume or price is the first thing to know about anyone who has broken away.
2. **Attention: insight 8928** (Consistent User), `location_resolution: "us"` · `date_resolution:
   "quarter"` · `aggregate: "sum"`, one pull for the whole set.
   **Share of a defined set only, never absolute growth** —
   the panel itself grew 29% to 135% per brand across two years on the pilot, so levels are panel, not
   attention.
3. **Advertising: insight 248** as share of the same set, same call shape as 8928.
   **518 advertising spend growth is unusable** —
   it did not reconcile with the count series and returns NaN unless the base year is inside the window.
4. **Distribution**, where it survives. Store count and job openings both failed on the restaurant pilot;
   foot traffic executes but cannot be separated from POI-list growth without a store count. Probe, and
   drop it without ceremony if it does not hold.
5. **Public research** — what the company itself says it is doing. Run it **before** fixing the headline.

## Carry a control

The finding needs a brand that gained attention and did **not** convert it. On the pilot, one rival's
attention share rose while its card spend fell 6.6%, which is what made "attention alone does not
convert" a claim rather than an assertion.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The winner's decomposition** beside the comparison's — volume against price.
2. **Share of category attention**, over time, as share of set.
3. **Share of advertising**, same set, same window — with the level change beside it.

## Bound the claim honestly

The advertising panel is **a sample of digital display, video and social**. No television, no
out-of-home, no retail media. So the fair statement is *"not explained by digital ad volume"*, never
*"not bought"*. On the pilot that distinction was the difference between a defensible finding and an
overclaim.

## What this module will not say

Why a brand is winning — only what accompanied the winning. That media caused a gain, or that its
absence proves the opposite. Anything about expansion from foot traffic alone.

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
