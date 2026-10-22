# White-Box QA Review — LoopRideApp

## Scope

Reviewed the Java server startup/port parsing, HTTP routes, inline client-side state management, persisted recent-trip records, fare calculation display, and existing CI automation.

## Fixes committed to main

- Reject invalid/non-numeric port arguments and values outside 0–65535 instead of silently falling back to automatic port selection.
- Validate persisted recent-trip entries against known destinations, supported ride types, and finite non-negative numeric fields before rendering or reuse.
- Simplify the displayed fare breakdown to show the standard sample fare plus selected ride multiplier/final estimate, avoiding misleading line items.

## Existing protections confirmed by source review

- Unknown GET routes return 404 JSON.
- Unsupported methods return 405 with `Allow: GET`.
- Recent-trip dynamic labels use DOM `textContent`, avoiding HTML interpolation of persisted text.
- Local-storage read/write failures are handled.

## Retest status

- [LoopRideApp CI — run 39711483989](https://github.com/kandisaikishore/LoopRideApp/actions/runs/39711483989): completed successfully for commit `684283f4f5dbd0861cac683b18034383635d60fb`. All three jobs passed: Java HTTP smoke, browser E2E, and Docker smoke.
- Additional repository quality and daily tracker workflows were triggered by follow-up QA documentation/automation commits; their latest status may be inspected in the Actions tab.
- These results validate the tested commit above. The final later documentation commits do not change application source.
- Load/concurrency testing and live deployment validation were not performed as part of this run.