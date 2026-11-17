import process from 'node:process'

import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env.CI

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: isCI,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4321/',
    trace: 'on-first-retry',
  },
  // Locally, `pnpm test` reuses a running `pnpm dev` or starts one. CI tests
  // the built site, so `public/_headers` and `public/_redirects` apply too.
  webServer: {
    command: isCI ? 'pnpm exec wrangler dev --port 4321' : 'pnpm dev',
    url: 'http://localhost:4321/',
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        permissions: ['clipboard-read', 'clipboard-write'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
})
