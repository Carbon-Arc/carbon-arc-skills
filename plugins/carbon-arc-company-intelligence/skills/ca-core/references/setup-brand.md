# Setup: a company or brand

Read during `ca-core` §2 when the subject is a company or brand. It adds to the shared checklist; it does
not replace it.

## What this subject adds to the setup

- **Demand route**: own-merchant or retailer-mediated, decided by the probe below before anything is designed.
- **Peer set in tiers**, three tiers maximum, **every peer carrying its unit growth**.
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

## Demand route

v1 validates the **own-merchant** branch only.

The gate applies wherever **card spend is the instrument**. A brand measured some other way (app
downloads, web visits), for example a partner brand measured inside a talent brief's endorsement read,
does not need it; say which instrument you used instead.

**The onboarding skill does NOT run the gate** — it is conversational and pulls no data. It only *flags* that
the check is coming, in one sentence, so a retailer-mediated company is not surprised later.

**The entry skill that runs a brand's full report owns the gate**, and it is the **first pull of the run**: a probe on 626 against
the resolved entity, before any tab is designed. This is `carbonarc-mcp`'s **feasibility probe** — the
one billed call that is permitted to run before Gate 1, named there as the exception. It has three outcomes:

- **Rows** → own-merchant. Proceed.
- **No rows, and the brand sells through other companies' stores** → retailer-mediated. Told in client
  voice, offered the channel-and-attention subset that genuinely is available, and handed to a human for
  the rest.
- **No rows, but the brand is where the card is swiped** (its own restaurants, stores or site) → this is a
  **coverage gap, not retailer-mediated**; never call it retailer-mediated. Probe the other **live** card
  panels attached to the entity (`carbonarc-mcp` probe rule). One returns rows → proceed on it and state the
  basis. None does → no live panel, no report: say that current card data does not cover the brand, name
  what is current (web, hiring, and so on) and the date the older history ends, and hand to a human.
  *Observed Sep 2026 in evals:* a restaurant whose brand nodes carry only a frozen card panel.
Running it first matters — the alternative is a company getting several tabs in before hearing what card
cannot see.

**Each module carries a one-line assert, not the logic** — it checks the demand route established in `ca-core` §2 and
stops with the same client-facing line if a card spine is required and unavailable. That covers a module
run on its own, where the gate may not have run yet.

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
mandatory debias for cross-generation work) and `cross-shop.md` (window, drift, thickness, and the
scope boundary between sharing a customer and taking one). `pos-cohorts.md` is **conditional**: the
receipt panel is a demographic instrument and nothing else, it carries dimensions card does not, and it
is read only where the live survey shows it covers the subject. Never a level from it.

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
