# Carbon Arc Company Intelligence

Three reports, each one you can send on: **where a company stands against its competitors**, for the
company's own strategy or analytics team; **what a listed company's quarter is tracking at before it
reports**, for an analyst covering it; and **how the category and markets around a small or regional
business are doing**, for that business's leadership. Each run builds one of them.

| | Skill | The question |
|---|---|---|
| | `company-onboarding` | Start here. What this is, which report you want, and how to begin. |
| | `company-insights-report` | Where does the company stand? One report covering the five workflows below. |
| | `company-earnings-preview` | What is the quarter tracking at? The full pre-print preview for one ticker. |
| | `smb-category-report` | How are my category and my markets doing? One report for a small or regional business. |

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

**In the SMB category report**

| | Skill | The question |
|---|---|---|
| 1 | `ca-category` | Is it everyone, or just me? How are businesses like mine doing, and is it fewer purchases or smaller ones? |
| 2 | `ca-macro` | Is the shopper behind the category getting stronger or weaker, and are big-ticket purchases being put off? |
| 3 | `ca-markets` | How is the market around me doing, and which nearby markets are coming back first? |
| 4 | `ca-local-costs` | Is my cost pressure local, or everywhere? |
| 5 | `ca-events` | What did a dated event or promotion actually do? |

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
`readers/corporate.md` for the insights report, `readers/investor.md` for the earnings preview,
`readers/smb-owner.md` for the SMB category report.

## What each report covers

**Insights report:** companies whose customers pay them directly. A brand sold mainly through other
companies' stores is recognized on the first pull and the run stops there, because card spend shows the
store, not the product.

**Earnings preview:** listed consumer companies whose demand shows up in card spend, one ticker per run.
Franchisors, wholesale consumer goods and B2B companies are recognized at the first step and the preview
stops there.

**SMB category report:** a small or regional business that does not appear in the data by name, or a
franchisee of a brand that does. A business the data can see gets the insights report instead.

## Disclaimer

**Disclaimer:** Carbon Arc Skills are a series of markdown files designed to be used with AI tools and Carbon Arc's MCP Server. Skills output may contain errors or inaccuracies, should not be solely relied upon, and do not constitute financial advice. Carbon Arc cannot guarantee that data assets or information featured in Skills will be available to any particular user via Carbon Arc's platform. Use of Skills will result in Carbon Arc MCP Tokens being consumed as data is queried. By making this repository publicly available, Carbon Arc does not grant any license to its name or intellectual property, nor any license to Carbon Arc's data, platform, or MCP Server. Use of Carbon Arc's data, platform, or MCP Server requires a separate agreement with Carbon Arc. Modified versions of Skills are not endorsed or reviewed by Carbon Arc.
