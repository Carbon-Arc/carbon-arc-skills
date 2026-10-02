---
name: ca-benchmark
description: "Use this skill when someone wants to know whether a consumer brand's move is its own or the whole category's: who is winning or losing share, how it compares with named rivals, and whether it is selling less or selling cheaper, even if they only ask why their numbers are down. It reads the brand's demand against named competitors, split into transactions and average ticket. For what drove one fiscal quarter of a listed company, use equity-quarter; for a full report, use this package's report skill."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Method validated on a restaurant pilot and on specialty-retail and luxury pilots. Own-merchant brands only."
---

# Benchmark — is this us or the category?

Invoke **`ca-core`** first and follow it throughout: the setup checklist, the Phase 1b contradiction
gate, the six evidence gates, the client-facing voice. The method for this module lives in
**`ca-core/references/instruments/card-core.md`** — read it before pulling. This file is the run order.

---

## What it answers

1. Is the brand's demand growing or shrinking, against named competitors?
2. Is any change **volume or price** — selling less, or selling cheaper?
3. Is the move **the brand or the market**?

## Before anything

- **Have the setup.** Entities and representations, tiers and peer set, spine measure, volume floor,
  fiscal note — `ca-core` §2 and `references/setup-brand.md`. Not established yet → establish it here before pulling.
- **Assert the demand route.** Own-merchant only. Retailer-mediated → stop with the client-facing scope line
  in `ca-core/references/setup-brand.md`; card sees the retailer, not the brand.
- **Re-survey live.** `get_insights_from_entity` at `limit=250` on every representation. Any instrument
  verdict you were handed is a dated prior.
- **Phase 1a has run.** Unit count and unit growth for every peer are in hand — this module cannot rank
  growth without them. Disclosed comp, traffic/ticket split and management language are **not** collected
  here; they are retrieved in Phase 1b, one figure per claim, before this tab's copy is written.

---

## Run order

**1. Peer set.** Declared competitors are always in and are never removed by data. Add anything material
that `ca-competitive-set` surfaced. Confirm the list with the reader before pulling — they know their
competitive set better than any enumeration.

**2. Spend and transactions.** Insight **626** and **627**, `location_resolution: "us"`.
- Monthly for the four-to-six brands that will carry the lead chart, from 24 months before the window.
- Quarterly or half-yearly for the full ranked set.
- **The transaction-method split and the result-set cap both bite here.** Both are MCP mechanics rather
  than benchmark mechanics, so they live in `carbonarc-mcp/references/data-state.md` (the transaction-method
  split) and `carbonarc-mcp/references/pull-sizing.md` (the result-set cap). Read both before this pull:
  getting either wrong doubles a ticket or replaces a table with prose.

**3. Category baseline.** The same insight on a **category entity** (`representation: "category"`),
which is how you answer "is it the market" — and doubles as the completeness control in `gating.md` §5.

**4. Unit growth per peer**, from Phase 1a. Panel growth is comp plus a brand-specific slice of expansion;
without it a ranking silently ranks "comp plus however much of your expansion the panel caught."

---

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Monthly YoY by named company** *(lead)*. The subject plus three or four brands **the reader thinks
   of as competitors**, which is rarely the categorical set. Plain YoY, zero line, no reference label.
2. **The ranked cut** on the latest complete comparable period — H1 vs H1, or trailing twelve months.
   Never a calendar year that closed more than a couple of quarters ago. Volume-gated, `n` printed.
3. **Decomposition, subject and outperformer side by side.** `spend = transactions x ticket` for each,
   monthly. Where one brand has broken away, the reader's next question is about *them*.
4. *(optional)* **The conventional benchmark, demoted**, with an honest note on why it flatters or
   punishes. Only if the client is routinely shown one.

Usually three to five charts. Whatever the form, named companies lead: if a constructed aggregate leads,
the tab is wrong (`card-core.md` §1).

## Gates that bite here

`gating.md` in full, and specifically: the **volume gate** on every ranked cut; **recency**, because a
stale window can carry a conclusion that has already reversed; the **two-year stack** before any
"recovery"; and the **category test** — if the subject sits within half a point of its category, the
headline is *it is the category*, not a brand story.

## What this module will not say

- **Not revenue.** Panel spend is a sample. Never "top line", never "sales" of a panel figure.
- **Not the traffic/ticket split of a brand that discloses its own**, where the panel disagrees. Phase 1b
  vetoes it. The split is for peers who disclose nothing.
- **Not digital or channel mix.** `transaction_method` had the wrong sign against disclosure on the pilot.

## If this module is run on its own

It may be the first thing that has run, so it cannot assume the orchestrator's setup happened.

- **Demand route unset** → run the gate here: a probe on **626** against the resolved entity, before
  designing anything. Retailer-mediated ends the run with the client-facing scope line.
- **Phase 1a not done** → **run it now, and only it**: fiscal calendar, unit count and unit growth for
  every peer, candidate events as names and rough dates. Nothing else — the disclosed figures come later,
  against a claim.
- **Before you write this tab's copy, run Phase 1b on it.** For each claim the tab intends to make,
  retrieve the one disclosed figure that claim is exposed to and drop or reframe the claim if the panel
  contradicts it. It is a gate, not context: without it this module can publish a figure that contradicts
  a public filing, which is the one failure a reader will always catch.
- Write back whatever you learn, so the next module does not repeat it.

## Output

Standalone: a Brief, not a tab (`ca-core` §8). Inside the starter report: this tab only.
Build per `ca-core` §8 and `references/build-notes.md`. Run the two build gates before shipping,
`verify_report.py` and `verify_build.py` (`ca-core` §5 and §8).
