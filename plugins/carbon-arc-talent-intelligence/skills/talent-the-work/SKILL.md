---
name: talent-the-work
description: "Use this skill when someone wants to know which of an actor's titles, or a musician's albums, carry them and which hold up: box office per title, how streaming holds over time, whether a new project or re-release revived the back catalog, which audiences each title draws, and what else the same viewers watch, even if they only ask which films worked. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Validated on one actor pilot. Treat every verdict as lightly validated."
---

# The work: which titles carry me, and which hold?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-screen.md`** (read it before the first pull).

**Often the strongest pages in an actor brief.** A person-level series is an aggregate that hides
composition and inherits every defect in every title. Titles are where the analysis lives, and where the
defects get caught.

## Before anything

1. **Filmography from a web search**, never from training data: every title, year and format.
2. **Resolve each title** as a `title` entity, checking for near-name collisions.
3. **Coverage grid** (`ca-core` gate 7): every title on box office, streaming views, cohort index and
   cross-viewing. **One empty pull is not evidence of no data**; test each title on each instrument.

## Run order

1. **Box office per title** (263 / 264 / 26), yearly. **External check before quoting any level**
   (`ca-core` gate 8): one published gross per title where you quote its level. Out of family is an
   error; a missing major title makes the asset a partial sample. Say which.
2. **Streaming views per title** (310), quarterly, in both normalizations: calendar time (what is watched
   now) and peak-aligned (what holds). Never align on streaming debut.
3. **Defect sweep** on every sharp move (`ca-core` gate 9). A title falling while its closest sibling is
   flat is an attribution break until proven otherwise; so is a tentpole settling below an old catalog
   title.
4. **Catalog reactivation**: where a new release or re-release lines up with older titles rising, check
   it on two instruments (streaming and box office) before leading with it.
5. **Cohort index per title**, Generation first, then any representation that survives the coverage test.
6. **Cross-viewing** (192715 / 192716) with the mandatory `country` filter: which titles share this
   work's viewers, gated on shared views. This is also the derived comparison the actor peer band lacks.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Box office by title**, ranked, with published-figure checks noted and missing titles flagged.
2. **Streaming by title in calendar time**, stacked or small multiples, to show composition.
3. **Peak-aligned retention**, one line per title.
4. *(optional)* **Generation index by title** and **the titles viewers also watch**.

## What this module will not say

A level that failed its external check. That a title underperformed when the asset simply lacks it. That
a sharp move is real before the sibling and floor tests have run. Anything about fees, backend or
residuals, which no dataset carries.

## If this module is run on its own

Run Phase 1a for talent from `setup-talent.md` first (the filmography is part of it).

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
