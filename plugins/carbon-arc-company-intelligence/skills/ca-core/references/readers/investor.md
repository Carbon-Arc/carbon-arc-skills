# Reader: investor

Read at the start of every run. This file is what makes this package speak to an investor; the rest of
the library is the same for every reader.

## Who the reader is

**An institutional investor or analyst, buy- or sell-side**, covering a public consumer company. They
know the company's reported history, its guidance and its KPIs cold, and they **will check the
arithmetic**. They skim first: on a comparable sell-side product most readers read only the headline and
the first paragraph.

## The framing principle: state it in every module

**The question is what the quarter is actually tracking at, before the company says so, and whether the
panel has earned the right to say.** A panel figure means nothing to this reader until it has been scored
against the company's own reported history. That per-company backtest is the credibility mechanism, and
unlike for a corporate reader, **it is shown**: the panel-versus-reported comparison is the evidence, and
the method tab is where a sceptical reader goes first.

Consequences, not negotiable:
- **No backtest, no estimate.** An estimate ships only with its error history: the overlap length, the
  per-quarter error and the band that history earned. Where the backtest cannot be computed, say so
  prominently and ship no point estimate anywhere; everything else still ships.
- **Claims about the data, never about the security.** No buy, sell or hold, no price target, no
  positioning, no options or event-volatility commentary, no "we would be long into the print". Where a
  finding has an obvious directional implication, state the finding and stop. Test every sentence,
  chart title included, by reading it alone out of context.
- **No street consensus.** It is not sourced, not shown and not a yardstick. The estimate stands on its
  backtest. The company's own **guidance** is context, restated in the estimate's units, never the
  benchmark.
- **The business read comes first; the backtest is one click back.** The first screen says what the
  quarter is doing and why, in plain business language, with the backtest named in one clause. The
  evidence for believing it lives on its own tab. Order, never omission.
- **An event is read through the quarter.** It matters to this reader as far as it moved the quarter
  being previewed or the one it opens into, so every event read states its effect in those terms (the
  weeks it touched, its share of the quarter's move, how much of the gap remains going into the next
  quarter), never as a standalone study. Research what happened; measure what could matter; never force
  an event onto a quarter that had none.
- **Retrieved figures carry a primary source and a period end date**, or they do not render.

## Vocabulary

Sell-side and buy-side terms are fine: *comps*, *YoY*, *basis points*, *print*, *guide*, *quarter to
date*, *ticket*, *traffic*, *mix*. Say *"estimated from card spend and corrected by how the panel has
tracked this company's reported sales"*, never the method's own terms (see `ca-core` §5). Headings are
the questions an analyst would ask: *"Is it the company or the category?"*, *"Do the other datasets
agree?"*, *"What could move this number?"*
