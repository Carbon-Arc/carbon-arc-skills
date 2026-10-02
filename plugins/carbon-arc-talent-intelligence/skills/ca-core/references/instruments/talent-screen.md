# Instruments: actors and titles

Working call shapes for film and TV. Verified on one actor pilot, Sep 2026, so treat every verdict here
as lightly validated and re-survey live with `get_insights_from_entity` at `limit=250`.

## Resolve the titles, not just the person

An `actor` entity gives aggregates; `title` entities give the analysis. Resolve each film or series with
`search_entities(..., entity_representations="title")`. Labels carry the year and format, for example
`<Title> (2024 - Movie)`. **Watch near-name collisions**: a remake, a TV series and unrelated titles
sharing a word all resolve. Build the filmography from a web search first, then resolve each title.

| | on the `actor` | on a `title` |
|---|---|---|
| Box office | annual totals, `country` filter only | **per title** |
| Streaming views | one aggregate line | **per title**, DMA-capable |
| Cohort audience | a blended, stale snapshot (below) | **cohort index, per title** |
| Cross-viewing affinity | none | **yes** |

## Box office (263 revenue / 264 tickets / 26 revenue per ticket / 25 indexed)

```jsonc
entities: [ …title ids… ]                    // a dozen titles in one call is fine
filters:  { "location_resolution": "us",     // us / country only
            "date_resolution": "year",
            "filters": { "start_date": "...", "end_date": "..." } }
aggregate: "sum"
```

Sparse by design: a title returns rows only in years it earned. **Check one level against a published
gross before quoting any level** (`ca-core` gate 8). On the pilot the ratios ran from 0.72x to 4.11x,
and one major recent release was absent entirely. Ranking is usable; levels need the check; coverage is
incomplete.

## Streaming views (310)

Thick and continuous, current to the panel's latest date, and cuttable to `dma`, so a screen brief can
carry a geography tab. Two normalizations, not interchangeable:

- **Calendar time** answers "what is being watched now" and shows composition.
- **Peak-aligned** (each title indexed to its own peak quarter = 100) answers "which titles hold".
  **Do not align on streaming debut**: the first quarter is usually partial and produces retention above
  100%.

Viewing by demographic cohort (506 / 507) is attached but untested.

## Cohort index per title (72856 strength / 72855 share)

```jsonc
filters:  { "location_resolution": "us",     // us only; month only
            "filters": { "representation": ["Generation"] } }
aggregate: "mean"
```

**Prefer this over the person-level resonance instruments for anything about audience.** It is an
index (positive means the title over-indexes against the general population), so titles compare
directly. Representations: Generation, Income, Education Level, Occupation, Marital Status, Gender, CBSA,
DMA, State.

**Test each representation for coverage across titles before building on it.** On the pilot Generation
varied usefully, Income was flat noise across every band and title, and Occupation covered one title of
three. Drop structurally tiny cohorts (those born before 1928); they produce the largest scores in the
matrix and are thin-cell noise.

## Cross-viewing affinity (192715 score + 192716 shared views)

The derived affinity instrument actors lack, attached to their titles.

```jsonc
filters:  { "location_resolution": "country", "date_resolution": "quarter",
            "filters": { "country": ["United States of America"],   // REQUIRED
                         "representation": ["title"],               // or "genre"; lowercase
                         "start_date": "...", "end_date": "..." } }
aggregate: "mean"
```

- **The `country` filter is mandatory and is the whole ballgame.** Without it the call scans the full
  graph, collapses to one score per month, and on the pilot cost several hundred times a filtered pull
  plus a slice of the daily quota. With it, a full breakout of about 2,400 titles was an ordinary pull.
- Returns several hundred KB to a tool-results file; parse it, never read it into context.
- **Gate on shared views before ranking on the score** (`ca-core` gate 1).
- Raw co-viewing is dominated by whatever released recently; the score isolates distinctive affinity.
  Show both so the contrast is visible.

## Person-level resonance (508 / 509) and cohort attributes (72855 / 72856 on the actor)

**A stale snapshot, not a trend and not a peer instrument.** Their affiliated entities are audience
attributes (income, education, generation, geography), not other actors. They blend three panels, and
the dataset **stops at 2024-08-31 for every actor**. Values sit near-constant for years, and on the pilot
two income bands inverted in the final month. If used at all: label the as-of date, never trend it,
never build a peer band from it.

## No brand affinity on an actor

Nothing measures an actor's audience against brands. **A partnership is still measurable from the
brand's side**: route it to `ca-events` as a company event on the partner brand.
