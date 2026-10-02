# Instruments: the panel side of a preview

Call shapes and the silent failures that have produced confidently wrong numbers. Verified across six
preview pilots (Aug 2026). `carbonarc-mcp` governs everything not stated here.

## One panel series for the calibration and the quarter-to-date read

The estimate is `quarter-to-date panel YoY − calibration gap`, so **the gap and the quarter-to-date read
must be computed on the same panel series, same filters, same basis.** Mixing access paths or bases
transfers the whole coverage difference into the headline number.

## The ticker roll-up is the backtest's panel series

- **Resolve the `ticker` representation on the symbol**, never the company name: semantic search on a
  name against the ticker representation returns wrong tickers confidently. The roll-up aggregates every
  brand beneath the company, so the backtest is one series against one reported line.
- **Validate it once against the sum of the resolved brands.** *(On one pilot the ticker matched the sum
  of ten banners within 0.06% for fourteen straight quarters; the residual was a banner that returns zero
  rows alone but contributes inside the roll-up.)* Then use the ticker.
- **Reconciling is necessary and not sufficient: compare each brand's share of panel spend against its
  share of reported revenue, at the first gate.** A roll-up can match its brand sum exactly and still
  measure the wrong company, because the sum says nothing about the weights. *(On one pilot the largest
  brand, 38% of reported revenue, carried 0.1% of panel spend, while two brands worth 41% of revenue
  carried 99%.)* Consequences: the calibration gap becomes a mix artifact that moves exactly when the
  preview is interesting; brand-level reads are unavailable; this is a confirmed break by arithmetic
  (`gating.md` §11). The honest anchor may be the covered sub-segment, with the missing brand carried as
  a measured line on the bridge.
- **The roll-up is retroactive across acquisitions; the income statement is not.** The ticker counts
  every brand currently mapped beneath it for all history, including years before a deal closed. *(On
  one pilot the gap ran about −6pp before a deal and −41, −65 and −66pp in the three quarters after, and
  the series never looked broken.)* The fix, in order: check whether the earliest panel quarters already
  imply the combined company; **rebuild the reported leg pro-forma** by adding the acquired company's own
  reported revenue to every pre-close quarter; drop the transition quarter; where the acquired company
  never filed, confine the backtest to the post-close period, and below five same-basis quarters there is
  no estimate.
- **Plausibility anchor**: the resolved spend level against disclosed revenue times the observable share.

## Date resolution: a selection rule

- **`fiscalquarter` for the target.** It resolves to the entity's own financial calendar (verified
  against a 4-5-4 retailer's filing), so fiscal alignment is native. It is also the most expensive
  resolution observed.
- **`week` for peers and the category.** Because `fiscalquarter` is per entity, peers' "Q2" are
  different date ranges. Pull them weekly and bucket into the target's exact fiscal windows.
- **`day`** where the tail-fill check needs it. **`month`** is never the grain for a fiscal-period read.
- Confirm each resolution appears in the response's available resolutions before promising it, and
  **pre-flight every entity and insight combination with `get_filter_options`**, which is free.
- **The response lists the resolutions for that call's entity set, not for the target.** A call that
  mixes the ticker with a category entity comes back without `fiscalquarter`, because a category has
  no financial calendar. Never tell the user `fiscalquarter` is unavailable from a mixed call: confirm
  it on the ticker alone. *(Observed Sep 2026 in evals: of three identical probes, the two that
  included the category entity listed no `fiscalquarter`, and both runs then planned to rebuild the
  fiscal windows from daily data.)*

**Cross-validate the bucketing against the native pull.** Weekly-bucketed YoY must reproduce the native
`fiscalquarter` YoY; **levels will not match**, because panel weeks run Saturday to Friday while 4-5-4
fiscal weeks run Sunday to Saturday. *(Verified: −1.007% bucketed against −0.97% native, on levels about
2% apart.)* Matching YoY with mismatched levels is the correct signature. Apply the identical construction
to the prior-year window and confirm both are thirteen weeks.

## Row defects in `fiscalquarter` pulls

- **A partial row at the head**: a window that opens mid-quarter returns that quarter as a normal-looking
  row (one pilot: $3.7M against a normal $247M). Identify by magnitude; drop everywhere.
- **A partial row at the tail**: a pull through today returns the current incomplete quarter. Identify by
  magnitude and by its date being the observed max date, not a quarter end; drop everywhere.
- **Duplicate date rows inside one quarter for one entity.** Aggregate by entity and fiscal-quarter label;
  never assume one row per cell.
- **53-week years**: a quarter end a week later than the prior year's marks the fourteen-week quarter.
  Its YoY and the next year's lapping YoY are both distorted; flag both.
- Pull **at least fourteen quarters** so about ten backtest quarters have a prior-year comparator, and
  compute YoY by key on the fiscal-quarter label, never by row position.

## The quarter-to-date windows

Two pulls, identical construction: **quarter start to the fill-truncated as-of date**, and **the same
calendar dates one year prior**, truncated identically. Same brand filter, same basis, same truncation;
any asymmetry transfers straight into the estimate. Drop the trailing partial week. Probe one short
window at the intended grain before the full matrix.

## Volume versus price

Pull spend and transactions always. **Derive average ticket as spend ÷ transactions**, which satisfies the
identity by construction. The published average-transaction insight accepts only `mean`, so across a
quarter it returns a mean of period means and breaks the identity *(one pilot: published −1.43% against
derived −0.18%)*; keep it as a direction check only.

## Cost and row limits

Number of entities is nearly free; **window length** is the main cost driver; the detailed panel can cost
about twenty times the complete panel for the same pull. None of this should drive an analytical
decision. **Keep entities × periods under about 100 rows**; above that the tool returns an auto-generated
summary instead of rows, and those have been materially wrong. Slice and compute yourself.
