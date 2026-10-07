# Category card reads: the node, its members, share and tender

Treat these call shapes as starting points: re-confirm every id with `get_insights_from_entity` at
`limit=250` on the node in front of you.

## The category node

**626 (spend) and 627 (transactions)** run on retail `category` nodes. `aggregate: "sum"`.

| `location_resolution` | On a category node (Oct 2026) |
|---|---|
| `us` | runs |
| `state`, `cbsa`, `dma` | run |
| `zip` | **failed** at month and quarter grain |
| unset | errors |

Ticket is `626 / 627`, never 629 (`card-core.md`). The transaction-method split on 627 applies here too
(`carbonarc-mcp/references/data-state.md`).

**When the category node carries spend only**, sum the named members' 627 for the volume read and say
the decomposition covers the named members, not the node.

**Constant-shopper cuts (765-768)** were attached to the category nodes surveyed. Where the read is a
long trend, pull the constant-shopper version beside the complete panel: a move present in both is not
panel growth.

## Window

Big-ticket categories (furniture, appliances, vehicles, home improvement projects) run on multi-year
replacement and housing cycles. **Default to 36 months**, and extend before any structural claim. A
two-year window can call a cycle a trend.

## Read the members

Ask which brands the category holds (the ontology answers "which brands are in this category" with
names and ids). Then:

1. Compare the list with the competitors the business named. A declared rival outside the node is still
   benchmarked; a node member the business never mentioned is a finding.
2. Rank members by spend on the latest settled half and volume-gate the ranking (`gating.md` §1).
3. **Decompose any member above ~50% of the members' total** (`card-core.md` §1): a category dominated
   by one chain is that chain wearing the category's name.

## When the node breaks: build the category from its top brands

A category node's membership is a tag, and tags change without warning: a large merchant drops out or a
new one is folded in, and the node's spend steps by tens of percent in one month while its members' own
spend does not move. When the defect sweep (`ca-core/references/defect-detection.md`) finds a step like
that, or the members show the node is contaminated, **read the category from its top named brands
instead of the node**:

1. **Rank candidates on one pull.** The node's members plus any well-known brand in the category that
   resolves outside it, spend (626) on the latest four complete quarters, one call. Representations may be
   mixed in the call. Drop candidates that return nothing.
2. **Take the top three to five** by spend. Exclude any brand that mainly sells something else (a parts
   retailer inside a repair category, for example).
3. **Check each brand for its own breaks** before summing: a single brand can step too. Start every
   comparison after the latest step.
4. **Check the build against the node before the break**: the summed brands should move with the node over
   the months before the node broke. If they do not, say so and read the brands as named chains only.
5. **Sum spend and transactions across the brands, then divide**, so ticket is a true ratio.

Label it on every chart as the named brands ("three national chains"), never as the category, and say
once on Sources & method why the node was not used. *(Oct 2026, on the auto-repair node: the node fell 45%
in two months from a tagging change; the top three national repair brands were flat over the same
months and carried the read.)*

## Share of category

`member spend / sum of members' spend`, from **one pull**. The category node's own total is not the
members' sum unless shown to be, so never divide a member by the node (`ca-core` gate 10). Read share
movement in **rank and percentage points over a same-season window**, and run the drift check before
calling a move (`gating.md` §3).

**Share of wallet (154397) and the cross-shop family attach to top-level categories and to retailers,
not to retail sub-categories** (Oct 2026). For a sub-category, wallet share across the neighborhood is
built from 626 on each neighbor node in one pull, as `ca-category` step 5 does.

## Tender: the payment-method panel

**630** (the complete panel by payment method) carries a payment-method field whose values included
buy-now-pay-later providers, digital wallets and card networks (Oct 2026, on a home improvement node at
`state`; `us` failed). Within that one insight, a provider's share of the category's spend is a rate.

- **Probe before relying on it.** `transaction_method` on the same family has had the wrong sign against
  disclosure (`card-core.md`, Traps). Check that the provider list is stable across the window and that
  the shares sum sensibly before charting.
- It shows **third-party installment use** in a category. It does not show store-card or promotional
  financing, and it is never presented as any business's payment mix.

## The private-label card panel

A **private-label and co-brand card panel** (insights 231386-231389 core, 231390-231393 by payment
method; Oct 2026) was attached to a home improvement category node and a home improvement retailer. Its
tearsheet describes concentration in furniture, auto, electronics, HVAC and home improvement financing
programs, US level only, history from 2015.

- **Conditional.** Use it where the live survey attaches it to the node in front of you. Name it by the
  catalog name `data_library` returns, never by the issuer behind it.
- **Its own basis.** It is store-card spend, not all spend. Read its trend and its decomposition on their
  own; **never divide it into, or by, the general card panel** (`ca-core` gate 10). Two panels moving
  differently over the same weeks is reported as two lines, with the gap described, never as a ratio.
- Fields a promotion read would want (promotional term, sale or return flag, industry) were bulk-only in
  discovery, so they are out of reach; name them as a known gap in Sources & method.

## Web content (inventory and price listings)

Retailer and dealer listing feeds (vehicle inventories, parts catalogs, product listings) sit on the
**company** node, not the retailer banner, and are discoverable with `search_insights` on the domain term.
*(Oct 2026, on a used-vehicle retailer's inventory feed:)* the call **failed at `us` and `country` and
ran only at `location_resolution: "ww"`**; month grain came back as a written summary rather than rows,
and **quarter grain returned raw rows** split by a listing-status field. The tearsheet's history (2021)
was longer than what the insight returned (Apr 2024). Read history off the response, pull at quarter
first, and treat a listing feed as **one seller's inventory**, never the market.

## When the category node is not the category

A retail category node can hold members that are not that kind of store. *(Oct 2026, on the vehicle
dealership node: listing websites, a manufacturer's finance arm, truck and RV dealers, an auction house
and one miscoded pharmacy.)* Decompose the node into its members before reading it, and where
non-members carry material spend, read the category on the true members only and say so.
