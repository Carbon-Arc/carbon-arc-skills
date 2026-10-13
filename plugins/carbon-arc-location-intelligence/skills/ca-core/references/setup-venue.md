# Setup: a venue (an arena, stadium, theater or convention center)

Read during `ca-core` §2 when the subject is a venue. It adds to the shared checklist; it does not replace
it. Instrument notes are in `instruments/venue-instruments.md`; read it before Gate 1.

Every id, route and threshold below is a **dated prior** from two pilots (a large two-tenant arena and a two-tenant stadium, Oct
2026). Re-survey live; read accepted resolutions off the response, never off this file.

## What this subject adds to the setup

- **The venue**, resolved to its venue node, with its street address and ZIP code from a public source.
- **Its tenants** (teams, residencies) resolved to their team or artist nodes.
- **The kind of run**: an **event run** (a dated change: a renovation, a new tenant, a residency ending,
  a change in how people reach the area) or a **trend run** (how the venue is doing, with no single date).
- **Two comparison groups and a ring**, chosen by the rule below and shown before anything is measured
  (`ca-core` gate 11).
- **A published figure** for the external level check, retrieved with a source.
- **For every dataset used, which side it sees** (`instruments/venue-instruments.md`).

## A venue is read from four sides, and the report says which side every figure comes from

- **The venue**: resale tickets sold at it, by location and by event.
- **The blocks around it**: foot traffic in its ZIP code, located at the place.
- **Residents nearby**: card spending by the people who live in its ZIP code, located at their home.
- **Its buyers**: who the people buying its tenants' tickets also buy tickets for.

Card data never shows spending at or around the venue; it shows what nearby residents spend wherever they
spend it.

## Resolve the venue

- `search_entities` with `entity_representations: ["venue"]`. A building can hold more than one venue node
  (a theater inside an arena); use the one the question names and say which were left out.
- **Three node types carry different data.** The venue node carries resale-ticket series. **Its ZIP node**
  (from the published street address) carries foot traffic, residents' card spending and permits. **The
  teams and artists that play there** carry ticket-buyer overlap. Survey all three: `ontology` on the venue
  node lists less than reaches it.
- A venue renamed during the window may stop returning rows under its old name with no node under the new
  one. Check the location list for the new name; if it is absent, drop that venue from the periods after
  the rename and say so.

## Choose comparable venues

No event footprint and no growth ranking applies, so the comparisons come from what the venue is:

- **Group A, the same kind of venue in other cities**: similar capacity and the same main uses (for an
  arena, the same pro-league tenancy). Four to six. Where a tenant plays in a league, choose group A venues
  in the same league, so its games have a like-for-like control ("Event mix" below).
- **Group B, the venues in the same market** that compete for the same shows and buyers. Unlike neighbors
  in a metro run, these are kept: they share the subject's buyers, which is the comparison the question
  needs. Say in one line which kinds of event each shares with the subject; a group B venue that hosts none
  of them compares buyers, not shows.
- **The area around each venue is that venue's own ZIP code.** Every comparison between venues is ZIP
  against ZIP.
- **The ring**: neighboring ZIP codes around the subject, taken from a published neighborhood definition,
  or for a venue outside a city's neighborhoods, the towns that border its town from a public source; say
  in Gate 1 how strong that source is. Read only against the subject's own ZIP (does an effect fade with
  distance), never against other venues. Where a ring ZIP is also a comparison venue's ZIP, say so.

Show both groups and the ring, with one line each on why, and the venues left out and why.

## Grain and window

- **Quarterly** for every comparison between venues, over two full years for a trend run.
- **Monthly** only for the subject and one group B venue, when a dated candidate (a playoff run, a
  residency ending) needs it.
- **Daily** for event days (`loc-venue`).
- Drop the current partial period everywhere. Size every pull before sending it (`carbonarc-mcp`
  `references/pull-sizing.md`).

## The gap, and the ticket floor

The comparison statistic is the **gap**: the subject's year-over-year change minus the simple average of a
group's changes, in points, judged as in a trend run of `setup-location.md` ("The gap and the normal
range"): the average gap, consistency (the share of periods the subject was ahead; ahead in roughly half is
**level**), and direction. Leave each venue out in turn; a claim that flips or halves without one is about
that venue.

- **The ticket floor.** A venue-quarter under a ticket floor, in either year of a year-over-year change, is
  left out of that venue's change. Set the floor from the probe, where small quarters start to swing the
  group average, and print it. The card floor in `setup-location.md` does not apply to ticket series.
- **Resale volume moves at every venue at once** when the exchange's own volume moves. Read gaps between
  venues, never a venue's ticket level or its own change on its own.
- **Event mix.** A quarter's price per ticket averages over whatever events it held, so it moves with the
  mix of games and shows as well as with demand. When a venue holds too few events a quarter for the mix to
  average out (the quarterly price gap swings by tens of points as one kind of event comes and goes),
  compare like for like instead: a tenant's games against the same league's games at group A venues,
  season against season, and each act against its own other shows (`loc-venue` steps 3 and 4). The
  quarterly totals then go to the method tab as checked and not used. *(On the stadium pilot, with 4 to 19
  events a quarter, the quarterly price gap swung by up to 75 points.)*

## The external level check

Before the venue's event count says anything about how busy the venue is, set it beside a published count
for the same venue and period (a year-end venue ranking, or the operator's filing where it reports the venue
alone). Under the corporate reader the check runs as a gate: it decides what may be claimed and is recorded
in one line on the method tab. If the published figure covers only one kind of event or a different
tracking period, the check is incomplete; say so, and keep every claim relative.

## What this subject cannot see

Say these in Gate 1 when the question needs them, as scope:

- **Attendance, primary ticket sales, face value and sell-outs.** Every ticket figure is resale.
- **Spending inside the venue or by visitors around it.** Card is located at the cardholder's home.
- **Independent businesses near the venue**: foot traffic covers chain brands only.
- **The venue's own buyers as a group**: overlap is reached through its tenants, not the venue.
