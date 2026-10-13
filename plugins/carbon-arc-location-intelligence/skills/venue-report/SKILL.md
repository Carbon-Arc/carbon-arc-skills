---
name: venue-report
description: "Use this skill when someone wants a report on a venue: how an arena, stadium, theater or convention center's ticket market is doing against comparable venues, which shows and games drive it, what its events do to the blocks around it, and who its crowds also buy tickets for. It reads resale tickets at the venue, and foot traffic and residents' spending in its ZIP code. Not for a metro area's economy: that is location-report. Not for a musician's or actor's own fans: that is Carbon Arc Talent Intelligence."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Venue report

The orchestrator. Runs the venue modules once each and assembles them into one report on a venue, for the
team that runs it or books it.

**Three steps, in this order, before Phase 0 and before anything else:**

1. Invoke **`ca-core`**, and follow it throughout.
2. Read **`ca-core/references/readers/corporate.md`** and record `reader: corporate` (ca-core §1). The
   venue's operator holds its own box office; every module points outward from it.
3. Read **`ca-core/references/setup-venue.md`** and
   **`ca-core/references/instruments/venue-instruments.md`**, the subject setup.

**Modules this report runs:** `loc-venue` · `loc-places` · `loc-residents`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this report.

**Tabs:** Summary · one tab per question below that found something publishable · Sources & method. Three
to five charts per tab, eight the ceiling. **Three honest tabs beat six padded ones.**

**The order of work.** This skill resolves the venue, chooses the comparable venues, probes and runs
Gate 1. It writes **no pull rows itself**: every row in the Gate 2 pull list comes from a module, written
after that module was invoked (Phase 3).

---

## Before Phase 0: is this the right report?

- **The subject is a metro area, city or region** → this is `location-report`, not this report. Say so in
  one line and hand over; run nothing here.
- **The subject is a musician's or actor's own fans or tour** → Carbon Arc Talent Intelligence covers it
  (`ca-core` §7). Run nothing.
- **The subject is the operating company's own performance** (its revenue, its stock) → Carbon Arc Company
  Intelligence covers it. Run nothing.
- **The subject is a venue** (an arena, stadium, theater or convention center) → continue.
- **The reader asks for one question directly** ("just which shows drive it") → that module runs on its own
  and builds a Brief (`ca-core` §8).

## Phase 0: the venue and the question

1. **Get the frame in one message**, asking only for what the request did not give: the venue, the question
   (how its market is doing, or a dated change such as a renovation, a new tenant or a residency ending), and
   which of its tenants (teams, residencies) matter to the reader.
2. **Record the kind of run**: an event run or a trend run (`setup-venue.md`).
3. **Resolve the venue, its ZIP code, and its tenants' team or artist nodes** (`setup-venue.md`, "Resolve
   the venue"), and survey what attaches to each (`venue-instruments.md`). Free calls only.
4. **Record the setup** per `ca-core` §2 and `setup-venue.md`, in the conversation.

## Phase 1a: research, before any pull

Only these, every one web-verified with a source URL, nothing from training data:

1. **The venue's street address and ZIP code, capacity, and tenants**, from a public source; any rename in
   the window.
2. **The comparable venues' capacity and tenants**, for the comparison rule.
3. **A published figure for the external level check**: a year-end venue ranking (shows, tickets or gross
   for a stated tracking period), or the operator's own filing where it reports the venue alone. If neither
   is reachable, count the venue's events from public schedules for one stated period, and say so. If no
   claim rests on the event count, record that the check was not needed.
4. **The tenants' schedules for the window**: home dates, and for playoff or postseason games which were
   played and which were scheduled but not played.
5. **Candidate events across the five families** (`ca-core` §3), each with a predicted observable: a
   residency starting or ending, a playoff run, a renovation, a change in how people reach the area.

**Phase 0 to Gate 1 is one stretch, with no stop in between** once the frame is in hand. "Approve each
step" means `gates: on`: the four gates, and nothing more.

## Phase 2: comparable venues, shown before anything is measured

Choose the two groups and the ring by `setup-venue.md`, "Choose comparable venues", and show them with one
line each on why, **and the venues left out and why**.

**The feasibility probe** (the one billed call before Gate 1): resale tickets sold by location on the subject
and comparison venue nodes, `date_resolution: "month"`, `location_resolution: "venue"`, from the first day
of the month three months back to today. A venue node accepts only `venue`, so this replaces the standard
`us` shape (`carbonarc-mcp`, the probe rule). Before it, check in `data_library` that the resale dataset is
still updating (`venue-instruments.md`).

Then **Gate 1**, once, for the whole report (`carbonarc-mcp`): the venue, its ZIP and its tenants, the kind
of run, the two comparison groups and the ring, the datasets and which side each sees, grain and window,
the published figure for the external level check, what the question needs that the data cannot see, and
the candidate events. No pull list yet.

## Phase 3: run the modules

| | Module | Tab question (phrase it for the venue in front of you) |
|---|---|---|
| 1 | `loc-venue` | How is the venue's ticket market doing against similar venues? |
| 2 | `loc-venue` | Which shows and games drive it? |
| 3 | `loc-places` (the venue's ZIP) + `loc-venue` (event days) | Do its events show up in the blocks around it? |
| 4 | `loc-residents` (the venue's ZIP) | How are the people who live nearby spending? |
| 5 | `loc-venue` | Who do its crowds also buy tickets for? |

`loc-venue` runs first: its event days are the dates the places tab is read against. A tenant's games can
take a tab of their own when the reader named that tenant (`loc-venue`, step 4).

### The loop: each module writes its own rows

1. **Invoke the module.** It opens by invoking `ca-core`, already loaded, so that is a no-op.
2. **Read every file its opening lines and "Before anything" name.** For `loc-places` and `loc-residents`,
   the place is the venue's ZIP and each comparison venue's ZIP (`setup-venue.md`).
3. **Write its Gate 2 rows** from its run order, filling **Method from** with the step or file section
   each row comes from. Series probes come first in each module's group.
4. Next module.

Then present the whole list once at Gate 2, run the pulls, and clear Gates 3 and 4 once over all of them.
When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using any
series. **At build, before each tab, re-read that module's "The evidence" section.**

A long pull list can run in the background, paced to the rate limit, as long as every call is exactly the
approved row: the gates are not skipped by delegating the calls.

### At Gate 3

Per series: its size against the ticket floor or the card floor, its consistency, the external level check
for the venue's event count, and the verdict (keep, relative only, or drop).

### At Gate 4, before the findings table is shown

Check every row for:
- **Consistency and direction** reported with every average gap.
- **Survives leave-one-out** on each comparison group.
- **Names its side** (the venue, the blocks around it, residents nearby, or buyers).
- **Every date that carries a claim is checked against a public schedule**: a scheduled game that was not
  played (an if-necessary playoff date) or a canceled show can still carry resale sales and an event count.
  Drop both.

## Phase 4: the Summary, written last

A written note, not an index: the verdict sentence, then one block per tab with the claim, two short
paragraphs and the single chart that proves it. Lead with where the venue's own market and the blocks
around it disagree, when they do.

## Phase 5: build and verify

Per `ca-core` §8 and `references/build-notes.md`. Then, without exception:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-location-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <report>.html
python3 "$CA/verify_build.py"  <report>.html
```

Both must pass. Walk every tab in a browser with every section visible, at desktop and phone width: no
empty mounts, no label collisions, no chart overflowing its card, no sideways scroll, fonts loaded.

## Tabs ask, headlines answer

Every tab label is a question the venue's team would ask. Every headline is a claim that answers it. Labels
live in three places (sidebar, `data-screen-label`, the Summary cross-link) and all three must match.
