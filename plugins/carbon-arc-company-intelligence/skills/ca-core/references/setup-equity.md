# Setup: a public company, previewed against its reported figures

Read during `ca-core` §2 when the subject is a listed company and the question is what it will report.
It adds to the shared checklist and to `setup-brand.md`, which also applies (peers, card instruments,
cross-shop). Call shapes and panel quirks are in `references/instruments/equity-panel.md`; the reported
side is in `references/instruments/reported-figures.md`. Read both before the first pull.

## What this subject adds to the setup

- **The print**: ticker, fiscal convention, the target quarter's label and its **exact start and end
  dates** (web-verified from the company's own IR calendar, never derived from a fiscal-year-end month),
  the earnings date and whether it is confirmed, and confirmation that the quarter has **not already
  been reported** (a preview after the print is a review; say so).
- **The anchor metric, named exactly as the company reports it** ("US comparable sales, ex-fuel", not
  "comps"), chosen from what the company actually discloses, presented to the user as options, never
  auto-selected. At most two or three.
- **The reported-figures source**, chosen by the user at the start: **public filings and releases**
  (the default and fully auditable) or **a spreadsheet they supply** (validated against the contract in
  `reported-figures.md`). Record the choice; it is named on the method tab.
- **What the panel can and cannot see** (below), which decides the anchor.
- **The ticker roll-up as the backtest's panel series**, validated once against the sum of its brands
  and checked for acquisitions in the window (`equity-panel.md`).
- **The candidate events**, per `ca-core` §3 and the event sweep below, laid against the **backtest
  window** as well as the current quarter: a one-off inside a calibration quarter biases the correction
  the estimate is built on.

## Phase 1a for a public company

In addition to `setup-brand.md`'s fiscal calendar and peer unit growth: the company's **reported KPI
set**, **guidance verbatim** with date and source, the **segment and geographic revenue split**,
**franchise versus company-operated mix** and any refranchising, **store count and opening cadence**,
**pricing actions** in or before the quarter, and the **company's own definition of the anchor metric**.
Every figure from a primary source (10-K, 10-Q, 8-K, the release, the IR site, the transcript), fetched
in full. Trade press frames narrative only.

### The event sweep: research what happened in the quarter

For this subject the candidate list is **not** low resolution. The fiscal quarter is the unit of
analysis, and an event inside it is often the answer to "what drove it". Search, never recall, across
the five families for **the target quarter and the weeks since it closed**:

- **The company**: its releases, 8-Ks and the last call transcript (pricing, promotions, launches,
  loyalty, closures, management or strategy changes).
- **The peers**: the same sources, plus any incident at a peer, which is an industry event for the
  subject.
- **The category**: recalls, food- or product-safety incidents, regulatory actions, supply disruptions.
- **Macro and calendar**: shifts that landed inside the quarter's weeks.

Each candidate carries a **primary-source date** (confirmed with the user before it becomes a marker), a
**predicted observable**, a **predicted direction**, and **where the effect should be strongest** if it is
real. Show the list at Gate 1 with what was searched and found nothing.

### The materiality screen: measure what could matter, never force one

A candidate is **measured** (with `ca-events`' method, inside `equity-quarter`) only when it could
plausibly move the subject's weekly demand by more than an ordinary week does, or sits at a peer large
enough to move the category read. Before the pull that is a judgment; once the data is in, the detection
floor settles it. **Measure at most two per preview**, and name any that cleared the screen but were
left unmeasured. Every other candidate keeps a one-line verdict.

**When nothing clears the screen, say so in one line.** A quarter with no identifiable event is a
result, and it points the explanation at price, mix or the category. Never promote a weak candidate to
fill the space.

## Which companies this works on: run before any billed call

The card panel measures **US consumer card spend at a merchant**. The company reports **revenue** (or
comps, or a segment). Those are the same thing only for a US-centric, consumer-facing, company-operated
business where the brand is the merchant. Every deviation is a wedge between the signal and the number,
and it must be **sized**, not caveated.

| Fit | Examples | What to do |
|---|---|---|
| **Works well** | specialty and apparel retail, company-operated restaurants, e-commerce and direct-to-consumer, travel and booking, consumer subscriptions, fitness, grocery and convenience banners, consumer fintech | Proceed |
| **Works with a named adjustment** | mixed franchise and company-operated; international-heavy; marketplace or GMV names; heavy gift-card or deferred-revenue seasonality | Anchor on the observable segment (company-operated sales, the US or Americas segment, systemwide sales); say what is out of reach |
| **Pure franchisor** | royalty-based revenue | Preview systemwide sales or same-store sales if reported, labeled as such; never consolidated revenue |
| **Wholesale consumer-goods brand** | sold through other retailers | Stop: card sees the retailer, not the product. Say so in client voice; the demand route gate in `setup-brand.md` settles it |
| **B2B or enterprise** | no consumer card leg | Stop and say so |
| **No clean panel tag** | brand volume sits outside its own tag | Stop unless a validated alternative exists |

The honest output for a name that fails is a scope stop, not a hollow preview.

## What the panel can and cannot see: required, rendered

Build it as a waterfall from the most recent reported value of the anchor metric down to the share the
panel can plausibly see, every line from a filing:

| Layer | Sourced from |
|---|---|
| Reported anchor metric | filing or release |
| less non-US revenue | segment disclosure (often the largest wedge) |
| less franchised or licensed revenue | franchise disclosure (a mismatch, not a percentage: the panel sees the consumer's spend, the company books a royalty) |
| less wholesale, B2B, other | revenue disaggregation note |
| less non-card tender (cash, ACH, gift-card redemption, EBT) | rarely disclosed: state it as unsized, and name it as a risk if its mix is shifting |
| = observable base | derived |

**Observability picks the anchor; disclosure picks the metric; what the company guides decides what you
must bridge to.** If the observable base is a minority of consolidated revenue, re-anchor on the segment
the panel covers and say plainly that consolidated revenue is out of reach. *(On one pilot, 81% of sales
sat in the Americas segment while two invisible segments moved in opposite directions, so the Americas
became the anchor, and the company's total guide was bridged to only under a stated assumption.)* Card
spend includes new stores, so it maps to **net sales, not comps**; the gap between them is the unit-growth
explanation the calibration will need.

**A bridge that changes mid-history breaks the backtest**: refranchising, an acquisition, a divestiture,
a segment redefinition, a fiscal-calendar change. Mark the quarter and calibrate only on the
post-change period, unless an acquisition can be rebuilt pro-forma (`equity-panel.md`).

## Peers and private competitors

Resolve three to five peers and the category entity: the whole question "is it the company or the
category" lives here. **Try to include at least one private competitor where one genuinely belongs**: it
is often the only place a reader can see it. It must clear the sample floor, it **can never be
backtested** (no filings), and it is badged panel-only. Where you looked and found none that resolves,
say so.

**Panel-versus-reported runs on the target and nobody else.** Peers appear on the panel basis only, for
relative position. A peer that has already reported the overlapping quarter is legitimate category
context and may be cited; it may not score the panel or adjust the target's calibration.
