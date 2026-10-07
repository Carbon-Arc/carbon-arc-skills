# Comparable businesses: national brands that stand in for a business the data cannot see

A small business usually does not resolve in the ontology, and neither do its local competitors. **A
national brand in the same line of business does.** A brand entity is merchant-side by construction: its
card spend is spend *at* that business, which is the property the local card read lacks (its geography is
the cardholder's home). That is why comparable brands can show what a business of this type experiences
(direction, purchases versus ticket, online share, who the customer is) when nothing local can.

In client text these are **businesses like yours** or **comparable businesses**, never *analogs*.

## 1. Let the ontology enumerate the candidates; never work from memory

**This step is what makes the method work in a vertical nobody prepared for.** A list recalled from
memory is only as good as what the model happens to know, and fails silently in unfamiliar verticals.

1. **Find every category node.** `search_entities` with `entity_representations: "category"`, using the
   business's own description in plain words. Expect several nodes and take them all; verticals split
   across the ontology unpredictably, and some sit under industrials rather than consumer. *(On an
   auto-services example: car wash, auto repair, repair and maintenance, and towing, four nodes.)*
2. **Enumerate the brands in each node** with `ontology`: *"What service brands are in the <category>
   category?"* Vary *service* / *retailer* / *product* to match the vertical, and read
   `entity_resolution_metadata` to confirm which node it resolved to.
3. **Screen the list, in this order:** drop mis-tags (category lists carry obvious errors, a pizza chain
   inside fitness centers, for example); drop single-market brands, which carry their own market's quirks;
   then rank by comparability (§2), not by size or category label.

Retrieved sources (trade press, the owner's own description of its competition, a parent company's brand
pages) characterize candidates the ontology produced; they never add candidates from nowhere.

## 2. Rank by how the business makes money, not by category

Two businesses in one category can have opposite years; two in different categories can share one. Write
the owner's business down against these six first, then rank candidates; higher attributes dominate.

1. **Purchase trigger.** Planned or special-occasion versus routine or habitual versus can't-be-put-off.
   This is the strongest single determinant of the shape of the year.
2. **Revenue model.** Transactional versus membership or recurring versus contract; one line of business
   or several. Easy to miss and decisive: a membership business bills evenly even when use is seasonal, so
   its card line is nearly flat and is not comparable to a transactional one.
3. **Customer origin.** Visitor versus resident versus commuter versus member.
4. **Setting.** Resort, mall, strip center, highway, downtown, campus, medical park, residential.
5. **Price tier**, and whether a purchase is one transaction or a course of them.
6. **Category**, last.

## 3. Confirm rows, not just coverage

Test coverage cheaply with `get_filter_options` on 626 for each candidate, then size the survivors with
one batched quarterly pull. **A brand that passes the filter check can still return no rows**, and in a
batched pull it simply vanishes without an error. Read which brands came back before building on them;
one that vanished is not a comparable.

## 4. Validate a comparable before leaning on it

- **Thickness**: enough monthly volume that the series is not noise; judge from the series itself.
- **Footprint breaks**: a step of tens of percent is usually closures, an acquisition or a divestiture,
  not demand. Retrieve the cause. A brand mid-restructuring is a cautionary comparison, not a demand one.
- **Panel breaks**: a step that appears in several unrelated brands at once is the panel.
- **Does its driver exist at this business?** Mall or airport exposure, a loyalty relaunch, a national
  ad cycle: if the mechanism behind its trend is absent here, it is context, not a comparable.

## 5. How to read them

- **Shape and direction only, never level.** A national chain's ticket, sales or spend per location is not
  a benchmark for one business, and a caveat does not rescue a chart that invites the comparison.
- **Two comparables minimum, and agreement is the evidence.** One brand's line is that brand's line.
  Publish a pattern only where two or more show it independently; where they diverge, the divergence is
  the finding. Do not average it away. Aim for four to six where they resolve.
- **Year over year against a zero line, never an indexed level** in a seasonal business: an index shows
  the season and hides the direction.
- **Split sales into purchases and ticket** over the same months in every year. Spend alone hides the
  story.
- **Count the periods, don't just total them.** "Negative in all ten quarters" is stronger and more robust
  than a three-year percentage.
- **Is it getting better or worse, and are they converging?** Compare the latest three periods with the
  first three, and the spread across the set at each end.
- **Look for the one doing the opposite.** A set that all moved together says a strategy is universal; one
  that diverged shows what happens at the edges. *(On a waterfront hospitality example, the brand that cut
  ticket hardest lost a third of its sales, which said more than the four that raised prices.)*

## 6. What comparables deliver, and what they cannot

| Read | Why it transfers |
|---|---|
| Direction, and whether the decline is easing | Shared by businesses of this type |
| Purchases versus ticket | The sector's pricing strategy and its cost in visits |
| Online share of purchases (`transaction_method`, with its known misclassification) | Whether this type of business earns online sales at all |
| Who the customer is (age groups, adjusted) | Who uses this format nationally |

They cannot tell the owner anything about its own performance, its local market's level, or its unit
economics (rent, labor model, buying power all differ between a chain and an independent), and they offer
no absolute benchmark for sales, ticket or volume. Say so on the comparables page.
