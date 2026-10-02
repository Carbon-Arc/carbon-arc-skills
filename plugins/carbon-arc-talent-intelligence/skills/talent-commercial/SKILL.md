---
name: talent-commercial
description: "Use this skill when someone wants to know which brand partnerships a musician can actually win: the brands their audience favors more than their peers' audiences do, rather than the list every artist in their lane shares, even if they only ask which brands fit them or what their commercial value is. For an actor, it measures existing partner brands instead. To measure whether one dated partnership moved a brand, use ca-events. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Musician differential validated on two pilots. Actor route runs through ca-events on the partner brand, validated on one pilot."
---

# Commercial value: which partnerships can I actually win?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-music.md`**.

**Usually the headline of a musician brief.** Needs the peer band; run `talent-peer-set` first.

## The one rule that governs this module

**The raw affinity list is a trap and is never the deliverable.** An artist's top raw brands are the
category's table stakes, the ones every artist in the lane shares. Compute **the differential against
the band** and lead with it: which brands are distinctively this artist's. Print `n` per brand, because
band coverage varies brand by brand.

Brand affinity is **social-follower overlap, not spend**. Badge it that way, and never phrase an affinity
score as money.

## Run order: musician

1. **Brand affinity (140)** for the subject, with `representation` set. Without it the call silently
   collapses to one mean across all brands. Ask for one row per affiliated brand.
2. **Take the subject's top ~20 brands**, then **re-pull those same brands for the band**.
3. **Compute each brand's gap to the band mean**, with `n` beside it.
4. **Cross-check existing partnerships** (retrieved in Phase 1a): a live partnership should show as an
   edge; its absence is informative. A brand already taken is context, not a recommendation.
5. **Look for the audience tab's agreement**: an edge that the audience mix explains is the strongest
   finding in the brief.

## Actor, or any talent with a dated partnership

There is no audience brand-affinity instrument on an actor. **Measure the partner brand instead**: hand
each dated partnership to `ca-events` as a company event on the brand (it resolves as company, service
and often app; the app is usually the most measurable). `ca-events` and `gating.md` §10 carry the three
checks (parallel pre-trends, calendar confounds, control coherence) that decide whether a lift can be
quoted. Partnership dates and reported deal values are ◆ retrieved, usually from trade press, and deal
values are unverified.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Differential affinity**: brands ranked by the gap to the band, `n` on each bar.
2. **Raw versus differential, side by side** for the top brands, so the reader sees why the raw list
   misleads.
3. *(where a partnership was measured)* the `ca-events` chart for it.

## What this module will not say

What a partnership is worth or what fee to ask. That an affinity score is spend. That a lift was caused
by the talent when the checks in `gating.md` §10 did not pass.

## If this module is run on its own

Run `talent-peer-set` first.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
