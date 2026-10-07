---
name: ca-cross-signal
description: "Use this skill when someone asks whether other data backs up what card spend shows for a company: whether foot traffic, web and app use, advertising or hiring confirm a trend, and where they disagree. It reads each dataset on the company and a peer and reports every disagreement instead of smoothing it over. For a full report or preview, use this package's report skills."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Cross-signal: do the other datasets agree?

Invoke **`ca-core`** first. The subject is a company or brand, so the setup is
**`references/setup-brand.md`**. The method is **`references/instruments/cross-signal.md`**: read it before
the first pull.

**This is the part nobody else can produce.** A single company read across card, foot traffic,
clickstream, app, advertising and hiring, on one basis, against a named peer, with every disagreement
surfaced rather than smoothed.

## Before anything

The subject's card read exists (from the entry skill, `ca-benchmark` or the quarter module), with the
window and basis recorded. Every modality here uses the **same window and the same peer**.

## Run order

1. **Survey what resolves** for the subject and the peer on every modality: foot traffic, clickstream
   (consistent user first), app, advertising, hiring. A modality that is frozen, thin or broken is a
   finding for the method tab, stated as scope, never a plumbing note.
2. **For each modality that resolves, pull the activity and its subject count** for the subject and the
   peer, and divide. Foot traffic always with store count.
3. **Break tests** (`gating.md` §7) on each series, including the constant-subject basis where the
   modality offers one. Any break claim carries its tier (`gating.md` §11).
4. **Map each modality to the business model** and name the reported line, if any, it may be scored
   against. Where a reported history exists, score it and publish the score.
5. **Line the modalities up against card** on direction over the window: agree, disagree, or not
   distinguishable from noise (`cross-signal.md`, last section).
6. **Advertising and hiring** are upstream: their job is to supply a candidate mechanism for a move seen
   elsewhere (a peer's advertising push, a hiring freeze), not to stand alone.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The agreement table**: one row per modality, subject and peer, direction versus card, and the
   verdict. Disagreements highlighted, not buried.
2. **Whichever disagreement mattered**, as its own chart, with the reading the evidence favors and what
   would resolve it.
3. *(where it supplies a mechanism)* **Advertising share of voice** for the subject and peers over time.

## What this module will not say

That raw visits are demand. That a modality is useless without scoring it. That a disagreement is noise
because it is inconvenient. That a break is confirmed on tests that can only suspect one.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
