# Carbon Arc — Analytical Report (2026 rebrand)

Style spec for data briefs, dashboards, and client-facing analytical reports.
Grounded in the **Carbon Arc Rebrand Design System** (Orange 500, Gray 800/700
grounds, no shadows), set in the open-license Hanken Grotesk and DM Mono. Attach this file plus `charts.js`,
`render.js` and `assets/` to any project that should produce the look.

Where the brand guidelines describe print and the digital style guide describes
product, **this report follows the digital guide** — it is a screen.

---

## 1. Surfaces & color

Two grounds, never more. Cards never gradient.

| Role | Token | Value |
|---|---|---|
| Page canvas | `Background / Container-Dark` | `#151515` (Gray 800) |
| Cards, tiles, tables, tooltips | `Background / Card-On-Dark` | `#323232` (Gray 700) |
| Hairline inside cards | `Border / Strong` | `#545454` |
| Rail + section rules | Gray 700 | `#323232` |
| Chart bar track | Gray 800 | `#151515` |
| Primary text | `Text / Inverse` | `#FFFFFF` |
| Body text, axis labels, captions | Gray 300 | `#CACACA` |
| Metadata, footers | Gray 500 | `#7D7D7D` |
| Accent — the single focus color | `Orange 500` | `#FF7125` |
| Accent hover / press | | `#FF8C4D` / `#D1540F` |
| Active nav pill, selected row | Orange 500 ground, `#151515` label | |
| Highlighted table row, event marker | Orange 800 | `#662D0F` |
| Glass (pills, subject tag) | | `rgba(50,50,50,0.7)` + `#545454` stroke |

**Data-viz series, in order.** The subject of the report is always series 1 in
Orange 500; comparisons walk the secondary accents and recede in weight and
opacity, never in a new hue invented for the chart.

1. `#FF7125` Orange 500 — the subject (client, geography, brand)
2. `#5585FF` Periwinkle 500
3. `#68D133` Emerald 500
4. `#DFDA25` Yellow 500

Positive `#68D133` Emerald · negative / caution `#DFDA25` Yellow. **The rebrand
palette has no red** — do not introduce one; a negative number reads as negative
from its sign and its Yellow tone. Never use Orange for a sentiment value: it
belongs to the subject.

Stacked and ordinal data uses the **monochromatic** approach — one family,
tints then shades: `#FFC6A8 · #FF8D51 · #FF7125 · #CC5A1E · #994416`.

**No shadows anywhere.** Depth is hairlines and glass only. Hover states change
border color and lift 3px; they never add a shadow or change shape.

**Radii** (digital scale): 24px cards, tiles, tooltips · 32px hero blocks ·
100px buttons, pills, chips, nav items · 5px chart cells and bars. Nothing in
this brand has a square corner.

## 2. Type

Four roles only — Display, Headings, Body, Mono. Need emphasis? **Adjust weight,
not size.**

- **Display** — `Doto` (dot-matrix, standing in for MD Thermochrome), 116px, Orange 500. Optional and **at
  most one per report**, on the summary: a single word or figure that is the
  verdict. Not a bigger heading. Default is no display word — the verdict
  sentence carries the summary on its own.
- **H1** (rail title) 26px / 500 · **H2** (section headline) 40px / 500 /
  `-.02em` / 1.05 · **H3** (card title) 20px / 600 / `-.01em`.
- **Body** `Hanken Grotesk` 500, 16px / 1.5, max 78ch. Card subcaptions 13px Gray 300.
- **Mono** `DM Mono` 500 (it has no bold; never set it heavier), uppercase, **10% tracking**, 10px: eyebrows,
  KPI labels, badges, legends, table headers, footnotes, nav numbers.
  Mono is never reading copy.
- **Figures** are Hanken Grotesk at 500 with `font-variant-numeric: tabular-nums`
  — KPI values 34px, rollup stats 30px. The *label* around a figure is mono.
- Headlines are **claims, not labels** — "Labor is the cost to watch", never
  "Labor costs". Sentence case, no end punctuation unless multi-sentence.
- Carbon Arc is always two words. No emoji. The only glyph is the arrow `→`.

## 3. Layout

- Left rail 292px, on the canvas (not a second ground), 1px `#323232` right
  hairline: wordmark → orange mono eyebrow → report title → subject pill →
  numbered nav (`01`–`0n`) → provenance key pinned to the bottom.
- Main column 48px top / 56px side padding, shell max 1560px.
- One tab per section, hash-routed; only the active section displays, entering
  with a 400ms 6px rise.
- Section rhythm: eyebrow → headline → lede → KPI strip → chart cards →
  "what this means". Space by the t-shirt scale: 24px between cards, 32px
  between a strip and the grid, 8/16px inside a card.
- Chart grids are `repeat(auto-fit, minmax(440px, 1fr))` with 24px gaps;
  full-width for a single chart. Never center body copy.

## 4. Components

**KPI tile** — `#323232`, 24px radius, 3px sentiment keyline across the top,
mono uppercase label, 34px sans figure in the sentiment color, optional
sparkline, mono footnote prefixed with its provenance glyph. Hover:
`translateY(-3px)` + Orange 500 border.

**Summary block** (the executive read) — the summary tab is not an index of
tiles; it is a readable digest. One two-column block per downstream section,
separated by a `#323232` top rule with 36/44px padding. Left: orange mono
section link ending in `→`, a 26px claim, a two-sentence lede (≤52ch), and one
or two 40px figures with mono provenance labels. Right: the single chart that
proves the claim, in a standard card. Default to one chart per block, two at
most unless a third is essential: an executive should finish the tab in a
minute and know the whole report.

**Callout** — card with a mono uppercase label on top: Orange 500 for our read
and implications, Periwinkle for external/public context, Yellow for a data
limit. **No left-border accent bar** — that device is not in this brand.

**Table** — mono uppercase header on a `#7D7D7D` rule, 13px tabular body rows on
`#545454` hairlines, one highlighted row on `#662D0F`.

**Charts** (the default kit in `charts.js`; do not restyle these, and see SKILL.md "Beyond the default kit" for other forms)
- Line: gradient area under series 1 only, 2.6px focus stroke vs 1.6px
  comparisons at 48–80% opacity, direct end-of-line labels, dashed reference at
  index 100, event markers as an Orange 800 pill + dashed rule, crosshair
  tooltip in a 24px-radius glass card.
- Horizontal bars: 5px radius on a `#151515` track, value inside the bar in
  `#151515` when it fits, grow-in from the zero line.
- Stacked bars: monochromatic orange ramp, share labels inside segments >34px.
- Sparkline: 220×40, area gradient, end dot.

## 5. Motion

Clarifying · Expansive · Modular, executed **Precise** — straight paths, lands
exactly where intended, **no bounce, no spring, no overshoot**. Base duration
**0.4s**, easing `cubic-bezier(.4, 0, .2, 1)` everywhere. Chart draw-ins
600–1050ms staggered 60–80ms; line via `stroke-dashoffset`, bars via `scaleX`
from the zero line. Respect `prefers-reduced-motion`.

## 6. Rigor conventions

- **Badge every number by provenance.** `■` measured panel · `▲` disclosure
  document · `◆` public/retrieved. Event markers are `◆` only.
- State panel limits in the subcaption where the reader meets the chart — e.g.
  "read the trend, not the level" — not in a footnote.
- Pair each local signal with its national or category counterpart so the reader
  can tell "me" from "everyone".
- Every section ends with a "what this means" callout in plain language.
- Name the dataset, not the technology. Lead with the outcome. Every chart's
  source chip carries the Carbon Arc dataset name exactly as the Sources table
  lists it, and its subcaption names the metric and unit (SKILL.md, "Chart card
  anatomy").
- No emoji, no exclamation points, no stock imagery, no decorative illustration,
  no third ground color. Data and type only.

## 7. Brief format (single-question output)

For a single module run on its own (one question), use a single scrolling page
instead of the rail-and-tabs report. A full report keeps the rail and tabs.

- **Shell:** content column max 1424px, 72px side padding. No left rail.
- **Nav:** floating pill, sticky 20px from top — `rgba(0,0,0,0.45)`, 11.644px
  blur, 0.5px `rgba(255,255,255,0.5)` inner stroke. Wordmark · hairline · brief
  title · mono jump links (`01`–`0n`, `METHOD`) that fill Orange 500 with
  black type as each finding scrolls into view.
- **Answer block:** status pill (Orange 500, black 700 mono label) + mono scope
  line → the question at 26px Gray 300 → the answer as a 56px claim with the
  turn in orange → 18px lede, max 68ch.
- **Evidence:** KPI strip, then the headline chart in a 32px-radius hero card.
- **Findings:** "What's behind the answer" H2, then numbered findings on
  `#323232` top rules. Text column (≤400px, sticky) left, chart card right;
  wide tables span full width under a text row.
- **Bottom line:** the one Orange 500 field on the page, 32px radius, black
  32px type. One per brief.
- **Appendix:** `<details>` "Sources & method", collapsed by default — data
  table, cross-checks, method bullets, linked public sources. Its last line is
  always the disclaimer, word for word: "Generated by AI via Carbon Arc Skills.
  Not reviewed by Carbon Arc." The Report's Sources & method tab ends with it too.
- **Tables:** right-align numeric columns only; prose columns stay left.
- **Narrow screens:** side padding is `clamp(16px, 5vw, 72px)`; the question and the answer scale
  with `clamp()` down from 26px and 56px; the nav pill stays one line (title truncates, jump links
  scroll inside it); tables scroll inside their card; a finding's text column is sticky only while it
  sits beside its chart (the renderer switches it off when the row wraps).
