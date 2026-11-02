# Card retention (US Complete): who comes back

Retention answers two questions: **are we keeping the new customers we win**, and **are existing customers
coming back less often**. It does not answer where the others went. Card retention shows that a customer
stopped buying from the brand, never that they switched to a rival (`cross-shop.md`, "The hard scope
boundary"). Say that once on the tab.

## The instruments

| Insight | Group it follows | Use |
|---|---|---|
| **124734** Retention Number of Shoppers | **New customers**: shopped in the starting period, with no transaction at the brand in the 12 months before | Spine |
| **232620** Base Retention Number of Shoppers | **Everyone** who shopped in the starting period | Spine |
| **124735** / **232621** | The same two, **by generation** | The generation cut. Rates only; see "By generation" |
| 576–581 Churn Rate / Retained / Churned / New Loyal Customers | Loyal Shopper groups | **Frozen** look-alikes on the US Detailed panel (history 01/2019–08/2025). History only, never the spine (`carbonarc-mcp` `references/data-state.md`) |

Both spines sit on **Credit Card – US Complete Panel**, the same panel as 626, and attach to retailer,
product and service representations. **Retention rate** is the share of the group that transacts again in
period *n*. The new-customer group is a subset of the everyone group.

**Fields that matter**, per row:

- `periods_since_start_date`: the age of the group, 0 at the starting period.
- `retention_rate`: returning shoppers ÷ **that row's** `no_users_cohort` (see check 2).
- `no_users_cohort`: the group count for **that row**. It moves up as well as down from row to row, so it
  is not the starting count less the people who left.
- returning shoppers (`retention_number_of_shoppers` / `base_retention_number_of_shoppers`).
- `no_transactions_retention_cohort`, `spend_retention_cohort`: the group's own transactions and spend in
  period *n*.
- `total_no_transactions_retention_cohort`, `total_spend_retention_cohort`: **the brand's whole panel
  transactions and spend in period *n*, every shopper**, not the group. Never read them as the group's.

## Before the first pull

- **Run `ontology` on each entity** and look for a retention topic. `get_filter_options` and
  `get_insights_from_entity` can list both insights for an entity that has no rows at all.
- **Find the sibling brand that carries the spend.** A company often has several brand nodes, and the
  spend sits on one of them, sometimes not the one with the familiar name. Settle it by putting every
  sibling in the one 626 feasibility probe, before any retention call: retention on the wrong sibling reads
  a few hundred shoppers, or nothing.
- **`data_library` on both insights**: confirm the panel and that `frequency` is not Historic.
- **`get_filter_options` needs `location_resolution: "us"` and `date_resolution: "quarter"`.** Without
  them it errors on these insights ("could not build framework") although the insight is live. With them,
  the generation variants list one filter, `generation`.

## The recipe

**Two grains, one per form: retention curves are monthly, retention triangles are quarterly.** Every
call: `location_resolution: "us"`, `aggregate: "sum"`, one entity per call, and the date window chooses
the starting periods. Each starting period comes back followed through the latest closed month (monthly)
or quarter (quarterly).

- **The `question` decides which columns come back.** Name every one: date (starting period), period
  start and end date, periods since start date, group count (no users cohort), retention rate, returning
  shoppers, transactions and spend from returning shoppers, total transactions and total spend. A question
  that leaves one out gets a table without it.
- **Sort the rows yourself**, by starting period then `periods_since_start_date`. Some responses come back
  ordered by another column.
- **Read the window from the returned rows**, never from the request echo, which comes back empty.

**Triangles: quarterly, eight starting quarters.** `date_resolution: "quarter"`, one call per measure per
brand (124734, then 232620): about 45 rows each. The row's date is the end of the starting quarter.
**End the window at the last starting quarter you will keep**: check 1 drops the quarter that contains the
latest closed month, and the current quarter is partial. *Worked example, labeled:* on Oct 26, 2026 the
latest closed month is September, so Q3 2026 is dropped and Q4 2026 is partial: the eight starting
quarters are Q3 2024 to Q2 2026, a window of 2024-07-01 to 2026-06-30. Ages that land in the dropped
quarter are dropped from every group too.

**Curves: monthly, one starting month per call.** `date_resolution: "month"`, a window of exactly one
month: two or more months come back as a written summary with a cut-down table. A call returns about 20
rows for a month a year and a half back, fewer for a recent one.

- **Curves run twelve months.** The curve month is the latest starting month with **twelve ages**
  before the dropped latest month, skipping November and December (holiday buying swamps the first
  months). *Worked example, labeled:* on Oct 26, 2026 September is dropped, so ages run through August
  2026 and the curve month is August 2025, against August 2024. Twelve ages cost recency: the newest
  group on the chart started fourteen months ago, which the caption says.
- **The default pull:** 124734 and 232620 for the curve month and the same month a year earlier, for the
  subject and the peer: eight calls, each its own Gate 2 row.
- **A monthly group is about a third of a quarterly one.** When a group is under the floor, pool the
  curve month with the two starting months before it (three calls per line), and read only the ages all
  three have.

**By generation: monthly curves, two calls.** 232621 (everyone) and 124735 (new customers) for the
curve month, each returning every generation in one call (about 70 rows for a curve month a year back).
The chart is read on everyone or on existing customers, never on new customers alone, because the
generation groups of new customers are tiny: on a quick-service brand Gen-Z was 74,058 everyone against
222 new customers for one month. The new-customer call is there for the **new-share check** (rule 7 in
"The analysis"), which decides which line the chart shows. Read Gen-Z, Millennials, Gen-X and Baby
Boomers; leave out Silent Gen, which is small on most brands. The four hold about 90 to 95% of the
everyone group, because some cards carry no age. The floor and the count-collapse rule apply to each
generation's own group: on a direct-to-consumer apparel brand Gen-Z was 117 for the month and its count
moved 66%, so it was dropped (pooling three starting months is the alternative when the count holds).
New customers by generation are charted only when the question is about winning one generation, and
nearly always need three starting months pooled. Subject only by default. Filter key `generation`,
values exactly as `get_filter_options` lists them. A **generation triangle** is
quarterly and takes one generation per call (`filters: {"generation": [...]}`, about 45 rows): pull it
only when the question is about one generation.

**The series probe comes first** (`carbonarc-mcp`, the probe rule): 124734 on the subject, monthly, for
the curve month. It shows the columns the question returns, the group size and the returned max date,
and its rows are the subject's curve-month pull, so it is not pulled again.

## Checks before any number is used

1. **The latest closed month is not filled in yet.** The retention tables lag the spend tables: the
   latest closed month can read a third to two thirds below the month before, in every brand at once,
   while 626 for the same month is complete. **Drop the latest closed month, and the quarter that contains
   it** (late October: September and Q3, not the partial Q4), unless its change from the month before is close to the same change a year earlier. Always drop
   the current partial month. Record both dates at Gate 3 (`carbonarc-mcp` `references/response-handling.md`,
   "Signal lags").
2. **Use the returned `retention_rate`. Never recompute it against the starting count.** The rate is
   returning shoppers ÷ that row's group count. The row count rises and falls, which fits a count of the
   group members whose cards the panel can still see in that period: the panel drops cards that go quiet
   and takes them back when they return. If so, the per-row rate is retention among customers the panel
   can see, and recomputing against the starting count would put the panel's own losses back in and push
   older ages down. Until the data team confirms what the row count holds, treat that reading as the
   working assumption and say so in Method.
3. **Group-count drift is a quality flag, not a correction.** For each group, take the largest change in
   `no_users_cohort` from age 0 across the ages you will read.
   - **The count collapses** (most of the group gone, rates read off one or two people) → do not show the
     brand.
   - **Drift above about 10%** → show it with a clause where the number is ("the group count moved 12%
     over these two years").
   - Drift grows as a brand gets smaller: large brands drift 0–3% over two years, small ones 10–16%.
4. **Thin groups.** Apply "Minimum group size" below before any comparison.
5. **Cards leave the panel.** Past about 12 months, a lower rate mixes customers who left the brand with
   cards that left the panel. A peer read the same way is the only control in this data; never read a
   late age without one.
6. **Subscription brands.** Base retention counts any transaction, so a customer on an annual plan looks
   lost in months 1–11 and returns at month 12. **Look for a month-12 spike before comparing subscription
   brands.** Three blind spots, each stated on the tab when the subject sells subscriptions: purchases made
   through an app store are billed by the store, not the brand; seats paid by invoice never touch a card;
   and two companies' brand nodes may not cover the same products (one may include developer or API
   charges and the other not).

## The analysis

1. **Pull both measures and split everyone into new and existing customers.** For each age *n*, using
   that row's own counts (check 2):

   ```python
   existing_rate = (base_returners - new_returners) / (base_count - new_count)
   new_share     = new_count_at_age_0 / base_count_at_age_0   # starting counts
   ```

   The subtraction assumes both groups' row counts are taken the same way, which follows from check 2.
   Report all three rates and the new-customer share. **Never report the everyone rate alone**: it can
   move the opposite way to both of its parts. *Worked example, labeled (a department-store apparel
   brand):* its everyone rate was flat to slightly up year over year while new customers (−1% to −6%) and
   existing customers (−1% to −2%) both fell. The new-customer share of the group fell about 3 points,
   and new customers come back far less often (about 9% a quarter against about 36%), so the shift in mix
   lifted the total. Lead with the part the question is about: new customers for "are we keeping the
   customers we win", existing for "is loyalty slipping".
2. **Compare the same starting period a year apart, at the same ages.** The calendar dominates the curve
   (holiday quarters roughly double new-customer returns). With the same starting period, each age lands
   in the same calendar quarter.
   - Groups that start in different periods are compared only over a calendar-balanced window: 12 months
     pooled.
   - When a comparison starts in November, also report it without December, which can carry a fifth to a
     quarter of a November group's first-year returns and swing month 1 by several points on its own.
3. **Never average across groups by age**, except three consecutive starting months pooled the same way
   for every line on a chart. An apparent "12-month bump" was holiday months lining up in that position.
4. **A peer is the control.** A panel effect moves every brand; brands moving in opposite directions is
   evidence the move is the brand's. Read the peer exactly as the subject.
5. **Check the direction across starting points.** A finding that holds for the January groups, the Q1
   groups and the November groups is the brand. One that holds for one starting point only is reported as
   that.
   - **Then check it by calendar period.** When year-apart curves part only at the ages that fall in the
     same recent months, and every group dips in those months (one diagonal of the triangle), the change
     is in those months, not in the customers the brand won: say which months, for new and existing
     customers alike. Signs that look mixed when read by starting quarter can be consistent when read by
     calendar quarter. *Worked example, labeled (a quick-service brand):* six-month curves made its
     newer group look weaker at every age; twelve-month curves showed the two groups level for seven
     months and parting only from April of the latest year, when existing customers also fell 2.5 to 2.9
     points and the peer's held.
6. **Pair retention with spend.** Two more reads from the same rows:
   - **Starting spend per customer:** starting-period spend ÷ the group count at age 0.
   - **Spend retention:** the group's spend in period *n* ÷ its starting spend.
   A brand can keep fewer customers and more of their money. For a subscription brand, spend retention is
   the stronger second read.

7. **By generation, compare rates, never the mix.** A generation's retention rate is a ratio inside that
   generation, so the panel's age skew does not distort it. The **number** of customers in each
   generation is skewed (the panel under-reads Gen-Z, so a Gen-Z group is far smaller than the brand's
   real Gen-Z customers): never show a generation's share of the group without the debias in
   `ca-audience`. Apply the size floor and the count-collapse rule to each generation's own group,
   which is where they bite even on everyone: a direct-to-consumer apparel brand's Gen-Z group was 117
   for the month, with its count moving 66%. Drop a generation that collapses; pool three consecutive
   starting months for one that is only small.
   - **The new-share check.** New customers come back far less often than existing ones, so a generation
     with more newcomers looks less loyal on everyone even when its regulars are not. For each
     generation, new share = new count ÷ everyone count at age 0. **Under 10% in every generation** →
     chart everyone, and say it is mostly existing customers. **10% or more in any generation** → chart
     **existing customers** by generation, split row by row exactly as in step 1:
     `(everyone returners − new returners) ÷ (everyone count − new count)`, and apply the floor to the
     existing group. *Worked examples, labeled:* at a quick-service brand new shares were 0.3% to 3.3%
     and splitting moved no rate by more than 1.4 points; at a direct-to-consumer apparel brand they
     were 34% to 47%, three generations looked level on everyone in the first month, and on existing
     customers Millennials came back clearly more (19.0% against 17.1% to 17.2%, and 2.7 points ahead of
     Boomers at month 12).

## Minimum group size

The smallest change you can call at 95% confidence between two groups of N new customers, at quarterly
retention p (two-proportion test; it ignores customers who return in more than one quarter):

| N per group | 500 | 1,000 | 2,000 | 4,000 | 8,000 |
|---|---|---|---|---|---|
| p = 7% | ±45% | ±32% | ±23% | ±16% | ±11% |
| p = 10% | ±37% | ±26% | ±19% | ±13% | ±9% |
| p = 15% | ±30% | ±21% | ±15% | ±10% | ±7% |

As a rough guide from the brands read so far: about $0.1–0.4M a month of panel spend gives 750–1,900 new
customers a quarter; about $1.5M gives 3,000–9,500; about $4M gives 8,000–18,000. A brand with a few
thousand dollars a month gives a few dozen, and its count collapses.

- **Under about 300 new customers a quarter, or a collapsing count** → no retention read for that brand.
- **About 300–2,000** → show levels with a range. Claim a change only above the detectable size for that
  N (roughly 20–30% or more). Pooling the four starting quarters of a year roughly halves it.
- **Claim a change only when z ≥ 2**, on one starting quarter or on the four starting quarters of a year
  pooled. **On a large brand z ≥ 2 is not enough**: with tens of thousands of customers a group, a
  0.7-point move scores z = 15. There, a change also has to hold in the same direction in every starting
  quarter compared; moves that flip sign from one quarter or age to the next are no detectable change,
  whatever their z. Always state the size in points. Four quarters that each lean the same way without clearing it are not a finding: that happens by
  chance about one time in eight. Anything short of z ≥ 2 is reported as **indistinguishable from no
  change**, which is a finding (`carbonarc-mcp` non-negotiable 10).

```python
from math import sqrt
def z(r1, n1, r2, n2):              # returners and group counts, two groups at the same age
    p1, p2, p = r1 / n1, r2 / n2, (r1 + r2) / (n1 + n2)
    return (p2 - p1) / sqrt(p * (1 - p) * (1 / n1 + 1 / n2))
# pooled: sum returners and counts over the four starting quarters of each year, then call z once
```

## How to present it

Two forms only: **retention curves** and **retention triangles**. Every retention chart is one of them.

**Words.** Client text says *new customers*, *existing customers*, *customers who came back*, and
names the starting period ("customers who first bought in Q1 2025"). Never *first-shopped*, *base
group*, *cohort* or a field name. The count column is the panel's count: head it *Customers* and never
call it the brand's customer base.

### Retention curves

A line chart, **monthly**: the returned retention rate on the y-axis, months since the first purchase on
the x-axis (+1M to +12M; age 0 is always 100% and is left off). Each line is one group. Curves
show shape: how steep the first drop is (how many customers a brand loses after one visit), where the
line flattens (the loyal core), and whether one group sits above another at every age. A subscription
brand's month-12 spike shows here.

- **What a line is.** One starting month, or three consecutive starting months pooled when a group is
  under the floor (sum returning customers and group counts at each age, then divide). Every line on one
  chart starts in the same month or months of its year: lines that start in different seasons read the
  holiday months at different ages, which looks like a difference in loyalty.
- **The comparisons.** The curve month against the same month a year earlier (is retention changing?);
  subject against peer (is it the brand?); new against existing customers; one line per generation,
  on everyone or existing customers as the new-share check decides, with each generation's new share
  in the caption.
- **Ages.** Only ages every line has. The x-axis stops at the last age with data, and the dropped
  latest month is never a point.
- **A monthly rate is not a quarterly rate.** About 15% of a quick-service brand's new customers came
  back in a given month and 23% in a given quarter. Never put the two on one chart, and name the grain in
  every caption and tile.
- `CA_CHARTS.lineChart` with values in percent, `unit: "% came back"`, `yMin: 0` and a `yMax` that is a
  multiple of four; up to four lines, the subject's line first. Give a line `dy` when end labels collide.
- **Caption:** *"Share of the customers who first bought in [month] who bought again in each later
  month, as the panel reports it."*

### Retention triangles

A table: one row per starting quarter (oldest at the top), one column per quarter since the first
purchase, each cell the returned rate, shaded on one scale for the whole table. A count column on the
left gives each row's group at age 0. Triangles show what curves hide: **which starting quarter** was
different, and **which calendar quarter** moved every group at once.

- **Reading it.** Each diagonal is one calendar quarter, so a season or an event shows up as a diagonal.
  Tag each Oct-Dec cell, but read which diagonal is bright from the table, never assume it: an apparel
  brand peaked in Oct-Dec, while a quick-service brand peaked in Apr-Jun and had no holiday lift. A row that is low
  all the way across is a starting quarter that brought in weaker customers (a promotion, a new
  channel). **Compare a row with the row four above it**, the same season a year earlier; neighboring
  rows differ by season, not by loyalty.
- **Cells.** The dropped latest quarter is a dashed *pending* cell on its diagonal, never a value or a
  blank. A row whose group is under the size floor shows *too few* in every cell.
- **Which triangles.** Quarterly, new customers and existing customers (the split in "The analysis",
  cell by cell) for the subject; the peer's only when the tab's finding is the comparison. Generations are
  curves; a generation triangle only when the question is about that generation and its group clears
  the floor in every row.
- `CA_CHARTS.triangle` with values in percent, `floor: 300`, `tags` for the Oct-Dec cells and
  `"pending"` for the dropped quarter.
- **Caption:** *"Share of each group who bought again 1, 2, 3 or more quarters after first buying.
  Compare a row with the row four above it (the same season a year earlier)."*

**Every chart** carries the badge with the dataset, then the group:
`■ Credit Card – US Complete Panel · new customers`. A change named in a title or a sentence still needs
z ≥ 2; shading is not a finding.

**Method** carries the per-row denominator (check 2), the drift for each brand shown (check 3), the
dropped latest quarter (check 1) and, for generations, their coverage of the everyone group and the rates-not-mix rule.

## Checks before shipping

- [ ] Both measures pulled for every brand shown; the everyone rate never appears alone.
- [ ] Latest closed month and its quarter dropped, or kept with the year-earlier test written down.
- [ ] Every rate is the returned `retention_rate`; nothing recomputed against a starting count.
- [ ] Every brand shown has 300 or more new customers a quarter and no collapsing count; drift above
      about 10% is stated where the number is.
- [ ] Every change claimed has z ≥ 2; the rest are written as no detectable change.
- [ ] Comparisons are same starting period, same ages, a year apart; no average across groups by age.
- [ ] A peer is read the same way.
- [ ] Subscription subject: month 12 checked, and the three blind spots stated.
- [ ] Every retention chart is a monthly curve or a quarterly triangle; no line mixes starting seasons;
      the dropped month or quarter is never a value; every caption names the grain.
- [ ] Generations: rates only, Silent Gen dropped, each generation's group over the floor or pooled.
