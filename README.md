# QA Academy: Road to Senior QA Engineer (Playwright + TypeScript)

**Goal:** be ready for roles like *Senior QA Engineer @ Storyblok* (headless CMS, fully remote, Europe).
**Strategy:** build skills **and** a public GitHub portfolio that proves them.

## What the target role asks for → where you learn it
| Job requirement | Phase |
|---|---|
| Playwright tests across frontend **and** backend | 1, 3 |
| Deep TypeScript: advanced typing, code architecture | 0, 2 |
| Reusable abstractions, linting/tooling standards, code review | 3, 4 |
| Define & enforce the **test pyramid** (unit / integration / E2E) | 5 |
| CI/CD with **GitHub Actions**, **containerized** test environments | 6 |
| Manual & exploratory testing, defect tracking, test metrics | 1, 5 |
| Mentoring, influencing testability, communication | all (write-ups, PRs, strategy doc) |
| AI literacy with sound judgment | all (`ai-prompts/`) |
| *Nice to have:* performance testing, observability (Sentry/Grafana), Ruby on Rails | 7 |

**Honest note:** "7+ years" and "mentoring experience" can't be fast-tracked. A portfolio that shows senior-level *engineering* (clean architecture, CI, strategy) is what gets a less-experienced candidate an interview.

---

## Setup (once)
```bash
npm install
npx playwright install chromium
npm test            # all test projects
npm run report      # HTML report
npx playwright test --ui   # UI mode: best for learning
```

## Project map
| Topic | Where |
|---|---|
| REST API with Postman | `postman/QA-Academy.postman_collection.json` |
| Locators | `tests/ui/locators.spec.ts` |
| TypeScript basics | `src/ts-basics.ts`, `src/week1.ts` |
| Playwright UI + Page Object | `tests/ui/todo.spec.ts`, `pages/TodoPage.ts` |
| Playwright API tests | `tests/api/posts.spec.ts` |
| AI in QA | `ai-prompts/qa-prompts.md` |

Practice targets (public, no login): UI https://demo.playwright.dev/todomvc · API https://jsonplaceholder.typicode.com

**Work habit for every phase:** one branch per topic → small commits (`feat:`, `test:`, `fix:`, `docs:`, `chore:`) → merge to `main`. From Phase 1 on: push to GitHub and use Pull Requests.

---

## Progress
- [x] **Phase 0**: TypeScript + Git basics (Week 1)
- [ ] **Phase 1**: API testing + Playwright foundations (~3 weeks)
- [ ] **Phase 2**: Advanced TypeScript (~3 weeks)
- [ ] **Phase 3**: Playwright framework architecture (~4 weeks)
- [ ] **Phase 4**: Engineering standards (~2 weeks)
- [ ] **Phase 5**: Test pyramid & test strategy (~2 weeks)
- [ ] **Phase 6**: CI/CD + Docker (~2 weeks)
- [ ] **Phase 7**: Performance, observability, AI (~2 weeks)
- [ ] **Capstone**: portfolio project

≈ 4–5 months at ~1 h/day.

---

## ✅ Phase 0: TypeScript + Git basics (done)
`src/week1.ts`: union types, interfaces, regex, `async/await` + `fetch`, `Record` + loops, classes.
Git: identity, branches, commits, merge. Check: `npm run test:week1` → 5 passed.

---

## Phase 1: API testing + Playwright foundations (~3 weeks)

### 1a. REST API + Postman (week 2)
Concepts: HTTP methods, status codes (2xx/4xx/5xx), headers, query vs path params, JSON body, auth (Bearer token, API key), idempotency.

1. Postman → **Import** → `postman/QA-Academy.postman_collection.json`. Read each request's **Scripts → Post-response** tab, send it.
2. Run the collection with **Collection Runner**, then from the CLI: `npx newman run postman/QA-Academy.postman_collection.json`

Exercises:
1. Create an **Environment** `dev` with `baseUrl`; switch the collection to it.
2. Add `/comments?postId=1`: assert every `email` contains `@`. (Reuse your `isValidEmail` idea!)
3. Negative test: POST with an empty body. Is the response a bug in a real API?
4. Chain requests with `{{createdPostId}}`.
5. **Push to GitHub** and open your first Pull Request.

### 1b. Locators + Playwright UI (week 3)
Locator priority: `getByRole` → `getByLabel`/`getByPlaceholder`/`getByText` → `getByTestId` → CSS → XPath (last resort).
Rules: web-first assertions (`await expect(...)`), never `waitForTimeout`, locators live in Page Objects.

Tools: `npm run codegen` · `npm run test:headed` · `npm run test:debug` · `npx playwright test --ui`

Exercises:
1. `TodoPage.editTodo(old, new)` (double-click → fill → Enter) + test.
2. Test "Mark all as complete".
3. Test that todos survive `page.reload()`.
4. Break a test on purpose and read its **trace**.

### 1c. Playwright API tests + exploratory testing (week 4)
1. Compare `tests/api/posts.spec.ts` with the Postman collection: same checks in code.
2. API tests for `/users`: 10 users, each `email` valid.
3. **Exploratory session** (45 min) on https://demo.playwright.dev/todomvc: write a short charter ("Explore editing with unusual input to find data loss"), notes, and **2 bug reports** in `docs/exploratory/`.

---

## Phase 2: Advanced TypeScript (~3 weeks)
*Job: "deep proficiency in TypeScript, advanced typing and code architecture".*

Concepts: generics with constraints (`<T extends ...>`), utility types (`Partial`, `Pick`, `Omit`, `Required`, `Readonly`, `Record`), discriminated unions, type narrowing & type guards, `keyof`/`typeof`, `as const`, `satisfies`, enums vs union types, modules/barrel files, error handling with typed results.

Exercises:
1. Typed API client: `ApiClient.get<T>(path): Promise<T>` used by all API tests.
2. Runtime schema validation with **zod**: one schema → both the TS type (`z.infer`) and response validation.
3. Discriminated union for test users: `{ role: 'admin'; permissions: string[] } | { role: 'viewer' }`.
4. Typed test-data builders: `new PostBuilder().withTitle('x').build()` using `Partial<Post>` overrides.
5. Turn on `noUncheckedIndexedAccess` in `tsconfig.json` and fix every error. Explain why it helps.

---

## Phase 3: Playwright framework architecture (~4 weeks)
*Job: "efficient, well-typed, reliable tests", "reusable abstractions".*

Topics & exercises:
1. **Custom fixtures** (`test.extend`): inject `todoPage`, `apiClient`, `userFactory` into tests instead of `new`-ing them.
2. **Page Objects + Components**: split reusable parts (header, modal, table) into component objects.
3. **Authentication**: global setup + `storageState` so tests skip the login UI.
4. **API + UI hybrid**: create data via API, verify in UI, clean up after.
5. **Network control**: `page.route()` to mock responses and test error states (500, empty list, slow network).
6. **Tags & projects**: `@smoke`, `@regression`; run with `--grep`. Multiple browsers/devices.
7. **Reliability**: retries, `trace: 'on-first-retry'`, find and fix a flaky test, `expect.poll`, `toPass`.
8. **Visual comparisons** (`toHaveScreenshot`) and **accessibility checks** (`@axe-core/playwright`).

---

## Phase 4: Engineering standards (~2 weeks)
*Job: "linting/tooling standards, code review practices, coding standards".*

1. ESLint + `typescript-eslint` + `eslint-plugin-playwright` (catches missing `await`, focused tests, etc.).
2. Prettier + `npm run lint` / `npm run format`.
3. Husky + lint-staged: lint and typecheck before every commit.
4. `CONTRIBUTING.md`: naming conventions, folder structure, locator rules, "definition of done" for a test.
5. PR template + review checklist. Review your own older code with it (and with AI, `ai-prompts/` #8) and fix what it finds.

---

## Phase 5: Test pyramid & test strategy (~2 weeks)
*Job: "define, implement, and enforce the test pyramid… which test level is appropriate".*

1. **Vitest** unit tests for pure logic (`classifyStatus`, `isValidEmail`, builders). Notice how much faster they are than E2E.
2. Integration tests at API level vs E2E: write the same check at 3 levels, compare speed and stability.
3. Write `docs/TEST_STRATEGY.md`: pyramid, a **decision table** ("change type → test level"), risk-based prioritization, entry/exit criteria, metrics (pass rate, flaky rate, duration, defect leakage).
4. Measure: add a script that reports test counts per level and average duration.

This document is a great interview topic: be ready to defend every choice in it.

---

## Phase 6: CI/CD + Docker (~2 weeks)
*Job: "CI/CD pipelines (GitHub Actions)", "containerized test environments".*

1. GitHub Actions workflow: on every PR run lint → typecheck → unit → API → E2E.
2. Cache dependencies, upload the HTML report + traces as artifacts, show the status badge in the README.
3. **Sharding** (`--shard=1/3`) with a matrix + merged report.
4. Run tests in the official Playwright **Docker** image locally and in CI.
5. `docker-compose` with an app under test + the test runner (a "containerized test environment").
6. Scheduled nightly regression run.

---

## Phase 7: Performance, observability, AI (~2 weeks)
*Job: AI literacy (required); performance & observability (nice to have).*

1. **k6** load test for the API (thresholds on p95 latency and error rate) + run it in CI.
2. Observability: create a free Sentry project for a small demo app, trigger errors, learn to read a stack trace and spot trends.
3. AI in QA: generate test ideas for a feature, then document what AI got **wrong** and how you verified. Judgment is the skill they're hiring for.
4. Optional: Ruby basics (Storyblok's backend uses Rails) such as reading a Rails controller and its tests.

---

## 🎯 Capstone: portfolio project
A public GitHub repo testing a real web app, ideally **CMS-like** (content, editors, publishing, roles):
- UI + API + unit tests following your `TEST_STRATEGY.md`
- Typed fixtures, Page/Component Objects, zod schemas, test-data builders
- ESLint/Prettier/Husky, PR template, `CONTRIBUTING.md`
- GitHub Actions with sharding, reports and a badge; Docker setup
- A k6 test and a short exploratory testing report
- A clear README: what's tested, why, how to run it, and decisions you made

Then: put it on your CV/LinkedIn, and practice explaining the architecture in 5 minutes.

---

## Project structure
```
pages/        Page Objects (locators + actions)
tests/ui/     UI tests (browser)
tests/api/    API tests (no browser)
tests/week1/  Self-check tests for Phase 0
src/          TypeScript practice
postman/      Postman collection
ai-prompts/   Prompt library for QA work
```
