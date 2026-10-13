# Reader: place analyst

Read at the start of every run. This file is what makes this package speak to someone analyzing a place
(a metro area and the economy inside it); the rest of the library is the same for every reader.

## Who the reader is

**An analyst whose subject is a place, not a company**: regional economic development, a chamber of
commerce or tourism authority, a city or county economist, or a market research team at a firm that
allocates by market. They know their metro area well, read charts comfortably, and will compare what they
see with published local figures they already hold (lodging tax, sales tax, unemployment, permits). They
see the whole conversation.

## The framing principle: state it in every module

**A place is read from two sides, and the report always says which side a figure comes from.**

- **Residents**: what the people who live in the metro area spend, wherever they spend it. Card data is
  located at the cardholder's home, so it measures residents, never the businesses in the area.
- **Places**: what happens at the locations inside the metro area: visits to its hotels, restaurants and
  stores, and permits filed for its buildings. These see visitors as well as residents.

The two sides answer different questions and often disagree, and the disagreement is often the finding
(on the hurricane pilot, residents' spending recovered in two weeks while visits per hotel stayed low for
most of ten months). Never let one side stand in for the other: a card figure is never "the local
economy", and a foot traffic figure is never "spending".

The questions this reader brings, and the module that answers each:

| The question | Module |
|---|---|
| How are the people who live here spending? | `loc-residents` |
| What are residents spending more and less on? | `loc-spending-mix` |
| Are people coming to the places here, and for how long did a slump last? | `loc-places` |
| How much is being built or repaired, and is it more than usual? | `loc-building` |

Consequences, not negotiable:

- **Every figure is relative.** The metro area is read against comparable metro areas and against its own
  history, never by its dollar level. Panel coverage differs by place, so a level compares panels, not
  economies. Say this once, in the method, not on every chart.
- **Name the side in every chart title or subcaption**: "residents of the metro area" or "locations in the
  metro area".
- **No forecasts and no recommendations.** The report does not say what the place should do, where to
  invest, or what next year will bring. It supplies evidence; the reader decides.
- **Published local figures are a check, not a source of claims.** Where the reader's own figure (lodging
  tax, sales tax) exists, set the panel beside it and say whether they agree; never re-derive the official
  figure from the panel.
- **No backtests in the deliverable.** There is no reported figure being reproduced. The external level
  check (`setup-location.md`) is a validation step, recorded on the method page.

## Vocabulary

Plain analytical English. *Metro area*, *residents*, *visitors*, *locations*, *year over year*,
*comparable metro areas*, *normal range*, *index* are fine. Say *comparable metro areas*, never *controls*
or *control group*; *gap to comparable metro areas*, never *diff-in-diff*; *normal range before the
event*, never *pre-period band*.

Also banned for this reader, on top of the shared list: *CBSA* and *MSA* (say *metro area*), *DMA* (say
*media market* if it must appear), *NAICS* (say the industry in words), *resident wallet* (say *what
people living here spend*), *catchment* (say *trade area*), *POI* (say *location*), and any insight
number, entity id or dataset code.
