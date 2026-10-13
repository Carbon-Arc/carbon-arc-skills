---
name: loc-residents
description: "Use this skill when someone wants to know how the people who live in a metro area are spending: whether their spending fell, held or grew against comparable metro areas, whether they bought less often or spent more each time, whether growth came from more people spending or each spending more, and how a dated shock such as a storm or a plant closure hit them week by week. It reads card spending by residents, wherever they spend it. For what residents spend more and less on, category by category, use loc-spending-mix; for visits to the area's hotels, restaurants and stores, use loc-places. For a full report on a metro area, use location-report; on a venue, venue-report."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Residents: how are the people who live here spending?

Invoke **`ca-core`** first and follow it throughout. The subject is a **place**, so the setup is
**`ca-core/references/setup-location.md`**, with **`ca-core/references/instruments/metro-instruments.md`**
for the routes. Read both before pulling. This file is the run order.

---

## What it answers

1. **Did residents' spending fall, hold or grow** against comparable metro areas, and for how long?
2. **Fewer purchases or smaller ones?** Purchases and average purchase, from the same panel.
3. **More people spending, or each spending more?** The growth split, on one basis.
4. **For a shock, its shape week by week**: how deep, and how many weeks.

## The one rule of geography in this module

**Card spend for a metro area is what its residents spent, wherever they spent it**: online, out of town,
anywhere. It is never the area's sales, its businesses' revenue, or visitors' spending. Every chart says
*residents of the metro area* (`setup-location.md`, "What this subject cannot see").

## Before anything

- **Have the setup**: the metro-area node, the comparison metro areas with how they were chosen, the kind
  of run and, for an event run, the event dates with sources.
- **Re-survey live** which routes return rows for the subject. Read accepted resolutions off the response.
- **For a venue run** (`venue-report`), the place is the venue's ZIP and each comparison venue's ZIP, and
  the setup is `setup-venue.md` with `instruments/venue-instruments.md`: the route is the ZIP node, and the
  comparisons are the venue groups, not metro areas. Floors and checks apply unchanged; a group left
  with fewer than three ZIPs after the floor is shown beside the others, never in a headline.

## Run order

**1. Total spending and purchases.** Spend (626) and transactions (627) on the metro-area node for the
subject and each comparison metro area, plus the US node (`country`, `location_resolution: "us"`) as the
baseline, monthly over the window. Sum any online / in-person split first.

**2. The same-cardholder check.** Constant Shopper spend (765) on the same nodes, passing
`location_resolution: "cbsa"`. If its gap does not move with the full panel's, panel churn is in the
trend; say so and lead with the same-cardholder series.

**3. The growth split** (trend runs, and any question about more people versus more spending). Split
residents' spending growth into **more cardholders** and **spending per cardholder**, on one basis:
in-person spend (626), transactions (627) and cardholders (628), each filtered
`transaction_method: ["Physical"]`. Cardholder counts come split into online and in-person and cannot be
added across the split, so totals are never used here.

**Cardholder counts are read for direction only.** The panel's cardholder count changes with the panel's
coverage before it changes with population. Set the cardholder gap beside the Census population gap for
the same metro areas (side by side, never divided): if the order of metro areas agrees, say which grew
faster; never say how many people arrived.

**4. The shock, weekly** (event runs only). The subject's weekly spend divided by one nearby comparison
metro area's, indexed to the full weeks before the event, with the normal week-to-week swing of that
ratio stated. Drop the first and last week.

**5. Gaps and decomposition** for every series: the gap, then the event-run normal range or the trend-run
consistency and direction, then the leave-one-out on comparison metro areas, and the windows each claim
covers (`setup-location.md`, "The gap and the normal range").

## Gates that bite here

**Normal range first** (event runs) and **consistency first** (trend runs): no gap is called a change until
it clears its test. **Never compare dollar levels** across metro areas. **Never divide across sources**:
purchases, average purchase and spending per cardholder come from one panel; nothing here is divided by
foot traffic, permits or population. **Sum the method split** before any ratio, except for cardholders,
which use the in-person filter (`data-state.md`).

## What this module will not say

- **Not the area's sales or its businesses' revenue**, and not visitors' spending.
- **Not how many people moved in.** Cardholder counts give direction only.
- **Not why** residents spent as they did, beyond naming the event it lines up with. "Consistent with
  repair buying" is allowed; "because homes were damaged" needs a source.
- **Not a rise inside the normal range**, or a lead that is ahead in only about half the months.
  "Held level" or "kept pace" is the finding.

## The evidence

The charts below are the proven default for this tab (from the place pilots). Replace or add to them when
another form shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit").

1. **Event run, the weekly shock**: one line, the indexed ratio, with the event marked and the normal swing
   in the subcaption.
2. **The gap over time**: event run, spending and purchases as two monthly lines with the event marked;
   trend run, the gap to each comparison group as two quarterly lines.
3. **The purchase table** around the event, or for a trend run **the growth-split table**: each measure's
   gap to each group with the share of months ahead.
4. **Trend run, the published context**: population and jobs by metro area beside the panel, marked as
   public data.

## If this module is run on its own

- **Phase 1a not done** → the place's counties, the event and its dates (or, for a trend run, the
  published growth ranking), the comparison metro areas, and any published local figure on residents'
  spending, population or jobs. Nothing else.
- **Before writing the tab's copy, run Phase 1b**: for each claim, the one published figure it is exposed
  to, retrieved, and the claim dropped or reframed if the panel contradicts it.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
