# LoopRideApp Black-Box Test Matrix

Date: 2026-10-22

## Scope
Observable HTTP contract and browser-visible rider/driver workflows for the demo application.

## HTTP acceptance cases
- GET / returns 200, HTML content type, and the rider UI marker.
- GET /index.html returns 200 and the driver dashboard marker.
- GET /api/health returns 200 JSON and status UP.
- GET /api/rider returns a rider-role payload.
- GET /api/driver returns a driver-role payload.
- Unknown paths, including unknown API routes, nested unknown paths, query-string variants and unknown assets return 404 with JSON error.
- POST, PUT, PATCH, DELETE and HEAD to an existing read-only route return 405 with Allow: GET.
- Invalid port arguments are rejected with a clear error; boundary ports are validated before binding.

## Browser acceptance cases
- Destination search filters known destination cards and displays an empty state when there are no matches.
- Selecting a destination enables review and updates fare and trip summary.
- Ride-type selection updates fare estimate.
- Updating pickup after destination selection updates the summary.
- Reviewing a demo ride records no more than five recent trips, while failures in browser storage do not crash the UI.
- Recent trip content is rendered as text nodes, not executable HTML.
- Malformed/stale recent-trip data does not crash the page and only valid records are shown.
- Reusing a recent trip restores the selected destination, pickup, and ride type.
- Clear trip resets selection, preference toggles, and note field.
- Driver availability changes update local demo status; API failure gives visible feedback.
- Narrow viewports and keyboard focus states remain usable.

## Execution note
This matrix defines black-box cases for CI and manual QA. Passing status must be based on an actual completed workflow or runtime test, not inferred from source review alone.
