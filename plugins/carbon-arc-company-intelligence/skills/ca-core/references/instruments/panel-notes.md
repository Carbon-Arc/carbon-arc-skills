# Panel notes: how a row comes to exist, and what that permits you to say

**This file exists to stop wrong takeaways.** A panel earns a note here only when a report has drawn, or
could easily draw, a conclusion the data does not support because nobody asked where the rows came from.
Coverage, grain and freshness live in the other instrument files; this one covers **sourcing, skew, what a
zero means and which statistic survives**.

Every note carries a date. Contributors join, fields appear, tagging improves; a limit written as "as of
<date>, re-check with <call>" invites the next run to check rather than inherit it.

## Four questions for any panel, including ones with no note

1. **What had to happen in the world for this row to exist?** Narrowly: "a financed transaction at an
   enrolled provider" is an answer; "dental spend" is not.
2. **Who chose to be in this panel, and can they leave?** If anyone chose, counts and totals are partly
   measuring the choice; check whether the participant count is exposed.
3. **What does a zero mean?** Complete the sentence *"no rows in this ZIP means ___"*. Anything other than
   "nothing happened" means every absence on the page needs labeling.
4. **What is it selected toward?** Name it, then name which statistic it contaminates and which divides it
   out.

**The rule these answers feed: use each panel at the statistic its construction supports, and describe it
by what it counts.** Where participation can change, counts and totals move with participation and are not
publishable; within-period averages and shares divide it out. A field name is a label, not a definition.

## Credit Card – Health Spend *(insights 93212 / 93213 / 93215; noted 2026-09-15)*

- **What it is:** one large card issuer's patient-financing book: care that patients chose to finance at
  providers that chose to enroll, mostly dental and veterinary, then vision, hearing, chiropractic and
  cosmetic. **Not visits, not claims, not a practice's revenue.**
- **Geography is the provider's location**, which is rare and valuable: the general card panel's is the
  cardholder's home.
- **A ZIP with no rows has no enrolled provider, not no care.** A series that stops is a provider leaving.
- **Selected toward care people cannot pay for at once**, so an average case size moves with what was
  financed as readily as with price. Over-represented in some states, under in others: compare within a
  state over time, not across states.
- **Publish averages and within-period shares only; never counts, totals or their growth.** The provider
  count is not exposed, so enrollment cannot be divided out. *Re-check:* look for a merchant-count insight
  on the same topic; if one appears, spend per enrolled provider becomes publishable.
- **Reader sentence:** *"Financed care at providers who offer this payment plan. Providers choose to take
  part, so a ZIP with no volume has no participating provider, not no care."*

## Healthcare Closed Claims *(noted 2026-09-15)*

- **What it is:** settled claims contributed by the insurers and providers who warehouse their data on one
  platform. Excellent depth on what is there; breadth depends on who contributes.
- **Geography is the billing provider's address**, so it is genuinely local for a practice.
- **Within-period ratios survive** (what a plan type pays for a procedure is set by benefit design and
  holds). **Nothing comparing two periods survives through the MCP**, and no payer's volume share is a
  market share: contributors join and leave. A state series and the US series are the same contributors
  summed differently, so one never controls for the other.
- **A "paid claim" is one procedure line, not one case.**
- **Reader sentence:** *"Settled claims contributed by the insurers and providers who share their data.
  What each plan type pays holds; how much work flows through each is a fact about who contributes."*

## Vehicle Registration *(noted 2026-10-03)*

- **Counts vehicles, not households or buyers.** A registration also rises on a replacement, a second
  car, a lease ending or a business address. Never write *arrivals*, *in-migration* or *households*.
- Keyed to the registrant's address; month grain only; history from late 2022.
- **Check each year's level against published sales, not once.** *(Oct 2026: US totals ran about 95% of
  published sales for 2023 to 2025, then fell well short in 2026 across most states while one state's
  matched the published trend. Use the clean geography and read the national series as a within-month mix
  only.)*

## SMB Workforce *(noted 2026-09-15)*

- Payroll records keyed to the **employer's** location: the one local, business-side signal for a small
  business.
- **Worker counts and employer counts move with the panel's own growth, not the economy's;** they rose
  sharply in almost every ZIP of one state over two years. Do not publish them.
- **Wages survive**, because panel growth cancels in an average. The industry-level layer serves **average
  net salary** (after withholding, not gross, not loaded employer cost); gross pay exists only without an
  industry cut. Say which one a chart shows.
- A narrow industry at county or ZIP grain usually does not survive; read it at **metro** grain, or use the
  all-industry wage for smaller areas.
- **December carries a year-end true-up**; compare December with December or exclude it.

## Foot traffic *(noted 2026-09-15)*

Venue-located, so merchant-side, but **seasonally normalized** (it cannot answer a seasonality question),
its floor is the metro area, and a visit trend can be nothing but the location list growing or freezing.
**Always pull the location count with any visit figure.** Use it as a trend check, never a lead.
