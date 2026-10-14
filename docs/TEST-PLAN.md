# Test Plan

## Test layers
1. **Unit:** route segment selection, stop order, fare calculation, input schemas, ETA windows, source labels.
2. **Component:** search form validation, result selection, alert creation, operator-mode guidance, accessible labels and empty states.
3. **Integration:** API validation, persistence, transaction boundaries, booking capacity, cancellation idempotency, trip assignment conflict checks.
4. **End-to-end:** passenger search, inspect route, read alert, dispatcher assignment, maintenance block, mobile navigation.
5. **Security:** unauthorized operator mutations, role escalation, injection/XSS, rate limits, secret leakage, personal-data access.
6. **Operational:** deployment health, logs, error reporting, backup restore and stale real-time feed handling.

## Required test cases
| ID | Scenario | Expected result |
|---|---|---|
| T-01 | Origin equals destination | Validation error; no search mutation |
| T-02 | Destination precedes origin on route | No invalid trip offered |
| T-03 | Passenger count is zero/negative/non-integer | Validation error |
| T-04 | Passenger count exceeds seat capacity | Booking rejected |
| T-05 | Same seat inventory is booked concurrently | No overbooking; transaction/constraint protects capacity |
| T-06 | Cancel same booking twice | Idempotent; capacity released once |
| T-07 | Assign bus in maintenance | Assignment rejected |
| T-08 | Bus has overlapping trip | Assignment rejected |
| T-09 | Driver has overlapping duty | Assignment rejected |
| T-10 | Stop disabled in demo console | Affected trip/search reflects demo override |
| T-11 | Operator creates alert with blank title/body | Form blocks submission |
| T-12 | GPS feed timestamp is stale | UI marks location stale; does not claim live |
| T-13 | No AI credential configured | Safe FAQ fallback, no leaked secret |
| T-14 | Small viewport/keyboard-only use | Controls remain visible and operable |
| T-15 | Invalid GTFS references or stop sequences | Import validation reports actionable errors |

## CI gates
- Install locked dependencies.
- Run tests.
- Run lint.
- Run production build.
- Fail on any non-zero command.
- Run dependency and secret scanning where available.
- Deploy only from an explicitly configured branch after checks pass.

## Current limitation
The test cases above define the target. Only tests present in the repository and a recorded CI run can be claimed as executed. Demo-only flows are not evidence of production readiness.
