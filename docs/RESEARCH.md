# Research and Reference Sources

This document records standards and guidance used to shape the RoutePulse Bus Management System. It is engineering research, not legal advice or a compliance certification.

## 1. General Transit Feed Specification (GTFS)
**Official overview:** https://gtfs.org/documentation/overview/

GTFS Schedule represents static service information such as agencies, routes, trips, stops, stop times and calendars. GTFS Realtime complements the schedule with trip updates, service alerts and vehicle positions. Use these formats as the canonical interoperability target instead of inventing a proprietary public transit export format.

**Schedule reference:** https://gtfs.org/documentation/schedule/reference/

The reference defines file requirements and field semantics. Validate identifiers and references between routes, trips, stops and stop times; preserve stable identifiers between feed versions.

**Getting started:** https://gtfs.org/getting-started/create/

The official guidance recommends collecting accurate agency, stop, route, timetable and fare information before creating a feed. This supports separating verified source data from illustrative demo records.

## 2. GTFS Realtime
**Official documentation:** https://gtfs.org/documentation/realtime/

Realtime supports trip updates, service alerts and vehicle positions. A production integration must refresh the feed regularly, validate timestamps and entities, expose freshness to the user and handle missing/stale data without implying current knowledge.

## 3. GTFS Schedule best practices
**MobilityData guide:** https://github.com/MobilityData/GTFS_Schedule_Best-Practices/blob/master/en/best-practices.md

Use the best-practice guide alongside the normative reference when building feed exports. Treat normative requirements and recommendations distinctly during validation.

## 4. Indian public bus operations
**MoHUA — Guidelines for participation by private operators in city bus transport services:** https://mohua.gov.in/upload/uploadfiles/files/GuidelineCityBus.pdf

The guidance discusses intelligent transport systems, automatic vehicle location and passenger information systems as operational tools for tracking, schedule adherence and service information. Applicability to a particular operator or jurisdiction must be confirmed by the operator's compliance/legal team.

**BIS preliminary draft public bus transport guidelines:** https://www.services.bis.gov.in/tmp/WCSSD40224996_08082024_3.pdf

This draft discusses public bus transport service quality, intelligent transport systems and integration with other modes. It is a preliminary draft, not proof that the application meets a binding standard.

## 5. Design implications
- Keep schedule data and real-time telemetry separate.
- Record source and observation time for all vehicle positions and service alerts.
- Preserve stable IDs for routes/stops/trips when importing feeds.
- Expose pickup/drop landmarks and stop sequence clearly.
- Make accessible service attributes explicit and sourced.
- Do not label demo data as official, live, verified or regulatory compliant.

## 6. Source review note
Links were consulted as references during requirements preparation. Operators should re-check current versions and applicable local rules before production adoption.
