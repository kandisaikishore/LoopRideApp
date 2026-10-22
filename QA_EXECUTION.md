# White-Box QA Review — LoopRideApp

## Scope and method

Reviewed the Java HTTP handler, startup/port argument handling, inline client-side JavaScript, local-storage access, fare calculations, and checked-in GitHub Actions workflow. This was a source inspection through the GitHub connector; no local shell was available to compile or execute the app during this review.

## Verified code-level findings

1. **Invalid port argument silently falls back to auto-selection.** `main` logs an invalid integer but leaves `requestedPort` at zero. A typo such as `java project.LoopRideApp abc` therefore starts on 8080–8084 instead of failing fast. Values outside the valid TCP port range are also not rejected explicitly.
2. **Recent-trip storage trusts stale/unexpected object shapes.** `readRecentTrips` only confirms that the stored JSON is an array. Objects with unexpected `destination`, `rideType`, `distance`, or `fare` values flow into rendering and reuse logic. The display uses textContent (good XSS protection), but malformed data can produce misleading output and unusable recent-trip buttons.
3. **The fare breakdown can be misread.** The base and distance line items are split from the base destination sample fare, while the multiplier adjustment is applied to the full base amount; displayed line items are illustrative and not guaranteed to sum to the final fare. The UI calls these estimate components, so the breakdown should be internally consistent.

## Existing protections observed

- Unknown GET routes return 404 JSON.
- Unsupported methods return 405 and set `Allow: GET`.
- Dynamic recent-trip labels are inserted with `textContent`, rather than interpolated into HTML.
- Browser storage failures are caught to support restrictive/private browsing contexts.
- Existing GitHub Actions CI includes Java compilation, HTTP route/method smoke checks, browser E2E, and Docker smoke tests.

## Verification status

- Most recent scheduled tracker run observed during this review: [Daily CI and Test Tracker](https://github.com/kandisaikishore/LoopRideApp/actions/runs/39682308708), completed successfully on 2026-10-21.
- The tracker run is not a substitute for a fresh post-change test run.
- No claim is made here that this review executed the Java compiler, browser suite, or container locally.
