# Card core (626 / 627) — the benchmark recipe

The spine: **spend = transactions x average ticket**, where ticket is `626 / 627` and nothing else.
Both terms are measured directly and the identity closes exactly.

**The call:** `location_resolution: "us"` · `aggregate: "sum"` · date grain to suit the chart (`day`,
`week`, `month`, `quarter` and `fiscalquarter` all execute). Both run on a `service` node, and 626 also
runs on a `category` node, which is what makes the category baseline in §5 possible. Do not pull 629 for
ticket: derive it, so the identity closes.

## 1. Plot NAMED COMPANIES, not a constructed aggregate

**Lead every benchmark chart with individual brand lines.** A reader knows their competitors by name. A
"volume-weighted category basket" is an abstraction they must take on trust, and it hides its own members:
on the pilot the basket was down 0.5% while two of its four members were *up*, because two others were
collapsing inside it.

An aggregate is a **supporting** device with two legitimate uses, both secondary:
- a category baseline in a caption ("fast casual ran +3.7% / 0.0% / -2.3%"), to say how much of a move
  is the market;
- a demoted chart showing *the benchmark the client is usually given, and why it flatters*.

When you do aggregate, **volume-weight it** — sum the members' spend, then take one YoY on the total, so
thin members enter at their true weight. Never a median of rates. And **decompose any aggregate where one
member exceeds ~50%**: on the pilot the closest cuisine peer was 50.7% of the basket, so the basket was mostly one brand wearing
a category's name.

## 2. Pick the peer set the reader already has in mind

The categorical set and the perceived set are not the same, and the perceived one is where the reader
lives. Cross-shop settles it: on the pilot, the fast-growing rival ranked **4th** in the subject's shared-customer list and
the closest cuisine peer **60th of 1,572** — the data agreed with the intuition that the cuisine peers were the wrong frame.

Rule: **declared competitors are always plotted** (they are what the client came for), the surfaced set
from M1 is added, and a declared rival that shares few customers is a *finding*, not a deletion.

## 3. Recency: compare the most recent complete period, not the last full year

**A calendar-year chart is up to twenty months stale and the conclusion may already have reversed.** On
the pilot, "every Mexican chain fell in 2025" was true of 2025 and false by H1 2026, when two of the four
had turned positive and the subject had slipped to 9th of 17.

- Default to **H1 vs H1** (or the latest complete half / trailing twelve months) for the ranked cut.
- Carry a **monthly YoY series** alongside it. The ranked cut says where everyone sits; only the series
  says whether the gap is widening, stable or closing, and it is the chart that dates fastest.
- If you show a full prior year, **re-check that its conclusion still holds** on current data before
  writing the headline.

## 4. Decompose the OUTPERFORMER, not only the subject

When one brand breaks away, the reader's next question is about **them**: are they winning guests or
raising prices? Run `spend = transactions x ticket` on the outperformer and put it beside the subject's.

The pilot's pair is the model. The fast-growing rival: +12.2% spend = **+8.8% transactions** x +3.1% ticket.
The subject: +0.9% spend = **-1.1% transactions** x +2.1% ticket. The ticket lines are nearly identical, so the entire
gap between them is guests — which changes the implied action, because a price response answers a
question the rival never asked.

Keep each brand's color from the rest of the brief for its spend line, and encode transactions and
ticket identically in both cards so the pair reads against itself.

## 5. Before any "recovery" ships

- **Two-year stack.** A positive YoY lapping a weak base is not growth. The pilot's +2.79% quarter was
  -0.61% against two years earlier.
- **The months after the window.** A turn that has already reversed is not a turn.
- **The category.** If the subject sits within half a point of its category, the honest headline is *it is
  the category*, not a brand story. On the pilot the subject ran +0.9% against its category at +1.3%, and
  the closest cuisine peer was within a hundredth of a point. Two brands moving with the market is not news about either.

## Traps

- **627 returns a `TRANSACTION METHOD` split that 626 does not** — at `us` *and* `state` resolution, on
  multi-entity pulls. Sum before dividing or ticket comes out 2x. A single-entity monthly pull does not
  split, so the shape varies by call.
- **`transaction_method` itself is unusable.** On the pilot it read digital share falling to 32.0% against
  a disclosed 38.3% and **rising** — wrong level and wrong sign.
- **Volume gate on every ranked cut**, set on base size with the noise proxy as corroboration. The proxy
  alone cannot tell *thin* from *accelerating*: a brand growing 16% a year has a high mean-absolute-change
  in YoY by construction.

---

## Event charts: lead with the plain metric, keep the control as the second view

**Lead an event tab with a plain year-over-year of the simple metric** — transactions if the question is
demand — not with a peer-indexed ratio. The ratio is the better control; the plain series is the one a
reader digests, and it states the hole in the brand's own terms. Show both and say which is which,
because **they do not agree and both are right**.

On the pilot: a quick-service rival's transactions ran **+1.5%** year on year going into the outbreak, **−32.9%** at
the trough, and **−16.5%** across the last four measurable weeks. The peer-indexed view of the same event
read **−7.4%** at the end, i.e. "93% recovered". The gap is the category: dividing by peers also divides
out the category's own decline. *Versus a year ago* and *versus your peers* are different questions, and a tab
carrying both must label them or it looks like an error.

**Decompose the event by geography on the same plain metric.** Implicated states fell to −38.3% at the
trough against −24.4% for control states, so two thirds of the damage landed where there was nothing to
find — a far more legible statement than a gap between two indexed lines.

The regions to split on are wherever exposure is heaviest, which a non-regional event can still have
(host cities of a tournament, a campaign's target markets). Measure the split against its own
pre-event gap: on the athletic apparel pilot the exposed states already ran well ahead of the rest of
the country before the event, so the raw ratio between the two lines overstated the lift.
Where no region is more exposed than another, leave the split out.

**Check the holiday calendar before reading any weekly year-over-year.** Labor Day fell in the week
ending 5 Sep in 2025 and 11 Sep in 2026, which put a holiday week against a non-holiday week twice and
swung the series 12pp in a fortnight. Cut the series where the calendar stops aligning and say so. The
same applies to Easter, Thanksgiving and 4 July.
