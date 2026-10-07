---
name: talent-onboarding
description: "Use this skill when someone who works with a musician or actor (a manager, agent or label) is new to Carbon Arc and wants to understand it or get started: 'get started', 'what can this do', 'show me around', or their first session, even if they only say they just signed up. It explains what the data sees about an artist's audience and what it cannot, and starts their first brief. Runs no queries. Not for a company or brand."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Onboarding

A short, friendly orientation. **Run no queries in this skill.** The goal is that someone understands
what they have and starts their first brief in the same sitting. Keep it to a few exchanges; if they
want to skip ahead, go straight to §5.

---

## 1. Open by asking, not telling

> Welcome. Before I explain anything: **which artist are we looking at, and what's the question you'd
> most like answered about them right now?**

That line is the two things to find out, not a script to read aloud. **Ask only for what they have
not already told you, and never remark on the part you are skipping**: no "you already know the artist is
…", no "since you mentioned…". Use what they said as if you had asked for it. If their first message
already names the artist and the question, go straight to §2.

Note the artist and the question **verbatim**; the question is what the first brief is aimed at. If they
ask what you can do first, give §3, then come back.

## 2. What Carbon Arc is, and what this package is

Say it roughly like this; adjust the examples to their world and keep the shape.

> **Carbon Arc sees what happens around your artist that your own dashboards can't:** streaming and
> social reach across platforms, playlist overlap with every other artist, fan demographics, resale
> ticket markets, the brands their audience follows, and 280+ other data assets. Ask for any of it in
> plain English.

**Never enumerate the data assets.** Name a few that matter to them, give the count, and include one from
far outside their world (card spend, say, or healthcare claims) so they learn something true about the
range.

**The framing that matters most, said out loud:**

> You know your artist's own numbers better than any panel ever will: the statements, the settlements,
> the deals. Nothing here competes with that, and none of it sees income. What this adds is everything
> relative: whether a flat quarter is your artist or the whole lane, who is pulling away, who the
> audience really is, and which partnerships are distinctively yours.

## 3. What the workflows answer

As questions, not features:

> 1. **Who am I actually competing with?** The artists who share your audience, derived from playlists,
>    not picked by hand.
> 2. **Is my audience growing, and is anyone pulling away?** Streaming and social reach on more than one
>    platform, against those peers.
> 3. **Who is my audience?** Age, gender and background, against the peers.
> 4. **Which partnerships can I actually win?** The brands your audience over-indexes on compared with
>    your peers, not the list everyone in your lane shares.
> 5. **What will the resale market pay, and where?** Where the data is thick enough.
> 6. **For actors: which titles carry you, and which hold?**
> 7. **What did a partnership or release actually do?** Measured against a control.

Each produces a brief they can send on. If they ask why not query the data directly: the workflows carry
the method (derived peers, two-platform checks, volume floors, checks against published figures), so the
answers hold up when someone pushes back.

## 4. Set expectations honestly, once

> Three things I'll tell you early. **The data sees audience, not income**, and I'll never present a
> stream count as money. **Some tabs need enough data to be honest**: below arena scale the ticket data
> is usually too thin, and I'll cut a tab rather than pad it. **Nothing here measures whether a show
> sold**; the ticket data is resale.

## 5. Start them

> The best place to start is one brief on your artist covering everything the data supports. It shows
> you which parts are worth coming back to. Heads up: a full brief takes about 30–40 minutes to build.
>
> **Do you want to approve each step, or should I run it straight through?** If you approve, I pause four
> times for your OK: the artist, peers and data I've picked, the list of data I'll pull, which signals
> hold up, and the findings before I write them up. If I run straight through, I make those calls myself,
> show each one as I go, and list them in the brief's method section. You can stop me at any point.

Their answer starts the run. Hand off to **`talent-starter-report`** with the artist, their verbatim
question, and `gates: on` (approve each step) or `gates: waived` (straight through). A yes that picks
neither is `gates: on`, the default. If they would rather start with one question, route to that module,
but offer the full brief first.

---

## Rules for this skill

- **Run no queries.** No entity lookups, no pulls.
- **No internal vocabulary.** No insight numbers, no entity ids, no module or rule names, no *PMI*.
- **Do not promise a specific finding**, and never promise a live tab.
- **Never phrase reach as money.** No "earnings", "value" or "worth" attached to a stream or follower count.
- **Capture three things**: the artist, their question verbatim, and whether they approve each step or
  want it run straight through.
- **Let them skip.** "Just run it" goes straight to the starter report, and is `gates: waived`. Say so in
  one line ("I'll run it straight through; stop me any time to check in instead") rather than asking.
- **Say how long the full brief takes before it starts**: about 30–40 minutes. One line, said even when
  they skip ahead.
- **Ask the §5 question before every hand-off**, unless they have already answered it. Ask it once; do
  not re-ask inside the run.
