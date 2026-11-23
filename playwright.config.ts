import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'ui',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: 'https://demo.playwright.dev' },
    },
    {
      name: 'week1',
      testDir: './tests/week1',
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: 'https://jsonplaceholder.typicode.com' },
    },
  ],
});
