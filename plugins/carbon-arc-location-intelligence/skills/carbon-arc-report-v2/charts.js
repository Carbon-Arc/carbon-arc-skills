/* Carbon Arc chart engine (2026 rebrand) — attribute-styled SVG, no stylesheet dependency. */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  /* Carbon Arc rebrand tokens — dark container (#151515), cards on #323232. */
  const T = {
    ink: "#FFFFFF", ink2: "#CACACA", muted: "#CACACA", grid: "#545454",
    hair: "#545454", hair2: "#7D7D7D", surface: "#323232", track: "#151515",
    /* subject = Orange 500; comparisons walk the secondary accents */
    s: ["#FF7125", "#5585FF", "#68D133", "#DFDA25"],
    loss: "#DFDA25", gain: "#68D133",
    /* monochromatic ramp — one family, tints then shades */
    ramp: ["#FFC6A8", "#FF8D51", "#FF7125", "#CC5A1E", "#994416"]
  };
  const IDX = { s1: 0, s2: 1, s3: 2, s4: 3, b1: 0, b2: 2, b3: 1, b4: 3 };
  const col = k => T.s[IDX[k] != null ? IDX[k] : 0];
  let uid = 0;
  /* Reduced motion: the template turns animations off, so nothing may start hidden waiting for one. */
  const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);

  function E(t, a, kids) {
    const e = document.createElementNS(NS, t);
    for (const x in (a || {})) e.setAttribute(x, a[x]);
    (Array.isArray(kids) ? kids : kids ? [kids] : []).forEach(c => c && e.appendChild(typeof c == "string" ? document.createTextNode(c) : c));
    return e;
  }
  const mono = "'DM Mono',ui-monospace,monospace";
  const sans = "'Hanken Grotesk',system-ui,sans-serif";
  function txt(s, o) {
    const a = Object.assign({ "font-family": mono, "font-size": "11px", fill: T.muted }, o || {});
    return E("text", a, s);
  }
  function svgEl(W, H, maxW) {
    const s = E("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", preserveAspectRatio: "xMidYMid meet", role: "img" });
    s.style.display = "block"; s.style.overflow = "visible";
    if (maxW) s.style.maxWidth = maxW + "px";
    return s;
  }
  function mountSvg(mount, svg) {
    mount.innerHTML = "";
    const w = document.createElement("div");
    w.style.width = "100%"; w.style.overflowX = "auto";
    w.appendChild(svg); mount.appendChild(w);
  }
  function tipEl() {
    let t = document.getElementById("ca-tip");
    if (!t) {
      t = document.createElement("div");
      t.id = "ca-tip";
      t.style.cssText = "position:fixed;pointer-events:none;z-index:80;background:" + T.surface +
        ";border:1px solid " + T.hair + ";border-radius:24px;padding:12px 16px;font-family:" + sans +
        ";font-size:12px;font-weight:500;color:" + T.ink + ";opacity:0;transition:opacity .2s cubic-bezier(.4,0,.2,1)";
      document.body.appendChild(t);
    }
    return t;
  }

  function lineChart(mount, cfg) {
    const W = 760, H = cfg.h || 322, mL = 42, mR = 132, mT = 20, mB = 36;
    const L = cfg.labels, N = L.length;
    let vals = []; cfg.series.forEach(s => s.values.forEach(v => v != null && vals.push(v)));
    const lo = cfg.yMin != null ? cfg.yMin : Math.min(...vals), hi = cfg.yMax != null ? cfg.yMax : Math.max(...vals);
    const x = i => mL + (W - mL - mR) * (N == 1 ? 0 : i / (N - 1));
    const y = v => mT + (H - mT - mB) * (1 - (v - lo) / (hi - lo));
    const svg = svgEl(W, H, 860);
    const defs = E("defs"); svg.appendChild(defs);
    const gid = "cag" + (++uid);
    const focus = cfg.series[0];
    const fc = col(focus.cls);
    const g = E("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    g.appendChild(E("stop", { offset: "0%", "stop-color": fc, "stop-opacity": .22 }));
    g.appendChild(E("stop", { offset: "100%", "stop-color": fc, "stop-opacity": 0 }));
    defs.appendChild(g);

    const step = (hi - lo) / 4;
    for (let k = 0; k <= 4; k++) {
      const gv = lo + step * k;
      svg.appendChild(E("line", { x1: mL, x2: W - mR, y1: y(gv), y2: y(gv), stroke: T.grid, "stroke-width": 1 }));
      svg.appendChild(txt(String(Math.round(gv)), { x: mL - 9, y: y(gv) + 3.5, "text-anchor": "end", "font-size": "10.5px" }));
    }
    const rY = cfg.refY != null ? cfg.refY : 100;
    if (lo < rY && hi > rY) {
      svg.appendChild(E("line", { x1: mL, x2: W - mR, y1: y(rY), y2: y(rY), stroke: T.hair2, "stroke-width": 1.5, "stroke-dasharray": "2 4" }));
      if (cfg.refLabel) svg.appendChild(txt(cfg.refLabel, { x: W - mR + 5, y: y(rY) + 3.5 }));
    }
    L.forEach((lb, i) => { if (i % Math.ceil(N / 8) == 0 || i == N - 1) svg.appendChild(txt(lb, { x: x(i), y: H - mB + 18, "text-anchor": "middle", "font-size": "10.5px" })); });

    (cfg.markers || []).forEach(m => {
      const mx = x(m.i), endSide = mx > (W - mR - 100);
      // m.to spans a period (e.g. the two weeks a moved holiday touches) as a band instead of a rule
      if (m.to != null) svg.appendChild(E("rect", { x: Math.min(mx, x(m.to)), y: mT, width: Math.abs(x(m.to) - mx), height: H - mB - mT, fill: "#662D0F", opacity: .45 }));
      else svg.appendChild(E("line", { x1: mx, x2: mx, y1: mT, y2: H - mB, stroke: T.hair2, "stroke-width": 1.2, "stroke-dasharray": "3 4" }));
      // a band's pill sits one row down so it never lands on a point event's pill
      const bw = (m.label.length * 5.4) + 20, bx = endSide ? mx - bw - 3 : mx + 3, dy = m.to != null ? 20 : 0;
      svg.appendChild(E("rect", { x: bx, y: mT - 8 + dy, width: bw, height: 17, rx: 8.5, fill: "#662D0F" }));
      svg.appendChild(E("circle", { cx: bx + 9, cy: mT + .5 + dy, r: 2.6, fill: T.s[0] }));
      svg.appendChild(txt(m.label, { x: bx + 15, y: mT + 4 + dy, "font-size": "9.5px", "font-weight": 700, fill: "#FFC6A8" }));
    });

    // area under focus series
    if (focus.values.some(v => v != null)) {
      let d = "", st = false, first = null, last = null;
      focus.values.forEach((v, i) => { if (v == null) return; if (first == null) first = i; last = i; d += (st ? "L" : "M") + x(i) + " " + y(v) + " "; st = true; });
      const area = E("path", { d: d + `L${x(last)} ${y(lo)} L${x(first)} ${y(lo)} Z`, fill: `url(#${gid})`, stroke: "none" });
      if (!RM) { area.style.opacity = 0; area.style.animation = "ca-fade .7s cubic-bezier(.4,0,.2,1) .25s forwards"; }
      svg.appendChild(area);
    }

    cfg.series.forEach((s, si) => {
      const c = col(s.cls);
      let d = "", st = false;
      s.values.forEach((v, i) => { if (v == null) return; d += (st ? "L" : "M") + x(i) + " " + y(v) + " "; st = true; });
      const p = E("path", { d, fill: "none", stroke: c, "stroke-width": si == 0 ? 2.6 : 1.6, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: si == 0 ? 1 : (s.muted ? .48 : .8) });
      if (!RM) {
        p.style.strokeDasharray = "2400"; p.style.strokeDashoffset = "2400";
        p.style.animation = `ca-dash 1.05s cubic-bezier(.4,0,.2,1) ${si * .07}s forwards`;
      }
      svg.appendChild(p);
      let li = s.values.length - 1; while (li >= 0 && s.values[li] == null) li--;
      if (li >= 0) {
        if (si == 0) svg.appendChild(E("circle", { cx: x(li), cy: y(s.values[li]), r: 7, fill: c, opacity: .16 }));
        svg.appendChild(E("circle", { cx: x(li), cy: y(s.values[li]), r: si == 0 ? 4 : 3, fill: c, stroke: T.surface, "stroke-width": 1.6 }));
        svg.appendChild(E("text", {
          x: x(li) + 10, y: y(s.values[li]) + (s.dy || 4), "font-family": sans,
          "font-size": si == 0 ? "12.5px" : "11.5px", "font-weight": si == 0 ? 700 : 600, fill: c, opacity: si == 0 ? 1 : .85
        }, s.name));
      }
    });

    const hl = E("line", { x1: 0, x2: 0, y1: mT, y2: H - mB, stroke: T.ink2, "stroke-width": 1, opacity: 0 });
    svg.appendChild(hl);
    const hd = cfg.series.map(s => E("circle", { r: 4, fill: col(s.cls), stroke: T.surface, "stroke-width": 1.6, opacity: 0 }));
    hd.forEach(c => svg.appendChild(c));
    const tip = tipEl();
    svg.addEventListener("mousemove", ev => {
      const r = svg.getBoundingClientRect(), px = (ev.clientX - r.left) / r.width * W;
      let i = Math.round((px - mL) / ((W - mL - mR) / (N - 1))); i = Math.max(0, Math.min(N - 1, i));
      hl.setAttribute("x1", x(i)); hl.setAttribute("x2", x(i)); hl.setAttribute("opacity", .25);
      let h = `<div style="font-family:${mono};font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:${T.muted};margin-bottom:6px">${L[i]} · ${cfg.unit || "index (2024=100)"}</div>`;
      cfg.series.forEach((s, si) => {
        const v = s.values[i];
        if (v == null) { hd[si].setAttribute("opacity", 0); return; }
        hd[si].setAttribute("cx", x(i)); hd[si].setAttribute("cy", y(v)); hd[si].setAttribute("opacity", 1);
        h += `<div style="display:flex;justify-content:space-between;gap:18px;font-size:12px;line-height:1.7"><span><span style="display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:7px;background:${col(s.cls)}"></span>${s.name}</span><span style="font-family:${mono};font-weight:600">${v.toFixed(1)}</span></div>`;
      });
      tip.innerHTML = h; tip.style.opacity = 1;
      let tx = ev.clientX + 16; if (tx > innerWidth - 200) tx = ev.clientX - 190;
      tip.style.left = tx + "px"; tip.style.top = (ev.clientY - 12) + "px";
    });
    svg.addEventListener("mouseleave", () => { hl.setAttribute("opacity", 0); hd.forEach(c => c.setAttribute("opacity", 0)); tip.style.opacity = 0; });
    mountSvg(mount, svg);
  }

  function hbars(mount, rows) {
    const rh = 40, mT = 8, mB = 10, mL = 132, mR = 66, W = Math.max(300, Math.round(mount.clientWidth || 760)), H = mT + mB + rows.length * rh;
    const vals = rows.map(r => r.value), lo = Math.min(0, ...vals), hi = Math.max(0, ...vals), span = hi - lo || 1;
    const x0 = mL + (W - mL - mR) * (0 - lo) / span, x = v => mL + (W - mL - mR) * (v - lo) / span;
    const svg = svgEl(W, H);
    rows.forEach((r, i) => {
      const cy = mT + i * rh, h = rh - 18;
      svg.appendChild(E("rect", { x: mL, y: cy + 9, width: W - mL - mR, height: h, rx: 5, fill: T.track }));
    });
    svg.appendChild(E("line", { x1: x0, x2: x0, y1: mT + 4, y2: H - mB - 4, stroke: T.hair2, "stroke-width": 1.5, "stroke-dasharray": "2 4" }));
    rows.forEach((r, i) => {
      const cy = mT + i * rh, h = rh - 18, bw = Math.abs(x(r.value) - x0), bx = r.value < 0 ? x(r.value) : x0, lab = r.disp || fmtPct(r.value), inside = bw > String(lab).length * 7.4 + 16;
      const fill = r.cls ? col(r.cls) : (r.value < 0 ? T.loss : T.gain);
      const bar = E("rect", { x: bx, y: cy + 9, width: Math.max(bw, 2), height: h, rx: 5, fill });
      bar.style.transformOrigin = (r.value < 0 ? x0 : x0) + "px center";
      bar.style.animation = `ca-grow .75s cubic-bezier(.4,0,.2,1) ${i * .06}s both`;
      svg.appendChild(bar);
      svg.appendChild(E("text", { x: mL - 12, y: cy + rh / 2 + 2, "text-anchor": "end", "font-family": sans, "font-size": "12.5px", "font-weight": 600, fill: T.ink2 }, r.name));
      svg.appendChild(E("text", {
        x: inside ? bx + bw - 10 : bx + bw + 9, y: cy + rh / 2 + 2, "text-anchor": inside ? "end" : "start",
        "font-family": mono, "font-size": "12px", "font-weight": 600, fill: inside ? "#151515" : T.ink
      }, lab));
    });
    mountSvg(mount, svg);
  }

  function stackBar(mount, rows) {
    const rh = 50, mT = 8, mB = 10, mL = 124, mR = 16, W = 760, H = mT + mB + rows.length * rh, bw = W - mL - mR, gap = 3;
    const svg = svgEl(W, H);
    rows.forEach((r, ri) => {
      const cy = mT + ri * rh + 9, h = rh - 22; let px = mL;
      svg.appendChild(E("text", { x: mL - 12, y: cy + h / 2 + 2, "text-anchor": "end", "font-family": sans, "font-size": "13px", "font-weight": 600, fill: T.ink }, r.name));
      r.shares.forEach((s, si) => {
        const w = bw * s / 100;
        const rect = E("rect", { x: px, y: cy, width: Math.max(w - gap, 1), height: h, rx: 5, fill: T.ramp[si] });
        rect.style.transformOrigin = px + "px center";
        rect.style.animation = `ca-grow .6s cubic-bezier(.4,0,.2,1) ${(ri * .08 + si * .04)}s both`;
        svg.appendChild(rect);
        if (w > 34) svg.appendChild(E("text", {
          x: px + w / 2 - 1.5, y: cy + h / 2 + 4, "text-anchor": "middle", "font-family": mono,
          "font-size": "11px", "font-weight": 500, fill: si < 3 ? "#151515" : "#FFFFFF"
        }, Math.round(s) + "%"));
        px += w;
      });
    });
    mountSvg(mount, svg);
  }

  function spark(mount, values, color, refY) {
    const W = 220, H = 40, lo = Math.min(...values), hi = Math.max(...values);
    const x = i => (W) * i / (values.length - 1), y = v => 4 + (H - 8) * (1 - (v - lo) / (hi - lo || 1));
    const svg = svgEl(W, H);
    const gid = "cas" + (++uid), defs = E("defs"); svg.appendChild(defs);
    const g = E("linearGradient", { id: gid, x1: 0, y1: 0, x2: 0, y2: 1 });
    g.appendChild(E("stop", { offset: "0%", "stop-color": color, "stop-opacity": .28 }));
    g.appendChild(E("stop", { offset: "100%", "stop-color": color, "stop-opacity": 0 }));
    defs.appendChild(g);
    let d = ""; values.forEach((v, i) => { d += (i ? "L" : "M") + x(i) + " " + y(v) + " "; });
    svg.appendChild(E("path", { d: d + `L${W} ${H} L0 ${H} Z`, fill: `url(#${gid})`, stroke: "none" }));
    svg.appendChild(E("path", { d, fill: "none", stroke: color, "stroke-width": 1.8, "stroke-linejoin": "round", "stroke-linecap": "round" }));
    svg.appendChild(E("circle", { cx: x(values.length - 1), cy: y(values[values.length - 1]), r: 2.8, fill: color }));
    svg.style.maxWidth = "100%";
    mount.innerHTML = ""; mount.appendChild(svg);
  }

  /* Retention triangle: one row per starting period, one column per period since the start.
     cfg = { cols: ["+1Q", ...], nLabel: "Customers", floor: 300,
             rows: [{ label: "Jul-Sep 2024", n: 6362, values: [34.6, 24.2, ..., "pending"], tags: ["Oct-Dec", null, ...] }] }
     A value is a percent, null (not reached yet) or "pending" (the dropped latest period).
     One colour scale per table. A row with n under floor is drawn without values. */
  function triangle(mount, cfg) {
    const C = cfg.cols, nc = C.length, mL = 118, nW = 84, cw = 64, ch = 40, gap = 4, mT = 30;
    const W = mL + nW + nc * cw + 8, H = mT + cfg.rows.length * ch + 4;
    const live = r => cfg.floor == null || r.n == null || r.n >= cfg.floor;
    const vals = []; cfg.rows.forEach(r => live(r) && r.values.forEach(v => typeof v == "number" && vals.push(v)));
    const lo = Math.min(...vals), hi = Math.max(...vals), span = hi - lo || 1;
    const mix = (a, b, t) => "#" + [0, 2, 4].map(k => Math.round(parseInt(a.substr(k + 1, 2), 16) * (1 - t) + parseInt(b.substr(k + 1, 2), 16) * t).toString(16).padStart(2, "0")).join("");
    const fill = v => { const t = (v - lo) / span; return t < .5 ? mix("#3A2C24", "#7A3E1E", t * 2) : mix("#7A3E1E", "#E8682A", (t - .5) * 2); };
    const svg = svgEl(W, H, W + 40);
    svg.appendChild(txt((cfg.rowLabel || "Shopped in").toUpperCase(), { x: 4, y: 16, "font-size": "10px", "letter-spacing": ".08em" }));
    svg.appendChild(txt((cfg.nLabel || "Customers").toUpperCase(), { x: mL + nW - 12, y: 16, "text-anchor": "end", "font-size": "10px", "letter-spacing": ".08em" }));
    C.forEach((c, j) => svg.appendChild(txt(c, { x: mL + nW + j * cw + cw / 2, y: 16, "text-anchor": "middle", "font-size": "10.5px" })));
    svg.appendChild(E("line", { x1: 0, x2: W - 8, y1: mT - 6, y2: mT - 6, stroke: T.hair, "stroke-width": 1 }));
    const tip = tipEl();
    cfg.rows.forEach((r, i) => {
      const cy = mT + i * ch, ok = live(r);
      svg.appendChild(E("text", { x: 4, y: cy + ch / 2 + 4, "font-family": sans, "font-size": "12.5px", "font-weight": 600, fill: ok ? T.ink : T.muted }, r.label));
      if (r.n != null) svg.appendChild(txt(Math.round(r.n).toLocaleString("en-US"), { x: mL + nW - 12, y: cy + ch / 2 + 4, "text-anchor": "end", "font-size": "11.5px", fill: ok ? T.ink2 : T.muted }));
      r.values.forEach((v, j) => {
        if (v == null) return;
        const x = mL + nW + j * cw + gap / 2, y = cy + gap / 2, w = cw - gap, h = ch - gap;
        if (v === "pending" || !ok) {
          svg.appendChild(E("rect", { x: x + .5, y: y + .5, width: w - 1, height: h - 1, rx: 5, fill: "none", stroke: T.hair2, "stroke-width": 1, "stroke-dasharray": "3 3" }));
          svg.appendChild(txt(v === "pending" ? "pending" : "too few", { x: x + w / 2, y: y + h / 2 + 3.5, "text-anchor": "middle", "font-size": "9.5px", fill: T.muted }));
          return;
        }
        const tag = r.tags && r.tags[j], f = fill(v), dark = (v - lo) / span > .72;
        const cell = E("rect", { x, y, width: w, height: h, rx: 5, fill: f });
        svg.appendChild(cell);
        svg.appendChild(txt(v.toFixed(1) + "%", { x: x + w / 2, y: y + (tag ? h / 2 : h / 2 + 4), "text-anchor": "middle", "font-size": "11.5px", "font-weight": 600, fill: dark ? "#151515" : T.ink }));
        if (tag) svg.appendChild(txt(String(tag).toUpperCase(), { x: x + w / 2, y: y + h / 2 + 12, "text-anchor": "middle", "font-size": "8.5px", "letter-spacing": ".06em", fill: dark ? "#151515" : T.ink2 }));
        cell.addEventListener("mousemove", ev => {
          tip.innerHTML = `<div style="font-family:${mono};font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:${T.muted};margin-bottom:6px">${r.label} · ${C[j]}${tag ? " · " + tag : ""}</div><div style="font-family:${mono};font-weight:600">${v.toFixed(1)}% ${cfg.unit || "came back"}</div>`;
          tip.style.opacity = 1;
          let tx = ev.clientX + 16; if (tx > innerWidth - 200) tx = ev.clientX - 190;
          tip.style.left = tx + "px"; tip.style.top = (ev.clientY - 12) + "px";
        });
        cell.addEventListener("mouseleave", () => { tip.style.opacity = 0; });
      });
    });
    mountSvg(mount, svg);
  }

  const fmtPct = v => (v > 0 ? "+" : "") + v.toFixed(1) + "%";
  const fmt$ = v => "$" + Math.round(v).toLocaleString("en-US");
  window.CA_CHARTS = { lineChart, hbars, stackBar, spark, triangle, T, col, fmtPct, fmt$, RM };
})();
