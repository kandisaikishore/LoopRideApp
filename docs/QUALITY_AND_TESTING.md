# Quality and Testing Guide

This guide documents the current demo implementation and its validation paths. Keep it aligned with `README.md` and the CI workflow.

## Scope and limitations

LoopRideApp is a ride-coordination UI demo backed by a small Java HTTP server. It does not implement production authentication, durable accounts, real driver dispatch, live routing/GPS, payments, or a production booking lifecycle. Fare estimates and driver metrics are illustrative. Do not describe the demo as a live ride-booking service.

## Prerequisites

- JDK 17 or newer
- Node.js and npm for Playwright browser tests
- Docker for container smoke testing (optional)

## Run locally

From the repository root:

```bash
javac -Xlint:all -d . LoopRideApp.java
java project.LoopRideApp 8080
```

Open `http://localhost:8080`. Pass a different available port as the first argument if needed.

## API smoke-test contract

| Request | Expected behavior |
| --- | --- |
| `GET /` | Rider/driver demo UI |
| `GET /index.html` | UI HTML |
| `GET /api/health` | Health response |
| `GET /api/rider` | Demo rider payload |
| `GET /api/driver` | Demo driver payload |
| Unknown path | JSON error and HTTP 404 |
| Unsupported method | HTTP 405 and `Allow: GET` |

Tests should assert status codes, content types, and essential response fields—not just that the server starts. Invalid requests must not mutate demo state.

## Browser tests

Install dependencies and the Chromium browser, then run:

```bash
npm install
npx playwright install --with-deps chromium
npm run test:e2e
```

Cover rider and driver navigation, form validation, recent-trip reuse/clear behavior, responsive layouts, and visible error states where those controls exist. Avoid tests that depend on real routes, accounts, drivers, or payment services.

## Docker smoke test

```bash
docker build -t looprideapp:local .
docker run --rm -p 8080:10000 looprideapp:local
```

Visit `http://localhost:8080`. Confirm the health endpoint responds and an unknown API path returns 404.

## Pull-request checklist

- [ ] Compile with JDK 17+ and review compiler warnings.
- [ ] Run Playwright tests when Node.js/browser dependencies are available.
- [ ] Verify 404 and 405 behavior and the `Allow` header.
- [ ] Run the Docker smoke test when Docker is available.
- [ ] State any checks that could not be run.
- [ ] Keep demo-only behavior and production limitations explicit.
