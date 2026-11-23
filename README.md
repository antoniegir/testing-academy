# QA Academy: Hands-on Practice Project

One project that covers all 6 topics. Each topic has **learn → run → exercise**.

| # | Topic | Where in this project |
|---|-------|------------------------|
| 1 | Тестирање на REST API со Postman | `postman/QA-Academy.postman_collection.json` |
| 2 | Локатори и идентификација на елементи | `tests/ui/locators.spec.ts` |
| 3 | TypeScript основи за автоматизација | `src/ts-basics.ts` |
| 4 | Автоматско тестирање со Playwright | `tests/ui/todo.spec.ts`, `pages/TodoPage.ts`, `tests/api/posts.spec.ts` |
| 5 | Контрола на верзии со Git | this repo itself (see Git section) |
| 6 | AI алатки во секојдневното QA | `ai-prompts/qa-prompts.md` |

Practice targets (public, safe, no login):
- UI: https://demo.playwright.dev/todomvc
- API: https://jsonplaceholder.typicode.com

## Setup (once)
```bash
npm install
npx playwright install chromium
npm test            # runs UI + API tests
npm run report      # opens the HTML report
```

---

## Suggested order (≈ 4 weeks, ~1 h/day)

### Week 1: TypeScript + Git
**TypeScript**: read and run `npm run ts:basics`. Key ideas: types, interfaces, union types, functions, `async/await`, classes, array methods (`filter`, `map`, `every`).
Exercises:
1. Add an interface `Comment { postId, id, name, email, body }` and a function `getComments(postId)`.
2. Write `countByUser(posts: Post[]): Record<number, number>`.
3. Run `npm run typecheck`, break a type on purpose, read the error.

**Git**: daily commands
```bash
git status                      # what changed?
git add <file>                  # stage
git commit -m "test: add login tests"
git log --oneline --graph       # history
git switch -c feature/comments  # new branch
git diff                        # see unstaged changes
git switch main && git merge feature/comments
git restore <file>              # throw away local change
```
Exercises: do every exercise in this README on its own branch, commit with [conventional commits](https://www.conventionalcommits.org) (`test:`, `fix:`, `feat:`, `chore:`), merge into `main`. Then create a GitHub repo and `git push`, and open a Pull Request against yourself.

### Week 2: REST API + Postman
Concepts: HTTP methods (GET/POST/PUT/PATCH/DELETE), status codes (2xx/4xx/5xx), headers, query vs path params, JSON body, auth (Bearer token, API key), idempotency.

1. Postman → **Import** → `postman/QA-Academy.postman_collection.json`.
2. Open each request: look at the **Tests** (Scripts → Post-response) tab, then send it.
3. Run the whole collection with **Collection Runner**.
4. CLI (good for CI): `npx newman run postman/QA-Academy.postman_collection.json`

Exercises:
1. Create an **Environment** `dev` with `baseUrl` and switch the collection to use it.
2. Add requests for `/comments?postId=1`: assert every item has an `email` containing `@`.
3. Add a negative test: POST with an empty body. What does the API return? Is that a bug in a real API?
4. Chain requests: use `{{createdPostId}}` (set by the POST request) in a following GET.

### Week 3: Locators + Playwright UI
Locator priority (best → worst):
1. `getByRole('button', { name: 'Save' })`
2. `getByLabel`, `getByPlaceholder`, `getByText`
3. `getByTestId('…')` (`data-testid`)
4. CSS `locator('.class > li')`
5. XPath (last resort)

Rules: use web-first assertions (`await expect(locator).toBeVisible()`), never `waitForTimeout`, and keep locators in Page Objects.

Tools:
```bash
npm run codegen        # record actions → generates locators for you
npm run test:headed    # watch the browser
npm run test:debug     # step through with the Inspector
npx playwright test --ui   # UI mode: time-travel debugging (best for learning)
```
In Chrome DevTools: right-click → Inspect → `Ctrl/Cmd+F` in Elements to test a CSS/XPath selector.

Exercises:
1. Add `TodoPage.editTodo(oldTitle, newTitle)` (double-click label → fill → Enter) and a test for it.
2. Test "Mark all as complete" toggles every item.
3. Test that todos survive a page reload (`page.reload()`).
4. Make one test fail on purpose, then open the trace in the report.

### Week 4: Playwright API tests + AI + mini project
1. Read `tests/api/posts.spec.ts` and compare it with the Postman collection. Same checks, but in code.
2. Add API tests for `/users`: schema, 10 users, each `email` valid.
3. **Hybrid test**: create data through the API, verify it in the UI (pattern used in real projects).
4. Use `ai-prompts/qa-prompts.md`: generate test cases for a feature, then **review** them critically. What did the AI miss or get wrong?
5. Add GitHub Actions CI (`npx playwright init` can generate `.github/workflows/playwright.yml`).

**Final mini project:** pick a practice site (e.g. https://automationexercise.com or https://the-internet.herokuapp.com), write 10 UI + 5 API tests with Page Objects, push to GitHub with CI. That's your portfolio piece.

---

## Project structure
```
pages/        Page Objects (locators + actions)
tests/ui/     UI tests (browser)
tests/api/    API tests (no browser)
src/          TypeScript practice
postman/      Postman collection
ai-prompts/   Prompt library for QA work
```
