# LoopRideApp

[![Repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/saikishore2410/LoopRideApp) [![Issues](https://img.shields.io/github/issues/saikishore2410/LoopRideApp)](https://github.com/saikishore2410/LoopRideApp/issues) [![Last Commit](https://img.shields.io/github/last-commit/saikishore2410/LoopRideApp)](https://github.com/saikishore2410/LoopRideApp/commits/main)

> LoopRideApp serves an embedded web experience from a small Java HTTP server, making it a compact starting point for exploring server-side routing and ride-hailing UI workflows.

## At a glance

- **Purpose:** Understand the problem and supported workflows from the feature and scope sections below.
- **Setup:** Follow the project-specific steps in **Getting started** or **Run locally**; verify commands against the current source and package scripts.
- **Configuration:** Keep API keys, database passwords, tokens, and user data out of commits. Use local environment variables for secrets.
- **Quality:** Run the available build, tests, and lint checks before proposing changes.



**A lightweight Java ride-hailing prototype with separate rider and driver web interfaces.**

LoopRideApp serves an embedded web experience from a small Java HTTP server, making it a compact starting point for exploring server-side routing and ride-hailing UI workflows.

## Highlights

- Rider and driver interfaces served by a Java HTTP server
- Uses Java's built-in `HttpServer` without third-party Java dependencies
- Tries ports 8080–8084 by default
- Optional Docker packaging
- QA test documentation and a GitHub Actions CI workflow

## Technology

- JDK 17+
- Java built-in HTTP server
- Docker (optional)

## Project structure

```text
LoopRideApp.java
Dockerfile
README.md
QA_TEST_CASES.md
QA_EXECUTION.md
.github/workflows/ci.yml
```

## Run locally

```bash
git clone https://github.com/saikishore2410/LoopRideApp.git
cd LoopRideApp
javac -d . LoopRideApp.java
java project.LoopRideApp
```

Open the address printed in the terminal. To request a specific port:

```bash
java project.LoopRideApp 9000
```

## Testing

Review `QA_TEST_CASES.md` and `QA_EXECUTION.md`, then inspect the CI workflow for automated checks.

## Prototype limitations

Treat this as a demo until production capabilities are implemented and independently verified. Authentication, durable ride/order storage, real-time location tracking, dispatch, payments, privacy controls, and operational monitoring require dedicated design and testing.

## Contributing

Bug reports should include steps to reproduce and expected versus actual behaviour. Pull requests should explain changes and validation.

## License

No license is specified. Add a `LICENSE` file before allowing reuse.