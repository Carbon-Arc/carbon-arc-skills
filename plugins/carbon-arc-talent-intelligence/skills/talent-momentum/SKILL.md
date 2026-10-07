---
name: talent-momentum
description: "Use this skill when someone wants to know whether a musician's or actor's audience is growing or fading, and whether anyone in their lane is pulling away: streams and followers on at least two platforms, read against their peers rather than on their own, and whether a release moved the needle. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Momentum: is my audience growing, and is anyone pulling away?

Invoke **`ca-core`** first; subject setup in **`setup-talent.md`**, call shapes in
**`references/instruments/talent-music.md`** or **`talent-screen.md`**.

**Needs the peer band.** If `talent-peer-set` has not run, run it first. Open the tab by referring back
to the band.

## The rules that govern this module

- **Never a momentum claim on one platform.** Two platforms, a constant window, and a level-break check
  first. Where two platforms disagree for an artist, that disagreement is usually the finding: a surge on
  one service with no echo on another reads as playlist or algorithmic placement, not broad audience
  growth. Report it; never pick the flattering one.
- **Read against the band median, not against zero.** The median is the category baseline; the band's
  own spread is the context for the subject's growth.
- **The release-versus-momentum trap.** A step right after a release is expected and is not evidence of
  growth. The finding is whether the post-release plateau sits above the prior baseline. Compare like
  points in the release cycle, never a release quarter against a quiet one.

## Run order

1. **Level-break check**: plot every band member's streaming series on one chart per platform. A
   simultaneous step across everyone is panel expansion; cut the window to after it.
2. **Streaming plays (292)** for the subject and band, quarterly, `us`, one call per platform, on the
   constant window. Label the axis as average weekly plays.
3. **Social following (256)** for the same set, same window, as a second reach measure.
4. **Actor**: streaming views (310) on the person for the arc, and on the titles for composition
   (`talent-the-work` carries the per-title reading).
5. **Release and tour markers**: web-verified, confirmed with the user before charting, and only where
   the grain can show them.
6. **Defect sweep** (`ca-core` gate 9) on any sharp move before writing a word about it.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Subject against the band, indexed to a common start**, one line per platform, with the band median
   and its range shaded.
2. **Growth over the window, subject and each band member**, both platforms side by side, so any
   one-platform surge is visible.
3. *(optional)* **Social following** on the same basis.

## What this module will not say

That plays are listeners. That a one-platform rise is audience growth. That a release-quarter spike is
momentum. That reach is income.

## If this module is run on its own

Run `talent-peer-set` first; it carries Phase 1a for talent. Write back any level break you find, so the
next module uses the same window.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
