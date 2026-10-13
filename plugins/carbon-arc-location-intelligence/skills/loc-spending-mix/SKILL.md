---
name: loc-spending-mix
description: "Use this skill when someone wants to know what the people who live in a metro area are spending more and less on: which categories (grocery, home improvement, general merchandise, dining out and others) moved beyond their normal range against comparable metro areas, and which way, after a dated shock or as the place grows. It reads residents' card spending by category, wherever they spend it, and rebuilds a category from brands when the category's data breaks. For residents' total spending and its pace, use loc-residents. For a full report on a place, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Spending mix: what are residents spending more and less on?

Invoke **`ca-core`** first and follow it throughout. The subject is a **place**, so the setup is
**`ca-core/references/setup-location.md`**, with **`ca-core/references/instruments/metro-instruments.md`**
for the routes. Read both, and `carbonarc-mcp`'s `references/data-state.md` ("Category breaks, and the
brand basket"), before pulling. This file is the run order.

---

## What it answers

1. **Which categories of residents' spending moved** beyond their normal range (event run) or ahead of or
   behind comparable metro areas consistently (trend run)?
2. **Which way, and for how long?**
3. **Where a category's data breaks, what the category did anyway**, read through a basket of brands.

## The one rule of geography in this module

**A category's card spend for a metro area is what its residents spent in that category, wherever they
spent it.** It is never the area's stores' sales. Every chart says *residents of the metro area*.

## Before anything

- **Have the setup**: the metro-area node, the comparison metro areas, the kind of run and the dates.
- **Re-survey live**: categories reach the metro area through a category entity filtered by `cbsa_name`
  (`metro-instruments.md`). Only a returned row confirms a route.

## Run order

**1. Choose candidates** for what the question would move. A storm moves grocery, gas, home improvement,
automotive, general merchandise, online, dining out and hotels; a trend run picks the categories that make
up most of residents' spending. Residents' own travel (hotels, airlines) answers "are residents pulling
back on trips?" in any run.

**2. Series probe**: every candidate category for the subject alone, a few recent months, to size each
against the floor (`metro-instruments.md`). A category under the floor is named as too thin.

**3. Each surviving category for every metro area**: monthly for an event run, quarterly for a trend run.

**4. The break check**, before any gap (`setup-location.md`, "Category reads and the brand basket"): a
jump of the same sign in every metro area in the same month that reverses twelve months later.

**5. A broken category is rebuilt as a brand basket** (`data-state.md`), with its own probe and its own
Gate 2 rows.

**6. Gaps and decomposition** for every category: the gap, the event-run normal range or the trend-run
consistency and direction, the leave-one-out on comparison metro areas, and for a basket the leave-one-out
on brands (`setup-location.md`, "The gap and the normal range").

## Gates that bite here

**The break check before any gap.** **The volume floor in the smallest comparison metro area.**
**Leave-one-out** on comparison metro areas and on brands. **Never compare dollar levels** across metro
areas, and never divide a category by anything from another dataset.

## What this module will not say

- **Not the area's stores' sales** in any category.
- **Not why** residents shifted their spending, beyond naming the event it lines up with. A candidate
  explanation ("consistent with a cooler housing market") is labeled untested.
- **Not a category inside its normal range**, or ahead in only about half the periods.
- **Not a brand basket as the whole category**: "spending at N national chains", and say what it leaves
  out.

## The evidence

The default for this tab (from the place pilots); another form may serve better (`carbon-arc-report-v2`,
"Beyond the default kit").

1. **The gap by category** as bars: only categories that pass, with each one's range under leave-one-out
   in the subcaption or a table beside it.
2. **The gap over time** for the one or two categories that carry the finding, zero line, event marked.
3. **Event run, the weekly shock** for the categories the event moved most, as indexed ratios.

## If this module is run on its own

- **Phase 1a not done** → the place, the event and its dates (or the published growth ranking), the
  comparison metro areas. Nothing else.
- **Before writing the tab's copy, run Phase 1b**: each claim against the one published figure it is
  exposed to.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
