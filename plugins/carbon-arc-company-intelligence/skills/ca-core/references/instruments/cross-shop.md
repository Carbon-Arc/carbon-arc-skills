# Cross-shop — who shares your customer

## Two instruments, two questions. A brief should carry both.

| | measures | answers |
|---|---|---|
| **Card overlap** | the same cardholders paying two brands | the **wallet ecosystem** — where else your customers spend |
| **Browsing overlap** | the same users visiting two sites | **consideration and substitution** — who they weigh you against |

A tab built on card alone answers *where your customers spend*, never *who they consider instead of
you*. Say that on the tab: readers hear "cross-shop" and infer substitution.

## The hard scope boundary — state it on the tab

**nPMI is co-occurrence, not flow.** It says whether two brands share customers more than chance
predicts. It cannot show that a customer switched, in either direction, at any window. A customer
appearing at both may have added a visit.

So the module answers *"who shares my customer"* and never *"who took my customer"*. The flow question
needs a cohort measure; the retention family is parked as uninterpretable, so with MCP-only instruments
the honest answer is that we cannot answer it. Put it in `gaps`.

## Card: insight 120277

`location_resolution: "country"` · `date_resolution: "month"` · `aggregate: "mean"` · one main entity.

It returns the main entity against **every** partner — roughly 2,200 full-coverage pairs, about 4MB, so
expect the file-dump path rather than inline rows. Passing extra entities makes each of them a main
entity too and doubles the result; it does not filter to the pair.

**48289 and 585 are not substitutes.** Despite the identical label, 48289 errored on every variant tried
and 585 fails validation on a `service` entity. Use 120277.

### Window — fixed, not chosen

**Rank on a trailing four-month mean at `month` grain, and compare to the same four months a year
earlier.** Not a calendar year, not a trailing four quarters.

Why it is a rule: re-ranking the pilot on a four-quarter-2025 mean instead moved the fast-growing rival from **8th to
4th**. A four-place swing in a headline rank, from nothing but the averaging window. The same-season
comparison also removes seasonality, which a trailing-4Q-versus-2Q comparison does not.

It costs coverage — full-coverage pairs fell 2,214 (quarterly) to 1,572 (monthly, both windows), about
29%, because monthly cells are thinner. The pairs it drops are deep in the tail. State it.

### Read rank, never the level

**Run the drift check first** (`gating.md` §3). On the pilot, 73% of pairs rose between windows by a mean
of +0.0037 with stdev 0.0087 — a panel-densification shift, not affinity. A brand's +0.010 "rise" sat
inside it.

Ranking inside a single window makes drift irrelevant by construction, which is the other reason the
four-month convention earns its place. For movement, use **change in rank**, not change in score.

**Displaying the card ranking:** inside one window, the score may be shown indexed to the top-ranked
partner = 100, so the chart shows spacing as well as order. The index never leaves its window (no
index-on-index movement) and the raw score never reaches the page. Browsing overlap stays rank only.

### Thickness

**48288 takes the same call shape as 120277 above**: `location_resolution: "country"` ·
`date_resolution: "month"` · `aggregate: "mean"`. **This family does not accept `us` at all** — the
accepted list is `country`, `state`, `dma`, `cbsa`, `zip` — and an out-of-range geography returns an
**empty result set rather than an error**, so it reads as "this brand shares no customers with anyone"
instead of as a bad call. *Observed Sep 2026: `us` on 48288 ran 22 minutes and returned zero rows.*

Pull **48288 shared users alongside 120277 every time.** Floors: ~150 shared users to rank, 100–149
directional, and the panel's own floor is ~50. Name the pairs that never clear it, **including any
declared competitor** — a rival too thin to read is itself worth telling the client.

## Browsing: insights 639 + 640 — it works, and the first pilot read said it did not

```
location_resolution: "country" · date_resolution: "month" · aggregate: "mean"
filters: {representation: ["Product Brand"], country: ["United States of America"]}
```

**Correction, 2026-09-21.** An earlier version of this file recorded that *"640 returned no partner
dimension — one number per month, the mean across all partners."* **That was wrong.** 640 returns a full
`AFFILIATED ENTITY NAME` dimension: on the re-test, **35,864 rows across 994 partners and 70 months** for
a single subject.

The calls behind the original verdict failed for two unrelated reasons, and both errors surface as the
same unhelpful message — *"the entity and insight combination could not be validated"*:

- `country` filtered as `"United States"`. The literal is **`"United States of America"`**.
- `start_date` / `end_date` passed as filters. On 640 they are **columns, not filter keys**.

`location_resolution: "us"` also fails on 640 at every date grain; `country` is the one that works.

**The lesson is the general one, not the specific one.** A validation error names the entity/insight
pair, so it reads as an availability failure, and an availability failure is a conclusion you then write
into the foundation. It is usually a bad filter literal. **Call `get_filter_options(filter_key=...)`
before passing any filter value — it is free — and never record a lens as dead until a call with
verified literals has failed.**

Still true from the original read, and still binding:

- **639 puts mean shared users per pair at 14.5–27**, against the card ranking floor of ~150. So the
  browsing panel ranks *order* credibly and **cannot carry a level**. Never print an nPMI value from it.
- **`table_max_date` is 2026-03-31**, roughly five months behind card. A card-and-browsing small multiple
  on a matched window is therefore not possible at the card cutoff. Match to the browsing cutoff and say
  so, or ship them on stated separate windows.
- **508/509 `Affinity` is not a substitute** — that topic is demographic *skew*, not brand-to-brand.

### Its live use: discover the competitive set, then measure it

**Sequence — break-gate, discover, gate, measure, share. The order is the method.**

0. **Break-gate the subject first.** Pull its Website Traffic (379) and run the panel-break gate
   (`gating.md` §7). Establish the clean window *before* ranking anything. On the pilot, ranking on a
   window that straddled the subject's break returned a competitive set with **3 of 10 names in common**
   with the clean window — and the broken one looked entirely plausible.
1. **Discover** with 640, subject only, the call shape above, ranked inside the clean window.
2. **Gate the ranking. Two gates.**
   - **Stability** — keep partners present in **≥85% of periods**. nPMI on a thin partner is a ratio with
     a tiny denominator and floats high on almost no data. On the pilot this cut 663 candidates to 154 and
     removed a dog-food box (10 of 70 periods) and **an Australian electricity utility** (15 of 70) from
     the raw top five.
   - **Rank reproducibility** (`gating.md` §8) — rank on **two adjacent six-month windows** and compare the top ten.
     **Expect ≥7 of 10 in common; below that the panel moved under you, so stop and find the break.**
     Free, runs on data already retrieved, and it catches breaks the subject's own series can hide. Pilot
     overlaps against the last clean window: 7/10, 8/10, 7/10, 9/10 across 2023–2025 — and **3/10** for
     the one post-break window.
3. **Measure** — Website Traffic (379) for the subject plus the **top three survivors**, at **`quarter`
   grain**. Four entities at `month` over six years crosses the retrieval cap and comes back as prose
   plus a table stripped of its date column; `quarter` returns a clean labelled table and suppresses the
   month-grain volatility.
4. **Share** — each brand as a percent of the set total, per period. Share removes panel-wide drift
   (densification lifts numerator and denominator together) and **manufactures a compositional artifact
   whenever one member breaks**. Run the break gate on every member's **absolute** series first and cut
   the window at the earliest break in any member. *Pilot:* the subject went 39.6% → 5.5% in one quarter
   while the three peers gained exactly 34.1 points between them — shares sum to 100, so a peer gain
   equal to the subject's loss is a denominator artifact, never a market move, and the peers' *absolute*
   series running on straight through is what proves it. Inside the clean 21 quarters the finding was
   real: the subject took the set, **26.3% → 40.4%**, with 9.4 of the 14.2 points out of the #2 brand.

**A category-implausible name in an affinity ranking is evidence of a broken panel, not of a noisy
metric.** An earlier version of this file prescribed filtering out the apparel and DTC names that showed
up mid-ranking. That was treating a symptom: on the clean window they are simply not there, and no
category filter was needed to get a correct set. Sanity-check against the subject's category, but treat a
failure as a stop, not a cleanup step.

**`no_shared_users` does not come back alongside the score**; the aggregate collapses to nPMI alone. There
is no volume gate here, and the stability gate is its proxy. Say so rather than implying the pairs were
thickness-tested.

## Presentation

- **nPMI, not a penetration rate.** A rate re-inherits the partner-size bias nPMI exists to remove.
- **Never the raw shared count** — redundant once you have the score, and it just ranks partner size.
- Lead the tab with the **surfaced** names, not the declared ones: the declared set is what the client
  already watches, the surfaced set is what they are not watching.
- Where both panels are available, show them as synchronised small multiples **in identical row order**,
  on the same window, and treat any disagreement as the finding.
