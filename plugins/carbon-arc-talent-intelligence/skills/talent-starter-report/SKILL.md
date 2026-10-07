---
name: talent-starter-report
description: "Use this skill when someone wants a broad read on a musician or actor: how they are doing against their peers, what the data says about them, or a first brief, even if they only name the artist. It builds one brief covering every talent read the data supports for them: peer set, momentum, audience, brand partnerships, resale demand and, for actors, their titles. Use it for 'build a brief' or 'build a report' on an artist. For a single read, such as only the peer set, use the matching skill. Not for a company or brand."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Talent starter report

The orchestrator. Runs each talent module once at one-tab depth and assembles them into a single brief.
Invoke **`ca-core`** first and follow it throughout; the subject setup is
**`ca-core/references/setup-talent.md`** and **the reader is `agency`**: record `reader: agency` and read
**`ca-core/references/readers/agency.md`** (ca-core §1).

**Modules this brief runs:** `talent-peer-set` · `talent-momentum` · `talent-the-work` · `talent-audience` · `talent-commercial` · `talent-live-demand` · `ca-events`. Invoke no other module in this run, even one installed alongside: a module not on this list belongs to a different analysis type, and its method does not fit this brief.

**Tabs:** Summary · one tab per module that found something publishable · Sources & method. Three to
five charts per tab, eight the ceiling. **Four honest tabs beat seven padded ones.**

**The order of work.** This skill resolves, researches and runs Gate 1. It writes **no pull rows itself**:
every row in a Gate 2 pull list comes from a module, written after that module was invoked. *(Observed Sep
2026 on a brand report built the same way: a pull list written from discovery before any module was loaded
produced tabs that rendered, passed the build checks, and were each missing their module's method.)*

---

## Phase 0: resolve, branch, and scope

1. **Resolve the talent.** `search_entities`; expect more than one node. For a musician prefer `artist`
   over `entertainer`. Watch near-name collisions.
2. **Survey live.** `get_insights_from_entity` at `limit=250` on each node.
3. **Branch on what is attached**, not on what the person is famous for: musician, actor, or both.
4. **Enumerate the assets** (`ca-core` gate 6) for the domains the brief will touch: streaming, social,
   secondary ticket, box office, brand affinity.
5. **Record the setup** per `ca-core` §2 and `setup-talent.md`, in the conversation.
6. **Confirm the output format with the reader** (a published brief by default).

## Phase 1a: research, before any pull

Per `setup-talent.md`: career stage, release history or filmography, touring pattern and venue scale,
existing partnerships, and candidate events as names and rough dates. Web-verified with source URLs;
nothing from training data, including for household names.

**Public research is woven in, never appended.** Each retrieved event becomes a short ◆ callout inside
the tab whose number it explains, or a confirmed chart marker, never a separate news tab. Prefer primary
sources (the artist's own channels, label and promoter releases, chart publishers) over aggregator blogs.
Paraphrase; at most one short attributed quote per callout.

## Phase 2: the peer band

Run **Gate 1** once for the whole brief (`carbonarc-mcp`). Then **`talent-peer-set` runs first, always,
as its own pull list**: invoke it, write its Gate 2 rows, pull, and build the band. Every later tab reads
against the band. Confirm the band with
the reader before moving on; they know the lane, and an exclusion they disagree with is cheaper to fix
now.

## Phase 3: the thickness gate

Mark each candidate tab ✅ / ⚠️ / ⛔ and run the thickness test in `setup-talent.md`. Show this as its
own checkpoint: which tabs the data supports, which it does not, and why, in client voice. Only the
survivors are built.

## Phase 4: run the modules

In this order, each contributing **one tab**:

| | Musician | Actor | Tab question (phrase it for the artist in front of you) |
|---|---|---|---|
| 1 | `talent-peer-set` | `talent-peer-set` | Who am I actually competing with for the same audience? |
| 2 | `talent-momentum` | `talent-momentum` | Is my audience growing, and is anyone pulling away? |
| 3 | | `talent-the-work` | Which of my titles carry me, and which hold? |
| 4 | `talent-audience` | `talent-audience` | Who is my audience? |
| 5 | `talent-commercial` | `talent-commercial` (routes to `ca-events`) | Which partnerships can I actually win? |
| 6 | `talent-live-demand` | | What will the resale market pay, and where? |
| 7 | `ca-events` (optional) | `ca-events` (optional) | What did *[the partnership or release]* actually do? |

For a talent with both careers, run the musician column and add `talent-the-work`.

### The loop: each module writes its own rows

For the survivors of the thickness gate, in the order above, assemble one Gate 2 pull list:

1. **Invoke the module** and read every file its opening lines and "Before anything" name, including the
   instruments file.
2. **Write its rows** from its run order, filling **Method from** with the step or file section each row
   comes from.
3. Next module.

Present the list once at Gate 2, pull, and clear Gates 3 and 4 once. When the first pull returns, read `carbonarc-mcp`'s `references/response-handling.md` before using any series. A module that needs another's findings
(`ca-events` on a partnership `talent-commercial` chose) writes its rows after them, as a short second
list. **At build, before each tab, re-read that module's "The evidence" section**; a tab built from memory
drops its chart forms and floors, and the drop looks exactly like a finished tab.

**A module that finds nothing publishable is cut**, and the tab count drops. Failed pulls are reported in
conversation and never appear in the brief.

### Before each tab's copy

Run the **defect sweep** (`ca-core` gate 9) on every sharp move, and the **external check** (gate 8)
before quoting any level. Check each claim against the one public figure it is exposed to (a published
gross, a chart position, a tour announcement) and drop or reframe it if they conflict. This is
`carbonarc-mcp` Gate 4, findings before narrative.

## Phase 5: Sources & method (last tab)

- **What was asked and what could be answered**, each request marked with where it lives, including
  every tab the thickness gate cut, stated as scope rather than as a failure.
- **Every asset enumerated**, used and rejected, including the out-of-reach ones (the venue box-office
  census, and all income).
- **The peer band's construction and every exclusion.**
- **The headline caveat, once, in full**: the data sees audience, not income. It lives here and **not**
  in the Summary.

## Phase 6: the Summary (first tab, written last)

A written note, not a rollup of links. **Target about 450 words, ceiling about 600.** One paragraph per
tab, three sentences and 50 words at most, **each opening with its number** so the eye lands on the
figure before the reasoning, followed by the one or two charts that prove it. The header is a label
(an eyebrow naming the brief, then *Summary*), not a thesis. The Summary closes on what the team can act
on, not on what the data cannot do; per-figure caveats stay beside their figures.

**It duplicates every tab's claim.** After any edit to a tab, update the Summary too, and grep the
retired wording before calling the edit done.

## Phase 7: build and verify

Per `ca-core` §8 and `references/build-notes.md`. Then, without exception:

```bash
CA=$(find ~/.claude/plugins -type d -path '*carbon-arc-talent-intelligence*/skills/ca-core/scripts' ! -path '*/.trash/*' 2>/dev/null | head -1)
python3 "$CA/verify_report.py" <brief>.html
python3 "$CA/verify_build.py"  <brief>.html
```

Both must pass. Walk every tab in a browser with every section visible: no empty mounts, no label
collisions, no chart overflowing its card, fonts actually loaded.

**Cross-references survive reordering.** The method tab names where each finding lives; after any change
to tab order, re-check every one.

## Tabs ask, headlines answer

Every tab label is a question the talent team would ask. Every headline is a claim that answers it. Labels
live in three places (sidebar, `data-screen-label`, the Summary cross-link) and all three must match.

Naming: deliverable `<artist>-brief.html`, page title `<Artist> Audience Brief`.
