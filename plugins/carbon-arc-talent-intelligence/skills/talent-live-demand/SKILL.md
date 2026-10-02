---
name: talent-live-demand
description: "Use this skill when someone wants to know about a touring musician's live demand: what fans pay on the resale market, which markets have a fan base big enough to play, and how their live draw compares with their peers, even if they only ask where to tour. It uses resale prices and volumes where the data is deep enough, and says plainly that no available data shows how many tickets a show sold. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Validated on an arena-scale pilot. On a mid-tier pilot the panels were too thin and the tab was correctly cut."
---

# Live demand: what will the market pay, and where?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-music.md`**.

## The limit that opens and closes this module

**No reachable dataset measures whether a show sold.** Every ticket figure here is **resale**: it sees
the aftermarket, never the house. The tab can say what the resale market paid and where; it cannot call a
market strong or soft in absolute terms, and resale volume never stands in for demand. State it on the
tab and name the venue census as a known gap in Sources & method.

## Gate before anything: the thickness test

Run the two ticket rows of the thickness test in `setup-talent.md` **first**, and cut the tab if either
fails. Below arena scale it usually does. Cutting is the correct outcome.

- **Volume**: resale tickets per period. Single or low-double digits kills the tab.
- **Continuity**: which periods return rows. The panels only see touring periods, so a touring artist can
  have two populated windows in five years. That is a **tour comparison**, never a trend line; never draw
  a series across an empty gap.

## Run order

1. **Enumerate the live assets** (`ca-core` gate 6): `data_library` on "secondary ticket" and "box
   office", reachable versus out of reach.
2. **Thick resale panel by DMA** (652 tickets, 658 events, 646 order value) for the subject over each
   tour window.
3. **Same cut from the thin panel**, and compare totals and rank order (`gating.md` §9). If the ranks
   disagree, say so; only the thick panel supports a ranking.
4. **Days to event.** Forward-looking volume accumulates toward each date. Normalize every market by days
   to event before ranking, or drop the ranking.
5. **Band price levels** for the same windows, as the only meaningful scale for a resale price.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Resale price and volume per tour window**, subject against the band, volume shown alongside every
   price.
2. **Markets ranked on the normalized measure**, with `n` per market, only if step 4 was done.

## What this module will not say

That a show sold out or did not. That resale is face value. That a premium exists over a face price it
cannot see. That a market is strong because it has more resale volume. Any routing advice.

## If this module is run on its own

Run `talent-peer-set` first; prices mean nothing without the band beside them.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
