---
name: "carbonarc-mcp"
description: "Use this skill before any call to the Carbon Arc MCP about companies and their brands, including one-off questions: resolving one, checking what data exists for it, looking up a dataset's coverage, lag or definitions, or pulling insights and frameworks. It holds the house rules: the four approval gates before anything is billed, call syntax, the availability check, and the integrity non-negotiables. Report skills and modules load it themselves. Not for a subject outside companies and their brands, and not when the user wants a decision made for them (investment advice, a business choice) rather than data: answer those without Carbon Arc."
---

# Carbon Arc MCP — Phase Gates, Playbook & Non-Negotiables

House rules for analysis through the Carbon Arc entity/insight MCP (not direct SQL or warehouse access,
which is not part of this package). Three parts:

- **Part 0 — the four gates:** where you stop and wait for the user. Read it first and obey it.
- **Part A — the playbook:** call syntax, tool surface, discovery, availability. Everything past
  discovery sits in `references/`, each file with the moment it is read.
- **Part B — the non-negotiables.** Integrity-class violations block deploy.

---

# Part 0 — The Phase Gates

## Why these exist

The user knows things you do not: which datasets hold up for which business models, which fields are
artifacts, which comparators are fair. That knowledge matters most when the data surprises you, and
that happens during execution, not before it. So the gates sit where the surprises are, not at the start.
A batch of scoping questions up front followed by a run to completion is the failure mode, not the fix.

## The four gates

Gates are **default-on** for any new dataset, entity, geography or question type. The user can waive them: at onboarding, which asks whether they want to approve each step or have the run go straight through (recorded as `gates: waived`, `ca-core` §2), or by saying so later ("skip gates", "just run it"). Honor a waiver for the rest of that piece of work, and do not ask again.

**A waived gate still runs; it only stops waiting.** Present its table as usual, make the call the gate
would have asked about, state that call in one line, and continue in the same turn. The user can read
every gate in the conversation and interrupt, and the method page lists the call made at each one. A
waiver still surfaces anything that fails the validation gate, and it **never covers a stop that ends or
changes the run**: the scope check (Part B §5), a demand route the panel cannot see, and any stop a
setup file names. Those stop and wait either way.

At every gate that is not waived: **stop, present, and wait.** Do not proceed to the next phase in the same turn. Keep each gate to something the user can read in under a minute — a short table or a tight list, not an essay.

### When an entry skill runs several modules

A report or brief built from several modules still has **one of each gate**, but the pull list is not
written by the entry skill.

- **Gate 1 runs once, from the entry skill**, for the whole run: entities, coverage, grain, comparators.
- **The Gate 2 pull list is written by the modules.** Invoke each module in the entry skill's order;
  it reads its required files and adds its own rows. The entry skill adds no rows of its own.
- **Gates 3 and 4 run once**, over all the rows. A module that needs another's findings (a winner, a
  chosen event) writes its rows after them, as a short second pull list with its own Gate 2.

The recorded failure is a pull list written from discovery and approved before any module was loaded:
every tab rendered and passed the build checks, and each tab was missing its module's method.

---

### GATE 1 — Coverage & grain
**When:** after discovery and after the **feasibility probe**, before any *other* billed call.
**Cost so far:** one call. Discovery is free, so be exhaustive before this gate; the feasibility probe
is the single named exception to "nothing billed yet" and is described under the probe rule below.

Present:

| What | Detail |
|---|---|
| Entities resolved | name, ID, representation — and *why that representation* (banner vs parent) |
| Tearsheets genuinely attached | by catalog name, per entity, from `ontology` |
| Geographic resolutions available | from `data_library` (free) — **dataset-level, and not binding on any single insight**. See the warning below this table. |
| Freshness | per signal: the lag its `data_library` tearsheet lists (free), and the **provisional** window end it implies. Labelled provisional here and at Gate 2; the returned max date and the fill check set the real end (`references/response-handling.md`, "Signal lags") |
| Proposed grain | geography + date resolution + window, with the reason |
| Proposed comparator set | peers, category, geography baselines |
| Known quirks in play | from `data_library` bias/coverage fields |
| What the question needs that is **absent** | the scope check firing, stated plainly |

**The geography row is a prior, not a fact.** `data_library` reports geographies per dataset, not per
insight, and an insight given a geography it does not accept returns **an empty result, not an error**.
Two insights on the same dataset can accept different geographies (`us` on one, `country` on another).
A geography is confirmed only by a call that returns rows. Where one is load-bearing and unconfirmed,
make confirming it the first row in Gate 2. The procedure is in `references/troubleshooting.md`.
The same holds for date resolutions: a response lists what **that call's entity set** accepts, so a
resolution missing from a call that mixed entity types is unconfirmed, not unavailable.

Then ask: **is this the right grain, the right entity, and the right comparator set — and is there a
signal here you already know not to trust for this kind of business?**

Do not pull anything else yet.

---

### GATE 2 — The pull manifest
**When:** immediately after Gate 1 is answered, before spending.

The user approves the pull list itself and adds cuts. Present it as an explicit table — one row per intended call:

| # | Entity(s) | Insight ID + label | Topic | Geography | Date resolution | Window | Why this pull | Method from |
|---|---|---|---|---|---|---|---|---|

**Method from** names the module and the step (or reference file and section) that calls for the pull,
for example `ca-benchmark` step 2 · `card-core.md` §3. Fill it in from the file itself, not from memory.
A row with no module behind it says so ("discovery only"); it may still run, but the user should see
that no method shaped it. Group rows by module, and open each group with the files that module read.

Include:

- The **series probe** first (see the probe rule below), marked as such. The feasibility probe is not a
  manifest line — it has already run, before Gate 1.
- Any pull that exists only to make a comparison like-for-like (e.g. pulling a method-split version of a comparator so it matches the target's basis — see non-negotiable 12).
- What you are deliberately **not** pulling, and why.

**Never estimate, quote or total the dollar cost of a pull**, in the manifest, in chat or in the report.
The MCP does not return a price for a call, so any figure would be invented. The cost-efficiency rules in
`references/pull-sizing.md` still apply; they shape how you pull, not what you tell the user.

Then ask: **approve, or add cuts?** Wait. Do not batch the pulls in the same turn as the manifest.

---

### GATE 3 — Signal viability
**When:** after the series probe and the full validation gate, before the main analysis.

**Read `references/response-handling.md` when the first pull returns**, before any series is used. The
modules' method files repeat most of its nine checks; the signal-lag rules exist only there. *Observed Sep
2026 in evals:* 0 of 4 runs opened it, and each Gate 3 then omitted the per-signal data-through dates.

Present, per series:

| Signal | Sample size at this grain | Data through | Validation gate result | Verdict |
|---|---|---|---|---|

Show the actual numbers behind each verdict — observed spend/volume per period, implied transactions, per-store or per-capita sanity ratios, panel-break tests, continuity, correlation and lead/lag where computed. State which series you propose to **drop**, and which you propose to read only at a coarser aggregation than requested.

Then ask: **is this sample thick enough to publish, and do you agree with the drops?**

This is the gate where a domain fact from the user saves a full rebuild. Take the answer seriously even when it contradicts a signal that looks clean.

---

### GATE 4 — Findings before narrative
**When:** after the analysis is computed, before a single chart is drawn or a word of prose is written.

Present a plain table:

| Finding | The numbers | The claim I intend to make | Anchor | Survives decomposition? |
|---|---|---|---|---|

For every intended claim, run the decomposition test (non-negotiable 13) and show the result. Name the headline you intend to lead with, explicitly, as a sentence.

Then ask: **is this the right read, and is the headline the one you'd lead with?**

Only after this is answered do you build the deliverable. Charts and prose are the cheapest thing to redo, but they are also what makes a wrong claim persuasive — so they come last.

---

## The probe rule — two probes, in different places

**1. The feasibility probe — before Gate 1.** One call: does this entity return rows on the spine at
all? Use the same shape every time, so probes are comparable across runs: `date_resolution: "month"`,
`location_resolution: "us"`, from the first day of the month three months back to today (three complete
months plus the current one to date, which also shows where the data ends), with the subject and its
declared peers in the one call. *Observed Sep 2026 in evals:* without a fixed shape, probes ranged from
5 to 33 months at three different grains. It decides whether there is a report, so it runs before the user is
asked to approve a grain. The entry skill names it (for a brand, the demand-route probe in
`setup-brand.md`). **It is the only billed call permitted before Gate 1**, with one exception: when it
returns no rows, you may probe **other live panels** for the same entity, one call each, to find one that
does. Confirm each is live with `data_library` first (free; `references/data-state.md`). Never probe a
frozen panel to decide feasibility.

**No live panel, no report.** A report on current demand needs a panel that is still updating. If no live
panel returns rows for the subject, stop the standard report and say so in client voice: which data is
current, and that older history exists only as history. A frozen panel can be cited as history; it is
never the spine of a report.

**2. The series probe — first in the Gate 2 pull list.** Per series, at the intended grain: is this
series publishable as scoped?

**Never pull the full matrix before you have sized the panel.** A short window for one entity at the
intended grain catches, for one call:

- a panel too thin at that geography for that date resolution;
- a **partial** first or last period (check `table_max_date` and the first and last rows against the
  request; drop partial periods everywhere: YoY, trailing averages, charts, tables);
- a component split (transaction method, say) that is an artifact, not a business measure;
- field names and response shapes that differ from what you assumed.

---

# Part A — The MCP Playbook

## Call syntax

Call the MCP tools directly where they are exposed as tools. Where the environment exposes Carbon Arc through the `external-tool` CLI instead, all calls go through it, with `api_credentials=["external-tools"]` on every bash call that uses it:

```bash
external-tool call '{"source_id": "carbonarc", "tool_name": "<tool>", "arguments": {...}}'
```

## The tool surface

| Tool | Use it to | Cost |
|---|---|---|
| `search_entities` | Resolve companies, tickers, apps, websites, categories, competitors to entity IDs | free |
| `ontology` | Ask which tearsheets cover an entity — **the availability test** | free |
| `data_library` | Catalog metadata: what a dataset is, its coverage, lag and fields (its tearsheet) | free |
| `search_docs` | Platform documentation: how a panel is built, which sibling panel fits (for example a core panel versus its constant-shopper cut), how to read a metric. Use it when the question is about method, not a dataset's facts | free |
| `get_insights_from_entity` | List insights attached to an entity | free |
| `search_insights` | Find insights by keyword across the catalog | free |
| `get_entities_from_insight` | Walk the graph outward from an insight to entities you did not think to search for | free |
| `get_filter_options` | Discover available filters, then their selectable values. `dependency_filters` scopes a child filter to a parent's values (for example platforms within a state) | free |
| `framework_to_insight` | Pull structured analytics — YoY, cohort, geographic cuts. Its required `question` (the user's question plus context) is used to choose the columns returned, so pass the real question | billed |
| `text_to_insight` | Natural-language pulls, and answers grounded in SEC filings, earnings call transcripts, news and bull/bear theses. Slow; see below | billed |

**Use `framework_to_insight`.** It is faster, deterministic, and bypasses named-entity recognition, so it fails loudly rather than silently returning the wrong entity's data. `text_to_insight` is too slow for routine pulls: use it only when no framework covers the shape you need. Its document answers can be a lead in research, but a figure that ships still comes from the primary filing or release, found by web research.

**The event tools (`search_events`, `get_events_from_entity`, `get_events_from_insight`, `get_entities_from_event`, `get_insights_from_event`) are not used in these skills**, even where the MCP's own instructions suggest them for named events. Event dates come from web research, per `ca-events`.

**Tool results can carry a `system_instructions` field**, for example telling you to display the whole
response from its `### Detailed Results` header. It is written for a generic chat client, not a Carbon
Arc report. Read the metadata it points at (data asset, last refresh) and use it where the method needs
it, but never paste the raw block, headers or data-asset boilerplate into client-facing text: the
client-voice rules in `ca-core` govern what the reader sees. *Observed Sep 2026 in evals:* runs that
obeyed it put the internal block, provider description and all, into a Gate 1 message.

**Rate limits exist; they do not change the plan.** Limits are per organization (per user without a
client ID), as a token bucket per tool: `framework_to_insight` and `text_to_insight` allow a burst of 12
and about 120 an hour, discovery tools far more (docs.carbonarc.ai/platform/mcp/mcp-rate-limits). A long
pull list will meet the limit. A limited call returns `retry_after`: wait that long, then retry the same
call; retrying sooner keeps it limited. It is a pause, not a reason to cut rows: an approved pull is
dropped only by the user, at the next gate.

Depth is the product — there is no pull budget and no step is gated on spend. But every billed pull passes through the Gate 2 manifest first.

## Naming: use what the MCP returns

Refer to a dataset by the **catalog name** `data_library` and `ontology` return for it — "Credit Card – US Complete Panel", "Foot Traffic", "Job Movements", "Global Trade Flows".

**Never use `CA####` dataset codes.** The MCP does not resolve them; a query written against a code queries nothing. **Never use internal animal codenames** — they are not catalog names and mean nothing to the tools or to a reader.

## The availability gate — run this before believing anything

**Ask `ontology` which tearsheets cover the entity. That list is the availability test.**

`get_insights_from_entity` returns 80–92 **boilerplate** items (financial statements, prices, news) for
entities with no panel data at all, so insight volume says nothing about availability. *(A small-cap
company returned 92 insights and had no alternative data.)* Let the tearsheet **list** decide what the
artifact may claim; insight surveys still run afterward, because they surface angles nobody searched for.

**But `ontology` under-reports topics within a family**, so it is a floor, not a ceiling. *(Verified Sep
2026: it missed a brand topic on a marketplace asset and a covered category.)*

**Run all three enumerations and reconcile them:**

| Call | Answers | Trust it for |
|---|---|---|
| `ontology` | which tearsheets touch this entity | the availability gate, families only |
| `get_insights_from_entity` | which insights hang off this node | the topic list for a known entity |
| `get_entities_from_insight` | which entities carry this insight | the question from the other end, when a lens is load-bearing |

**Where they disagree, the wider answer is the one to test, not the one to believe.** A topic that
appears in one enumeration and not another is a hypothesis to probe, and probing is free.

Record which panel families are genuinely attached, by catalog name. If what the analysis needs is absent, that is its scope check firing — surface it at Gate 1 and offer the fallback.

## Entity discovery

```
search_entities  {"query": "<company legal name>", "entity_representation": "company"}
search_entities  {"query": "<TICKER>", "entity_representation": "ticker"}      # ticker = SYMBOL
search_entities  {"query": "<app store name>", "entity_representation": "app"}
search_entities  {"query": "<domain.com>", "entity_representation": "website"}
search_entities  {"query": "<category name>", "entity_representation": "category"}
```

*(Placeholders. Never reuse a string or any entity ID for a different target — discover fresh every time. See non-negotiables rule 9.)*

### Resolution gotchas

- **Ticker search needs the symbol.** Semantic search on a company name against the ticker representation returns wrong tickers, confidently.
- **Representations vary.** Competitors do not all resolve as `company` — many brands exist as `service`, `brand` or `retailer`. If a filtered search misses or scores poorly, **re-run without the `entity_representation` filter** and take the best-scoring result.
- **Sub-brands are first-class entities.** A banner is not its parent. Resolve the entity the analysis is actually about — signals frequently attach to the banner, not the corporate parent, and a parent-level read of a multi-banner company can be structurally meaningless.
- **Walk the graph.** From the core insights, `get_entities_from_insight` surfaces related entities nobody thought to search for. One hop is usually enough.
- **A cross of two dimensions can run either way round.** If an insight has no filter for the cut you need (an industry in a metro, a category in a state), make that cut the entity and filter on the geography instead. Check each orientation with `get_filter_options` (free); an entity missing from `get_entities_from_insight` can still build (`references/troubleshooting.md`, "Before declaring an asset unavailable").

## Discovery protocol

Discovery is free, so be exhaustive before Gate 1. Resolve the full graph — company, ticker, every banner, apps, websites, the category verticals the company competes in, and the peer set. Probe availability with `ontology` on each. Then survey insights across every resolved node.

The category entity earns its place: it is the control group that turns a company read into a relative read. A number with nothing to compare it to is not a finding.

## Load these on demand

| Read | When |
|---|---|
| `references/data-state.md` | **Before you commit to an insight id**, and before any 626 / 627 pull. Look-alike ids on frozen panels, the transaction-method split. Neither raises an error, so nothing else will send you here. |
| `references/pull-sizing.md` | Before writing Gate 2 rows, and before any pull over more than one entity or finer than quarter grain. The result-set cap and row arithmetic. |
| `references/response-handling.md` | When the first pull returns, before Gate 3. Response shapes, date alignment, the nine-point validation gate, credibility pulls. |
| `references/troubleshooting.md` | When a call fails, returns zero rows, or passes 90 seconds. Before declaring any asset unavailable. |

---

# Part B — The Non-Negotiables

Every analysis inherits all of them. **Integrity-class violations block deploy.** Each rule exists because
breaking it produces output that looks right and is worthless.

## 1. Retrieved numbers are never generated — INTEGRITY

Street numbers (consensus, guidance, reported actuals, options-implied moves, prices) are **retrieved or not shown**. Anything unsourceable is `null` and renders "n/a — not sourced".

This extends to *contextual* numbers: populations, store counts, industry mix, franchise ratios. From
background knowledge they are as fabricated as a made-up consensus, and more dangerous, because they read
as scene-setting while doing load-bearing work. Retrieve it, cut it, or restate the argument without it.
A plausible guess is worse than a blank.

## 2. Fiscal-calendar anchoring comes first — INTEGRITY

Before **any** quarter-scoped read: confirm the company's fiscal-year convention, the fiscal label of the quarter in question, its end date, and the calendar months that map into it.

Offset fiscal years (most retailers, the May- and November-end names) are chronically mislabeled by web
sources, and the error corrupts every quarter-to-date figure while looking normal.

## 3. The validation gate runs on every pulled series — INTEGRITY

Continuity, partial periods, YoY integrity, cross-signal magnitude sanity, panel-break detection, per-signal recency, provenance capture, cohort debias, basis consistency. The nine checks are in `references/response-handling.md`. A series that fails is flagged in the output or dropped. It is **never silently included**.

## 4. A signal read against expectations carries its error history

It fires on **either**: an investor or financial reader, as the run's reader file says (then the backtest is mandatory and leads), or
an artifact that puts a panel figure beside a reported figure or an expectation, whatever the audience.
Where it fires: panel-implied versus company-reported over the available overlap, with the error per
period. If it cannot be computed, say so prominently and name what would make it computable.

**For a non-investor audience it is a gate, not a page**: it decides what may be claimed and is recorded
in one line on the method page (the run's reader file says how). *(Verified Sep 2026: on a brand-strategy brief it
removed a panel-implied comp that would otherwise have shipped.)* Where it does not fire, the signal still
carries an anchor: a quantified relationship to a peer or category control, or a stated mechanism.

## 5. Minimum viable signal, and the scope check that enforces it

State up front what must exist for the analysis to work, and check before building. If the core
signals are absent, **stop and offer the fallback.** An empty dashboard is not neutral: it claims there
is nothing there, about the company rather than about coverage, and nobody verified it.

## 6–8. Provenance, chart law, numbers law

Build-time rules, so they live where the page is built: `carbon-arc-report-v2`, "Provenance, chart and
number law". They are as binding as the rest of this list.

## 9. Worked examples are labeled, never residue — INTEGRITY

Example IDs and names in these files are illustrative: they appear in output only marked as worked
examples, and are never reused as real values for another target. **Prose residue counts too**: when a
claim is revised, grep the whole artifact for the old framing.

## 10. "In line", "no change" and "unverifiable" are findings

State them plainly and prominently. A read showing no gap versus expectations **is** the answer. The same applies to a claim no panel can test: UNVERIFIABLE, stated honestly, is a legitimate and useful result.

## 11. A genuinely unchanged signal is a first-class output

Confirming that nothing has moved is often the most valuable thing an artifact can say, but it must be
**earned and shown**: pulled, validated, flat, and not an artifact of a broken comparison. Reaching for it
after an earlier claim proved overstated is over-correction, and it erases real findings.

## 12. Comparators share a basis — INTEGRITY

If a component is dropped from one series because it failed validation, **it is dropped from every series that series is compared against** — target, peers, category, geography baselines, and every appendix column.

Comparing a cleaned series with an uncleaned one moves the whole contamination into the gap between them:
the chart looks normal, the arithmetic is right, and the conclusion is invented. No check on one series at
a time catches it. Decide the basis once and record it. If a comparator exists only aggregated, pull the
split version (a Gate 2 row) or quantify the contamination where both exist and state the adjustment. Any
"every figure here uses basis X" must be literally true, footnotes included.

## 12a. Ratios never cross datasets — INTEGRITY

Every ratio ships with **numerator and denominator from the same dataset and the same vintage**. Card spend
÷ card cardholders, yes. Registrations ÷ registrations, yes. Anything ÷ anything from another asset, no —
including the tempting ones: spend per permit, visits per claim, revenue per registered vehicle, shipments
per store.

Different assets sample different populations by different methods, so the quotient is not a rate of
anything: drift and churn cancel within a panel, never across. **When two panels disagree, test each
against the same published external statistic and show both tests.** *(Verified Sep 2026: a
registrations-per-cardholder ratio "settled" a disagreement and happened to be right, which is worse than
a wrong number, because invalid evidence that looks rigorous survives review.)*

Side-by-side **columns** from different datasets in one table are fine and often valuable. It is the
**arithmetic between them** that is prohibited, not their co-presence.

## 13. Headline claims survive decomposition — INTEGRITY

Before a headline ships, try to break it. Ask: **is this driven by one period, one entity, or one base effect?** Then recompute without that element and report both numbers.

- A multi-period average dominated by one extreme period is a fact about that period, not a trend.
- A share gain where the denominator collapsed is a fact about a competitor, not about the client.
- An index spread driven by the choice of base period is a fact about the base.

If removing one element collapses the claim, the claim is about that element; restate it and show the
decomposition. Then check the headline against the artifact's own charts and tables: a headline its own
endpoint labels contradict is visible in seconds and discredits everything around it.

---

# Before anything ships

The pre-deploy checklist is run at build time and lives in `carbon-arc-report-v2`, "Pre-deploy checklist".
