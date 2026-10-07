---
name: ca-local-costs
description: "Use this skill when a small or regional business wants to know whether its cost pressure is local or happening everywhere: what businesses in its industry pay in its metro area against the state and the country, whether wage growth is speeding up or easing, and how the prices of its main inputs are moving. It reads payroll-based wages located at the employer, plus input-price series. It does not see the business's own payroll or costs. For a full report, use this package's SMB category report."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Local costs: is my cost pressure local, or everywhere?

Invoke **`ca-core`** first and follow it throughout. The subject is a small business in its markets, so
the setup is **`ca-core/references/setup-category.md`**. Read **`ca-core/references/instruments/panel-notes.md`**
(SMB Workforce) before pulling. This file is the run order.

---

## What it answers

1. What do businesses in this industry pay in the business's metro area, against the state and the
   country, and is that gap widening or narrowing?
2. Is local wage growth speeding up or easing?
3. How are the prices of the business's main inputs moving?

**Why this layer matters for a small business:** payroll records are keyed to the **employer's** location,
so unlike the card panel (keyed to the cardholder's home) a local wage read really does describe
businesses in the owner's market. It is the one local, business-side signal in the report.

## Before anything

- **Name each line of business and its industry.** A small business often has several under one roof (a
  restaurant with a bar and an events room); each needs its own industry code. Record them in words for
  the reader and in codes for the pulls.
- **Re-survey live** and read which geographies the wage insights accept from the response.
- **The so-what test** (`setup-category.md`): the owner knows what they pay. The finding is the gap to the
  local market and whether it is moving.

## Run order

**1. Industry wages by metro area.** SMB Workforce average net salary by industry (the industry-level
topic) for the business's metro area, its state and the US, monthly or quarterly, three years. **Metro
grain is the floor for a narrow industry**; a city or ZIP cell usually does not survive. Where the
industry is too thin even at metro grain, use the all-industry wage for the metro area and say so.

**2. Growth, not just level.** Year-over-year wage growth for each geography, same months each year.
**Exclude December or compare it only with December**: it carries a year-end true-up.

**3. Input prices.** For each main input, the Commodity Metrics series where it exists; it is country-level
and specialized in food and agricultural goods, so probe each commodity before promising it. Fill the rest
with public series (BLS producer price indexes by industry, USDA, EIA), badged ◆ and cited. A non-food
business may have no Carbon Arc input series at all; say so in one line and use the public series.

## The evidence

1. **Local wage against the state and the country**, the same industry, as levels side by side with the
   gap stated. *(lead)*
2. **Wage growth over time**, three lines, year over year, zero line.
3. **Input prices**, year over year, one line per input, with the source on each.

## Gates that bite here

- **Never publish worker counts or employer counts from the payroll panel.** They move with the panel's own
  growth. Wages survive because growth cancels in an average (`panel-notes.md`).
- **Say which wage it is**: average net salary is after withholding, not gross, and not the employer's
  loaded cost. Never call it "labor cost".
- **Never divide a wage into anything from another dataset** (`ca-core` gate 10): no wage-to-sales ratios.
- **Volume gate**: a metro-industry cell with a handful of workers is not a market wage; print the basis.

## What this module will not say

- Anything about the business's own payroll, staffing or margins: the owner holds those, and the
  comparison is theirs to make.
- Whether the business pays too much or too little.
- A forecast of wages or prices.

## If this module is run on its own

- **Phase 1a not done** → the business's lines of business and their industries, and its metro area and
  state. Nothing else.
- **Before writing the copy, run Phase 1b**: check one wage level against a published statistic for the
  same area and industry (BLS occupational or county wage data, ◆), and drop or reframe the claim if they
  contradict.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the report: this tab only. Run `verify_report.py`
and `verify_build.py` before shipping.
