---
name: location-report
description: "Use this skill when someone wants a report on a place: how a metro area's economy is doing against comparable metro areas, or what a dated shock such as a hurricane, a plant closure or a major opening (a new arena, a factory) did to it, even when they name a city or town rather than the metro area. It reads the place from two sides: what the people who live there spend and on what, and what happens at its locations (visits to its hotels, restaurants and stores, and building and repair permits). Use it for economic development, tourism, chamber or market research questions about a metro area, even if they only ask how their city is doing. Not for a company or brand's own performance: that is Carbon Arc Company Intelligence. Not for a venue's own ticket market or the blocks right around it: that is venue-report."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Place report

The orchestrator. Runs the location modules once each at one-tab depth and assembles them into one report
on a metro area, for an analyst whose subject is the place.

**Three steps, in this order, before Phase 0 and before anything else:**

1. Invoke **`ca-core`**, and follow it throughout.
2. Read **`ca-core/references/readers/place-analyst.md`** and record `reader: place-analyst` (ca-core §1).
3. Read **`ca-core/references/setup-location.md`** and
   **`ca-core/references/instruments/metro-instruments.md`**, the subject setup.

**Modules this report runs:** `loc-residents` · `loc-spending-mix` · `loc-places` · `loc-building`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this report.

**Tabs:** Summary · one tab per module that found something publishable · Sources & method. Three to five
charts per tab, eight the ceiling. **Three honest tabs beat five padded ones.**

**The order of work.** This skill resolves the place, chooses the comparison metro areas, probes and runs
Gate 1. It writes **no pull rows itself**: every row in the Gate 2 pull list comes from a module, written
after that module was invoked (Phase 3).

---

## Before Phase 0: is this the right report?

- **The subject is a company, brand or store's own performance** → this package does not cover it. Say in
  client voice that Carbon Arc Company Intelligence does (`ca-core` §7). Run nothing.
- **The subject is a place** (a metro area, a city, a county, a region) → continue. A county or city is read
  through its metro area unless the reader insists; say which (`setup-location.md`, "Resolve the place").
- **The subject is a venue** (an arena, stadium, theater or convention center) → this is `venue-report`,
  not this report. Say so in one line and hand over; run nothing here.
- **The reader asks for one module directly** ("just residents' spending") → that module runs on its own
  and builds a Brief (`ca-core` §8).

## Phase 0: the place, the kind of run, and the question

1. **Get the frame in one message**, asking only for what the request did not give: the place, the question
   (a dated event, or how the place is doing), and any published local figures the reader holds.
2. **Record the kind of run**: an event run (a dated shock) or a trend run (`setup-location.md`).
3. **Resolve the place** to its metro-area node, and survey what attaches to it (`ontology`) and what
   reaches it through a category or brand filter (`metro-instruments.md`). Free calls only.
4. **Record the setup** per `ca-core` §2 and `setup-location.md`, in the conversation.

## Phase 1a: research, before any pull

Only these, every one web-verified with a source URL, nothing from training data:

1. **The place's counties**, from a public source.
2. **For an event run: the event's dates and its footprint** from a public record (for a disaster, the
   federal declaration's designated counties and their neighbors). This is what excludes comparison metro
   areas.
3. **Published local figures for the external level check**: lodging or sales tax, hotel occupancy or
   demand, visitor counts, permits issued, for the same months the report reads. Metro-area jobs (BLS,
   total and **leisure and hospitality**) and building permits (Census) are published monthly on FRED;
   when a metro area's short series id does not resolve, the long form does
   (`SMU` + state code + metro code + `7000000001` for leisure and hospitality). Population by metro area
   comes from the Census annual estimates. For lodging, occupancy and visitor counts, **look for the
   tourism authority's downloadable monthly table** before reading PDFs or news: news reports of the
   same month disagreed on the pilot.
4. **Candidate events across the five families** (`ca-core` §3), each with a predicted observable: other
   shocks in the window (a second storm, a major closure) that would move the place or a comparison metro
   area.

**Phase 0 to Gate 1 is one stretch, with no stop in between** once the frame is in hand. "Approve each
step" means `gates: on`: the four gates, and nothing more.

## Phase 2: comparison metro areas, shown before anything is measured

Choose three to five comparison metro areas by `setup-location.md`, "Choose comparable metro areas", and
show them with one line each on why, **and the nearby metro areas left out and why**.

**The feasibility probe** (the one billed call before Gate 1): residents' card spend (626) on the subject
and comparison metro-area nodes, `date_resolution: "month"`, `location_resolution: "cbsa"`, from the first
day of the month three months back to today. A metro-area node accepts only `cbsa`, so this replaces the
standard `us` shape (`carbonarc-mcp`, the probe rule). It shows that every place returns rows and where the
data ends.

Then **Gate 1**, once, for the whole report (`carbonarc-mcp`): the place and its counties, the kind of run
and the event, the comparison metro areas and those left out, the datasets and which side each sees, grain
and window, the published figures for the external check, what the question needs that the data cannot see,
and the candidate events. No pull list yet.

## Phase 3: run the modules

In this order, each contributing **one tab**:

| | Module | Tab question (phrase it for the place in front of you) |
|---|---|---|
| 1 | `loc-residents` | How are the people who live here spending? |
| 2 | `loc-spending-mix` | What are residents spending more and less on? |
| 3 | `loc-places` | Are people coming to the places here, and how long did a slump last? |
| 4 | `loc-building` | How much is being built or repaired, and is it more than usual? |

`loc-residents` runs first because its timing is the reference the other tabs are read against.

### The loop: each module writes its own rows

1. **Invoke the module.** It opens by invoking `ca-core`, already loaded, so that is a no-op.
2. **Read every file its opening lines and "Before anything" name.**
3. **Write its Gate 2 rows** from its run order, filling **Method from** with the step or file section
   each row comes from. Series probes come first in each module's group.
4. Next module.

Then present the whole list once at Gate 2, run the pulls, and clear Gates 3 and 4 once over all of them.
When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using any
series. **At build, before each tab, re-read that module's "The evidence" section.**

A long pull list can run in the background, paced to the rate limit, as long as every call is exactly the
approved row: the gates are not skipped by delegating the calls.

### At Gate 3

Per series: its size at metro grain, its normal range, the break check for categories, the external level
check for place-side series, and the verdict (keep, timing only, rebuild as a brand basket, or drop).

A rebuild decided at Gate 3 (a brand basket for a broken category, say) can be approved there in the same
answer, provided Gate 3 names its probe and its rows and their count. It needs no separate Gate 2 stop.

### At Gate 4, before the findings table is shown

Check every row for:
- **Outside its normal range**, or said to be inside it.
- **Survives leave-one-out** on comparison metro areas (and on brands, for a basket).
- **Names its side** (residents or locations), and claims size only where the external level check passed.
- **Windows match**: no rebound month a year after the event inside an average.

When a later step re-bases a figure (for example, permits indexed to a different baseline), the changed
figure goes back to the reader before it ships, with what changed and why.

## Phase 4: the Summary, written last

A written note, not an index: the verdict sentence, then one block per tab with the claim, two short
paragraphs and the single chart that proves it. Lead with where the two sides disagree, when they do.

## Phase 5: build and verify

Per `ca-core` §8 and `references/build-notes.md`. Then, without exception:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-location-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <report>.html
python3 "$CA/verify_build.py"  <report>.html --dataset="Housing Permits"
```

Both must pass. Walk every tab in a browser with every section visible, at desktop and phone width: no
empty mounts, no label collisions, no chart overflowing its card, no sideways scroll, fonts loaded.

## Tabs ask, headlines answer

Every tab label is a question the reader would ask about their place. Every headline is a claim that
answers it. Labels live in three places (sidebar, `data-screen-label`, the Summary cross-link) and all three
must match.
