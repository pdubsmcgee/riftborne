# Local Riftborne install audit

Inspected path:

`C:\Program Files (x86)\Steam\steamapps\common\Riftborne`

Findings:

- Installed patch: `11.73`
- Build time: `2026-07-22 16:39:27Z`
- Main assemblies: `SpaceLegends.Cli.dll`, `SpaceLegends.Core.dll`, `SpaceLegends.Multiplayer.dll`
- Local guide path: `Content/GAMEPLAY_GUIDE`
- Local data path: `Content/Data`
- Useful data files:
  - `directive_paths.csv`
  - `spu_bonuses.csv`
  - `player_transmissions.csv`
  - `build_info.json`
  - `current_patch_version.txt`

Important mechanics confirmed from bundled local guide/data:

- Current victory paths are Origin Wormhole level 100 or five same-faction Keystone colonies with at least 1,000 Visions each.
- Origin and Keystone sites begin under static KRAKEN garrisons.
- Enemy objective progress is not live public information unless visible through faction ownership or a spy snapshot.
- Keystone Vision converts donated Noctmarks over time, with level improving conversion cost and hourly throughput.
- Stationed ships consume Astra; Astra starvation can destroy parked ships.
- Fleet speed is set by the slowest ship.
- Only stationed/garrison ships defend a base.
- Spy missions require Intelligence ships.
- Attack plus surviving siege capability is required to destroy buildings.
- The local SPU CSV exposes many current SPU effect categories and target ship classes.
- Directive paths are parallel guidance/progression tracks.

Deferred follow-up:

- Parse `spu_bonuses.csv` into normalized knowledge/fleet-planner data.
- Parse directive paths into guide/planner milestones.
- Extract ship stat tables only if they are present in readable local assets or entered/imported by the user.
- Avoid treating DLL internals as live hidden game state.
