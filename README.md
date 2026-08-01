# Riftborne Command

A private, local-first guide and strategic dashboard for Riftborne. It indexes versioned game knowledge, synchronizes the official read-only combat viewer at a conservative interval, reconstructs the visible galaxy, and produces evidence-based recommendations. It never controls the game.

## The complete game guide

Start with **[The Riftborne Field Manual](GUIDE.md)** for mechanics, culture playstyles, opening plans, multiplayer organization, objective strategy, and advanced tactics. It targets patch 11.75 build `a7b5c7c`, cites current-client evidence, and separates core rules from live-world settings.

## Public wiki

The searchable, mobile-friendly edition is live at **[riftbornewiki.317society.com](https://riftbornewiki.317society.com)**.

```powershell
npm.cmd run build:wiki
npm.cmd run preview:wiki
```

The Astro wiki uses the focused Markdown articles in `wiki/content/articles/` as its canonical knowledge source. It generates permanent article and category routes, an A–Z index, patch-aware metadata, Pagefind full-text search, and a sitemap.

After changing wiki content:

```powershell
npm.cmd run guide:generate
npm.cmd run build:wiki
```

`guide:generate` rebuilds `GUIDE.md` from the article collection. `build:wiki` rejects invalid metadata, broken related-page references, stale guide output, template errors, or an incomplete search build.

## Everyday use

Double-click **Open Riftborne Command.cmd**. It starts the local service invisibly, waits until it is ready, and opens the dashboard in your default browser. Opening it again only opens another browser tab; it does not start a duplicate server.

Double-click **Stop Riftborne Command.cmd** when you want to stop the background service.

## First-time setup

```powershell
npm.cmd install
npm.cmd run seed:knowledge
npm.cmd run dev
```

Open `http://127.0.0.1:5173`. The API binds to `127.0.0.1:4317`; credentials remain in the server-only `.env` file.

## Commands

- `npm.cmd run dev` — local frontend and backend development servers
- `npm.cmd run app:open` — start the built app and open it in the browser
- `npm.cmd run app:stop` — stop the background app service
- `npm.cmd run build` — production build
- `npm.cmd start` — serve the production build on localhost
- `npm.cmd test` — offline unit and integration tests
- `npm.cmd run test:live` — explicit one-summary authenticated smoke test
- `npm.cmd run check:secrets` — scan project sources for credential leakage

## Data and safety

The application contacts only the public viewer endpoints used by its own client, limits map concurrency to two requests, performs incremental report reads, and defaults to a 30-minute refresh interval. It honors rate limiting and preserves the last good local snapshot after failures. `.env`, `envseed.txt`, SQLite data, snapshots, and browser artifacts are ignored.

The optional OpenAI provider is enabled only when `OPENAI_API_KEY` is set. Without it, guide search and assistant answers use deterministic local evidence.
