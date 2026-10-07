---
name: ca-macro
description: "Use this skill when a small or regional business wants to know whether the consumer behind its category is getting stronger or weaker, and for whom: how category spend is moving by income group and age group, whether big-ticket purchases are being put off or traded down, whether the category is losing ground to essentials, and what a dated shift in the economy (a rate move, a tariff, tax refunds arriving late, a fuel price spike) did across categories. It reads the category against the national consumer, adjusted for the panel's mix. For a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Macro: is the shopper behind the category getting stronger or weaker?

Invoke **`ca-core`** first and follow it throughout. The subject is a **category**, so the setup is
**`ca-core/references/setup-category.md`**. Method in
**`ca-core/references/instruments/category-macro.md`** and the mandatory cohort adjustment in
**`ca-core/references/instruments/card-cohorts.md`**; read both before pulling. This file is the run
order.

---

## What it answers

1. **Is the category gaining or losing share of the consumer's wallet**, against the national consumer
   and against essentials?
2. **For whom**: which income and age groups are pulling back or holding up in the category, measured
   against what the same group spends nationally?
3. **Are big-ticket purchases being put off**: fewer purchases at the same ticket, the same purchases at
   a smaller ticket, or both?
4. **What did a dated shift in the economy do** to the category, against categories it should not have
   touched?

## Before anything

- **Have the setup**: the category and its neighborhood, the national comparison, and two or three
  **reference categories** chosen before any pull: one essential (groceries or fuel, for example) and one
  discretionary category with no tie to housing or vehicles. Show them and why (`ca-core` gate 11).
- **The cohort adjustment is not optional.** Every income or age cut is read against the national panel
  for the same group (`card-cohorts.md`), and the same correction applies to tracking a group over time.
- **Candidate macro events from Phase 1a**, each with a predicted observable: *if rate cuts reached this
  category, rate-sensitive big-ticket categories move before the reference categories do*. Dates retrieved,
  never recalled.

## Run order

**1. The category against the national consumer.** Category spend and transactions, monthly, beside
total card spend for the national panel on the same insight and grain (`category-macro.md`, "The
national denominator"). The ratio of the two is the category's share of the panel's wallet; both terms
come from one dataset, which is what makes the ratio a rate.

**2. Reference categories**, same insight, same grain, so the category's move can be read against
essentials and against unrelated discretionary spend.

**3. Age and income groups.** The live generation cut on the category node, summed from states, with
the national panel on the same insight and grain as the denominator (`card-cohorts.md`), each group
indexed against its own national spend and tracked over time. **Income is history only** unless the live
survey finds a current income cut: the surveyed income cuts stopped in Aug 2025 (`category-macro.md`,
"Cohorts"). Chart income only with its end date on the chart, never as a current read.

**4. Big-ticket deferral.** `spend = transactions x ticket` for the category, monthly. Where the category
node or its members carry a ticket-size distribution, the share of transactions above the category's
big-ticket threshold (`category-macro.md`, "Deferral"); where they do not, the decomposition alone,
stated as such.

**5. A dated macro event**, only where one is a candidate with a predicted observable. The `ca-events`
method, with the reference categories as the control and the category's own neighborhood as a second
control. Detection floor first (`gating.md` §2), the three checks in `gating.md` §10 before any figure.

## The evidence

The charts below are the proven default. Replace them when another form shows the finding better; what
each says the chart must show still holds.

1. **The category's share of the national wallet**, monthly, with the reference categories on the same
   basis. *(lead)* One picture answers "is it us, or is the consumer pulling back from everything".
2. **Age groups, indexed to their own national spend**, monthly or quarterly lines, one color per
   group held across the report. Caption states the adjustment in plain words.
3. **Volume and ticket**, the deferral read: transactions and ticket on one card, year over year.
4. *(optional)* **Income groups, indexed, through their end date**, where the reader's question is
   income and the history answers it.
5. *(optional)* **The macro event**, plain year-over-year first, the control view second, labelled.

## Gates that bite here

The **cohort adjustment** on every group chart (gate 0 in `setup-brand.md`); the **drift check** on any
period-over-period change in a group's index; **completeness** on the recent months; the **detection
floor** and `gating.md` §10 before any macro-event figure; and the **category test**: a category moving
with the national wallet is a consumer story, not a category story, and the headline says so.

## What this module will not say

- **Not a forecast** of the economy, rates or the category.
- **Not the business's own customer mix.** On a market run the business is not in the panel; this is the
  category's shopper.
- **Not credit health.** The panel sees spending. It does not see balances, payments, delinquency or
  approvals, and nothing here is phrased as if it did.
- **Not a cause** for a group's move without a dated candidate that cleared the floor and the checks.

## If this module is run on its own

- **Phase 1a not done** → candidate macro events across the window as names and dates, each with a
  predicted observable. Nothing else.
- **Before writing the tab's copy, run Phase 1b**: each claim against the one published figure it is
  exposed to (a government retail sales series for the category, a published income-group spending
  statistic), retrieved, and the claim dropped or reframed if the panel contradicts it.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
