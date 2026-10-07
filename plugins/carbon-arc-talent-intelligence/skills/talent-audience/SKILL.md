---
name: talent-audience
description: "Use this skill when someone wants to know who a musician's or actor's audience is: the age, gender and ethnicity mix of a musician's followers, or which generations an actor's titles pull, set beside their peers, even if they only ask how old the fans are. Not for a company's or brand's customers. For which brands that audience favors, use talent-commercial; for a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Audience: who is my audience?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-music.md`** or **`talent-screen.md`**.

**This is not the brand audience module.** Same question, different instruments: a follower snapshot or
a title-level index, not debiased card cohorts. the card cohort debias (the brand setup's cohort gate) cannot run here because there is no
national denominator; say what the mix is instead.

## The caveats that travel with every chart

- **Musician**: follower demographics (141) are **worldwide only, a single snapshot, and follower-based,
  not listener-based**. All three go on the tab, beside the chart, not only on the method tab. No trend,
  no US cut.
- **Actor**: the title-level cohort index (72856 / 72855) is an **index against the general
  population**, US only, monthly. Test every representation for coverage across titles before using it;
  on the pilot only Generation survived. The person-level resonance snapshot stops in August 2024 and is
  never trended.

## Run order

1. **Musician**: follower demographics (141), `ww`, for the subject and every band member with data.
   Print `n` of band members with data.
2. **Actor**: cohort index on each title, one representation at a time, starting with Generation. Drop
   thin cohorts (those born before 1928) before charting.
3. **Look for the cross-check with the commercial tab.** When an unusual skew here explains an affinity
   edge there, say so: two independent tabs agreeing is the strongest thing in a brief.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The subject's mix beside the band median**, so the skew is visible as a difference, not a level.
2. *(actor)* **Generation index by title**, so the reader sees which work pulls which audience.

## What this module will not say

That followers are listeners. That a worldwide mix is the US audience. That a snapshot shows a trend.

## If this module is run on its own

Run `talent-peer-set` first; the mix is read against the band.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
