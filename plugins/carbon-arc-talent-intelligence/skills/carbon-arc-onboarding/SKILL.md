---
name: carbon-arc-onboarding
description: "Use this skill when someone is new to Carbon Arc and wants to understand it or get started on a company, an artist, a place or a venue: 'get started', 'what can this do', 'show me around', or their first session, even if they only say they just signed up or just got access. It explains what Carbon Arc and its skills are, which of the three Carbon Arc plugins fits their question, and what the data covers and cannot see for that subject, then starts the right report. Runs no queries."
metadata:
  author: Carbon Arc
  version: '0.3.0'
---

# Onboarding

A short, friendly orientation. **Run no queries in this skill.** The goal is that someone understands
what they have and starts their first report in the same sitting. Keep it to a few exchanges; if they
want to skip ahead, go straight to §5.

This skill ships in every Carbon Arc plugin, and every copy is the same. Work out which plugin and which
report this person wants (§2), read that plugin's file in `references/`, and say only that report's part.
**Never walk someone through more than one report.**

---

## 1. Open by asking, not telling

> Welcome. Before I explain anything: **what are you looking at (a company, an artist, a place or a
> venue), and what's the question you'd most like answered about it right now?**

That line is the two things to find out, not a script to read aloud. **Ask only for what they have not
already told you, and never remark on the part you are skipping**: no "you already know the company is
…", no "since you mentioned…". Use what they said as if you had asked for it. If their first message
already names the subject and the question, go straight to §2.

Note the subject and the question **verbatim**; the question is what the first report is aimed at. If
they ask what you can do before answering, give §3 first, then come back to this.

---

## 2. Which plugin

The subject decides the plugin, not which plugin this copy of the skill came in.

| The subject | Plugin | Installed when your skills include | Read |
|---|---|---|---|
| A company or brand: its position against competitors, a listed company's quarter, or the category and markets around a small or regional business. Includes a venue operator's own revenue or stock, when that is what they ask about. | **Company Intelligence** | `company-insights-report` | `references/company.md` |
| A musician or actor: their audience, peers, partnerships, or their own tour and resale demand | **Talent Intelligence** | `talent-starter-report` | `references/talent.md` |
| A place (a metro area, city, town or region) or a venue (an arena, stadium, theater or convention center) | **Location Intelligence** | `location-report` | `references/location.md` |

**Check your skill list before anything else.** Every copy of this skill carries all three plugin files,
so being able to read a file does not mean its plugin is installed. If they ask for a specific plugin,
use that one. Otherwise:

- **The plugin is installed**: say which plugin you're using in one line, *"That's a question for Location Intelligence, so I'll start
  there."*, then read its file before you say anything about its report: §4 and §5 come from that
  file, never from §3 or memory. Follow its routing to the report.
- **It is not installed**: say in one line which plugin covers it and that it's a separate Carbon Arc
  plugin they can add, and stop. Do not read its file, describe its report or ask the §5 question, and do
  not offer anything from the installed plugins instead, not even as a second angle or a narrower
  version of the question.

---

## 3. What Carbon Arc is

> **Carbon Arc is a direct line to what's happening across the consumer economy:** credit card
> transactions, foot traffic, web and app engagement, healthcare claims, Amazon marketplace data, 280+
> data assets in all.
>
> **Carbon Arc Skills are our research workflows, written down:** which data answers which question, what
> to compare it against, and the checks that run before you see a number. Ask the questions you already
> ask, in plain English; you don't need to know the datasets. They're .md files, so they're yours to
> change.
>
> **There are three plugins, one for each subject of analysis:**
> - **Company Intelligence**: a company or brand against its competitors, a listed company's quarter
>   before it reports, or the category and markets around a small business.
> - **Talent Intelligence**: a musician's or actor's audience, peers, partnerships and resale demand.
> - **Location Intelligence**: a metro area's economy, or a venue's ticket market and the blocks around it.

Say this once and keep it this short. Always name all three plugins, whichever are installed: it is what
Carbon Arc offers, not what this session has.

**Never enumerate the data assets.** The catalog grows continuously; a list written today is wrong by the
next quarter, and it caps what the reader thinks they can ask for. In the first line, name three or four
that will mean something to *them* (the plugin's file suggests some), give the count, and include one
from far outside their world, so they learn something true about the range.

---

## 4. The report's part

Say what the plugin's file gives for the report you chose: its framing, what it answers, and what the
data cannot see. Only that report's part, and only once.

---

## 5. Start them

One clear next step, not a menu: the start line the plugin's file gives for the report, which ends by
saying how long it takes to build. Then:

> **Do you want to approve each step, or should I run it straight through?** If you approve, I pause four
> times for your OK: what I've picked to compare against and the data I'll use, the list of data I'll
> pull, which signals hold up, and the findings before I write them up. If I run straight through, I make
> those calls myself, show each one as I go, and list them in the report's method section. You can stop
> me at any point.

Their answer starts the run. Hand off to the report the plugin's file names, with what it lists for the
hand-off, their verbatim question, and `gates: on` (approve each step) or `gates: waived` (straight
through). A yes that picks neither is `gates: on`, the default.

If they would rather begin with one specific question, route to that module directly, but offer the full
report first, because a new user rarely knows which piece they want.

---

## Rules for this skill

- **Run no queries.** No entity lookups, no probes, no framework calls. If a question needs data, that is
  a report's job, and saying so is a fine answer.
- **No internal vocabulary.** No insight numbers, entity ids, dataset codenames, module or skill names
  (the names in `references/` are for you, not for them), or rule names. Describe a report by the
  question it answers.
- **One report per person.** Never set two reports side by side as options, except in the one question a
  plugin's file allows.
- **Do not promise a specific finding**, and never promise a tab or section before the data is checked.
- **Never enumerate the data catalog.** Examples plus a count, never a list.
- **Capture four things for the run**: the subject, their question verbatim, which report it goes to,
  and whether they approve each step or want it run straight through.
- **Let them skip.** "Just run it" goes straight to the right report, and is `gates: waived`. Say so in
  one line, with the plugin: *"I'll run it straight through in Company Intelligence, one of three Carbon
  Arc plugins, each built for one subject; stop me any time to check in instead."* If it is not clear
  which report, ask the one question the plugin's file allows and nothing else.
- **Say how long the full report takes before it starts.** One line, said even when they skip ahead.
- **Ask the §5 question before every hand-off**, unless they have already answered it. Ask it once; do
  not re-ask inside the run.
- **Follow the plugin file's own rules** as well as these.
