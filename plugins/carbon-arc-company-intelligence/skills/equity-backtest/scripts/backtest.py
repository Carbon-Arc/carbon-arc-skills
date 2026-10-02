#!/usr/bin/env python3
"""Per-company backtest: how well has the panel tracked this company's reported metric?

Standard library only. Run it; do not re-derive its arithmetic from prose. Re-deriving it inline is the
failure mode this script exists to prevent (a ratio substituted for spend, a band computed as scatter of
the gap around its own mean, a correlation run on the substitute).

INPUT  a CSV with one row per fiscal quarter, both legs already on the same basis:
         period_end_date   ISO date; the join key (never a label)
         panel_yoy         panel SPEND YoY for the quarter, in percent (e.g. 3.2 for +3.2%)
         reported_yoy      the company's reported YoY for the anchor metric, in percent
         reported_source   REQUIRED: where that quarter's reported figure came from, a public
                           primary source (SEC EDGAR filing or company IR release URL) or the client's
                           supplied sheet ("client sheet: <file name>"). Anything else is refused: the
                           reported leg must be something the reader can rebuild themselves.
         condition         optional: a panel-health variable (e.g. cardholder growth, percent) used to
                           test whether the gap is conditional rather than drifting

USAGE  backtest.py quarters.csv [--qtd 4.1] [--window 4] [--out table.csv] [--json summary.json]
         --qtd      quarter-to-date panel spend YoY for the target quarter, same basis; produces the estimate
         --window   how many prior quarters' gaps the correction averages (default 4)

WHAT IT COMPUTES
  gap(Q)        = panel_yoy(Q) - reported_yoy(Q)                        (the calibration gap)
  estimate(Q)   = panel_yoy(Q) - mean(gap over the `window` quarters BEFORE Q)
                  (walk-forward: each quarter corrected only with gaps known before it closed)
  error(Q)      = estimate(Q) - reported_yoy(Q)
  band          = mean |error| over the walk-forward quarters (the realized band, never a modeled
                  interval, and never the scatter of the gap around its own mean)
  forward       = qtd - mean(last `window` gaps), with the same band, and the quarters and gaps that
                  correction averages (`correction_from`), so the page can show the bridge from the script
  coverage      = how many scored quarters missed by no more than the band (the band is a mean miss, not
                  an interval; publish the count beside it)
  counts        = quarters in history, quarters scored, calibration-only quarters, direction calls: the
                  page uses these words once, everywhere
  Also: Pearson correlation of panel vs reported YoY with a lead/lag check, the directional hit count,
  the trend in the raw gaps, the slope of reported on panel, a walk-forward fitted challenger
  (reported = a + b * panel, refit each quarter on prior quarters only), the spread across correction
  rules, and the informativeness ratio (band against the reported metric's own recent spread).

The verdict it prints is the tracking gate: TRACKS or DOES NOT TRACK. Precision is a label, never a gate.
It cannot see a named structural break in what the panel measures; you still judge that.
"""
import csv, json, math, sys, statistics as st
from datetime import date

MIN_QUARTERS = 5          # below this there is no distribution to draw a band from

MATERIAL_R = 0.5          # "positive and material" correlation


def pearson(x, y):
    if len(x) < 3:
        return None
    mx, my = st.mean(x), st.mean(y)
    sxy = sum((a - mx) * (b - my) for a, b in zip(x, y))
    sxx = sum((a - mx) ** 2 for a in x)
    syy = sum((b - my) ** 2 for b in y)
    if sxx == 0 or syy == 0:
        return None
    return sxy / math.sqrt(sxx * syy)


def ols(x, y):
    """Return (intercept, slope, r2) for y = a + b x."""
    mx, my = st.mean(x), st.mean(y)
    sxx = sum((a - mx) ** 2 for a in x)
    if sxx == 0:
        return None
    b = sum((a - mx) * (c - my) for a, c in zip(x, y)) / sxx
    a = my - b * mx
    ss_tot = sum((c - my) ** 2 for c in y)
    ss_res = sum((c - (a + b * xi)) ** 2 for xi, c in zip(x, y))
    r2 = 1 - ss_res / ss_tot if ss_tot else 0.0
    return a, b, r2


def load(path):
    rows = []
    with open(path, newline="", encoding="utf-8") as f:
        for r in csv.DictReader(f):
            d = date.fromisoformat(r["period_end_date"].strip())
            src = (r.get("reported_source") or "").strip()
            if not src:
                sys.exit(f"ERROR: {d} has no reported_source. Every reported figure needs its public primary "
                         "source (SEC EDGAR or company IR URL) or 'client sheet: <file>'. Drop the quarter if "
                         "it cannot be sourced; never estimate it.")
            if not (src.lower().startswith(("http://", "https://")) or src.lower().startswith("client sheet:")):
                sys.exit(f"ERROR: {d} reported_source '{src}' is not a public source. Use the filing or "
                         "release URL, or 'client sheet: <file>', so the reader can rebuild the number.")
            row = {"period_end_date": d,
                   "panel_yoy": float(r["panel_yoy"]),
                   "reported_yoy": float(r["reported_yoy"]),
                   "reported_source": src}
            if r.get("condition", "").strip():
                row["condition"] = float(r["condition"])
            rows.append(row)
    rows.sort(key=lambda r: r["period_end_date"])
    dates = [r["period_end_date"] for r in rows]
    if len(set(dates)) != len(dates):
        sys.exit("ERROR: duplicate period_end_date rows. One row per quarter; fix the input, do not aggregate here.")
    return rows


def walk_forward(rows, window):
    out = []
    for i, r in enumerate(rows):
        prior = [rows[j]["panel_yoy"] - rows[j]["reported_yoy"] for j in range(max(0, i - window), i)]
        if len(prior) < window:
            est = None
        else:
            est = r["panel_yoy"] - st.mean(prior)
        out.append(est)
    return out


def fitted_walk_forward(rows, min_fit=4):
    out = []
    for i, r in enumerate(rows):
        if i < min_fit:
            out.append(None)
            continue
        fit = ols([q["panel_yoy"] for q in rows[:i]], [q["reported_yoy"] for q in rows[:i]])
        out.append(None if fit is None else fit[0] + fit[1] * r["panel_yoy"])
    return out


def mae(ests, rows):
    errs = [e - r["reported_yoy"] for e, r in zip(ests, rows) if e is not None]
    return (st.mean(abs(e) for e in errs) if errs else None), errs


def main(argv):
    if not argv or argv[0].startswith("-"):
        print(__doc__)
        return 2
    path = argv[0]
    qtd = float(argv[argv.index("--qtd") + 1]) if "--qtd" in argv else None
    window = int(argv[argv.index("--window") + 1]) if "--window" in argv else 4
    out_csv = argv[argv.index("--out") + 1] if "--out" in argv else None
    out_json = argv[argv.index("--json") + 1] if "--json" in argv else None

    rows = load(path)
    n = len(rows)
    panel = [r["panel_yoy"] for r in rows]
    rep = [r["reported_yoy"] for r in rows]
    gaps = [p - q for p, q in zip(panel, rep)]

    # tracking evidence
    r0 = pearson(panel, rep)
    lag = {"panel_leads_1q": pearson(panel[:-1], rep[1:]) if n > 3 else None,
           "same_quarter": r0,
           "reported_leads_1q": pearson(rep[:-1], panel[1:]) if n > 3 else None}
    moves = [(panel[i] - panel[i - 1], rep[i] - rep[i - 1]) for i in range(1, n)]
    hits = sum(1 for dp, dr in moves if dp * dr > 0)
    ties = sum(1 for dp, dr in moves if dp == 0 or dr == 0)

    # correction rules, all walk-forward
    rules = {}
    for w in sorted({1, window, 4, 8}):
        if w < n:
            e = walk_forward(rows, w)
            m, errs = mae(e, rows)
            if m is not None:
                rules[f"average of prior {w} gap(s)"] = {"estimates": e, "mae": m,
                                                        "worst": max(abs(x) for x in errs), "n": len(errs)}
    fe = fitted_walk_forward(rows)
    fm, ferrs = mae(fe, rows)
    if fm is not None:
        rules["fitted: reported = a + b * panel"] = {"estimates": fe, "mae": fm,
                                                     "worst": max(abs(x) for x in ferrs), "n": len(ferrs)}
    primary_key = f"average of prior {window} gap(s)"
    primary = rules.get(primary_key)

    # gap diagnostics on RAW per-quarter gaps, never on trailing averages
    trend = ols(list(range(n)), gaps) if n >= 3 else None
    cond = None
    if all("condition" in r for r in rows) and n >= 4:
        c = ols([r["condition"] for r in rows], gaps)
        if c:
            resid = [g - (c[0] + c[1] * r["condition"]) for g, r in zip(gaps, rows)]
            cond = {"intercept": c[0], "slope": c[1], "r2": c[2],
                    "residual_sd": st.stdev(resid) if n > 2 else None}
    slope_fit = ols(panel, rep) if n >= 3 else None

    # informativeness: band against the reported metric's own recent spread
    spread = st.stdev(rep[-8:]) if n >= 3 else None
    band = primary["mae"] if primary else None
    within = None
    if primary and band is not None:
        _, perrs = mae(primary["estimates"], rows)
        within = sum(1 for e in perrs if abs(e) <= band + 1e-9)

    # tracking gate (precision is a label, never the gate)
    reasons = []
    if n < MIN_QUARTERS:
        reasons.append(f"only {n} same-basis quarters (need {MIN_QUARTERS})")
    if r0 is None or r0 < MATERIAL_R:
        reasons.append(f"correlation {r0 if r0 is None else round(r0, 2)} is not positive and material (>= {MATERIAL_R})")
    if moves and hits <= (len(moves) - ties) / 2:
        reasons.append(f"direction {hits} of {len(moves)} is no better than a coin flip")
    verdict = "DOES NOT TRACK" if reasons else "TRACKS"
    label = None
    if verdict == "TRACKS" and band is not None and spread:
        label = "precise" if band < 0.75 * spread else "imprecise: band at or near the metric's own spread; say so in one sentence"

    forward = None
    if qtd is not None and verdict == "TRACKS" and primary:
        corr = st.mean(gaps[-window:])
        forward = {"qtd_panel_yoy": qtd, "correction_applied": -corr, "estimate": qtd - corr,
                   "band": band, "worst_miss": primary["worst"], "n_scored": primary["n"],
                   "within_band": within,
                   "correction_from": [{"period_end_date": r["period_end_date"].isoformat(), "gap": g}
                                       for r, g in zip(rows[-window:], gaps[-window:])]}
        alts = {}
        for k, v in rules.items():
            if k.startswith("average of prior"):
                w = int(k.split()[3])
                if w <= n:
                    alts[k] = qtd - st.mean(gaps[-w:])
        if slope_fit:
            alts["fitted: reported = a + b * panel"] = slope_fit[0] + slope_fit[1] * qtd
        forward["alternatives"] = alts
        spread_rules = max(alts.values()) - min(alts.values()) if alts else 0.0
        forward["rule_spread"] = spread_rules
        forward["rule_spread_exceeds_band"] = bool(band is not None and spread_rules > band)

    summary = {
        "quarters": n,
        "first": rows[0]["period_end_date"].isoformat(), "last": rows[-1]["period_end_date"].isoformat(),
        "correlation": r0, "lead_lag": lag,
        "direction_hits": hits, "direction_moves": len(moves),
        "gap_mean_all": st.mean(gaps), f"gap_mean_last_{window}": st.mean(gaps[-window:]) if n >= window else None,
        "gap_trend": None if not trend else {"slope_per_quarter": trend[1], "r2": trend[2]},
        "gap_conditional_fit": cond,
        "slope_reported_on_panel": None if not slope_fit else {"intercept": slope_fit[0], "slope": slope_fit[1], "r2": slope_fit[2]},
        "range_panel": max(panel) - min(panel), "range_reported": max(rep) - min(rep),
        "rules": {k: {"mae": v["mae"], "worst": v["worst"], "n": v["n"]} for k, v in rules.items()},
        "primary_rule": primary_key, "band": band, "within_band": within,
        "counts": {"quarters_in_history": n,
                   "quarters_scored": primary["n"] if primary else 0,
                   "calibration_only": n - (primary["n"] if primary else 0),
                   "direction_calls": len(moves), "direction_hits": hits},
        "reported_spread_last8_sd": spread,
        "verdict": verdict, "verdict_reasons": reasons, "precision_label": label,
        "forward": forward,
    }

    # per-quarter table
    table = []
    for i, r in enumerate(rows):
        e = primary["estimates"][i] if primary else None
        table.append({"period_end_date": r["period_end_date"].isoformat(),
                      "panel_yoy": r["panel_yoy"], "reported_yoy": r["reported_yoy"],
                      "reported_source": r["reported_source"],
                      "gap": gaps[i],
                      "estimate_walk_forward": e,
                      "error": None if e is None else e - r["reported_yoy"],
                      "fitted_estimate": fe[i],
                      "fitted_error": None if fe[i] is None else fe[i] - r["reported_yoy"]})
    for row in table:
        for k, v in row.items():
            if isinstance(v, float):
                row[k] = round(v, 4)
    if out_csv:
        with open(out_csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(table[0].keys()))
            w.writeheader()
            w.writerows(table)
    if out_json:
        with open(out_json, "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=2, default=str)

    # human-readable
    f2 = lambda v: "n/a" if v is None else f"{v:+.2f}"
    c = summary["counts"]
    print(f"{n} quarters, {summary['first']} to {summary['last']}: {c['quarters_scored']} scored, {c['calibration_only']} calibration only")
    print(f"correlation {f2(r0)}   panel leads 1q {f2(lag['panel_leads_1q'])}   reported leads 1q {f2(lag['reported_leads_1q'])}")
    print(f"direction   {hits} of {len(moves)} quarter-on-quarter moves called")
    print(f"gap         mean {f2(summary['gap_mean_all'])}pp all, {f2(summary.get(f'gap_mean_last_{window}'))}pp last {window}"
          + ("" if not trend else f"; trend {trend[1]:+.2f}pp/quarter, R2 {trend[2]:.2f}"))
    if cond:
        print(f"conditional gap = {cond['intercept']:+.2f} + {cond['slope']:.3f} x condition, R2 {cond['r2']:.2f}")
    if slope_fit:
        print(f"slope       reported on panel {slope_fit[1]:.2f} (the additive rule assumes 1.0); ranges {summary['range_panel']:.1f} vs {summary['range_reported']:.1f}pp")
    for k, v in rules.items():
        mark = "  <- primary" if k == primary_key else ""
        print(f"rule        {k:34s} mean |error| {v['mae']:.2f}pp, worst {v['worst']:.2f}pp, n={v['n']}{mark}")
    if spread is not None:
        print(f"spread      reported YoY sd (last 8) {spread:.2f}pp against band " + ("n/a" if band is None else f"{band:.2f}pp"))
    print(f"VERDICT     {verdict}" + (f" ({label})" if label else ""))
    for r in reasons:
        print(f"            - {r}")
    if forward:
        print(f"ESTIMATE    {forward['estimate']:+.2f}%, average miss {forward['band']:.2f}pp  (qtd {qtd:+.2f}% with correction {forward['correction_applied']:+.2f}pp; worst miss {forward['worst_miss']:.2f}pp on {forward['n_scored']} scored quarters, {forward['within_band']} within the average miss)")
        print("BRIDGE      correction averages " + ", ".join(f"{c['period_end_date']} gap {c['gap']:+.2f}pp" for c in forward["correction_from"]))
        print(f"            rule spread {forward['rule_spread']:.2f}pp" + ("  EXCEEDS THE BAND: publish both answers" if forward["rule_spread_exceeds_band"] else ""))
    elif qtd is not None:
        print("ESTIMATE    none: the panel does not track this company's reported metric")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
