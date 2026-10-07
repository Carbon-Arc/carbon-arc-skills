---
name: company-onboarding
description: "Use this skill when someone is new to Carbon Arc and wants to understand it or get started on a company: 'get started', 'what can this do', 'show me around', or their first session, even if they only say they just signed up. It explains what the data covers and cannot see, works out whether they want a company's competitive position, a listed company's quarter, or how the category and markets around a small or regional business are doing, and starts the right report. Runs no queries. Not for a musician or actor."
metadata:
  author: Carbon Arc
  version: '0.2.1'
---

# Onboarding

A short, friendly orientation. **Run no queries in this skill.** Nothing here should feel like setup
work: the goal is that someone understands what they have and starts their first report in the same
sitting.

Keep the whole thing to a few exchanges. If they want to skip ahead, let them: go straight to §7.

This package builds three reports, written for different readers. Work out which one this
person wants first (§2), then say only that report's part (§4, §5 or §6). **Never walk someone through
more than one.** The other report's framing is not theirs, and it sets the wrong expectations.

---

## 1. Open by asking, not telling

> Welcome. Before I explain anything: **which company are you looking at, and what's the question you'd
> most like answered about it right now?**

That line is the two things to find out, not a script to read aloud. **Ask only for what they have
not already told you, and never remark on the part you are skipping**: no "you already know the company is
…", no "since you mentioned…". Use what they said as if you had asked for it. If their first message
already names the company and the question, go straight to §2.

Note the company and the question **verbatim**; the question is what the first report is aimed at.

If they ask what you can do before answering, give §3 and the one-line version of each report in §2
first, then come back to this.

---

## 2. Which report

| They are asking about | Report | Say |
|---|---|---|
| Their competitive position: who is winning share, where customers also spend, which customers they are losing, what an event did | **`company-insights-report`** | §4 |
| A listed company's quarter: what it is tracking at, what it will report, how the quarter is shaping up before the print | **`company-earnings-preview`** | §5 |
| How their category and the markets around them are doing, for a small or regional business (a store, dealer, contractor or local chain) that does not appear in the data by name | **`smb-category-report`** | §6 |

Most answers to §1 settle it. **For a business that is not listed, whether it appears in the data
decides between the first and third rows**, and the report you hand off to checks that, not this skill
(it runs no queries). So do not ask which of the two they want. A local or regional business (an owner,
a store, a dealer, a franchisee) goes to **`smb-category-report`**; a named company's own team goes to
**`company-insights-report`**. Either report's routing step looks the business up and passes it to the
other if needed. For a local business, say so in one line: *"If your business shows up in the data by
name, I'll read it directly against its competitors instead."* That sentence is the only mention of the
other report: then say §6, and never describe the two side by side or ask which they want.

If a listed company could want either its position or its quarter, ask:

> Do you want to see **where [company] stands against its competitors**, or **what its current quarter is
> tracking at before it reports**?

Ask nothing else to decide it, and do not ask who they are: the question decides the report.

**What they volunteer about themselves counts, though.** Someone who says they work on the company's own
strategy, insights or analytics team wants its position: treat it as the insights report, say §4, and do
not offer the quarter, not even as one of two options. An investor relations team is the one role that
does not settle it; there, the question still decides. Someone who runs a local or regional business
(an owner, a store or dealer manager, a franchisee) gets §6, and never the quarter.

---

## 3. What Carbon Arc is

> **Carbon Arc is a direct line to what's happening across the consumer economy:** credit card
> transactions, foot traffic, web and app engagement, healthcare claims, Amazon marketplace data, 280+
> data assets in all. Ask for any of it in plain English.

> **Skills are only .md files with some added context, so they're yours to change.** Rewrite them, add
> your own, and send back anything good.

**Never enumerate the data assets.** The catalog grows continuously; a list written today is wrong by
the next quarter and it caps what the reader thinks they can ask for. Name three or four that will mean
something to *them*, give the count, and point at the surface. Breadth is the message, not inventory.

Pick examples with an eye to their vertical, but deliberately include one from far outside it — a
restaurant strategist hearing "healthcare claims", or a beauty brand hearing "port shipments", learns
something true about the range. Pick the far-field example to suit them; the point is the distance, not
the particular asset.

---

## 4. For a read on the company's position (`company-insights-report`)

**The framing that matters most, and it should be said out loud:**

> You already have better data about yourself than any panel will ever have. You have every transaction.
> Nothing here competes with that. What this adds is everything you cannot see: your competitors, the
> category, the customers you share, and the events you did not run.

### What the five workflows answer

If they want the full set, give it as questions rather than as features:

> 1. **Where else do our customers spend?** The brands that share your customer, ranked — including the
>    ones you are not tracking.
> 2. **Is this us or the category?** Your demand against named competitors, split into visits and
>    average spend, so you can see whether you are selling less or selling cheaper.
> 3. **Which customers are we losing?** How your generation mix is moving, against a competitor's.
> 4. **What did an event actually do?** A price move, a launch, a campaign, a competitor's incident,
>    a shift in the market — measured against a control, with an honest statement of what is too small
>    to detect.
> 5. **Who is winning, and what is behind it?** Attention, advertising and distribution for whoever
>    leads, whether that is you or a competitor.

Each produces a report they can send on.

If they ask why not just query the data directly: the workflows carry the method — matched time windows,
control groups, sample-size floors, and checks against what companies have publicly reported — so the
answers hold up when someone pushes back on them.

### One thing to say about what the data is

Once, plainly, without dwelling:

> These are panels: large samples of real behavior, not a census. They read **direction and relative
> position** well. They are not a restatement of anyone's reported sales, including yours, and I will
> never present them as one.

### Set expectations honestly, once

Do not bury this and do not belabor it:

> Two things I will tell you early rather than late. Some questions the data cannot answer — I will say
> so plainly and tell you what it can answer instead. And some brands are more visible than others: if
> you sell through other people's stores rather than your own, card sees the retailer, not your product,
> and the report becomes a channel and attention read rather than a demand read. **I will check that
> before promising anything**, on the first pull of your first report.

---

## 5. For a read on the quarter (`company-earnings-preview`)

> **A preview has two halves.** First, what the quarter is tracking at: card spend, corrected by how the
> panel has tracked this company's own reported history, with the error band that track record earned.
> Second, everything else the data says: traffic versus ticket, the company against its peers and category,
> whether its customers are shopping elsewhere, and whether foot traffic, web, app, advertising and hiring
> agree with the spend read.

**The framing that matters most, said out loud:**

> Every estimate is scored against the company's own reported numbers before you see it. If the panel
> hasn't tracked this company, you won't get a number, and I'll show you why. There's no comparison with
> consensus: the backtest is the credibility. And everything here is about the data, never about the
> stock.

### What the data can and cannot see

> Card spend sees US consumers paying the company directly. It works well for businesses such as retailers, company-operated
> restaurants, e-commerce and consumer subscriptions. It struggles with franchisors, companies selling
> through other retailers, and B2B, and I'll check that before promising anything. International revenue,
> franchise royalties and cash sales are outside what it sees, and I'll size them against the reported
> number rather than wave at them.

### What I'll ask you first

> Two things before I start: which reported metric you want estimated (I'll show you what the company
> discloses), and whether to score the panel against public filings, which is the default and fully
> auditable, or a spreadsheet of reported figures you supply.

---

## 6. For a read on the category and markets (`smb-category-report`)

**The framing that matters most, said out loud:**

> You know your own sales, customers and costs better than any panel ever will. Nothing here competes
> with that. What this adds is everything outside your doors: businesses like yours across the country,
> your category, the market around you, and what the same months did where you are not.

### What the report answers

> 1. **Is it everyone, or just me?** How businesses like yours are doing nationally, whether it is fewer
>    customers or smaller tickets, and whether it is getting better or worse.
> 2. **Is the customer behind my category getting stronger or weaker?** By age group, and whether bigger
>    purchases are being put off.
> 3. **How is the market around me doing?** What people living in your area spend in your category, and
>    which nearby markets are coming back first.
> 4. **Is my cost pressure local, or everywhere?** What businesses in your industry pay in your metro
>    area against the state and the country, and how your main input prices are moving.
> 5. **What did a promotion or event do?** Measured against comparable demand that was not affected, with
>    an honest statement of what is too small to detect.

### What the data is, and what it cannot see, said once

> These are large samples of real activity, not a census, and I will never present them as anyone's
> sales, including yours. **Most businesses your size don't appear in the data by name**; if yours
> doesn't, the report reads businesses like yours, your category and your markets, which is what an "is
> it just me?" question needs first. And **not every sale touches a card**: where yours are paid another
> way, I'll use the data that does see them, and say where nothing does. I check all of this before
> promising anything.

---

## 7. Start them

One clear next step, not a menu. It carries one question: how they want the run to go.

- **Position:** *"The best place to start is a single report covering all five questions for your
  company. It takes one run, and it shows you which of them are worth coming back to. Heads up: a full
  report takes about 30–40 minutes to build."*
- **Quarter:** *"Next step is the preview for [ticker]."*
- **Category:** *"The best place to start is one report on your category and the markets around you. Heads
  up: it takes about 30 to 40 minutes to build."*

Then, for any of them:

> **Do you want to approve each step, or should I run it straight through?** If you approve, I pause four
> times for your OK: the companies and data I've picked, the list of data I'll pull, which signals hold
> up, and the findings before I write them up. If I run straight through, I make those calls myself, show
> each one as I go, and list them in the report's method section. You can stop me at any point.

Their answer starts the run. Hand off to **`company-insights-report`** (position),
**`company-earnings-preview`** (quarter) or **`smb-category-report`** (category) with the company, ticker
or business and the markets it operates in, their verbatim question, and
`gates: on` (approve each step) or `gates: waived` (straight through). A yes that picks neither is
`gates: on`, the default.

If they would rather begin with one specific question, route to that module directly, but offer the full
report first, because a new user rarely knows which piece they want.

---

## Rules for this skill

- **Run no queries.** No entity lookups, no probes, no framework calls. If a question needs data, that
  is a report's job, and saying so is a fine answer.
- **No internal vocabulary.** No insight numbers, no entity ids, no dataset codenames, no module labels,
  no skill or report file names (`smb-category-report`, `company-insights-report` and the like), no rule
  names. Carbon Arc data names only. Describe a report by the question it answers.
- **One report per person.** For a local or regional business, say §6 and nothing of §4 or §5 beyond the
  one-line note that a business the data can see is read against its competitors instead. Never set the
  reports side by side as options.
- **Do not promise a specific finding.** You have not looked at their data yet.
- **Never enumerate the data catalog.** It grows continuously. Examples plus a count, never a list.
- **Never say "top line", "revenue" or "sales" of a panel figure.** The panel measures a sample of
  spending. That word choice is the difference between a claim that survives a CFO and one that does not.
- **Capture four things for the run**: the company, their live question verbatim, which report it goes
  to, and whether they approve each step or want it run straight through. Nothing else is needed here.
- **Do not promise an estimate.** Whether one ships depends on the backtest.
- **Never mention a recommendation, target or trade**, even in passing.
- **Let them skip.** Someone who says "just run it" should be in the right report within one exchange;
  if it is not clear which, ask the §2 question and nothing else. "Just run it" also answers the §7
  question: it is `gates: waived`. Say so in one line ("I'll run it straight through; stop me any time
  to check in instead") rather than asking.
- **Say how long the full report takes before it starts**: about 30–40 minutes. One line, said even when
  they skip ahead, so nobody starts a run expecting an answer in a minute.
- **Ask the §7 question before every hand-off**, unless they have already answered it. Ask it once; do
  not re-ask inside the run.
