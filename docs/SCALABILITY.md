# Scalability baseline

LoopRideApp is documented as a ride-coordination UI demo with a small Java HTTP server, not a production booking system. Keep its scalability work proportional to the demo's scope.

## Priorities
- Keep the existing health endpoint and HTTP 404/405 behavior covered by smoke tests.
- For any future persisted trip or driver data, define ownership, input validation, pagination, and indexes before exposing unbounded list endpoints.
- Configure bounded request handling and graceful shutdown; document container CPU/memory limits if deployed.
- Avoid claiming real dispatch, route calculation, payments, or live driver state until those systems are implemented and tested.
- Maintain compile, HTTP smoke, browser E2E, and container smoke workflows in CI.

## Load validation
Benchmark health and read endpoints first; for any future state-changing operations, test duplicate requests and concurrent updates. Track throughput, p95/p99 latency, error rate, JVM memory, thread utilization, and container restart behavior.

## Deployment gates
- [ ] HTTP status and method behavior remain stable.
- [ ] Startup and shutdown under traffic are tested.
- [ ] Resource limits and runtime/JDK version are documented.
- [ ] Load tests are run before describing the demo as production-scale.

This plan does not convert the demo into a live ride-booking service.