# Gating recipes

`SKILL.md` §4 states the gates. This file is how you compute them. Every threshold here was set from
data on a run, never asserted — and publishing the number you set it from is part of the gate.

---

## 1. Volume gate — which brands may be ranked

**Set the floor on base size, using the noise proxy as corroboration, not the other way round.**

```python
# noise proxy: mean absolute change in YoY, NOT mean absolute QoQ.
# Raw QoQ is dominated by seasonality and returns ~20% for a $38m brand and a $0.3m one alike,
# so it cannot find a knee.
yoy   = [(v[i]/v[i-4] - 1)*100 for i in range(4, len(v))]
noise = mean(abs(yoy[i] - yoy[i-1]) for i in range(1, len(yoy)))
```

**The proxy alone cannot tell *thin* from *accelerating*.** A brand growing 16% a year has a high mean
absolute change by construction. On the pilot, a fast-growing rival showed 3.8pp noise on **$2.6m** of base-quarter spend
and a small regional peer 4.9pp on **$230k** — similar proxies, opposite causes. Plot noise against base size and
take the knee; where the two disagree, base size wins.

Then **drop the largest period and recompute**. Publish both numbers. A floor that moves a lot when one
period is removed is a floor set on one period.

Pilot floors, for calibration only — **re-derive per run**: luxury pilot 1,000 base-year cardholders;
specialty-retail pilot $300k base-year quarterly spend; restaurant pilot $1m base-year quarterly spend.

**Gate every ranked cut, not just the finest grain.** Gating one chart and leaving another ungated is
worse than gating neither, because it implies the ungated one was checked. Print `n`.

---

## 2. Detection floor — before any event claim

Measure what an *ordinary* week does before claiming what an event did.

```python
pre  = [weekly_did[i] for i in pre_window]     # brand YoY minus control-group YoY
post = [weekly_did[i] for i in post_window]
did  = mean(post) - mean(pre)
se   = sqrt(stdev(pre)**2/len(pre) + stdev(post)**2/len(post))
band = (did - 1.96*se, did + 1.96*se)          # spans zero -> no detectable effect
```

**Publish the floor as the module's opening chart, not as a caveat.** It tells the reader which of their
own initiatives are measurable here before they commission anything.

The floor sorts events by **the size of their effect, not by their type.** A move that reaches every
customer generally clears it; a change to one item in a range generally does not. Which is which is an
empirical question for the vertical in front of you, so measure rather than assume.

*(On the restaurant pilot, weekly DiD swung −2.6 to +5.4pp on ordinary weeks, putting the floor near
±3.5pp. A supplier-linked outbreak cleared it tenfold. A single-item launch did not clear it at all:
DiD +1.40pp, SE 1.79pp, t = 0.78, band −2.11 to +4.89.)*

"No detectable effect" is a finding. It is not "a small effect".

---

## 3. Drift check — before any period-over-period move

Some measures drift for the whole panel between periods. Compute the change across **all** comparable
pairs and quote mean and standard deviation; if the candidate move sits inside that distribution it is
drift.

On the pilot, **1,614 of 2,214** cross-shop pairs rose between periods, mean **+0.0037**, median +0.0037,
stdev 0.0087. A "+0.010 rise" for one brand was well inside it. See `instruments/cross-shop.md`.

---

## 4. A pre-period baseline is not a seasonal control

Indexing to the weeks before an event does not control for a season that is moving underneath it. Most
consumer categories have a seasonal shape large enough to swamp an event effect — establish the
subject's own before reading anything. *(Restaurant spend falls about 19% from the June peak to
mid-September regardless of any event.)*

**Use a control group**: unaffected peers, or unaffected geographies. Then only the **difference** between
treated and control is interpretable — the levels are not. On the pilot the raw state indices read −43.5%
and −32.3%; the finding was the **11.3pp gap**, not either number.

A good control validates itself: the 4 July holiday week read **100.2** on the peer ratio, so the method
absorbed a shock that hit every brand.

---

## 5. Completeness control — before publishing any recent series

`table_max_date` marks the last row present, **not the last period filled**.

Pull an aggregate on the **same topic** as the subject and check both its YoY *and its raw level*. Fill
lag depresses the level; a real slowdown need not. For card, `626` does not execute on the country
entity but **does** execute on a **category entity** — resolve the subject's own category with
`search_entities`, representation `category`. *(Restaurants is 251 and Fast Casual 110, if the subject is
in that vertical.)* Do not reach for a different topic: a By-Generation control produced a false fill-lag call on
the pilot because that subset fills differently from the core panel.

Also drop the **first and last weeks of any weekly pull** — they are partial (0.59m against a 2.6m
run-rate) — and check the **holiday calendar** before reading a weekly year-over-year. Labor Day fell in
different weeks across two years on the pilot and swung the series 12pp in a fortnight.

---

## 6. A positive YoY is not a recovery

Three tests, all three:

1. **Two-year stack.** The pilot's +2.79% quarter was **−0.61%** against two years earlier.
2. **The periods after the window.** A turn that has already reversed is not a turn.
3. **The category.** If the subject sits within half a point of its category, the headline is *it is the
   category*. On the pilot the subject ran +0.9% against its category at +1.3%, and a peer was within a hundredth of a point.

---

## 7. Panel-break gate

**Run this on every series before it reaches a chart.** One pilot found four breaks, and each would have
produced a confident, false business finding. A series that fails is dropped or flagged, never silently
included.

```python
step = [v[i]/v[i-1] - 1 for i in range(1, len(v))]
# flag any |step| > 0.30 that does not revert within two periods
```

A break is a **level shift that persists**. A spike that reverts is an event; a step that stays is the
panel. Four tests separate them:

1. **Does a paired measure move with it?** A real demand change moves revenue and units together. On the
   pilot, listings fell 42% in a week while revenue and units were flat: panel.
2. **Do peers move in the same period?** If every brand steps, it is the panel or a method revision. If
   only the subject steps while peers run on, it is the subject's series — and in a **share** chart that
   produces peer "gains" summing exactly to the subject's loss, which is the signature of a denominator
   artifact rather than a market move.
3. **Does a derived measure move but not its inputs?** Average Price Per Listing jumped 46% at the
   listings break because its denominator moved. The achieved unit price, built from revenue and units,
   did not move at all.
4. **Is the ratio to a covered peer stable, then stepping — or low throughout?** Break and thin coverage
   look identical in one window and demand **opposite** actions: a break means cut the window and use the
   clean side, thin coverage means withdraw the series. *Verified Sep 2026:* a browsing panel was written
   off as under-covering the subject on a single mid-2026 window, where it sat at 0.07x a peer. Across the
   full history the ratio ran 0.47 to 1.33 for five years and stepped to 0.07 in one quarter. It was a
   break. The withdrawal cost a report its entire competitive-set module. **Never diagnose coverage from
   one window.**
5. **Does it survive a constant-subject basis?** Most panels offer one beside the core topic (card
   constant shopper, clickstream consistent user). A move that survives it is not subjects entering or
   leaving the panel; a move that shrinks or vanishes on it was composition. Run it on every modality
   that offers one, not only on card.
6. **Does a second, independent panel show the same step at the same time?** Agreement puts the cause
   upstream of both (a shared mapping layer) or makes it real; disagreement localizes it to one panel. A
   frozen panel is fine for this: dating a past event needs history, not currency.

**Tests 1 to 4 can reach only a suspected break (§11, tier 2). Only tests 5 and 6, a contradiction with
audited reported figures, or a named mechanism confirm one.** Flagging is the default; dropping a series
needs a confirmed break. Report the tests that came back negative: they are evidence the move is real.

What the pilot found, as worked examples:

| Series | Break | What it would have said |
|---|---|---|
| A catalog count | −42% in one week, permanent | "the brand cut its range by half" |
| Its derived average price | +46% same week, denominator-driven | "the brand raised prices 46%" |
| POS online | decayed to $68/month | "online retail collapsed 99.9%" |
| Browsing traffic | −85% in one quarter, permanent | "the brand lost its audience" |

**A series that fails this gate is flagged, or dropped once the break is confirmed (§11), never silently
included.** If
the break is confined to one component, use the clean component and apply the same basis to every comparator.

Also check for **holes**. A peer series on the pilot had two months missing entirely and two more at 5%
of their neighbours. Missing rows are never interpolated; the peer is flagged or dropped.

---

## 8. Rank reproducibility — before publishing any ranked list

A ranking can be stable-looking and still be an artifact of the window it was computed on. Rank the same
list on **two adjacent windows of equal length** and compare the top ten.

```python
overlap = len(set(top10(window_a)) & set(top10(window_b)))
# expect >= 7 of 10. Below that, the panel moved under you — find the break before reading the rank.
```

It is free — it runs on data already retrieved — and it catches breaks that a subject's own series can
hide, because a ranking draws on hundreds of partner series and a panel change moves many of them at once.

*Verified Sep 2026:* an affinity ranking scored 7/10, 8/10, 7/10 and 9/10 across four clean windows
spanning two and a half years, with the same four brands holding the top four in every one — and **3/10**
on the single window that straddled a panel break. The broken ranking was plausible enough to ship: it
returned a coherent-looking set whose members were simply the wrong ones.

**A category-implausible name in a ranked list is evidence of a broken panel, not of a noisy metric.**
The instinct is to filter the odd name away; that hides the break and leaves the rest of the ranking
wrong. Treat a failed plausibility check as a stop, not a cleanup step.

Applies to any ranked output: affinity and overlap rankings, peer league tables, category leaderboards.

---

---

## 9. Two assets, one question: compare before choosing

Run whenever more than one reachable asset covers the same signal (`ca-core` §4, gate 6).

1. Pull the **same cut** from both: same entity, geography and window.
2. Compare **totals** and **rank order**. A Spearman correlation below about 0.8 means at least one of
   them cannot support a ranking.
3. Check whether the coverage ratio is **uniform** across the cut. Non-uniform coverage is what silently
   inverts a ranking, and it is invisible unless you look.
4. **Prefer a census over a panel** wherever a reachable census exists.
5. Never divide one by the other (gate 10). Compare ranks, or test against a bound and name it.

*(On a musician pilot, two resale-ticket panels covered the same 29 tour markets: one saw 2,766 tickets,
the other 60,578, with coverage ratios from 6.7x to 74.9x by market and a rank correlation of 0.60. The
thin panel ranked a market last that the thick one ranked first. The brief had been built on the thin
one.)*

Record the enumeration in Sources & method: what was considered, not just what was used.

---

## 10. Before quoting any effect: pre-trends, calendar, controls

A difference-in-differences number can be published only if it survives three checks. They apply to
any dated event, and most sharply to a partnership or endorsement, where the subject chose its timing.

1. **Parallel pre-trends.** Plot the subject-to-control ratio for the weeks *before* the event. If it
   is already trending, you have an association, not an effect, and the residual cannot be attributed to
   the event. *(On the actor pilot a partner app's ratio to its controls climbed from 0.5x to 3.8x over
   the two months before launch, so a +218pp residual was demoted from a claim to a caveat.)*
2. **Calendar confounds.** Assume the event was scheduled against something. Search the window for
   sport, holidays, awards, elections and launches before reading any lift. *(That campaign launched the
   day before a month-long international sports tournament, and the download plateau matched the
   tournament almost exactly.)*
3. **Control coherence.** Check that the controls agree with each other before trusting them as a
   baseline. *(Two direct competitors moved +141% and −9% over the same window, which swung the residual
   by 150pp depending on which was picked. The residual was not quoted.)*

**What survives when the checks fail** is often the persistence test rather than the peak: did the
subject hold its new level after the confound ended while the controls fell back? That is evidence that
something changed, stated without claiming its cause is identified. The honest form is *the lift is
real, its size is not identified, and here is the one comparison that survives.*

---

## 11. Calling something a data break: three tiers

**Before any artifact language, write the null hypothesis down**: what would have to be true for this move
to be real demand, and check it. A move that is merely large, or merely unexplained, is not evidence of a
break. The failure this prevents is a report whose every inconvenient signal has been explained away,
which is unfalsifiable and destroys confidence in the panels it dismissed.

| Tier | Required evidence | Only language allowed | What you may do with the series |
|---|---|---|---|
| **1 · Anomaly** | The move is observed at the finest grain available. Nothing more. | "unexplained", "anomalous" | **Nothing.** Report it and keep using the series, flagged. |
| **2 · Suspected artifact** | (a) dated at the finest grain; (b) a **peer or control that did not move**; (c) a **named alternative explanation not yet ruled out** | "suspected", "consistent with", "may be"; never "confirmed" | Flag prominently. Do not discard. Do not build a headline on the artifact reading. |
| **3 · Confirmed artifact** | Tier 2 **plus one external anchor**: a contradiction with audited figures, reproduction on an independent panel, or a **named mechanism** (a missing constituent, a dropped domain, a documented provider change) | "confirmed", "artifact" | May discard the affected read, and must say what replaces it. |

**"Something changed upstream" is not a mechanism.** A mechanism names the thing. Until you can name it,
you are at Tier 2 at best.

Three procedural guards: **render the tier** beside every break claim; **count your own calls** and state
the count in the method section (more than one or two means you are over-calling); **withdraw explicitly**
in the place the claim was made when later evidence rehabilitates a series. Report the negative rungs of
any diagnostic too (a roll-up that reconciled, a control that did not move): they are evidence the move
is real.
