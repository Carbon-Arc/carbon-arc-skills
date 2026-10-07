# Carbon Arc Talent Intelligence

Pre-built workflows for the people who represent talent (management, agencies, labels), and a brief
you can send on.

| | Skill | The question |
|---|---|---|
| | `talent-onboarding` | Start here. What this is and how to begin. |
| | `talent-starter-report` | One brief covering every workflow the data supports for your artist. |
| 1 | `talent-peer-set` | Who am I actually competing with for the same audience? |
| 2 | `talent-momentum` | Is my audience growing, and is anyone in my lane pulling away? |
| 3 | `talent-audience` | Who is my audience? |
| 4 | `talent-commercial` | Which brand partnerships can I actually win? |
| 5 | `talent-live-demand` | What will the resale market pay to see me, and where? |
| 6 | `talent-the-work` | Which of my titles carry me, and which hold? (actors) |
| | `ca-events` | What did a partnership, release or event actually do? |

`ca-core` sits underneath all of them and is not run directly. It holds the setup checklist, the
evidence gates, the client-facing voice and the per-instrument method.

## The principle

**Carbon Arc sees your artist's audience. It does not see their income.** You know the royalty
statements and the settlements better than any panel. What this adds is everything relative: whether a
flat quarter is your artist or the whole lane, who is pulling away, who the audience really is, and
which partnerships are distinctively yours rather than open to everyone in the category.

## Skills are just files

Every skill is a `.md` file. Read them, change them, add your own. If you write something good, send it
back.

## What you need

- The **Carbon Arc MCP**, connected in Claude before you install. Contact your Carbon Arc representative
  for access.
- **Web search**, for releases, tours, filmographies and partnership dates. Nothing is taken from memory.
- **A shell with Python**, for the two verification scripts. Without them they silently do not run.

## Connect Carbon Arc

The plugin ships no MCP configuration and no API key. Its skills use the Carbon Arc connection you
already have in Claude, and every query is billed to the account you sign in with.

1. **Connect Carbon Arc first.** In the Claude app, add the Carbon Arc connector and sign in.
2. **Claude Code without a claude.ai login:** run this once, then sign in when the browser opens.

   ```bash
   claude mcp add --transport http carbon-arc https://mcp.carbonarc.co
   ```

Installing, updating and everything else: [docs.carbonarc.ai/tutorials/carbon-arc-skills](https://docs.carbonarc.ai/tutorials/carbon-arc-skills).

## What the brief covers

Musicians and actors. Live demand is read from resale only: no reachable data measures whether a show
sold, and every brief says so.

This plugin is assembled from Carbon Arc's shared skill library. `carbonarc-mcp`, `carbon-arc-report-v2`,
`ca-core` and `ca-events` are shared with other Carbon Arc packages; `ca-core/references/readers/agency.md` is what
makes this one speak to a talent team.

## Disclaimer

**Disclaimer:** Carbon Arc Skills are a series of markdown files designed to be used with AI tools and Carbon Arc's MCP Server. Skills output may contain errors or inaccuracies, should not be solely relied upon, and do not constitute financial advice. Carbon Arc cannot guarantee that data assets or information featured in Skills will be available to any particular user via Carbon Arc's platform. Use of Skills will result in Carbon Arc MCP Tokens being consumed as data is queried. By making this repository publicly available, Carbon Arc does not grant any license to its name or intellectual property, nor any license to Carbon Arc's data, platform, or MCP Server. Use of Carbon Arc's data, platform, or MCP Server requires a separate agreement with Carbon Arc. Modified versions of Skills are not endorsed or reviewed by Carbon Arc.
