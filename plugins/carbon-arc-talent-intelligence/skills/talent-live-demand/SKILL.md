---
name: talent-live-demand
description: "Use this skill when someone wants to know about a touring musician's live demand: what fans pay on the resale market, which shows, venues and markets drive it, how each tour compares with the last, and how their live draw compares with their peers, even if they only ask where to tour. It reads resale prices and volumes tour by tour and show by show where the data is deep enough, and says plainly that no available data shows how many tickets a show sold. Not for a venue's own ticket market (which shows drive an arena's or amphitheater's resale): that is Carbon Arc Location Intelligence. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Live demand: what will the market pay, and which shows and markets drive it?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-music.md`**, and the event-row rules in `carbonarc-mcp`
`references/event-rows.md`. Read all three, and `carbonarc-mcp` Part A on event-as-entity pulls, before
pulling. **Musicians only**: an actor has no live tab.

## The limit that opens and closes this module

**No reachable dataset measures whether a show sold.** Every ticket figure here is **resale**: it sees
the aftermarket, never the house. The tab can say what the resale market paid, at which shows and in
which markets; it cannot call a market strong or soft in absolute terms, and resale volume never stands
in for demand. State it on the tab and name the venue census as a known gap in Sources & method.

## Gate before anything: the thickness test

Run the two ticket rows of the thickness test in `setup-talent.md` **first**, on the **live** by-artist
series (`talent-music.md`, "Live music"), and cut the tab if either fails. Below arena scale it usually
does. Cutting is the correct outcome.

- **Volume**: resale tickets per period. Single or low-double digits kills the tab.
- **Continuity**: which periods return rows. The series only sees touring periods, so a touring artist
  can have two populated windows in five years. That is a **tour comparison**, never a trend line; never
  draw a series across an empty gap.

## Run order

1. **Confirm the panels are live** (`talent-music.md`, "Live music"): read each resale tearsheet in
   `data_library`. A frozen panel is history only, never the spine.
2. **Tour over tour**: the live by-artist series (tickets and order value), US, by month, over every tour
   window. Price per resale ticket = order value ÷ tickets, both from that series.
3. **Show rows**: first confirm coverage (`event-rows.md`, "Finding an act's parent events"): rows for
   at least one published date, by the artist node with the concert category, then the artist's parent
   event ids, then one venue call on a published date. Then pull one row per show, by market, tickets and
   order value, past shows only. **If coverage is zero**, skip steps 4–6 and 7's venue comparison, say so
   in the method notes, and read markets from the by-artist series instead (step 7).
4. **The schedule match** (`event-rows.md`): every row against the published US tour dates from Phase
   1a. Drop rows with no published date; take the venue name from the published list; state coverage as
   "N of M published US shows".
5. **The nesting check** (`event-rows.md`): show rows against the by-artist series, by month of the show.
   If they do not nest, use the show rows for nothing and say so.
6. **Which shows and venues drive it**: the shows with the most resale order value; repeat venues date by
   date; when a tour added dates, the first run against the added dates, pooled, with the city-by-city
   split beside it.
7. **Markets, against a benchmark**: each market's price per resale ticket against the artist's own
   median show, pooled across shows and tours where the market repeats. **Without show rows**, use the
   by-artist series by market (`dma`) per tour window, against the artist's median market for that tour
   (`talent-music.md`, "Live music"). Then two benchmarks:
   - **the peer band** (`talent-peer-set`): the same ratio for each peer in the same market, each against
     its own median show for that tour; the band's level is the median across peers. The artist's
     market reading is its ratio divided by the band's.
   - **other concerts at the same venue**, in the quarters of the artist's shows, as their median price
     per resale ticket. Gate 2 decides which markets get it (about two calls per venue). It needs show
     rows; without them the second check is **a second resale panel's market rank** for the same tour
     (`talent-music.md`, "Live music").

   A market is called above or below only where **every** check agrees in direction; otherwise it is
   level once the market is accounted for. Markets with fewer than 20 of the artist's resale tickets are
   left out and named.

## Gates that bite here

**The floor before every figure**: 20 resale tickets for a show, a market or a date, with tickets printed
beside every price. **Every date behind a claim matched to the published schedule.** **The nesting check
before any show-level claim.** **Two checks before any market is called high or low** (the band, and the venue or a second panel).

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Tour over tour**: price per resale ticket and resale tickets per tour window, as a table or
   separate points, never a line across empty gaps.
2. **Price per resale ticket at each show of the latest tour**, in date order, the median show marked,
   tickets on hover.
3. **The shows that drive it**: top shows by resale order value, tickets printed on every bar; repeat
   venues date by date.
4. **Markets against the peer band**, tickets and peer tours printed on every bar; the venue comparison
   for the markets that had it, with the read ("above on both", "mixed").
5. **Coverage**: published dates with no show row, in Sources & method or the tab, never left out.

## What this module will not say

That a show sold out or did not. That resale is face value. That a premium exists over a face price it
cannot see. That a market is strong because it has more resale volume. That a market is high or low when
the two benchmarks disagree. The artist's total from summed show rows. Any routing advice.

## If this module is run on its own

Run `talent-peer-set` first; prices mean nothing without the band beside them. Phase 1a must include the
published US tour dates for every window read.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
