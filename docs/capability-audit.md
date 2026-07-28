# Riftborne Command capability audit

Phase 1 records endpoint schemas as keys only. It intentionally omits telemetry values, credentials, cookies, report contents, and session material from audit output.

The local backend exposes:

- `/api/capabilities` — feature-level support model for the active world.
- `/api/schema-audit` — observed top-level and nested keys by endpoint.

Audited read-only endpoints:

- `/api/session`
- `/api/summary?scope=me`
- `/api/summary?scope=world`
- `/api/summary?status=1`
- `/api/reports`
- `/api/report` when a report detail is fetched
- `/api/map/manifest`
- `/api/map/chunk`
- `/api/medals`
- `/api/leaderboard` only when the session reports operator access

Feature gates currently tracked:

- Current resources
- Storage capacities
- Production rates
- Colony state
- Current fleets
- Incoming movements
- Outgoing movements
- Arrival times
- Construction queues
- Training queues
- Astra upkeep
- Trade routes
- Loan or market state
- Current Valor and Visions
- Report details
- Ship compositions
- Spy intelligence

Unsupported capabilities must be shown as “not exposed by current telemetry” and must not silently return empty strategic output.
