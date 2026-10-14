# System Requirements

## Roles
- **Passenger (public):** search routes/trips, inspect stops/fare/schedule, read alerts, save local preferences.
- **Dispatcher:** create/update trip plans, assign vehicles/drivers, manage operational alerts.
- **Fleet manager:** maintain vehicle records, inspections and repair work orders.
- **Administrator:** manage roles, configuration, audit and integration credentials.

The current demo does not provide production-grade identity or authorization. Any operator mode exposed in the browser is a demonstration switch only.

## Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Search trips by origin, destination, date and passenger count | P0 |
| FR-02 | Show route stop sequence and designated pickup/drop-off points | P0 |
| FR-03 | Explain fare components and label demo fares | P0 |
| FR-04 | Publish and display service alerts | P0 |
| FR-05 | Register buses with registration number, type, capacity and status | P1 |
| FR-06 | Maintain driver/staff profiles and availability | P1 |
| FR-07 | Create routes, ordered stops, schedules and service calendars | P1 |
| FR-08 | Assign a bus and driver to a trip with conflict checks | P1 |
| FR-09 | Manage demo bookings, seat capacity and cancellation | P1 |
| FR-10 | Record maintenance inspections, faults and work orders | P1 |
| FR-11 | Display fleet utilization, trip completion and maintenance KPIs | P2 |
| FR-12 | Import/export GTFS Schedule data with validation | P2 |
| FR-13 | Consume GTFS-Realtime trip updates, alerts and vehicle positions | P2 |
| FR-14 | Provide grounded assistant answers from approved schedule data | P2 |

## Data entities
- **Operator:** operatorId, name, contact details, status.
- **Bus:** busId, registrationNumber, type, capacity, accessibility attributes, status, inspectionDueAt.
- **Driver:** driverId, displayName, licenceReference, availability, qualificationExpiry.
- **Route:** routeId, publicName, origin, destination, ordered stop references.
- **Stop:** stopId, name, latitude/longitude where verified, landmark, pickup/drop flags, accessibility notes.
- **Trip:** tripId, routeId, serviceDate, scheduled start/end, busId, driverId, status.
- **Booking:** bookingId, tripId, passenger count, status, createdAt, cancellation metadata.
- **MaintenanceWorkOrder:** workOrderId, busId, fault, priority, status, openedAt, closedAt.
- **ServiceAlert:** alertId, severity, affected route/stop/trip, validity window, source and updatedAt.
- **VehiclePosition:** vehicleId, latitude, longitude, observedAt, source, freshness; never infer a real position from demo simulation.

## Validation and business rules
- Stable unique IDs; normalize registration numbers before duplicate checks.
- Route stop order must be explicit; origin must precede destination.
- Capacity and passenger count are positive integers.
- Prevent overbooking and duplicate cancellation effects.
- Prevent bus/driver assignment overlap and assignment of unavailable assets.
- Maintenance or expired safety inspection blocks dispatch in a production system.
- Timestamps include timezone semantics; service dates use the operator's local timezone.
- Track source, observation time and confidence for all real-time data.

## Non-functional requirements
Security: server-side authorization, least privilege, secure session management, secrets outside source control, input validation, audit logs.
Privacy: data minimization, retention schedule, access controls and deletion process.
Availability: health endpoints, monitoring, documented incident response and backups for production.
Accessibility: keyboard navigation, labels, focus indicators and responsive layouts.
Compatibility: current Chromium, Firefox, Safari and mobile browsers.
Maintainability: typed domain models, isolated adapters, automated tests and CI.
