# Carbon Arc Skills

Claude plugins that turn [Carbon Arc](https://carbonarc.co) data into finished reports. Each plugin is a
set of skills: Markdown instructions that tell Claude which Carbon Arc data to pull, which checks the
numbers must pass before they are shown, and how to build a report you can send on.

| Plugin | For | What it builds |
|---|---|---|
| **Carbon Arc Company Intelligence** (`carbon-arc-company-intelligence`) | A company's strategy or analytics team, and analysts covering listed consumer companies | An **insights report** on where a company stands against its competitors: where its customers also spend, whether a move is the company or the category, which customers it is losing, what an event did, and who is winning and why. And an **earnings preview** of a listed company's current quarter, scored against its own reported history. |
| **Carbon Arc Talent Intelligence** (`carbon-arc-talent-intelligence`) | Managers, agents and labels | A **talent brief** on a musician or actor: who they really compete with, whether their audience is growing against those peers, who the audience is, which brand partnerships are distinctively theirs, resale demand and, for actors, which titles carry them. |

Full documentation: [docs.carbonarc.ai/tutorials/carbon-arc-skills](https://docs.carbonarc.ai/tutorials/carbon-arc-skills).

## Before you install

- **A Carbon Arc account.** Contact your Carbon Arc representative for access.
- **A paid Claude plan**, using Cowork, Claude Code or the Claude app.
- **The Carbon Arc connector**, added and signed in. The plugins ship no MCP configuration and no API
  key; they use the connection you already have. In the Claude app, add the Carbon Arc connector and sign
  in. In Claude Code without a claude.ai login, run this once and sign in when the browser opens:

  ```bash
  claude mcp add --transport http carbon-arc https://mcp.carbonarc.co
  ```

- **Web search, and a shell with Python 3.** The skills check claims against public sources, and run
  small verification scripts on every report.

## Install

Install from the marketplace if you can. Marketplace installs update automatically when a new version
is released.

**Cowork:** Customize → Plugins → **+ Add** → Add marketplace → paste
`https://github.com/Carbon-Arc/carbon-arc-skills` → Sync → Discover → Add the plugin you want.

**Claude Code:**

```
/plugin marketplace add Carbon-Arc/carbon-arc-skills
/plugin install carbon-arc-company-intelligence@carbon-arc
/plugin install carbon-arc-talent-intelligence@carbon-arc
```

**Zip, if you can't add a marketplace:** download `carbon-arc-company-intelligence.zip` or
`carbon-arc-talent-intelligence.zip` from the
[latest release](https://github.com/Carbon-Arc/carbon-arc-skills/releases/latest) and upload it as a
plugin. A zip install does not update itself; the skills tell you in one line when a newer version is
available.

## Use

Start a new conversation and say what you want in plain language. You don't need to name a skill.

- **New to Carbon Arc?** Say "get started" or "what can this do". The onboarding skill explains what the
  data covers and what it cannot see, works out which report you want, and starts it. It runs no
  queries.
- **A company's position:** "Build a report on *<company>* against its competitors."
- **A quarter before it reports:** "What is *<ticker>*'s current quarter tracking at?"
- **An artist:** "Build a brief on *<artist>*."
- **One question only:** "Did *<company>*'s price change work?" or "Who is *<artist>*'s audience?" runs
  just that workflow.

Each report stops at a few checkpoints to show you what it plans to pull and what it found before it
builds anything, so you can correct it early. A full report usually uses 1,000 to 2,000 Carbon Arc MCP
tokens, charged to the account you signed in with.

## What's in this repo

```
.claude-plugin/marketplace.json   the marketplace: lists both plugins
plugins/<plugin>/                 each plugin: its manifest, README and skills/
latest.json                       the current version of each plugin, read by zip installs
```

Every skill is a `SKILL.md` file you can read. Each plugin's own `README.md` lists its skills and the
question each one answers.

## Disclaimer

**Disclaimer:** Carbon Arc Skills are a series of markdown files designed to be used with AI tools and Carbon Arc's MCP Server. Skills output may contain errors or inaccuracies, should not be solely relied upon, and do not constitute financial advice. Carbon Arc cannot guarantee that data assets or information featured in Skills will be available to any particular user via Carbon Arc's platform. Use of Skills will result in Carbon Arc MCP Tokens being consumed as data is queried. By making this repository publicly available, Carbon Arc does not grant any license to its name or intellectual property, nor any license to Carbon Arc's data, platform, or MCP Server. Use of Carbon Arc's data, platform, or MCP Server requires a separate agreement with Carbon Arc. Modified versions of Skills are not endorsed or reviewed by Carbon Arc.
