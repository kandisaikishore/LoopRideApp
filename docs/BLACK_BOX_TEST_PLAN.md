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

## Current automated verification snapshot

The following results were observed from GitHub Actions on 2026-10-22:
- Java HTTP route/method smoke job: passed on commit 684283f4f5dbd0861cac683b18034383635d60fb.
- Docker image build and container endpoint smoke job: passed on commit 684283f4f5dbd0861cac683b18034383635d60fb.
- Playwright browser end-to-end job: passed on commit 684283f4f5dbd0861cac683b18034383635d60fb.
- Repository-wide Java and Python test phases: passed on that commit; Node tests/build were still running at snapshot time.

## Execution note
The snapshot above reports completed job steps only. Check the linked GitHub Actions run for final whole-workflow completion and later commits before treating the entire pipeline as green. This matrix also includes manually reviewable edge cases beyond the current smoke checks; their presence in this document does not imply that every case is automated.
