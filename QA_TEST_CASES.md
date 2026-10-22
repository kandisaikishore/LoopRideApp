# QA Test Case Scenarios

| ID | Test | Expected result | Automation |
|---|---|---|---|
| LR-01 | GET / | HTTP 200, HTML content and Rider UI | GitHub Actions HTTP smoke |
| LR-02 | GET /index.html | HTTP 200 and Driver UI markup | GitHub Actions HTTP smoke |
| LR-03 | GET /api/health | HTTP 200, JSON content type and status UP | GitHub Actions HTTP smoke |
| LR-04 | GET /api/rider | HTTP 200, rider role and ready status | GitHub Actions HTTP smoke |
| LR-05 | GET /api/driver | HTTP 200, driver role, offline state | GitHub Actions HTTP smoke |
| LR-06 | GET /api/does-not-exist | HTTP 404 and JSON error | GitHub Actions HTTP smoke |
| LR-07 | GET /unknown-page | HTTP 404 and JSON error | GitHub Actions HTTP smoke |
| LR-07a | GET /api/health/extra | HTTP 404 and JSON error | GitHub Actions HTTP smoke |
| LR-07b | GET /api/unknown?source=smoke | HTTP 404 and JSON error | GitHub Actions HTTP smoke |
| LR-07c | GET /favicon.ico | HTTP 404 and JSON error | GitHub Actions HTTP smoke |
| LR-08 | POST /api/health | HTTP 405, JSON error and Allow: GET | GitHub Actions HTTP smoke |
| LR-09 | PUT /api/health | HTTP 405, JSON error and Allow: GET | GitHub Actions HTTP smoke |
| LR-10 | PATCH /api/health | HTTP 405, JSON error and Allow: GET | GitHub Actions HTTP smoke |
| LR-11 | DELETE /api/health | HTTP 405, JSON error and Allow: GET | GitHub Actions HTTP smoke |
| LR-12 | HEAD /api/health | HTTP 405 with `Allow: GET` | GitHub Actions HTTP smoke |
| LR-13 | Compile with JDK 17 | Source compiles without errors | GitHub Actions Java compile |
| LR-14 | Rider destinations, search and fare estimate | Destination selection and selected fares render correctly | Playwright E2E |
| LR-15 | Driver toggle behavior | Toggle updates visible status locally | Playwright E2E |
| LR-16 | Rider/Driver role switching | Only the selected workspace is visible | Playwright E2E |
| LR-17 | Request review and clear trip | Demo-only request message is shown and clearing disables request | Playwright E2E |
| LR-18 | Mobile viewport | Main workspace fits a narrow viewport without horizontal overflow | Playwright E2E |
| LR-19 | Recent trip reuse and clear history | Saved trip can be reused and recent history cleared | Playwright E2E |
| LR-20 | Recent-trip malformed storage | Unknown destinations, invalid object shapes, and invalid negative distances are ignored | Playwright E2E |
| LR-21 | Browser storage unavailable | Rider interactions remain usable when storage access throws | Playwright E2E |
| LR-22 | Fare combinations | All supported destinations and ride tiers produce expected integer fares | Playwright E2E |
| LR-23 | Concurrent request handling | Each request receives a complete response under concurrent load | Not yet automated |
| LR-24 | Live deployment availability and latency | External deployment responds as expected | Not tested in this workflow |

## Scope notes

A green workflow proves only the checks executed in that workflow. Load/concurrency testing, live deployment validation, security review, and manual user acceptance are separate activities and must not be reported as passing without their own evidence.
