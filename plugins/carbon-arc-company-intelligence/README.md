# Carbon Arc Company Intelligence

Two reports on a company, each one you can send on: **where it stands against its competitors**, for the
company's own strategy or analytics team, and **what a listed company's quarter is tracking at before it
reports**, for an analyst covering it. Each run builds one of them.

| | Skill | The question |
|---|---|---|
| | `company-onboarding` | Start here. What this is, which report you want, and how to begin. |
| | `company-insights-report` | Where does the company stand? One report covering the five workflows below. |
| | `company-earnings-preview` | What is the quarter tracking at? The full pre-print preview for one ticker. |

**In the insights report**

| | Skill | The question |
|---|---|---|
| 1 | `ca-competitive-set` | Where else do our customers spend? |
| 2 | `ca-benchmark` | Is this us or the category? |
| 3 | `ca-audience` | Which customers are we losing? |
| 4 | `ca-events` | What did an event actually do? |
| 5 | `ca-execution` | Who is winning, and what is behind it? |

**In the earnings preview**

| | Skill | The question |
|---|---|---|
| 1 | `equity-backtest` | Can we trust the panel on this company, and what is the quarter tracking at? |
| 2 | `equity-quarter` | What happened in the quarter, and what drove it? |
| 3 | `ca-benchmark` | Is it the company or the category? |
| 4 | `ca-competitive-set` | Are the same customers shopping elsewhere? |
| 5 | `ca-cross-signal` | Do the other datasets agree? |
| 6 | `equity-next-quarter` | Is the trend a one-off? (with two or more settled weeks of the next quarter) |
| | `ca-events` | What did a dated event actually do? |

`ca-core` sits underneath all of them and is not run directly. It holds the run setup checklist, the
evidence gates, the client-facing voice and the per-instrument method.

## The principles

**Insights report: you already have better data about yourself than any panel will ever have.** Every
workflow points outward: competitors, the customers you share with them, the category, and the events you
did not run.

**Earnings preview: what is the quarter actually tracking at, and has the panel earned the right to say?** Every estimate is
scored against the company's own reported history before it is shown, and ships with the band that track
record earned. There is no comparison with street consensus: the backtest is the credibility. Where the
panel does not track a company, no estimate appears, and everything else still ships.

**In the preview, claims are about the data, never about the security.** No recommendations, price targets or positioning.

## Skills are just files

Every skill is a `.md` file. Read them, change them, add your own. If you write something good, send it
back.

## What you need

- The **Carbon Arc MCP**, connected in Claude before you install. Contact your Carbon Arc representative
  for access.
- **Web search and fetch**, used to check every claim against what companies have publicly reported, and
  for filings, releases, fiscal calendars and guidance. It is a gate, not a nicety.
- **A shell with Python 3**, for the backtest script and the two verification scripts. Without them they silently do not run, and
  they have already caught a font failure, two British spellings and an em dash.

## Connect Carbon Arc

The plugin ships no MCP configuration and no API key. Its skills use the Carbon Arc connection you
already have in Claude, and every query is billed to the account you sign in with.

1. **Connect Carbon Arc first.** In the Claude app, add the Carbon Arc connector and sign in.
2. **Claude Code without a claude.ai login:** run this once, then sign in when the browser opens.

   ```bash
   claude mcp add --transport http carbon-arc https://mcp.carbonarc.co
   ```

Installing, updating and everything else: [docs.carbonarc.ai/tutorials/carbon-arc-skills](https://docs.carbonarc.ai/tutorials/carbon-arc-skills).

## Layout

```
.claude-plugin/plugin.json     plugin manifest
skills/
  ca-core/                     setup checklist · gates · voice · instrument method
    references/                readers/ (corporate, investor) · subject setups · gating · defect detection · build notes · instruments/
    scripts/                   verify_report.py · verify_build.py
  company-onboarding/          orientation, no queries; picks the report
  company-insights-report/     orchestrator: the company's position (reader: corporate)
  company-earnings-preview/    orchestrator: the quarter (reader: investor)
  ca-competitive-set/ ca-benchmark/ ca-audience/ ca-events/ ca-execution/ ca-cross-signal/
  equity-backtest/ equity-quarter/ equity-next-quarter/
  carbonarc-mcp/               the four gates, playbook, non-negotiables
    references/                pull sizing · response handling · troubleshooting · data state
  carbon-arc-report-v2/        the build system, fonts and chart engine
```

This plugin is assembled from Carbon Arc's shared skill library. `carbonarc-mcp`, `carbon-arc-report-v2`,
`ca-core` and the workflows are shared with other Carbon Arc packages. Each report reads one reader file:
`readers/corporate.md` for the insights report, `readers/investor.md` for the earnings preview.

## Status

**v1 covers own-merchant brands** — companies whose customers pay them directly. Brands sold mainly
through other people's stores are detected on the first pull and routed to a human, because card sees the
retailer rather than the product.

Piloted end to end on a restaurant. Beauty, CPG and retailer-mediated categories are designed for and
not yet validated.

**Earnings preview:** Method validated across six end-to-end previews (restaurants, mass and off-price retail, e-commerce, home
furnishings), Aug 2026. Works on consumer companies whose demand is visible in card spend; franchisors,
wholesale consumer goods and B2B names are scoped out at the first step. Not yet run inside this package.

## Disclaimer

**Disclaimer:** Carbon Arc Skills are a series of markdown files designed to be used with AI tools and Carbon Arc's MCP Server. Skills output may contain errors or inaccuracies, should not be solely relied upon, and do not constitute financial advice. Carbon Arc cannot guarantee that data assets or information featured in Skills will be available to any particular user via Carbon Arc's platform. Use of Skills will result in Carbon Arc MCP Tokens being consumed as data is queried. By making this repository publicly available, Carbon Arc does not grant any license to its name or intellectual property, nor any license to Carbon Arc's data, platform, or MCP Server. Use of Carbon Arc's data, platform, or MCP Server requires a separate agreement with Carbon Arc. Modified versions of Skills are not endorsed or reviewed by Carbon Arc.
