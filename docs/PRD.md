# Product Requirements Document — RoutePulse Bus Management

**Status:** MVP / demonstration build  
**Product:** RoutePulse AI — Bus Management System  
**Primary users:** transport operators, dispatchers, drivers, passengers, maintenance staff  
**Data policy:** all bundled schedules, fares, trips, vehicle positions, occupancy and alerts are demo data unless an explicitly configured trusted source says otherwise.

## 1. Problem
Small and mid-sized bus operators often manage fleet records, driver duty, timetables, passenger information and maintenance in disconnected tools. Passengers lack clear pickup landmarks and trustworthy disruption information. RoutePulse brings these workflows into one responsive application.

## 2. Goals
- Make bus routes, stops and scheduled trips discoverable.
- Give operators a single place to inspect fleet availability and service disruptions.
- Model fleet, driver, schedule, booking and maintenance workflows.
- Clearly distinguish scheduled/demo information from verified live telemetry.
- Keep the application accessible, responsive and maintainable.
- Provide an integration-ready domain model aligned with GTFS.

## 3. MVP scope
### Passenger
- Search trips by origin, destination, date and passenger count.
- Inspect stop order, pickup/drop points, schedule, fare breakdown and ETA confidence.
- View service notices and accessibility information.
- Save preferences and demo trip information locally.

### Operator
- Inspect fleet status and vehicle details.
- Manage route and stop definitions and scheduled trips.
- Assign buses and drivers to trips.
- Simulate delays and stop unavailability.
- Create demo service alerts.
- Review maintenance status and basic operational KPIs.

### Platform
- Responsive desktop and mobile layouts.
- Form validation and useful empty/error states.
- Automated unit/component tests and CI checks.
- Documentation for architecture, requirements, research, test strategy and deployment.

## 4. Non-goals for the demo
- No claim of official TSRTC/TGSRTC data, live GPS or verified ETAs.
- No real payment capture, ticket issuance or refund settlement.
- No production authentication/authorization based on a client-side flag.
- No safety-critical dispatching or legal/compliance certification.
- No integration with government systems without authorization and an approved contract.

## 5. Personas and key journeys
1. **Passenger:** choose origin/destination → compare trips → inspect stop sequence and fare → review alert.
2. **Dispatcher:** inspect fleet → select a route/trip → assign available bus and driver → publish a service notice.
3. **Fleet manager:** review maintenance due → record a work order → return a vehicle to service after inspection.
4. **Administrator:** review audit events, permissions, data freshness and system health.

## 6. Functional acceptance criteria
- Origin and destination must be valid, and a trip must visit origin before destination.
- Passenger count must be a positive integer within configured limits.
- Bus capacity cannot be exceeded; overlapping assignments must be rejected.
- A bus under maintenance cannot be assigned to a trip.
- A driver cannot be assigned to overlapping trips or marked unavailable.
- Cancellation must release the corresponding demo seat inventory exactly once.
- All sample GPS, ETA, fare and occupancy information must carry a demo/source label.
- Operators must be able to distinguish scheduled time from actual/estimated time.
- All important flows must be keyboard usable and responsive at mobile widths.

## 7. Non-functional requirements
- Accessibility: semantic landmarks, visible focus, labelled inputs, sufficient contrast, reduced-motion awareness.
- Performance: avoid unnecessary client bundles; paginate large lists when connected to real data.
- Reliability: validate on both client and server in a production implementation.
- Security: least privilege, server-side authorization, secret management, audit logging, rate limiting.
- Privacy: collect only necessary personal data and define retention/deletion policies.
- Observability: structured logs, error reporting, health checks and deployment status.
- Interoperability: GTFS Schedule and optional GTFS Realtime adapters.

## 8. Success measures
- Core passenger search and operator workflows pass automated tests.
- No failed build/lint/test check on the release branch.
- Every displayed data item exposes its source and freshness.
- No secret or real passenger data is committed.
- A new developer can run the project using the README.

## 9. Release plan
- **MVP demo:** passenger route discovery, simulated service alerts, operator demo console, local demo state, docs and CI.
- **Pilot:** approved schedule import, persistent database, identity and role authorization, operator acceptance tests.
- **Production:** authorized AVL/GPS, live GTFS-Realtime, licensed mapping, payments if needed, security review, monitoring, backup/restore and incident procedures.
