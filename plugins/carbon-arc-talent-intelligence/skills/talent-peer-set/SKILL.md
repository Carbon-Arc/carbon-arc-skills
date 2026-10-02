---
name: talent-peer-set
description: "Use this skill when someone wants to know who a musician or actor really competes with for the same audience: their real peers or comps, who shares their fans, and who they should be benchmarked against, even if they only ask who is 'like' them. It builds the peer group from shared playlists, or for an actor from who watches the same titles, and shows it before anything is measured against it. Other talent reads run after it. For a full brief, use this package's brief."
metadata:
  author: Carbon Arc
  version: '0.2.0'
  status: "DRAFT. Musician method validated on a mid-tier and an arena-scale pilot. Actor band is analyst-constructed and validated on one pilot."
---

# Peer set: who am I actually competing with for the same audience?

Invoke **`ca-core`** first; the subject setup is **`ca-core/references/setup-talent.md`** and the call
shapes are in **`references/instruments/talent-music.md`** (musician) or **`talent-screen.md`** (actor).

**This module always runs before any other talent module.** The band is the only constructed instrument
in the brief and every later figure is read against it (`ca-core` gate 11), so its tab comes first and
closes by naming the band it hands forward.

## Why it matters

An asserted comp set is an opinion; a derived one is evidence. The data names the peers, which is the
credibility of every tab after this one.

## Before anything

Entity resolved on the fuller representation (`artist` over `entertainer`), talent type confirmed from
the attached stack, live re-survey done, career stage and years active retrieved in Phase 1a.

## Run order: musician

1. **Shared playlist count (142) and playlist affinity (144)** for the subject, `us`, no date resolution.
   Both return the full artist universe to a file; parse it, never read it into context.
2. **Take the top ~200 by shared playlists, then rank those by affinity.** Never raw affinity, never a
   fixed percentile. Drop to ~100 for a very large artist, raise it for a niche one. Report N and the
   shared-count floor it implies.
3. **Split the result**: affinity peers (high affinity after the gate; the comp set) and scale peers
   (highest shared count, depressed affinity; the ceiling).
4. **Screen to 5–7 career-stage-matched affinity peers**, plus optionally one scale peer as a stated
   ceiling. Remove deceased artists, acts on hiatus or disbanded, the wrong career stage, and producer or
   label entities. Retrieve each status from the web; never assume it.
5. **Fill the coverage grid** (`ca-core` gate 7): every band member on every instrument later modules
   will use. A member with no streaming rows cannot be a momentum comp.

## Run order: actor

1. **Build the filmography** from a web search, then resolve each title.
2. **Where the titles carry cross-viewing (192715 / 192716)**, pull it with the mandatory `country`
   filter and use it to see which titles, and through them which actors, share this audience. Gate on
   shared views first.
3. **Construct the band** on genre, career stage, budget tier and release cadence, badged ◆
   analyst-constructed.
4. **Exclude anyone who shares a title with the subject**, including ensemble and franchise casts. Prefer
   comps from different franchises entirely.
5. **Sanity check**: if the whole band still moves as one, ask what they share before concluding the
   panel broke.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **Affinity peers against shared playlists**: the neighborhood, with the gate drawn in, so the reader
   sees why raw affinity was not used.
2. **The band table**: each member, why they are in, and a separate list of who was screened out and why.
3. *(optional)* **Scale peers** as a ceiling reference, visually distinct from the band.

## What this module will not say

That a scale peer is a comp. That a constructed actor band is as strong as a derived musician band. That
an excluded artist was excluded for any reason other than the stated one.

## If this module is run on its own

Run Phase 1a for talent first (`setup-talent.md`), and only that. Write the band and the coverage grid
back into the conversation so later modules read them rather than rebuilding them.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
