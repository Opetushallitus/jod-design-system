# AGENTS.md

Guidance for AI coding agents working in this repository. Setup, commands and E2E instructions are in [README.md](README.md) and `package.json`; this file only covers what is not obvious from the code.

## Project

`@jod/design-system` is the React component library shared by the JOD services. It is not published to npm: consuming apps install it from this repository and import the built output. Treat every export in `lib/main.ts` and `package.json#exports` as public API.

Before finishing a change, run lint, the format check (`npx oxfmt --check`), unit tests and the build. The git hooks and CI enforce these. Run the E2E tests when you touched a component that has a spec in `e2e/`, or added one.

## Conventions

### Components

- Named exports only, function components, props declared as a `type` with a JSDoc comment on every prop (Storybook autodocs reads them).
- Removing or renaming an export or a prop is a breaking change for the consuming apps; avoid it unless the task asks for it, and call it out.
- `lib/components/internal/` holds building blocks that are not exported from `lib/main.ts`.
- Every runtime dependency is externalized in the build. A new runtime import must be added to `dependencies` (or `peerDependencies`), never `devDependencies`, with an exact version.
- Files that only stories or tests use (story data, test utilities) must be added to the `dts` `exclude` list in `vite.config.ts`, otherwise a dangling `.d.ts` ends up in the build output.
- Service-specific colors come from `useServiceVariant()` and the `serviceColors` map, not from hardcoded per-service classes.
- User-visible and screen-reader text is passed in as props by the consuming app (it owns translations). Do not hardcode Finnish, Swedish or English strings in components.
- Do not work around the install policy in `.npmrc` (no lifecycle scripts, minimum release age).
- Never edit generated output (`dist/`, `storybook-static/`, test reports).

### New components

A new component is not done until it has all of the following:

- Unit tests in `<Name>.test.tsx` covering rendering, every interaction and state, and a `jest-axe` check. This is the minimum; a component without unit tests must not be added.
- Conformance to WCAG 2.2 level AA, verified against the checklist in [Accessibility](#accessibility).
- Stories in `<Name>.stories.tsx` covering its variants and states.
- An export from `lib/main.ts`.

Add `<Name>.screenreader.test.tsx` when the component has a role, state or live region whose announcement matters, and `e2e/<Name>.spec.ts` when behavior depends on real layout, focus handling or styling. Use an existing component that has these files as the model.

### Styling

- Tailwind classes always carry the `ds:` prefix, with variants after it: `ds:flex`, `ds:hover:text-accent`, `ds:sm:px-4`. An unprefixed class generates no CSS.
- Use tokens from `lib/theme.css`. The default Tailwind color palette and breakpoints are reset, so `ds:text-red-500` does not exist.
- Compose class names with `cx` / `cva` from `lib/cva.ts` (they run tailwind-merge), not string concatenation or another `clsx`.
- Class names must be complete static strings so Tailwind can detect them. Do not build them by interpolation (`` `ds:bg-${color}` ``).
- The formatter sorts Tailwind classes and imports. Run `npm run format` instead of ordering by hand.

### Stories

- `title` is `<Category>/<Name>`, typed with `TitledMeta`; valid categories are in `lib/storybook.ts`.
- Story ids are referenced by E2E specs. Renaming a story or its title breaks them; update `e2e/` in the same change.

### Tests

- Unit tests run in jsdom, which has no Tailwind CSS: anything hidden only by a CSS class is still present to queries, and contrast and visibility can only be checked in the E2E tests.
- Query by role and accessible name, which also verifies the name and role a screen reader announces.
- Test keyboard operation explicitly (Tab order, Enter / Space, arrow keys, Escape, where focus lands after an element is removed), not only clicks.
- A change to rendered markup or classes changes snapshots. Review the diff before updating them. Do not update snapshots to hide an unintended change.
- Prefer fixing a lint finding over a disable comment, including the `jsx-a11y` rules.

### Accessibility

Accessibility is a primary requirement of this library, not a follow-up. Every component must conform to WCAG 2.2 level AA.

Go through this checklist for every new component and for every change to an interactive one. Cover each applicable item with a test where it can be automated, and state in your summary which items you could not verify. Automated checks do not replace manual screen reader testing, which a human does; say that it is still pending.

Keyboard: the page is navigated with Tab, and components are operated with the arrow keys and Enter or Space. For each interactive element:

- [ ] It can be focused with the keyboard.
- [ ] It shows a visible focus indicator while focused.
- [ ] It can be operated with the keyboard. The information it offers and its states are also available without a mouse (e.g. nothing is revealed on hover only).
- [ ] The order in which focus moves through the page and within groups of elements is logical.
- [ ] If the focused element is removed from the page, focus moves to a place that is logical for the user.

Screen reader:

- [ ] The order in which content is presented to the screen reader is logical.
- [ ] Heading-like text is marked up as a heading (`<h2>`, `<h3>`, ...) and follows the page's heading hierarchy. Let the consumer choose the heading level instead of hardcoding it.
- [ ] Every image has a text alternative in its `alt` attribute, or is hidden from the screen reader entirely (decorative).
- [ ] Every interactive element has a name the screen reader announces ("Close", "Menu", ...).
- [ ] Every interactive element has a type / role the screen reader announces, and the role matches how the element behaves ("checkbox", "button", "tab", ...).
- [ ] If an element has a state or value that can change, it is announced ("checked / not checked", "expanded / collapsed", ...).

Visual:

- [ ] Text contrast is at least 4.5:1 for normal-size text and 3:1 for large text (at least 24px, or at least 18.5px when bold).
- [ ] The shape of a control is at least 3:1 against its surroundings when it is custom-styled with CSS.
- [ ] Informative graphics are at least 3:1.
- [ ] Hue alone is never used to convey information.

## Git

- Commit messages must match `^OPHJOD-[0-9]+: [A-Z].*`, e.g. `OPHJOD-1234: Add Tabs component`. The pre-push hook rejects anything else, and also rejects commits authored with a GitHub noreply email.
- Use the Jira ticket of the task. If you do not know it, ask instead of inventing a number.
- Pull requests follow `.github/pull_request_template.md`.
- Do not bypass hooks with `--no-verify`.
- All code, comments, commit messages and documentation are written in English.
