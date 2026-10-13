---
name: carbon-arc-report-v2
description: "Use this skill to build or restyle the HTML page for a Carbon Arc report, brief or dashboard: the Carbon Arc brand system, charts with a source on every number, and the checks that run before a page ships. A report skill calls it at its build step, after the data is pulled. Use it directly only to rebuild, restyle or fix an existing Carbon Arc page. Not for deciding what goes in a report or pulling data: for a new report, use this package's report skill."
---

# Carbon Arc — Analytical Report

Produces a report that looks and behaves like the reference brief in
`data.example.js`: Gray 800 canvas, `#323232` cards, Orange 500 as the single focus
accent, an optional Doto display word as the verdict, Hanken Grotesk figures with tabular
numerals, one tab per section, and animated SVG charts carrying provenance
badges.

Built on the **Carbon Arc Rebrand Design System** (Red Antler, 2026). The system
is mid-rollout — if a token here disagrees with the live design system, the
design system wins.

## Pick the format first

| The run | Format | Start from |
|---|---|---|
| A full report: an entry skill runs several modules, one tab each | **Report** (left rail, hash-routed tabs, Summary tab written last) | `template.html` |
| A single module run on its own, answering one question | **Brief** (one scrolling page, no rail, no tabs) | `brief/brief.example.html` |

The run decides the format, not the amount of material: a module invoked on its own always builds a
Brief, however many findings it has, and a full report never collapses into one (`ca-core` §8).
Never ship a report shell with a single nav item.

## Files in this skill

| File | Role |
|---|---|
| `carbon-arc-report.md` | **The style spec. Read it fully before writing markup.** Grounds, type roles, radii, component recipes, motion, rigor conventions. |
| `template.html` | Working skeleton — rail, routing, one summary and one content section. Start here; do not rebuild from scratch. |
| `charts.js` | The default chart kit: `CA_CHARTS.lineChart / hbars / stackBar / spark`. Do not restyle these four; add other chart types beside them (see "Beyond the default kit"). |
| `render.js` | Reference renderers from the example report: KPI tiles, rollup rows, tables. Rewrite the per-section functions; keep the tile/row/table builders. |
| `data.example.js` | The example report's data, showing the expected shape. |
| `brief/brief.example.html` | **Brief format**: a worked single-page example (a brand after a food-safety outbreak). Copy it and replace the content. |
| `brief/render.example.js` · `brief/data.example.js` | The brief's renderers (including a weekly gap-to-control column chart with a detection-floor band) and data. Uses the shared `charts.js`. |
| `assets/fonts.css` + `assets/fonts/` | The open-license (SIL OFL) report faces: Hanken Grotesk, DM Mono, Doto, with each face's license. Ship them with the report so it renders offline. |
| `assets/CarbonArc_Wordmark_White100_RGB.svg` | Wordmark for dark surfaces (symbol also included). |

## Build procedure

1. **Read `carbon-arc-report.md`.** Every color, size and component rule comes
   from there. Never invent palette values; never introduce a second accent.
2. **Get the data.** Query the source (Carbon Arc MCP, CSV, API, user-supplied
   numbers) and write `data.js` as `window.DATA = { … }` — flat named series and
   scalars, pre-aggregated. One key per chart or figure. No computation in the
   page beyond formatting. Shape:
   ```js
   window.DATA = {
     labels: ["01/24", "02/24", …],                    // shared x-axis
     demand_idx: { "Ann Arbor": [...], "US": [...] },  // indexed series
     demand_yoy: { "Ann Arbor": -1.5 },                // scalars for KPI tiles
     share_latest: { "Brand A": 42.6, … }              // bar-chart maps
   };
   ```
3. **Copy `template.html` → `<report-name>.html`**, plus `charts.js`,
   `render.js`, `data.js` and the whole `assets/` folder, into the output folder.
4. **Write the sections.** One `<section data-tab="/slug">` per nav item, in the
   template's markup vocabulary. Each: orange mono eyebrow → claim headline →
   lede (≤78ch) → KPI strip → chart cards → "what this means" callout.
   The summary tab is the executive read: the verdict sentence (optionally a
   single Doto display word above it), then one block per section
   — claim, two-sentence lede, one or two headline figures, and the one chart
   that proves it. Most important takeaway only; never a full recap.
5. **Write the renderers.** In `render.js`, one `renderX()` per section that
   fills the section's mount ids, registered in the `R` map at the bottom. Mount
   ids are empty `<div>`s in the markup; charts inject on first visit.
6. **Verify** every tab renders, no console errors, no chart overflows its card,
   and every figure carries a provenance glyph. Run `verify_build.py`: its
   `chart_sources` check fails any chart card without a source chip, or with a
   chip that does not name a Carbon Arc dataset.

## Brief procedure (a single module run on its own)

1. Read `carbon-arc-report.md` §7 (Brief format).
2. Copy `brief/brief.example.html` → `<brief-name>.html`, plus `charts.js`, `assets/`, and your own
   `data.js` / `render.js` (start from the examples). Fix the script and asset paths to `./`.
3. Top to bottom: floating nav pill → **Answer** (status pill, scope line, the question in Gray 300,
   the answer as a 56px claim, lede) → KPI strip → headline chart → numbered findings (text left,
   chart right) → the Orange **Bottom line** block → collapsible **Sources & method** → provenance
   footer.
4. 3–6 findings. Each is one claim plus one chart or table. Data limits go in a Yellow-labelled
   callout inside the finding they qualify.
5. **Sources & method is the module's Method tab**, collapsed: the data table, cross-checks, method
   bullets and linked public sources, ending with the AI disclaimer line (`carbon-arc-report.md`,
   Appendix). Everything the Method tab would carry goes here; nothing is
   dropped because the page is shorter.
6. Every rule below applies unchanged: chart card anatomy, provenance on every number, chart and
   numbers law, the pre-deploy checklist and `verify_build.py`.

## Beyond the default kit

Pick the form that shows the finding best. The four charts in `charts.js` and
the chart lists in each module are proven defaults, not a menu. Where another
form makes the point faster, use it: a scatter for two measures across many
brands, a map or state tile grid for anything geographic, a slope chart for
two periods, small multiples for one measure across several brands, a heatmap
for a measure by week and region, a dot-and-range for an estimate and its band.

A new chart type must:
- be inline SVG written in `render.js` (or a small `charts-extra.js` inlined
  the same way). No chart libraries or remote scripts: `no_external_refs` in
  the build gate fails them. For a map, prefer a state tile grid, which needs
  no geometry; if real outlines are needed, inline the paths.
- use the brand tokens from `carbon-arc-report.md`: palette, type roles,
  radii, motion, orange for the subject only.
- follow the chart card anatomy below, and sit in a `ch-` mount inside a
  standard card so `chart_sources` checks it.
- respect every integrity rule in "Provenance, chart and number law" below and in the modules. A new
  form is never a way around one: a map still carries the volume floor, a
  scatter still reads rank where the module forbids a level.

## Chart card anatomy

A reader who sees one card on its own, with no tab and no method page, must be
able to say what was measured, in what unit, from which dataset, over what
window, and what each color means.

- **Title** states the finding (a claim, as for headlines).
- **Subcaption names the metric and its unit** in the reader's words, then the
  population and window, then the caveat. Say what the bar length or line
  height is: "Shared-customer affinity, indexed to the top brand = 100". A
  description of behavior ("how much more often than chance…") explains the
  metric; it does not name it.
- **Source chip names the Carbon Arc dataset** exactly as the Sources table
  lists it, then the caveat: `■ Credit Card – US Complete Panel · rank, not
  level`. Never a nickname ("Card panel", "Panel", "Digital ads"). `▲` and `◆`
  chips name the document or public source instead.
- **Legend for every color that means something.** If rows or series are
  colored by group (surfaced vs. named rivals, subject vs. peers), the card
  carries a legend in the `lg-` mount. Orange is the report's subject only;
  groups that are not the subject use the comparison colors.
- **The marks show what the labels say.** A bar's length and the figure
  printed on it are the same quantity. `hbars` rows take an optional `disp`
  string: use it to format the value ("100", "+19%"), never to print a
  different quantity (a rank on a score bar). If the value must be withheld,
  pick a form that does not imply one (a ranked list, for example).
- **Gaps are explained.** If a ranked list skips positions because rows were
  filtered out, the subcaption says why ("#4 and #8 fall below the
  shared-customer floor").

## Provenance, chart and number law

Non-negotiables 6–8 of `carbonarc-mcp`, kept here because they are applied while the page is built. They bind exactly as the rest of that list does.

### Provenance everywhere (carbonarc-mcp 6)

Source chip per chart naming the panel's **population**, not just a vendor. "Data as of {date}" per page. Per-signal data-through dates where signals differ. Derived-versus-sourced badges. Quarter-coverage statements where a quarter is in play.

Attribution lives next to the number, not on a distant methodology page. **A source chip defined but never rendered is not provenance** — verify every chip actually appears in the output.

### Chart law (carbonarc-mcp 7)

Two kinds of rule. **Firm rules** protect what a chart claims and never bend. **Defaults** are what has
worked; beat them when another form shows the finding more clearly, and keep the reason in mind so the
alternative does not reintroduce the failure the default avoids.

**Firm:**
- No dual y-axes. Two scales on one plot let the chart maker choose the apparent relationship.
- A zero reference line on every YoY chart.
- An index baseline is defended (below). Never base to a partial period.
- The marks show what the labels say, and every chart names its metric and dataset
  (`carbon-arc-report-v2`, "Chart card anatomy").
- Action titles on every chart; the answer sits at the top of the page.
- No value label or annotation sits on a reference line, gridline, mark or another label. Move the label,
  never the line: a zero line struck through a figure reads as a different figure.

**Defaults:**
- Index to 100 for cross-scale comparison.
- Five series at most on one plot; past that, small multiples usually read better than a crowded chart.
- Avoid pies, donuts, gauges and radar charts: angle and area compare badly. A two- or three-part share
  can still be clearer as a single stacked bar.
- One mark type per plot unless the second one carries a different, labeled thing (a bar with a target
  marker, a dot with its range).

**An index baseline is a choice that must be defended.** Basing to a period that is a low for one series and a high for another manufactures the spread the chart appears to show. Base to a neutral period or a full-period average, and never to a partial period.

### Numbers law (carbonarc-mcp 8)

`tabular-nums` globally. Explicit `+` on positives. Basis points for changes in a ratio, percent for changes in a level. One precision rule per metric type. Em-dash plus footnote for missing values. Two significant digits of YoY on panel data — and that rule applies to the report's own dollar figures too, not only to the ones it labels.

## Non-negotiables

- **Two grounds only:** `#151515` canvas, `#323232` cards. No third background.
- **Single accent.** `#FF7125` marks the subject of the report and nothing else.
  Comparisons use Periwinkle / Emerald / Yellow and sit at lower opacity.
- **No shadows, ever.** Depth is hairlines (`#545454`) and glass
  (`rgba(50,50,50,0.7)` + hairline stroke). Hover changes border color, not shape.
- **No red.** The rebrand palette has none; caution and decline are Yellow 500.
- **Radii:** 24px cards, 100px pills and nav items, 5px chart bars. Never square.
- **Type roles:** Display (Doto, optional, once), H2 40/500, card title 20/600,
  body Hanken Grotesk 16/500, everything else DM Mono 500 uppercase at 10% tracking.
  The Doto display word is optional — at most one, on the summary.
  Figures are Hanken Grotesk with `tabular-nums`; mono is never reading copy.
- **Headlines are claims.** "Labor is the cost to watch", not "Labor costs".
- **Badge provenance on every number**: `■` measured panel · `▲` disclosure
  document · `◆` public/retrieved. Panel caveats live in the chart subcaption.
- **Every chart card says what it measures and where it comes from**, on the
  card itself, so it survives a screenshot. See "Chart card anatomy" below.
- **Inline styles only** in the markup (the page has no stylesheet beyond fonts,
  keyframes and a body reset). Charts style themselves via attributes.
- **No emoji, no stock imagery, no decorative illustration, no gradient grounds,
  no left-border accent callouts.** Data and type only.
- One easing curve, one duration base: `0.4s cubic-bezier(.4, 0, .2, 1)`.

## Pre-deploy checklist

Run before any Carbon Arc artifact ships. Add analysis-specific items on top.

- [ ] All four gates presented and answered (or explicitly waived; then the method page lists the call made at each gate).
- [ ] Every number traces to a retrieved series or arithmetic on one. No background-knowledge figures.
- [ ] Basis consistency: every comparator on the same component basis; every "all figures use X" statement literally true.
- [ ] Every headline decomposed; the one-period / one-entity / one-base test run and shown.
- [ ] Every driver named in a headline or summary has a tested cause, or the page lists what was searched and ruled out beside it (`ca-core` §3 1b).
- [ ] No claim contradicts a rendered chart label or table row.
- [ ] Partial periods excluded everywhere, including quarterly aggregations of monthly windows.
- [ ] Panel breaks detected, sized across geographies, disclosed.
- [ ] Every source chip renders, naming a population plus insight ID.
- [ ] Chart law: no dual axes, pies, gauges, radar, mixed marks, >5 series; zero line on YoY; sorted snapshot bars; defended index baseline.
- [ ] Numbers law: precision consistent; sign and currency order correct.
- [ ] Legibility: every chart opened at desktop and phone width; no value label crosses a reference line, gridline, mark or another label.
- [ ] No worked-example residue and no prose residue from retracted claims.
- [ ] Backtest run where non-negotiable 4 fires (investor audience, or a reported figure cited), and its verdict recorded even when it stays off the page.
- [ ] Negative results stated plainly: missing backtest, failed signals, unanswerable questions.
- [ ] Corrections log accurate and not overclaiming.
- [ ] Format matches the run: a Brief for a single module run on its own, the Report for a full report.
- [ ] Sources & method ends with the AI disclaimer, word for word.
- [ ] Markup balanced; no unresolved placeholders; renders standalone.

## Fonts

Reports use **open-license (SIL OFL) faces**, never the licensed brand binaries: Hanken
Grotesk (sans), DM Mono (mono), Doto (optional display word). They are the brand design system's
own named fallbacks, so the look holds, and the OFL allows embedding them in a report and handing
it to a client. Never bundle 26A1 Marund or MD Thermochrome files with a report; the build fails
if one reaches a plugin. Keep each face's `OFL-<Face>.txt` beside it.

## Deliverable

A folder that opens offline in a browser:

```
<report-name>.html
data.js
charts.js
render.js
assets/fonts.css
assets/fonts/…              (3 woff2 faces + their OFL license files)
assets/CarbonArc_Wordmark_White100_RGB.svg
```

If a single file is required, inline `data.js` / `charts.js` / `render.js` into
`<script>` blocks, base64 the wordmark, and base64 the woff2 faces into
`@font-face` `src` — nothing else changes.
