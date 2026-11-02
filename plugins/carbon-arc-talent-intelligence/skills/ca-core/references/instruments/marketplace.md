# Marketplace sales — Amazon and TikTok Shop

Read whenever the data map puts a marketplace on the sales row (`setup-brand.md`, "The data map"),
typically for a brand sold through other companies' stores: card spend lands on the retailer, but where
the brand sells on Amazon or TikTok Shop the data names it, its revenue and its items sold.

| Dataset (source chip) | Topic | Revenue | Items sold | History, cadence, lag |
|---|---|---|---|---|
| Amazon Marketplace Intelligence | Amazon Product Sales – Core Panel | **225014** | **225017** | US, Mar 2024 on; weekly (Sun–Sat) and monthly; brand weeks land about 9 days after they close |
| TikTok Shop | TikTok Shop Product Sales – Core Panel | **57697** | **57698** | US from Jul 2023; daily; about 3 days' lag |

Also attached, for a specific question rather than the spine: Amazon sales **by seller** (225022) and
**by revenue type** (228913: sold by Amazon itself or by third-party sellers), and TikTok Shop sales **by
shop** (57699). Confirm the call shape on the first call of a run (`location_resolution` and the
resolutions the response lists); do not assume it from this file.

## What a marketplace series is, and is not

- **Both are modeled estimates** built by a vendor from public listings and sales signals. A level is an
  estimate: quote it as "estimated revenue on Amazon", never as the brand's sales. Growth, share of a peer
  set within one marketplace, and the shape of a series are the reads.
- **Each is one channel.** Neither is the brand's US sales, and neither sees the stores that stock it. Name
  the marketplace in every title, caption and sentence that carries a figure.
- **Never add the two marketplaces together, and never compute a share across them.** Two vendors and two
  methods: the sum is not a total and the quotient is not a mix (`ca-core` §4 rule 10). Show them side by
  side, each with its own peer share.

## Building the benchmark on it

- **Price is revenue ÷ items sold**, from the same pull. Do not use the average-price-per-listing insights
  (225011, 57236): a mean across listings breaks revenue = items × price, as the published average ticket
  does on card (`card-core.md`).
- **Peers are product brands on the same insight**, resolved and probed with the subject. A peer with no
  rows on a marketplace is absent there, not shrinking: say which marketplaces each peer appears on.
- **Share of the peer set, per marketplace.** Where the survey attaches a category node on the same
  insight, read the brand against it for "is it us or the category". Where it does not, the peer set is
  the market, and the caption says so.
- **Amazon history starts in March 2024**, so year-over-year starts in March 2025. Say where the window
  starts and why rather than cutting silently.

## Traps

- **The latest weeks can restate.** Compare the last two complete weeks with the run-rate before them,
  and cut where they fall away instead of reading the drop (the fill-lag check, `gating.md`).
- **TikTok Shop sellers rename and re-register their shops**, which makes a shop look new and its growth
  look unlimited. Build series on the product-brand topic (57697 / 57698), never the by-shop topic; use by
  shop only to name who sells the brand.
- **A new seller or a stock-out is a step, not demand.** A step in an Amazon series gets the defect sweep
  (`ca-core` §4 rule 9) and the by-seller cut before it is read as a change in demand.
- **Distribution moves marketplace share.** A launch at a large retailer can pull buyers off a
  marketplace with no sign of it in the data. Mark dated distribution changes on the chart (`ca-core` §4
  rule 14) and read marketplace share alongside them.
