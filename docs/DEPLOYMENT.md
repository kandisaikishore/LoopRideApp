# Deployment Guide

## Demo deployment
The existing RoutePulse demo is published through Lovable and its source is maintained in GitHub. Check the live deployment and branch CI status before announcing a release. The current data is illustrative and should be presented as a demo.

## GitHub workflow
1. Work on the `routepulse-ai` branch for the current transit prototype.
2. Keep commits scoped and descriptive.
3. Require CI to run tests, lint and build on pushes and pull requests.
4. Review the diff and test output before merging to the default branch.
5. Never commit API keys, database credentials, passenger records or operator secrets.

## Render deployment checklist
- Connect the repository and select the intended branch.
- Set the runtime/build/start commands according to the repository scripts.
- Configure required server-side environment variables in the Render dashboard.
- Configure persistent database and migrations before enabling persistent bookings.
- Add a health check and confirm the deployed URL responds successfully.
- Review logs and deployment events; do not report success until the service is healthy.
- Ensure automatic deployments do not bypass required CI checks.

## Production checklist
- [ ] Approved timetable/GTFS source and data licence.
- [ ] Authorized AVL/GPS or GTFS-Realtime source.
- [ ] Licensed maps, routing and geocoding.
- [ ] Server-side identity, roles and authorization.
- [ ] Persistent database, migrations, backups and restore test.
- [ ] Transaction-safe seat inventory and assignment conflict checks.
- [ ] Payment provider integration and reconciliation, if ticket sales are enabled.
- [ ] Privacy notice, retention rules and incident response.
- [ ] Security review, accessibility testing and operator acceptance.
- [ ] Monitoring for feed freshness, API errors and deployment health.
