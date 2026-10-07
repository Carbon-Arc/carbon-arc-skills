---
name: equity-quarter
description: "Use this skill when someone wants to know what drove a listed consumer company's quarter, on its own fiscal calendar: the week-by-week shape of demand, whether growth came from more transactions or higher tickets, and channel, age-group and regional splits where the data resolves them. For the company against named competitors outside a fiscal-quarter frame, use ca-benchmark; for a full pre-print preview, use this package's earnings preview."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# The quarter: what happened, and what drove it?

Invoke **`ca-core`** first; setup in **`setup-equity.md`** and **`setup-brand.md`**, call shapes in
**`ca-core/references/instruments/equity-panel.md`**. For cohorts read **`card-cohorts.md`**; for any modality
other than card read **`cross-signal.md`**.

**One story, not two**: the weekly shape and the traffic-versus-ticket decomposition belong together.
Channel, cohort and geography fold in as sections where they resolve; they do not earn tabs.

## Run order

1. **Weekly spend and transactions** for the ticker across the fiscal quarter and the same weeks a year
   earlier, bucketed into the company's fiscal windows. Drop the trailing partial week.
2. **Mark calendar distortions before reading any week**: a moving holiday crossing a panel-week boundary
   distorts two adjacent weeks in opposite directions (sum the pair); the 53rd week; day-of-week
   mismatch. Mark affected weeks on the chart as not demand.
3. **Decompose**: spend ≈ transactions × ticket, with **ticket derived as spend ÷ transactions**, never the
   published average-ticket insight across a quarter (it breaks the identity).
4. **Cuts where they resolve**: channel (in-store versus online, never merged), cohort (debiased, per
   `card-cohorts.md`; the income cut is frozen and historical only), geography (with a normalizer and a
   category control). **A concentration fact from the candidate events is a reason to run a cut**: *(on one
   pilot 43% of the estate sat in one state, and the state cut overturned the national read)*. The
   reverse also holds: **a cut that stands out with no candidate behind it** goes through `ca-core` §3
   1b's unpredicted-finding sweep before a word of narrative is written.
5. **Test every candidate event; measure the ones that cleared the screen** (`setup-equity.md`, "The
   materiality screen"). Below the screen, record the verdict against what it predicted: confirmed,
   rejected or untestable. Publish rejections. For each candidate that cleared it, **invoke `ca-events`
   and follow its run order and gates on the quarter's weeks**: the detection floor first, a control group
   of unaffected peers (and unaffected regions where exposure is regional), partial weeks dropped, the
   holiday check, and the difference against the control as the effect. `ca-events` writes those Gate 2
   rows, each naming the candidate. Then state the effect **in the quarter's terms**: the weeks it
   touched, the gap to the control at the trough (or the peak, for a lift), and the gap summed over those
   weeks as a share of the quarter's YoY, with the band the floor allows. Below the floor it is
   undetected, never small.
6. **Peer control** on the identical weeks before calling any shape company-specific.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Weekly YoY across the quarter**, zero line, calendar-distorted weeks marked, event markers carrying
   their verdicts.
2. **Transactions versus ticket**, as two lines or a split bar per period: whether the quarter is traffic
   or price.
3. *(where they resolve)* **The cut that matters**: channel, cohort or geography, each against the same
   cut for a peer.
4. *(for each measured event)* **The event against its control**, on the quarter's weekly axis: the gap
   to the control with the detection floor drawn, the confirmed date as a marker, and a subtitle saying
   how much of the quarter's move it accounts for. Where exposure was regional, add `ca-events`'
   exposed-versus-unexposed view, read against its pre-event gap.

## What this module will not say

That a single boundary week is momentum. That ticket growth is price when it could be mix, unless the
company disclosed pricing. A geography finding without a normalizer and a control. That an event drove the quarter when the
control group moved as much, or when its measured share of the move is smaller than the category's.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
