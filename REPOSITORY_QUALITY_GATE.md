# Repository Quality Gate

This repository-level checklist defines baseline smoke and compatibility testing expectations. Keep checks aligned with the actual stack and avoid silently passing when a required test command is missing.

## Pull request / push gate
- Install dependencies from the repository's lockfile where one exists.
- Validate syntax / compile the application using the project's documented toolchain.
- Run unit and integration tests that are present; fail clearly if a required test command is unavailable.
- Build production artifacts for applications that define a production build.
- Run a basic application smoke test when a runnable local service or executable exists.
- Check supported runtime versions and record the versions tested.
- Upload test/build artifacts only when useful for debugging, with bounded retention.

## Evidence standard
A green workflow means only the steps in that workflow passed. It does not prove production deployment, external service availability, manual user acceptance, or features not exercised by automated tests. Record skipped checks and reasons instead of reporting them as passed.

## Production readiness (not yet satisfied)
- Do not describe this demo as a production ride-booking service until authentication/authorization, durable booking and driver state, dispatch, security/privacy review, and integration/deployment checks are implemented and verified.
- Browser local storage and client-side availability controls are untrusted demo state; production booking and driver state must be server-authoritative.
- Track the required implementation in [issue #6](https://github.com/kandisaikishore/LoopRideApp/issues/6).

## Maintenance
- Prefer maintained, versioned GitHub Actions; review action release notes before major upgrades.
- Use least-privilege workflow permissions and concurrency cancellation for superseded branches.
- Pin third-party actions to reviewed commit SHAs when the repository's security policy requires immutable references.
- Avoid dependency-wide upgrades without release-note and compatibility review.
