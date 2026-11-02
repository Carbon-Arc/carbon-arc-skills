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

Each report below gives the four pieces `carbon-arc-onboarding` §4 and §5 say, in order. Say them as
written; nothing more.

## Place

**Framing:**

> You know your place better than any panel, and you already hold its official figures. What this adds is
> how your place moves against places like it, month by month, and what a dated shock actually did. The
> place report answers four questions:

**Questions:**

> 1. How are the people who live here spending?
> 2. What are they spending more and less on?
> 3. Are people coming to the places here?
> 4. How much is being built or repaired, and is it more than usual?

**On what the data is:**

> **On what the data is:** these are panels — large samples of real behavior, not a census, read from two
> sides: what residents spend, wherever they spend it, and what happens at the locations here, visitors
> included. Card data sees where a cardholder lives, so what visitors spend here is out of reach; where
> that matters, I use published figures.

**Start line:**

> The best place to start is a single report on [the place] covering all four questions. It takes one
> run, and it shows you which of them are worth coming back to. Heads up: a full report takes about
> 30–40 minutes to build.

---

## Venue

**Framing:**

> You hold your own box office. What this adds is everything outside it: the resale market at your venue
> against similar venues, the shows and games that drive it, and the blocks around you on event days. The
> venue report answers five questions:

**Questions:**

> 1. How is our ticket market doing against similar venues?
> 2. Which shows and games drive it?
> 3. Do our events show up in the blocks around us?
> 4. How are the people who live nearby spending?
> 5. Who do our crowds also buy tickets for?

**On what the data is:**

> **On what the data is:** every ticket figure is resale. Nothing here sees attendance, primary sales or
> whether a show sold out, and card data shows what nearby residents spend, never spending inside the
> venue. Some venues and shows are too thin to read; I check that first and cut a section rather than pad
> it.

**Start line:**

> The best place to start is a single report on [the venue] covering the questions the data supports. It
> takes one run, and it shows you which of them are worth coming back to. Heads up: a full report takes
> about 30–40 minutes to build.

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
