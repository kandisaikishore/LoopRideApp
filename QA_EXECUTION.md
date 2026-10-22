# White-Box QA Review — LoopRideApp

## Scope and method

Reviewed the Java HTTP handler, startup/port argument validation, inline browser JavaScript, local-storage access, fare calculations, and GitHub Actions workflow. The fixes below were committed directly to `main`. This review used source inspection through GitHub; no local shell was available to run the compiler or browser tests directly in this session.

## Findings fixed

1. **Invalid server port was silently ignored.** Previously, a non-numeric port was logged and then the server fell back to scanning ports 8080–8084. Startup now rejects non-numeric ports with an informative exception and rejects values outside 0–65535.
2. **Recent-trip persistence accepted malformed record shapes.** Previously any JSON array was returned, including objects with unexpected destinations, ride types, and numeric fields. Stored records are now filtered against known destinations, accepted ride types, and finite non-negative distances/fares before reuse/rendering.
3. **Fare breakdown was internally inconsistent.** The displayed base/distance components did not clearly add up to the destination base fare and multiplier adjustment. The UI now shows the standard sample fare and selected ride multiplier/final estimate, with explicit copy that pricing is illustrative.

## Existing protections observed

- Unknown GET routes return HTTP 404 JSON.
- Unsupported methods return HTTP 405 and set `Allow: GET`.
- Dynamic recent-trip labels use `textContent`, rather than interpolating user data into HTML.
- Browser-storage failures are caught.
- GitHub Actions includes Java compilation, HTTP route/method smoke checks, browser E2E, and Docker smoke jobs.

## Verification

- Existing scheduled CI tracker run: [Daily CI and Test Tracker](https://github.com/kandisaikishore/LoopRideApp/actions/runs/39682308708), completed successfully on 2026-10-21 before the changes in this review.
- Each source/doc update committed to `main`; the latest reviewed source is linked below.
- A fresh post-change CI result has not yet been observed in this review. Do not treat the prior success as validation of the new changes.
- No claim is made that Java compilation, browser E2E, Docker execution, load testing, or a live deployment was run locally here.
