---
name: smb-category-report
description: "Use this skill when a small or regional business (a store, dealer, contractor or local chain) wants to know how its category and the markets around it are doing: whether its softness is category-wide or lost share, whether the shopper behind the category is getting stronger or weaker, how the market around it is doing, whether its cost pressure is local, and what a dated event or promotion did. It builds one report for the business's own leadership, for a business that does not appear in the data by name; one the data can see gets company-insights-report. Not for where a named company stands against its competitors: that is company-insights-report. Not for what a listed company's quarter is tracking at: that is company-earnings-preview."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# SMB category and market report

The orchestrator. Runs the category modules once each at one-tab depth and assembles them into one
report for the owner of a small or regional business.

**Route first: "Before Phase 0" below runs before you invoke `ca-core`, read any file or call anything
else.** When the request names a business, its first action is the visibility check, and a business the
data can see is handed to `company-insights-report` without asking and without this report's reader
ever being read. *(Observed Oct 2026: runs that loaded `ca-core` and the owner reader first found the
business in the data and then asked the owner whether to switch, or carried on here.)*

**Once routing keeps the run here, three steps, in this order, before Phase 0 and before anything else:**

1. Invoke **`ca-core`**, and follow it throughout.
2. Read **`ca-core/references/readers/smb-owner.md`** and record `reader: smb-owner` (ca-core §1).
3. Read **`ca-core/references/setup-category.md`**, the subject setup (with `setup-brand.md` for the
   comparables).

No research, lookup or question to the owner comes before all three. *(Observed Oct 2026: a third of
runs went into Phase 0 without one of them, and those runs leaked internal names, narrowed the report or
skipped Gate 1 items the three files require.)*

**Modules this report runs:** `ca-category` · `ca-macro` · `ca-markets` · `ca-local-costs` · `ca-events`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this report.

**Tabs:** Summary · one tab per module that found something publishable · Sources & method. Three to
five charts per tab, eight the ceiling. **Four honest tabs beat six padded ones.**

**The order of work.** This skill resolves, probes and runs Gate 1. It writes **no pull rows itself**:
every row in the Gate 2 pull list comes from a module, written after that module was invoked (Phase 3).
*(Observed Sep 2026 on a brand report built the same way: a pull list written from discovery before any
module was loaded produced tabs that rendered, passed the build checks, and were each missing their
module's method.)*

**Name the report for the business.** The sidebar carries its name and every tab says whose markets
these are ("Acme's markets"), while no sentence claims to have measured the business itself
(`smb-owner.md`).

---

## Before Phase 0: is this the right report?

This package builds three reports, for three different readers, and the choice fixes the reader for the
whole run. **This report** reads how the category and markets around a small or regional business are
doing, for that business's own leadership. **`company-insights-report`** reads where a named company
stands against its competitors, for its strategy or analytics team. **`company-earnings-preview`** reads
what a listed company's quarter is tracking at before it reports, for an analyst covering it.

**This report is for a business that does not appear in the data by name.** Its method (comparable
businesses, the category, the markets) exists because a local business is invisible. A business the data
can see is read directly, in `company-insights-report`, whatever it asks short of a quarter.

- The request is about a listed company's quarter → hand off to **`company-earnings-preview`**. Run
  nothing here first.
- No business is named ("I own a furniture store in Columbus"), or the asker is a franchisee, licensee or
  dealer of a brand → continue to Phase 0.
- A business is named → run the visibility check, then:
  - it resolves as the business itself → hand off to **`company-insights-report`** with the business and
    the question verbatim, even when the question is about its category or markets. **Hand off; do not
    ask.** Say it in one line (*"Your business shows up in the data by name, so I'll read it directly
    against its competitors."*) and invoke that report in the same turn. Never offer to stay in this
    report: the choice is the routing rule's, not the reader's;
  - it does not resolve, or only a same-named business elsewhere does → continue to Phase 0, carrying
    what was searched into the routing test.
- A listed company and "build a report", and nothing more → ask once, before any other call:

  > Do you want to see **where [company] stands against its competitors**, or **what its current quarter
  > is tracking at before it reports**?

  Ask it as written, with no recommendation between the options. Route on the answer and ask nothing
  else to decide it, and do not ask who they are.

**The visibility check.** The first thing this skill does when a business is named: one free
`search_entities` lookup on the name (`carbonarc-mcp` Part A), and nothing else first: no other call, no
`ca-core`, no reader file. It is free and part of routing, so run it without asking the owner first. It is the only call routing may
make. The business that counts is **the one asking**: a franchisee, licensee or dealer of a brand is not
that brand, so it skips the check and gets `smb-category-report`, with the brand as a comparable.

Once the report is chosen it is not revisited in the run. If Phase 0 finds the business has live data
after all (the routing test), stop and offer `company-insights-report` as a new run; never change readers
inside this one.

---

## Phase 0: the business, how it is paid, and how visible it is

1. **Get the business's frame from the reader, in one message**: what it does, where its locations are,
   who it thinks of as competitors, its lines of business, and any dated promotion or event to read. Ask
   only for what the request did not already give. **Do not offer to narrow the report.** "Our category
   and our markets" names this report, not a subset of its tabs: every module on the list runs, and a
   tab is cut only by the evidence (nothing publishable, or the so-what test), never by a question asked
   up front.
2. **Record how the business is paid** and which instrument observes it (`setup-category.md`, "Start from
   how the business makes money"). This decides the lead tab before any data is chosen.
3. **Run the routing test** (`setup-category.md`): does the business resolve, is it thick at the grain the
   question needs, and does it appear as a field on someone else's records? The feasibility probe on 626
   is the one billed call `carbonarc-mcp` permits before Gate 1. Record the outcome. When the business
   has live card rows it belongs in `company-insights-report`: stop and offer that report as a new run,
   in one question. Otherwise this is a market run; say once, plainly and
   without apology: *"Your business doesn't appear in this data by name, which is normal for a business
   your size. What we can show is businesses like yours, your category and your markets."*
4. **Resolve the category on every level**, and **enumerate the comparable businesses from the ontology**
   (`instruments/national-analogs.md` §1 to §3): never from memory.
5. **Record the setup** per `ca-core` §2 and `setup-category.md`, in the conversation.

## Phase 1a: research, before any pull

Only these, every one web-verified with a source URL, nothing from training data:

1. **The business's locations and markets**, and its **local competitors**, retrieved, so that their
   absence from the data is a checked fact rather than an assumption.
2. **Each comparable's unit count and unit growth**, and any footprint change (closures, acquisitions)
   that would make it a cautionary comparison (`national-analogs.md` §4).
3. **Candidate events at low resolution** across the five families, each with a predicted observable
   (`ca-core` §3). Dates are retrieved; seasonality is measured, and is not a tab by default (the
   so-what test in `setup-category.md`).
4. **The promotion, if one is to be read**: its dates, its terms in one line, and where it ran.

**Phase 0 to Gate 1 is one stretch, with no stop in between** once the frame is in hand. "Approve each
step" means `gates: on`: the four gates, and nothing more. It never adds a stop to present a plan, ask
permission for free discovery, or confirm which tabs to run. Something
Phase 1a turns up (a named competitor closing, a comparable's footprint break, a dated local shock) goes
into Gate 1 as a candidate event or a note on a comparable, with its source, and the owner decides there.
*(Observed Oct 2026: two runs found a named local competitor's liquidation and stopped mid-research to
ask about it, so neither reached Gate 1.)*

## Phase 2: comparables and markets, shown before anything is measured

The comparable set, the comparison markets for `ca-markets` and the reference categories for `ca-macro`
are constructed, so their construction is shown first (`ca-core` gate 11): each comparable, why it is
comparable on the six attributes, and where the comparison breaks.

Then **Gate 1**, once, for the whole report (`carbonarc-mcp`): how the business is paid, the routing-test
outcome, entities, coverage grid, grain, comparables, markets and **the candidate events**. No pull list
yet.

**The candidate events are always on the Gate 1 list**, as a short table: what happened, when, and what
we would see if it mattered. Cover the five families that apply (the economy, the business's corporate
moves, the calendar, the industry, the business itself). "No promotion to read" removes only the owner's
own promotion and module 5's tab; the economy, industry and calendar candidates still go on the list,
because they are what the other tabs read against. *(Observed Oct 2026: every SMB Gate 1 that was
reached left the list out once the owner said there was no promotion.)*

## Phase 3: run the modules

In dependency order, each contributing **one tab**:

| | Module | Tab question (phrase it for the business in front of you) |
|---|---|---|
| 1 | `ca-category` | Is it everyone, or just me? |
| 2 | `ca-macro` | Is the customer behind my category getting stronger or weaker? |
| 3 | `ca-markets` | How is the market around me doing, and which nearby markets are coming back first? |
| 4 | `ca-local-costs` | Is my cost pressure local, or everywhere? |
| 5 | `ca-events` | What did *[the event or promotion]* actually do? *(only with a dated event or promotion)* |

`ca-category` runs first because the other tabs read against its comparables and category baseline.
`ca-macro` runs before `ca-markets` because a market's recovery is read against the national path it sets.
Module 5 is skipped without comment when the reader brought no dated promotion or event. **When card does
not observe how the business is paid**, the instrument that does leads its tab, and card reads become
context.

### The loop: each module writes its own rows

1. **Invoke the module.** It opens by invoking `ca-core`, already loaded, so that is a no-op.
2. **Read every file its opening lines and "Before anything" name**, including the instrument files and
   `instruments/panel-notes.md` for every panel it uses.
3. **Write its Gate 2 rows** from its run order, filling **Method from** with the step or file section
   each row comes from.
4. Next module.

Then present the whole list once at Gate 2, run the pulls, and clear Gates 3 and 4 once over all of
them. When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using
any series. **At build, before each tab, re-read that module's "The evidence" section.**

**A module that finds nothing publishable is cut, and the tab count drops.** So is a tab that fails the
so-what test. Failed pulls are reported in conversation and never appear in the deliverable.

### Phase 1b lands inside each module, after its findings, before its copy

For each claim: name the one published figure it is exposed to (a listed comparable's reported comps, a
published sector, wage or price statistic), retrieve it, and drop or reframe the claim if the panel
contradicts it. A finding the candidate list did not predict gets the unpredicted-finding sweep in
`ca-core` §3 before it is written.

### At Gate 4, before the findings table is shown

Check every row for four things:
- **The so-what test**: the owner's prior is named, and the row is a second-order move, not a
  description of what they already know.
- **Matching windows**: each comparison uses the same months in every period (Jan to Jul against Jan to
  Jul, never a full year against a year to date).
- **A local claim carries its parent**: any "this market is different" row shows the state's same ratio
  beside it (`ca-markets`).
- **No row measures or diagnoses the business**, and no comparable's level is offered as
  a benchmark.

## Phase 4: the Summary, written last

One block per module: the claim, two sentences, one or two figures, and the single chart that proves it.
The first block answers the owner's own question in their words. The Summary duplicates every tab's
claim, so an edit to a tab is an edit in two places.

## Phase 5: build and verify

Per `ca-core` §8 and `references/build-notes.md`. Then, without exception:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-company-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <report>.html
python3 "$CA/verify_build.py"  <report>.html
```

Both must pass. Walk every tab in a browser with every section visible: no empty mounts, no label
collisions, no chart overflowing its card, fonts loaded.

## Tabs ask, headlines answer

Every tab label is a question the owner would ask, in their words. Every headline is a claim that
answers it. Labels live in three places (sidebar, `data-screen-label`, the Summary cross-link) and all
three must match.
