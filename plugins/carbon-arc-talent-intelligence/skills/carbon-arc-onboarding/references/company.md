# Company Intelligence: onboarding

Read by `carbon-arc-onboarding` when the subject is a company or brand.

**Data examples for the opening line:** pick with an eye to their vertical, and include one from far
outside it: a restaurant strategist hearing "healthcare claims", or a beauty brand hearing "port
shipments", learns something true about the range.

## Which report

| They are asking about | Report | Say |
|---|---|---|
| Their competitive position: who is winning share, where customers also spend, which customers they are losing, whether customers come back, what an event did | **`company-insights-report`** | Position |
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

Each report below gives the four pieces `carbon-arc-onboarding` §4 and §5 say, in order. Say them as
written; nothing more.

## Position

**Framing:**

> You already know your own business better than any panel. What this adds is what you can't see: your
> competitors, your category and the customers you share. The insights report answers six questions:

**Questions:**

> 1. Where else do our customers spend?
> 2. Is this us or the category?
> 3. Which customers are we losing?
> 4. Are we keeping the customers we win?
> 5. What did an event actually do?
> 6. Who is winning, and why?

**On what the data is:**

> **On what the data is:** these are panels — large samples of real behavior, not a census. They read
> *direction and relative position* well. They are not a restatement of anyone's reported sales,
> including yours, and I'll never present them as one.

**Start line:**

> The best place to start is a single report covering all six questions for [company]. It takes one
> run, and it shows you which of them are worth coming back to. Heads up: a full report takes about
> 30–40 minutes to build.

If they ask why not query the data directly: the workflows carry the method (matched time windows,
control groups, sample-size floors, checks against what companies have publicly reported), so the
answers hold up when someone pushes back. Which data a company is read on (card spend, marketplace sales,
receipts and so on) is decided by what is attached to it, in the report's first pulls; do not promise
any of it here.

---

## Quarter

**Framing:**

> Every estimate is scored against the company's own reported numbers before you see it; if the panel
> hasn't tracked this company, you won't get a number, and I'll show you why. The earnings preview
> answers five questions:

**Questions:**

> 1. What is the quarter tracking at?
> 2. What drove it?
> 3. Is it the company or the category?
> 4. Do other datasets agree?
> 5. Is the trend a one-off?

**On what the data is:**

> **On what the data is:** card spend sees US consumers paying the company directly, so it reads
> businesses such as retailers, company-operated restaurants, e-commerce and subscriptions best. International revenue,
> franchise royalties and cash sales are outside it, and I'll size them against the reported number.
> There's no comparison with consensus, and nothing here is about the stock.

**Start line:**

> The best place to start is a single preview for [ticker] covering all five questions. Heads up: a
> full preview takes about 30–40 minutes to build.

The preview itself asks which reported metric to estimate and whether to score against public filings or
a spreadsheet of reported figures; the onboarding does not.

---

## Category

**Framing:**

> You know your own sales, customers and costs better than any panel ever will. What this adds is
> everything outside your doors: businesses like yours across the country, your category and the market
> around you. The category report answers five questions:

**Questions:**

> 1. Is it everyone, or just me?
> 2. Is the customer behind my category getting stronger or weaker?
> 3. How is the market around me doing?
> 4. Is my cost pressure local, or everywhere?
> 5. What did a promotion or event do?

**On what the data is:**

> **On what the data is:** these are large samples of real activity, not a census, and I'll never present
> them as anyone's sales, including yours. Most businesses your size don't appear in the data by name;
> if yours doesn't, the report reads businesses like yours, your category and your markets.

**Start line:**

> The best place to start is a single report covering all five questions for your category and the
> markets around you. It takes one run, and it shows you which of them are worth coming back to. Heads
> up: a full report takes about 30–40 minutes to build.

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
