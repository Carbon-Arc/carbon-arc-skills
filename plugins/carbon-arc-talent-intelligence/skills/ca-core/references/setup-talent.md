# Setup: a musician or actor

Read during `ca-core` §2 when the subject is a person in entertainment. It adds to the shared checklist;
it does not replace it. Instrument detail lives in `references/instruments/talent-music.md` (musicians)
and `references/instruments/talent-screen.md` (actors and titles); read the one you need before the first
pull.

## What this subject adds to the setup

- **Talent type**: musician or actor, decided by what is attached, not by what the person is famous for.
- **Representation**: which entity node carries the fuller stack (below).
- **The titles**: for an actor always, for a musician where albums matter, the individual works resolved
  as their own entities.
- **The peer band**: derived, screened and disclosed (below). Every later module reads against it.
- **A thickness verdict per candidate tab**, from the test below, before any tab is promised.

## Phase 1a for talent

Web-searched and cited, never from training data, including for household names:

- **career stage and years active**, which decides who is a valid peer
- **release history** (albums, singles, features) or **filmography**, with dates
- **touring pattern and typical venue scale**, which predicts whether the ticket panels will be thick
  enough to use at all
- **existing brand partnerships**, which both validate an affinity read and rule brands out as taken

Candidate events at low resolution across five families adapted for talent: **release**, **live**,
**commercial** (deals, sync placements), **industry or platform** (playlist moves, label changes) and
**cultural** (viral moments, awards). An unexplained single-platform surge usually resolves in the
industry family: a surge on one streaming service with no echo on another is normally an editorial or
algorithmic placement.

## Branch on talent type: musicians and actors are different assets

| | Musician (`artist`) | Actor (`actor`) |
|---|---|---|
| Reach | streaming plays (292), social following (256) | streaming views (310) |
| Revenue-proximate | resale tickets only (see the live-music limit) | box office (263 / 264 / 26 / 25) |
| Audience | follower demographics (141), a snapshot | title-level cohort index (72855 / 72856) |
| Peer instrument | playlist co-occurrence (142 / 143 / 144) | **none on the person**; cross-viewing (192715 / 192716) on their titles |
| Commercial | audience brand affinity (140) | **none on the person**; measure partner brands instead (`ca-events`) |

**The split is a tendency, not a rule.** A musician with an acting career can carry actor instruments on
the `artist` record (on the arena-scale musician pilot, she did). Survey the attached stack and let it
decide.

**A musician resolves twice**, as `artist` and as `entertainer`. **Use `artist`**: it is a strict
superset. Watch near-name collisions; two spellings of one stage name can both resolve.

**An actor brief is thinner than a musician brief**: typically two strong tabs, one stale snapshot and
one constructed comparison. Set that expectation at the scope check, not at delivery.

## Read the talent through their work, not only through the person

A person-level series is an aggregate. It hides composition, it cannot be verified, and it silently
inherits every defect in every underlying title. **Resolve the films or albums as `title` entities** and
pull those. Title entities carry more than the person: per-title box office, per-title streaming with a
DMA cut, an indexed cohort audience, and a cross-viewing affinity instrument the person lacks. Every
defect on the actor pilot was caught by comparing titles with each other or with published figures.

Use the person-level series for shape (the career arc, the peer-band comparison) and titles for
everything else. Module: `talent-the-work`.

## The peer band: the yardstick

Full method in the module `talent-peer-set`, which always runs before any module that reads against the band.
The rules that every module relies on:

- **Musician**: pull shared playlist count (142) and playlist affinity (144) together, never affinity
  alone. **Take the top ~200 artists by shared playlists, then rank those by affinity.** Raw affinity is
  junk: thin overlap inflates it, and on both musician pilots the raw top twenty was dominated by acts
  from unrelated scenes and countries. A fixed percentile gate is not a rule either; it had to be retuned
  from p90 to p99.5 between the two pilots, while the top-200 rule held at both ends of the scale.
- **Two sets fall out, and conflating them is a defect**: affinity peers (who shares this specific
  audience; the comp set) and scale peers (the mainstream ceiling that appears on everything). Scale
  peers are a stated ceiling, never a momentum comp.
- **Screen the band** to 5–7 career-stage-matched artists. Remove deceased artists, acts on hiatus or
  disbanded, the wrong career stage, and producer or label entities (they resolve as artists but their
  series reflect a credit footprint). **Disclose every exclusion and its reason.**
- **Actor**: no derived peer instrument exists on the person, so the band is **analyst-constructed** on
  genre, career stage, budget tier and cadence, and badged ◆ as materially weaker. **Exclude anyone who
  shares a title with the subject.** A co-star's viewership moves with the subject's by construction.
  *(On the actor pilot a plausible four-person band contained three co-stars from one franchise film;
  all three spiked and fell together, which read as a panel break until the one non-co-star moved
  differently.)* Where titles exist, cross-viewing on the titles gives a derived comparison; use it.

## The thickness test: run before promising any tab

**Panel availability is not panel sufficiency.** For each candidate tab, pull the volume first and check
it clears a floor. Cutting tabs is the correct outcome, not a failure; four honest tabs beat seven padded
ones.

| Tab | Check first | Floor |
|---|---|---|
| Any ticket tab: **volume** | resale tickets per period | kill it if periods are single or low-double digits *(the mid-tier pilot had about 139 resale tickets across five years; the price series was noise)* |
| Any ticket tab: **continuity** | which periods return rows at all | ticket panels only see touring periods, so an arena act can clear volume with two populated windows in five years; that is a **tour comparison**, never a trend line |
| Peer set | shared playlist count | top ~200 by shared count, then affinity |
| Brand affinity | how many band members have data on each brand | print `n` per brand |
| Momentum | presence on at least two platforms over a common window | never claim momentum on one platform |
| Every tab | the coverage grid (`ca-core` gate 7) | publish the gaps |
| Any tab with a rival asset | the same cut from both (`gating.md` §9) | compare totals and rank order |

The resale panels are **arena and sports weighted**. Club and festival-scale artists are close to
invisible in them.

## The live-music limit: say it in every brief with a live tab

**No reachable dataset measures whether a show sold.** The venue-reported box-office census (the only
source of sell-through, face price and gross) is bulk-only: no MCP insight binds to it, so it is out of
scope. **Every reachable ticket asset is resale**, which sees the aftermarket and never the house. A
brief can say what the resale market paid and where; it cannot say a market was strong or soft in
absolute terms, and resale volume must never stand in for demand. Name the census as a known gap in
Sources & method.

## Panel quirks every talent module inherits

- **Insight 292 is mislabeled**: it returns streaming *plays*, not listeners. Never write "listeners".
  Only `mean` aggregates, so a quarterly figure is average weekly plays; say so on the axis.
- **Streaming history starts in 2024.**
- **A simultaneous step across every artist is panel expansion, not audience.** One platform stepped up
  about 4–6x between 2025Q1 and 2025Q2 for every artist at once; the constant basis for that platform
  starts 2025Q2. Plot the whole band on one chart before trending anything.
- **The two resale panels date differently**: the thick one on the *sale*, the thin one on the *event*.
  Never align them on time without accounting for it.
- **Cohort-type insights (140–144) fail with an opaque configuration error if `date_resolution` is
  passed at all.** Omit it.
