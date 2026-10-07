---
name: company-insights-report
description: "Use this skill when someone wants to know where a company stands against its competitors: who is winning share, where its customers also spend, which customers it is losing, what an event did, and who is winning and why. It builds one report covering all five, for the company's own strategy or analytics team, including a private or regional company that appears in the data by name. Use it for 'build a report', 'starter report' or 'what does the data say about us' on a company, even if they don't mention competitors, and when handed over from company-onboarding. Not for what a listed company's quarter is tracking at or will report: that is company-earnings-preview. Not for how the category and local markets around a small or regional business are doing: that is smb-category-report."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Starter report

The orchestrator. Runs the five workflows once each at one-tab depth and assembles them into a single
report. Invoke **`ca-core`** first and follow it throughout; **the reader is `corporate`**: record
`reader: corporate` and read **`ca-core/references/readers/corporate.md`** (ca-core §1).

**Modules this report runs:** `ca-competitive-set` · `ca-benchmark` · `ca-audience` · `ca-events` · `ca-execution`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this report.

**Seven tabs:** Summary · five module tabs · Sources & method. Three to five charts per tab, eight the
ceiling. If a tab needs more, it is two tabs or it is over-built.

**The order of work, and the one way it goes wrong.** This skill resolves, probes and runs Gate 1. It
writes **no pull rows itself**: every row in the Gate 2 pull list comes from a module, written after that
module was invoked (Phase 3). *Observed Sep 2026, on two runs:* the pull list was written from discovery
and approved before any module was loaded. Every tab rendered and passed the build checks, and every tab
was missing its module's method: a cohort shipped without its comparator, an event read without its
control, a detection floor estimated by eye. The **Method from** column in Gate 2 is how the user sees this
before anything is billed.

---

## Before Phase 0: is this the right report?

**Route before you invoke `ca-core` or any other skill.** The routing needs the request and, for a named
business that is not listed, the visibility check below. Visibility separates this report from
`smb-category-report` only; **a listed company is always visible, so it never settles this report against
`company-earnings-preview`**: for a listed company the request decides, and "build a report" alone gets
the question below.

This package builds three reports, for three different readers, and the choice fixes the reader
for the whole run. **This report** reads where the company stands against its competitors, for the company's own strategy or analytics team. **`company-earnings-preview`** reads what a listed company's quarter is tracking at before it reports, for an analyst covering it. **`smb-category-report`** reads how the category and markets around a small or regional business are doing, for that business's leadership.

- The request is about competitive position: share, shared customers, which customers are leaving, what an event did, who is winning → continue to Phase 0.
- The request is about a quarter: what it is tracking at, what the company will report, the print, an estimate or guidance → hand off to **`company-earnings-preview`** with the company and the question verbatim. Run
  nothing here first.
- No business is named and the asker runs a local or regional business ("I own a furniture store"), or
  the asker is a franchisee, licensee or dealer of a brand → hand off to **`smb-category-report`** with
  the business and the question verbatim. Run nothing here first.
- A business that is not listed is named → run the visibility check. It resolves as the business itself →
  continue to Phase 0, including when the question is about its category or markets. It does not resolve
  → hand off to **`smb-category-report`** with the business and the question verbatim.
- A listed company (a ticker, or a company you know is public) and "build a report", "starter report" or
  "what does the data say", and nothing more → ask once, before any call or skill:

  > Do you want to see **where [company] stands against its competitors**, or **what its current quarter
  > is tracking at before it reports**?

  Ask it as written, with no recommendation between the options. Route on the answer. Ask nothing else to decide it, and do not ask who they are.

**The visibility check.** One free `search_entities` lookup on the business's name (`carbonarc-mcp`
Part A), and nothing else: no other call, no `ca-core`, no reader file. It is the only call routing may
make. The business that counts is **the one asking**: a franchisee, licensee or dealer of a brand is not
that brand, so it skips the check and gets `smb-category-report`, with the brand as a comparable.

A question about the company's local markets or its local costs is outside this report's five tabs: say so
once, in the Gate 1 scope line, and keep the rest of the run.

Once the report is chosen it is not revisited in the run. A user who wants two reports gets two runs.

---

## Phase 0 — resolve, gate, and stop early if you must

This is where the run can end, so do it before promising anything.

1. **Resolve the company.** `search_entities`. Expect **more than one node**, and do not assume any one
   of them is a superset — an instrument you need may sit only on a node you did not survey. Record
   every node and what each serves.
2. **Survey live.** `get_insights_from_entity` at `limit=250` on **each** representation.
3. **THE DEMAND-ROUTE GATE — the first pull of the run.** A probe on **626** against the resolved entity.
   This is the **feasibility probe**, and it is the one billed call `carbonarc-mcp` permits before Gate 1
   — named there as the exception, not a violation of it. One call, in the fixed shape its probe rule
   gives, binary outcome.
   These verdict labels (own-merchant, retailer-mediated, coverage gap, demand route) go in the setup
   record only, never in a message to the reader: say what they mean ("card spend sees your sales
   directly").
   - Rows → **own-merchant**. The brand is where the card is swiped. Proceed.
   - No rows, and the brand sells through other companies' stores → **retailer-mediated**. Stop the
     standard report. Say it in client voice: *"Card sees the store, not your product in the basket, so
     total demand is not observable here. What is observable is channel and attention."* Offer that
     narrower read and hand to a human.
   - No rows, but the brand is where the card is swiped → a **coverage gap**. Probe other live card
     panels only, then proceed on one that returns rows or stop: no live panel, no report
     (`setup-brand.md`, demand route). If the business is **not listed**, end that stop with one question
     offering a read of its category and the markets around it (`smb-category-report`) as a new run; the
     reader changes with the report, so it is never continued in this one.

   Running this first is the point. The alternative is a company several tabs in before hearing what
   card cannot see.
4. **Record the setup** per `ca-core` §2 — entities, demand route, tiers with unit growth, basis, disclosure,
   instrument verdicts. In the conversation, not a file. Every later phase reads it from there.

## Phase 1a — research, before any pull

Three things, and only these:

1. the subject's **fiscal calendar**
2. **unit count and unit growth for every peer**, not just the subject
3. **candidate events at low resolution** — name and rough date, across the **five families** (macro /
   corporate / calendar / industry / company). No sourcing pass yet.

Everything web-verified with source URLs; nothing from training data, including for famous brands.

Disclosed comps, ticket splits, digital mix and management language are **not** gathered here — they are
gathered in **Phase 1b**, against a claim that exists. Research without a claim to serve is the phase
with no ceiling. See `ca-core` §3.

## Phase 2 — peer set

Declared competitors are always benchmarked and are never removed by data. Confirm the list with the
reader. Prefer the set they think of as competitors over the categorical one — and if `ca-competitive-set`
surfaces something material, add it.

Then **Gate 1**, once, for the whole report (`carbonarc-mcp`): entities, coverage, grain, peers and the
candidate events. No pull list yet; that comes from the modules. **When the request asked about the
business's local markets or local costs** (often a hand-off from `smb-category-report`), Gate 1 ends its
scope line with one plain sentence saying this report does not read those, in words, never a report or
skill name: *"This report reads you against your competitors and the category nationally; it does not
rank your local markets or your local costs."*

## Phase 3 — run the modules

In dependency order, each contributing **one tab**:

| | Module | Tab question (phrase it for the event actually chosen) |
|---|---|---|
| 1 | `ca-competitive-set` | Where else do our customers spend? |
| 2 | `ca-benchmark` | Is this us or the category? |
| 3 | `ca-audience` | Which customers are we losing? |
| 4 | `ca-events` | What did *[the event]* actually do? |
| 5 | `ca-execution` | What is behind *[the winner]*'s growth? (The winner may be the subject: then *What is behind our lead?*) |

Competitive-set runs first so surfaced peers can join the benchmark. Execution runs last because it needs
a winner. There is no macro tab in this report; do not offer one.

### The loop: each module writes its own rows

The Gate 2 pull list is assembled from the modules, one at a time, in the order above:

1. **Invoke the module.** It opens by invoking `ca-core`, already loaded, so that is a no-op.
2. **Read every file its opening lines and "Before anything" name**, including the
   `ca-core/references/instruments/` file. Those files hold the recipes the module only summarises.
3. **Write its Gate 2 rows** from its run order, filling **Method from** with the step or file section
   each row comes from, and open the group with the files you read.
4. Next module.

Then present the whole list once at Gate 2, run the pulls, and clear Gates 3 and 4 once over all of them. When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using any series.
**The exception is a module that needs another's findings**: `ca-execution` has no subject until the
benchmark names a winner. Write its rows after the benchmark's findings are in, as a short second pull
list with its own Gate 2.
**At build, before each tab, re-read that module's "The evidence" section**: the chart forms, floors and
denominators there are what a tab built from memory drops, and the drop looks exactly like a finished tab.

**A module that finds nothing publishable is cut, and the tab count drops.** Five tabs is a default, not
a quota. Failed pulls are reported in conversation and never appear in the deliverable.

### Phase 1b lands here — inside each module, after its findings, before its copy

A module's claims do not exist until its pulls are back, so the contradiction check runs there and not in
Phase 1a. For each claim the tab intends to make: name the **one** disclosed figure it is exposed to,
retrieve that figure, and **drop or reframe the claim if the panel contradicts it**. Fully source the
event that was actually chosen. **No panel-versus-reported table appears anywhere.**

This is `carbonarc-mcp` Gate 4, findings before narrative, reached from the other side: the same
checkpoint, not a second one.

## Phase 4 — the Summary, written last

One block per module: the claim, two sentences, one or two headline figures, and the single chart that
proves it. Not a recap — the one thing an executive must leave with.

**It duplicates every tab's claim.** Any later edit to a tab has two places to change, and the Summary is
the one that gets forgotten. Grep the retired wording before calling an edit done.

## Phase 5 — build and verify

Per `ca-core` §8 and `references/build-notes.md`. Then, without exception:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-company-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <report>.html
python3 "$CA/verify_build.py"  <report>.html
```

Both must pass. Do not write that path as a literal; `ca-core` §5 says why.

It must pass. Walk every tab in a browser: no empty mounts, no label collisions, no chart overflowing
its card, fonts actually loaded. The geometry checks must run with every section **visible** — hidden
sections measure zero and report clean.

## Tabs ask, headlines answer

Every tab label is a question a business intelligence or analytics reader would ask. Every headline is a
claim that answers it. Labels live in **three** places — sidebar, `data-screen-label`, and the Summary
cross-link — and all three must match.
