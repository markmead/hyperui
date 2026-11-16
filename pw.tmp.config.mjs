import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
  testDir: '/home/user/hyperui/src/tests',
  use: { baseURL: 'http://localhost:4321/' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], permissions: ['clipboard-read', 'clipboard-write'], launchOptions: { executablePath: '/opt/pw-browsers/chromium' } } }],
})
