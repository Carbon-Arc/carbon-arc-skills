#!/usr/bin/env python3
"""Tests for backtest.py. Run: python3 test_backtest.py  (exit 0 = pass)."""
import csv, json, os, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "backtest.py")


def run(rows, *args):
    d = tempfile.mkdtemp()
    p = os.path.join(d, "q.csv")
    with open(p, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(list(rows[0].keys()))
        for r in rows:
            w.writerow(list(r.values()))
    js = os.path.join(d, "s.json")
    res = subprocess.run([sys.executable, SCRIPT, p, "--json", js, *args], capture_output=True, text=True)
    return res, (json.load(open(js)) if os.path.exists(js) else None)


def quarters(n, panel, reported, start_year=2023):
    ends = []
    y, m = start_year, 3
    for _ in range(n):
        ends.append(f"{y}-{m:02d}-28")
        m += 3
        if m > 12:
            m, y = 3, y + 1
    return [{"period_end_date": e, "panel_yoy": p, "reported_yoy": r,
             "reported_source": f"https://www.sec.gov/Archives/edgar/data/0000000/{e}.htm"}
            for e, p, r in zip(ends, panel, reported)]


fails = 0
def check(name, cond):
    global fails
    print(("PASS  " if cond else "FAIL  ") + name)
    fails += 0 if cond else 1


# 1. constant gap of +2pp: walk-forward estimates are exact, band 0, forward = qtd - 2
rep = [1.0, 2.5, 3.0, 1.5, 0.5, 2.0, 3.5, 2.2, 1.1, 2.8]
res, s = run(quarters(10, [r + 2 for r in rep], rep), "--qtd", "5.0")
check("constant gap: verdict TRACKS", s["verdict"] == "TRACKS")
check("constant gap: band is zero", abs(s["band"]) < 1e-9)
check("constant gap: forward estimate = qtd - 2", abs(s["forward"]["estimate"] - 3.0) < 1e-9)
check("constant gap: correction applied is -2", abs(s["forward"]["correction_applied"] + 2.0) < 1e-9)

# 2. walk-forward, not in-sample: gap steps from 0 to 4 mid-window; band must be > 0
panel = rep[:5] + [r + 4 for r in rep[5:]]
res, s = run(quarters(10, panel, rep))
check("step in gap: band is positive (walk-forward sees the step)", s["band"] > 0.5)

# 3. too few quarters -> DOES NOT TRACK, no estimate
res, s = run(quarters(4, [1, 2, 3, 4], [1, 2, 3, 4]), "--qtd", "2.0")
check("4 quarters: DOES NOT TRACK", s["verdict"] == "DOES NOT TRACK")
check("4 quarters: no forward estimate", s["forward"] is None)

# 4. uncorrelated series -> DOES NOT TRACK
res, s = run(quarters(10, [3, -2, 4, -1, 2, -3, 5, 0, -2, 3], [1, 1.2, 0.9, 1.1, 1.0, 1.3, 0.8, 1.1, 1.2, 0.9]), "--qtd", "1.0")
check("uncorrelated: DOES NOT TRACK", s["verdict"] == "DOES NOT TRACK")

# 5. duplicate dates -> hard error
rows = quarters(6, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
rows[3]["period_end_date"] = rows[2]["period_end_date"]
res, s = run(rows)
check("duplicate dates: refuses to run", res.returncode != 0 and "duplicate" in (res.stdout + res.stderr).lower())

# 6. rows out of order are sorted by date (result identical to ordered input)
ordered = quarters(10, [r + 2 for r in rep], rep)
_, s1 = run(ordered, "--qtd", "5.0")
_, s2 = run(list(reversed(ordered)), "--qtd", "5.0")
check("unordered input is sorted by period end date", abs(s1["forward"]["estimate"] - s2["forward"]["estimate"]) < 1e-9)

# 7. amplified panel (slope 0.5): fitted challenger beats the additive rule
rep2 = [1.0, 3.0, -1.0, 2.0, 4.0, 0.0, 2.5, -0.5, 3.5, 1.5, 0.5, 2.0]
res, s = run(quarters(12, [2 * r + 1 for r in rep2], rep2))
fitted = s["rules"]["fitted: reported = a + b * panel"]["mae"]
additive = s["rules"]["average of prior 4 gap(s)"]["mae"]
check("amplified panel: slope reported on panel is 0.5", abs(s["slope_reported_on_panel"]["slope"] - 0.5) < 1e-9)
check("amplified panel: fitted challenger beats additive", fitted < additive)

# 8. direction hits counted on quarter-on-quarter moves
res, s = run(quarters(6, [1, 2, 3, 2, 1, 2], [1, 2, 3, 2, 1, 2]))
check("identical series: direction 5 of 5", s["direction_hits"] == 5 and s["direction_moves"] == 5)

# 9. a row with no reported source is refused
rows = quarters(6, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
rows[2]["reported_source"] = ""
res, s = run(rows)
check("missing reported_source: refuses to run", res.returncode != 0 and "reported_source" in (res.stdout + res.stderr))

# 10. a source that is neither a URL nor the client's sheet is refused
rows = quarters(6, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
rows[4]["reported_source"] = "internal_db.company_financials"
res, s = run(rows)
check("non-public source: refuses to run", res.returncode != 0 and "not a public source" in (res.stdout + res.stderr))

# 11. a client sheet is accepted
rows = quarters(6, [1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
for r in rows:
    r["reported_source"] = "client sheet: acme_reported.xlsx"
res, s = run(rows)
check("client sheet source: accepted", res.returncode == 0)

# 12. counts, coverage and the correction bridge
res, s = run(quarters(10, [r + 2 for r in rep], rep), "--qtd", "5.0")
c = s["counts"]
check("counts: 10 in history, 6 scored, 4 calibration only, 9 direction calls",
      (c["quarters_in_history"], c["quarters_scored"], c["calibration_only"], c["direction_calls"]) == (10, 6, 4, 9))
check("coverage: every scored quarter within a zero band", s["forward"]["within_band"] == 6)
cf = s["forward"]["correction_from"]
check("bridge: correction averages the last 4 quarters", len(cf) == 4 and cf[-1]["period_end_date"] == s["last"])
check("bridge: correction_from gaps average to minus the correction applied",
      abs(sum(x["gap"] for x in cf) / 4 + s["forward"]["correction_applied"]) < 1e-9)
res, s = run(quarters(10, rep[:5] + [r + 4 for r in rep[5:]], rep))
k = s["counts"]["quarters_scored"]
check("coverage: within_band is between 0 and the scored count", 0 <= s["within_band"] <= k)

print(f"\n{fails} failure(s)")
sys.exit(1 if fails else 0)
