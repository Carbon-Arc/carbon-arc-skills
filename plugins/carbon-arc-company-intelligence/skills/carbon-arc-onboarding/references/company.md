# Company Intelligence: onboarding

Read by `carbon-arc-onboarding` when the subject is a company or brand.

**Data examples for the opening line:** pick with an eye to their vertical, and include one from far
outside it: a restaurant strategist hearing "healthcare claims", or a beauty brand hearing "port
shipments", learns something true about the range.

## Which report

| They are asking about | Report | Say |
|---|---|---|
| Their competitive position: who is winning share, where customers also spend, which customers they are losing, what an event did | **`company-insights-report`** | Position |
| A listed company's quarter: what it is tracking at, what it will report, how the quarter is shaping up before the print | **`company-earnings-preview`** | Quarter |
| How their category and the markets around them are doing, for a small or regional business (a store, dealer, contractor or local chain) that does not appear in the data by name | **`smb-category-report`** | Category |

Most answers settle it. **For a business that is not listed, whether it appears in the data decides
between the first and third rows**, and the report you hand off to checks that, not the onboarding (it
runs no queries). So do not ask which of the two they want. A local or regional business (an owner, a
store, a dealer, a franchisee) goes to **`smb-category-report`**; a named company's own team goes to
**`company-insights-report`**. Either report's routing step looks the business up and passes it to the
other if needed. For a local business, say so in one line: *"If your business shows up in the data by
name, I'll read it directly against its competitors instead."* That sentence is the only mention of the
other report: then say Category, and never describe the two side by side or ask which they want.

If a listed company could want either its position or its quarter, ask (this is the one question this
plugin allows):

> Do you want to see **where [company] stands against its competitors**, or **what its current quarter is
> tracking at before it reports**?

Ask nothing else to decide it, and do not ask who they are: the question decides the report.

**What they volunteer about themselves counts, though.** Someone who says they work on the company's own
strategy, insights or analytics team wants its position: say Position, and do not offer the quarter, not
even as one of two options. An investor relations team is the one role that does not settle it; there,
the question still decides. Someone who runs a local or regional business (an owner, a store or dealer
manager, a franchisee) gets Category, and never the quarter.

---

## Position

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

### Start line

*"The best place to start is a single report covering all five questions for your company. It takes one
run, and it shows you which of them are worth coming back to. Heads up: a full report takes about 30–40
minutes to build."*

---

## Quarter

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

### Start line

*"Next step is the preview for [ticker]. Heads up: a full preview takes about 30–40 minutes to build."*

---

## Category

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

### Start line

*"The best place to start is one report on your category and the markets around you. Heads up: it takes
about 30 to 40 minutes to build."*

---

## Hand-off

To **`company-insights-report`** (Position), **`company-earnings-preview`** (Quarter) or
**`smb-category-report`** (Category), with the company, ticker or business and the markets it operates
in.

## Rules for this plugin

- **One report per person.** For a local or regional business, say Category and nothing of Position or
  Quarter beyond the one-line note that a business the data can see is read against its competitors
  instead.
- **Never say "top line", "revenue" or "sales" of a panel figure.** The panel measures a sample of
  spending. That word choice is the difference between a claim that survives a CFO and one that does not.
- **Do not promise an estimate.** Whether one ships depends on the backtest.
- **Never mention a recommendation, target or trade**, even in passing.
