# Category markets: geography, recovery, leading signals, demand against supply

Treat these call shapes as starting points: confirm each id live, and read accepted resolutions off each response.

## Resident demand

**The card panel's geography is the cardholder's home, not the merchant's location.** A state or metro
cut of category spend is what residents of that place spent in the category, wherever they spent it.

- It is the right read of **demand in a market**, and the right input to "where are the shoppers".
- It is never a store's sales, a trade area's sales, or the business's sales in that market.
- A business near a metro boundary draws from residents of more than one; say so where it matters.

Wording on every chart: *shoppers living in [market]*.

## Grain

*(Oct 2026, a home-and-auto pilot:)* a mid-size metro's dealership and auto-repair card spend came to a few
thousand dollars a quarter, far below any floor. Expect metro card reads to fail for big-ticket
categories and plan the local read on an instrument that counts units (registrations, permits).

Category nodes ran at `state`, `cbsa` and `dma`, not `zip` (Oct 2026). Start at state; go to metro only
where each metro clears the volume floor on the measure being ranked, and print `n`. A metro under the
floor is named as too thin, never silently dropped. Say *metro area*, never the code name for it.

## A market's share of its own wallet

Raw category spend by market ranks population, not demand. To compare markets, divide the category by a
**broader node on the same insight, same geography and same grain** (for example the category over all
retail spend by the same residents). Both terms from one pull family, so the quotient is a rate. Probe
that the broader node runs at the geography first; if it does not, rank on growth only and say so.

## Recovery

Defined in `ca-markets` step 2: trough of the trailing three-month year-over-year, latest reading, and
the two-year stack. Two more rules:

- **Read each market against the country over the same months.** A market whose recovery matches the
  national path is not recovering first; it is the country.
- **Weather and storms are market events.** A hurricane, freeze or hail season produces a repair spike
  that looks like recovery and then reverses. Search each leading market's window for one before naming
  it a leader (`ca-core` §3, unpredicted-finding sweep).

## Signals that lead

Each is a candidate with a predicted observable, read as its own trend or rank beside category demand.
**None is ever divided into card spend.**

| Signal | Instrument (Oct 2026 prior) | Notes |
|---|---|---|
| Vehicle sales, new and used | **Vehicle Registration**, on `vehiclemake`, `vehiclemodel`, `country`, `state`, `dma` or `zip` entities; filter for new or used; **month grain only**; history from 2022 | Counts vehicles, not households or buyers. Month grain. Read same months year over year, or half against half where the history is short. A tearsheet labelled "new registration" carried a used value too, so check both values return before splitting |
| Building and renovation activity | **Building permits** (count, job value, fees) | Counts permit records, which can be many per project; never call them homes or jobs. Trend and rank only. Check which geographies execute before planning around them |
| Local wages and hiring | **SMB Workforce** wages by geography and industry; **Job Openings** on retailers | Wage growth is a ratio within one dataset and survives panel growth; worker counts do not |
| Housing | **Housing Indicator** (national series: new-home sales, starts, permits, completions, months' supply) | National only in discovery, so it frames the national path, not a market rank. No existing-home sales or mortgage-rate series was found; retrieve those from public sources as ▲ context if a claim needs them |

## Demand against supply

The location question needs two things the panel holds in different datasets, so they are shown **side
by side as ranks, never divided**:

- **Demand**: the market's category share of its own wallet (above), and its growth.
- **Supply**: category locations in the market from the foot traffic instrument's location list where it
  runs on the category at that geography, or the named members' store counts from research.
  **Always pull the location count with any foot traffic figure**: a visit trend can be nothing but the
  location list growing or freezing.

Markets where demand ranks well above supply are named. The caption says *a ranking of observed demand,
not a site recommendation*.
