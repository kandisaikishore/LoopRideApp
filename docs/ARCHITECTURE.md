# Architecture

## Current demo architecture
- **Web:** React 19 + TypeScript, TanStack Start/Router, Tailwind CSS and reusable UI components.
- **Domain logic:** transit data and deterministic route/fare/ETA calculations under `src/lib/transit`.
- **Demo persistence:** browser local storage for preferences and operator-demo state.
- **Assistant:** server-side chat route with optional server-only AI gateway configuration and offline FAQ fallback.
- **Tests:** Vitest and Testing Library; GitHub Actions should run tests, lint and build.

This architecture is suitable for a portfolio/demo. Local storage and simulated positions are not appropriate as the system of record for a real operator.

## Recommended production target
```text
Passenger Web / Operator Console / Driver App
                  |
             HTTPS API
                  |
        Identity + RBAC + Audit
                  |
   -------------------------------------
   | Route/Schedule | Fleet/Maintenance |
   | Booking/Ticket | Alerts/Reporting  |
   -------------------------------------
                  |
         PostgreSQL + migrations
                  |
    Integration adapter boundary
      | GTFS Schedule import/export
      | GTFS-Realtime / AVL provider
      | Licensed map/routing provider
      | Payment gateway (optional)
      | Email/SMS notification provider
```

## Recommended data design
Use PostgreSQL as the authoritative store for operators, vehicles, drivers, routes, stops, trips, assignments, bookings, maintenance and audit events. Use transactions/unique constraints for capacity and assignment rules. Add Redis only when caching, rate limiting or transient coordination is justified. Avoid introducing microservices before the domain and scale require them.

## Integration boundaries
- **GTFS Schedule:** static agency, routes, trips, stops, stop times, service calendars and optional fare data.
- **GTFS Realtime:** trip updates, service alerts and vehicle positions. Real-time ingestion requires regular feed refresh and stale-data detection.
- **AVL/GPS:** adapter normalizes vendor telemetry; store observedAt, source and quality/freshness.
- **Maps:** licensed map tiles and routing/geocoding API; keep provider keys server-side when required.
- **Payments:** provider-hosted/PCI-scoped flow; never store card PAN/CVV in this application.
- **Notifications:** SMS/email provider behind an adapter with retry and delivery status.

## Security boundaries
Browser-controlled flags are never authorization. Enforce roles on the server and validate every mutation. Store secrets in deployment environment variables. Apply rate limits to authentication and public APIs. Audit dispatch, assignment, booking, refund and maintenance state changes.

## Deployment
The existing public demo can be hosted as a web application. Production deployment should include a persistent database, migrations, health check, error reporting, backups, secrets management and rollback strategy. Do not advertise live GPS or official routes until the corresponding provider is integrated and monitored.
