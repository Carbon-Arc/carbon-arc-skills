# POS demographic cohorts — the only thing this panel is for

**The receipt panel is a demographic instrument and nothing else.** Do not publish its spend levels, its
volumes, its unit prices or their growth, for the subject or for a peer. The panel is far too thin
against a brand's real trade to size anything, and its components decay independently, so a level read
is a read on panel health wearing a business's name.

What it is genuinely good for is **who is buying**, on dimensions the card panel does not carry, from
receipts rather than from a card's merchant line. That makes it the natural partner to
`card-cohorts.md` rather than a competitor to `card-core.md`.

Two components, two panels: **in store** (691k+ members) and **online** (265k+ members). They are
separate topics and separate samples. Pick on coverage, never merge them, and hold whichever you picked
across every comparator (non-negotiable 12).

| Measure | In store | Online |
|---|---|---|
| POS Spend, by demographic cohorts | **512** | **515** |
| POS Volume, by demographic cohorts | 513 | 516 |
| POS Average Unit Price, by demographic cohorts | 514 | 517 |

> The cohort columns these topics return are not yet confirmed call by call. The asset's dictionary
> carries generation, gender, yearly income, education level and ethnicity. **This package uses
> generation and income only**, for parity with the card recipe. Confirm which dimension columns come
> back on the first call of a run and record it; do not assume the shape.

---

## The debias is mandatory, and it is the card recipe

A raw cohort share from a receipt panel is **panel composition, not customer mix**, exactly as it is for
card. The correction is identical, so the two panels can be read side by side once both are adjusted.

1. **Pull the brand**, per cohort, for the period: insight **512** (or 515) on the brand node,
   `location_resolution: "us"`, `aggregate: sum`.
2. **Pull the national panel**, same insight, same grain, same component: entity **carc_id 96**,
   representation **`country`**, `location_resolution: "us"`.
3. **Ratio, cohort by cohort:** `r_g = brand_g / national_g`.
4. **Rebase:** `share_g = r_g / Σ r_g`.

```python
r      = {g: brand[g] / national[g] for g in COHORTS}
shares = {g: r[g] / sum(r.values()) * 100 for g in COHORTS}
```

**For a trend, plot `r_g` itself and take its year over year, never the raw share's.** A within-cohort
growth rate cancels the cross-cohort mix bias and does **not** cancel the national cohort's own panel
growth, and those rates diverge by several points a year. The reasoning and the worked reversal are in
`card-cohorts.md`; it applies here unchanged.

**If adjusted equals raw, the debias did not run.**

## Gates before a cohort chart ships

- [ ] National denominator from **carc_id 96 / `country` / `location_resolution: "us"`**, same insight,
      same component, same grain as the brand pull.
- [ ] **Volume gate on the brand's cohort cells, not just its total.** A brand carrying a few thousand
      dollars a month on this panel does not survive a five-way split, and a cohort chart built on
      single-digit receipts is noise with a caption. Print `n` per cohort and drop the cut if the
      thinnest cell cannot carry it.
- [ ] Component recorded, and the same component used for every comparator.
- [ ] Adjusted shares differ from raw.
- [ ] Caption states the basis: *"each cohort's spend at the brand divided by what that cohort spends
      nationally, then rebased to 100%. Read it as where the brand's pull sits across cohorts, not as a
      share of its revenue."*
- [ ] Badge with the dataset name as `data_library` gives it, then the basis: `■ Receipt · adjusted for
      panel skew`. Never a nickname.

## What not to do with it

- **No spend levels, no growth rates on levels.** *Verified Sep 2026:* one brand's online component fell
  from $62.7k a month to **$68** while its marketplace revenue set records, and its in-store component
  ran on through the same window. A level chart there says "e-commerce collapsed 99.9%" and means
  "this panel stopped."
- **No cross-panel arithmetic.** Receipt spend over card users, or receipt spend over marketplace units,
  is a quotient of two different samples and is not a rate of anything (non-negotiable 12a).
- **No share of a brand's trade.** The panel sees a sliver of receipts; the denominator it would need
  does not exist here.
