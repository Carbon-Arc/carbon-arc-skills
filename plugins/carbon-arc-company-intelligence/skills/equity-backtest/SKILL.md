---
name: equity-backtest
description: "Use this skill when someone asks whether Carbon Arc's card data can be trusted on one listed consumer company, or wants only the panel's estimate for the current quarter. It scores card spend against the company's own reported history, decides whether the panel tracks it, and where it does, estimates the quarter with the error its track record earned. For a full pre-print preview (estimate plus drivers, peers and cross-checks), use this package's earnings preview instead."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Backtest and estimate: can we trust the panel, and what is the quarter tracking at?

Invoke **`ca-core`** first. The subject setup is **`ca-core/references/setup-equity.md`** (with `setup-brand.md`);
read **`ca-core/references/instruments/equity-panel.md`** and **`reported-figures.md`** before the first pull, and
this module's **`references/estimate-method.md`** before computing anything.

**Run `scripts/backtest.py` for every number in this module. Never re-derive its arithmetic from prose.**
Re-derivation is the recorded failure: on one pilot three silent drifts compounded into a published +4.8%
that was actually +1.7%, wrong in direction.

```bash
EQ=$(find ~/.claude/plugins -type d -path '*carbon-arc-company-intelligence*/skills/equity-backtest/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$EQ/test_backtest.py"                                   # once per session: must print 0 failure(s)
python3 "$EQ/backtest.py" quarters.csv --qtd <qtd_yoy> --out backtest-table.csv --json backtest.json
```

## Before anything

The setup in `setup-equity.md` is done: the print anchored, the anchor metric chosen by the user, the
reported source chosen, what the panel can see rendered, the ticker roll-up validated (brand sum **and**
brand weights) and checked for acquisitions, candidate events listed with what each would show.

## Run order

1. **Reported leg: public filings, or the client's sheet. Nothing else.** Fetch each quarter's figure from
   SEC EDGAR (10-Q, 10-K, 8-K earnings release) or the company's IR site, with its period end date and the
   document URL. Never use an internal database for reported figures, even where one is
   reachable: the reader could not rebuild the backtest. The MCP does not serve reported financials. Anchor the mapping on a filed value and confirm on a second quarter. Drop any
   quarter you cannot source.
2. **Panel leg.** The ticker at `fiscalquarter`, at least fourteen quarters, unfiltered unless the
   quarter-to-date read uses a filter too. Drop head and tail partial rows; aggregate duplicates. Confirm
   the returned end dates against the filing.
3. **Build `quarters.csv`**: `period_end_date, panel_yoy, reported_yoy, reported_source` (and `condition`
   when testing a panel-health variable), joined on end date, same basis, quarters present in both legs
   only. `reported_source` is the filing or release URL, or `client sheet: <file>`; the script refuses anything
   that is not a URL or the client's sheet.
4. **Break tests** across the whole backtest window (`gating.md` §7), any claim tiered (§11).
5. **Quarter-to-date window** per `estimate-method.md` §2: fill truncation established empirically,
   calendar checks, elapsed share.
6. **Run the script.** Read the verdict, the gap diagnostics, the slope, the rule spread and the
   informativeness ratio. Name the gap's cause and record the calibration verdict (§3).
7. **Decide what ships** (§6): no estimate, a precise headline, or an imprecise headline with its one
   sentence. Recompute without the largest single element and report both.

## This module's tab: "What is the quarter tracking at?"

The tab carries the estimate and everything a sceptical reader needs to audit it. **"Can we use the panel?"
is a section of it**, below the estimate, not its own tab. Ordered **answer → arithmetic → context →
evidence → limits**, and every value comes from `backtest.json` or `backtest-table.csv`, never typed from
prose:

1. **The estimate**: a claim headline, the number badged ⊘, and one mono line with the average miss, the
   scored quarters and how many landed within the average miss (`within_band`), the worst miss, the
   elapsed share and the data-through date. Write "average miss", never a bare "±": the band is a mean
   miss, not an interval (`estimate-method.md` §4).
2. **How we got to the number**: the bridge, as a table and a waterfall.

   | Step | Source |
   |---|---|
   | Panel spend YoY for the quarter, **the figure the quarter tab shows** | ■ |
   | One row per basis difference between that figure and the backtest's basis (weekly buckets against the fiscal quarter, an excluded payment route, a dropped brand, the fill truncation), each sized in pp and named by what it includes or leaves out | ■ ⊘ |
   | = panel spend on the backtest's basis (`qtd_panel_yoy`) | ■ |
   | The correction applied (`correction_applied`, in the direction applied), naming the quarters it averages and each one's gap (`correction_from`) | ⊘ |
   | = the estimate | ⊘ |

   Beside it, **every alternative scored** (the other correction rules in `alternatives`, and any other
   panel basis run through the script): each named by what it measures, its result, its average miss, and
   why it did not lead. Where the rule spread exceeds the band, publish both answers (§5).
3. **What to read it against**: guidance restated in the estimate's units, the distance from the guide
   midpoint, the prior quarter, the year-ago base and two or three disclosed KPIs, with **the
   restatement's arithmetic in one line beneath the table** (which disclosed figures, combined how), badged
   ⊘ with its ▲ sources. Then the estimate-against-context chart.
4. **How to hold this number**, in plain prose: what it is, what the band covers and what it does not
   (a basis or rule choice), and the recompute without the largest single element.
5. **Can we use the panel?**, ordered **scope → evidence → verdict**:
   - **What the panel can and cannot see**, as the waterfall, and the anchor it forced.
   - **The counts, once**, from `counts`: quarters of history, how many only calibrate the correction, how
     many are scored, and how many direction calls. Use these words and numbers everywhere in the report.
   - **Panel against reported, per quarter** (two lines, fiscal quarters, zero line); the gap per quarter
     with its verdict rendered as a claim; **estimate against history** (reported YoY as the spine, each
     quarter's walk-forward estimate overlaid, this quarter as a distinct terminal marker in its band);
     each quarter's error; the per-quarter table and the scalars (correlation, direction as a count,
     average miss with coverage, worst miss); any break evidence with its tier; where a correction rule or
     basis was chosen, the choice by mechanism.
6. **What this brief will and will not claim**: one row per question, answered or not, placed after the
   evidence so it reads as a conclusion rather than a disclaimer.

**When the panel does not track**, the tab leads with the no-estimate verdict and its reasons in the
reader's terms, drops items 1 to 4, and ships 5 and 6 in full.

Attach `backtest-table.csv` and `backtest.json` and link both from the bridge, so an analyst can rebuild
every number on the tab.

## What this module will not say

An estimate without its band, its window and its worst miss. A bare "±" band, or one without the count of
quarters that landed within it. A bridge value typed rather than read from the script's output. A band computed any way but walk-forward. A
dollar level from the panel. "Does not track" on the strength of a wide band. Anything about the stock.

## If this module is run on its own

Run the setup in `setup-equity.md` first, including the scope check. If the company fails it, stop there
and say what the panel cannot see.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
