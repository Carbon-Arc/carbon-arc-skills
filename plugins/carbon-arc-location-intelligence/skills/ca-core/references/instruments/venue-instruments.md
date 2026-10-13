# Venue instruments: what reaches a venue, how, and what it supports

Read before Gate 1 on a venue run. Dated priors from two pilots (an arena and a stadium, Oct 2026): every route below was confirmed
by a call that returned rows, and **only a returned row confirms a route**. Before declaring any route dead,
vary each parameter once (`carbonarc-mcp` `references/troubleshooting.md`).

**Check the resale panel is live before using it.** Two resale families exist. On the pilot, "Secondary
Market Ticket Sales – US" was updating; its sibling "Secondary Market Ticket Sales and Listings" (the
dynamic-price family) was marked historic as of Sep 2026. Read the tearsheet in `data_library` on every
run: a frozen panel is history only, never the spine.

| Dataset (catalog name) | Side | Route | Supports | Does not support |
|---|---|---|---|---|
| Secondary Market Ticket Sales – US, by location: tickets sold, order value, event count (651, 644, 656) | The venue | Venue node, `location_resolution: "venue"` (the only resolution it accepts) | Gaps between venues in price per ticket (order value ÷ tickets), tickets, events and tickets per event | Attendance, primary sales, face value, demand; a venue's ticket level on its own |
| Same, event as entity: order value, tickets sold (141201, 141213) | The venue, per show or game | Venue node, or no entity (all US) with the act's own parent event id for its other shows, with an `events` argument (`carbonarc-mcp` Part A, the one exception). **Concerts**: Entity Events, the concert category. **Regular-season games**: Entity Events, the sports-matchup category, filed under the home team. Read both category ids and labels from `get_events_from_insight` | Which shows and games drove a month; the same act at this venue against its other US shows; a tenant's home games against its away games | A concert/sports mix for periods the series does not cover (no rows before 2024 on the pilot); shows with no resale sales (the series holds only those); a tenant whose games return no rows in the category (check each tenant before promising a tab: on the stadium pilot, soccer games and a World Cup were absent, the World Cup from the venue's totals too) |
| Same, industry parent event: order value, tickets sold (185310, 185323) | The venue, per postseason game | One of two routes for postseason games; check both. Here: `events` naming one parent event (a playoff round), Industry Events. The other: the sports-matchup category above, with rows named by round (for example "Wild Card Home Game"). Either way rows name the round and venue, not the team | A tenant's postseason home games, matched to the public schedule by date and venue | Games scheduled but not played (they can carry sales): drop them against the schedule |
| Same, by team: tickets sold, order value (267, 265) | The venue, home games | Team node, `location_resolution` `us` or `dma` (`venue` returns an error) | A tenant's home-game resale volume and price, including leagues the matchup category does not hold | Away games: on the stadium pilot the totals equaled the home games' sum, so this is not an away route |
| Ticket-buyer overlap (209698 nPMI, with shared shoppers) | Buyers | **Team or artist node only**, `location_resolution: "country"`, `aggregate: "mean"`, quarter or year | Who a tenant's buyers also buy for, pooled over years, as a rank with shared-shopper counts printed | The venue's own buyers (the venue node accepts no shape); trends (counts shrink with the panel; no value under 11 appears) |
| Foot Traffic: visits, store count (45862, 45863) | The blocks around it | **The ZIP node directly**. The `zip_code` filter on a category entity lists but returns nothing | Visits per location, ZIP against ZIP; event days against same-weekday days without an event | Independent businesses (chain brands only); size, until checked against a published local count; sharp one-day effects (the series is normalized for seasonality, weather and holidays, which may damp them) |
| Credit Card – US Complete Panel (626, 627) and Constant Shopper (765) | Residents nearby | ZIP node, `location_resolution: "zip"`; category entity + `zip_code` filter for categories | Residents of the venue's ZIP against residents of comparison venues' ZIPs, after the card floor | Spending at or around the venue |
| Housing Permits (308) | The blocks around it | ZIP node | Each ZIP against its own history, only if records do not grow every quarter | The Census check (Census does not publish permits by ZIP) |
| Rising Artists Ticket Listings (593, 594, 595) | | Attached to the venue node in the catalog | | No route returned rows at venue, point of interest, media market or US |

## Event rows: shared rules

Finding an act's parent events, reading the rows, the schedule match and the nesting check are in
`carbonarc-mcp` `references/event-rows.md`. For a venue, the nesting check runs the event rows (concerts,
games, postseason) for a month against the by-location series for that month, before either is used for
a mix; if they do not nest, use neither for a mix and say so.
