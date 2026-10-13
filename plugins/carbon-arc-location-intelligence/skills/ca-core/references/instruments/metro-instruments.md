# Metro-area instruments: what reaches a metro area, how, and what it supports

Read before Gate 1 on a place run. Dated priors from one pilot (Oct 2026): every route below was confirmed
by a call that returned rows, but `get_filter_options` answered inconsistently for the same route with and
without `location_resolution`, so **only a returned row confirms a route**. Before declaring any route
dead, vary each parameter once (`carbonarc-mcp` `references/troubleshooting.md`).

| Dataset (catalog name) | Side | Route to the metro area | Supports | Does not support |
|---|---|---|---|---|
| Credit Card – US Complete Panel: spend, transactions (626, 627) | Residents | The metro-area node directly (`cbsa` entity, `location_resolution: "cbsa"`). Returns residents' total card spend. | Year-over-year and the gap; purchases and average purchase (spend ÷ transactions, one panel); weekly ratios | Dollar levels across places; anything about visitors |
| Same panel, Constant Shopper (765) | Residents | Metro-area node, **only with `location_resolution: "cbsa"` passed**: the filter lookup without it fails | Checking that panel churn is not driving a trend | |
| Same panel, cardholders (628) | Residents | Metro-area node; **always returns an online / in-person split, which cannot be added**; filter `transaction_method: ["Physical"]` | The growth split, on the in-person basis, **direction only** | Population or arrivals: the count falls everywhere as the panel's coverage shifts |
| Same panel, by category (626 on a `category` entity) | Residents | Category entity + `filters: {"cbsa_name": [...]}`. Confirmed on the pilot for grocery, home improvement, general merchandise, automotive, apparel, gas stations, drug stores, home furnishing, online retail and hotels | Category gaps after the break check | A category in its break window (`data-state.md`) |
| Same panel, by brand (626 on a `service`, `retailer` or `product` entity) | Residents | Brand entity + `cbsa_name` filter | Brand baskets that stand in for a broken category | Any single brand as "the category" |
| Foot Traffic: visits and store count (45862, 45863) | Places | Category entity + `cbsa_name` filter; not attached to the metro-area node. Store count takes `aggregate: "mean"` | **Visits per location only**, read for timing; never raw visits; never size until the external level check passes | Closures (the list never drops a closed place). Which kinds of place return enough visits, and which pass the external level check, differ by metro area: the series probe and the check decide, every run |
| Housing Permits: permit count (308) | Places | Metro-area node; `permit_classifier` filter for the type (re-roofing, demolition, new construction…) | **Only after the Census permits check passes** (`loc-building`; permit records doubled against a Census decline on the growth pilot). **Each place against its own history**, indexed to its pre-event quarters, at quarterly grain | Counts across places; homes (it counts permit records); the latest two quarters (slow fill) |
| SMB Workforce: wages, worker count (3741, 3744) | Places (employer) | Metro-area node | **Not read at metro grain by default**: comparison metro areas swung by tens of points year over year on all three place pilots (one swung −27% to +22% within a year; on the visitor-economy pilot the accommodation and food cut swung −28% to +26%). **When the reader asks for it anyway**, run the series probe for the subject and show its swing at Gate 3 before pulling the comparison metro areas; the industry cut (`naics_2`) does not steady it | Worker counts as employment (they track the panel's own growth) |
| Vehicle Registration (309) | Residents (registrant) | Not on the metro-area node; ZIP history starts in 2025 | Trend runs after 2025, as vehicles, never households | Any event before 2025 |
| Extreme Weather Data (wind) | Place | Metro-area node | Dating a wind event | Rain or floods (not in it); anything after Jun 2025 |

## Batching and response shapes

- **Two metro areas per monthly pull** (about 90 rows over 45 months). A pull can come back with an
  online / in-person split on some batches and not others; **sum the split before any arithmetic**
  (`data-state.md`).
- **A table without a `CBSA NAME` column cannot be split by metro area.** On the pilot one batch of two
  comparison metro areas came back merged into a single series; drop that batch and say how many comparison
  metro areas the read rests on.
- A weekly pull can run one week past the requested end date; drop that week with the partial ones.

## The size floor

At monthly grain, a metro-area series under roughly $50K a month (card) in the smallest comparison metro
area moved too much on the pilot to read. Check it at the series probe, before the full pull, and name any
series that fails it.
