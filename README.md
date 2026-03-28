# Cypress Conduit POC

Cypress test automation framework for the [Conduit (RealWorld)](https://demo.realworld.show) app — a Medium.com clone. Covers API and UI testing with a hybrid architecture designed for scalability and maintainability.


## Tech Stack

| Tool | Purpose |
|------|---------|
| Cypress 15.x | Test runner |
| TypeScript 5.x | Type safety |
| @faker-js/faker | Dynamic test data |
| @cypress/grep | Test tagging and filtering |
| Mochawesome | HTML reporting |
| ESLint + eslint-plugin-cypress | Linting |
| GitHub Actions | CI/CD |

## Architecture

**Hybrid approach: Custom Commands + Lightweight Page Objects + Factory Pattern**

This project tests an external app (no access to source code), so App Actions aren't viable. The hybrid approach provides:

- **Custom Commands** (`cypress/support/commands/`) — API authentication, data seeding, cleanup. Used for fast test setup via `cy.request()` instead of the UI.
- **Lightweight Page Objects** (`cypress/support/pages/`) — UI selectors and actions per screen. No assertions inside POs. Fluent interface (methods return `this` for chaining).
- **Factory Pattern** (`cypress/support/factories/`) — Dynamic data generation with faker. Each test run uses unique data to avoid collisions.

### Why this architecture?

- **API seeding for setup** — 50%+ faster than UI setup, eliminates flakiness in test preconditions
- **Page Objects for external apps** — encapsulates selectors that may change, keeps tests readable
- **Factories over fixtures** — enables parallel execution without data collisions

## Folder Structure

```
cypress/
  e2e/
    api/              # Pure API tests (auth, articles, comments, favorites, profiles, tags)
    ui/               # UI tests organized by feature
      auth/           #   Login, register
      articles/       #   Create, edit, delete
      comments/       #   Add comments
      feed/           #   Global feed, intercept patterns
      profile/        #   User profile
  fixtures/           # Static test data and stub responses
  support/
    commands/         # Custom Cypress commands (auth, api)
    pages/            # Lightweight page objects
    factories/        # Faker-based data factories
    types/            # TypeScript declarations
    e2e.ts            # Support entry point
```

## Setup

```bash
# Install dependencies
npm install

# Open Cypress interactive mode
npm run cy:open

# Run all tests headless
npm run cy:run
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run cy:open` | Open Cypress Test Runner (interactive) |
| `npm run cy:run` | Run all tests headless |
| `npm run cy:run:api` | Run API tests only |
| `npm run cy:run:ui` | Run UI tests only |
| `npm run cy:run:smoke` | Run smoke tests (happy paths) |
| `npm run cy:run:regression` | Run regression tests (edge cases) |
| `npm run cy:run:report` | Run all tests and generate HTML report |
| `npm run lint` | Lint all test files |

## Test Tagging

Tests are tagged using `@cypress/grep` for selective execution:

| Tag | Purpose |
|-----|---------|
| `@api` | All API tests |
| `@ui` | All UI tests |
| `@smoke` | Happy path tests across API and UI |
| `@regression` | Edge cases, error scenarios, negative tests |

## CI/CD Pipeline

GitHub Actions workflow with 3 jobs:

1. **smoke-tests** — Runs `@smoke` tagged tests on Chrome
2. **api-tests** — Runs API tests (no browser needed)
3. **ui-tests** — Runs UI tests on Chrome and Firefox (matrix strategy)

Artifacts (screenshots, videos, Mochawesome reports) are uploaded on every run, including failures.

## Key Design Decisions

| Decision | Reasoning |
|----------|-----------|
| API seeding instead of UI setup | Speed, reliability, test isolation |
| Hybrid architecture (Commands + POs) | Commands for cross-cutting, POs for external app UI |
| TypeScript | Autocomplete, compile-time safety, industry standard |
| Factories over hardcoded data | Eliminates data collisions, enables parallel execution |
| Separate API/UI directories | Different speed profiles, independent CI parallelization |
| `cy.intercept()` for network control | Deterministic tests via stubbing, error simulation |

**Author:** Marco Urquidi
