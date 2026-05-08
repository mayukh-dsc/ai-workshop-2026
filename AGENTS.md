# Agent instructions — AI workshop monorepo

This repository hosts **small, self-contained workshop projects**. Agents should treat each project as an isolated mini-app unless shared tooling is explicitly introduced.

## Repository layout

- **Root**: shared docs (this file), license, and optional workspace-level config later.
- **`apps/`**: workshop apps live here. The calculator is **`apps/calculator/`** — implement and edit calculator code only under that path unless the user asks otherwise.
- **Future work**: a currency converter (and other demos) may be added as **`apps/<name>/`**. Do **not** implement the currency converter unless the user explicitly asks.

When adding a new project, place it under **`apps/<project-name>/`** with a dedicated `package.json` (or workspace member), and README only if the user requests documentation.

## Active focus: calculator web application

### Stack (required)

- **TypeScript** for all application and test code.
- **Solid.js** for the UI.

### Features (required)

1. Digit buttons **0–9**.
2. Operator buttons for **division, multiplication, addition, subtraction**.
3. An **equals** button to evaluate the current expression (or equivalent UX consistent with a basic calculator).
4. Render the calculator on a **web page** (dev server or static build as appropriate for the chosen toolchain).

### Testing (required)

- **Unit tests** must exist for core logic (parsing, evaluation, edge cases as applicable).
- **Coverage**: maintain **greater than 80%** line (or statement) coverage as reported by the project’s test runner—adjust thresholds in config if the stack provides them.

### Explicit non-goals (for now)

- **Accessibility**: do **not** add screen reader support, ARIA-heavy patterns, or other **accessibility features** unless the user later asks to add them as a workshop exercise.
- **Currency converter**: **do not build** until requested.

### Implementation guidance for agents

- Keep calculator **logic separate from Solid components** where practical so tests hit pure functions.
- Avoid unrelated refactors outside the scope of the current task.
- Match existing project conventions once files exist (imports, formatting, test runner).

## Quick checklist before finishing calculator-related work

- [ ] Digits 0–9 and four operators + equals are present and wired.
- [ ] App runs in the browser as intended.
- [ ] Unit tests pass and coverage is **> 80%**.
- [ ] No accessibility extras beyond basic usable UI unless the user changes the requirement.
