---
name: loc-venue
description: "Use this skill when someone wants to know how a venue's own ticket market is doing: resale price per ticket, tickets and events at an arena, stadium or theater against comparable venues, which shows and games drive it, whether event days show up in visits to the blocks around it, and who its tenants' ticket buyers also buy for. Every ticket figure is resale; it never measures attendance or sell-outs. For a full report on a venue, use this package's venue report."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Venue: how is its ticket market doing, and what drives it?

Invoke **`ca-core`** first and follow it throughout. The subject is a **venue**, so the setup is
**`ca-core/references/setup-venue.md`**, with **`ca-core/references/instruments/venue-instruments.md`**.
Read both, and `carbonarc-mcp` Part A on event-as-entity pulls, before pulling. This file is the run order.

---

## What it answers

1. **Is the venue's resale market moving with comparable venues**: price per ticket, tickets, events and
   tickets per event?
2. **Which shows and games drive it**: the acts and matchups behind its months, the same act here against
   its other US shows, and a tenant's home games against its away games and postseason.
3. **Do event days show up in the blocks around it**?
4. **Who do its tenants' buyers also buy tickets for**?

## The one rule of this module

**Every ticket figure is resale, and only gaps between venues are read.** Resale sees the aftermarket,
never the house: no attendance, sell-outs, face value or demand. Resale volume moves at every venue when the
exchange's own volume moves, so a venue's ticket count is never read on its own. Price per ticket is
order value ÷ tickets from the same panel.

## Before anything

- **Have the setup**: the venue, its ZIP, its tenants' nodes, both comparison groups and the ring, the
  public schedules for the tenants, and the published figure for the external level check.
- **Confirm the resale panel is live** (`venue-instruments.md`), and read the event categories' ids and
  labels from `get_events_from_insight` before any event-level row is written.

## Run order

**1. Series probe and ticket floor**: tickets sold by location (651), every venue, quarterly, the full
window. Set the ticket floor where small quarters start to swing the group average; print it.

**2. The market against comparable venues**: tickets, order value and events (651, 644, 656), every venue,
quarterly. Gaps to each group in price per ticket, tickets, events and tickets per event, each with
consistency, direction and leave-one-out (`setup-venue.md`). Monthly for the subject and one group B venue only when a dated candidate needs it. If the event mix
decides the quarter (`setup-venue.md`, "Event mix"), read price in steps 3 and 4 and keep these totals for
the method tab.

**3. Which shows drive it**: concerts at the venue (event as entity, the concert category); then, for the same act elsewhere, the
venue's acts passed as their own parent events with no entity (all US), a few acts per call so each stays
inside pull-sizing. A whole-category US pull runs to thousands of rows. Then:
- the acts with the most resale order value at the venue;
- **the same act here against its other US shows**: the ratio of its price per ticket here to elsewhere,
  for acts with enough resale tickets on both sides (print the threshold), as a median with the share of
  acts higher here. An act with no other US shows (a residency) is left out and named;
- the venue's average resale price change against the US average, same months.

**4. A tenant's games**, when the reader named a tenant: regular-season games (the sports-matchup category, filed under the home team) for home against away price
per ticket where an away route returns rows (the by-team series holds home games only; an all-US matchup
pull is sized first), and postseason games (in the sports-matchup category named by round, or as industry parent events, one
per round: check both) matched to the public schedule by date. Drop games scheduled but not played.
Average ticket is order value ÷ tickets, with tickets printed beside it.

**5. The nesting check**: for each month with event-level rows, concert and game rows summed against the
by-location series (`venue-instruments.md`, "Event rows: shared rules"). Record the result on the method tab.

**6. Event days**: daily visits per location (45862 ÷ 45863) in the venue's ZIP, days with an event at the
venue (from the event count) against the same weekday without one within four weeks. State the daily
swing; a difference inside it is **no detectable effect**, which is a finding. A split (by weekday, by kind
of event) is shown only with its day counts and standard error, and claimed only where it clears the swing.

**7. Who its buyers also buy for**: ticket-buyer overlap on each tenant's node, pooled over years, ranked,
shared-shopper counts printed. No trend.

## Gates that bite here

**The ticket floor before every gap.** **Consistency and leave-one-out with every average.** **Every date
behind a claim checked against a public schedule.** **The nesting check before any mix.**

## What this module will not say

- **Not attendance, sell-outs, face value, primary sales, or demand.**
- **Not that the venue sold more or fewer tickets**, only how its resale gap to comparable venues moved.
- **Not a size claim from foot traffic**, and not that events lift spending around the venue (card is
  located at the cardholder's home).
- **Not the venue's own buyers' wider habits**: overlap is reached through its tenants.


## The evidence

The default for each tab (from the arena pilot); another form may serve better (`carbon-arc-report-v2`,
"Beyond the default kit").

- **Ticket market**: the quarterly gap in price per ticket to each group, zero line, consistency in the
  subcaption; KPI tiles for the average gap, quarters ahead and the ticket floor.
- **Which shows drive it**: top acts by resale order value; the same-act ratio as a ranked bar with the
  median line; for a tenant, home against away and the postseason rounds with tickets beside every average.
- **Event days**: the event-day and same-weekday differences against the daily swing.
- **Who it draws**: the overlap rank, counts printed on every bar.

## If this module is run on its own

- **Phase 1a not done** → the venue's address and ZIP, capacity, tenants, comparable venues, tenants'
  schedules, and the published figure for the external level check.
- **Before writing the tab's copy, run Phase 1b**: each claim against the one published figure it is
  exposed to.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the venue report: the tabs above. Run
`verify_report.py` and `verify_build.py` before shipping.
