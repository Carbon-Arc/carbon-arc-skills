# Build notes — `carbon-arc-report-v2`

Everything here is a **silent** failure: it ships looking fine. The four default charts in `charts.js`
are not edited, so each fix is a post-render pass in `render.js`. Copy the helpers rather than rewriting
them. New chart types written per `carbon-arc-report-v2` "Beyond the default kit" can avoid these
traps directly.

## The one rule that governs all post-render passes

**Read ATTRIBUTES, never geometry.** Charts build on first route visit, and at that moment the section is
still `display:none`, where `getBBox()`, `getBoundingClientRect()` and `offsetWidth` all return **0**.
A pass written on `getBBox()` silently does nothing and looks like a logic bug. `charts.js` sets `x`,
`y` and `width` explicitly on every rect and text, so attributes are always readable.

The same trap ruins verification: a geometry check run across all tabs reports clean because the hidden
ones measure 0x0. **Unhide every section, await a frame, measure, then restore.**

## Helpers

```js
// 1. The y-axis carries no unit. cfg.unit only reaches the TOOLTIP; ticks are String(Math.round(v)).
//    Y-axis ticks are the only text at x = mL-9 = 33 with text-anchor="end".
function yAxisUnit(id, suffix) {
  const svg = document.getElementById(id) && document.getElementById(id).querySelector("svg");
  if (!svg) return 0;
  let n = 0;
  svg.querySelectorAll("text").forEach(t => {
    if (t.getAttribute("text-anchor") === "end" && Math.abs(+t.getAttribute("x") - 33) < 1.5
        && !t.textContent.endsWith(suffix)) { t.textContent += suffix; n++; }
  });
  return n;
}
// Apply to percent-scaled charts ONLY. An index chart (100 = base) must keep bare numbers.

// 2. stackBar drops any segment label under 34px wide (`if (w > 34)`), so a 4-5% share vanishes and the
//    row looks like a data gap. Re-add at 9px, share computed from rect widths in that row.
function stackBarFillLabels(id) {
  const svg = document.getElementById(id) && document.getElementById(id).querySelector("svg");
  if (!svg) return 0;
  const segs = [...svg.querySelectorAll("rect")].map(el => ({ el,
    x: +el.getAttribute("x"), w: +el.getAttribute("width"), y: +el.getAttribute("y") }));
  const labs = [...svg.querySelectorAll("text")].filter(t => t.getAttribute("text-anchor") === "middle")
    .map(t => ({ x: +t.getAttribute("x"), y: +t.getAttribute("y") }));
  let added = 0;
  segs.forEach(s => {
    if (!s.w) return;
    const cx = s.x + s.w / 2;
    if (labs.some(l => Math.abs(l.x - cx) < Math.max(s.w / 2, 4) && Math.abs(l.y - s.y) < 34)) return;
    const rowTotal = segs.filter(o => Math.abs(o.y - s.y) < 2).reduce((a, o) => a + o.w, 0);
    if (!rowTotal) return;
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", cx); t.setAttribute("y", s.y + 18);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-family", "'DM Mono', monospace");
    t.setAttribute("font-size", "9px"); t.setAttribute("font-weight", "700");
    t.setAttribute("fill", "#151515");
    t.textContent = Math.round(s.w / rowTotal * 100) + "%";
    svg.appendChild(t); added++;
  });
  return added;
}
```

## Chart-by-chart traps

| Trap | Symptom | Fix |
|---|---|---|
| `refLabel` | Collides with a series end label when a series happens to end near the reference line. Passes on five charts, fails on the sixth | **Do not pass `refLabel`** on any chart with end labels. The line still draws |
| `dy` end-label nudge | Tuned to the FINAL values. Two series that swapped order when the window was extended went from separated to overlapping | Re-check every nudge whenever the window moves or the series changes |
| `hbars` label spill | A bar just over the 54px `inside` threshold draws its label right-aligned inside and it spills left over the row name | Keep `disp` to a bare number on short bars. Units go in the subcaption |
| `hbars` gutter | Fixed 132px. Row names past ~18 characters clip | Shorten brand names |
| Peer tiers | The 4th series color is also the loss color, so a 4th tier reads as "falling" | Cap at three tiers |

## Two more post-render passes

```js
// x-axis labels collide at the right edge. charts.js draws every Nth label PLUS
// the last, so whenever (N-1) is a multiple of ceil(N/8) the final two overlap.
// It bit three charts on one report. Attributes only: the bottom row is
// text-anchor=middle low in the viewBox.
function dedupeXLabels(id) {
  const svg = document.getElementById(id) && document.getElementById(id).querySelector("svg");
  if (!svg) return 0;
  const vb = (svg.getAttribute("viewBox") || "0 0 760 322").split(/\s+/).map(Number);
  const floor = vb[3] - 30;
  const rows = [...svg.querySelectorAll("text")]
    .filter(t => t.getAttribute("text-anchor") === "middle" && +t.getAttribute("y") > floor)
    .sort((a, z) => +a.getAttribute("x") - +z.getAttribute("x"));
  let last = -1e9, n = 0;
  rows.forEach(t => { const x = +t.getAttribute("x"); if (x - last < 40) { t.remove(); n++; } else last = x; });
  return n;
}
```

**Line-chart end labels collide when two series end at similar values.** `dy` is tuned per chart and
must be re-checked whenever the window or the series changes. On an indexed event chart where both
series return to the base, the two labels land on top of each other: separate them explicitly, for
example `dy: -7` on the focus series and `dy: 16` on the comparison.

## Verification screenshots must wait for the animation cascade

`hbars` grows each bar from the zero line with a `${i * .06}s` stagger on a `.75s` curve, and the value
label is drawn in `#151515` **inside** the bar. A screenshot taken before a row finishes growing shows
that row's label as dark text on the dark track, which reads as **a missing or clipped label** and looks
exactly like a bug worth fixing.

An 11-row chart finishes at roughly `0.06 * 10 + 0.75 = 1.35s` after the section is routed to. **Wait at
least 2.5 to 3 seconds after setting the route before capturing**, or a real verification pass will send
you chasing a defect that does not exist. The same applies to `stroke-dashoffset` line draws at 1.05s.

## Single-file build

Inline `fonts.css` with base64 woff2, base64 the wordmark, inline `data.js` / `charts.js` / `render.js`.

**The font regex must handle quoted urls** — `assets/fonts.css` writes `url("fonts/X.woff2")`, and a naive
`url\(([^)]+\.woff2)\)` does not match, leaving the `@font-face` blocks with **zero** payloads and a silent
fall back to system sans. Use `url\((['"]?)([^)'"]+?\.woff2)\1\)`.

Assert all of these or the build does not ship:

```python
assert "./assets" not in html and "<script src=" not in html
assert html.count("data:font/woff2;base64") == 3   # Hanken Grotesk, DM Mono, Doto (open license)
assert "Marund" not in html and "Thermochrome" not in html   # licensed faces never ship
assert len(html.encode()) / 1024 > 75      # the three faces alone embed to ~65KB; a Brief is ~120KB
```

## Verifying in the preview pane

The pane serves a local file as a `data:` URL, so relative `<script src>` and `./assets/` do **not**
resolve and `location.hash` does **not** persist. Verify the **single-file** build, drive
`CA_RENDER.build(route)` directly instead of setting hashes, and re-set the viewport after every
`navigate` — it resets, and at 800px the 1560px layout overlaps badly.

## Editing a finished report

The summary tab **duplicates every tab's claim, lede and headline figures**. A tab rewrite therefore has
two places to change, and the summary is the one that gets forgotten. Grep the retired wording before
declaring the edit done.
