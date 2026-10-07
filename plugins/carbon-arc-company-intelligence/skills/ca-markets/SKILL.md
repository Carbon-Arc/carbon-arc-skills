---
name: ca-markets
description: "Use this skill when a small or regional business wants to know which markets are recovering first in its category, how its own markets compare with the rest of the country, or where demand is strong relative to the stores already serving it. It ranks states and metro areas on the category's demand, its recovery and the signals that tend to lead it, such as vehicle registrations or local wages, and shows where demand outruns supply. It does not choose a site or forecast a store's sales, and it is not for a yes-or-no decision such as whether to open another location: it ranks markets, the business decides. For a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Markets: which markets are coming back first, and where is there room?

Invoke **`ca-core`** first and follow it throughout. The subject is a **category in a set of markets**, so
the setup is **`ca-core/references/setup-category.md`**. Method in
**`ca-core/references/instruments/category-markets.md`**; read it before pulling. This file is the run
order.

---

## What it answers

1. **Which markets are recovering first** in the business's category, and are the business's own markets
   ahead of or behind the country?
2. **What is moving ahead of recovery** in those markets: the signals that tend to lead big-ticket demand
   and that the panel resolves at the same grain.
3. **Where demand is strong relative to the stores serving it**: the read a business owner brings to a
   location decision, without making the decision.

## The one rule of geography in this module

**Card spend by geography is where the shopper lives, not where the store is.** A metro's category
spend is what that metro's residents spent in the category, wherever they spent it. That makes it the
right read of **demand in a market** and the wrong read of any store's sales. Every chart in this module
says *shoppers living in*, and no figure is ever described as a store's or a trade area's sales
(`category-markets.md`, "Resident demand").

## Before anything

- **Have the setup**: the category entities, the business's markets from Phase 0, the comparison set.
- **Re-survey live** and read which `location_resolution` values each instrument accepts on the category
  node **from the response**, not from a file. Do not assume metro-level or ZIP-level coverage.
- **The market list is shown before anything is measured** (`ca-core` gate 11): the business's markets,
  the comparison markets, and how both were chosen.

## Run order

**1. Category demand by market.** Spend (626) and transactions (627) on the category node at the finest
geography that clears the volume floor (state first; metro where it resolves and clears), monthly, from
36 months before the latest settled month. The business's markets plus the full set for ranking.

**2. Recovery, defined before it is measured.** For each market: the trough (the lowest trailing
three-month year-over-year in the window), the latest trailing three-month year-over-year, and the
two-year stack on the latest period. A market is **recovering** only when the latest reading clears the
detection floor above its trough **and** the two-year stack is no longer negative (`gating.md` §6). Rank
on the latest reading; show the trough beside it.

**3. Leading signals, where the panel resolves them at the same geography.** The candidates and their
recipes are in `category-markets.md`, "Signals that lead": vehicle registrations for auto categories,
local wage growth, hiring in the category's trades, and housing turnover only where an executable
instrument exists. **Each is read as its own rank, never divided into card spend** (`ca-core` gate 10),
and each is a candidate with a predicted observable, not an assumed driver.

**4. Demand against supply.** Each market's category share of its own wallet and its growth
(`category-markets.md`, "A market's share of its own wallet"), ranked, beside a supply measure that the
same market resolves: the count of category locations from a foot traffic or
places instrument, or the named members' store counts from Phase 1a research. **Two ranks side by side,
never a ratio of the two** (`category-markets.md`, "Demand against supply").

## The evidence

The charts below are the proven default. Replace them when another form shows the finding better; what
each says the chart must show still holds.

1. **Recovery map or ranked bars**: latest trailing three-month year-over-year by market, trough marked,
   the business's markets highlighted, the national line as the reference. *(lead)*
2. **The business's markets against the country**, monthly, as lines. Sequential data is a line.
3. **The leading signal against category demand**, one market group per chart, two panels or two
   axes clearly labelled, never a ratio.
4. **Demand rank against supply rank**, a scatter or paired ranks, with the markets where demand ranks
   well above supply named. Caption: *shoppers living in each market; not a site recommendation*.

## A local claim needs the parent's ratio beside it

**"This market is different" is only a finding when the parent geography is not different in the same
way.** Before writing that a market leans toward a product, a price point or a vehicle type, compute the
same ratio for the state (or the market that contains it), on the same months, from the same pull family,
and show both. If the parent's ratio is within the noise of the local one, the finding is the state's, not
the market's, and it is dropped from the local tab.

Compare like windows only: the same months in every year, never a full year against a year to date.
*(Oct 2026, on the home-and-auto pilot: a "this city leans EV" claim reached the findings review comparing
full-year counts with a partial year; on matching months the state's ratio was the same, and the claim
was dropped.)*

## Gates that bite here

The **volume gate** on every market ranked, `n` printed; markets under the floor are named as too thin,
not dropped silently. **Completeness** on the latest months. A **pre-period is not a control**:
a market's recovery is read against the country over the same months, not against its own past alone.
**Never divide across sources**, which rules out spend per store, spend per permit or spend per
registration whenever the two come from different instruments.

## What this module will not say

- **Not a site recommendation, a sales forecast for a store, or a trade-area estimate.** It ranks
  markets on observable demand; the owner decides.
- **Not a store's or trade area's sales.** Resident demand only.
- **Not that a leading signal causes recovery.** A signal that moved first is reported as having moved
  first.

## If this module is run on its own

- **Phase 1a not done** → the business's markets and store footprint, named rivals' store counts in those
  markets, candidate events by market (storms, plant openings or closures, incentive changes). Nothing
  else.
- **Before writing the tab's copy, run Phase 1b**: for each claim, the one published figure it is exposed
  to (a state or metro statistic on the same quantity), retrieved, and the claim dropped or reframed if
  the panel contradicts it.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
