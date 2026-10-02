# Instruments: musicians

Working call shapes and the silent failures in each. `carbonarc-mcp` governs everything not stated here.
Verified on two musician pilots (one mid-tier, one arena-scale), Sep 2026. **A verdict is a dated prior:
re-survey live with `get_insights_from_entity` at `limit=250`** (the default of 100 silently truncates).

## Universal mechanics

- **Read the response metadata.** `metadata.frameworks[0]` reports the available date, location and
  aggregate options and `table_max_date`. It is the authoritative answer to "what cuts exist".
- **Keep each call under about 100 rows** (entities × periods × dimensions). Above that the tool returns
  an auto-generated summary instead of rows, and those summaries have been materially wrong.
- **`get_filter_options` in metadata mode is free** and prevents most failed calls.
- **On failure, vary one parameter at a time.** The three that differ per insight are `aggregate`,
  `date_resolution` (including omitting it) and `location_resolution`.

## Resolution by insight: check each one, never generalize

| Insight | location | date | aggregate |
|---|---|---|---|
| 292 streaming plays | us / ww / country / state / city | day / week / month / quarter | **`mean` only** |
| 256 social following | as above | as above | **none: pass no aggregate** |
| 141 follower demographics | **`ww` only** | **omit** | `mean` |
| 140 brand affinity | **`us` only** | **omit** | `mean` |
| 142 / 143 / 144 playlist peers | `us` | **omit** | `mean` |
| 652 / 658 / 646 resale (thick, by genre) | ww / us / dma / cbsa | day to quarter | `sum` |
| 15 / 265 / 267 / 269 resale (thin) | **`us` / `dma` only** | day to quarter, **not `year`** | `mean` / `sum` |

**Silent acceptance is not validation.** One thin-panel insight accepted `year` and returned rows while
its sibling rejected it.

## Streaming momentum (292)

```jsonc
entities: [ …band… ]                       // 7 artists max at quarter grain
insight:  { "insight_id": 292 }
filters:  { "location_resolution": "us",
            "date_resolution": "quarter",
            "filters": { "start_date": "2024-01-01", "end_date": "<today>",
                         "platform": ["<platform>"] } }
aggregate: "mean"
```

- **The `platform` filter is mandatory**; without it seven platforms multiply the rows.
- Run it **twice, on two platforms**, and compare on the window both share.

## Peer set (142 + 144)

```jsonc
insight:  { "insight_id": 144 }             // then repeat with 142
filters:  { "location_resolution": "us" }   // NO date_resolution
aggregate: "mean"
```

Each returns the full universe of about 23,000 artists (several MB) to a tool-results file. Parse with
`jq` or Python; never read it into context. Join the two and apply the top-200-then-rank rule.

## Follower demographics (141)

```jsonc
filters:  { "location_resolution": "ww" }   // "us" FAILS; no date_resolution
aggregate: "mean"
```

One snapshot of age, gender and ethnicity shares. **Worldwide, one point in time, and follower-based,
not listener-based.** All three caveats are mandatory wherever it is shown. There is no national
denominator to debias against, so the card cohort debias (the brand setup's cohort gate) cannot run; say the mix is the follower base as the
panel sees it.

## Brand affinity (140)

```jsonc
filters:  { "location_resolution": "us",    // "ww" FAILS; no date_resolution
            "filters": { "representation": ["Product Brand"] } }
aggregate: "mean"
question:  "Break out the score by each individual affiliated brand name. Return one row per affiliated entity name."
```

- **Without `filters.representation` the call collapses to a single mean across all brands and looks
  like a valid answer.** This is the most dangerous silent failure in the family.
- `representation` options: Product Brand, Retailer Banner Brand, Service Brand, Vehicle Make Brand.
- It measures **social-follower overlap, not spend**. Badge it that way.
- About 1,200 brands resolve per major artist.

**The differential is the deliverable.** Pull the subject's brands, take the top ~20, then re-pull those
same brands for the band (20 brands × 4 peers stays under the row limit) and compute the gap to the band
mean. Print `n` per brand: on the mid-tier pilot one peer was missing 11 of 20 brands.

## Live music

**The venue-reported box-office census is out of scope** (bulk-only; see `setup-talent.md`).

**Thick resale panel (the default)**: topics 652 tickets / 658 events / 646 order value, by genre,
carrying DMA and CBSA names. The by-location topic (654 / 647 / 657) is venue-grained and fails at `us`
or `dma`. Dates on the **sale**, so activity appears months before a tour. About 97% US coverage,
2022 onward.

```jsonc
insight:  { "insight_id": 652 }
filters:  { "location_resolution": "dma", "date_resolution": "quarter",
            "filters": { "start_date": "...", "end_date": "..." } }
aggregate: "sum"
```

**Thin resale panel**: 15 / 265 / 267 / 269, dates on the **event**, much longer history, and on the
arena-scale pilot about 22x thinner with non-uniform coverage by market that inverted its market ranking.
Use it for shape or to confirm event counts only, and say so.

**The days-to-event trap.** Resale accumulates toward each event date, so a market playing next month
shows large volume and one playing next spring shows almost none. *(On the arena-scale pilot the tour
opener showed 813 tickets and a later market showed 2, purely from timing.)* **A market ranking on
forward-looking resale requires normalizing by days to event, or it is cut.**

**Prices.** Within the MCP surface the only comparisons are resale to resale: across markets, across
tours, or against the band. Never present resale as face value, and never imply a premium you cannot
measure.

**Also worth a live survey**: an emerging-artists ticket listings asset (2015 onward, unexplored) for
anyone below arena scale, and ticket-buyer overlap (209698 / 209699 / 209700: who else this artist's
ticket buyers buy for). The overlap is ticket-buyer overlap, not a card wallet, and inherits the same
thickness problem.

## Release history

Album release (448 / 449, 1942 onward) and entity calendar events (219453) give chart markers from the
panel itself. Still web-verify every date and confirm each marker with the user before charting it.
