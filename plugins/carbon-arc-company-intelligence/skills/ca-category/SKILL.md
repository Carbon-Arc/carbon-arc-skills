---
name: ca-category
description: "Use this skill when a small or regional business wants to know whether what it is feeling is happening to everyone in its line of business: how comparable businesses and the category are trending, whether a decline is fewer purchases or smaller ones, and which nearby categories are winning the same customers, including when the business does not appear in the data by name. When a named company that appears in the data asks whether its own move is the company or the category, use ca-benchmark instead. For a full report, use this package's SMB category report."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Category: is it everyone, or just me?

Invoke **`ca-core`** first and follow it throughout. The subject is a small business read through its
category, so the setup is **`ca-core/references/setup-category.md`**, with `setup-brand.md` for every
comparable and for the business if it resolves. Method in
**`ca-core/references/instruments/national-analogs.md`** (comparable businesses),
**`ca-core/references/instruments/category-card.md`** and the benchmark recipe in
**`ca-core/references/instruments/card-core.md`**; read all three before pulling. This file is the run
order.

---

## What it answers

1. **Is this happening to everyone in this line of business?** Businesses like this one, nationally:
   direction, how long, and whether it is getting better or worse.
2. **Fewer purchases or smaller ones?** Visits against average ticket, for the comparables and the
   category.
3. **Is it the category or the whole neighborhood?** The category against its parent and the adjacent
   categories its customers trade between.
4. **Where is the customer spending instead?** Which adjacent categories are gaining a share of the same
   spending.

The business holds its own sales and can place itself against these lines; this module never places it.
A business that appears in the data with live card rows is read against its peers in `ca-benchmark`
instead.

## Before anything

- **Have the setup**: how the business makes money, the routing-test outcome, the category nodes, the
  comparable set with unit growth (`setup-category.md`).
- **Show the comparable set before measuring against it** (`ca-core` gate 11): each brand, why it is
  comparable on the six attributes, and where the comparison breaks.
- **Re-survey live**: `get_insights_from_entity` at `limit=250` on every category node and comparable.
- **Does card observe how this business is paid?** If not (`setup-category.md`, "Start from how the
  business makes money"), this module's card reads are context, and the lead comes from the instrument
  that does.

## Run order

**1. Comparable businesses.** Spend (626) and transactions (627) on the four to six comparables,
`location_resolution: "us"`, quarterly for the full window (three years or more) and monthly for the
lead chart.

**2. The category neighborhood.** Spend on the business's category, its parent and two or three adjacent
categories, monthly, from 36 months before the latest settled month: a two-year window can call a cycle
a trend (`category-card.md`, "Window").

**3. Volume or ticket for the category.** Transactions on the same nodes where the node carries them;
otherwise sum the named members (`category-card.md`).

**4. Share of spending across the neighborhood.** Each adjacent category's spend over the sum of the
neighborhood, from the step 2 pull. This is the read for "customers are spending, just not with us".

## The evidence

The charts below are the proven default. Replace them when another form shows the finding better; what
each says the chart must show still holds.

1. **Businesses like yours, year over year**, quarterly, one line per comparable, zero line. *(lead)*
   Beside it, the reads a total hides: **how many periods each has been negative**, **whether the latest
   three periods are better or worse than the first three**, and **whether the set is converging or
   spreading out**.
2. **Visits against ticket for the comparables**, the same window, and **the one doing the opposite**
   named: the comparable whose strategy diverged is usually the most informative line on the page.
3. **The category against its neighborhood**, monthly, year over year.
4. **Share of spending across the neighborhood**, as lines or stacked.

## Gates that bite here

`gating.md` in full, and specifically:

- **Comparables are read for shape and direction, never level**, and **two minimum**: a pattern ships only
  where two or more show it independently, and a divergence is reported as the finding
  (`national-analogs.md` §5).
- **The so-what test** (`setup-category.md`): the owner's prior is named for this tab, and the tab ships a
  second-order move or does not ship.
- The **two-year stack** and, for big-ticket categories, the **three-year view** before any "recovery";
  the **volume gate** on every ranked cut; **completeness** on the recent months (`gating.md` §5);
  **never divide across sources**.
- **A node that steps while its members do not** has had its tag changed: read the category from its top
  named brands instead (`category-card.md`, "When the node breaks"), and label it by the brands.

## What this module will not say

- **Anything about the business's own performance.** No "your sales" or "you are underperforming".
- **A level from a comparable as a benchmark** for one business: no chain ticket, sales or spend per
  location set beside the owner's figures.
- **Market share.** Share of the panel's spending is a share of what the panel sees.
- **Why customers left.** Cross-shop is co-occurrence: who shares a customer, never who took one.

## If this module is run on its own

- **Routing test not run** → run it (`setup-category.md`): does the business resolve, and is it thick at
  the grain the question needs?
- **Phase 1a not done** → how the business is paid, its locations and markets, its local competitors,
  and unit count and unit growth for each comparable. Nothing else.
- **Before writing the tab's copy, run Phase 1b**: for each claim, the one published figure it is exposed
  to (a listed comparable's reported comps, a published category sales statistic), retrieved, and the
  claim dropped or reframed if the panel contradicts it.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
