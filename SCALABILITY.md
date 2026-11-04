# Scalability and capacity plan

## Current scope
LoopRideApp currently has a Java application entry point and a container build. Validate its runtime architecture before introducing distributed services.

## Priorities
- Separate request handling, business rules, persistence, and integrations; keep domain operations independent of UI/transport code.
- Replace any unbounded in-memory collections used for production data with persistent storage and bounded queries.
- Add pagination and input limits to list/search operations.
- Protect shared mutable state with explicit concurrency controls; prefer immutable request data and transaction boundaries.
- Add bounded database connection pooling if a database is introduced. Pool limits must account for the number of replicas.
- Use request timeouts and bounded retries for external calls.
- Make health endpoints report process liveness separately from dependency readiness.
- Externalize configuration and keep secrets out of images and source control.

## Validation
Measure baseline throughput and p95/p99 latency, test concurrent user workflows, exercise malformed and oversized inputs, and validate graceful shutdown. Run load tests against an isolated environment with production-like data volume.

## Production gates
- [ ] No production-critical state is held only in process memory.
- [ ] Concurrency and transaction behavior have regression tests.
- [ ] Container uses a non-root user and a bounded runtime image.
- [ ] Logs, metrics, health checks, and alert thresholds are defined.
- [ ] Capacity and rollback decisions are based on load-test results.

No runtime changes or load tests are claimed by this planning document.
