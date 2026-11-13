# JOD Design System

This is the design system for the JOD project. It is a collection of reusable components and styles that can be used to build a consistent and accessible user interface.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. First, ensure that you have [NVM](https://github.com/nvm-sh/nvm) installed on your machine.
2. Clone this repository to your local machine.
3. Open a terminal window and navigate to the root directory of the project.
4. Run the following command to install Node.js & NPM and the dependencies:

```shell
nvm install
nvm use
npm install
npm exec allow-scripts run
```

### Node, npm, and install policy

The project targets **Node.js 24** (see `.nvmrc`, currently `lts/krypton`) and **npm 11.10 or newer**, as declared in `package.json` under `engines` and `devEngines`. The repository `.npmrc` sets `engine-strict=true`, so `npm install` will **fail** if your Node or npm version does not satisfy those constraints.

Other notable `.npmrc` settings:

- **`ignore-scripts=true`** - package lifecycle scripts are not run during install. Allowed scripts are executed explicitly with `npm exec allow-scripts run` in the install step below.
- **`min-release-age="7"`** - npm will not install registry packages that were published less than seven days ago, which reduces exposure to freshly published compromised releases.

Dependencies in `package.json` use **exact versions** (no semver ranges) so installs are reproducible and match the lockfile.

## Testing

### Unit tests

```shell
npm run test:unit
```

#### Screen reader tests

[Guidepup's Virtual Screen Reader](https://www.guidepup.dev/docs/virtual) walks the accessibility tree like a screen reader and logs what would be announced, so unit tests can check names, roles, states and live regions as a user hears them. They run with the other Vitest tests, in CI too. See `lib/components/Accordion/Accordion.screenreader.test.tsx`:

```tsx
const { container } = render(<Accordion title="Title">Content</Accordion>);
await virtual.start({ container });
expect(await virtual.lastSpokenPhrase()).toBe('button, Title, expanded');
```

Call `await virtual.stop()` in `afterEach`. jsdom has no Tailwind CSS, so content hidden only by CSS classes is still announced in these tests.

Known accessibility bugs are tested with `it.fails` and a `// Known issue:` comment, so the suite stays green until the bug is fixed and then fails, reminding to remove `.fails`. Find them with `grep -rn "it.fails" lib`.

### E2E tests (Playwright)

E2E tests live in `e2e/` and run with [Playwright](https://playwright.dev/) against Storybook: each test opens one story in Storybook's preview iframe with the `gotoStory` helper (`e2e/storybook.ts`) and drives it in a real browser. Tests run on a desktop Chromium and a mobile (Pixel 7) viewport.

Install the browser once:

```shell
npx playwright install chromium
```

Run the tests. Playwright starts the Storybook dev server, or reuses one already running on port 6006:

```shell
npm run test:e2e
npm run test:e2e:ui   # interactive UI mode
```

To run against a production build instead (as CI does), build Storybook first and set `E2E_STATIC=1`:

```shell
npm run storybook:build
E2E_STATIC=1 npm run test:e2e
```

#### Accessibility (axe)

Accessibility is checked with [@axe-core/playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright) against WCAG 2.2 A/AA rules, in a real browser, so layout- and style-dependent rules such as color contrast are checked too.

- `e2e/a11y.spec.ts` scans **every story** automatically, so a new story is covered without writing a test. To check a state that needs props, add a story for it. Stories that render nothing or load third-party scripts can opt out with the `!test` tag.
- `e2e/knownA11yViolations.ts` lists violations that exist but are not fixed yet. They do not fail the build, but the test fails once a listed violation is gone, so fixed entries get removed. Fix new violations instead of adding them there.
- `e2e/a11yStates.spec.ts` scans states reached through interaction (open listboxes, calendar, dialogs, menus, tooltips) on the whole page, since popups render in portals. Add a state there when a component gains a new popup or dialog.
- `e2e/reflow.spec.ts` checks every story at 320px width for horizontal scrolling (WCAG 1.4.10 Reflow). Known overflows are listed in `e2e/knownReflowIssues.ts`, with the same rules as the known axe violations.
- For other interaction states (e.g. an opened accordion), scan in a component spec with the `makeAxeBuilder` fixture from `e2e/fixtures.ts`:

```ts
await page.getByRole('button', { name: 'Title' }).press('Enter');
expect((await makeAxeBuilder().analyze()).violations).toEqual([]);
```

#### Screen reader (in the browser)

`e2e/screenReader.spec.ts` runs Guidepup's Virtual Screen Reader inside the story page through the `screenReader` fixture, so it reads the real DOM with CSS and browser focus handling. Use it only for what the jsdom screen reader tests cannot see: content hidden or shown by CSS, real focus moves (`<dialog>`, fragment links) and floating elements. Known bugs are marked with `test.fail()`.

```ts
await gotoStory(page, 'components-content-accordion--default');
await screenReader.start();
expect(await screenReader.lastSpokenPhrase()).toBe('button, Title, expanded');
```

To add tests for a component, create `e2e/<Component>.spec.ts` and open its stories by story id, e.g. `components-content-accordion--default`. The id is shown in the Storybook URL (`?path=/story/<id>`). See `e2e/Accordion.spec.ts` for an example.

## Download third-party UI assets

Third-party assets such as images, fonts, and icons are stored in S3 bucket. Guide to download assets is available in the infrastructure repository.

## Package linking for hot reloading

Run the following commands:

```shell
npm link
npm run dev
```

Open a new terminal window and navigate to the root directory of the project you want to link the design system to. Run the following command to link the design system to the project:

```shell
npm link @jod/design-system
npm run dev
```

## Add as a dependency

This repo is not published to the npm registry, so if you would like to have the latest version that the `main` branch has to offer then you can add it like the following:

```shell
npm i --save git+ssh://git@github.com:Opetushallitus/jod-design-system#main
```
