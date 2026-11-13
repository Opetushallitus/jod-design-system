import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.E2E_PORT ?? 6006);
const isCI = !!process.env.CI;

/**
 * E2E tests run against Storybook: each test opens a single story in Storybook's
 * iframe (see e2e/storybook.ts) and drives it in a real browser.
 *
 * Locally the Storybook dev server is started (or an already running one on port
 * 6006 is reused). Set E2E_STATIC=1 to serve a prebuilt storybook-static/ instead,
 * which is what CI does after `npm run storybook:build`.
 */
const useStaticBuild = isCI || !!process.env.E2E_STATIC;

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  // The tests are independent and the static Storybook build serves them in parallel, so
  // CI uses every core (4 on GitHub's ubuntu-latest). Locally the default is half of them.
  workers: isCI ? '100%' : undefined,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Components skip their enter/leave transitions under reduced motion. Without this,
    // assertions pass while content is still fading in (toBeVisible ignores opacity),
    // so trace and UI mode snapshots show it mid-transition, i.e. invisible.
    reducedMotion: 'reduce',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      // Sets its own 320px viewport, so running it on one project is enough.
      testIgnore: '**/reflow.spec.ts',
    },
  ],
  webServer: {
    command: useStaticBuild
      ? `npx vite preview --outDir storybook-static --port ${PORT} --strictPort`
      : `npm run storybook -- --ci --port ${PORT}`,
    url: `http://localhost:${PORT}/iframe.html`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
