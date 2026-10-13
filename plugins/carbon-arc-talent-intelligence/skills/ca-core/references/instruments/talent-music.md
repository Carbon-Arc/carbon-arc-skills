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
- **Chart source labels use the catalog names** the build check knows: Music Data (streaming, social),
  Music Artist & Content Data (playlist peers, brand affinity, demographics), Secondary Market Ticket
  Sales (resale).

## Resolution by insight: check each one, never generalize

| Insight | location | date | aggregate |
|---|---|---|---|
| 292 monthly listeners | us / ww / country / state / city | day / week / month / quarter | **`mean` only** |
| 256 social following | **`ww` / `country`** (`us` is silently replaced by `country`; read it as not US) | as above | **none: pass no aggregate** |
| 141 follower demographics | **`ww` only** | **omit** | `mean` |
| 140 brand affinity | **`us` only** | **omit** | `mean` |
| 142 / 143 / 144 playlist peers | `us` | **omit** | `mean` |
| 15 / 265 / 267 / 269 resale, by artist (live) | **`us` / `dma` only** | day to quarter, **not `year`** | `mean` / `sum` |
| 141213 / 141201 resale per show (event as entity) | **`us` / `dma`** on the artist; **`venue`** on a venue node | day to quarter | `sum` |
| 652 / 658 / 646 resale (dynamic prices, by genre) | ww / us / dma / cbsa | day to quarter | `sum` |

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
filters:  { "location_resolution": "ww",    // "us" FAILS; no date_resolution
            "filters": { "demographic": ["female_amount"] } }   // ONE value per call
aggregate: "mean"
```

**Without the `demographic` filter, or with more than one value in it, the call collapses to one mean per
artist and looks like a valid answer.** Pass one value per call (list them with `get_filter_options`,
key `demographic`: age bands, gender, four ethnicity groups). Before any audience chart, run the defect
sweep: a share identical across every artist, or ethnicity shares that do not sum to about 100%, means
the cut cannot separate artists; drop it and say so.

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

**Check every resale family is live first.** Read each tearsheet in `data_library` on every run; a
frozen panel is history only, never the spine. *(Dated prior, Oct 2026: the dynamic-price family, 652 /
658 / 646 by genre and 654 / 647 / 657 by location, on "Secondary Market Ticket Sales and Listings", was
marked historic as of September 2026. The by-artist series and the event-as-entity insights, on
"Secondary Market Ticket Sales - US", were updating weekly.)*

**By-artist series (the spine)**: 267 tickets / 265 order value / 269 events, on the `artist` node, dated
on the **event**, with history back to the artist's earliest tours. Price per resale ticket = 265 ÷ 267.

```jsonc
insight:  { "insight_id": 267 }             // then 265
filters:  { "location_resolution": "us", "date_resolution": "month",
            "filters": { "start_date": "...", "end_date": "..." } }
aggregate: "sum"
```

**Show rows (event as entity)**: 141213 tickets / 141201 order value, one row per show, each carrying the
show date and venue in the event name and, at `dma`, the market. Two routes return the same rows: the
`artist` node with the concert category, or no entity with the artist's own parent event ids
(`references/event-rows.md` in `carbonarc-mcp`, "Finding an act's parent events"). `venue` does not build
on the artist. *(Dated prior, Oct 2026: show rows started in 2024; earlier tours were in the by-artist
series only.)*

```jsonc
entities: []                                // or [{ carc_id: <artist>, representation: "artist" }] with no event_id
events:   [{ "event_id": <parent event>, "event_category_id": <concert id>, "event_type": "Entity Events" }]
insight:  { "insight_id": 141213 }          // then 141201
filters:  { "location_resolution": "dma", "date_resolution": "day" }
aggregate: "sum"
```

Read the concert category id and label from `get_events_from_insight` each run. A peer's shows use the
same call with the peer's parent event; the other concerts at a venue use the venue node, the concert
category, `location_resolution: "venue"` and a date filter on the quarters of the artist's shows. Size
each pull by shows, not periods: quarter grain does not collapse shows into one row.

**Dynamic-price family (652 / 658 / 646, by genre)**: carries DMA and CBSA names and dates on the
**sale**, so a tour's markets include its presale months. It can be far larger than the by-artist
series. While frozen it is still a **second asset through its end date** (`carbonarc-mcp`
`references/data-state.md`, "Frozen panels"): compare tour totals and market rank with the live series,
never as the spine. Where the two disagree on volume, claim no volume.

**The days-to-event trap.** Resale accumulates toward each event date, so a market playing next month
shows large volume and one playing next spring shows almost none. *(On the arena-scale pilot the tour
opener showed 813 tickets and a later market showed 2, purely from timing.)* **A market ranking on
forward-looking resale requires normalizing by days to event, or it is cut.** Show rows for shows not yet
played are still collecting sales: drop them, or compare shows only at the same days before the show.

**Markets without show rows**: 267 / 265 on the `artist` node at `dma`, quarterly, over each tour window,
with a date filter. One row per market per quarter; pool a tour's quarters per market. The same call on
each band member gives the band benchmark.

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
