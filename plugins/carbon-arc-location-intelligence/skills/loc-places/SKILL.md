---
name: loc-places
description: "Use this skill when someone wants to know whether people are coming to the places in a metro area: visits to its hotels, restaurants, stores and attractions against comparable metro areas, and how long a slump after a shock such as a storm lasted. It reads foot traffic as visits per location, which also sees visitors, and tests it against a published local figure such as lodging tax before it says anything about size. It does not read spending: for what residents spend, use loc-residents. For a full report on a metro area, use location-report; on a venue, venue-report."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Places: are people coming, and how long did a slump last?

Invoke **`ca-core`** first and follow it throughout. The subject is a **place**, so the setup is
**`ca-core/references/setup-location.md`**, with **`ca-core/references/instruments/metro-instruments.md`**.
Read both, and `carbonarc-mcp`'s `references/data-state.md` on foot traffic, before pulling. This file is
the run order.

---

## What it answers

1. **Are visits to the area's locations moving with comparable metro areas**, ahead, or behind?
2. **For a shock: when did visits drop, and how many months until they were back** inside their normal
   range?
3. **Which kinds of place recovered first** (lodging, restaurants, retail), where each passes its checks.

## The one rule of this module

**Foot traffic is shown only as visits per location, and reads timing until it passes the external level
check.** Visits are divided by the store count from the same pull family; raw visits never appear. Size
claims ("visits fell 12%") need a published figure for the same place and months that the series matches
(`setup-location.md`, "The external level check"). Until then every claim is about *when* and *how long*.

## Before anything

- **Have the setup**: the metro area, the comparison metro areas, the kind of run, the event dates, and the
  published local figures retrieved for the external level check.
- **Re-survey live**: foot traffic is reached through a category entity filtered by `cbsa_name`, not the
  metro-area node. Confirm with one returned row per category before promising a tab
  (`metro-instruments.md`).
- **For a venue run** (`venue-report`), the place is the venue's ZIP and each comparison venue's ZIP, and
  the setup is `setup-venue.md` with `instruments/venue-instruments.md`: the route is the ZIP node, and the
  comparisons are the venue groups, not metro areas. Floors and checks apply unchanged.

## Run order

**1. Series probe**: visits (45862, `sum`) for each candidate category, subject only, a few recent months.
A category with no rows for the subject is dropped and named.

**2. Visits and store count** (45863, `mean`) for each surviving category, every metro area, monthly, two
metro areas per pull.

**3. Visits per location**, then the gap to comparable metro areas and its normal range
(`setup-location.md`).

**4. The external level check**: the published local figures beside visits per location for the same
months, in a table, **with the correlation of the two year-over-year series by quarter**. Record the
verdict: size and timing, timing only, or drop.

**5. How long**: for an event run, the months from the event until the gap is back inside its normal range,
counted month by month (a month back inside the range in the middle of a run is said, not hidden).

**If the check fails on direction, the tab is built from the published figures instead**, as Census
permits replace permit records in `loc-building`: the tourism authority's monthly counts (visitors, room
nights, air passengers, gaming or lodging tax), and BLS leisure and hospitality jobs for the subject and
every comparison metro area. Every chart is marked as public data. The failed check goes on the method
page as a table, never in the tab. *(On the visitor-economy pilot, visits per hotel location fell 4% to 5%
in a year when visitors rose 3% to 4%, and visits per casino location rose while visitors fell 8% to 9%;
the tab was built from the published counts and jobs.)*

## Gates that bite here

**Store count with every visit figure.** **Normal range first.** **The external level check before any
size claim.** **Closures are not visible**: the location list does not drop a closed place, so a "no
change in locations" reading is never evidence that nothing closed.

## What this module will not say

- **Not spending**, and not "the local economy". Visits are visits.
- **Not size, until the external level check passes.**
- **Not that a place closed or reopened** from the store count.

## The evidence

The default for this tab (from the place pilot); another form may serve better (`carbon-arc-report-v2`,
"Beyond the default kit").

1. **The monthly gap in visits per location**, one line per kind of place (two or three), zero line, event
   marked, normal ranges in the subcaption.
2. **The external level check** as a table: period, published figure, published change, visits per
   location.
3. KPI tiles: the worst month, the months below the normal range, the location count over the window.

## If this module is run on its own

- **Phase 1a not done** → the place, the event and its dates, the comparison metro areas, and the
  published local figures (lodging tax, hotel occupancy, sales tax) for the external level check.
- **Before writing the tab's copy, run Phase 1b**: each claim against the one published figure it is
  exposed to.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
