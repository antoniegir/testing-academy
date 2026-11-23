# Користење AI алатки во секојдневното QA: prompt library

Copy, fill in the `<...>` parts, paste into Claude / ChatGPT / Copilot.
**Golden rule:** AI is a fast junior colleague. Always review its output, and never paste real customer data, passwords or API keys.

## 1. Test cases from a requirement
```
You are a senior QA engineer. From this user story, write test cases as a table:
ID | Title | Preconditions | Steps | Expected result | Priority | Type (positive/negative/edge).
Include boundary values and negative cases.
User story: <paste story + acceptance criteria>
```

## 2. Bug report from rough notes
```
Turn these notes into a clear bug report with: Title, Environment, Steps to reproduce,
Expected, Actual, Severity, Attachments needed. Notes: <paste>
```

## 3. Playwright test from manual steps
```
Write a Playwright + TypeScript test for these steps. Use getByRole/getByLabel/getByTestId
locators (no XPath), web-first assertions (await expect(...)), and the Page Object in
pages/TodoPage.ts if relevant. Steps: <paste>
```

## 4. Explain a failing test
```
This Playwright test fails. Explain the most likely root cause (flaky timing, wrong locator,
real bug?) and suggest a fix. Test code: <paste>  Error output: <paste>
```

## 5. API test data & negative cases
```
For this endpoint and JSON schema, list negative and edge-case payloads
(missing fields, wrong types, empty strings, very long strings, special chars, SQL/script injection
strings) and the status code you'd expect for each. Endpoint: <method + url>  Schema: <paste>
```

## 6. Postman test scripts
```
Write Postman test scripts (pm.test) for this response that check status, response time,
JSON schema and these business rules: <rules>. Response: <paste sample>
```

## 7. Commit message / PR description
```
Write a conventional commit message (feat/fix/test/chore) for this diff: <paste git diff>
```

## 8. Review my test code
```
Review this test for: brittle locators, missing assertions, hard-coded waits,
duplicated code that belongs in a page object, unclear names. <paste>
```
