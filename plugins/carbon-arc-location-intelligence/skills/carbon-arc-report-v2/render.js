/* Per-tab renderers — Brand A local-market brief (example report). */
(function () {
  const C = window.CA_CHARTS, T = C.T, D = window.DATA;
  const { lineChart, hbars, stackBar, spark, fmtPct, fmt$ } = C;
  const $ = s => document.querySelector(s);
  const mono = "'DM Mono',ui-monospace,monospace";

  const tone = { pos: T.gain, neg: T.loss, flat: T.ink, brand: T.s[0] };
  function kpi(l, v, s, c, sp) {
    const col = tone[c || "flat"];
    const id = sp ? "sp" + Math.random().toString(36).slice(2, 8) : null;
    return `<div style="position:relative;overflow:hidden;background:#323232;border:1px solid ${T.hair};border-radius:24px;padding:20px 24px 18px;display:flex;flex-direction:column;gap:8px;transition:border-color .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1)"
      onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='${T.s[0]}'"
      onmouseout="this.style.transform='none';this.style.borderColor='${T.hair}'">
      <div style="position:absolute;left:0;top:0;width:100%;height:3px;background:${col}"></div>
      <div style="font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.muted};line-height:1.4;min-height:2.8em">${l}</div>
      <div style="font-size:34px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:${col};line-height:1">${v}</div>
      ${id ? `<div id="${id}" style="margin:2px -4px -2px"></div>` : ""}
      <div style="font-family:${mono};font-size:10px;font-weight:500;letter-spacing:.04em;color:${T.muted};line-height:1.4">${s}</div>
    </div>`;
  }
  function kpiRow(mount, cards) {
    $(mount).innerHTML = cards.map(c => c.html).join("");
    cards.forEach(c => { if (c.sp) { const el = document.getElementById(c.id); if (el) spark(el, c.sp.values, c.sp.color); } });
  }
  function K(l, v, s, c, sp) {
    let id = null, html;
    if (sp) { id = "sp" + Math.random().toString(36).slice(2, 8); }
    html = kpiWith(l, v, s, c, id);
    return { html, sp, id };
  }
  function kpiWith(l, v, s, c, id) {
    const col = tone[c || "flat"];
    return `<div style="position:relative;overflow:hidden;background:#323232;border:1px solid ${T.hair};border-radius:24px;padding:20px 24px 18px;display:flex;flex-direction:column;gap:8px;transition:border-color .4s cubic-bezier(.4,0,.2,1),transform .4s cubic-bezier(.4,0,.2,1)"
      onmouseover="this.style.transform='translateY(-3px)';this.style.borderColor='${T.s[0]}'"
      onmouseout="this.style.transform='none';this.style.borderColor='${T.hair}'">
      <div style="position:absolute;left:0;top:0;width:100%;height:3px;background:${col}"></div>
      <div style="font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.muted};line-height:1.4;min-height:2.8em">${l}</div>
      <div style="font-size:34px;font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:${col};line-height:1">${v}</div>
      ${id ? `<div id="${id}" style="margin:4px -2px 0"></div>` : ""}
      <div style="font-family:${mono};font-size:10px;font-weight:500;letter-spacing:.04em;color:${T.muted};line-height:1.4">${s}</div>
    </div>`;
  }
  function leg(mount, items) {
    if (!mount) return;
    $(mount).innerHTML = items.map(i => `<span style="display:inline-flex;align-items:center;gap:7px;font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.ink2}"><span style="width:18px;height:3px;border-radius:100px;background:${i.c}"></span>${i.n}</span>`).join("");
  }
  const legC = k => C.col(k);
  function tableHTML(head, rows, hiRow) {
    let h = `<div style="overflow-x:auto;max-width:100%"><table style="width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums;margin-top:4px"><thead><tr>`;
    const isNum = c => c === "" || c == null || /^[−\-+~]?\$?[\d.,]+\s*(%|pts?|pt|k|M|B|x)?$/.test(String(c).trim());
    const al = head.map((_, i) => i && rows.every(r => isNum(r[i])) ? "right" : "left");
    head.forEach((c, i) => h += `<th style="text-align:${al[i]};padding:11px 12px;border-bottom:1px solid ${T.hair2};font-family:${mono};font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:${T.muted};font-weight:500">${c}</th>`);
    h += `</tr></thead><tbody>`;
    rows.forEach((r, ri) => {
      const hi = hiRow != null && hiRow === ri;
      h += `<tr style="background:${hi ? "#662D0F" : "transparent"}">`;
      r.forEach((c, i) => h += `<td style="text-align:${al[i]};padding:11px 12px;border-bottom:1px solid ${T.hair};color:${hi ? T.ink : T.ink2};font-weight:${hi ? 500 : 400}">${c}</td>`);
      h += `</tr>`;
    });
    return h + `</tbody></table></div>`;
  }

  /* ---------- 01 Summary — executive read: one takeaway + key chart per section ---------- */
  function renderHome() {
    const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
    const cm = { "Brand A": "b1", "Brand B": "b2", "Brand C": "b3", "Brand D": "b4" };

    lineChart($("#s-demand"), {
      labels: D.labels, h: 260, yMin: 80, yMax: 120, series: [
        { cls: "s1", name: "Ann Arbor", values: D.demand_idx["Ann Arbor"] },
        { cls: "s2", name: "US", values: D.demand_idx.US, muted: 1, dy: 12 }]
    });

    hbars($("#s-national"), brands.map(b => ({ name: b, value: D.nat_share_latest[b], cls: cm[b], disp: D.nat_share_latest[b].toFixed(1) + "%" })));

    const mi = ["Brand B", "Brand A", "Brand C", "Brand D"];
    hbars($("#s-comp-sales"), mi.map(b => ({ name: b, value: D.comp_share_latest[b], cls: cm[b], disp: D.comp_share_latest[b].toFixed(1) + "%" })));
    hbars($("#s-comp-web"), brands.map(b => ({ name: b, value: D.csc_sov_ttm[b], cls: cm[b], disp: D.csc_sov_ttm[b].toFixed(1) + "%" })));

    const plat = Object.keys(D.agg_aa_share).sort((a, z) => D.agg_aa_share[z] - D.agg_aa_share[a]);
    hbars($("#s-delivery"), plat.map((p, i) => ({ name: p, value: D.agg_aa_share[p], cls: i ? "b3" : "b1", disp: D.agg_aa_share[p].toFixed(1) + "%" })));

    stackBar($("#s-cohorts"), ["Brand A", "Brand B", "Brand C"].map(b => ({ name: b, shares: D.gen_mix[b] })));
    $("#lg-s-gen").innerHTML = D.gen_short.map((g, i) => `<span style="display:inline-flex;align-items:center;gap:7px;font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.ink2}"><span style="width:16px;height:10px;border-radius:5px;background:${T.ramp[i]}"></span>${g}</span>`).join("");
  }

  /* ---------- 02 Demand ---------- */
  const geos = [{ cls: "s1", n: "Ann Arbor" }, { cls: "s2", n: "Detroit", m: 1, dy: -2 }, { cls: "s3", n: "Michigan", m: 1, dy: 11 }, { cls: "s4", n: "US", m: 1, dy: 22 }];
  const geoLeg = [{ c: legC("s1"), n: "Ann Arbor" }, { c: legC("s2"), n: "Detroit" }, { c: legC("s3"), n: "Michigan" }, { c: legC("s4"), n: "US" }];
  function renderDemand() {
    kpiRow("#kpi-demand", [
      K("Ann Arbor demand, YoY", fmtPct(D.demand_yoy["Ann Arbor"]), "■ card txns · trailing 12m", "flat", { values: D.demand_idx["Ann Arbor"] }),
      K("Michigan card spend, YoY", fmtPct(D.spend_yoy.Michigan), "■ tracks transactions", "flat", { values: D.spend_idx.Michigan }),
      K("Brand A avg ticket, MI", "$" + D.ticket_ttm.Michigan.toFixed(2), "■ vs US $" + D.ticket_ttm.US.toFixed(2), "brand", { values: D.ticket_series.Michigan }),
      K("Avg ticket, YoY (MI)", fmtPct(D.ticket_yoy.Michigan), "■ pricing ~flat", "flat", { values: D.ticket_series["Ann Arbor"] })
    ].map(c => (c.sp && (c.sp.color = T.s[0]), c)));
    lineChart($("#ch-demand"), { labels: D.labels, yMin: 80, yMax: 120, series: geos.map(g => ({ cls: g.cls, name: g.n, values: D.demand_idx[g.n], muted: g.m, dy: g.dy })) });
    leg("#lg-demand", geoLeg);
    lineChart($("#ch-spend"), { labels: D.labels, yMin: 80, yMax: 120, markers: [{ i: 14, label: "Stuffed Crust" }], series: geos.map(g => ({ cls: g.cls, name: g.n, values: D.spend_idx[g.n], muted: g.m, dy: g.dy })) });
    leg("#lg-spend", geoLeg);
    lineChart($("#ch-ticket"), {
      labels: D.labels, unit: "$ per order", yMin: 22, yMax: 34, refY: null, markers: [{ i: 14, label: "Stuffed Crust" }], series: [
        { cls: "s1", name: "Ann Arbor", values: D.ticket_series["Ann Arbor"] },
        { cls: "s4", name: "US", values: D.ticket_series.US, muted: 1, dy: 2 },
        { cls: "s3", name: "Michigan", values: D.ticket_series.Michigan, muted: 1, dy: 12 },
        { cls: "s2", name: "Detroit", values: D.ticket_series.Detroit, muted: 1, dy: 22 }]
    });
    leg("#lg-ticket", geoLeg);
  }

  /* ---------- 03 National ---------- */
  const clsmap = { "Brand A": "b1", "Brand B": "b2", "Brand C": "b3", "Brand D": "b4" };
  function renderNational() {
    const L = D.nat_comp_labels.length - 1;
    kpiRow("#kpi-nat", [
      K("Brand A share, top-4 US chains", D.nat_share_latest["Brand A"].toFixed(0) + "%", "■ card · vs 23% in Michigan", "brand", { values: D.nat_share["Brand A"], color: T.s[0] }),
      K("Brand A US demand, YoY", fmtPct(D.demand_yoy.US), "■ card · ≈ MI (" + fmtPct(D.demand_yoy.Michigan) + ")", "flat", { values: D.demand_idx.US, color: T.s[0] }),
      K("Top-4 chains volume, YoY", fmtPct(D.nat_cat_yoy_h1), "■ card · big-four card volume soft", "neg"),
      K("Brand A US share change", "+" + D.dom_nat_share_delta.toFixed(1) + " pts", "■ gaining as peers fall", "pos")
    ]);
    lineChart($("#ch-natdemand"), {
      labels: D.labels, yMin: 80, yMax: 120, series: [
        { cls: "s1", name: "US", values: D.demand_idx.US },
        { cls: "s3", name: "Michigan", values: D.demand_idx.Michigan, muted: 1, dy: 12 }]
    });
    leg("#lg-natdemand", [{ c: legC("s1"), n: "Brand A — US" }, { c: legC("s3"), n: "Brand A — Michigan" }]);
    const ord = ["Brand A", "Brand B", "Brand C", "Brand D"];
    hbars($("#ch-natshare"), ord.map(b => ({ name: b, value: D.nat_share_latest[b], cls: clsmap[b], disp: D.nat_share_latest[b].toFixed(1) + "%" })));
    const chg = ord.map(b => ({ b, v: +(D.nat_share[b][L] - D.nat_share[b][0]).toFixed(1) })).sort((a, z) => z.v - a.v);
    hbars($("#ch-natsharechg"), chg.map(r => ({ name: r.b, value: r.v, disp: (r.v > 0 ? "+" : "") + r.v.toFixed(1) + " pts" })));
    const up = Object.keys(D.us_ticket_phys).map(b => ({ name: b, v: D.us_ticket_phys[b] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-us-tkphys"), up.map(r => ({ name: r.name, value: r.v, cls: clsmap[r.name], disp: "$" + r.v.toFixed(2) })));
    const uo = Object.keys(D.us_ticket_online).map(b => ({ name: b, v: D.us_ticket_online[b] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-us-tkonl"), uo.map(r => ({ name: r.name, value: r.v, cls: clsmap[r.name], disp: "$" + r.v.toFixed(2) })));
    lineChart($("#ch-adsov"), {
      labels: D.ad_labels, unit: "% of 4-brand US ad count", yMin: 0, yMax: 50, series: [
        { cls: "s1", name: "Brand A", values: D.ad_sov["Brand A"] },
        { cls: "s4", name: "Brand D", values: D.ad_sov["Brand D"], muted: 1, dy: -2 },
        { cls: "s3", name: "Brand C", values: D.ad_sov["Brand C"], muted: 1, dy: 11 },
        { cls: "s2", name: "Brand B", values: D.ad_sov["Brand B"], muted: 1 }]
    });
    leg("#lg-adsov", [{ c: legC("s1"), n: "Brand A" }, { c: legC("s4"), n: "Brand D" }, { c: legC("s3"), n: "Brand C" }, { c: legC("s2"), n: "Brand B" }]);
    lineChart($("#ch-segtxn"), {
      labels: D.seg_labels, unit: "transactions index (2024=100)", yMin: 82, yMax: 112, refY: 100, series: [
        { cls: "s1", name: "QSR", values: D.seg_txn_idx.QSR },
        { cls: "s2", name: "Fast Casual", values: D.seg_txn_idx["Fast Casual"], muted: 1, dy: 11 },
        { cls: "s3", name: "Casual Dining", values: D.seg_txn_idx["Casual Dining"], muted: 1, dy: -2 }]
    });
    leg("#lg-seg", [{ c: legC("s1"), n: "QSR — pizza sits here" }, { c: legC("s2"), n: "Fast Casual" }, { c: legC("s3"), n: "Casual Dining" }]);
    $("#tbl-seg").innerHTML = tableHTML(["Segment", "Avg ticket", "Spend YoY", "Txns YoY", "Ticket YoY"],
      ["QSR", "Fast Casual", "Casual Dining"].map(s => [s, "$" + D.seg_ticket_ttm[s].toFixed(2), fmtPct(D.seg_spend_yoy[s]), fmtPct(D.seg_txn_yoy[s]), fmtPct(D.seg_ticket_yoy[s])]), 0);
  }

  /* ---------- 04 Compete ---------- */
  function renderCompete() {
    const order = ["Brand B", "Brand A", "Brand C", "Brand D"];
    const tp = D.mi_ticket_phys, to = D.mi_ticket_online;
    kpiRow("#kpi-comp", [
      K("Brand A carryout ticket, MI", "$" + tp["Brand A"].toFixed(2), "■ card · mid-market", "brand"),
      K("Brand A delivery ticket, MI", "$" + to["Brand A"].toFixed(2), "■ +$" + (to["Brand A"] - tp["Brand A"]).toFixed(2) + " vs carryout", "brand"),
      K("Brand B carryout, MI", "$" + tp["Brand B"].toFixed(2), "■ value outlier", "flat"),
      K("Brand A share, top-4 MI chains", D.comp_share_latest["Brand A"].toFixed(0) + "%", "■ #2 behind Brand B", "flat", { values: D.comp_share["Brand A"], color: T.s[0] })
    ]);
    const po = Object.keys(tp).map(b => ({ name: b, v: tp[b] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-tkphys"), po.map(r => ({ name: r.name, value: r.v, cls: clsmap[r.name], disp: "$" + r.v.toFixed(2) })));
    const oo = Object.keys(to).map(b => ({ name: b, v: to[b] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-tkonl"), oo.map(r => ({ name: r.name, value: r.v, cls: clsmap[r.name], disp: "$" + r.v.toFixed(2) })));
    hbars($("#ch-share"), order.map(b => ({ name: b, value: D.comp_share_latest[b], cls: clsmap[b], disp: D.comp_share_latest[b].toFixed(1) + "%" })));
    lineChart($("#ch-sharetrend"), {
      labels: D.comp_labels, unit: "% of 4-brand MI card txns", yMin: 0, yMax: 70, refY: null, series: [
        { cls: "s1", name: "Brand A", values: D.comp_share["Brand A"] },
        { cls: "s2", name: "Brand B", values: D.comp_share["Brand B"] },
        { cls: "s3", name: "Brand C", values: D.comp_share["Brand C"], muted: 1 },
        { cls: "s4", name: "Brand D", values: D.comp_share["Brand D"], muted: 1 }]
    });
    leg("#lg-share", [{ c: legC("s1"), n: "Brand A" }, { c: legC("s2"), n: "Brand B" }, { c: legC("s3"), n: "Brand C" }, { c: legC("s4"), n: "Brand D" }]);
    const word = ["Brand A", "Brand B", "Brand C", "Brand D"];
    hbars($("#ch-websov"), word.map(b => ({ name: b, value: D.csc_sov_ttm[b], cls: clsmap[b], disp: D.csc_sov_ttm[b].toFixed(0) + "%" })));
    lineChart($("#ch-websovtrend"), {
      labels: D.csc_qlabels, unit: "% of 4-brand MI web visits", yMin: 0, yMax: 80, refY: null, series: [
        { cls: "s1", name: "Brand A", values: D.csc_sov["Brand A"] },
        { cls: "s2", name: "Brand B", values: D.csc_sov["Brand B"], muted: 1, dy: -2 },
        { cls: "s3", name: "Brand C", values: D.csc_sov["Brand C"], muted: 1, dy: 10 },
        { cls: "s4", name: "Brand D", values: D.csc_sov["Brand D"], muted: 1, dy: 20 }]
    });
    leg("#lg-websov", [{ c: legC("s1"), n: "Brand A" }, { c: legC("s2"), n: "Brand B" }, { c: legC("s3"), n: "Brand C" }, { c: legC("s4"), n: "Brand D" }]);
  }

  /* ---------- 05 Delivery ---------- */
  function renderDelivery() {
    kpiRow("#kpi-del", [
      K("Channel spend, US YoY", fmtPct(D.agg_us_spend_yoy), "■ outpacing orders (" + fmtPct(D.agg_us_total_yoy) + ")", "pos"),
      K("Avg order value, US", "$" + D.agg_us_aov_blended.toFixed(2), "■ ≥ Brand A ~$36 delivery", "brand"),
      K("Aggregator A, US orders YoY", fmtPct(D.agg_us_yoy["Aggregator A"]), "■ channel leader · ~77% share", "pos", { values: D.agg_us_idx["Aggregator A"], color: T.s[0] }),
      K("Aggregator C, US YoY", fmtPct(D.agg_us_yoy["Aggregator C"]), "■ structural decline", "neg", { values: D.agg_us_idx["Aggregator C"], color: T.loss }),
      K("Ann Arbor orders, YoY", fmtPct(D.agg_aa_total_yoy), "■ saturated", "flat", { values: D.agg_aa_idx["Aggregator A"], color: T.s[0] }),
      K("Ann Arbor spend, YoY", fmtPct(D.agg_aa_spend_yoy), "■ orders flat, baskets rising", "pos")
    ]);
    lineChart($("#ch-del-us"), {
      labels: D.agg_labels, unit: "index (Q1'24=100)", yMin: 60, yMax: 130, markers: [{ i: 5, label: "Brand A on Aggregator A" }], series: [
        { cls: "s1", name: "Aggregator A", values: D.agg_us_idx["Aggregator A"] },
        { cls: "s2", name: "Aggregator B", values: D.agg_us_idx["Aggregator B"], dy: 11 },
        { cls: "s3", name: "Aggregator C", values: D.agg_us_idx["Aggregator C"], dy: -2 }]
    });
    leg("#lg-del-us", [{ c: legC("s1"), n: "Aggregator A" }, { c: legC("s2"), n: "Aggregator B" }, { c: legC("s3"), n: "Aggregator C" }]);
    lineChart($("#ch-del-aa"), {
      labels: D.agg_labels, unit: "index (Q1'24=100)", yMin: 60, yMax: 140, markers: [{ i: 5, label: "Brand A on Aggregator A" }], series: [
        { cls: "s2", name: "Aggregator B", values: D.agg_aa_idx["Aggregator B"] },
        { cls: "s1", name: "Aggregator A", values: D.agg_aa_idx["Aggregator A"], dy: 11 },
        { cls: "s3", name: "Aggregator C", values: D.agg_aa_idx["Aggregator C"], dy: -2 }]
    });
    leg("#lg-del-aa", [{ c: legC("s1"), n: "Aggregator A" }, { c: legC("s2"), n: "Aggregator B" }, { c: legC("s3"), n: "Aggregator C" }]);
    const aov = [{ name: "Aggregator B", v: D.agg_us_aov["Aggregator B"], cls: "b2" },
    { name: "Aggregator C", v: D.agg_us_aov["Aggregator C"], cls: "b3" },
    { name: "Brand A (own delivery)", v: D.us_ticket_online["Brand A"], cls: "b1" },
    { name: "Aggregator A", v: D.agg_us_aov["Aggregator A"], cls: "b4" }].sort((a, z) => z.v - a.v);
    hbars($("#ch-del-aov"), aov.map(r => ({ name: r.name, value: r.v, cls: r.cls, disp: "$" + r.v.toFixed(2) })));
  }

  /* ---------- 06 Cohorts ---------- */
  function renderCohorts() {
    const brands = ["Brand A", "Brand B", "Brand C"];
    kpiRow("#kpi-coh", [
      K("Brand A base, YoY", fmtPct(D.gen_base_yoy["Brand A"]), "■ users · shrinking least in set", "flat"),
      K("Brand B base, YoY", fmtPct(D.gen_base_yoy["Brand B"]), "■ users · vs Brand A " + fmtPct(D.gen_base_yoy["Brand A"]), "neg"),
      K("Brand A Millennial share", D.gen_mix["Brand A"][1].toFixed(0) + "%", "■ its largest cohort", "brand"),
      K("Brand A Boomers, YoY", "+" + D.gen_yoy["Brand A"][3].toFixed(1) + "%", "■ only cohort growing in set", "pos")
    ]);
    stackBar($("#ch-genmix"), brands.map(b => ({ name: b, shares: D.gen_mix[b] })));
    $("#lg-gen").innerHTML = D.gen_short.map((g, i) => `<span style="display:inline-flex;align-items:center;gap:7px;font-family:${mono};font-size:10px;font-weight:500;text-transform:uppercase;letter-spacing:.1em;color:${T.ink2}"><span style="width:16px;height:10px;border-radius:5px;background:${T.ramp[i]}"></span>${g}</span>`).join("");
    const dg = D.gen_short.map((g, i) => ({ name: g, v: D.gen_yoy["Brand A"][i] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-gengrow"), dg.map(r => ({ name: r.name, value: r.v, disp: fmtPct(r.v) })));
    const bo = brands.map(b => ({ name: b, v: D.gen_base_yoy[b] })).sort((a, z) => z.v - a.v);
    hbars($("#ch-basegrow"), bo.map(r => ({ name: r.name, value: r.v, cls: r.name == "Brand A" ? "b1" : null, disp: fmtPct(r.v) })));
    const rows = D.inc_bands.map((band, i) => [band, D.inc_mix["Brand A"][i].toFixed(1) + "%", D.inc_mix["Brand B"][i].toFixed(1) + "%", D.inc_mix["Brand C"][i].toFixed(1) + "%"]);
    rows.push(["$100k+ combined", D.inc_top_share["Brand A"] + "%", D.inc_top_share["Brand B"] + "%", D.inc_top_share["Brand C"] + "%"]);
    $("#tbl-inc").innerHTML = tableHTML(["Household income", "Brand A", "Brand B", "Brand C"], rows, rows.length - 1);
  }

  const R = { "/": renderHome, "/demand": renderDemand, "/national": renderNational, "/compete": renderCompete, "/delivery": renderDelivery, "/cohorts": renderCohorts };
  const built = {};
  window.CA_RENDER = {
    build(route) { if (built[route] || !R[route]) return; built[route] = 1; try { R[route](); } catch (e) { console.error("render " + route, e); } },
    reset() { for (const k in built) delete built[k]; }
  };
})();
