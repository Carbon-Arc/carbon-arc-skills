---
name: ca-events
description: "Use this skill when someone asks what a dated event actually did to demand: a price change, launch, promotion, loyalty relaunch or partnership; a competitor's incident; a celebrity endorsement or talent partnership, measured on the partner brand; a calendar effect; or a shift in the economy. It measures the effect against a control group, says whether it was positive, negative or absent, and says plainly when it is too small to detect. Use it even when they only ask whether something worked."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Events — what did this event actually do?

Invoke **`ca-core`** first. Method in **`card-core.md`** (event chart form) and **`gating.md`** §2, §4 and §10.
The subject is a brand, so the setup is **`references/setup-brand.md`**, even inside a talent brief.

## Dates come from research, never from the model

**Every event date is web-verified and carries its source URL**, including for famous brands and famous
incidents. Show the date to the reader and ask them to confirm before it becomes a chart marker.

The **Carbon Arc event ontology is discoverable but was not executable** on the pilot: the event resolved
and `get_insights_from_event` returned a listing insight, but every framework pull against it failed. Use
the ontology to know an event family exists; get the dates from Phase 1a.

## The five families — this is the framework, do not invent a sixth

**Macro · Corporate · Calendar · Industry · Company.** Anything that happens *to* a competitor rather
than being done *by* the subject — a recall, a safety incident, a regulatory action, a closure — is an
**industry** event. The framework has exactly five families; anything else belongs inside one of them.

Family five — LTOs, price increases, value platforms, loyalty relaunches — is where Carbon Arc has most
edge. But see the floor.

## Open with the detection floor, not with a caveat

Compute what an *ordinary* week does before claiming what the event did (`gating.md` §2). Publish it as
the module's **first chart**. It tells the reader which of their own initiatives are measurable here
before they commission anything, and it applies equally whether the expected effect is a gain or a loss.

On the pilot the floor was about **±3.5pp**: an outbreak cleared it tenfold, a single-protein menu launch
did not clear it at all (**DiD +1.40pp, SE 1.79pp, band −2.11 to +4.89**). *No detectable effect* is a
finding, and it is not *a small effect*.

## The effect may be a gain, a loss, or nothing

Do not write the tab before measuring it. A value platform or a launch is expected to lift; a recall or a
price increase is expected to depress; a macro shift may do either. **The question is "what did it do",
and "nothing detectable" is a legitimate answer** — on the pilot a menu launch produced exactly that.

Only where the measured effect is a shock do "trough" and "recovery" apply. For a lift, the equivalent
pair is **peak and decay**: how big, and how long it held.

## A partnership or endorsement

The one commercial read that works for **any** talent type, because it measures the brand rather than
the person. The fee is invisible; the effect on the brand is not.

1. **Retrieve the partnership and its dates** from the web, cited. Reported deal values are ◆ and almost
   always unverified.
2. **Resolve the brand on every representation.** A brand often resolves as company, service and app,
   and the app is usually the most measurable.
3. **Pick the instrument by brand type**: an app → daily app downloads (775, weekly, `us`, `sum`); a brand
   its customers pay directly by card → card spend (the demand-route gate applies); a DTC brand → web visits.
   State the platform coverage (an app panel may be one mobile platform only).
4. **Controls in the same category that did not run a campaign**, then the three checks in `gating.md`
   §10 (parallel pre-trends, calendar confounds, control coherence) **before** quoting any number.
5. **When the checks fail**, lead with the persistence test instead of the peak, and say plainly that the
   lift is real but its size is not identified. Never imply the talent caused a lift that is not
   identified; attribution is the reader's call.

## Run order

1. **The weekly measure** for the subject and a control group (spend and transactions for a
   card-measured brand, downloads or visits otherwise), with unaffected peers, and where the event is
   geographic, unaffected regions on the same measure.
   **Before pulling, ask where the effect should be strongest if it is real** — host cities, a
   campaign's target markets, a rival's outage area, the markets a price change reached first. An event
   need not be regional to have such places. Where they exist and the panel resolves them, pull them
   against the rest of the country on the same measure. Where none exist, skip it without comment.
2. **Drop the first and last week of every weekly pull.** They are partial.
3. **Check the holiday calendar.** Labor Day fell in different weeks across two years on the pilot and
   swung the series 12pp in a fortnight. Easter, Thanksgiving and 4 July do the same. Cut the series
   where the calendar stops aligning and say so.
4. **A pre-period baseline is not a seasonal control.** Use a control group; only the *difference* is
   interpretable.

## The evidence

The charts below are the proven default for this tab. Replace or add to them when another form
shows the finding better (`carbon-arc-report-v2`, "Beyond the default kit"). What each item says
the chart must show or must not claim still holds.

1. **The detection floor.**
2. **Plain year-over-year of the simple metric** — transactions if the question is demand. This is the
   one the reader digests, and it states the hole in the brand's own terms.
3. **The same measure by geography**, where the event has regions of heavier exposure. Read the split
   against its own pre-event gap: exposed regions are chosen because they differ, and they often differ
   before the event starts. Report how far the gap widens against its pre-event average, not the raw
   difference between the two lines.
4. *(optional)* **The peer-indexed view.** It recovers faster because it also divides out the category's
   decline. Show both, label which is which — they disagree and both are right.

## What this module will not say

That an effect below the floor was small rather than undetected. That an event caused something the
control group did too. Where the event was a shock, that recovery is complete while the plain
year-over-year still runs negative.

## If this module is run on its own

It may be the first thing that has run, so it cannot assume the orchestrator's setup happened.

- **Demand route unset, and card is the instrument** → run the gate here: a probe on **626** against the
  resolved entity, before designing anything. Retailer-mediated ends the run with the client-facing scope
  line.
- **Phase 1a not done** → **run it now, and only it**: fiscal calendar, unit count and unit growth for
  every peer, candidate events as names and rough dates. Nothing else — the disclosed figures come later,
  against a claim.
- **Before you write this tab's copy, run Phase 1b on it.** For each claim the tab intends to make,
  retrieve the one disclosed figure that claim is exposed to and drop or reframe the claim if the panel
  contradicts it. It is a gate, not context: without it this module can publish a figure that contradicts
  a public filing, which is the one failure a reader will always catch.
- Write back whatever you learn, so the next module does not repeat it.

## Output

Standalone: a Brief, not a tab. Build per `ca-core` §8.
