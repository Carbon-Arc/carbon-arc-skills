# Estimate method: what the script cannot decide

`scripts/backtest.py` does the arithmetic. This file governs what the arithmetic cannot: what the estimate
is *of*, when the calibration is *usable*, how the band must be read, how the quarter-to-date window must
be built, and the five ways the whole thing goes wrong. Read it before the first pull.

> The estimate is the cheapest part of the product to compute and the least valuable part to ship alone.
> Everything below exists to make it discountable.

## 1. What the estimate is: seven elements

Write the definition down before any pull, with all seven: **YoY growth** (never a dollar level), in **the
anchor metric exactly as reported**, for **the fiscal quarter**, **the estimate and its band**, **how it was
derived** (panel spend YoY corrected by the trailing calibration gap), **on how many quarters of realized
error**, **as of which date** (days covered, share of quarter elapsed).

Carry the elements into the report, not the sentence: rendered verbatim it runs to seventy words and reads
as method. Distribute it: a claim under twenty words ("Net sales for the quarter grew about +2.6% year on
year, with an average miss of 1.5pp"); the arithmetic as the bridge on the estimate tab (the panel figure the quarter tab shows → each basis
difference → the correction applied, with the quarters it averages → the answer; `SKILL.md`, "This
module's tab"); a mono metadata line for dates, elapsed share, what the band is made of and the
worst miss. State the correction in the direction it is **applied** (a panel that reads low takes a +2.9pp
correction); printing the same fact as a −2.9pp gap elsewhere is a sign-convention defect.

## 2. The quarter-to-date window: four checks, every one has produced a wrong number

**Fiscal alignment.** Exact start and end dates from the company's own calendar; the backtest joined on
period end date (`reported-figures.md`).

**Calendar alignment.** Compare the same calendar dates year on year, then check what they contain:
- **Day-count and day-of-week mismatch** (five Saturdays against four overstates a weekend-weighted
  retailer). Retail 4-5-4 weeks are day-of-week aligned by construction; confirm rather than assume.
- **The 53rd week**, the single most common source of a spurious acceleration.
- **Moving holidays.** At weekly grain a holiday that crosses a panel-week boundary distorts **two
  adjacent weeks in opposite directions**. Never quote a single boundary-adjacent week; sum the pair.
  *(On one pilot, quoting the final week alone overstated a late-quarter slowdown by about 4pp.)* Full
  quarter totals are usually unaffected; check it explicitly.
- **Leap day.**

**Fill-lag truncation.** Card panels under-report the newest days while transactions settle. Establish
the truncation empirically: compare the trailing days as observed today against how the same trailing
days filled in prior quarters. Apply the identical truncation to the prior-year window and state it on
every quarter-to-date figure.

**Elapsed share.** First check whether the quarter is **already complete** (common: retailers report weeks
after quarter end). That is the best case: no extrapolation, tail fill is the only recency risk, and the
report still says "quarter complete, 100% elapsed". Otherwise publish days covered over total days.
**Below about 30 days elapsed, no estimate**, trend only. Never extrapolate linearly: the estimate is a
quarter-to-date-versus-prior-year-same-dates growth rate, plus a statement of what remains unobserved and
what is scheduled inside it.

## 3. Calibration: the number is not the point, the explanation is

The script reports the gap per quarter and its trailing average. Every stable gap has a cause; name it.

| Observed gap | Usual cause | What it implies |
|---|---|---|
| Reported consistently **above** panel | unit growth the panel's fixed coverage under-picks; non-US growth; channels outside the panel | widens if unit growth accelerates |
| Reported consistently **below** panel | panel entry growth; coverage expansion; mix toward card-heavy channels | narrows if panel growth normalizes (the most dangerous kind: it looks like signal) |
| Gap **flips sign** | a bridge change, a panel break, a fiscal-calendar change | recalibrate on the post-change period only |

**Lay the candidate events against the calibration quarters** before naming a mechanism, hardest where the
gap changes level: a one-off inside one quarter biases the correction.

Verdicts, recorded and rendered:
- **Stable and explained** → usable.
- **Stable but unexplained** → usable, with a flag rendered **next to the number**.
- **Drifting** (a monotone trend in the raw gaps) → stop: model the drift explicitly or publish no
  estimate. **Rule out the conditional case first.**
- **Conditional** (the gap alternates with a panel-health variable) → usable, conditioned on that variable.
- **Fewer than five same-basis quarters** → no estimate.

**Drift versus conditional, and why it is easy to get wrong.** Test the **raw per-quarter gaps**, never the
trailing averages: a trailing average of a two-state series is monotone almost by construction. *(On one
pilot the trailing gaps read as textbook drift while the raw gaps oscillated with no trend: a time trend
explained 25% of their variance, one panel-health variable 74%.)* Pass the candidate variable (cardholder
growth, tracked stores, consistent users) as the `condition` column; the script fits `gap = a + b ×
condition`. A conditional correction must then earn its place out of sample (§5).

**The additive rule assumes a slope of 1.** `estimate = panel − gap` forces panel and reported to move point
for point; where they do not, the error grows with the size of the move. The script prints the fitted slope,
the two ranges, and a walk-forward fitted challenger. Score both; publish the better; disclose the other.
Check whether the fitted residuals are one-directional in recent quarters.

**When the level read dies, the ratios live.** A coverage change scales spend and transactions together,
so average ticket, the transactions-versus-spend split and brand mix are near-invariant to it (share of a
category is not). When a break forecloses the estimate, the deliverable becomes a composition and
traffic-versus-ticket read. **This never licenses putting a ratio into the estimator.** The backtest's
panel leg is spend. *(On one pilot spend-per-shopper was substituted as the estimator and published;
scored properly, spend gave ±1.2pp and r = 0.77 against the ratio's ±2.3pp and 0.49, and the estimate had
to be revised from +4.8% to +1.7%, reversing the finding.)* Score every candidate on walk-forward error and
correlation, and default to spend.

## 4. The band

**Realized error, walk-forward, never modeled.** The script's band is the mean absolute error of estimates
each built only from gaps known before that quarter closed. It is not the scatter of the gap around its
own mean, which is about half as large because every quarter sees the whole window. Publish the mean and
the worst miss, and prefer a small chart of every quarter's error to any single statistic. A band on six
quarters is a band on six quarters; say so.

- **It is an average miss, not an interval.** Label it "average miss", never a bare "±", and publish its
  coverage beside it (`within_band`: "N of M scored quarters landed within it"). A reader who takes a mean
  miss for a confidence interval over-trusts the number.
- **Widen for elapsed share.** A band from full-quarter reads is a floor on the uncertainty of a partial
  quarter; say so.
- **Unequal fiscal quarters** (16/12/12/12, or a 4-5-4 fourteen-week quarter): compute the error within the
  quarter-length class where history allows; otherwise use the pooled band and name the bias.
- **No precision finer than the band**: two significant digits of YoY.

## 5. When you chose among correction rules, the choice is part of the uncertainty

The script prints every rule and the **rule spread** on the forward estimate. **If the spread exceeds the
band, say so and publish both answers**: the primary estimate plus "reject this correction and the read is
X to Y", with the band relabeled as conditional on the correction. Walk-forward protects coefficients, not
the choice among rules; where a rule was chosen for scoring best, add a **hard holdout** (fit on the
earliest quarters only, score on the rest). Present rules grouped by mechanism ("corrects for a named
mechanism" versus "averages past gaps"), never as a list of technical labels.

## 6. The publish gate is tracking; precision is a label

| Verdict | Test (printed by the script) | Outcome |
|---|---|---|
| **Does not track** | correlation not positive and material, or direction no better than a coin flip, or fewer than five same-basis quarters, or a named structural break in what the panel measures | **No estimate anywhere.** Everything else ships: trend, ratios, peers, cross-signal |
| **Tracks, precise** | band materially under the reported metric's own recent spread | Headline, band attached |
| **Tracks, imprecise** | band at or above that spread | **Headline, band attached, plus one sentence saying so**, with the decomposition directly beneath |

**A wide number honestly labeled beats no number.** *(On one pilot the panel correlated at 0.89 and called
direction 11 of 15, and the estimate was wrongly suppressed because its band exceeded the metric's spread.)*
"Does not track" must be evidenced by the numbers, never asserted from a wide band. Report direction as a
count ("6 of 8"), never a percentage. Check the lead/lag sign makes causal sense: a signal the reported
figure leads is not a demand signal.

Publish together, always: the estimate (badged derived), the band with its window and worst miss, and the
tracking summary. Context, subordinate: guidance restated in the estimate's units, the prior-year actual,
the reported trend. Then recompute without the largest single month, brand, geography or base effect and
report both numbers (`carbonarc-mcp` non-negotiable 13). Then stop: no view on the security.

## 7. The five ways this goes wrong: check each and record it on the method tab

1. **Estimating the wrong number**: the anchor is not what the panel sees or not what the company reports.
2. **A calendar artifact read as demand**: 53rd week, moving holiday, day-of-week mismatch, leap day.
3. **Fill lag read as deceleration.**
4. **A stale calibration**: refranchising, an acquisition, a panel break, a coverage change. Run the break
   tests in `gating.md` §7; do not settle for "the series looks continuous".
5. **A category move read as a company move, or a contaminated control read as clean.** The peer and
   category control on the identical basis, validated; and a cross-entity gap must clear its noise
   (`cross-signal.md`).

## 8. Illustrative shape only, not real values

> Panel spend YoY, 61 of 91 days (67% elapsed, fill-truncated 4 days): **+6.2%**
> Correction from the last four quarters' gap: **−2.4pp**, stable, explained by net unit growth
> **Panel-implied reported YoY: +3.8%**, average miss 1.6pp (six scored quarters, four within it; worst miss 2.9pp)
> Correlation 0.81, direction 6 of 8; band 1.6pp against a 3.4pp reported spread → informative
> Guidance (context): +2% to +4%
> Transactions **+1.1%**, ticket **+5.0%** → a price and mix quarter, not a traffic quarter
> Category **+4.9%** → most of the strength is the category, not the company

The headline number is the smallest on the page, bracketed by its band, its sample size and the category
control. That ordering is the deliverable.
