# Setup: a company or brand

Read during `ca-core` §2 when the subject is a company or brand. It adds to the shared checklist; it does
not replace it.

## What this subject adds to the setup

- **The data map**: which attached dataset answers each module's question for this subject, decided from
  the survey and the probe below before anything is designed.
- **Peer set in tiers**, three tiers maximum, **every peer carrying its unit growth** (or its dated
  distribution changes when the sales basis is not spend at its own locations; see below).
- **Disclosure, claim by claim**: each claim names the one disclosed figure it is exposed to, retrieved
  in Phase 1b (`ca-core` §3).

## Phase 1a for a brand

- the subject's **fiscal calendar**, which `carbonarc-mcp` non-negotiable 2 already requires before a
  date resolution is chosen
- **unit count and unit growth for every peer**, two numbers each. A growth ranking without them ranks
  nothing: a chain opening 15% more doors is not outgrowing one that is not.

**Every peer carries `unit_growth`.** Panel spend growth is comp plus a brand-specific slice of
expansion — on the pilot the panel caught 6.4% of one brand's unit growth and 34.6% of another's.
Without unit growth per peer, a growth ranking silently ranks "comp plus however much of your expansion
the panel happened to catch."

## The data map: what is attached decides what each tab reads

**There are no routes by type of company.** Each module asks a fixed question; which dataset answers it
for this subject is read off what Carbon Arc has attached to the subject and its peers (the Phase 0 survey
at `limit=250`, on every representation) and confirmed by a probe. Record the choice per question in the
setup as the **data map**; every module reads its row from there.

| Question (modules) | Candidates, in order of preference | Notes to read |
|---|---|---|
| **Sales**: how much, volume or price, the brand or the market (`ca-benchmark`, `ca-events`, `ca-execution`'s decomposition) | card spend and transactions (626 / 627) · marketplace sales: Amazon (225014 / 225017), TikTok Shop (57697 / 57698) · any other attached series that counts the subject's own sales or use | `card-core.md` · `marketplace.md` · that dataset's `data_library` tearsheet |
| **Who buys** (`ca-audience`) | card cohorts (116195) · receipt cohorts (512 in store / 515 online) | `card-cohorts.md` · `pos-cohorts.md` |
| **Shared customers** (`ca-competitive-set`) | card overlap (120277 with 48288) · browsing overlap (640 with 639) | `cross-shop.md` |
| **Coming back** (`ca-retention`) | card retention (124734 / 232620) | `card-retention.md` |
| **Attention and advertising** (`ca-execution`) | web traffic (8928) · advertising (248) | `cross-signal.md` |

The ids are where the house has notes, not a whitelist: the survey decides what is available, and a
dataset the table does not name is a candidate when it answers the question.

**How a question gets its dataset.** The first candidate that is (1) attached, (2) returns rows for the
subject **and every declared peer**, and (3) measures what the question asks for this subject. **The three
tests apply to every row, not only sales**: a dataset family that failed the sales row because a peer has
no rows on it (card, when the rival sells only through other stores) fails the who-buys, shared-customers
and coming-back rows for the set too, unless that row's own probe shows rows for every peer.

**A read built from the subject's side needs rows for the subject only.** Browsing overlap ranks every
brand the subject's shoppers also visit, so it qualifies when the subject returns rows, even if some
declared peers have no tracked site. The tab names those peers in one clause, as not placed for lack of
data rather than as not competing. The every-peer test is for reads that put each brand on its own
series side by side: sales, who buys, coming back. Then:

- **One basis for the whole set.** Every brand on a chart is read on the same dataset. Never put one
  brand's card spend beside another's marketplace sales.
- **Never add or ratio two datasets** to make a total or a mix (`ca-core` §4 rule 10). Two sources that
  both qualify are shown side by side, each with its own peer share.
- **Test (3) against the business model** from Phase 1a. Card spend counts sales where the card is
  swiped: for a brand sold mostly through other companies' stores, its card rows are its own website, a
  sliver. Rows like that fail (3) as the sales basis; they may still be read as the brand's direct
  channel, labeled so, never as its demand. Move down the list.
- **A dataset with no notes file** may still be used: read its `data_library` tearsheet first (provider,
  history, lag, whether figures are modeled), apply the `ca-core` §4 gates, and say in Method that it was
  read without house notes.
- **No candidate qualifies → the question is cut**, in one clause in Gate 1's scope line ("whether buyers
  come back needs data that follows the same people, and none is attached for this set"). The other tabs
  run.

**The probe that builds the map is the first pull of the run**, owned by the entry skill that runs a
brand's full report (`carbonarc-mcp`'s **feasibility probe**, the one billed call permitted before Gate
1, with its named exception). It tests the **sales** row, because that decides whether there is a report:
probe the attached sales candidates in order, one call each in the probe rule's shape, subject and peers
together, **in the same turn and without asking**, until one qualifies. That includes a candidate with no
notes file. Which dataset to use is not a question for the user before the probe: Gate 1 is where they
see the choice and can change it. The other rows are confirmed by
the series probes at Gate 2. **None of the sales candidates qualifies** → no live dataset names this
subject's sales: put the tabs whose rows did qualify (shared customers, who buys, attention) to the user at
Gate 1 as the report, and stop only if they decline. A card panel that is frozen never qualifies; probe
the live card panels attached before moving off card (`carbonarc-mcp` probe rule). *Observed Sep 2026 in
evals, on a restaurant pilot:* the brand nodes carried only a frozen card panel.

**Say what the report reads, once, in Gate 1's scope line and in Method**, built from the map and never
framed as a lesser report: *"This reads [brand] on [the datasets chosen, in plain words]. It does not see
[what none of them covers]."* Nothing in the conversation calls it narrower, partial or separate from the
standard report: it is the standard report on the data that names this subject.

**Phase 1a follows the map.** Unit count and unit growth matter when the sales basis is spend at the
brand's own locations. When it is not, what grows the brand's reach is distribution (a new retailer, a
door count, a marketplace store opening): gather the dated changes for the subject and every peer as
candidate events, because a retailer launch can move a marketplace share with no sign of it in the data.

**The onboarding skill does not build the map**: it is conversational and pulls no data.

**Each module carries a one-line assert, not the logic**: it reads its question's row of the data map,
and runs the probe above itself when it is run on its own and no map exists yet.

## Gate: cohort cuts from the card panel

This is the brand setup's addition to `ca-core` §4 (its gate 0). It binds every module that cuts card
spend by generation or income, in any report.

**Cohort cuts are debiased against the national panel, always.** A raw generation or income share
from US Complete is panel composition, not customer mix, and the correction **inverts comparisons**
rather than softening them: on the pilot the raw chart said a rival skewed older than the subject when
the adjusted chart said the opposite. Full recipe and checks in
`instruments/card-cohorts.md`. Both charts on a cohort tab sit on the adjusted basis; a raw
baseline beside an adjusted change chart puts two incompatible scales on one page. If adjusted equals
raw, the debias did not run.

## Instruments

Per-family notes in `references/instruments/`: `card-core.md` (the benchmark recipe — named companies
over aggregates, recency, decomposing the outperformer, event chart form), `card-cohorts.md` (the
mandatory debias for cross-generation work), `card-retention.md` (who comes back: new and existing
customers, the size floor, the unfilled latest month) and `cross-shop.md` (window, drift, thickness, and the
scope boundary between sharing a customer and taking one). `pos-cohorts.md` is **conditional**: the
receipt panel is a demographic instrument and nothing else, it carries dimensions card does not, and it
is read only where the live survey shows it covers the subject. Never a level from it. `marketplace.md`
(Amazon and TikTok Shop sales) is read wherever the data map puts a marketplace on the sales row.

**Card affinity and click affinity are different questions, and a brief should carry both.**
Card overlap is the **wallet ecosystem** — who else your customers pay. Browsing overlap is
**consideration and substitution** — who they weigh you against when choosing. A tab built on card alone
answers *where your customers spend*, never *who they consider instead of you*, and must say so: readers
hear "cross-shop" and infer substitution. Where the browsing panel is too thin to rank the pair, state
that as the scope of the tab rather than letting the card chart stand in for both.

### What ONE pilot found — scoped, not general

On the **restaurant** pilot (Sep 2026) card and clickstream carried every finding, while
store count, job openings, advertising spend growth and the event ontology all failed, and foot traffic
executed but inverted the card ranking. **Ten of seventeen instruments surveyed were unusable for that
company.**

Read that as a base rate to plan around — expect roughly half of what discovery surfaces not to survive —
**and not as a ranking of instruments.** Beauty, CPG, retail and healthcare will each fail and succeed in
different places, and a vertical whose verdicts are inherited from restaurants will miss its own best
instrument.
