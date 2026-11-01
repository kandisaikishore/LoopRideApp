# LoopRideApp

[![LoopRideApp CI](https://github.com/kandisaikishore/LoopRideApp/actions/workflows/ci.yml/badge.svg)](https://github.com/kandisaikishore/LoopRideApp/actions/workflows/ci.yml) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/LoopRideApp)](https://github.com/kandisaikishore/LoopRideApp/commits)

LoopRideApp is a responsive ride-coordination UI demo backed by a small Java HTTP server. It demonstrates rider trip estimates and preferences, recent-trip reuse in browser storage, and a demo-only driver availability workflow. This repository is intentionally not a production ride-booking service: it does not create real bookings, authenticate users or drivers, match drivers, or persist account-backed trip state.

## Demo status and production readiness

This project is a working UI demonstration and a smoke-testable Java server. It is not production-ready and should not be described as a live ride-booking platform or a system with real booking or dispatch behavior.

The current app intentionally omits the critical production components that a real transportation service requires:

- Real authentication and authorization for riders and drivers.
- Server-side validation of ride requests and driver availability.
- Durable persistence for users, rides, and driver state.
- A booking lifecycle with create/cancel/timeout/status transitions.
- Driver matching, dispatch logic, and concurrency-safe updates.
- Payments, audit logging, privacy/security review, and deployment checks.

## Implemented features

- Rider and driver demo workspaces with responsive layouts.
- Destination selection and illustrative fare estimates for sample destinations.
- Mini, Comfort, and XL ride options with different demo fare multipliers.
- Pickup shortcuts, rider preference toggles, optional driver notes, and a trip-sharing safety reminder.
- Recent demo trips saved in browser local storage (up to five), including reuse and clear actions.
- Driver availability toggle with sample dashboard metrics.
- Java HTTP endpoints for health, rider information, driver information, and the HTML UI.
- HTTP 404 responses for unknown paths and HTTP 405 responses for unsupported methods, with an `Allow: GET` header.

## Technology stack

- Java 17-compatible source using the JDK HTTP server APIs.
- HTML, CSS, and browser JavaScript.
- Node.js/npm and Playwright for browser end-to-end tests.
- Docker for containerized smoke testing.
- GitHub Actions for HTTP smoke checks, browser E2E tests, Docker smoke tests, and repository checks.

## Requirements

- JDK 17 or newer
- Docker (optional; for container checks)
- Node.js/npm (only required for Playwright tests)

## Run locally

Compile and start the Java application from the repository root:

```bash
javac -Xlint:all -d . LoopRideApp.java
java project.LoopRideApp 8080
```

Then open http://localhost:8080. The port can be supplied as the first command-line argument; use a port available on your machine.

Useful endpoints:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | Main rider/driver demo UI |
| GET | `/index.html` | UI HTML |
| GET | `/api/health` | Server health |
| GET | `/api/rider` | Demo rider-role payload |
| GET | `/api/driver` | Demo driver-role payload |
| GET | Unknown path | JSON error with HTTP 404 |
| Non-GET | Existing route | HTTP 405 with `Allow: GET` |

The driver UI may request `/api/driver` to refresh status; its availability toggle and displayed metrics are demo-only.

## Test and validate

### HTTP smoke checks

GitHub Actions compiles the Java source, waits for the health endpoint, then checks UI routes, endpoint status codes, content types, body markers, unknown routes, and unsupported HTTP methods.

### Browser end-to-end tests

Install project dependencies and the Chromium browser, then run the declared Playwright script:

```bash
npm install
npx playwright install --with-deps chromium
npm run test:e2e
```

### Docker smoke test

Build and run the container:

```bash
docker build -t looprideapp:local .
docker run --rm -p 8080:10000 looprideapp:local
```

The container's application port is `10000`; visit http://localhost:8080. The CI pipeline also checks the health endpoint and verifies that an unknown API path returns 404.

## Production implementation plan

Before any production claim is made, the project should define and implement a backend/API contract that covers the real ride lifecycle. A minimal production plan should include:

- API routes for authentication, trips, availability, matching, cancellation, and status updates.
- A durable data model for users, drivers, rides, trip state, availability windows, and audit logs.
- Server-side authorization rules that distinguish rider and driver roles and validate state transitions.
- Persistence, concurrency control, and transactional updates for matching and trip booking workflow.
- Integration tests for authentication failures, duplicate booking submissions, invalid state transitions, and persistence checks.
- Privacy, security, observability, and deployment verification steps before any production rollout.

## Project limitations

This repository currently provides a demonstrator, not a complete marketplace. It has no real authentication, account-backed data, driver matching, live maps/GPS, booking lifecycle, dispatch, payment integration, or production database. The app intentionally demonstrates UI flow and server-side HTML endpoint behavior rather than a dispatching ride service.

Before production use, add a defined backend/API contract, authentication and authorization, server-side validation, durable data storage, privacy and security review, observability, and integration testing. No claim of production readiness should be made until those checks pass.

## Contributing

Please open an issue with reproducible steps and expected/actual results. For changes, run the relevant CI checks and include the test result in the pull request.

## License

No license file is currently declared. Add a `LICENSE` file before defining reuse terms.
