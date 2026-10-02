# Card cohort cuts (US Complete) — the debias is MANDATORY

**Never publish a raw cohort share from the US Complete card panel.** The panel is materially older than
the country, so a raw generation split is panel composition, not customer mix. This is not a caution to
weigh; it is a precondition for the chart existing.

Applies to every cohort cut: **generation (116195-116198)** and **income (355-358)**, in the mix chart,
the change chart, the summary tile, and anything quoted in prose.

## The recipe

1. **Pull the brand**, per cohort, for the period: insight **116195** (Credit Card Spend, topic
   *United States – By Generation*) on the brand node, `date_resolution: year`, `location_resolution: us`,
   `aggregate: sum`.
2. **Pull the national panel**, same insight, same grain: entity **carc_id 96**, representation
   **`country`**, `location_resolution: "us"`. Note 626 does **not** execute on entity 96; 116195 does.
3. **Ratio, cohort by cohort:** `r_g = brand_spend_g / national_panel_spend_g`.
4. **Rebase:** `share_g = r_g / Σ r_g`.
5. **Drop Silent Gen** before rebasing (0.1–0.3% of every brand tested, and its panel base is tiny).
6. **Cut on the measure the brief leads with.** Spend spine → 116195. Cardholder spine → 116197. Never mix.

```python
r      = {g: brand[g] / national[g] for g in COHORTS}      # step 3
shares = {g: r[g] / sum(r.values()) * 100 for g in COHORTS} # step 4
```

## Why it is not optional — the pilot, twice

**It inverts comparisons, not just softens them.** On the pilot, the subject's raw 2025 mix read 10 / 43 / 36 / 11 and the
chart said *"the rival already skews older than the subject at the Gen-X end."* Adjusted, it reads
**53.9 / 25.6 / 15.8 / 4.7** and the subject is the **most** youth-weighted of the three brands
(the two rivals at 47.3% and 47.5%). The raw chart pointed the opposite way to the truth.

**It flips signs on individual cohorts.** On the luxury pilot it flipped Gen-X and moved Gen-Z from a
published "immaterial at 1.2%" to 13% of the mix. On the restaurant pilot it flipped 2 of 4 cohorts for the subject and 3 of 4 for one rival.

## How to present it

- It is a **share of adjusted pull across generations, not a share of revenue.** Say so in the caption:
  *"Each generation's spend at the brand divided by what that generation spends nationally, then rebased
  to 100%. Read it as where a brand's pull sits across generations, not as a share of its revenue."*
- Badge it with the dataset the pull came from, then the basis: `■ Credit Card – US Complete Panel ·
  adjusted for age skew`. Never a nickname such as "Panel" or "Card panel".
- **Both charts on a cohort tab sit on the adjusted basis.** A raw baseline beside an adjusted change chart
  puts two incompatible scales on one page and invites arithmetic between them that produces nonsense.
- Raw shares may be kept in `data.js` as a code comment for reference. They do not reach the page.

## Checks before shipping

- [ ] National denominator came from **carc_id 96 / `country` / `location_resolution: "us"`**, same insight and grain as the brand pull.
- [ ] Silent Gen dropped before rebasing; remaining cohorts sum to 100.
- [ ] Adjusted shares differ from raw. **If they are identical, the debias did not run.**
- [ ] Every cohort figure in prose, tiles and summary uses the adjusted number.
- [ ] Caption states the basis in plain words.

---

## Tracking a cohort over TIME still needs the index — "within-cohort is self-debiasing" is only half true

A within-cohort YoY does cancel the **cross-cohort mix** bias. It does **not** cancel the national
cohort's own panel growth, and those rates diverge sharply:

| national panel YoY | 2025 | 2026 |
|---|---|---|
| Gen-Z | +7.6% | **+10.4%** |
| Millennial | +1.3% | +3.6% |
| Gen-X | −1.9% | **+0.7%** |
| Boomer | +0.9% | +2.7% |

A 9.7pp spread between Gen-Z and Gen-X lands straight in any raw cohort chart, flattering the young and
punishing the middle.

**So plot `r_g = brand_g / national_g` and take the YoY of that**, exactly the ratio from step 3 above,
tracked over time instead of rebased. Read it as *"spend at the brand measured against what that
generation spends nationally."*

**On the pilot this reversed a conclusion.** The fast-growing rival's raw cohort YoY made Gen-Z its fastest-growing cohort
at +16.3%. Indexed, **Gen-Z is its slowest at +5.2% and Gen-X its fastest at +10.2%** — almost all the
raw Gen-Z number was the national Gen-Z panel growing beneath it. The subject's Gen-Z went from a mild
−2.7% raw to **−11.7%** indexed, and the spread across its cohorts widened from 10.9pp to 17.0pp.

**Chart form for the cohort tab:** one chart per brand — the subject and one comparator — with four
cohort lines each, monthly, indexed. A per-brand chart shows acceleration and deceleration inside the
brand; a bar chart of change between two endpoints hides when the turn happened. Keep the cohort colors
identical across the two cards so the pair reads together.
