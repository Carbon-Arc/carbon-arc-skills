---
name: loc-building
description: "Use this skill when someone wants to know how much is being built or repaired in a metro area and whether it is more than usual: building permits by type (re-roofing, demolition, new construction and others) against the place's own history, how large a rebuild after a shock was and how long it lasted. It reads permit records, which count filings, not homes. For residents' spending at home-improvement stores, use loc-residents. For a full report on a place, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Building: how much is being built or repaired, against usual?

Invoke **`ca-core`** first and follow it throughout. The subject is a **place**, so the setup is
**`ca-core/references/setup-location.md`**, with **`ca-core/references/instruments/metro-instruments.md`**.
This file is the run order.

---

## What it answers

1. **Is permit activity of a given type above or below the place's own usual pace**, and since when?
2. **For a shock: how large was the repair or rebuild, and how long did it last?**
3. **Which kinds of work moved** (re-roofing, demolition, new construction, additions), where each
   passes its checks.

## The one rule of this module

**Each place is compared only with its own history.** Permit records count filings, coverage differs by
county and changes over time, and recent quarters fill in slowly. So the statistic is an **index of a
place's quarterly permit records to its own baseline** (an event run: the four quarters before the event;
a trend run: the first year of the window), never a count compared across places.

## Before anything

- **Have the setup**: the metro area, the comparison metro areas, the kind of run and the event dates.
- **Re-survey live**: the `permit_classifier` values for the subject (`get_filter_options`), and which
  comparison metro areas have permit records at all. A comparison metro area with almost no records is
  dropped from this tab and named.

## Run order

**1. The Census check, before any permit record is used.** Retrieve the Census building-permits series
for the subject and each comparison metro area (published monthly by metro area; FRED carries it). Compare
the direction of each place's permit records against Census over the same window. **If they disagree in
direction for the subject, the permit records are not used**: the tab reads the published Census permits
instead, marked as public data, with the same own-history index. If Census is unavailable for a place, say
its permit trend is untested.

**2. Permit count** (308) on the metro-area nodes, quarterly, filtered to the types the question needs,
every metro area, two per pull.

**3. Drop the latest incomplete quarter** and say that the next most recent may still be filling.

**4. The index** to each place's own baseline, and for an event run **the multiple** in the first quarters
after the event (average of those quarters ÷ baseline average), the subject beside each comparison metro
area.

**5. Coverage check**: a type rising steadily in every place from the start of the window (new
construction did on the pilot) is coverage growth, not building. Drop it and say why.

## Gates that bite here

**Own history only.** **Partial quarters out.** **A comparison metro area that moves as much as the
subject in a later year ends the clean comparison**: describe that year, do not measure it.

## What this module will not say

- **Not homes, projects or dollars of construction.** Permit records only.
- **Not a count compared across places.**
- **Not the second year of a rebuild** when a comparison metro area also climbed that year.

## The evidence

The default for this tab (from the place pilot); another form may serve better (`carbon-arc-report-v2`,
"Beyond the default kit").

1. **The index by quarter**, one line per metro area with records, baseline = 100 as the reference line,
   the first quarter after the event marked.
2. **The multiple** in the first quarters after the event, as bars, subject against comparisons.

## If this module is run on its own

- **Phase 1a not done** → the place, the event and its dates, and any published local figure on permits
  issued or repair activity.
- **Before writing the tab's copy, run Phase 1b**: each claim against the one published figure it is
  exposed to.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
