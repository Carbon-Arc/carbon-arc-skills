# Instruments: cross-signal reads

How to read the modalities other than card spend (foot traffic, clickstream, app, advertising, hiring)
and how to make them agree or disagree honestly. Read before pulling any of them. Verified across the
earnings-preview pilots (six consumer names across restaurants, mass and off-price retail, e-commerce and
home furnishings, Aug 2026). Re-survey live; these are priors.

## The rules that govern every modality

- **Run each modality on the subject and at least one peer.** Agreement on the peer plus divergence on
  the subject localizes a fault to the subject's series in one step, which is cheaper and more decisive
  than any single-entity diagnostic.
- **A modality that disagrees is a finding, not noise to drop.** Surface it, say which reading the weight
  of evidence favors, and name what would resolve it. *(On one pilot, foot traffic contradicting card on
  the subject while agreeing on a peer was the single most informative result in the run.)*
- **When a metric counts activity, also pull its count of subjects, and divide.** Visits ÷ tracked
  stores, sessions ÷ users, spend ÷ cardholders. The ratio is coverage-invariant for the same reason
  average ticket is, and it separates panel size from demand. *(On one pilot it turned an apparent −53%
  web collapse into flat engagement per user, and exposed a stale store roster posing as a 7pp
  foot-traffic shortfall.)*
- **Map the modality to the business model before judging it.** Write down what it measures for this
  business and which reported line it can legitimately be scored against. *(A restaurant's website is
  menu browsing and store locations; ordering happens in the app. Scored against comps, web traffic got
  one of three right; read as consideration and paired with advertising, it was the cleanest non-card
  evidence in the brief.)* If there is no such line, it is a context read: say so and keep it out of any
  estimate rather than out of the report.
- **Where a reported history exists, score the modality and publish the score** rather than asserting
  its usefulness. A modality that inverts against reported figures cannot be trusted for rank either.
  *(Normalized foot traffic once correlated with reported comps at r = −0.39 and agreed on sign in 1 of 8
  quarters while card managed +0.87 and 5 of 8; that shipped as a finding.)*
- **Pull what the analysis needs, and pull corroborators early**, at the pull-manifest gate alongside the
  core series. A second modality can rescue a read whose primary series turns out to be broken, which is
  exactly when you most want it.

## Foot traffic: never read raw visits

Always pull **store count** for the same entities and window as visits, and divide. Raw visit growth is
often almost entirely the panel's own store-roster growth. *(On one pilot visits read +6.5% while tracked
stores grew +6.3%: visits per store were +0.16%, flat, and the raw series had inverted the whole peer
ranking.)*

- **Cross-check panel store count against the company's disclosed unit count.** A gap that widens over
  time is a stale roster; against audited figures that is a confirmed break with a named mechanism.
- **Test whether a roster freeze is entity-specific or panel-wide** before scoping the claim.
- **Pull the denominator for the peers too**, or you cannot test whether the normalized metric ranks
  correctly.
- Read normalized foot traffic for **rank and direction only**. It is heavily damped (about 5.6x
  compression on one pilot), so it orders brands and measures nothing. Never invert the damping into an
  implied comp.

## Clickstream

- Web share of voice: insight 379, state or DMA. **Sum the desktop and mobile rows** per brand and period.
  It is engagement, not orders.
- **The consistent-user topic is the default primary read and the core panel is the cross-check.** The
  divergence between them is the diagnostic (`gating.md` §7, test 5).

## Panel expansion: check before plotting any level or index

A sustained ramp in panel size inflates every entity's level at once. It does not distort a YoY inside
the post-expansion period, which is why it survives the break tests, but it makes a long level or
indexed series actively misleading. *(One clickstream core panel scaled 2.5–3.7x across four quarters on
three brands at once.)* Detect it by checking whether every entity rises together over several quarters.
Remedy, first clean one wins: the constant-subject basis; then share of a validated peer set (say so
beside the chart: a share sums to 100, so one entity's decline is mechanically another's gain); then level
or index, only after confirming no expansion.

## Is the difference bigger than the noise?

A cross-entity gap must clear its own sampling variation before it becomes a claim. With weekly subject
÷ peer ratios for two windows, compare the difference of means against the combined standard error.
*(On one pilot an apparent 2.3pp underperformance was 0.9 standard errors and did not survive; the shared
finding across both entities did.)* A gap that fails is stated as "not distinguishable at this
resolution", which is a finding.

## Grain and freshness notes

| Pull | Grain | The catch |
|---|---|---|
| Advertising | US / state / DMA | No CBSA; brand level is counts and impressions only |
| Cohort by generation | by-generation topic | Live; within-cohort YoY is self-debiasing, shares need the debias (`card-cohorts.md`) |
| Cohort by income | detailed panel | Frozen mid-2025: historical only, labeled, never in a present-tense claim |
| Geography | state / CBSA | Always with a normalizer and a category control |
| Any series | — | Read the observed max date off the returned rows, never off metadata flags |
| Any call | — | Keep entities × periods under about 100 rows; above that the tool returns a summary instead of rows, and those summaries have been wrong. Slice and compute yourself |
