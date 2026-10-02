---
name: equity-next-quarter
description: "Use this skill when someone asks how a listed consumer company's next fiscal quarter is starting: whether a trend is continuing or was a one-off, how the first weeks compare with peers, what management might guide, and what to ask on the call. It reads direction and shape only and never produces a second estimate. It needs at least two full weeks of data from the new quarter. For a full pre-print preview, use this package's earnings preview."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Validated on earnings-preview pilots (Aug 2026). Runs only with at least two settled weeks of the next fiscal quarter."
---

# Into the next quarter: is the trend a one-off?

Invoke **`ca-core`** first; setup in **`setup-equity.md`**, call shapes in **`equity-panel.md`**.

**Runs only with two or more settled weeks of the next fiscal quarter.** Below that, skip it and say so in
one line. It is the read an investor most wants, because it bears on the guide, and the read most likely to
be wrong, because the newest weeks are the most decision-relevant and the least settled.

**Direction, shape and relative position only. Never a point estimate.** A band on a low-elapsed window
would rest on observations the backtest never scored, and a second estimate dilutes the one the report is
accountable for.

## Two readability checks, before anything else

1. **Truncation sensitivity.** Recompute the quarter-to-date YoY dropping 0, 3 and 6 of the newest days from
   **both** years. Flat across the three means settled; **a monotone drift is fill lag** and disqualifies the
   level. *(On one pilot −6.47% → −6.04% → −5.79%: 0.68pp of drift, so the level could not be published.)*
   Render this test.
2. **Peer control on the identical window.** Compare every peer against **its own settled prior-quarter**
   read. If the whole set deteriorates together, the panel moved. *(On one pilot a peer went from +3.6%
   settled to −20.3% quarter to date, which condemned the level read for every brand.)*

**Both failing does not kill the tab; it changes what it says.** Levels die; ratios and relative position
survive. Report the subject-versus-peer gap and the decomposition the candidate events point at, and say
plainly that the absolute number is not readable yet.

## Run order

1. The two checks above.
2. **The decomposition the candidate events point at**: geography, brand, channel, time of day.
3. **Each candidate event's verdict**, with the arithmetic: confirmed, rejected or untestable. **Publish
   rejections**: a rejected event arriving before the print is often the most credible thing on the page.
   **Carry every event measured on the quarter tab forward**: the same gap to the same control on the new
   quarter's settled weeks, read as trough (or peak) → latest → gap remaining, and whether it is closing
   at the pace it opened. The gap to a control is a ratio, so it can survive the two checks when the level
   does not; say which the tab is showing. Per `ca-events`, recovery is never called complete while the
   plain year-over-year still runs negative.
4. **Three or four questions for management**, each tied to a number on the page, one of them on the
   measured event's recovery where there is one. Questions about the business, never a view on the
   security.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Weekly shape into the new quarter**, event markers carrying their verdicts.
2. **The truncation test**, as three points.
3. **Subject against peers on the identical window.**
4. *(where the quarter tab measured an event)* **Recovery against the control**: the quarter tab's event
   chart continued into the new quarter on the same axis, with the settled boundary marked.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
