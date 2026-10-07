---
name: ca-competitive-set
description: "Use this skill when someone wants to know who a company really competes with for its customers: where else its customers shop or eat, which brands share its customer base (including ones it isn't tracking), and whether a named rival actually shares a customer. It ranks the brands its customers also spend at. For how the company's demand moves against those rivals, use ca-benchmark; for a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Competitive set — where else do our customers spend?

Invoke **`ca-core`** first. The method is **`ca-core/references/instruments/cross-shop.md`** — read it
before pulling; it carries the window, the drift check and the thickness floors. This file is the run order.

## What it answers

Which brands share this company's customers, ranked — and specifically **which ones the client is not
already watching**. That is the whole value: the declared set is what they came in with.

## The scope boundary — put it on the tab

**This shows who *shares* a customer, never who *took* one.** nPMI is co-occurrence; a customer at both
brands may have added a visit. The flow question needs a cohort measure the panel does not carry. Say so
on the tab, because readers hear "cross-shop" and infer substitution.

## Before anything

Entities resolved, demand route asserted, live re-survey, Phase 1a done — as `ca-core` §2.

## Run order

1. **Card overlap: insight 120277**, `country` + `month` + `mean`, one main entity. Returns the subject
   against every partner — expect a large result and the file-dump path. **48289 and 585 are not
   substitutes** despite the identical label.
2. **Thickness: insight 48288** alongside it, every time, at `country` (it returns zero rows at `us`, not an error). ~150 shared users to rank, 100–149 directional.
3. **Browsing overlap: 640**, `country` + `month` + `mean`, filters
   `{representation: ["Product Brand"], country: ["United States of America"]}`. Check every filter
   literal with `get_filter_options` first — it is free, and a wrong literal throws the same error as a
   missing entity. **Rank order only; never print a score** (639 puts shared users per pair at 14.5–27).
   Apply the **stability and rank-reproducibility gates** in `cross-shop.md`, and break-gate the subject's
   own traffic series *before* ranking — raw nPMI on a broken window is not the competitive set.
4. **Traffic share on the gated set: insight 379**, subject plus top three survivors, at **quarter**
   grain. Run the panel-break gate (`gating.md` §7) on each member's absolute series and cut the window at
   the earliest break in any member before computing share.
5. **Drift check** across all pairs before reading any movement (`gating.md` §3).

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The ranked overlap**, trailing four months at month grain. Lead with the **surfaced** names.
   - **Bar length is shared-customer affinity indexed to the top-ranked brand = 100**, computed inside
     the one window. Name it that way in the subcaption, with the plain gloss after it ("how much more
     often than chance the two brands share a customer"). Print the index on the bar and put the rank
     beside the name ("Brand · #3"). Never print the raw score, and never compare an index across windows.
   - Chip: `■ Credit Card – US Complete Panel · rank and index, one window` (120277's dataset).
   - Color surfaced names and the client's named rivals in two comparison colors, with a legend. The
     subject is not on this chart, so no orange.
   - If rows are hidden for thickness, the ranks will skip. Say which positions are hidden and why.
2. **Where the declared set actually sits** — their conventional rivals, with rank out of the full list.
   On the pilot those ranked 60th, 94th, 110th and 222nd of 1,572, which reframed the whole brief.
3. **Rank movement** against the same four months a year earlier. Rank, never score.
4. **Traffic share within the affinity-defined set** — subject plus top three, smoothed to a trailing
   three-month mean, over the window that survives the break gate. This is the chart that turns "who
   shares my customer" into "and am I gaining on them".

## Gates

Fixed window (trailing four months, same-season comparison). **Rank, never level** — drift makes levels
uninterpretable. Thickness floor named, and any pair that never clears it named too, **including declared
competitors** — a rival too thin to read is itself worth telling them.

## What this module will not say

Who took a customer. Which direction a share shift ran. A raw nPMI score from either overlap, or an
index compared across windows. An nPMI **level** from browsing overlap — order only. A traffic share series that spans a panel break in any member. A penetration rate instead of nPMI —
a rate re-inherits the partner-size bias.

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
