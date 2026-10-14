# RoutePulse AI — Bus Management & Transit Discovery

A responsive Hyderabad-focused transit demo combining passenger route discovery with an operator workspace for fleet records, drivers, maintenance work orders, simulated dispatch controls and service alerts.

> **Demo-data notice:** Schedules, fares, occupancy, reliability, notices and vehicle positions are illustrative. This is not an official TSRTC/TGSRTC feed. GPS positions are not connected to a real vehicle source, and the operator console is not production authorization. Do not use this demo for safety-critical decisions.

## Features

### Passenger experience
- Search sample departures by origin, destination, date and passenger count.
- Review stop order, pickup/drop landmarks, fare breakdown and explainable ETA ranges.
- Inspect accessibility notes, alerts and route details.
- English/Hindi/Telugu assistant with a safe FAQ fallback when no AI credential is configured.
- Responsive layouts and browser-local saved preferences.

### Operator demo console
- Fleet registry: add buses, capacities and update availability status.
- Driver directory: add sample staff and set availability.
- Maintenance: create work orders and track status; opening a work order marks the bus as in maintenance.
- Simulated dispatch: adjust route delays and stop availability.
- Service alerts: publish local demo notices.
- Summary cards for fleet and maintenance status.

Operator data in the added management panels is in-memory demo state and resets on refresh. It is not a persistent fleet-management backend.

## Technology
- React 19 + TypeScript
- TanStack Start / Router
- Tailwind CSS and reusable UI components
- Vitest + Testing Library
- Transit domain logic designed for future GTFS integration

## Run locally
Install Bun, then:

```bash
bun install
bun run dev
bun run test
bun run lint
bun run build
```

## Documentation
- [Product requirements](docs/PRD.md)
- [Functional and non-functional requirements](docs/REQUIREMENTS.md)
- [Architecture and integration boundaries](docs/ARCHITECTURE.md)
- [Test plan](docs/TEST-PLAN.md)
- [Research and official transit references](docs/RESEARCH.md)
- [Deployment checklist](docs/DEPLOYMENT.md)
- [User stories](docs/USER-STORIES.md)

## Research references
- [GTFS overview](https://gtfs.org/documentation/overview/)
- [GTFS Schedule reference](https://gtfs.org/documentation/schedule/reference/)
- [GTFS Realtime](https://gtfs.org/documentation/realtime/)
- [GTFS Schedule best practices](https://github.com/MobilityData/GTFS_Schedule_Best-Practices/blob/master/en/best-practices.md)
- [MoHUA city bus operations guidelines](https://mohua.gov.in/upload/uploadfiles/files/GuidelineCityBus.pdf)

## Production roadmap
Before real operations, integrate an authorized schedule feed and AVL/GPS or GTFS-Realtime source; add a licensed mapping provider, persistent database and migrations, server-side authentication/authorization, transaction-safe seat inventory and assignments, payment integration if required, audit logging, backups, monitoring and operator acceptance testing. Follow applicable local transport rules with the operator's compliance team; this repository does not certify regulatory compliance.

## Secrets
Keep credentials in deployment environment variables. Never commit API keys, payment credentials, database passwords or passenger data. AI credentials must remain server-side; never expose secrets through client-side `VITE_*` variables.
