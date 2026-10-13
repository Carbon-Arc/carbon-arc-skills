# Setup: a place (a metro area and its economy)

Read during `ca-core` §2 when the subject is a place: a metro area read through the people who live there
and the locations inside it. It adds to the shared checklist; it does not replace it. Instrument notes are
in `instruments/metro-instruments.md`; read it before Gate 1.

Every id, route and threshold below is a **dated prior** from one pilot (a small mountain metro area after
a hurricane, Oct 2026). Re-survey live; read accepted resolutions off the response, never off this file.

## What this subject adds to the setup

- **The place**, resolved to its metro-area node (`cbsa` representation), with the counties it covers
  from a public source.
- **The kind of run**: an **event run** (a dated shock or change: a storm, a plant closure, a stadium
  opening, a policy) or a **trend run** (how the place is doing, with no single date). The kind decides
  how comparison metro areas are chosen.
- **The event and its dates**, for an event run: retrieved and cited, never from memory (`ca-core` §3).
- **Comparable metro areas**: three to five, chosen by the rule below and shown to the reader before
  anything is measured against them (`ca-core` gate 11).
- **Published local figures** the reader can check the panel against (lodging or sales tax, hotel
  occupancy, permits issued, unemployment): retrieved with a source, for the external level check.
- **For every dataset used, which side it sees** (residents or places) and the statistic it supports
  (`instruments/metro-instruments.md`).

## Resolve the place

- `search_entities` with `entity_representations: ["cbsa", "city", "dma"]`. The metro area (`cbsa`) is the
  unit; a `city` node is narrower and a media market (`dma`) wider. Use the metro area unless the reader
  asks otherwise, and say which.
- **There is no county node.** A county is built from its ZIP codes; say so if the reader asks for one.
- **A venue is not read here**: see `setup-venue.md`.
- `ontology` on the metro-area node lists the tearsheets attached to it. **That list is a floor here.**
  Foot traffic and vehicle registration were not attached to the node on the pilot, yet both reach the
  metro area through a category or brand entity filtered by `cbsa_name`. Survey both routes
  (`instruments/metro-instruments.md`).

## Choose comparable metro areas

**Event run.** The comparison metro areas must be places the event did not reach, and that is a
retrieved fact, not a judgment.

1. Retrieve the event's footprint from a public record: for a disaster, the federal declaration's
   designated counties **and** the counties adjoining them; for anything else, the area the source says it
   affected. Exclude every metro area that contains one of those counties.
2. From what remains, pick three to five metro areas similar to the subject in size and in what the
   economy rests on (tourism, a university, manufacturing). Include one from the same region where one
   survives the exclusion, so regional weather and calendar move both sides.
3. Show the list with one line each on why it is comparable and **the list of nearby metro areas left out
   and why**. A reader from the region will ask about the neighbors first.

**Trend run.** No footprint to exclude, so the choice comes from a published ranking, and **the ranking is
the one the question is about**. Always two groups plus the US as a baseline: one that shares what the
question is about, and one ordinary group of similar size that does not.

- **A growth question** ("is growth showing up?"): rank by Census population growth for metro areas within
  roughly half to double the subject's size. **Fast growers** are the three to four growing closest to the
  subject's pace ("is it keeping up with places like it?"); **steady metros** are two of similar size
  growing near the national pace ("is it growing faster than an ordinary place its size?").
- **A question about what the economy rests on** (visitors, a university, manufacturing): rank by that
  industry's share of jobs (BLS, on FRED) and take the four to six metro areas closest to the subject's
  share, **whatever their size**, because the gap is in points, not dollars. For the second group, take two
  metro areas of similar size and growth with a low share.

Add the US as a baseline. Leave out a neighbor that shares the subject's job market (it moves with the
subject), and a metro area whose growth has a different driver (for example, a retiree destination); say
which were left out and why. Six comparison metro areas is fine here; the three-to-five cap applies to
event runs.

## Grain and window

- **Monthly**, from at least 20 months before the event (or two full years for a trend run) to the latest
  complete month. Drop the current partial month everywhere.
- **Weekly, for a shock**: the subject's weekly series divided by one nearby comparison metro area's,
  indexed to the full weeks before the event (= 100). The ratio removes the calendar; one neighbor keeps it
  readable. Drop the first and last week of every weekly pull.
- **Quarterly** for permits, which fill in slowly, and **for every breadth read in a trend run**
  (categories, brand baskets, foot traffic). Monthly stays for the headline totals and for every event
  run, where the month of the event matters.
- **Size every pull before sending it** (`carbonarc-mcp` `references/pull-sizing.md`): two metro areas at
  monthly grain over 45 months is about 90 rows; batch the comparison set two at a time.

## The gap and the normal range

The comparison statistic is the **gap**: the subject's year-over-year change minus the simple average of
the comparison metro areas' changes, in points. Dollar levels are never compared across places.

**Event run: every series gets its normal range** before any claim: the lowest and highest monthly gap
in the months before the event. **A gap inside the normal range is not a change**, however it looks on a
chart. *(On the pilot this stopped two overclaims: a "rise" in residents'
spending of +2.1 points against a normal range of −1.4 to +2.3, and a category whose range ran from −28 to
+80.)*

**Trend run: there is no before and after, so a gap is judged on three things**, all reported:

1. **The average gap** over the window.
2. **Consistency**: the share of months (or quarters) the subject was ahead. Ahead in roughly half the
   periods is **level**, whatever the average says.
3. **Direction**: the average gap in the first half of the window against the second half (widening or
   narrowing).

*(On the growth pilot, consistency separated "keeps pace" (ahead in 45% to 61% of months) from "pulls
ahead" (91% to 97%).)* The leave-one-out check below applies to both kinds of run.

Then the decomposition (`carbonarc-mcp` non-negotiable 13), on every claim that ships:

- **Leave one comparison metro area out**, in turn. A claim that flips or halves without one of them is
  about that metro area: drop it or say so.
- **One month cannot carry a window average.** A rebound month a year after the event (the comparison is
  against the event month) is excluded from any average that spans it, and said.

## The external level check

**Before a place-side dataset says anything about size, test it against a published local figure for the
same place and months.** Set them side by side on the method page or in the tab.

- If the panel matches direction and timing but not size, it reads **timing only**: when things moved and
  for how long, never how much. *(On the pilot, visits per hotel location fell 12% year over year in the
  month lodging tax revenue fell 45%; the series kept its place as a timing read and lost every size
  claim.)*
- If it contradicts direction, drop it for that question.
- If no published figure exists, say the size is untested.

## Category reads and the brand basket

Residents' spending by category (grocery, home improvement and so on) comes from a category entity filtered
to the metro area. Before any category gap:

1. **Break check.** Compute the category's year-over-year change in every metro area, subject and
   comparisons. **A break is a jump of the same sign in most metro areas in the same month (or quarter)
   that reverses twelve months later**, when the jump drops out of the year-over-year comparison. That
   pattern is a one-time change in how the data counts the category, not demand. A same-sign move that
   does not reverse a year later can be a real national trend (in a trend run it often is); it is not a
   break, and it cancels in the gap. The category cannot be compared across a break. Breaks hit places
   unequally, so one or two metro areas that barely move do not clear the category. **A category with a
   known break in `data-state.md` is treated as broken across those dates whatever this test shows.**
2. **When a category breaks, build it from brands** (`carbonarc-mcp` `references/data-state.md`, "Category
   breaks"). Do not just drop it.
3. **Volume floor**: a category under roughly $50K a month in the smallest comparison metro area is too
   thin to read at monthly grain; name it as too thin.

## What this subject cannot see

Say these in Gate 1 when the question needs them, as scope, not as gaps in the run:

- **Visitors' spending inside the place, and visitor counts.** Card data records the merchant's location
  only in bulk files the MCP does not reach; through the MCP, card is located at the cardholder's home. No
  reachable dataset counts visitors, room nights or air passengers; those come from the tourism authority
  and are public data in the report. Card spending tagged to individual resorts or attractions (a brand
  that exists only in the place) looks like a way in; test it with one probe before promising it.
- Hotel occupancy, unemployment, population and migration, and home prices at metro grain.
- Closures: the foot traffic location list does not drop closed places.
