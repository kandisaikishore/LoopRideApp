# User Stories and Acceptance Notes

## Passenger
- As a passenger, I can search from one stop to another on a selected date so I can compare available demo departures.
- As a passenger, I can see stop order and pickup/drop-off landmarks so I know where to board.
- As a passenger, I can inspect fare components and see that fares are illustrative.
- As a passenger, I can read service alerts and their affected routes.
- As a passenger using assistive technology, I can operate search and navigation with labels and keyboard controls.

## Dispatcher
- As a dispatcher, I can see vehicle availability before assigning a bus.
- As a dispatcher, I can assign a bus and driver to a scheduled trip only when both are available.
- As a dispatcher, I can publish a service alert with an affected route and validity period.
- As a dispatcher, I can distinguish simulated delay overrides from real vehicle telemetry.

## Fleet manager
- As a fleet manager, I can review vehicle registration, type, capacity and status.
- As a fleet manager, I can record maintenance work and prevent an unavailable bus from being dispatched.
- As a fleet manager, I can view inspections due and a basic fleet availability summary.

## Administrator
- As an administrator, I can assign roles and review changes in an audit trail.
- As an administrator, I can configure external data providers without exposing credentials to browsers.
- As an administrator, I can see whether each integration is connected, stale or unavailable.

## Acceptance notes
The current demo can illustrate passenger search and selected operator simulations. Stories requiring persistent fleet CRUD, production authorization, audit, payments or verified real-time integrations remain future implementation work until backed by tested code and services.
