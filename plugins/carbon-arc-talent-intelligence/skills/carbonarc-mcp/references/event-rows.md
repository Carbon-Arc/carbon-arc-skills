# Event rows: finding, reading and checking them

Read before the first event-as-entity pull (Part A, "One exception") and again when its rows return. These
rules hold whatever the subject is: an artist's shows, a venue's calendar, a team's games. The setup file
that names the cut says which categories and nodes its subject uses.

## Finding an act's parent events

- `get_events_from_insight` with the category's `event_type` and a large `limit` (40000) returns the whole
  listing for that type, free. It is too large to read: it lands in a tool-results file. Search it with
  `jq` for the act's name, case-insensitive.
- **Every label containing the name is a candidate, and the label is not the authority.** Many parent
  events are named for the whole bill: some headliners have no parent event under their own name at all,
  only one per bill ("<act>, <opener> & <opener>"); others sit under a festival or radio bill, or appear
  as the opener on another act's tour. Collect every label containing the name, then let the schedule
  match decide (below): keep a row only where the published schedule shows the act **headlining** that
  date, whatever the label says. A co-headline or support date is kept only if the question is about that
  bill, and said so: its prices belong to the whole bill.
- **An act can be missing from the event rows entirely**, even with thick resale in its own total series.
  Before promising a show-level read, confirm rows exist for at least one published date: the act's node
  with the category, then its parent event ids, then one venue call on a published date (a call expected
  to return rows). Coverage is "N of M published dates"; zero is a finding, stated in the method notes.

## Reading the rows

- **One row per show**, whatever the date grain. The event name holds the act, the venue and the show
  date (`<act> at <venue> | <YYYY-MM-DD>`), and the act or venue can itself contain the separator: keep
  the leading fields and the last field, and join the rest. At day grain the row's date is the show date;
  at month or quarter grain it is the period end, so take the show date from the name.
- **Columns differ by call.** The same pull on two acts can return different column sets (one with the
  event name, one without). Check the columns before joining; join two insights on show date plus market
  (or plus venue), never on row order.
- **Future shows carry rows.** A show that has not happened yet is still collecting resale sales. Drop
  rows dated after the data's last refresh, or compare shows only at the same days before the show.
- **The date filter works even when the echo says it did not.** `filters.filters.start_date` /
  `end_date` are applied although the response's echoed request shows `filters: {}`. A `date_range` key
  is not read: it triggers the server's default window.

## The schedule match: every row against a published schedule

Before any row carries a claim, match it to the act's or venue's published schedule by date and city.

- **Drop a row with no published date.** A show or game that was scheduled and then canceled, moved or
  never played can still carry sales.
- **Take the venue name from the schedule, not the row.** Row venue names can be old (a renamed arena) or
  wrong (a hall next to a ballpark filed under the ballpark's name). Put the row's own name in the method
  notes when they differ.
- **State coverage**: "N of M published shows". Published dates with no row are listed, and kept out of
  every ranking.

## The nesting check

Show rows and the matching total series (by artist, by venue, by team) come from the same panel. For each
month of shows, **the rows must sum to no more than the total**; the remainder is shows or events with
no row of their own. If they do not nest, use the rows for nothing and say so. Never present summed rows
as the subject's total.
