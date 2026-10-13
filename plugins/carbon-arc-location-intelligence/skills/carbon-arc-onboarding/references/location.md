# Location Intelligence: onboarding

Read by `carbon-arc-onboarding` when the subject is a place or a venue.

**Data examples for the opening line:** card transactions, foot traffic, building permits, resale ticket
markets. Include one from far outside their world (healthcare claims, say).

## Which report

| They are asking about | Report | Say |
|---|---|---|
| A metro area, city, town or region: how its economy is doing against places like it, or what a dated shock did to it (a storm, a plant closure, a major opening such as a new arena) | **`location-report`** | Place |
| A venue: how its ticket market is doing against similar venues, which shows and games drive it, whether its events reach the blocks around it, who its crowds also buy for | **`venue-report`** | Venue |

Most answers settle it, and who they are usually does too: an economic development office, a chamber of
commerce, a tourism authority, a city or county economist, or a market research team asking about a place
gets Place; the team that runs, books or owns a venue gets Venue.

**One case does not settle itself: a place asking about a venue in it** ("is the new arena good for our
town?"). Ask once (this is the one question this plugin allows):

> Do you want to see **how [the town]'s economy is doing, with the venue's opening as the event**, or **how
> the venue itself is doing against similar venues**?

Ask nothing else to decide it.

---

## Place

**The framing that matters most, said out loud:**

> You know your place better than any panel will, and you already hold its official figures: lodging tax,
> sales tax, jobs, permits. Nothing here replaces them. What this adds is what they can't show you: how
> your place moves against places like it, month by month, and what a dated shock actually did.

### What the report answers

> 1. **How are the people who live here spending?** Against comparable metro areas and against their own
>    history.
> 2. **What are they spending more and less on?** Groceries, dining out, home improvement and more.
> 3. **Are people coming to the places here?** Visits to places such as hotels, restaurants and
>    stores, and how long a slump lasted.
> 4. **How much is being built or repaired, and is it more than usual?** From permits filed.

### The two sides, said once

> A place is read from two sides, and every figure says which. **Residents**: what the people who live
> here spend, wherever they spend it. **Places**: what happens at the locations here, visitors included.
> The two often disagree, and when they do, that is usually the finding.

### What it cannot see, said once

> Card data sees where a cardholder lives, not where they shop, so **what visitors spend here is out of
> reach**, and so are visitor counts. So are hotel occupancy, unemployment, population and home prices at
> metro-area level; where those matter, I use the published figures. Every figure is read against
> comparable metro areas, which I choose from public records and show you before anything is measured,
> and I set the panel beside your published figures to check it.

### Start line

*"The best place to start is one report on [the place] covering all four questions. It shows you which
of them are worth coming back to. Heads up: a full report takes about 30–40 minutes to build."*

---

## Venue

**The framing that matters most, said out loud:**

> You hold your own box office: every ticket you sold, attendance, your gross. Nothing here competes with
> that. What this adds is everything outside it: the resale market at your venue against similar venues,
> the shows and games that drive it, the blocks around you on event days, and who your crowds also buy
> tickets for.

### What the report answers

> 1. **How is our ticket market doing against similar venues?** Elsewhere, and in the same market.
> 2. **Which shows and games drive it?** Each compared like for like: games against the same league's
>    games, acts against their own other shows.
> 3. **Do our events show up in the blocks around us?** Foot traffic in the venue's ZIP code on event days.
> 4. **How are the people who live nearby spending?**
> 5. **Who do our crowds also buy tickets for?** Through the teams and acts that play here.

### What it cannot see, said once

> **Every ticket figure is resale.** Nothing here sees attendance, primary sales, face value or whether a
> show sold out. Card data sees where a cardholder lives, so it shows what nearby residents spend, never
> spending inside the venue or by visitors around it. Foot traffic covers chain locations, not independent
> businesses. Some venues and shows are too thin in the resale data to read; I check that on the first
> pull and cut a section rather than pad it.

### Start line

*"The best place to start is one report on [the venue] covering the questions the data supports. Heads
up: a full report takes about 30–40 minutes to build."*

---

## Hand-off

To **`location-report`** (Place) or **`venue-report`** (Venue), with the place or venue and any date or
tenant they named.

## Rules for this plugin

- **Say *metro area*, never *CBSA* or *MSA*; *location*, never *POI*; *trade area*, never *catchment*.**
- **Never present a panel figure as the place's economy, a venue's attendance, or anyone's sales.**
  Residents' spending is not "the local economy", foot traffic is not "spending", and a resale figure is
  not "tickets sold".
- **No forecasts and no recommendations**: not where to invest, not what to book.
