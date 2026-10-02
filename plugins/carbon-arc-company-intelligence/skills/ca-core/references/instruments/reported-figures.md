# Instruments: the reported side of a preview

What a preview retrieves rather than measures. **Reported figures are retrieved, never generated.** A
figure that cannot be tied to a primary source and a period end date is blank and renders "n/a, not
sourced".

## The reported source: two paths, the user picks at the start

| Path | What it is | Cost |
|---|---|---|
| **Public filings and releases** (default) | Every figure from primary sources: the 10-K and 10-Q for the income statement, earnings releases and MD&A for comps and operating KPIs | More fetching; the window is bounded by how far back you fetch |
| **Bring your own** | The user supplies a spreadsheet of reported figures | Only as good as the sheet; validated against the contract below |

**These are the only two paths**, even where an internal database is reachable: a preview built on figures
the reader cannot get to cannot be rebuilt or checked. `backtest.py` refuses any reported source that is
not a URL or the client's sheet.

The choice changes only where the reported leg comes from. Panel leg, calibration, band and every rule in
the backtest are identical on both. **The Carbon Arc MCP does not serve reported financials**: the
reported-actuals topics are advertised on company and ticker entities but do not execute (verified Aug
2026 across every resolution). Do not spend pulls rediscovering this; re-probe only if a release note says
they have been populated.

### Filings

- Each earnings release carries the prior-year comparative, and each 10-K carries three fiscal years, so
  a few documents cover a full window.
- **Comps are not in the financial statements.** Comparable sales, store counts and traffic-versus-ticket
  commentary live in the MD&A and release highlights; budget separate fetches.
- **Every reported value carries a primary-source URL and a period end date, or the quarter is dropped
  from the backtest.** Never estimated, interpolated or taken from a search snippet or aggregator. Prefer
  SEC EDGAR and the company's IR site; fetch full documents. A clean eight-quarter backtest beats a
  fifteen-quarter one with four guessed rows.

### A supplied spreadsheet: the contract

State it and validate against it before computing anything.

| Column | Required | Notes |
|---|---|---|
| `fiscal_period` | yes | The company's own label, e.g. `Q2 FY2026` |
| `period_end_date` | **yes** | ISO `YYYY-MM-DD`. **The join key**; the label never is |
| `metric` | yes | Named exactly as the company reports it |
| `value` | yes | Numeric only: no text, separators or `%` |
| `unit` | yes | `USD_millions` · `USD_thousands` · `percent` · `count` |
| `source` | yes | Document and date, e.g. `8-K 21 May 2026` |
| `basis` | no | GAAP or adjusted, and a restated flag |

Validation, all mandatory: one row per period and metric (duplicates are a defect); levels only (every
YoY is computed here, a supplied growth rate is a cross-check and a disagreement is reported); **reconcile
two quarters against a primary source**, and if the sheet disagrees with the filing, stop and ask; check
the unit column against the magnitudes (thousands read as millions is a 1000x error that still looks
plausible); report the window the sheet covers. Where the sheet lacks a metric the bridge needs, fill
that one gap from filings and **label the mixed provenance**.

## Join on the period END DATE, never on a label

Up to four labels exist for the same quarter (the company's, the panel's, a vendor's fiscal label, a
vendor's calendar label), and they have been observed disagreeing by **a full year**, in both directions
on different companies. A one-year shift yields a complete, plausible, internally consistent backtest in
which every quarter is compared against the wrong year, with no downstream symptom.

1. Retrieve one **filed value** for a recent quarter with its exact period end date.
2. Find the row in the reported series whose value matches it; read any offset from that match.
3. **Confirm on a second quarter**, and on a quarter either side of any corporate action in the window.
4. Confirm the panel's returned `fiscalquarter` end dates against the filing.
5. Record the mapping on the method tab with the filed value that anchored it and the source path.

**The fiscal-label hazard.** Companies whose fiscal year label leads the calendar year are routinely
conflated by search engines and aggregators. *(On one pilot a search returned the prior year's actuals
labeled as the quarter being previewed.)* A search result describing the target quarter as already
reported is a red flag on the search result; confirm against the company's own IR calendar.

## KPI definitions: read them, do not assume them

The most common way an otherwise-correct preview estimates the wrong thing. Retrieve and record the
company's own definition:

- **Comparable sales**: which units qualify, the months-open threshold, whether e-commerce is in, what is
  excluded (fuel, gift cards), constant currency or not.
- **Revenue**: GAAP or adjusted, gross or net (a marketplace booking net revenue is not the panel's
  GMV), franchise and advertising-fund treatment.
- **Segments**: the exact boundary and any recent redefinition.
- **Units, subscribers, members**: the counting convention and any restatement.

A definition change between periods is a bridge change and forces a recalibration.

## Guidance

Record management's guidance and any stated expectation about the quarter **verbatim, with source and
date**, and whether it was raised, held or cut. **Restate it in the estimate's own units** from the filed
year-ago base (a dollar range and a percentage are not comparable until you make them so), and publish
together: the estimate, the guide in the same unit, the estimate's distance from the guide midpoint, and
the prior quarter's reported figure. *(On one pilot "6% to 7%" on the call was +6.3% to +7.3% against the
filed base.)* Where the panel agrees with guidance, say so plainly and lead with it; confirmation is often
the most valuable output. Then stop: no view on the security.
