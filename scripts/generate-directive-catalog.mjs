import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = process.env.RIFTBORNE_DIRECTIVES_SOURCE
  ?? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Riftborne\\Content\\Data\\directive_paths.csv';
const destination = path.join(root, 'wiki', 'content', 'articles', 'directive-catalog.md');

if (!fs.existsSync(source)) throw new Error(`Directive source not found: ${source}`);

const rows = parseCsv(fs.readFileSync(source, 'utf8'));
const headers = rows.shift();
if (!headers?.length) throw new Error('Directive source is empty.');
const records = rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])));
if (records.length !== 110) throw new Error(`Expected 110 directive stages, found ${records.length}.`);

const groups = new Map();
for (const record of records) {
  const list = groups.get(record.PathCodename) ?? [];
  list.push(record);
  groups.set(record.PathCodename, list);
}
if (groups.size !== 11) throw new Error(`Expected 11 directive paths, found ${groups.size}.`);

const body = [];
body.push(`---
title: Complete directive stage catalog
slug: directive-catalog
summary: Every current directive path and stage, with its objective, tracked metric, target, and unlock rule from the installed 11.75 data.
category: Reference
pageType: reference
patch: '11.75'
verification: confirmed
lastReviewed: '2026-08-01'
order: 104
aliases:
  - all directive stages
  - directive requirements
  - Aegis Vanguard stages
  - Consortium Founder stages
relatedPages:
  - directives
  - controls-and-menu-map
verifiedBuild: a7b5c7c
verifiedAt: '2026-07-30'
ruleset: core
evidence:
  - client-build-1175
  - current-data-1175
mechanicDependencies: []
---
This catalog transcribes all 110 directive stages from the installed 11.75 data. Internal storage identifiers are translated to current culture-neutral descriptions so the table applies to Astraean, Varkon, and Veil interfaces. [Evidence](#evidence-current-data-1175)

Use the stage title and tracked metric to diagnose progress. A row describes the requirement for that stage; it does not grant the permanent path effect listed in [Directives](/wiki/directives/).
`);

for (const [name, stages] of groups) {
  const first = stages[0];
  body.push(`## ${escapeText(name)}\n\n**Archetype:** ${escapeText(first.PathArchetype)} · **Path key:** \`${escapeText(first.PathKey)}\` · **Stages:** ${escapeText(first.PathTotalStages)}\n`);
  body.push('| Stage | Directive | Objective | Tracked metric | Target | Unlock |\n|---:|---|---|---|---|---|');
  for (const stage of stages.sort((a, b) => Number(a.Stage) - Number(b.Stage))) {
    body.push(`| ${stage.Stage} | **${escapeCell(stage.DirectiveTitle)}** | ${escapeCell(stage.ObjectiveSummary)} | ${escapeCell(translate(stage.TrackingMetric))} | ${escapeCell(translate(stage.TargetValue))} | ${escapeCell(stage.UnlockRule)} |`);
  }
  body.push('');
}

body.push(`## Reading culture-specific requirements

The data uses internal building categories for tracking. In the interface, satisfy a storage requirement with the current culture-specific building in that category: Solvault and Heliovex for Astraean, Skarncache and Voltforge for Varkon, or Nyxvault and Gloamwell for Veil. [Evidence](#evidence-current-data-1175)

## Evidence boundary

These rows establish the current data targets. When a live progress display appears not to match a row, capture the path, stage, exact UI text, current progress, world identifier, build, and time before reporting a discrepancy.
`);

fs.writeFileSync(destination, `${body.join('\n')}\n`, 'utf8');
console.log(`Generated ${destination} with ${records.length} stages across ${groups.size} paths.`);

function translate(value) {
  return String(value)
    .replace(/Silo\s*>=/gi, 'primary resource storage >=')
    .replace(/SolarCell\s*>=/gi, 'Astra storage >=');
}

function escapeCell(value) {
  return escapeText(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function escapeText(value) {
  return String(value).trim();
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (quoted) {
      if (character === '"' && input[index + 1] === '"') { cell += '"'; index += 1; }
      else if (character === '"') quoted = false;
      else cell += character;
    } else if (character === '"') quoted = true;
    else if (character === ',') { row.push(cell); cell = ''; }
    else if (character === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += character;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  return rows.filter((entry) => entry.some((value) => value.length));
}
