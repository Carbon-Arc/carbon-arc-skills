---
name: ca-core
description: "Use this skill only when another skill in this package says to invoke it. It holds the rules every Carbon Arc run shares: the run setup checklist, the reader, the evidence gates, the client-facing voice and the subject setups. Never start a user's request with it: for a report or a single read, use this package's onboarding, a report skill or the matching module."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# ca-core

Foundation for the Carbon Arc Talent Intelligence library. It holds what every run shares: the reader, the setup
checklist, evidence gates, voice and build. **It does not set the order of work.** The entry skill does:
it runs Gate 1 once, then invokes each module, and each module writes its own Gate 2 rows
(`carbonarc-mcp`, "When an entry skill runs several modules").

**The user of this library is the client, not a Carbon Arc analyst.** They see the whole
conversation. That governs everything below.

---

## 1. The reader and the framing — read the run's reader file now, before anything else

The reader files are in `references/readers/`, one per reader this package serves. **Read exactly one,
at the start of every run, before Phase 0**: the one the entry skill names. Every entry skill that runs
pulls states its reader in its opening lines. Record it with the run setup (§2) as `reader: <name>`.
The file names who the reader is, the framing principle every module states, how the backtest is
treated for this reader, and the vocabulary level the language gate is judged against. Everything below
is the same for every reader; the reader file is what differs.

**Never read a second reader file in the same run**, not to compare and not to be thorough.
Instructions written for another reader get followed once they are in context.

If no entry skill named a reader (the user asked for one module directly): when `references/readers/`
holds one file, that is the reader. When it holds more than one and the request itself makes the reader
obvious ("we're Dutch Bros" is the company's own team; "ahead of their print" or "my position in" is an
investor), take that reader, say in one line which one you are writing for so the user can correct it,
and read only that file. Otherwise ask the user one question before Phase 0, which of them the work is
for, using each file's "Who the reader is" line, and read only that file.

Where this file says "the reader" or "the reader file", it means that one file.

---

## 2. What every run establishes before it pulls

No file, no schema, no validator. These are settled **in the session, before Phase 1a**, and carried in
the conversation so every later module can use them.

**Version notice, once per conversation; it never blocks the run.** Fetch
`https://raw.githubusercontent.com/Carbon-Arc/carbon-arc-skills/main/latest.json`. If
`latest.json["carbon-arc-talent-intelligence"].version` is newer than 0.2.1, the installed version, tell the user
in one line: "Carbon Arc Talent Intelligence vX.Y.Z is available: <zip url>. Installed from the marketplace? It updates
on its own." If the fetch fails or the version is not newer, say nothing and continue.

**If no Carbon Arc tools are available, stop before anything else.** Tell the user in one line that
Carbon Arc isn't connected, and that they connect it once (in the Claude app, add the Carbon Arc connector
and sign in) as described at https://docs.carbonarc.ai/tutorials/carbon-arc-skills, then ask again.
Never fill a report from web research or memory instead.

**First, read the setup file for the subject in front of you (§7)**: `references/setup-brand.md` for a
company or brand, `references/setup-talent.md` for a musician or actor, `references/setup-equity.md` for a
listed company being previewed against its reported figures, `references/setup-category.md` for a
consumer category and the markets it sells in. It adds the subject-specific
items to the list below and says what Phase 1a collects. A run can touch more than one: a talent brief that
measures a partner brand reads the brand file for that part; an earnings preview reads the equity file and
the brand file.

- **Reader** — the one reader file this run reads (§1), recorded as `reader: <name>`.
- **Gates** — `gates: on` (the default) or `gates: waived`, from the user's answer at onboarding or a
  later "skip gates" (`carbonarc-mcp` Part 0). Every module in the run follows it; it is not re-asked.
- **Entities, as a list** — every node that resolves and which instrument families each one serves.
- **Every candidate asset, enumerated** — gate 6 in §4, before any tab is designed.
- **A coverage grid** — entity × instrument, filled before any tab is designed (gate 7).
- **The benchmark set** — peers for a brand, a derived peer band for talent. How it is built is in the
  setup file; it is always shown to the reader before any figure is measured against it (gate 11).
- **Basis** — spine measure, volume floor, detection floor, geography, time grain, and for any cohort cut
  the **debias denominator**. Set each one where the data breaks, not by convention.
- **Disclosure, claim by claim** — not a dossier gathered up front. Each claim names the one disclosed
  figure it is exposed to, and that figure is retrieved in Phase 1b. See §3.
- **Instrument verdicts as you find them**, each dead one carrying the call that would overturn it.

Record them as you go and state them back at the gates. A later run on the same company repeats this
work; that is the accepted cost of carrying setup in the session rather than in a file.

### Load-bearing on every subject

**`entity` is a LIST, not a single node.** A company routinely resolves to several representations and
**none of them is reliably a superset**, so the instrument you want may sit on a node you did not
survey. Record every node that resolves and which instrument families each one serves, and survey all of
them. *(On the restaurant pilot the two nodes split cross-shop and affinity from catalog pricing and
every event insight, and an event lookup returned zero rows against one and thirteen against the other.
A musician resolves as both `artist` and `entertainer`; the setup file says which to prefer.)*


---

## 3. Phase 1 is two passes, and only the second one is the contradiction check

Research has no natural stopping point, so it is given one by being split. **Pass 1a runs before any
pull. Pass 1b runs once the findings exist and before a word of narrative is written.**

### 1a — only what changes the pull design

The setup file lists what this subject needs (for a brand: fiscal calendar and peer unit growth; for
talent: release and tour history, and for an actor the filmography). Beyond that, one thing only:

- **candidate events at low resolution** — a name and a rough date, across the five families (macro /
  corporate / calendar / industry / company). No sourcing pass, no transcript. Most candidates will not
  be chosen, and the one that is gets sourced in 1b.

**Every candidate that could drive a pull carries a predicted observable**: *if this is real, what should
the data show?* A candidate with no statable observable is labelled context; it may earn a retrieved
callout but may not drive a pull or a claim. Keep the working list to the two to four that matter, say
what you searched and found nothing on, and **show the list at the first gate** with the coverage table,
so the user can add what you missed before anything is billed. Each Gate 2 row a module writes names the
candidate it tests. **A rejected candidate is a result and is published**: it arrives before anyone else
has it, it is falsifiable, and it is often the most credible thing on the page.

**Retrieve dates; measure seasonality.** Never assert a seasonal shape from background knowledge ("the
fourth quarter is holiday-weighted"). Compute it from the panel's own history and retrieve only the dates.

Stop there. Disclosed figures (comps, traffic splits, published grosses, chart positions) are **not**
collected here. At this point there is no claim for them to be checked against, and a disclosed figure
gathered with nothing to check is a figure that never reaches the reader.

### 1b — the contradiction check, run where the claims are

**Its job is to stop us stating something a public filing contradicts.** It is not calibration and it is
not a backtest. Whether any panel-versus-reported comparison is **shown** to the reader is the reader file's call
(§1): for a corporate reader it stays silent and only governs what may be said; for an investor the
backtest is the evidence and leads. The veto below applies either way.

**The comp set contains publics AND privates.** Disclosure is a veto on claims, never a filter on peers.

Per intended claim: name the **one** disclosed figure that claim is exposed to → retrieve it → **if the
panel contradicts it, the claim does not ship.** Reframe to something both support, or drop it. Quote
disclosed figures as ▲ and panel figures as ■, never blended in one sentence. Fully source the event
that was actually chosen, now that it is known.

**A finding the candidate list did not predict gets its own sweep.** 1a searched before the data was in,
so a move that surfaced only in the data (one region, cohort, channel or asset out of line with the rest)
has had no search behind it. Before it is written:

1. **Date its onset** at the finest grain the panel resolves, and name **where it is strongest**.
2. **Search, never recall, from the onset forward and over the same weeks a year earlier**, scoped to
   where it is strongest, across the five families. A year-over-year move can be last year's spike or
   dip lapping, so the base window is as likely a home for the cause as the current one.
3. Each hit becomes a candidate with a predicted observable, tested on pulls already made where they
   answer it, or on a short second list (`carbonarc-mcp` gates, as for any module that needs another's
   findings).
4. Only then may the finding read "cause not found", and the page states what was searched and ruled
   out, beside the finding. An unexplained driver may still be presented; an unsearched one may not.

*(On an earnings-preview pilot one state's decline was the preview's main named drag, shared with the
subject's largest rival, and shipped as "cause not found" after a company-level search whose window
started weeks after the state's onset and never covered the state or the year-earlier weeks.)*

1b lands on `carbonarc-mcp` Gate 4, findings before narrative. They are the same checkpoint, not two.

**Why this gate exists.** On the pilot the panel decomposed a quarter into transactions −0.28% x ticket
+3.08% — "the recovery is price, not traffic." The company had disclosed transactions **+1.0%** and
called it the second consecutive quarter of improving transaction comps. The claim died here. Separately
`transaction_method` showed digital share falling to 32.0% against a disclosed 38.3% and **rising** —
wrong level and wrong sign.

**Never take a date, a unit count, a release, a tour or an event from training data.** Search for it,
every time, including for famous brands and famous artists. If a date will be a chart marker, show it to the user and ask them to confirm.

---

## 4. Evidence gates

Rules below; the recipes that compute them are in `references/gating.md`. Six gates:

0. **Your subject's setup file may add gates.** They run before the ones below and bind the same way.
   The brand setup adds one for every cohort cut from the card panel (the debias).
1. **Volume gate on every ranked cut**, set where the data breaks, printing `n`. Gating one chart and
   not another is worse than gating neither. **The noise proxy cannot tell "thin" from "accelerating"** —
   a brand growing 16% a year has a high mean-absolute-change in YoY by construction. Set the floor on
   base size, with the noise proxy as corroboration.
2. **Detection floor before any event claim.** First compute how far the diff-in-diff swings in an ordinary week;
   anything smaller is invisible. On the pilot the floor was ±3.5pp and a single-protein LTO fell under it.
3. **Drift check before any period-over-period move.** Compute the change across *all* comparable pairs
   and quote mean and stdev. 73% of cross-shop pairs rose by an identical +0.0037.
4. **A pre-period baseline is not a control when the season is moving.** Geographic and event cuts need
   a control group, not just a prior window.
5. **A positive YoY is not a recovery** until it survives the two-year stack and the periods after the
   window.
6. **Enumerate every asset before building.** Run `data_library` on the *domain* term ("secondary
   ticket", "box office", "streaming", "card spend"), not on the dataset you already know, and list every
   asset that could answer the reader's question. Split the list into reachable (an MCP insight binds to
   it) and out of reach, and name the out-of-reach ones in Sources & method. **Where two reachable assets
   answer the same question, pull the same cut from both and compare totals and rank order before
   choosing** (recipe in `gating.md` §9). Skipping this has published a finding that was the reverse of
   the truth.
7. **A coverage grid before any tab.** An entity resolving is not evidence it has data, and one empty
   pull is not evidence it has none. Test every candidate entity on every instrument you intend to use and
   record the result as a grid. *(On the actor pilot a title was dropped after one empty box-office pull;
   it was the largest streaming title in the catalog.)*
8. **Check one level against a published figure before quoting any level.** Panels are samples. One
   external check per asset per brief: a consistent ratio below 1.0 is a sample and supports ranking; one
   entity far out of family is an error; a major entity missing entirely makes the asset a partial sample.
9. **Defect sweep before publishing any sharp move.** A broken series does not look broken; it looks
   like a finding. Run the four tests in `references/defect-detection.md` (sibling, floor, external,
   coverage) and state the mechanism behind every sharp move. "Cause unknown" is allowed only after the
   unpredicted-finding sweep in §3 1b, and the page lists what was searched and ruled out. The four
   tests say whether a move is real; they do not say why it happened.
10. **Never divide across sources.** A numerator and a denominator from different panels is not a rate.
    Compare ranks, or test against a bound the difference cannot explain, and name the bound.
11. **A derived benchmark is shown before the tabs that use it.** A peer set, a band median or a
    constructed baseline is built, not measured, so its construction is shown first and later tabs refer
    back to it.
12. **Calling something a data break needs evidence; the default explanation for a surprising move is
    that it is real.** Labeling a move an artifact discards evidence and indicts the pipeline, so it is not
    the safe error. Three tiers, each with the only language allowed at it (recipe in `gating.md` §11):
    an anomaly is "unexplained" and the series stays in use; a suspected artifact needs fine-grain dating,
    a peer that did not move and a named alternative not yet ruled out; a confirmed artifact adds an
    external anchor (a contradiction with audited figures, a second panel, or a named mechanism). Render
    the tier beside every break claim, count your own break claims (more than two is a fact about the
    analyst), and withdraw a retracted suspicion in the place it was made.
13. **A local claim needs its parent beside it, on matching windows.** "This market (or segment, or
    cohort) is different" is a finding only when the geography or group that contains it is not
    different in the same way. Show the parent's same ratio, from the same pull family and the same
    months, beside every local one, and compare like windows only (the same months in every period, never
    a full year against a year to date). *(Oct 2026, on a category pilot: a "this city leans EV" claim
    compared full-year counts with a partial year; on matching months the state's ratio was the same.)*

---

## 5. Client-facing voice

The conversation is in front of a paying customer. Failed pulls and dead ends appear **in chat** and
**never in the deliverable**. They are phrased as routing, not plumbing.

| Don't say | Say |
|---|---|
| "Zero rows returned for insight 48288." | "That pair is too thin in the panel to rank — here is the set that does." |
| "Fails the thickness gate." | "Not enough observations to trust a number that fine. At quarterly grain it holds." |
| "Card cannot see retailer-mediated brands." | "Card sees the store, not the item in the basket. Total demand isn't observable — channel and attention are." |
| "B4 requires debiasing." | "The panel skews older, so we normalize against the national panel before reading cohorts." |
| "The insight is parked / uninterpretable." | "We can answer who shares your customer. Who *took* your customer needs a measure we don't have." |

No internal rule IDs, no skill mechanics, no dataset codenames. Carbon Arc dataset names only.

### The first screen carries the business read, not the method

A reader must reach a defensible thesis in **one to two minutes of skimming**, without passing through
method apparatus. Evidence that earns trust (backtests, validation tables, peer-band construction) lives
one tab back, never first. This governs **order, never existence**: every band, basis statement and
as-of date still ships. Every number appears once on a screen, in one sign convention.

**Write in the reader's vocabulary, never this library's.** Words these skills use to instruct you
(*event register*, *predicted observable*, *pull manifest*, *observability bridge*, *walk-forward*,
*same-basis*, *Tier 2*) read as a leaked internal document. Translate them ("what could have explained
the quarter", "if true, we would see", "each quarter estimated using only the quarters before it").
**Never name a skill, module, reader or setup file, or an entity id, in anything the reader sees**
(saying in plain words who the work is for, as §1 requires, is not naming a file: "I'm writing this for
you as the store's owner"):
`ca-category`, `ca-macro`, `smb-category-report`, `company-insights-report`, "retailer 48157". Say what the
tab or report answers ("is it everyone, or just you?"); an entity is its name. Never
narrate the method as a virtue. One lede per section, and it contains a fact. Headings are questions or
claims, never tables of contents. Do not put the page on trial: "What could move this number", not "What
would make this wrong".

**Fewer words, not more.** Readers skim, so length lowers the chance a finding is read at all. Budgets,
written to rather than aspired to:

| Element | Budget |
|---|---|
| Body paragraph or callout | ≤3 sentences, ≤50 words, one idea |
| Section lede | 2–3 sentences, ≤50 words, containing a fact |
| Headline | ≤12 words, a claim |
| Chart subcaption | ≤2 lines |

Lead with the claim, then the number. Delete hedges a band already expresses. "Add more context" means
more facts per word, not more words. **Measure, do not eyeball**: `verify_report.py --budgets` prints every
paragraph over budget (a bold run-in label counts as a sentence), and a mean inside budget routinely
hides paragraphs at double it. At most two paragraphs may exceed it: a structured list, and the single
most important methodological point.

### The page contract: tabs ask, headlines answer

**Every tab label is a question the reader would actually ask** — phrased the way the reader in
the reader file would put it, not as a topic. *"Is this us or the category?"*, not *"Benchmark"*. *"What did our price
increase actually do?"* or *"What did the rival's food-safety outbreak do to the category?"*, not *"Events"*.

Those two examples differ in shape as well as subject: one is a move the company made, the other
something that happened to a rival. **Phrase it for the event and the company in front of you** — the
examples show the range, they do not set the template. Two structural tabs keep structural
labels: Summary, and Sources & method.

**Every section headline is a claim that answers its tab's question**, and every card title states that
chart's finding. So the reader can read the rail as the agenda and the headlines as the answers.

Tab labels live in **three** places that must stay in step: the sidebar anchor, the section's
`data-screen-label`, and the cross-link on the Summary tab. Change one, change all three.

### Language rules, enforced by `scripts/verify_report.py`

The gate runs on **rendered text**, not markup, so it cannot be fooled by `&mdash;` or by a word sitting
inside an attribute. It exits non-zero and the build does not ship until it is clean.

- **No em dashes. Ever.** An em dash is a pause the reader has to interpret. Every one of them is really a
  comma, a colon, a semicolon, a full stop or a pair of brackets, and picking the right one is the writer's
  job rather than the reader's. (The first pilot brief carried 22, and every one improved when replaced.)
- **No spaced en dash** used as a dash. An unspaced en dash inside a range (`2021–25`, `Jul–Sep`) is correct
  and allowed.
- **US business English.** Never *normalised*, *behaviour*, *labour*, *whilst*, *amongst*, *dearer*.
  This binds **these skill files too**, all of them, not only the lines they quote for you to say.
  Instruction prose primes the writing: a *catalogue* here becomes a *catalogue* in a client report,
  which then fails the gate this rule exists to help you pass. Enforced by
  `verify_report.py --authoring`, run on every package build.
- **No word the reader must look up**, judged against **this** reader, as the reader file describes them.
  Whatever the reader, what is always banned is **our** vocabulary — `nPMI`, `carc_id`, insight ids, *tearsheet*, *thickness*,
  *own-merchant*, *retailer-mediated*, *demand route*, *archetype* — and initialisms like `DiD` that read as ordinary words.

Run it on the markup file (it strips tags itself). Resolve this package's scripts directory first and
reuse `$CA` for the build gate in §8:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-talent-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <report>.html
```

**Do not write that path as a literal.** Three things break a hardcoded one, and all three fail quietly:
the installed directory carries a sync suffix (`carbon-arc-talent-intelligence~g2`, not the manifest name); a
deleted copy of the package sits under `.trash/` and an unscoped `find` reaches it first, so you verify
against an old script; and `${CLAUDE_PLUGIN_ROOT}` is **not set** in the shell a build runs in, so it
expands to nothing and forms `/skills/...`, which is a wrong absolute path rather than an error.

Extend the word lists rather than adding exceptions. A term that keeps needing an exception belongs in the
prose, explained once, not in the ban list.

---

## 6. Instruments

Instrument notes live in the setup file for the subject (§7) and the files it points to. Build
mechanics, the engine's silent failures and the post-render helpers are in `references/build-notes.md`,
read before the first chart, not after. Verdicts carry a `verified:` date and every ⛔ carries the one call
that would overturn it: **the ontology grows, so a verdict is a hypothesis with a shelf life.** Modules
re-run `get_insights_from_entity` at `limit=250` live rather than trusting any file.

### Every vertical-specific mention is labelled, and a script enforces it

The recurring failure in this package is **a finding from one company hardening into a rule for every
run**. It is invisible on a read-through, because the sentence is true — it is just true of one company
in one category. A later vertical then inherits a verdict that was never about it.

So: a brand name, a category word or a pilot number appears **only inside a labelled observation** —
"on the pilot", a parenthetical aside, "if the subject is in that vertical". Never inside an
unqualified instruction. Worked examples are valuable and should stay; they just have to be marked
as examples.

This is an **authoring rule, not a build gate**: it governs these skill files, is enforced in the
source repo every time the package is built, and is never run during a client run. If you edit these
files yourself, hold your edits to the same rule.

Three things it has already caught, each written as general law from a single pilot: a fixed list of six
data panels; an instruction to lead every module on the two instruments that happened to work; and an
event tab phrased around cost and recovery, on a module that also has to handle price rises and launches.

### Every figure comes through the Carbon Arc MCP

A client run has the MCP and nothing else, so every figure must be reproducible through it. An asset
reachable only through bulk tables is named in Sources & method as a known gap and never built on.

### Discover live. The reference files are priors, not an inventory.

**The catalog grows continuously and does not stop.** Anything written here is a starting hypothesis
about what *was* available for *one* company on *one* date. So:

1. **Every run re-surveys the subject** with `get_insights_from_entity` at `limit=250`, on **every**
   representation the entity resolves to. Never design a tab from this file alone.
2. **Never present the reader with a fixed list of what Carbon Arc has.** Name a few assets that matter
   to them and point at the surface. A list written today is wrong next quarter and it caps what they
   think they can ask for.
3. **A ⛔ is a dated hypothesis with an overturning call attached**, never a permanent negative. Re-run it
   when it goes stale.
4. **A new asset that nobody has written a file for is still fair game.** If the survey surfaces
   something promising, probe it, and if it survives, write the file.

---

## 7. Subject setup

What differs by subject lives in one file per subject type, in `references/`:

| Subject | File | What it adds |
|---|---|---|
| A company or brand | `setup-brand.md` | the demand-route gate, peers in tiers with unit growth, fiscal calendar, card and browsing instrument notes |
| A musician or actor | `setup-talent.md` | the musician / actor branch, the representation to prefer, the peer band, the thickness test, the talent instrument map |
| A listed company, previewed against its reported figures | `setup-equity.md` (with `setup-brand.md`) | the scope check, what the panel can and cannot see, the ticker roll-up, fiscal-quarter grain, the reported-figures source and the end-date join |
| A consumer category and its markets | `setup-category.md` (with `setup-brand.md`) | resolving the category neighborhood, how visible the merchant is, channels card under-sees, resident-demand geography, the category instrument map |

Read the one for your subject during §2. Modules that assume a subject type say so in their first lines.

**Each package ships only the setups it covers.** If the file for your subject is not in `references/`,
this package does not cover that subject type: tell the user so, in client voice, and say which Carbon
Arc package does (brands and companies, including earnings previews on listed companies and category and market
reports for small or regional businesses: Carbon Arc
Company Intelligence; musicians and actors: Carbon Arc Talent Intelligence). Do not improvise a method
for it.

---

## 8. Build

Deliverable is a single-file HTML Artifact on `carbon-arc-report-v2`, in one of two formats, fixed by
the run (`carbon-arc-report-v2`, "Pick the format first"):
- **Full report** (an entry skill ran several modules) = the **Report**: Summary (written last) + one tab
  per module that found something publishable + Sources & Method, which ends with the AI
  disclaimer (`carbon-arc-report-v2`, "Appendix").
- **A module run on its own** = a **Brief**: one scrolling page that answers its one question, with the
  Method content in its collapsible Sources & method section. Never a one-tab report shell.

Two failures that are silent and must be checked, not assumed:
- A single-file Artifact must **base64 every font and SVG**. A build linking `./assets/` falls back to
  system sans with no error.
- Run the build gate on every deliverable. `verify_report.py` checks the words; this checks the file,
  and `fonts_inlined` plus `no_legacy_palette` are the two checks that catch the failures above.
- Every chart must be readable on its own: metric and unit in the subcaption, the Carbon Arc dataset
  name in the source chip, a legend for any color that means something (`carbon-arc-report-v2`,
  "Chart card anatomy"). `chart_sources` in the build gate fails a chart with no chip or a nicknamed one.

```bash
python3 "$CA/verify_build.py" <report>.html      # $CA resolved in §5
```

Peer tiers cap at **three** — the v2 palette's fourth series color is also the loss color, so a fourth
tier reads as "this tier is falling."
