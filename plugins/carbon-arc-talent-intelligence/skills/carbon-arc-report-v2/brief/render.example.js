/* Renderers: Brand A Q3 FY2026, outbreak and recovery. */
(function () {
  const C = window.CA_CHARTS, T = C.T, D = window.DATA;
  const { lineChart, hbars } = C;
  const $ = s => document.querySelector(s);
  const NS = "http://www.w3.org/2000/svg";
  const mono = "'DM Mono',ui-monospace,monospace";
  const sans = "'Hanken Grotesk',system-ui,sans-serif";
  const tone = { pos: T.gain, neg: T.loss, flat: T.ink, brand: T.s[0] };

  function kpi(l, v, s, c) {
    const col = tone[c || "flat"];
    return `<div style="position:relative;overflow:hidden;background:#323232;border:1px solid ${T.hair};border-radius:24px;padding:20px 24px 18px;display:flex;flex-direction:column;gap:8px;transition:border-color .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1)"
      onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='${T.s[0]}'"
      onmouseout="this.style.transform='none';this.style.borderColor='${T.hair}'">
      <div style="position:absolute;left:0;top:0;width:100%;height:3px;background:${col}"></div>
      <div style="font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.muted};line-height:1.4;min-height:2.8em">${l}</div>
      <div style="font-size:34px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:${col};line-height:1">${v}</div>
      <div style="font-family:${mono};font-size:10px;font-weight:500;letter-spacing:.04em;color:${T.muted};line-height:1.4">${s}</div>
    </div>`;
  }
  function leg(mount, items) {
    $(mount).innerHTML = items.map(i => `<span style="display:inline-flex;align-items:center;gap:7px;font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.ink2}"><span style="width:18px;height:3px;border-radius:100px;background:${i.c}"></span>${i.n}</span>`).join("");
  }
  function tableHTML(head, rows, hiRow) {
    const isNum = c => c === "" || c == null || /^[−\-+~]?\$?[\d.,]+\s*(%|pts?|pt|k|M|B|x)?$/.test(String(c).trim());
    const al = head.map((_, i) => i && rows.every(r => isNum(r[i])) ? "right" : "left");
    let h = `<div style="overflow-x:auto;max-width:100%"><table style="width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums;margin-top:4px"><thead><tr>`;
    head.forEach((c, i) => h += `<th style="text-align:${al[i]};padding:11px 12px;border-bottom:1px solid ${T.hair2};font-family:${mono};font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:${T.muted};font-weight:500">${c}</th>`);
    h += `</tr></thead><tbody>`;
    rows.forEach((r, ri) => {
      const hi = hiRow != null && hiRow === ri;
      h += `<tr style="background:${hi ? "#662D0F" : "transparent"}">`;
      r.forEach((c, i) => h += `<td style="text-align:${al[i]};padding:11px 12px;border-bottom:1px solid ${T.hair};color:${hi ? T.ink : T.ink2};font-weight:${hi ? 500 : 400};vertical-align:top">${c}</td>`);
      h += `</tr>`;
    });
    return h + `</tbody></table></div>`;
  }
  function yAxisUnit(id, suffix) {
    const svg = document.getElementById(id) && document.getElementById(id).querySelector("svg");
    if (!svg) return 0;
    svg.querySelectorAll("text").forEach(t => {
      if (t.getAttribute("text-anchor") === "end" && Math.abs(+t.getAttribute("x") - 33) < 1.5 && !t.textContent.endsWith(suffix)) t.textContent += suffix;
    });
  }
  function dedupeXLabels(id) {
    const svg = document.getElementById(id) && document.getElementById(id).querySelector("svg");
    if (!svg) return;
    const vb = (svg.getAttribute("viewBox") || "0 0 760 322").split(/\s+/).map(Number), floor = vb[3] - 30;
    let last = -1e9;
    [...svg.querySelectorAll("text")].filter(t => t.getAttribute("text-anchor") === "middle" && +t.getAttribute("y") > floor)
      .sort((a, z) => +a.getAttribute("x") - +z.getAttribute("x"))
      .forEach(t => { const x = +t.getAttribute("x"); if (x - last < 40) t.remove(); else last = x; });
  }
  function E(t, a, kids) {
    const e = document.createElementNS(NS, t);
    for (const x in (a || {})) e.setAttribute(x, a[x]);
    (kids || []).forEach(c => e.appendChild(typeof c == "string" ? document.createTextNode(c) : c));
    return e;
  }

  /* Weekly gap to control, as columns, with the detection floor drawn as a band. */
  function gapChart(mount, cfg) {
    const W = 760, H = 322, mL = 42, mR = 20, mT = 22, mB = 36;
    const v = cfg.values, N = v.length, lo = cfg.yMin, hi = cfg.yMax;
    const bw = (W - mL - mR) / N;
    const x = i => mL + bw * i, y = val => mT + (H - mT - mB) * (1 - (val - lo) / (hi - lo));
    const svg = E("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", preserveAspectRatio: "xMidYMid meet", role: "img" });
    svg.style.display = "block"; svg.style.maxWidth = "860px";
    for (let k = 0; k <= 4; k++) {
      const g = lo + (hi - lo) / 4 * k;
      svg.appendChild(E("line", { x1: mL, x2: W - mR, y1: y(g), y2: y(g), stroke: T.grid, "stroke-width": 1 }));
      svg.appendChild(E("text", { x: mL - 9, y: y(g) + 3.5, "text-anchor": "end", "font-family": mono, "font-size": "10.5px", fill: T.muted }, [Math.round(g) + "pt"]));
    }
    svg.appendChild(E("rect", { x: mL, y: y(cfg.floorHi), width: W - mL - mR, height: y(cfg.floorLo) - y(cfg.floorHi), fill: "#545454", opacity: .55, rx: 5 }));
    svg.appendChild(E("line", { x1: mL, x2: W - mR, y1: y(0), y2: y(0), stroke: T.hair2, "stroke-width": 1.5, "stroke-dasharray": "2 4" }));
    v.forEach((val, i) => {
      const y0 = y(0), y1 = y(val), top = Math.min(y0, y1), h = Math.max(Math.abs(y1 - y0), 1.5);
      const r = E("rect", { x: x(i) + 2, y: top, width: bw - 4, height: h, rx: 3, fill: T.s[0], opacity: i < cfg.eventIdx ? .45 : 1 });
      r.style.opacity = 0; r.style.animation = `ca-fade .5s cubic-bezier(.4,0,.2,1) ${i * .02}s forwards`;
      const fin = i < cfg.eventIdx ? .45 : 1; r.addEventListener("animationend", () => { r.style.opacity = fin; r.style.animation = "none"; });
      svg.appendChild(r);
    });
    cfg.labels.forEach((lb, i) => { if (i % 5 == 0 || i == N - 1) svg.appendChild(E("text", { x: x(i) + bw / 2, y: H - mB + 18, "text-anchor": "middle", "font-family": mono, "font-size": "10.5px", fill: T.muted }, [lb])); });
    (cfg.markers || []).forEach(m => {
      const mx = x(m.i) + bw / 2;
      svg.appendChild(E("line", { x1: mx, x2: mx, y1: mT + 12, y2: H - mB, stroke: T.hair2, "stroke-width": 1.2, "stroke-dasharray": "3 4" }));
      const w = m.label.length * 5.4 + 20, bx = m.right ? mx - w - 3 : mx + 3;
      svg.appendChild(E("rect", { x: bx, y: mT - 14, width: w, height: 17, rx: 8.5, fill: "#662D0F" }));
      svg.appendChild(E("circle", { cx: bx + 9, cy: mT - 5.5, r: 2.6, fill: T.s[0] }));
      svg.appendChild(E("text", { x: bx + 15, y: mT - 2, "font-family": mono, "font-size": "9.5px", "font-weight": 500, fill: "#FFC6A8" }, [m.label]));
    });
    (cfg.notes || []).forEach(n => svg.appendChild(E("text", { x: n.x, y: y(n.y), "font-family": sans, "font-size": "11.5px", "font-weight": 600, fill: n.c || T.ink2, "text-anchor": n.a || "start" }, [n.t])));
    const wrap = document.createElement("div"); wrap.style.width = "100%"; wrap.appendChild(svg);
    mount.innerHTML = ""; mount.appendChild(wrap);
  }

  function renderQuarter() {
    $("#kpi-q").innerHTML = [
      kpi("Card transactions, Q3 to date, YoY", "−18%", "■ Jul 4–Sep 18 · QSR ex Brand A −4.3%", "neg"),
      kpi("Gap to the category at the trough", "−29 pts", "■ week ending Jul 24", "neg"),
      kpi("Gap to the category, last 4 weeks", "−11 pts", "■ Aug 22–Sep 18 · flat since late Aug", "neg"),
      kpi("Average ticket, Q3 to date, YoY", "+2.9%", "■ vs +5.0% in Q2 · the loss is traffic", "flat"),
      kpi("Outbreak's share of the Q3 decline", "−14 pts", "■ of −18% · band −18 to −10 pts", "brand")
    ].join("");

    const c1 = D.c1;
    lineChart($("#ch-weekly"), {
      labels: c1.labels, unit: "YoY %", yMin: -36, yMax: 12, refY: 0,
      markers: [{ i: 6, label: "Health notice Jul 14" }, { i: 14, label: "Labor Day" }],
      series: [
        { cls: "s1", name: "Brand A", values: c1.tb, dy: 4 },
        { cls: "s2", name: "QSR ex Brand A", values: c1.qx, muted: 1, dy: -3 },
        { cls: "s3", name: "Brand B", values: c1.mcd, muted: 1, dy: 13 }]
    });
    yAxisUnit("ch-weekly", "%"); dedupeXLabels("ch-weekly");
    leg("#lg-weekly", [{ c: C.col("s1"), n: "Brand A" }, { c: C.col("s2"), n: "QSR category excluding Brand A" }, { c: C.col("s3"), n: "Brand B" }]);

    const g = D.gap;
    gapChart($("#ch-gap"), {
      labels: g.labels, values: g.gap, yMin: -30, yMax: 10, floorLo: 0.31 - 3.3, floorHi: 0.31 + 3.3, eventIdx: 26,
      markers: [{ i: 26, label: "Outbreak named", right: true }],
      notes: [{ x: 48, y: 5.6, t: "Normal-week range ±3.3 pts" }]
    });

    lineChart($("#ch-mix"), {
      labels: c1.labels, unit: "YoY %", yMin: -36, yMax: 12, refY: 0,
      markers: [{ i: 6, label: "Health notice Jul 14" }],
      series: [
        { cls: "s1", name: "Transactions", values: c1.tb, dy: 4 },
        { cls: "s2", name: "Ticket", values: c1.tkt, muted: 1, dy: -4 }]
    });
    yAxisUnit("ch-mix", "%"); dedupeXLabels("ch-mix");
    leg("#lg-mix", [{ c: C.col("s1"), n: "Brand A transactions" }, { c: C.col("s2"), n: "Brand A average ticket (spend ÷ transactions)" }]);

    const rg = D.reg;
    lineChart($("#ch-reg"), {
      labels: rg.labels, unit: "pts vs local QSR", yMin: -36, yMax: 12, refY: 0,
      markers: [{ i: 6, label: "Health notice Jul 14" }],
      series: [
        { cls: "s1", name: "5 named states", values: rg.exp, dy: 12 },
        { cls: "s2", name: "Rest of US", values: rg.rest, muted: 1, dy: -4 }]
    });
    yAxisUnit("ch-reg", "pt"); dedupeXLabels("ch-reg");
    leg("#lg-reg", [{ c: C.col("s1"), n: "Brand A in the five named states" }, { c: C.col("s2"), n: "Brand A in every other state" }]);

    const pr = D.peers.map(p => ({ name: p.n, value: +(p.q3 - p.jun).toFixed(1), cls: p.n === "Brand A" ? "b1" : "b2" }))
      .sort((a, z) => a.value - z.value);
    pr.forEach(p => p.disp = (p.value > 0 ? "+" : "") + p.value.toFixed(1));
    hbars($("#ch-peers"), pr);
    leg("#lg-peers", [{ c: C.col("b1"), n: "Brand A" }, { c: C.col("b2"), n: "Peers and category" }]);

    $("#tbl-disc").innerHTML = tableHTML(["What was measured", "▲ Company said", "■ Card panel", "Verdict"], [
      ["Worst point of the outbreak", "Weekend of Jul 18", "Lowest day Sat Jul 18, spend −40%", "Agree"],
      ["US sales, Jul 1–27 vs a year ago", "Same-store sales −2%", "Card spend −15% (day-of-week aligned)", "Disagree"],
      ["Recovery by Jul 24–27", "Halfway back to prior-year sales", "Spend −28%, about 30% of the way back", "Disagree"],
      ["Q2 2026 US growth (the panel's last clean quarter)", "System sales +9%, same-store +7%", "Card spend +7.5%", "Close"]
    ], 1);

    $("#tbl-xs").innerHTML = tableHTML(["Dataset", "Brand A, Jul", "Brand A, Aug", "Brand B, Jul", "Brand B, Aug", "Read"], [
      ["■ Credit Card - US Complete Panel · transactions", "−20%", "−17%", "−7.2%", "−3.7%", "Sharp hit, partial recovery"],
      ["■ Foot Traffic · visits per tracked store", "+1.7%", "−2.6%", "+4.5%", "−1.6%", "Same direction, far smaller"],
      ["■ App Intelligence · average daily app users", "−7.8%", "−13%", "−18%", "−16%", "No clear outbreak signal"],
      ["◆ Third-party visits, Jul 6–Sep 11 (third party)", "−12% over the window", "", "", "", "Double-digit, close to card"]
    ], 0);

    $("#tbl-events").innerHTML = tableHTML(["What could have explained the quarter", "If true, we would see", "Result"], [
      ["Food-safety outbreak (◆ Health notice Jul 14; ▲ ingredient pulled Jul 17)", "A sharp traffic drop from mid-July, deepest in the named states", "Confirmed. Clears the normal-week range about ninefold; measured above"],
      ["A value-menu promotion (▲ late July)", "Tuesdays outperforming the days around them", "Confirmed on the day: Tuesdays ran 4 to 14 pts better than Mon/Wed from Jul 28. Too small to see in weekly data"],
      ["July 4 fell in different panel weeks", "Two adjacent weeks moving in opposite directions", "Confirmed. Absorbed by the category control"],
      ["Labor Day fell a week later in 2026", "A weak week ending Sep 11, a strong week ending Sep 4", "Confirmed. Read the pair together"],
      ["Category slowdown (not predicted; found in the data)", "Peers decelerating from July", "Real: QSR ex Brand A went from +1.2% in June to −4.3%. Cause not isolated; see method"]
    ]);
  }

  function renderMethod() {
    $("#tbl-src").innerHTML = tableHTML(["Dataset", "Insight", "Grain · window", "Use"], [
      ["■ Credit Card - US Complete Panel", "626 spend · 627 transactions", "Week, day, quarter · Jan 2024–Sep 24, 2026", "Spine, peers, category, states"],
      ["■ Foot Traffic", "45862 visits · 45863 store count", "Month · Jan 2025–Sep 23, 2026", "Cross-check"],
      ["■ App Intelligence", "776 daily app users", "Month · Jan 2025–Sep 2026", "Cross-check"],
      ["▲ Parent company Q2 2026 release and call", "Call transcript", "Jul 30, 2026", "Disclosed figures"],
      ["◆ Health agency, consumer press, trade press", "Linked below", "Jul–Sep 2026", "Event dates, context"]
    ]);
  }

  /* A finding's text column is sticky only while it sits beside its chart. When the row wraps
     (narrow screens) the chart would scroll under the pinned text, so the column goes static. */
  function stickyOnlyBeside() {
    document.querySelectorAll("[data-finding]").forEach(row => {
      const text = row.firstElementChild, chart = row.lastElementChild;
      if (!text || text === chart) return;
      text.style.position = "static";
      const beside = Math.abs(text.getBoundingClientRect().top - chart.getBoundingClientRect().top) < 4;
      text.style.position = beside ? "sticky" : "static";
    });
  }
  window.addEventListener("resize", stickyOnlyBeside);
  window.addEventListener("load", stickyOnlyBeside);

  const R = { "/": renderQuarter, "/method": renderMethod };
  const built = {};
  window.CA_RENDER = {
    build(route) { if (built[route] || !R[route]) return; built[route] = 1; try { R[route](); } catch (e) { console.error("render " + route, e); } },
    reset() { for (const k in built) delete built[k]; }
  };
})();
