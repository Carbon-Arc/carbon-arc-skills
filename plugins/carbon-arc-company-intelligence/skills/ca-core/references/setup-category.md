# Setup: a small business, its category and its markets

Read during `ca-core` §2 when the subject is a small or regional business read through its category and
the markets around it. It adds to the shared checklist; it does not replace it. Read `setup-brand.md` as
well for the business, if it resolves, and for every named comparable.

Every id and resolution below is a **dated prior**, verified by free discovery and on a small number of
runs. Re-survey live; read accepted resolutions off the response, never off this file.

## What this subject adds to the setup

- **How the business makes money** (below), recorded before any signal is chosen: who pays, for what,
  through which channel.
- **Visibility**: one of the three outcomes of the routing test (below).
- **The category neighborhood**: the business's category, its parent, and two or three adjacent
  categories its customers trade between, each resolved to a `category` node and surveyed.
- **Comparable businesses**: four to six national brands in the same line of business, enumerated and
  ranked per `instruments/national-analogs.md`. Shown to the reader before anything is measured against
  them (`ca-core` gate 11).
- **The business's markets**: the ZIP codes, metro areas and state it operates in, from the reader.
- **Reference categories** for `ca-macro`: one essential, one discretionary with no tie to what drives
  the subject category.
- **For every panel used, the statistic it supports** (`instruments/panel-notes.md`).

## Start from how the business makes money

**There is no fixed lead instrument. Ask which panel observes the event this business is paid on**, then
verify it executes at the grain the question needs before promising it. A principled answer the data will
not serve is not an answer.

| How the business is paid | The instrument that observes it | Notes |
|---|---|---|
| The customer pays at the point of sale, by card | **Card spend on comparable businesses**, and the category by geography | The usual case, for example restaurants, retail, personal care, fitness and most services |
| An insurer or program pays after the service | **Healthcare closed claims**, located at the billing provider, so genuinely local | Practices. Within-period ratios only (`panel-notes.md`) |
| The patient finances the uninsured part | **Credit Card – Health Spend**, located at the provider | Elective and big-ticket care. Averages and shares only, never counts |
| The asset changes hands and the business takes a fee or a deposit | **Vehicle Registration** at ZIP, plus card for what residents spend, plus wages for cost | Vehicle-linked businesses; anything where the big payment never touches a card |
| Jobs paid by check or transfer | Permit job value as a trend (records, not projects), local wages | Contractors and home services; card sees only the small purchases |
| Membership or contract billing | Card on comparables with the **same billing model** | Billing is level even when use is seasonal |

**If the event the business is paid on never touches a card, card data is not a weak instrument; it is
the wrong one.** It will still return rows (a dealer's card spend is deposits and service, a practice's is
copays), and reading those as demand is a mechanism error, not a thin sample. Never divide one of these
instruments into card spend (`ca-core` gate 10); read them as their own trend beside it.

## The routing test: how visible is the business?

Unit count is a hint, not the test. What decides it is **whether the business resolves, and whether its
data is thick at the grain the question needs.**

1. **Does it resolve?** `search_entities` on the business name across `company`, `service`, `brand`,
   `retailer` and unfiltered. A same-named business elsewhere is a non-resolution. Record what you
   searched.
2. **If it resolves, probe the cell**: one feasibility probe on **626** at the grain the question needs.
   Judge thickness from the series itself; repeated multi-fold month-to-month swings mean too thin.
3. **If it does not resolve, check whether it appears as a field on someone else's records** (a
   provider on a claim, an operator on a venue). Read the dataset's fields in `data_library`. A field that
   exists but does not reach the MCP is out of reach for this report; say so as scope, not as a gap.

| Resolves? | Live card rows? | The run |
|---|---|---|
| No | — | **Market run.** Comparable businesses, the category and the markets; the business is never measured |
| Yes | None, or only on the **frozen** Detailed panel (stopped August 2025) | **Market run.** The business is still never measured; frozen history may be cited as history, dated |
| Yes | Yes | **Not this report.** A business the data can see is read directly in `company-insights-report`. Stop and offer it as a new run, in one question; the reader changes with the report |

The business that counts is **the one asking**. A franchisee, licensee or dealer of a brand that resolves
is not that brand: the brand becomes one of its comparables, and the run is a market run.
*(Oct 2026: runs that resolved the business and carried on drifted into competitive-position habits:
dollar levels for the business at Gate 1, demand-route language, extra probes. Routing now sends a
visible business to the report built for it, at the routing step where possible.)*

## Resolve the category

`search_entities` with `entity_representation: "category"`, then without the filter. Category nodes come
in two kinds:

- **Business categories** (a kind of store or service: restaurants, fitness centers, auto repair, home
  furnishing retail). Card spend lives here. These are the subject.
- **Product categories** (a kind of thing). They can carry attention and marketplace instruments but
  usually not demand. Where the business's category has no business-category node, use the nearest one
  and say so in one line.

Parent and child links did not resolve through the MCP in discovery. Build the neighborhood from the
nodes that resolve, and confirm what a node holds by asking which brands it contains.

## The so-what test, before every tab

**A finding the owner already knows from running the business is not a finding.** Name the owner's prior
for each tab. If the tab only confirms it, find the second-order move (a rate of change, a divergence, a
split into purchases and ticket, a comparison with businesses like theirs) or cut the tab. The useful
shape is *"you know X; what you cannot see from inside one business is that X is moving, and which part."*

**The second-order move has to be real.** Seasonality is the standing example: the shape of the year is
the thing an owner knows best, so it does not ship by default. A claim that the shape is *changing* ships
only if it survives all four checks: a robust measure (the average of the top three months over the bottom
three, never peak over trough); the longest window available, excluding pandemic years; each year's shape
correlated with the base year's; and the change holding across more than one year. *(On a waterfront
hospitality example a "widening season" passed the so-what test and failed all four checks; the tab was
cut.)* A finding manufactured to escape "so what" is worse than the obvious one it replaced.

## Phase 1a for a small business

- the business's **footprint and markets**: locations and the ZIP codes, metro areas and state they sit in
- **how it is paid**, from the owner or public sources, mapped to the table above
- its **local competitors**, retrieved, so that their absence from the data is a checked fact
- **unit count and unit growth** for each comparable business (`setup-brand.md`)
- **candidate events** across the five families, each with a predicted observable
- for a promotion read in `ca-events`, the promotion's dates, terms and markets

## Gate: cohort cuts

The brand setup's cohort gate applies unchanged (`setup-brand.md`, `card-cohorts.md`), on comparables and
on categories. On a category node the generation cut ran at `state` and failed at `us` in discovery, so
the category side is summed from states while the national denominator is pulled as `card-cohorts.md`
says. Check the two totals cover the same period before dividing.

## Instruments

`instruments/national-analogs.md` (comparable businesses), `instruments/panel-notes.md` (what each
panel's rows count and which statistic survives), `instruments/category-card.md` (category nodes,
members, share, tender), `instruments/category-markets.md` (geography, recovery, leading signals, demand
against supply), `instruments/category-macro.md` (the national denominator, reference categories,
cohorts, deferral, macro series). The brand instrument files (`card-core.md`, `card-cohorts.md`,
`cross-shop.md`) apply to every comparable and to a business that resolves.
