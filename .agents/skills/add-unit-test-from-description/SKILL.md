---
name: add-unit-test-from-description
description: Turns a natural-language test description into a Vitest unit test in the correct file, matching existing describe/it patterns and imports. Use when the user asks to add a test from a description, implement a scenario as a test, translate acceptance criteria into tests, or expand coverage for a described behavior.
disable-model-invocation: true
---

# Add unit test from description

## Goal

Add exactly the test(s) implied by the user’s description—no unrelated refactors. Prefer testing pure logic over the UI when the description maps to engine/state behavior.

## Where to put tests (this repo)

| Kind of behavior | File | Notes |
|------------------|------|--------|
| Calculator state, `evaluate`, `formatNumber`, button semantics as state transitions | `apps/calculator/src/lib/calculatorEngine.test.ts` | Default. Import from `./calculatorEngine` only what the scenario needs. |
| Rendering, clicks, labels, display CSS class | `apps/calculator/src/App.test.tsx` | File must start with `/** @vitest-environment jsdom */`. Use `@solidjs/testing-library` (`render`, `fireEvent`) like existing tests. |

If another app under `apps/<name>/` gains tests later, mirror that app’s `*.test.ts` / `*.test.tsx` layout and its `package.json` test script.

## Workflow

1. **Parse the description** into concrete setup, action, and expected outcome. If anything is ambiguous, pick the smallest interpretation that matches existing product behavior (read the implementation under test first).
2. **Choose layer**: If the description is about “what the user sees after clicking …”, use `App.test.tsx`. If it is about math, errors, chaining, or state fields, use `calculatorEngine.test.ts`.
3. **Match style**:
   - `import { describe, expect, it } from "vitest";`
   - Group with `describe("functionOrArea", () => { ... })` consistent with neighboring tests.
   - Name tests with `it("…", () => { … })` using clear language; align wording with the user’s description when it stays accurate.
   - Reuse helpers already in the file (e.g. `buttonWithLabel` in `App.test.tsx`) instead of duplicating patterns.
4. **Implement** the minimal sequence of calls or clicks, then `expect` on the smallest stable surface (return value, `display`, DOM text).
5. **Verify**: From `apps/calculator`, run `npm test`. Fix failures by correcting the test or confirming a real bug (do not weaken assertions to green unless the user asked).

## Quality bar

- One focused `it` per distinct behavior unless the description explicitly bundles cases.
- Avoid testing implementation details that are not part of the described behavior.
- Do not add accessibility-only assertions unless the user’s description or project rules require them.

## Examples (intent)

**Description:** “Dividing 1 by 0 shows Error, then Clear lets you type again.”  
**Layer:** Engine (already similar tests exist—extend with a new `it` if the scenario is not covered).

**Description:** “Pressing 9 then − then 4 then = shows 5.”  
**Layer:** Either engine sequence with `press*` helpers or App clicks with button labels `9`, `−`, `4`, `=`—prefer engine if the question is arithmetic, App if the question is the full UI.

Use the existing tests in `calculatorEngine.test.ts` and `App.test.tsx` as the canonical patterns for structure and imports.
