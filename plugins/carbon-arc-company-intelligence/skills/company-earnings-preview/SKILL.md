---
name: company-earnings-preview
description: "Use this skill when someone wants to know what a listed consumer company's current quarter is tracking at before it reports: an earnings preview, a pre-print read, what they will report, or a quarter-to-date read on a named ticker, even if they only ask how the quarter is going. It builds the full preview: an estimate of the reported metric, checked against the company's own reported history, plus what drove the quarter, peers, shared customers and whether other datasets agree. Not for a company's competitive position with no quarter in view: that is company-insights-report."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Assembled from an earnings-preview skill validated end to end across six consumer names (Aug 2026). One ticker per run; dashboard format only."
---

# Earnings preview

The orchestrator. It answers one question before the company does: **what is the quarter actually
tracking at?** Invoke **`ca-core`** first and follow it throughout; **the reader is `investor`**:
record `reader: investor` and read **`ca-core/references/readers/investor.md`** (ca-core §1). The subject setup is in **`ca-core/references/setup-equity.md`** and **`setup-brand.md`**.

**Modules this preview runs:** `equity-backtest` · `equity-quarter` · `ca-events` · `ca-benchmark` · `ca-competitive-set` · `ca-cross-signal` · `equity-next-quarter`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this preview.

**Two halves, both required.** Half one is the estimate with everything a reader needs to discount it.
Half two is every other read on the business, and it is not an appendix: it is the part nobody else can
produce. **When the panel does not track the company, half one becomes a no-estimate statement and half
two ships in full.**

**The order of work.** This skill anchors the print, runs the scope check, researches and runs Gate 1. It
writes **no pull rows itself**: every row in the Gate 2 pull list comes from a module, written after that
module was invoked (Phase 2). *(Observed Sep 2026 on a brand report built the same way: a pull list written
from discovery before any module was loaded produced tabs that rendered, passed the build checks, and were
each missing their module's method.)*

---

## Before Phase 0: is this the right report?

This package builds two reports on a company, for two different readers, and the choice fixes the reader
for the whole run. **This report** reads what a listed company's quarter is tracking at before it reports, for an analyst covering it. **`company-insights-report`** reads where a company stands against its competitors, for the company's own strategy or analytics team.

- The request is about a quarter: what it is tracking at, what the company will report, the print, an estimate or guidance → continue to Phase 0.
- The request is about competitive position with no quarter in view: share, shared customers, which customers are leaving, who is winning → hand off to **`company-insights-report`** with the company and the question verbatim. Run
  nothing here first.
- It could be either (a listed company and "build a report", and nothing more) → ask once, before any
  call:

  > Do you want to see **where [company] stands against its competitors**, or **what its current quarter
  > is tracking at before it reports**?

  Route on the answer. Ask nothing else to decide it, and do not ask who they are.

Once the report is chosen it is not revisited in the run. A user who wants both gets two runs.

---

## Phase 0: two questions in one turn, then anchor the print

First look up what the company reports: one search of its latest earnings release for the KPIs it
discloses, and nothing else. Then ask once, together:

> 1. **Which reported metric should I estimate?** (Offer what the company actually discloses: net sales, a
>    segment, comparable sales, a unit KPI. Recommend one and say why in a clause; the user chooses.)
> 2. **What should the panel be scored against?** Public filings and releases (the default, fully
>    auditable) or a spreadsheet of reported figures you supply (I'll check it against the filings).

**State no facts about the company in this turn** beyond the KPI names: not its franchise mix, fiscal
calendar, reporting date or how well the panel fits it. Those come from Phase 1a with sources; said
here, they come from memory. *(Observed Sep 2026 in evals: all six runs of this turn stated the
company's operating model and reporting cadence without a single search.)*

The deliverable is a dashboard. Then anchor the print per `setup-equity.md`: fiscal dates, earnings date,
not already reported, KPI definitions, guidance verbatim.

## Phase 0.5: scope check and what the panel can see

Run the fit table in `setup-equity.md` **before any billed call**. A failing company gets a scope stop in
client voice, not a hollow preview. Then build the waterfall of what the panel can and cannot see, and let
it pick the anchor.

## Phase 1a: research what happened in the quarter, before the first gate

Run the event sweep and the materiality screen in `setup-equity.md`: search the target quarter and the
weeks since it closed across the five families, and keep two to four candidates, each with what it would
show if real, laid against the calibration quarters as well as the current one. Mark which clear the
screen and will be measured. **Show them at the first gate with the coverage table**, and make every
Gate 2 row name the candidate it tests. Retrieve dates; measure seasonality. When nothing clears the
screen, say so at the gate; the preview does not need an event.

## Phase 1: entities

Resolve the ticker on its symbol and every brand in the anchor; validate the roll-up (sum and weights) and
check for acquisitions. **Survey the ticker at `limit: 250`** (the default truncates). Check each brand with `get_filter_options`
(free), which shows the spine is attached and what it accepts, **not** that it returns rows: put every
brand in the feasibility probe, and only returned rows show the panel sees it. A brand with no rows is a
gap in the roll-up, sized in the waterfall.
Resolve three to five peers and the category; try for one private competitor where one genuinely belongs.
Then **Gate 1**, once, for the whole preview (`carbonarc-mcp`). No pull list yet.

**What this preview's Gate 1 adds**, because for this reader the backtest leads:

- **The backtest first**: say it is the first module after approval, how many reported quarters it can
  be scored on (on one consistent bridge, after any break), and that no estimate ships unless the
  backtest supports one.
- **Every retrieved date and figure carries its source, as a link to the document**: the quarter's dates, the earnings date or its
  absence, the guidance, the unit counts. A reporting pattern ("usually reports in late October") is a
  claim like any other: source it from the past releases or leave it out.

## Phase 2: run the modules; each writes its own rows

Assemble one Gate 2 pull list from the modules, in this order. For each: **invoke it, read every file its
opening lines and "Before anything" name, then write its rows**, filling **Method from** with the step or
file section each row comes from. Each module carries call shapes, silent failures and gates that exist
nowhere else; a row written from this file alone omits them, and the tab it feeds still looks finished.
Present the list once at Gate 2, pull, and clear Gates 3 and 4 once. When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using any series. **At build, before each tab, re-read
that module's "The evidence" section.**

The tab numbers below are the ones the report renders. Summary (01) and Sources and method (07) are
written by this skill, not a module.

| Tab | Module | The reader's question |
|---|---|---|
| 01 | *this skill, Phase 5* | Summary |
| 02 | `equity-backtest` | What is the quarter tracking at? *("Can we use the panel?" is a section of it)* |
| 03 | `equity-quarter`, invoking `ca-events` for each candidate that cleared the screen | What happened, and what drove it? |
| 04 | `ca-benchmark`, then `ca-competitive-set` | Is it the company or the category? Are the same customers shopping elsewhere? |
| 05 | `ca-cross-signal` | Do the other datasets agree? |
| 06 | `equity-next-quarter` *(only with two or more settled weeks)*, carrying each measured event forward | Is it carrying into the next quarter? *(name the quarter)* |
| 07 | *this skill, Phase 4* | Sources and method |

**Events live inside the quarter, not on their own tab.** `ca-events` is invoked from `equity-quarter` for
each candidate that cleared the screen and writes its own rows; its recovery (or decay) is read on tab 06.
A user asking what one dated event did, outside a preview, still gets `ca-events` on its own.

**The supplementary reads go in the same pull list**, written by their own modules (`ca-cross-signal`,
`ca-competitive-set`), not held back until the estimate is proven: a second modality can rescue a read
whose primary series breaks.

**Peers on tab 04** (apply when writing `ca-benchmark`'s rows): pull them weekly and bucket into the target's fiscal windows; peers are on the panel
basis only, for relative position. **One basis per level**: the estimate is on the ticker roll-up; peer
comparisons use one basis for every entity including the target; where the two would put two levels for
the target on the page, quote it once and express the other as a difference. **Cross-shop runs every
time**: read the rate, never the raw count.

A module that finds nothing publishable is cut. A panel that turned out frozen, thin or broken is a finding
for tab 02, stated as scope.

## Phase 3: before any copy

Run the break tests with tiers, the defect sweep and the external check (`ca-core` §4). For each claim,
check the one disclosed figure it is exposed to. Recompute the estimate without its largest single element.
This is `carbonarc-mcp` Gate 4.

## Phase 4: tab 07, Sources and method (last tab)

**The arithmetic is not here**: the bridge from panel to estimate lives on tab 02, where the number is, and
this tab links to it and to the attached backtest files. Headings are questions a reader can parse:
*Checks on the data* (fiscal, calendar, fill,
elapsed share, each as pass, fail or adjusted) · *How the panel was corrected* (and what the alternative
gives) · *What could move this number* (named, sized, which way) · *Where the data comes from* (every panel
by catalog name with population and observed data-through date, **the reported source**, the filed value
that anchored the period mapping) · *What we looked for before we looked* (a compact table of the candidate
events, each marked measured or verdict only, pointing to the tab that carries it). Close with what the preview is silent on: margin,
EPS, inventory, and the stock.

## Phase 5: tab 01, Summary (first tab, written last)

A written note, **roughly 800 to 1,100 words**, because this reader lifts it into an email and needs the
context to travel. Every paragraph still within budget (`ca-core` §5): the length comes from more facts and
more charts, not longer paragraphs.

1. **Headline**: a claim, twelve words at most.
2. **Standfirst**, two or three short paragraphs: the estimate and its average miss in words, and the gap
   to **guidance restated in the estimate's units**. Where the band is as wide as the company's usual
   variation, lead with that. End with a link to tab 02 for how the number was built.
3. **Four claim-headed sections**, one idea each, **two charts per section**: a cross-section and its trend.
   Where an event was measured, one of the four is about it: what it did to the quarter and how much of
   the gap remains.
4. **What could move this number**: three named, sized risks and the strongest contrary evidence.
5. One closing line on what the preview does not address.

**The number and its gap to guidance, and nothing else of the estimate, on this tab.** The estimate block,
the read-against table, how to hold this number, the estimate-against-guide chart and all backtest
apparatus live on tab 02; the backtest is named here in one clause. A reported-history line with this quarter as a marked terminal point is fine. **Every
number once, one sign convention. No consensus anywhere.** Regenerate this tab after any other tab changes.

## Phase 6: build and verify

Per `ca-core` §8 and `references/build-notes.md`. Badges on every figure: ■ panel · ▲ disclosure · ◆ public
· ⊘ derived (the estimate, the correction, the band). Every quarter-to-date figure carries as-of, days
covered, share elapsed and the fill truncation, on the figure itself.

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-company-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <preview>.html
python3 "$CA/verify_report.py" <preview>.html --budgets
python3 "$CA/verify_build.py"  <preview>.html
```

All must pass. Then walk it once asking only these, because the arithmetic can be right and the framing
wrong: **Two-minute test**: reading only the headline and first paragraph, can you state the estimate, what
drove it, the competitive read and the so-what, without understanding a backtest? **Out of context**: would
any sentence or chart title read as a view on the stock if quoted alone? **Does each chart's form agree with
its title** (a "flat" claim on a zoomed axis refutes itself; sequential data is a line, not bars)? **Does
each claim stay inside what its pull supports** (no national claim from a CBSA pull)? **Is every break claim
tiered, and is the count of break claims stated?**

Naming: `<ticker>-<fiscal-quarter>-preview.html`; page title `<Company> (<TICKER>) <FQ> Earnings Preview`.
