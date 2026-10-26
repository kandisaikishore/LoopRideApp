# LoopRideApp

[![LoopRideApp CI](https://github.com/kandisaikishore/LoopRideApp/actions/workflows/ci.yml/badge.svg)](https://github.com/kandisaikishore/LoopRideApp/actions/workflows/ci.yml) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/LoopRideApp)](https://github.com/kandisaikishore/LoopRideApp/commits/main)

LoopRideApp is a responsive **ride-coordination UI demo** backed by a small Java HTTP server. It demonstrates rider trip estimates and preferences, recent-trip reuse in browser storage, and a demo driver dashboard. It is **not a production ride-booking service**: it does not contact drivers, create real bookings, calculate live routes, process payments, or persist real driver accounts.

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

## Project limitations

This repository currently provides a demonstrator, not a complete marketplace. It has no real authentication, account-backed data, driver matching, live maps/GPS, booking lifecycle, dispatch, payment integration, or production database. Fare values and busy-zone bonuses are examples, not live quotes. Browser local storage is local to one browser and must not be treated as secure account storage.

### Production-readiness gate

Do not deploy or market this repository as a production ride-booking service. Before production use, implement and verify the requirements tracked in [issue #6](https://github.com/kandisaikishore/LoopRideApp/issues/6): a defined backend/API contract and booking lifecycle, server-side authentication and rider/driver authorization, durable data storage, concurrency-safe dispatch/state transitions, privacy and security review, observability, integration tests, and deployment verification. Browser local storage and client-side toggles are demo state only; they must not be treated as authoritative trip or driver records.

## Contributing

Please open an issue with reproducible steps and expected/actual results. For changes, run the relevant CI checks and include the test result in the pull request.

## License

No license file is currently declared. Add a `LICENSE` file before defining reuse terms.
